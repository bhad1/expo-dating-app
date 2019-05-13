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

  async componentDidMount() {
    let usersThatSwipedOnPosting = [];
    this.setState({ spinner: true });
    await db
      .collection("users")
      // get all users that have swiped right on this job by
      // checking if the jobsThatUserSwipedRightOn array contains this jobs Id
      .where(
        "jobsThatUserSwipedRightOn",
        "array-contains",
        this.props.navigation.getParam("jobId")
      )

      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          usersThatSwipedOnPosting.push(doc.data());
        });
        this.setState({ usersThatSwipedOnPosting: usersThatSwipedOnPosting });
      })
      .catch(function(error) {
        console.log("Error getting employers job postings: ", error);
      });
    //get user by userId that we set in redux on login
    // await db
    //   .collection("jobs")
    //   // firebase.firestore.Fieldpath.documentID() is how you search by the ID itself
    //   .where("userId", "==", this.props.userId)
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(async doc => {
    //       employersJobPostings.push(doc.data());
    //     });
    //     this.setState({ employersJobPostings: employersJobPostings });
    //   })
    //   .catch(function(error) {
    //     console.log("Error getting employers job postings: ", error);
    //   });
    this.setState({ spinner: false });
  }

  displayUsersThatSwipedOnPosting = () => {
    if (this.state.usersThatSwipedOnPosting.length) {
      return this.state.usersThatSwipedOnPosting.map((user, index) => {
        return (
          <ListItem key={index} avatar>
            <Left>
              <Thumbnail source={profileImage4} />
            </Left>
            <Body>
              <Text>
                {user.userProfile.firstName} {user.userProfile.lastName}
              </Text>
              <Text note>{user.userProfile.userBio}</Text>
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
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 45
  },
  matchesContainer: {
    flex: 1,
    display: "flex"
  },
  conversationsContainer: {
    flex: 5,
    display: "flex"
  },
  matchesComponent: {
    flex: 1,
    display: "flex",
    borderTopColor: "#bbb",
    borderTopWidth: 1,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  matchesScrollView: {
    flex: 1,
    display: "flex"
  },
  thumbnail: {
    marginRight: 15
  },
  jobPostingsSpinner: {
    top: 20
  }
});
