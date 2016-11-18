import React from 'react';


export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
    usernameErrorText: '',
    passwordErrorText: '',
  };

  login = this.login.bind(this);

  login(e) {

    e && e.preventDefault();

    const {
      username,
      password,
    } = this.state;

    this.props.API.auth.login(username, password)
      .catch(obj => {

        let stateUpdate = {
          usernameErrorText: '',
          passwordErrorText: '',
        };

        ['username', 'password'].forEach(key => {
          if (obj.hasOwnProperty(key)) {
            stateUpdate[`${key}ErrorText`] = obj[key].join(', ');
          }
        });

        if (obj.hasOwnProperty('non_field_errors')) {
          stateUpdate.usernameErrorText = '';
          stateUpdate.passwordErrorText = obj.non_field_errors.join(', ');
        }

        this.setState(stateUpdate);
      });
  }

  render() {
    return (
      <form>
        {this.usernameField}
        {this.passwordField}
        {this.button}
      </form>
    );
  }

  get usernameField() {
    return (
      <input
        type="text"
        autoComplete="off"
        autoFocus
        onChange={(e) => {
          this.setState({
            usernameErrorText: '',
            username: e.target.value,
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

  get button() {

    const {
      username,
      password,
    } = this.state;

    const enabled = password !== '' && username !== '';

    return (
      <button
        disabled={!enabled}
        onClick={this.login}>
      Login
      </button>
    );
  }

};
