import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Toast,
  Spinner
} from "native-base";

import { WebBrowser } from "expo";
import SwiperComponent from "../../components/SwiperComponent";
import { MonoText } from "../../components/StyledText";
import { connect } from "react-redux";
import { get } from "geofirex";
import Modal from "react-native-modal";

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
      jobsAlreadySwipedOn: [],
      userProfile: [],
      showCreateProfileModal: false,
      firstName: "",
      lastName: "",
      userBio: "",
      pastExperience: "",
      spinner: false,
      showNoMoreJobsText: false
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

  async componentWillMount() {
    await this.getUser(this.props.userId);
    // if userProfile is empty that means they've never logged in before,
    // so show them the create profile modal
    if (!this.state.userProfile) {
      this.setState({ showCreateProfileModal: true });
    }
  }

  async componentDidMount() {
    if (!this.props.isEmployer) {
      this.getJobsNearUser();
    }
  }

  createProfile = async userId => {
    this.setState({ spinner: true });
    await db
      .collection("users")
      .doc(userId)
      .update({
        "userProfile.firstName": this.state.firstName,
        "userProfile.lastName": this.state.lastName,
        "userProfile.userBio": this.state.userBio,
        "userProfile.pastExperience": this.state.pastExperience
      })
      .then(async docRef => {
        Toast.show({
          text: "Profile Created"
        });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        Toast.show({
          text: error
        });
      });
    this.setState({ spinner: false, showCreateProfileModal: false }, () => {});
  };

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Create Profile</Text>
      <Form>
        <Item>
          <Input
            placeholder="First Name"
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Last Name"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Short Bio About Yourself"
            value={this.state.userBio}
            onChangeText={userBio => this.setState({ userBio })}
          />
        </Item>
        <Item last>
          <Input
            placeholder="Past Experience"
            value={this.state.pastExperience}
            onChangeText={pastExperience => this.setState({ pastExperience })}
          />
        </Item>
      </Form>
      <View style={styles.CreateJobButtonContainer}>
        <Button onPress={() => this.createProfile(this.props.userId)}>
          <Text>Create Profile</Text>
        </Button>
      </View>
    </View>
  );

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
        if (doc.data().userProfile) {
          this.setState({ userProfile: doc.data().userProfile });
        }
        this.setState({ jobsAlreadySwipedOn: jobsAlreadySwipedOn });

        console.log(this.state.jobsAlreadySwipedOn);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  getJobsNearUser = async () => {
    this.setState({ spinner: true });
    let userLatitude = this.props.userLocation.coords.latitude;
    let userLongitude = this.props.userLocation.coords.longitude;
    const jobs = geo.collection("jobs");
    const center = geo.point(userLatitude, userLongitude);
    const radius = 10;
    const field = "position";

    const query = jobs.within(center, radius, field);
    let jobsNearMe = await get(query);
    jobsNearMe = this.filterOutJobsAlreadySwipedOn(
      jobsNearMe,
      this.state.jobsAlreadySwipedOn
    );
    this.setState({ jobs: jobsNearMe });
    this.setState({ spinner: false });
  };

  filterOutJobsAlreadySwipedOn = (jobs, jobsAlreadySwipedOn) => {
    return jobs.filter(val => !jobsAlreadySwipedOn.includes(val.id));
  };

  onFinishedSwiping = () => {
    this.setState({ showNoMoreJobsText: true });
  };

  displayLocalJobPostings = () => {
    if (!this.state.jobs.length || this.state.showNoMoreJobsText) {
      return (
        <View>
          <Text style={styles.noMoreJobsText}>
            There are no more jobs in your area!
          </Text>
        </View>
      );
    } else {
      return (
        <SwiperComponent
          jobs={this.state.jobs}
          onFinishedSwiping={this.onFinishedSwiping}
        />
      );
    }
  };

  render() {
    if (this.props.isEmployer) {
      return <View />;
    }
    return (
      <View>
        <View style={styles.employeeHomeScreenContainer}>
          <Modal
            isVisible={this.state.showCreateProfileModal}
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
          >
            {this.renderModalContent()}
          </Modal>
          {this.state.spinner ? (
            <Spinner color="grey" style={styles.spinner} />
          ) : (
            <View>{this.displayLocalJobPostings()}</View>
          )}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(EmployeeHomeScreen);

const styles = StyleSheet.create({
  employeeHomeScreenContainer: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
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
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "90%",
    width: "100%"
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
  },
  modalContentTitle: {
    // textAlign: "center",
    // fontSize: 50,
    // backgroundColor: "transparent"
  },
  spinner: {
    top: 20
  },
  noMoreJobsText: {
    top: 50
  }
});
