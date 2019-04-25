import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { connect } from "react-redux";
import { setIsEmployer } from "../../redux/app-redux";

const mapStateToProps = state => {
  return {
    userToken: state.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getToken();
  }

  static navigationOptions = {
    header: null
  };

  // Fetch the token from storage then navigate to our appropriate place
  getToken = async () => {
    const userToken = this.props.userToken;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
