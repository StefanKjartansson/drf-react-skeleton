'use strict';

import React from 'react';
import jwtDecode from 'jwt-decode';
import BaseStore from './BaseStore';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';


class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._reset();
  }

  _reset() {
    this._jwt = null;
    this._user = null;
    this._userdata = null;
    this._socket = null;
  }

  _registerToActions(action) {

    const {actionType, data} = action;

    switch (actionType) {

      case LOGIN_USER:
        this._reset();
        this._jwt = data.token;
        this._user = jwtDecode(this._jwt);
        this._userdata = data.user;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._reset();
        this.emitChange();
        break;
    }

  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return !!this._user;
  }

  get data() {
    return {
      email: this.email,
      full_name: this.fullName,
      id: this.id,
      loggedIn: this.isLoggedIn(),
      token: this._jwt,
    };
  }

}

const auth = new LoginStore();
const login = '/login';

export function AuthCheck(nextState, replace) {
  if (!auth.isLoggedIn() && nextState.location.pathname !== login) {
    replace({
      pathname: login,
      state: {nextPathname: nextState.location.pathname}
    });
  }
}

export class UserWrapper extends React.Component {

  state = {user: auth.data};
  onChange = this.onChange.bind(this);

  render() {
    return React.createElement(
      this.props.Component,
      Object.assign({}, this.props, this.state)
    );
  }

  componentDidMount() {
    auth.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    auth.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({user: auth.data});
  }

}

export default auth;
