import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, VERIFY_URL, REFRESH_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

  verify(token) {
    return this.handleAuth(when(request({
      url: VERIFY_URL,
      method: 'POST',
      type: 'json',
      data: {
        token: token,
      }
    })))
    .catch((err) => {
      console.log(err);
      this.refresh(token);
    });
  }

  refresh(token) {
    return this.handleAuth(when(request({
      url: REFRESH_URL,
      method: 'POST',
      type: 'json',
      data: {
        token: token,
      }
    })))
    .catch((err) => {
      console.log(err);
      this.logout();
    });
  }

  login(username, password) {
    return this.handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      type: 'json',
      data: {
        username: username,
        password: password,
      }
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then((response) => {
        var jwt = response.token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
}

export default new AuthService();
