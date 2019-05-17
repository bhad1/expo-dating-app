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
  H3
} from "native-base";
import { connect } from "react-redux";

import profileImage4 from "../../assets/images/robot-prod.png";

const mapStateToProps = state => {
  return {
    jobsSwipedRightOn: state.jobsSwipedRightOn
  };
};

class EmployeeMyJobsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsLiked: [...this.props.jobsSwipedRightOn],
      jobsAppliedFor: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.JobsIveLikedContainer}>
          <View style={styles.JobsIveLikedTitleContainer}>
            <H3>Liked</H3>
          </View>
          <ScrollView>
            <Container>
              <Content>
                <List>
                  {this.state.jobsLiked.map((job, index) => {
                    if (job === "default") {
                      return;
                    }
                    return (
                      <ListItem key={index} avatar>
                        <Left>
                          <Thumbnail source={profileImage4} />
                        </Left>
                        <Body>
                          <Text>{job.company}</Text>
                          <Text note>{job.jobDescription}</Text>
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
        <View style={styles.JobsIveAppliedTo}>
          <View style={styles.JobsIveAppliedToTitleContainer}>
            <H3>Applied</H3>
          </View>
          <ScrollView>
            <Container>
              <Content>
                <List>
                  {this.state.jobsAppliedFor.map((conversation, index) => {
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

export default connect(mapStateToProps)(EmployeeMyJobsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 45
  },
  JobsIveLikedContainer: {
    flex: 1,
    display: "flex",
    borderBottomColor: "#bbb",
    borderBottomWidth: 1
  },
  JobsIveAppliedTo: {
    flex: 1,
    display: "flex"
  },
  thumbnail: {
    marginRight: 15
  },
  JobsIveLikedTitleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  JobsIveAppliedToTitleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
