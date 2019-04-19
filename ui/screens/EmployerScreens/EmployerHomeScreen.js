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

import * as firebase from "firebase";
import "firebase/firestore";

if (!firebase.apps.length) {
  var firebaseConfig = {
    apiKey: "AIzaSyAdv3aRVKWf36ezvtYGfK1NRbReU3zio2U",
    authDomain: "expo-dating-app-cd762.firebaseapp.com",
    databaseURL: "https://expo-dating-app-cd762.firebaseio.com",
    projectId: "expo-dating-app-cd762",
    storageBucket: "expo-dating-app-cd762.appspot.com",
    messagingSenderId: "670282659913"
  };
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

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

  async componentDidMount() {
    let jobsArray = [];
    await db.collection("jobs").onSnapshot(querySnapshot => {
      jobsArray = [];
      querySnapshot.forEach(
        function(doc) {
          jobsArray.push(doc.data());
        },
        err => {
          console.log(err.message);
        }
      );
      this.setState({
        jobs: jobsArray
      });
    });
  }

  render() {
    return (
      <View>
        <SwiperComponent jobs={this.state.jobs} />
        <Button
          onPress={() => this.props.navigation.navigate("CreateJobStack")}
          style={styles.addJobButton}
        >
          <Icon name="home" />
          <Text>Add Job</Text>
        </Button>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

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
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  addJobButton: {
    position: "absolute",
    top: 70,
    right: 10
  }
});
