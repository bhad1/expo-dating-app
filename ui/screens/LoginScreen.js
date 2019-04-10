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
  Input
} from "native-base";

import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "hey@hey.com",
      password: "coolstuff123"
    };
  }

  loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // alert("Login Successful");
        this.props.navigation.navigate("Main");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + errorMessage);
      });
  };

  signupUser = (email, password) => {
    this.props.navigation.navigate("Signup");
  };
  render() {
    return (
      <Container style={styles.container}>
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
  }
});
