'use strict';

import _ from 'underscore';

import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';

import AppDispatcher from '../dispatchers/AppDispatcher';


export default class BaseService {

  constructor() {
    this.token = localStorage.getItem('jwt');
    this._dispatchToken = AppDispatcher.register(action => {
      switch (action.actionType) {
        case LOGIN_USER:
          this.token = action.data.token;
          break;

        case LOGOUT_USER:
          delete this.token;
          break;
      }
    });
  }

  getHeaders(includeToken) {
    let h = new Headers();

    h.set('Content-Type', 'application/json');

    if (includeToken && this.token) {
      h.set('Authorization', `JWT ${this.token}`);
    }

    if (window.csrf_token) {
      h.set('X-CSRFToken', window.csrf_token);
    }
    h.set('Accept', `application/json`);

    return h;
  }

  handleError(e) {
    if (e.status === 403) {
      return;
    }
    console.error(e);
  }

  expandUrl() {
    return `/api/${_.compact(Array.from(arguments)).join('/')}/`;
  }

  makeRequest(url, method = 'GET', data = null, includeToken = true) {
    const headers = this.getHeaders(includeToken);
    let context = {
      method,
      headers,
      credentials: 'same-origin',
    };
    if (data) {
      context.body = JSON.stringify(data);
    }
    return fetch(url, context);
  }

}
