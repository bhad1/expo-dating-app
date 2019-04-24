import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Button,
  Toast,
  Text,
  Input,
  ListItem,
  CheckBox,
  Body
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";

import firebase from "firebase";
// import functions from "firebase-functions";
import "firebase/functions";
import "firebase/firestore";

const db = firebase.firestore();
const firebaseFunctions = firebase.functions();

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showToast: false,
      isEmployer: false,
      spinner: false
    };
  }

  static navigationOptions = {
    header: null
  };

  addEmployerRoleToAuth(userEmail) {
    firebaseFunctions.httpsCallable("addEmployerRole")({
      email: userEmail,
      isEmployer: this.state.isEmployer
    });
  }

  signupUser = (email, password) => {
    this.setState({ spinner: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            firstName: "",
            userBio: "",
            settings: {
              profilePublic: true,
              sliderOneValue: 22,
              sliderTwoValue: 34,
              genderShownSelection: "Men"
            }
          });
      })
      .then(() => {
        // have to do setState as a hack to get around a bug
        this.setState({ spinner: false }, () => {
          setTimeout(() => {
            Toast.show({
              text: "You've successfully created an account!",
              buttonText: "Okay"
            });
            this.backToLogin();
          }, 100);
        });
        this.addEmployerRoleToAuth(email);
      })
      .catch(error => {
        this.setState({ spinner: false }, () => {
          setTimeout(() => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
          }, 100);
        });
      });
  };

  backToLogin = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <Container style={styles.container}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        /> */}
        <Form>
          <Item floatingLabel>
            <Label>Email </Label>
            <Input
              value={this.state.email}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password </Label>
            <Input
              value={this.state.password}
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <ListItem
            onPress={() =>
              this.setState({ isEmployer: !this.state.isEmployer })
            }
          >
            <CheckBox
              checked={this.state.isEmployer}
              onPress={() =>
                this.setState({ isEmployer: !this.state.isEmployer })
              }
            />
            <Body>
              <Text>Are you an employer?</Text>
            </Body>
          </ListItem>

          <Button
            style={styles.loginButton}
            full
            rounded
            primary
            onPress={() =>
              this.signupUser(this.state.email, this.state.password)
            }
          >
            <Text>Sign up</Text>
          </Button>

          <Button
            style={styles.backToLoginButton}
            full
            rounded
            success
            onPress={() => this.backToLogin()}
          >
            <Text>Back to Login</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  loginButton: {
    marginTop: 10
  },
  backToLoginButton: {
    marginTop: 30
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});
