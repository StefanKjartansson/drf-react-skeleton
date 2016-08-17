export default class NestedService {

  constructor(service, resource) {
    this.service = service;
    this.resource = resource;
  }

  get resourceURL() {
    return this.service.expandUrl(this.resource);
  }

  itemURL(id) {
    return this.service.expandUrl(this.resource, id);
  }

  detailURL(id, path) {
    return this.service.expandUrl(this.resource, id, path);
  }

  listURL(path) {
    return this.service.expandUrl(this.resource, path);
  }

  makeRequest() {
    return this.service.makeRequest.apply(this.service, Array.from(arguments));
  }

  refresh() {
    console.time(`[${this.resource}].list "${this.resourceURL}"`);
    return this.service.makeRequest(this.resourceURL)
      .then(data => {
        console.timeEnd(`[${this.resource}].list "${this.resourceURL}"`);
        this.onRefresh(data);
        return true;
      })
      .catch(this.service.handleError);
  }

  create(data) {
    let url = this.resourceURL;
    console.time(`[${this.resource}].create "${url}"`);
    return this.service.makeRequest(url, 'POST', data)
      .then(r => {
        console.timeEnd(`[${this.resource}].create "${url}"`);
        if (this.onCreate === undefined) {
          this.refresh();
        } else {
          this.onCreate(r);
        }
        return true;
      })
      .catch(this.service.handleError);
  }

  update(id, data) {
    if (typeof id === 'object') {
      console.error(`[${this.resource}].update called with id object, "${JSON.stringify(id)}"`);
      return;
    }
    let url = this.detailURL(id);
    return this.service.makeRequest(url, 'PUT', data)
      .then(r => {
        if (this.onUpdate === undefined) {
          this.refresh();
        } else {
          this.onUpdate(r);
        }
        return true;
      })
      .catch(this.service.handleError);
  }

  remove(id) {
    return this.service.makeRequest(this.itemURL(id), 'DELETE')
      .then(r => {
        if (this.onDelete === undefined) {
          this.refresh();
        } else {
          this.onDelete(r);
        }
        return true;
      })
      .catch(this.service.handleError);
  }

}
