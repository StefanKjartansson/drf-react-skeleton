import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer';

export default {
  loginUser: (jwt) => {
    let savedJwt = localStorage.getItem('jwt');
    if (savedJwt !== jwt) {
      localStorage.setItem('jwt', jwt);
    }
    let nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
    RouterContainer.get().transitionTo(nextPath);

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });
  },

  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
};
