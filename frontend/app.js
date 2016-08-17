import React from 'react';
import ReactDOM from 'react-dom';

import API from './api';

import {routes} from './routes';

// needed for React Developer Tools
window.React = React;

const checkToken = () => {
  let jwt = localStorage.getItem('jwt');
  if (
    jwt
    && jwt !== undefined
    && jwt !== null
    && jwt !== 'undefined'
  ) {
    API.auth.verify(jwt);
  }
  // check token every 30 minutes
  setTimeout(checkToken, 1000 * 60 * 30);
};

checkToken();

const app = document.getElementById('app');

try {
  ReactDOM.render(routes, app);
} catch (e) {
  console.error(e);
}
