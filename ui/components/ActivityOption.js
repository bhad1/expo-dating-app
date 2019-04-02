import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ActivityOption extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.activityOptionContainer}>
        <View>
          <View>
            <Text>{this.props.activityName}</Text>
            <Text>{this.props.activityTime}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityOptionContainer: {
    flex: 1,
    height: 75,
    borderTopWidth: 1
  },
  container: {
    flex: 1
  }
});
