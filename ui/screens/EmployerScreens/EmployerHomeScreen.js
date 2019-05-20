import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Icon, Text, Spinner } from "native-base";
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
      employersJobPostings: [],
      spinner: false
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    //employeeHomeScreen gets the user object and sets in in redux here so its grabbed in redux in settingsScreen,
    //but we dont need user object anywhere really so we dont do that here
    let employersJobPostings = [];
    this.setState({ spinner: true });
    //get user by userId that we set in redux on login
    await db
      .collection("jobs")
      // firebase.firestore.Fieldpath.documentID() is how you search by the ID itself
      .where("userId", "==", this.props.userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(async doc => {
          employersJobPostings.push(
            Object.assign({ docId: doc.id }, doc.data())
          );
        });
        this.setState({ employersJobPostings: employersJobPostings });
        employersJobPostings = [];
      });
    this.setState({ spinner: false });
  }

  displayEmployersJobPostings = () => {
    if (this.state.employersJobPostings.length) {
      return this.state.employersJobPostings.map((job, i) => {
        return (
          <View style={styles.jobDiv} key={i}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("JobPostingDetailsScreen", {
                  jobId: job.docId
                })
              }
            >
              <Text>Company: {job.company}</Text>
              <Text>Street Address: {job.addressLine1}</Text>
              <Text>City: {job.city}</Text>
              <Text>State: {job.state}</Text>
              <Text>Weekly Hours: {job.weeklyHours}</Text>
              <Text>Job Description: {job.jobDescription}</Text>
            </TouchableOpacity>
          </View>
        );
      });
    } else {
      return <Text>You have not created a job yet</Text>;
    }
  };

  render() {
    return (
      <View style={styles.jobsContainer}>
        <View style={styles.jobDivTitleContainer}>
          <Text style={styles.JobDivTitle}>Your Job Postings</Text>
        </View>
        {this.state.spinner ? (
          <Spinner color="grey" style={styles.jobPostingsSpinner} />
        ) : (
          <ScrollView>{this.displayEmployersJobPostings()}</ScrollView>
        )}

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    borderTopColor: "black",
    borderTopWidth: 0.5
  },
  createJobButton: {
    position: "absolute",
    top: 50,
    right: 10
  },
  jobPostingsSpinner: {
    top: 20
  }
});
