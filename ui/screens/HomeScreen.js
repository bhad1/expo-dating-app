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
import SwiperComponent from "../components/SwiperComponent";
import { MonoText } from "../components/StyledText";
import profileImage1 from "../assets/images/stockProfileImages/profileImage1.jpg";
// import profileImage2 from '../assets/images/stockProfileImages/profileImage2.jpg';
import profileImage3 from "../assets/images/stockProfileImages/profileImage3.jpg";
import profileImage4 from "../assets/images/stockProfileImages/profileImage4.jpg";
import profileImage5 from "../assets/images/stockProfileImages/profileImage5.jpg";
import profileImage6 from "../assets/images/stockProfileImages/profileImage6.jpg";

import * as firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAdv3aRVKWf36ezvtYGfK1NRbReU3zio2U",
  authDomain: "expo-dating-app-cd762.firebaseapp.com",
  databaseURL: "https://expo-dating-app-cd762.firebaseio.com",
  projectId: "expo-dating-app-cd762",
  storageBucket: "expo-dating-app-cd762.appspot.com",
  messagingSenderId: "670282659913"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.disableYellowBox = true;

export default class HomeScreen extends React.Component {
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
    await db
      .collection("jobs")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          jobsArray.push(doc.data());
        });
      });
    this.setState({
      jobs: jobsArray
    });
  }

  render() {
    return (
      <View>
        <SwiperComponent jobs={this.state.jobs} />
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
