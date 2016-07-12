'use strict';

import updater from './updater';

function makeCall(url, fetchOptions) {
  const that = this;
  fetch(url, fetchOptions)
  .then(res => {
    if(!/application\/json/.test(res.headers.get('content-type'))) {
      if(res.ok) {
        updater.update(that.storeId);
      } else {
        throw res.text();//new Error(`HTTP Status code ${res.status} there was an error`);
      }
    } else if(!res.ok) {
      throw res.json();
    }
    return res.json();
  })
  .then(json => {
    if(fetchOptions.propName) {
      that.actions.set(fetchOptions.propName,  json);
    } else {
      updater.update(that.storeId, json);
    }
  })
  .catch(err => {
    if(err instanceof Promise) {
     err.then(err => {
        if(typeof err === 'object' && err.error || err.err) {
          updater.update(`${that.storeId}-error`, err.error || err.err || err.message);
        } else {
          updater.update(`${that.storeId}-error`, err);
        }
     })
    } else {
      updater.update(`${that.storeId}-error`, 'unknown_error');
    }
  })
}

export default class Store {
  constructor(defaultProps) {
    const that = this;
    this.props = defaultProps || {};
    this.storeId = (Date.now() + Math.ceil(Math.random() * 6474)).toString(16);
    this.fetchActions = {};
    // this.inputHandlers = {};
    this.inputs = {};
    this.actions = {
      get(propName) {
        return that.props[propName];
      },
      getAll() {
        return that.props;
      },
      set(propName, value, autoUpdate = true) {
        that.props[propName] = value;
        if(autoUpdate === true) {
          updater.update(that.storeId, propName);
        }
      }
    }
  }

  addErrorCallback(callback) {
    updater.register(`${this.storeId}-error`, callback);
  }

  addCallback(callback) {
    updater.register(this.storeId, callback);
  }

  addAction(actionName, action, autoUpate = true) {
    const that = this;
    if(typeof action !== 'function') {
      return console.error('Store addAction invalid argument type - Actions must be functions');
    }
    this.actions[actionName] = (...args) => {
      action.apply(that, args);
      if(autoUpate === true) {
        updater.update(that.storeId);
      }
    };
  }

  addInput(input) {
    const that = this;
    this.inputs[input] = {
      onChange: ev => {
        this.inputs[input].value = ev.target.value;
        updater.update(that.storeId, input);
      },
      value: ''
    }
  }

  // addInputHandler(input) {
  //   this.inputHandlers[input] = ev => {
  //     this.props[input] = ev.target.value;
  //     updater.update(this.storeId, input);
  //   }
  // }

  addFetchAction(actionName, options) {
    const that = this;
    const method = options.method.toUpperCase();
    that.fetchActions[actionName] = (request) => {
      const fetchOptions = {
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      if(request && request.body) {
        fetchOptions.body = JSON.stringify(request.body);
      }
      function buildUrl(url, urlArgs) {
        if(!urlArgs) return url;

        Object.keys(urlArgs).forEach(argKey => {
          // const regEx = new RegExp(`${argKey}`)
          url = url.replace(argKey, urlArgs[argKey]);
        });
        return url;
      }
      const urlArgs = request && request.urlArgs;
      const url = buildUrl(options.url, urlArgs);
      makeCall.call(that, url, fetchOptions);
    };
  }
}
