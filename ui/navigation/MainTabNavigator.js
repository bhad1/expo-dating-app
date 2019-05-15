import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EmployeeHomeScreen from "../screens/EmployeeScreens/EmployeeHomeScreen";
import EmployeeMessagesScreen from "../screens/EmployeeScreens/EmployeeMessagesScreen";
import EmployeeSettingsScreen from "../screens/EmployeeScreens/EmployeeSettingsScreen";
import EmployeeProfileScreen from "../screens/EmployeeScreens/EmployeeProfileScreen";
import EmployerHomeScreen from "../screens/EmployerScreens/EmployerHomeScreen";
import EmployerMessagesScreen from "../screens/EmployerScreens/EmployerMessagesScreen";
import EmployerSettingsScreen from "../screens/EmployerScreens/EmployerSettingsScreen";
import CreateJobScreen from "../screens/EmployerScreens/CreateJobScreen";
import JobPostingDetailsScreen from "../screens/EmployerScreens/JobPostingDetailsScreen";
import CustomTabBar from "./CustomTabBar";

//employee screens

const EmployeeHomeStack = createStackNavigator({
  Home: EmployeeHomeScreen
});

EmployeeHomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const EmployeeMessagesStack = createStackNavigator({
  Messages: EmployeeMessagesScreen
});

EmployeeMessagesStack.navigationOptions = {
  tabBarLabel: "Messages",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const EmployeeSettingsStack = createStackNavigator({
  Settings: EmployeeSettingsScreen
});

EmployeeSettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

// employer screens

const EmployerHomeStack = createStackNavigator({
  Home: EmployerHomeScreen,
  CreateJobScreen: CreateJobScreen,
  JobPostingDetailsScreen: JobPostingDetailsScreen,
  EmployeeProfileScreen: EmployeeProfileScreen
});

EmployerHomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const EmployerMessagesStack = createStackNavigator({
  Messages: EmployerMessagesScreen
});

EmployerMessagesStack.navigationOptions = {
  tabBarLabel: "Messages",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const EmployerSettingsStack = createStackNavigator({
  Settings: EmployerSettingsScreen
});

EmployerSettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

export default createBottomTabNavigator(
  {
    EmployeeHomeStack,
    EmployeeMessagesStack,
    EmployeeSettingsStack,
    EmployerHomeStack,
    EmployerMessagesStack,
    EmployerSettingsStack
  },
  {
    tabBarComponent: CustomTabBar
  }
);
