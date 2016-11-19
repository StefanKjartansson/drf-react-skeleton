import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
  Redirect,
} from 'react-router';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Master from './master';
import API from 'api';
import Radium from 'radium';

const {Style, StyleRoot} = Radium;

import LoginStore, {AuthCheck, UserWrapper} from 'stores/LoginStore';

function createElement(Component, props) {
  return <UserWrapper Component={Component} API={API} {...props}/>;
}

export const routes = (
  <StyleRoot>
  <Router history={hashHistory} createElement={createElement}>
    <Route path="/" component={Master} onEnter={AuthCheck}>
      <Route path="login" component={Login}/>
      <IndexRoute component={Home}/>
      <Route path="*" component={ErrorPage}/>
    </Route>
  </Router>
  </StyleRoot>
);
