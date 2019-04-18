import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EmployeeHomeScreen from "../screens/EmployeeScreens/EmployeeHomeScreen";
import EmployeeMatchesScreen from "../screens/EmployeeScreens/EmployeeMatchesScreen";
import EmployeeSettingsScreen from "../screens/EmployeeScreens/EmployeeSettingsScreen";
import EmployerHomeScreen from "../screens/EmployerScreens/EmployerHomeScreen";
import EmployerMatchesScreen from "../screens/EmployerScreens/EmployerMatchesScreen";
import EmployerSettingsScreen from "../screens/EmployerScreens/EmployerSettingsScreen";
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

const EmployeeMatchesStack = createStackNavigator({
  Matches: EmployeeMatchesScreen
});

EmployeeMatchesStack.navigationOptions = {
  tabBarLabel: "Matches",
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
  Home: EmployerHomeScreen
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

const EmployerMatchesStack = createStackNavigator({
  Matches: EmployerMatchesScreen
});

EmployerMatchesStack.navigationOptions = {
  tabBarLabel: "Matches",
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
    // DiscoverStack,
    EmployeeHomeStack,
    EmployeeMatchesStack,
    EmployeeSettingsStack,
    EmployerHomeStack,
    EmployerMatchesStack,
    EmployerSettingsStack
  },
  {
    tabBarComponent: CustomTabBar
  }
);
