import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Switch } from "react-native-base-switch";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Content, Text, Button, Form, Item, Input, Toast } from "native-base";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

const db = firebase.firestore();

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
      jobDescription: ""
    };
  }
  static navigationOptions = {
    title: "Create Job"
  };

  addJob = () => {
    // Add a new document with a generated id.
    db.collection("jobs")
      //   .doc(this.props.userId)
      //   .set({
      //     company: this.state.company,
      //     weeklyHours: this.state.weeklyHours,
      //     jobDescription: this.state.jobDescription
      //   })
      .add({
        userId: this.props.userId,
        company: this.state.company,
        weeklyHours: this.state.weeklyHours,
        jobDescription: this.state.jobDescription
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        Toast.show({
          text: "Job created"
        });
        this.props.navigation.navigate("EmployerHomeStack");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        Toast.show({
          text: error
        });
      });
  };

  render() {
    return (
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Company"
              value={this.state.value}
              onChangeText={company => this.setState({ company })}
              placeholder="Company"
            />
          </Item>
          <Item>
            <Input
              placeholder="Number of Hours per Week"
              value={this.state.value}
              onChangeText={weeklyHours => this.setState({ weeklyHours })}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Job Description"
              onChangeText={jobDescription => this.setState({ jobDescription })}
              value={this.state.text}
            />
          </Item>
        </Form>
        <View style={styles.AddJobButtonContainer}>
          <Button onPress={() => this.addJob()}>
            <Text>Add Job</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect(mapStateToProps)(CreateJobsScreen);

const styles = StyleSheet.create({
  AddJobButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
