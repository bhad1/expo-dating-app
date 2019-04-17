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
  Text
} from "native-base";
import profileImage4 from "../../assets/images/robot-prod.png";

export default class EmployeeMatchesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 },
        { name: "Sarah", age: 24, profileImage: profileImage4 }
      ],
      conversations: [
        {
          name: "Sarah",
          text: "Hey! It looks like you have a pretty big deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text: "Hey! It looks like you have a pretty big deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text: "Hey! It looks like you have a pretty big deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text: "Hey! It looks like you have a pretty big deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text: "Hey! It looks like you have a pretty big deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        },
        {
          name: "Sarah",
          text:
            "Hey! It looks like you have a pretty strong deck. Care to duel?",
          profileImage: profileImage4
        }
      ]
    };
  }

  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.matchesContainer}>
          <View style={styles.matchesTitleContainer} />
          <View style={styles.matchesComponent}>
            <ScrollView
              horizontal
              contentContainerStyle={{
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              style={styles.matchesScrollView}>
              {this.state.matches.map((match, index) => {
                return (
                  <Thumbnail
                    key={index}
                    large
                    source={profileImage4}
                    style={styles.thumbnail}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.conversationsContainer}>
          <ScrollView>
            <Container>
              <Content>
                <List>
                  {this.state.conversations.map((conversation, index) => {
                    return (
                      <ListItem key={index} avatar>
                        <Left>
                          <Thumbnail source={profileImage4} />
                        </Left>
                        <Body>
                          <Text>{conversation.name}</Text>
                          <Text note>{conversation.text}</Text>
                        </Body>
                        <Right>
                          <Text note>3:43 pm</Text>
                        </Right>
                      </ListItem>
                    );
                  })}
                </List>
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
  }
});
