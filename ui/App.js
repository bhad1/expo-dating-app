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
import { store } from "./redux/app-redux";
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
                style={styles.userLocationModal}
              >
                <View>
                  <Button
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
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      await this.setState({ userLocation });
      console.log(this.state.userLocation);
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
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
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
    height: 300,
    width: 300,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
