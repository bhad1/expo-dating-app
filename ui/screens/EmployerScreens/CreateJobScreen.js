import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Content, Text, Button, Form, Item, Input, Toast } from "native-base";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import LoadingScreen from "../LoadingScreen";

import { firebase, db, geo } from "../../firebase";

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

class CreateJobsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      weeklyHours: "",
      jobDescription: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      lat: 0,
      lng: 0,
      spinner: false
    };
  }
  static navigationOptions = {
    title: "Create Job"
  };

  convertAddressToCoordinates = async () => {
    //Example correctly formatted address - 1600+Amphitheatre+Parkway,+Mountain+View,+CA
    combinedAddress =
      this.state.addressLine1 +
      ", " +
      this.state.city +
      ", " +
      this.state.state;
    var combinedAddress = combinedAddress.split(" ").join("+");
    await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        combinedAddress +
        "&key=AIzaSyAEt-n2jaN5mGZpf7sK3g5xAZsoSWL0Z1s"
    )
      .then(res => res.json())
      .then(
        async json =>
          await this.setState({
            lat: json.results[0].geometry.location.lat,
            lng: json.results[0].geometry.location.lng
          })
      )
      .catch(error => {
        Toast.show({
          text: error
        });
      });
  };

  resetState = () => {
    this.setState({
      company: "",
      weeklyHours: "",
      jobDescription: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      lat: 0,
      lng: 0
    });
  };

  createJob = async () => {
    this.setState({ spinner: true });
    await this.convertAddressToCoordinates();
    const point = geo.point(this.state.lat, this.state.lng);
    let newJobId;
    await geo
      .collection("jobs")
      .add({
        userId: this.props.userId,
        company: this.state.company,
        weeklyHours: this.state.weeklyHours,
        jobDescription: this.state.jobDescription,
        addressLine1: this.state.addressLine1,
        addressLine2: this.state.addressLine2,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode,
        position: point.data
      })
      .then(async docRef => {
        console.log("Document written with ID: ", docRef.id);
        newJobId = docRef.id;
        Toast.show({
          text: "Job created"
        });
        await this.resetState();
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        Toast.show({
          text: error
        });
      });
    await this.saveJobToUser(this.props.userId, newJobId);
    this.setState({ spinner: false }, () => {
      this.props.navigation.goBack();
    });
  };

  saveJobToUser = async (userId, newJobId) => {
    await db
      .collection("users")
      .doc(userId)
      .update({
        jobsCreated: firebase.firestore.FieldValue.arrayUnion(newJobId)
      })
      .then(function() {
        console.log("Job successfully added to user!");
      });
  };

  render() {
    return (
      <Content>
        {this.state.spinner && <LoadingScreen textContent={"Loading..."} />}
        <Form>
          <Item>
            <Input
              placeholder="Company"
              value={this.state.company}
              onChangeText={company => this.setState({ company })}
              placeholder="Company"
            />
          </Item>
          <Item>
            <Input
              placeholder="Number of Hours per Week"
              value={this.state.weeklyHours}
              onChangeText={weeklyHours => this.setState({ weeklyHours })}
            />
          </Item>
          <Item>
            <Input
              placeholder="Job Description"
              value={this.state.jobDescription}
              onChangeText={jobDescription => this.setState({ jobDescription })}
            />
          </Item>
          <Item>
            <Input
              placeholder="Address Line 1"
              value={this.state.addressLine1}
              onChangeText={addressLine1 => this.setState({ addressLine1 })}
            />
          </Item>
          <Item>
            <Input
              placeholder="Address Line 2"
              value={this.state.addressLine2}
              onChangeText={addressLine2 => this.setState({ addressLine2 })}
            />
          </Item>
          <Item last>
            <Input
              placeholder="City"
              value={this.state.city}
              onChangeText={city => this.setState({ city })}
            />
          </Item>
          <Item>
            <Input
              placeholder="State"
              value={this.state.state}
              onChangeText={state => this.setState({ state })}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Zip Code"
              value={this.state.zipCode}
              onChangeText={zipCode => this.setState({ zipCode })}
            />
          </Item>
        </Form>
        <View style={styles.CreateJobButtonContainer}>
          <Button onPress={() => this.createJob()}>
            <Text>Add Job</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect(mapStateToProps)(CreateJobsScreen);

const styles = StyleSheet.create({
  CreateJobButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
