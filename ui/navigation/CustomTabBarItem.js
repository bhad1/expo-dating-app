import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";

export default class CustomTabBarItem extends React.PureComponent {
  render() {
    const { name, focused } = this.props;

    return (
      <View style={styles.tabItem}>
        // Some icon maybe
        <Text>hey</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1
  }
});
