import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  H3
} from "native-base";

import { firebase, db, geo } from "../../firebase";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

class EmployeeProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    let userProfile = this.props.navigation.getParam("userProfile");
    this.state = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userBio: userProfile.userBio,
      pastExperience: userProfile.pastExperience,
      userId: userProfile.userId,
      imageUri: ""
    };
  }

  static navigationOptions = {
    title: "Profile"
  };

  componentDidMount() {
    firebase
      .storage()
      .ref("profilePictures/")
      .child(this.state.userId)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageUri: url });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            resizeMode="stretch"
            source={{
              uri: this.state.imageUri
            }}
          />
        </View>
        <View style={styles.bioContainer}>
          <H3>{this.state.firstName + " " + this.state.lastName}</H3>
          <Text> </Text>
          <Text>{this.state.userBio}</Text>
        </View>
        <View style={styles.pastExperienceContainer}>
          <H3>Experience:</H3>
          <Text> </Text>
          <Text>{this.state.pastExperience}</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(EmployeeProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex"
  },
  profileImageContainer: {
    flex: 4,
    display: "flex"
  },
  profileImage: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  bioContainer: {
    flex: 3,
    display: "flex",
    borderBottomColor: "#A7A7AA",
    borderBottomWidth: 0.5
  },
  pastExperienceContainer: {
    flex: 3,
    display: "flex"
  }
});
