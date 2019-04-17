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

import AppNavigator from "./AppNavigator";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isEmployer: state.isEmployer
  };
};

class NavigationWrapper extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {};
  //   }

  //   static navigationOptions = {
  //     header: null
  //   };

  render() {
    return <AppNavigator isEmployer={this.props.isEmployer} />;
  }
}
export default connect(mapStateToProps)(NavigationWrapper);
