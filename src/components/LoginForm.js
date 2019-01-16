import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';

const initialState = {
  email: '',
  password: '',
  error: '',
  loading: false
};

class LoginForm extends Component {
  state = initialState

  onButtonPress = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess())
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess())
          .catch(this.onLoginFail());
      });
  }

  onLoginSuccess = () => {
    this.setState(initialState);
  }

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }
 
  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size={'small'} />;
    }

    return (
      <Button onPress={this.onButtonPress}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            placeholder={'user@gmail.com'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            label={'Password'}
            placeholder={'password'}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
};

export default LoginForm;
