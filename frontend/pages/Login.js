import _ from 'underscore';
import React from 'react';
import API from '../api';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      userErrorText: '',
      passwordErrorText: '',
      hasError: false,
    };
  }

  login(e) {
    e.preventDefault();
    API.auth.login(this.state.user, this.state.password)
      .catch((err) => {
        let rt = JSON.parse(err.responseText);
        let stateUpdate = {
          userErrorText: '',
          passwordErrorText: '',
          hasError: false,
        };
        if (_.has(rt, 'username')) {
          stateUpdate.userErrorText = rt.username.join(' ');
          stateUpdate.hasError = true;
        }
        if (_.has(rt, 'password')) {
          stateUpdate.passwordErrorText = rt.password.join(' ');
          stateUpdate.hasError = true;
        }
        if (_.has(rt, 'non_field_errors')) {
          stateUpdate.userErrorText = '';
          stateUpdate.passwordErrorText = rt.non_field_errors.join(' ');
          stateUpdate.hasError = true;
        }
        this.setState(stateUpdate);
      });
  }

  get userField() {
    return (
      <input
        type="text"
        autoComplete="off"
        autoFocus
        onChange={(e) => {
          this.setState({
            userErrorText: '',
            user: e.target.value,
          });
        }}/>
    );
  }

  get passwordField() {
    return (
      <input
        type="password"
        autoComplete="off"
        onChange={(e) => {
          this.setState({
            passwordErrorText: '',
            password: e.target.value,
          });
        }}
        onKeyDown={(e) => {
          if (e.which === 13) {
            this.login(e);
          }
        }}/>
    );
  }

  get loginButton() {
    let enabled = this.state.password !== '' && this.state.user !== '';
    return (
      <button
        disabled={!enabled}
        onClick={this.login}>
      Login
      </button>
    );
  }

  render() {
    return (
      <div className={'login'}>
        {this.userField}
        {this.passwordField}
        {this.loginButton}
      </div>
    );
  }
}
