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
import ActivityOption from '../components/ActivityOption';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: null
  };
  activities = [
    {
      activityName: 'The Braves vs the Mets',
      activityTime: '8pm-10pm',
      latlng: {
        latitude: 33.8908,
        longitude: -84.4678
      },
      description:
        'The Atlanta Braves take on the New York Mets at Suntrust park in game two of the series'
    },
    {
      activityName: 'Darkhorse',
      activityTime: '9pm-2am',
      latlng: {
        latitude: 33.7768,
        longitude: -84.3526
      },
      description:
        'Live bands, dancing & karaoke in the main room plus American eats, craft beer & a small patio.'
    },
    {
      activityName: '420 Music Festival',
      activityTime: '10am-8pm',
      latlng: {
        latitude: 33.7851,
        longitude: -84.3738
      },
      description:
        'Sprawling park featuring jogging paths, basketball courts, dog parks, a farmers market & more.'
    },
    {
      activityName: 'Rebolution at the Fox Theater',
      activityTime: '7pm-9pm',
      latlng: {
        latitude: 33.7725,
        longitude: -84.3858
      },
      description:
        'The Fox Theatre, a former movie palace, is a performing arts venue located at 660 Peachtree Street NE in Midtown Atlanta, Georgia, and is the centerpiece of the Fox Theatre Historic District. The theater was originally planned as part of a large Shrine Temple as evidenced by its Moorish design.'
    },
    {
      activityName: 'Comet Pub and Lanes',
      activityTime: '10pm-3am',
      latlng: {
        latitude: 33.7901,
        longitude: -84.2873
      },
      description:
        'The Comet. is located in the former Suburban Lanes space, a 1950s era bowling alley that served the Decatur and surrounding area for close to 60 years.'
    },
    {
      activityName: "Smith's Olde Bar",
      activityTime: '10pm-2am',
      latlng: {
        latitude: 33.7976,
        longitude: -84.3689
      },
      description: 'American pub fare, pool tables & frequent live music with DJs on weekends.'
    }
  ];

  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 33.823746,
                longitude: -84.35633,
                latitudeDelta: 0.23,
                longitudeDelta: 0.1
              }}
            >
              {this.activities.map((activity, index) => (
                <Marker
                  key={index}
                  coordinate={activity.latlng}
                  title={activity.title}
                  description={activity.description}
                />
              ))}
            </MapView>
          </View>
          <View style={styles.activitiesContainer}>
            <ScrollView>
              {this.activities.map((activity, index) => {
                return (
                  <ActivityOption
                    key={index}
                    activityName={activity.activityName}
                    activityTime={activity.activityTime}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff'
    // paddingTop: 30
  },
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  },
  mapContainer: {
    flex: 12,
    backgroundColor: '#fff'
  },
  activitiesContainer: {
    flex: 9
  }
});
