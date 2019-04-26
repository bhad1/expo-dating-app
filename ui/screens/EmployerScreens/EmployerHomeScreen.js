import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Icon, Text } from "native-base";
import { WebBrowser } from "expo";
import SwiperComponent from "../../components/SwiperComponent";
import { MonoText } from "../../components/StyledText";
import { connect } from "react-redux";

import { firebase, db, geo } from "../../firebase";

console.disableYellowBox = true;

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

class EmployerHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employersJobPostings: []
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    let employersJobPostings = [];
    //get user by userId that we set in redux on login
    await db
      .collection("jobs")
      // firebase.firestore.Fieldpath.documentID() is how you search by the ID itself
      .where("userId", "==", this.props.userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          employersJobPostings.push(doc.data());
        });
        this.setState({ employersJobPostings: employersJobPostings });
      })
      .catch(function(error) {
        console.log("Error getting employers job postings: ", error);
      });
  }
  render() {
    return (
      <View style={styles.jobsContainer}>
        <ScrollView>
          <View style={styles.jobDivTitleContainer}>
            <Text style={styles.JobDivTitle}>Your Job Postings</Text>
          </View>
          {this.state.employersJobPostings.map((job, i) => {
            return (
              <View style={styles.jobDiv} key={i}>
                <Text>Company: {job.company}</Text>
                <Text>Street Address: {job.addressLine1}</Text>
                <Text>City: {job.city}</Text>
                <Text>State: {job.state}</Text>
                <Text>Weekly Hours: {job.weeklyHours}</Text>
                <Text>Job Description: {job.jobDescription}</Text>
              </View>
            );
          })}
        </ScrollView>
        <Button
          onPress={() => this.props.navigation.push("CreateJobScreen")}
          style={styles.createJobButton}
        >
          <Icon name="home" />
          <Text>Create Job</Text>
        </Button>
      </View>
    );
  }
}

export default connect(mapStateToProps)(EmployerHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  jobsContainer: {
    // top: 100
  },
  jobDivTitleContainer: {
    height: 130,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  JobDivTitle: {
    fontSize: 25
  },
  jobDiv: {
    height: 138,
    width: "100%",
    // backgroundColor: "grey",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    borderTopColor: "black",
    borderTopWidth: 0.5
  },
  createJobButton: {
    position: "absolute",
    top: 50,
    right: 10
  }
});
