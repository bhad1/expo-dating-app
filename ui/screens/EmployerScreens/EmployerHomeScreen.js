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

import { firebase, db, geo } from "../../firebase";

console.disableYellowBox = true;

export default class EmployerHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {}

  render() {
    return (
      <View style={styles.jobsContainer}>
        <ScrollView>
          <View style={styles.jobDivTitleContainer}>
            <Text style={styles.JobDivTitle}>Your Job Postings</Text>
          </View>
          <View style={styles.jobDiv}>Job1</View>
          <View style={styles.jobDiv}>Job1</View>
          <View style={styles.jobDiv}>Job1</View>
          <View style={styles.jobDiv}>Job1</View>
          <View style={styles.jobDiv}>Job1</View>
          <View style={styles.jobDiv}>Job1</View>
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
    height: 140,
    width: "100%",
    backgroundColor: "grey",
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
