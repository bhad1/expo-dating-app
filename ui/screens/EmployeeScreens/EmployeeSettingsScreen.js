import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Button,
  Switch
} from "native-base";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import "firebase/firestore";

const db = firebase.firestore();

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePublic: true,
      sliderOneChanging: false,
      sliderOneValue: 0,
      sliderTwoValue: 0,
      genderShownSelection: "Women"
    };
    this.onToggleSwitch = this.onToggleSwitch.bind(this);

    this.SliderOneValuesChangeStart = this.SliderOneValuesChangeStart.bind(
      this
    );
    this.SliderOneValuesChange = this.SliderOneValuesChange.bind(this);
    this.SliderOneValuesChangeFinish = this.SliderOneValuesChangeFinish.bind(
      this
    );
  }
  static navigationOptions = {
    title: "Settings"
  };

  async componentDidMount() {
    // await db.collection("jobs").onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(
    //     function(doc) {
    //       jobsArray.push(doc.data());
    //     },
    //     err => {
    //       console.log(err.message);
    //     }
    //   );
    //   this.setState({
    //     jobs: jobsArray
    //   });
    // });

    //get user by userId that we set in redux on login
    await db
      .collection("users")
      .where(firebase.firestore.FieldPath.documentId(), "==", this.props.userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          let userSettings = doc.data().settings;
          await this.setState({
            profilePublic: userSettings.profilePublic,
            sliderOneValue: userSettings.sliderOneValue,
            sliderTwoValue: userSettings.sliderTwoValue,
            genderShownSelection: userSettings.genderShownSelection
          });
          console.log(this.state.genderShownSelection);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  updateGenderShownOnServer = () => {
    db.collection("users")
      .doc(this.props.userId)
      .update({
        "settings.genderShownSelection": this.state.genderShownSelection
      })
      .then(function() {
        console.log("Gender shown successfully updated!");
      });
  };

  onToggleSwitch = () => {
    this.setState({ profilePublic: !this.state.profilePublic });
    console.log(this.state.profilePublic);
  };

  SliderOneValuesChangeStart() {
    this.setState({
      sliderOneChanging: true
    });
  }

  SliderOneValuesChange(values) {
    this.setState({
      sliderOneValue: values[0],
      sliderTwoValue: values[1]
    });
  }

  SliderOneValuesChangeFinish() {
    this.setState({
      sliderOneChanging: false
    });
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.toggleSwitchSection}>
          <View style={styles.toggleSwitchTextContainer}>
            <Text style={styles.toggleSwitchText}>Profile Public</Text>
          </View>
          <View style={styles.toggleSwitchContainer}>
            <View style={styles.toggleSwitch}>
              <Switch
                value={this.state.profilePublic}
                onValueChange={() => this.onToggleSwitch()}
              />
            </View>
          </View>
        </View>
        <View style={styles.toggleSwitchDescriptionSection}>
          <View style={styles.toggleSwitchDescriptionContainer}>
            <Text style={styles.toggleSwitchDescription}>
              Switching your public profile off makes you hidden to anybody new
              matching with you, but does not hide you from your current matches
            </Text>
          </View>
        </View>

        <View style={styles.ageSliderSection}>
          <View style={styles.ageTextSection}>
            <View style={styles.ageTextContainer}>
              <Text style={styles.ageText}>Age</Text>
            </View>
            <View style={styles.ageValuesContainer}>
              <Text style={styles.ageValues}>
                {this.state.sliderOneValue} - {this.state.sliderTwoValue}
              </Text>
            </View>
          </View>
          <View style={styles.ageSliderContainer}>
            <View style={styles.ageSlider}>
              <MultiSlider
                values={[this.state.sliderOneValue, this.state.sliderTwoValue]}
                sliderLength={280}
                onValuesChangeStart={this.SliderOneValuesChangeStart}
                onValuesChange={this.SliderOneValuesChange}
                onValuesChangeFinish={this.SliderOneValuesChangeFinish}
                min={18}
                max={65}
              />
            </View>
          </View>
        </View>

        <View style={styles.showGenderSection}>
          <View style={styles.showGenderIndicatorSection}>
            <View style={styles.showGenderIndicatorTextContainer}>
              <Text style={styles.showGenderIndicatorText}>Show</Text>
            </View>
            <View style={styles.showGenderIndicatorValueContainer}>
              <Text style={styles.showGenderIndicatorValue}>
                {this.state.genderShownSelection}
              </Text>
            </View>
          </View>
          <Container>
            <Content>
              <ListItem
                onPress={() => this.setState({ genderShownSelection: "Men" })}
              >
                <Left>
                  <Text>Men</Text>
                </Left>
                <Right>
                  <TouchableOpacity>
                    <Radio
                      selected={this.state.genderShownSelection == "Men"}
                    />
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem
                onPress={() => this.setState({ genderShownSelection: "Women" })}
              >
                <Left>
                  <Text>Women</Text>
                </Left>
                <Right>
                  <TouchableOpacity>
                    <Radio
                      selected={this.state.genderShownSelection == "Women"}
                    />
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({ genderShownSelection: "Everyone" })
                }
              >
                <Left>
                  <Text>Everyone</Text>
                </Left>
                <Right>
                  <TouchableOpacity>
                    <Radio
                      onPress={() =>
                        this.setState({ genderShownSelection: "Everyone" })
                      }
                      selected={this.state.genderShownSelection == "Everyone"}
                    />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </Content>
          </Container>
        </View>
        <Button
          style={styles.logoutButton}
          full
          rounded
          danger
          onPress={() => this.logOut()}
        >
          <Text>Sign Out</Text>
        </Button>
      </ScrollView>
    );
  }
}

// export default withNavigation(SettingsScreen);
export default connect(mapStateToProps)(SettingsScreen);

const styles = StyleSheet.create({
  toggleSwitchSection: {
    marginTop: 10,
    height: 70,
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row"
  },
  toggleSwitchTextContainer: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  toggleSwitchContainer: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  toggleSwitchText: {
    paddingLeft: 20,
    fontSize: 19
  },
  toggleSwitch: {
    paddingRight: 20
  },
  ageSliderSection: {
    marginTop: 5,
    height: 110,
    width: "100%",
    backgroundColor: "#fff",
    display: "flex"
  },
  ageTextSection: {
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  ageSliderContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ageSlider: {},
  ageTextContainer: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  ageValuesContainer: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  ageText: {
    paddingLeft: 20,
    fontSize: 19
  },
  ageValues: {
    paddingRight: 20,
    fontSize: 19
  },
  showGenderSection: {
    marginTop: 10,
    height: 175,
    width: "100%",
    backgroundColor: "#f8c536"
  },
  showGenderIndicatorSection: {
    height: 40,
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  showGenderIndicatorValueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  showGenderIndicatorValue: {
    fontSize: 19,
    paddingRight: 20,
    color: "#fff"
  },
  showGenderIndicatorTextContainer: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  showGenderIndicatorText: {
    fontSize: 19,
    paddingLeft: 20,
    color: "#fff"
  },
  toggleSwitchDescription: {
    padding: 10
  },
  logoutButton: {
    marginTop: 15,
    height: 50
  }
});
