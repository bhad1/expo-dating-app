import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
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
  Button,
  Spinner
} from "native-base";
import { withNavigation } from "react-navigation";

import { firebase, db, geo } from "../../firebase";

import profileImage4 from "../../assets/images/robot-prod.png";

export default class JobPostingDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersThatSwipedOnPosting: [],
      spinner: false
    };
  }

  static navigationOptions = {
    title: "Job Details"
  };

  async componentDidMount() {
    let usersThatSwipedOnPosting = [];
    this.setState({ spinner: true });
    await db
      .collection("users")
      // get all users that have swiped right on this job by
      // checking if the jobsSwipedRightOn array contains this jobs Id
      .where(
        "jobsSwipedRightOn",
        "array-contains",
        this.props.navigation.getParam("jobId")
      )

      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          usersThatSwipedOnPosting.push(
            Object.assign({ userId: doc.id }, doc.data().userProfile)
          );
        });
        this.setState({ usersThatSwipedOnPosting: usersThatSwipedOnPosting });
      })
      .catch(function(error) {
        console.log("Error getting employers job postings: ", error);
      });
    this.setState({ spinner: false });
  }

  displayUsersThatSwipedOnPosting = () => {
    if (this.state.usersThatSwipedOnPosting.length) {
      return this.state.usersThatSwipedOnPosting.map((userProfile, index) => {
        let firstName = userProfile.firstName;
        let lastName = userProfile.lastName;
        let userBio = userProfile.userBio;
        return (
          <ListItem
            key={index}
            onPress={() =>
              this.props.navigation.push("EmployeeProfileScreen", {
                userProfile: userProfile
              })
            }
          >
            <Left style={styles.listItemLeft} avatar>
              <Thumbnail source={profileImage4} />
            </Left>
            <Body>
              <Text>{firstName + " " + lastName}</Text>
              <Text note>{userBio}</Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        );
      });
    } else {
      return <Text>No users have liked this post yet!</Text>;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conversationsContainer}>
          <ScrollView>
            <Container>
              <Content>
                {this.state.spinner ? (
                  <Spinner color="grey" style={styles.jobPostingsSpinner} />
                ) : (
                  <List>{this.displayUsersThatSwipedOnPosting()}</List>
                )}
              </Content>
            </Container>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemLeft: {
    flex: 0.25
  }
});
