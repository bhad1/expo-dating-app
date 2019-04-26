import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge
} from "native-base";

import CustomTabBarItem from "./CustomTabBarItem";

class CustomTabBar extends React.Component {
  render() {
    // a tab bar component has a routes object in the navigation state
    const { navigation, isEmployer } = this.props;
    const routes = navigation.state.routes;

    return (
      <View style={styles.container}>
        // You map over all existing routes defined in TabNavigator
        {routes.map((route, index) => {
          if (isEmployer) {
            switch (route.routeName) {
              case "EmployerHomeStack":
                return (
                  <Button
                    onPress={() => this.navigationHandler(route.routeName)}
                    style={styles.tabItem}
                    badge
                    vertical
                    key={index}
                  >
                    <Badge>
                      <Text>2</Text>
                    </Badge>
                    <Icon name="home" />
                    <Text>pooper</Text>
                  </Button>
                );
              case "EmployerMatchesStack":
                return (
                  <Button
                    onPress={() => this.navigationHandler(route.routeName)}
                    style={styles.tabItem}
                    badge
                    vertical
                    key={index}
                  >
                    <Badge>
                      <Text>2</Text>
                    </Badge>
                    <Icon name="md-person" />
                    <Text>Matches</Text>
                  </Button>
                );
              case "EmployerSettingsStack":
                return (
                  <Button
                    onPress={() => this.navigationHandler(route.routeName)}
                    style={styles.tabItem}
                    badge
                    vertical
                    key={index}
                  >
                    <Badge>
                      <Text>2</Text>
                    </Badge>
                    <Icon name="settings" />
                    <Text>Settings</Text>
                  </Button>
                );
            }
          } else {
            switch (route.routeName) {
              case "EmployeeHomeStack":
                return (
                  <Button
                    onPress={() => this.navigationHandler(route.routeName)}
                    style={styles.tabItem}
                    badge
                    vertical
                    key={index}
                  >
                    <Badge>
                      <Text>2</Text>
                    </Badge>
                    <Icon name="home" />
                    <Text>poop</Text>
                  </Button>
                );
              case "EmployeeMatchesStack":
                return (
                  <Button
                    onPress={() => this.navigationHandler(route.routeName)}
                    style={styles.tabItem}
                    badge
                    vertical
                    key={index}
                  >
                    <Badge>
                      <Text>2</Text>
                    </Badge>
                    <Icon name="md-person" />
                    <Text>Matches</Text>
                  </Button>
                );
              case "EmployeeSettingsStack":
                return (
                  <Button
                    onPress={() => this.navigationHandler(route.routeName)}
                    style={styles.tabItem}
                    badge
                    vertical
                    key={index}
                  >
                    <Badge>
                      <Text>2</Text>
                    </Badge>
                    <Icon name="settings" />
                    <Text>Settings</Text>
                  </Button>
                );
            }
          }

          return <View key={index} />;
        })}
      </View>
    );
  }

  navigationHandler = name => {
    const { navigation } = this.props;
    navigation.navigate(name);
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row"
  },
  tabItem: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    isEmployer: state.isEmployer // boolean
  };
};

export default connect(mapStateToProps)(CustomTabBar);
