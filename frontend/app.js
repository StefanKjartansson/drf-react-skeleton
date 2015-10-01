import React from 'react';
// Needed for React Developer Tools
window.React = React;

import Router, {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import RouterContainer from './services/RouterContainer';

import AuthService from './services/AuthService';
import Master from './master';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

var routes = (
  <Route handler={Master}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="login" handler={Login}/>
    <NotFoundRoute handler={ErrorPage}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt && jwt !== undefined && jwt !== null && jwt !== 'undefined') {
  AuthService.verify(jwt);
}

router.run(function (Handler) {
  React.render(<Handler />, document.body);
});
