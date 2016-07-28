updater = require('./updater');

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
    if(fetchOptions.propName) {
      that.actions.set(fetchOptions.propName,  resp);
    } else {
      updater.update(eventName, resp);
      if(typeof fetchOptions.onSuccess === 'function') {
        fetchOptions.onSuccess(resp);
      }
    }
  })
  .catch(err => {
    updater.update(fetchOptions.errorEvent, err);
  });
}

module.exports = class Store {
  constructor(name, defaultProps) {
    if(!name) {
      throw new Error('Store constructor expects name as first argument');
    }
    const that = this;
    this.storeName = name;
    this.props = defaultProps || {};
    this.storeId = (Date.now() + Math.ceil(Math.random() * 6474)).toString(16);
    this.fetchActions = {};
    this.forms = {};
    this.inputs = {};
    this.actions = {
      get(propName) {
        let returnProp = that.props[propName];
        const storageKey = `${that.storeName}-${propName}`;

        if(typeof returnProp === 'undefined') {
          try {
            returnProp = JSON.parse(localStorage.getItem(storageKey));
          } catch (e) {
            returnProp = localStorage.getItem(storageKey);
          }
        }

        if(typeof returnProp === 'undefined') {
          try {
            returnProp = JSON.parse(sessionStorage.getItem(storageKey));
          } catch (e) {
            returnProp = localStorage.getItem(storageKey);
          }
        }

        return returnProp;
      },
      getAll() {
        return that.props;
      },
      set(key, value, autoUpdate = true, persist) {
        that.props[key] = value;
        const storageKey = `${that.storeName}-${key}`;
        if(persist === true) {
          localStorage.setItem(storageKey, value);
        } else if(persist === 'session') {
          localStorage.removeItem(storageKey);
          sessionStorage.setItem(storageKey, value);
        }
        if(autoUpdate === true) {
          updater.update(that.storeId, key);
        }
      }
    };
    this.get = this.actions.get;
    this.set = this.actions.set;
    this.getAll = this.actions.getAll;
  }

  addErrorCallback(callback) {
    updater.register(`${this.storeId}-error`, callback);
  }

  onError(callback) {
    updater.register(`${this.storeId}-error`, callback);
  }

  removeOnError(callback) {
    updater.unsubscribe(`${this.storeId}-error`, callback);
  }

  addCallback(callback) {
    updater.register(this.storeId, callback);
  }

  subscribe(callback) {
    updater.register(this.storeId, callback);
  }

  unsubscribe(callback) {
    updater.unsubscribe(this.storeId, callback);
  }

  forceUpdate(status) {
    updater.update(this.storeId, status);
  }

  forceError(err) {
    updater.update(`${this.storeId}-error`, err);
  }

  addAction(actionName, action, autoUpate = false) {
    const that = this;
    if(typeof action !== 'function') {
      return console.error('Store addAction expects a function as the second argument');
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

  getInitalFormState(fieldNames) {
    const fields = {};
    fieldNames.forEach(fieldName => {
      fields[fieldName] = {
        value: '',
        error: null,
        onChange: _ => {}
      }
    });
    return { fields, onSubmit: _ => {} };
  }

  addForm(options) {
    if(!options.url && !options.action) {
      return console.error('Store.addForm() requires either a url or action option to be set');
    }
    const that = this;
    if(!Array.isArray(options.fields)) {
      window.console.error('addForm requires an array of fields names as it\'s second agument');
    }
    let eventName = that.storeId;
    
    let submitAction = () => {
      console.log('no action or url specified. Doing nothing!');
    };

    this.forms[options.name] = {
      getForm() {
        return {
          fields: this.fields,
          onSubmit: this.onSubmit
        };
      },
      fields: {},
      onSubmit: ev => {
        ev.preventDefault();
        const body = {};
        let error = false;
        Object.keys(this.forms[options.name].fields).forEach(field => {
          const fields = this.forms[options.name].fields;
          if(fields[field].required && !fields[field].value) {
            this.forms[options.name].fields[field].error = `The ${field} field is required`;
            error = true;
          } else {
            this.forms[options.name].fields[field].error = null;
          }
          body[field] = fields[field].value;
        });
        if(error === true) {
          return updater.update(eventName, options.name);
        }
        submitAction({
          body
        });
      }
    };

    options.fields.forEach(field => {
      this.forms[options.name].fields[field.name] = {
        value: typeof field.default === 'undefined' ? null : field.default,
        required: field.required || false,
        error: null,
        onChange: ev => {
          let value = ev.target.value;
          if(ev.target.type === 'checkbox') {
            value = ev.target.checked;
          }
          that.forms[options.name].fields[field.name].value = value;
          updater.update(eventName, field);
        }
      };
    });

    if(typeof options.onUpdate === 'function') {
      eventName = `${that.storeId}-form`;
      updater.register(eventName, options.onUpdate);
      updater.register(`${eventName}-error`, options.onUpdate);
    }
    const formErrorEventName = `${eventName}-form-error`;
    if(typeof options.errorCallback === 'function') {
      updater.register(eventName, options.onUpdate);
      updater.register(formErrorEventName, options.errorCallback);
    }

    if(options.url) {
      const onSuccess = function(name, val) {
        updater.unregister(eventName)
        options.onSuccess(val);
        this.forms[name] = {};
      }.bind(this, options.name);

      const fetchActionName = `${options.name}-form`;
      that.addFetchAction(fetchActionName, { 
        url: options.url, 
        method: 'post', eventName, 
        errorEvent: formErrorEventName, 
        onSuccess: onSuccess 
      });
      submitAction = that.fetchActions[fetchActionName];
    } else if(options.action) {
      submitAction = this.actions[options.action];
    }
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
        credentials: 'same-origin',
        onSuccess: options.onSuccess
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