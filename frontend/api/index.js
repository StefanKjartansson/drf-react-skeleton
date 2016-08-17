import BaseAPI from './BaseAPI';

import Auth from './Auth';

class API extends BaseAPI {

  constructor() {
    super();
    this.auth = new Auth(this, 'auth');
  }
}

const api = new API();

export function getSingleton() {
  return api;
}

export default api;
