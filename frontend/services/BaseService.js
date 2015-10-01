
'use strict';

import request from 'reqwest';
import LoginStore from '../stores/LoginStore';


export default class BaseService {
  headers() {
    let jwt = LoginStore._jwt;
    return {
      Authorization: `JWT ${jwt}`,
    };
  }
  makeRequest(url, method = 'GET', data = null) {
    let context = {
      url: url,
      method: method,
      type: 'json',
      contentType: 'application/json',
      headers: this.headers(),
    };
    if (data) {
      context.data = JSON.stringify(data);
    }
    return request(context);
  }
}
