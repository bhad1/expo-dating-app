// import React from "react";
// import {
//   createSwitchNavigator,
//   createStackNavigator,
//   createAppContainer
// } from "react-navigation";
// import EmployeeTabNavigator from "./EmployeeTabNavigator";
// import LoginScreen from "./../screens/LoginScreen";
// import SignupScreen from "./../screens/SignupScreen";
// import AuthLoadingScreen from "./../screens/AuthLoadingScreen";
// import { connect } from "react-redux";
// import { View } from "react-native";
// import { store } from "../redux/app-redux";

// const EmployeeStack = createStackNavigator(
//   { Main: EmployeeTabNavigator },
//   { headerMode: "none" }
// );
// const EmployerStack = createStackNavigator(
//   { Main: EmployeeTabNavigator },
//   { headerMode: "none" }
// );
// const AuthStack = createStackNavigator({
//   Login: LoginScreen,
//   Signup: SignupScreen
// });

// const mapStateToProps = state => {
//   return {
//     isEmployer: state.isEmployer
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {};
// };

// class Nav extends React.Component {
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {};
//   //   myIsEmployer = this.props.isEmployer;
//   // }

//   AppContainer = createAppContainer(
//     createSwitchNavigator(
//       {
//         AuthLoading: AuthLoadingScreen,
//         EmployeeStack: true ? EmployeeStack : EmployerStack,
//         Auth: AuthStack
//       },
//       {
//         initialRouteName: "AuthLoading"
//       }
//     )
//   );

//   componentWillReceiveProps(nextProps) {
//     myIsEmployer = nextProps.isEmployer;
//     // if (prevProps.isEmployer !== this.props.isEmployer) {
//     //   myIsEmployer = this.props.isEmployer;
//     // }
//   }

//   render() {
//     return this.AppContainer();
//   }
// }

// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       EmployeeStack: myIsEmployer ? EmployeeStack : EmployerStack,
//       Auth: AuthStack
//     },
//     {
//       initialRouteName: "AuthLoading"
//     }
//   )
// );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Nav);
// export default connect(
//   mapStateToProps,
//   null,
//   null,
//   { pure: false }
// )(Nav);

import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreens/LoginScreen";
import SignupScreen from "../screens/LoginScreens/SignupScreen";
import AuthLoadingScreen from "../screens/LoginScreens/AuthLoadingScreen";
import { connect } from "react-redux";
import { store } from "../redux/app-redux";

const MainStack = createStackNavigator(
  { Main: MainTabNavigator },
  { headerMode: "none" }
);
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
