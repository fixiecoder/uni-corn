'use strict';

import updater from './updater';

function makeCall(url, fetchOptions) {
  const that = this;
  const eventName = fetchOptions.eventName || that.storeId;
  let response = {};
  fetch(url, fetchOptions)
  .then(res => {
    response.status = res.status;
    response.ok = res.ok;
    if(!/application\/json/.test(res.headers.get('content-type'))) {
      return res.text();
    }
    return res.json();
  })
  .then(resp => {
    if(!response.ok) {
      throw resp;
    }
    console.log('AUTH', resp);
    if(fetchOptions.propName) {
      that.actions.set(fetchOptions.propName,  resp);
    } else {
      updater.update(eventName, resp);
    }
  })
  .catch(err => {
    updater.update(fetchOptions.errorEvent, err);
    console.warn(err);
  });
}

export default class Store {
  constructor(defaultProps) {
    const that = this;
    this.props = defaultProps || {};
    this.storeId = (Date.now() + Math.ceil(Math.random() * 6474)).toString(16);
    this.fetchActions = {};
    this.forms = {};
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
    };
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
    };
  }

  addForm(options) {
    const that = this;
    if(!Array.isArray(options.fields)) {
      window.console.error('addForm requires an array of fields names as it\'s second agument');
    }
    let eventName = that.storeId;
    if(typeof options.callback === 'function') {
      eventName = `${that.storeId}-form`;
      updater.register(eventName, options.callback);
      updater.register(`${eventName}-error`, options.callback);
    }
    const formErrorEventName = `${eventName}-form-error`;
    if(typeof options.errorCallback === 'function') {
      updater.register(eventName, options.callback);
      updater.register(formErrorEventName, options.errorCallback);
    }
    const fetchActionName = `${options.name}-form`;
    that.addFetchAction(fetchActionName, { url: options.url, method: 'post', eventName, errorEvent: formErrorEventName });
    this.forms[options.name] = {
      fields: {},
      onSubmit: _ => {
        const body = {};
        Object.keys(this.forms[options.name].fields).forEach(field => {
          body[field] = this.forms[options.name].fields[field].value;
        });
        that.fetchActions[fetchActionName]({
          body
        });
      }
    };
    options.fields.forEach(field => {
      this.forms[options.name].fields[field] = {
        value: '',
        error: null,
        onChange: ev => {
          that.forms[options.name].fields[field].value = ev.target.value;
          updater.update(eventName, field);
        }
      };
    });
  }

  addFetchAction(actionName, options) {
    const that = this;
    const method = options.method.toUpperCase();
    that.fetchActions[actionName] = (request) => {
      const fetchOptions = {
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        eventName: options.eventName || that.storeId,
        errorEvent: options.errorEvent || `${that.storeId}-error`,
        credentials: 'same-origin'
      };
      if(request && request.body) {
        fetchOptions.body = JSON.stringify(request.body);
      }
      function buildUrl(url, urlArgs) {
        if(!urlArgs) return url;
        Object.keys(urlArgs).forEach(argKey => {
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
