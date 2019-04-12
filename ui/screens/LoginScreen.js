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
  Text,
  Input,
  Toast
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { setIsEmployer } from "../redux/app-redux";

import * as firebase from "firebase";

const mapStateToProps = state => {
  return {
    isEmployer: state.isEmployer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIsEmployer: isEmployer => {
      dispatch(setIsEmployer(isEmployer));
    }
  };
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "emp@emp.com",
      password: "emp123",
      spinner: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          if (idTokenResult.claims.isEmployer) {
            Toast.show({
              text: "Employer yay"
            });
          } else {
            Toast.show({
              text: "Employee"
            });
          }
        });
      }
    });
  }

  loginUser = (email, password) => {
    this.setState({ spinner: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await this.setIsEmployerAuthRedux(this.state.isEmployer);
        this.setState({ spinner: false }, () => {
          setTimeout(() => {
            this.props.navigation.navigate("Main");
          }, 100);
        });
      })
      .catch(error => {
        this.setState({ spinner: false }, () => {
          setTimeout(() => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + errorMessage);
          }, 100);
        });
      });
  };

  setIsEmployerAuthRedux = isEmployer => {
    this.props.setIsEmployer(isEmployer);
  };

  signupUser = (email, password) => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <Container style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
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

          <Button
            style={styles.loginButton}
            full
            rounded
            success
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }
          >
            <Text>Login</Text>
          </Button>
          <Button
            style={styles.toSignupPageButton}
            full
            rounded
            primary
            onPress={() =>
              this.signupUser(this.state.email, this.state.password)
            }
          >
            <Text>Sign up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  loginButton: {
    marginTop: 10
  },
  toSignupPageButton: {
    marginTop: 10
  }
});
