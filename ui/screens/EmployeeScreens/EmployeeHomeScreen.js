import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import SwiperComponent from "../../components/SwiperComponent";
import { MonoText } from "../../components/StyledText";
import { connect } from "react-redux";
import { get } from "geofirex";

import { firebase, db, geo } from "../../firebase";

console.disableYellowBox = true;

const mapStateToProps = state => {
  return {
    isEmployer: state.isEmployer,
    userLocation: state.userLocation,
    userId: state.userId
  };
};

class EmployeeHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobsAlreadySwipedOn: []
    };

    // there is no way to make it go straight to employer homepage on login
    // so user is directed here first every time and we check if they are an employer
    // and send them there or stay accordingly
    if (this.props.isEmployer) {
      this.props.navigation.navigate("EmployerHomeStack");
    }
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    if (!this.props.isEmployer) {
      this.getUser(this.props.userId);
      this.getJobsNearUser();
    }
  }

  render() {
    if (this.props.isEmployer) {
      return <View />;
    }
    return (
      <View>
        <SwiperComponent jobs={this.state.jobs} />
      </View>
    );
  }

  getUser = async userId => {
    let jobsAlreadySwipedOn = [];
    await db
      .collection("users")
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.data().jobsThatUserSwipedLeftOn) {
          jobsAlreadySwipedOn.push(...doc.data().jobsThatUserSwipedLeftOn);
        }
        if (doc.data().jobsThatUserSwipedRightOn) {
          jobsAlreadySwipedOn.push(...doc.data().jobsThatUserSwipedRightOn);
        }
        this.setState({ jobsAlreadySwipedOn: jobsAlreadySwipedOn });

        console.log(this.state.jobsAlreadySwipedOn);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  getJobsNearUser = async () => {
    let userLatitude = this.props.userLocation.coords.latitude;
    let userLongitude = this.props.userLocation.coords.longitude;
    const jobs = geo.collection("jobs");
    const center = geo.point(userLatitude, userLongitude);
    const radius = 100;
    const field = "position";

    const query = jobs.within(center, radius, field);
    let jobsNearMe = await get(query);
    jobsNearMe = this.filterOutJobsAlreadySwipedOn(
      jobsNearMe,
      this.state.jobsAlreadySwipedOn
    );
    this.setState({ jobs: jobsNearMe });
  };

  filterOutJobsAlreadySwipedOn = (jobs, jobsAlreadySwipedOn) => {
    return jobs.filter(val => !jobsAlreadySwipedOn.includes(val.id));
  };
}

export default connect(mapStateToProps)(EmployeeHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
