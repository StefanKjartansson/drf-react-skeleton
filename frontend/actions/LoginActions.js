import AppDispatcher from '../dispatchers/AppDispatcher';

import {
  LOGIN_USER,
  LOGOUT_USER,
} from '../constants/LoginConstants';

export function loginUser(response) {
  const jwt = response.token;
  const savedJwt = localStorage.getItem('jwt');
  if (savedJwt !== jwt) {
    localStorage.setItem('jwt', jwt);
  }
  AppDispatcher.dispatch({
    actionType: LOGIN_USER,
    data:       response,
  });
};

export function logoutUser() {
  localStorage.removeItem('jwt');
  AppDispatcher.dispatch({
    actionType: LOGOUT_USER,
  });
};
