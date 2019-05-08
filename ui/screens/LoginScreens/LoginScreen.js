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
import { connect } from "react-redux";
import { setUserToken } from "../../redux/app-redux";
import { setIsEmployer } from "../../redux/app-redux";
import { setUserId } from "../../redux/app-redux";
import LoadingScreen from "../LoadingScreen";

import * as firebase from "firebase";

const mapStateToProps = state => {
  return {
    userToken: state.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserToken: userToken => {
      dispatch(setUserToken(userToken));
    },
    setIsEmployers: isEmployer => {
      dispatch(setIsEmployer(isEmployer));
    },
    setUserId: userId => {
      dispatch(setUserId(userId));
    }
  };
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "yee@yee.com",
      password: "emp123",
      spinner: false,
      userToken: ""
    };
  }

  static navigationOptions = {
    header: null
  };

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
          this.setIsEmployerRedux(idTokenResult.claims.isEmployer);
        });
      }
    });
  }

  loginUser = (email, password) => {
    this.setState({ spinner: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        await user.user.getIdTokenResult().then(async idTokenResult => {
          await this.setUserTokenRedux(idTokenResult.token);
          await this.setUserIdRedux(idTokenResult.claims.user_id);
        });

        this.setState({ spinner: false }, () => {
          this.props.navigation.navigate("Main");
        });
      })
      .catch(error => {
        this.setState({ spinner: false }, () => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode + errorMessage);
        });
      });
  };

  setUserTokenRedux = userToken => {
    this.props.setUserToken(userToken);
  };
  setIsEmployerRedux = isEmployer => {
    this.props.setIsEmployers(isEmployer);
  };
  setUserIdRedux = userId => {
    this.props.setUserId(userId);
  };

  signupUser = (email, password) => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <Container style={styles.container}>
        {/* <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        /> */}
        {this.state.spinner && <LoadingScreen textContent={"Loading..."} />}
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
