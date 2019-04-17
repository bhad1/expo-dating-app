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

const HomeStack = createStackNavigator({
  Home: EmployeeHomeScreen
});

HomeStack.navigationOptions = {
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

const MatchesStack = createStackNavigator({
  Matches: EmployeeMatchesScreen
});

MatchesStack.navigationOptions = {
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

export default createBottomTabNavigator({
  // DiscoverStack,
  HomeStack,
  MatchesStack,
  EmployeeSettingsStack
});
