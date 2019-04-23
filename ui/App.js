import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Linking,
  AppState
} from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Constants,
  Location,
  Permissions,
  IntentLauncherAndroid
} from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { Root, Button, Text } from "native-base";
import { Provider } from "react-redux";
import { store, setUserLocation } from "./redux/app-redux";
import Modal from "react-native-modal";

import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    userLocation: null,
    errorMessage: null,
    isLocationModalVisible: false,
    openSettings: false,
    appState: AppState.currentState
  };

  componentWillMount() {
    //listen for when user exits out of app
    AppState.addEventListener("change", this._handleAppStateChange);
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Root>
          <Provider store={store}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <Modal
                onModalHide={
                  this.state.openSettings ? this.openSettings : undefined
                }
                isVisible={this.state.isLocationModalVisible}
              >
                <View style={styles.userLocationModal}>
                  <View style={styles.userLocationModalView}>
                    <Button
                      style={styles.enableLocationButton}
                      onPress={() =>
                        this.setState({
                          isLocationModalVisible: false,
                          openSettings: true
                        })
                      }
                    >
                      <Text>Enable Location Services</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
              <AppNavigator />
            </View>
          </Provider>
        </Root>
      );
    }
  }

  openSettings = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    this.setState({ openSettings: false });
  };

  // handles when user exits out of app and then comes back, like when they go to change location settings
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      this._getLocationAsync();
    }
    this.setState({ appState: nextAppState });
  };

  _getLocationAsync = async () => {
    // if no try catch then it throws error and breaks app when location permissions not allowed
    try {
      // get if user has enabled location or not
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      // if they havent, then show modal to make them enable location
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
        this.setState({ isLocationModalVisible: true });
        return;
      }

      //get user location and store it in redux with store.dispatch
      let userLocation = await Location.getCurrentPositionAsync({});
      await this.setState({ userLocation });
      store.dispatch(setUserLocation(userLocation));
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        this.setState({ isLocationModalVisible: true });
      }
    }
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userLocationModal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  userLocationModalView: {
    height: "70%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40
  },
  enableLocationButton: {
    width: "100%"
  }
});
