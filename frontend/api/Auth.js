import LoginActions from '../actions/LoginActions';

import NestedService from './NestedService';


export default class Auth extends NestedService {

  LOGIN_URL = '/api-token-auth/';
  REFRESH_URL = '/api-token-refresh/';
  VERIFY_URL = '/api-token-verify/';

  verify(token) {
    const data = {token};

    return this.service.makeRequest(this.VERIFY_URL, 'POST', data, includeToken=false)
      .then(this._login)
      .catch(err => {
        return this.service.makeRequest(this.REFRESH_URL, 'POST', data, includeToken=false)
          .then(this._login)
          .catch(this.service.handleError);
      })
      .catch(this.service.handleError);
  }

  login(username, password) {
    return this.service
      .makeRequest(this.LOGIN_URL, 'POST', {username, password}, includeToken=false)
      .then(this._login);
  }

  _login(d) {
    LoginActions.loginUser(d);
    return d;
  }

  logout() {
    LoginActions.logoutUser();
  }

}
