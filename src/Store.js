'use strict';

import updater from './updater';

export default class Store {
  constructor(defaultProps) {
    const that = this;
    this.props = defaultProps || {};
    this.storeId = (Date.now() + Math.ceil(Math.random() * 6474)).toString(16);
    this.fetchActions = {};
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

  addFetchAction(actionName, options) {
    const that = this;
    const method = options.method.toUpperCase();
    that.fetchActions[actionName] = () => {
      const fetchOptions = {
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      if(options.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }
      fetch(options.url, fetchOptions)
      .then(res => res.json())
      .then(json => {
        if(options.propName) {
          that.actions.set(options.propName,  json);
        } else {
          updater.update(that.storeId, json);
        }
      });
    };
  }
}
