'use strict';

import React from 'react';
import LoginStore from './stores/LoginStore';
import {RouteHandler} from 'react-router';
import AuthService from './services/AuthService';

export default class Master extends React.Component {

  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
    };
    this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn(),
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {

    if (!this.state.userLoggedIn) {
      return (
        <div>
          <RouteHandler/>
        </div>
      );
    }

    return (
      <div>
        {this.navigation}
        <div className={'main'}>
            <RouteHandler/>
        </div>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get navigation() {
    return (
      <div />
    );
  }

}
