(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _updater = require('./updater');

var _updater2 = _interopRequireDefault(_updater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function makeCall(url, fetchOptions) {
  var that = this;
  var eventName = fetchOptions.eventName || that.storeId;
  var response = {};
  fetch(url, fetchOptions).then(function (res) {
    response.status = res.status;
    response.ok = res.ok;
    if (!/application\/json/.test(res.headers.get('content-type'))) {
      return res.text();
    }
    return res.json();
  }).then(function (resp) {
    if (!response.ok) {
      throw resp;
    }
    if (fetchOptions.propName) {
      that.actions.set(fetchOptions.propName, resp);
    } else {
      _updater2.default.update(eventName, resp);
      if (typeof fetchOptions.onSuccess === 'function') {
        fetchOptions.onSuccess(resp);
      }
    }
  }).catch(function (err) {
    _updater2.default.update(fetchOptions.errorEvent, err);
  });
}

var Store = function () {
  function Store(name, defaultProps) {
    _classCallCheck(this, Store);

    if (!name) {
      throw new Error('Store constructor expects name as first argument');
    }
    var that = this;
    this.storeName = name;
    this.props = defaultProps || {};
    this.storeId = (Date.now() + Math.ceil(Math.random() * 6474)).toString(16);
    this.fetchActions = {};
    this.forms = {};
    this.inputs = {};
    this.actions = {
      get: function get(propName) {
        var returnProp = that.props[propName];
        var storageKey = that.storeName + '-' + propName;

        if (!returnProp) {
          try {
            returnProp = JSON.parse(localStorage.getItem(storageKey));
          } catch (e) {
            returnProp = localStorage.getItem(storageKey);
          }
        }

        if (!returnProp) {
          try {
            returnProp = JSON.parse(sessionStorage.getItem(storageKey));
          } catch (e) {
            returnProp = localStorage.getItem(storageKey);
          }
        }

        return returnProp;
      },
      getAll: function getAll() {
        return that.props;
      },
      set: function set(propName, value) {
        var autoUpdate = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
        var persist = arguments[3];

        that.props[propName] = value;
        var storageKey = that.storeName + '-' + propName;
        if (persist === true) {
          localStorage.setItem(storageKey, value);
        } else if (persist === 'session') {
          localStorage.removeItem(storageKey);
          sessionStorage.setItem(storageKey, value);
        }
        if (autoUpdate === true) {
          _updater2.default.update(that.storeId, propName);
        }
      }
    };
    this.get = this.actions.get;
    this.set = this.actions.set;
    this.getAll = this.actions.getAll;
  }

  _createClass(Store, [{
    key: 'addErrorCallback',
    value: function addErrorCallback(callback) {
      _updater2.default.register(this.storeId + '-error', callback);
    }
  }, {
    key: 'addCallback',
    value: function addCallback(callback) {
      _updater2.default.register(this.storeId, callback);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(callback) {
      _updater2.default.register(this.storeId, callback);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(callback) {
      _updater2.default.unsubscribe(this.storeId, callback);
    }
  }, {
    key: 'addAction',
    value: function addAction(actionName, action) {
      var autoUpate = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var that = this;
      if (typeof action !== 'function') {
        return console.error('Store addAction expects a function as the second argument');
      }
      this.actions[actionName] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        action.apply(that, args);
        if (autoUpate === true) {
          _updater2.default.update(that.storeId);
        }
      };
    }
  }, {
    key: 'addInput',
    value: function addInput(input) {
      var _this = this;

      var that = this;
      this.inputs[input] = {
        onChange: function onChange(ev) {
          _this.inputs[input].value = ev.target.value;
          _updater2.default.update(that.storeId, input);
        },
        value: ''
      };
    }
  }, {
    key: 'getInitalFormState',
    value: function getInitalFormState(fieldNames) {
      var fields = {};
      fieldNames.forEach(function (fieldName) {
        fields[fieldName] = {
          value: '',
          error: null,
          onChange: function onChange(_) {}
        };
      });
      return { fields: fields, onSubmit: function onSubmit(_) {} };
    }
  }, {
    key: 'addForm',
    value: function addForm(options) {
      var _this2 = this;

      var that = this;
      if (!Array.isArray(options.fields)) {
        window.console.error('addForm requires an array of fields names as it\'s second agument');
      }
      var eventName = that.storeId;

      this.forms[options.name] = {
        getForm: function getForm() {
          return {
            fields: this.fields,
            onSubmit: this.onSubmit
          };
        },

        fields: {},
        onSubmit: function onSubmit(ev) {
          ev.preventDefault();
          var body = {};
          var error = false;
          Object.keys(_this2.forms[options.name].fields).forEach(function (field) {
            var fields = _this2.forms[options.name].fields;
            if (fields[field].required && !fields[field].value) {
              _this2.forms[options.name].fields[field].error = 'The ' + field + ' field is required';
              error = true;
            } else {
              _this2.forms[options.name].fields[field].error = null;
            }
            body[field] = fields[field].value;
          });
          if (error === true) {
            return _updater2.default.update(eventName, options.name);
          }
          that.fetchActions[fetchActionName]({
            body: body
          });
        }
      };
      options.fields.forEach(function (field) {
        _this2.forms[options.name].fields[field.name] = {
          value: typeof field.default === 'undefined' ? null : field.default,
          required: field.required || false,
          error: null,
          onChange: function onChange(ev) {
            var value = ev.target.value;
            if (ev.target.type === 'checkbox') {
              value = ev.target.checked;
            }
            that.forms[options.name].fields[field.name].value = value;
            _updater2.default.update(eventName, field);
          }
        };
      });

      if (typeof options.onUpdate === 'function') {
        eventName = that.storeId + '-form';
        _updater2.default.register(eventName, options.onUpdate);
        _updater2.default.register(eventName + '-error', options.onUpdate);
      }
      var formErrorEventName = eventName + '-form-error';
      if (typeof options.errorCallback === 'function') {
        _updater2.default.register(eventName, options.onUpdate);
        _updater2.default.register(formErrorEventName, options.errorCallback);
      }

      var onSuccess = function (name, val) {
        _updater2.default.unregister(eventName);
        options.onSuccess(val);
        this.forms[name] = {};
      }.bind(this, options.name);

      var fetchActionName = options.name + '-form';
      that.addFetchAction(fetchActionName, {
        url: options.url,
        method: 'post', eventName: eventName,
        errorEvent: formErrorEventName,
        onSuccess: onSuccess
      });
    }
  }, {
    key: 'addFetchAction',
    value: function addFetchAction(actionName, options) {
      var that = this;
      var method = options.method.toUpperCase();
      that.fetchActions[actionName] = function (request) {
        var fetchOptions = {
          method: options.method || 'GET',
          headers: { 'Content-Type': 'application/json' },
          eventName: options.eventName || that.storeId,
          errorEvent: options.errorEvent || that.storeId + '-error',
          credentials: 'same-origin',
          onSuccess: options.onSuccess
        };
        if (request && request.body) {
          fetchOptions.body = JSON.stringify(request.body);
        }
        function buildUrl(url, urlArgs) {
          if (!urlArgs) return url;
          Object.keys(urlArgs).forEach(function (argKey) {
            url = url.replace(argKey, urlArgs[argKey]);
          });
          return url;
        }

        var urlArgs = request && request.urlArgs;
        var url = buildUrl(options.url, urlArgs);
        makeCall.call(that, url, fetchOptions);
      };
    }
  }]);

  return Store;
}();

exports.default = Store;

},{"./updater":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var updater = function () {
  var emitter = new _events.EventEmitter();

  var callbacks = {
    default: []
  };

  var unregister = function unregister(eventName) {
    delete callbacks[eventName];
  };

  var register = function register(event, callback) {
    var eventName = 'default';
    if (typeof event === 'function') {
      callback = event;
    } else if (typeof event === 'string') {
      eventName = event;
    }
    if (typeof callbacks[eventName] === 'undefined') {
      callbacks[eventName] = new Set();
    }
    callbacks[eventName].add(callback);

    callbacks[eventName].forEach(function (callback) {
      emitter.on(eventName, callback);
    });
  };

  var unsubscribe = function unsubscribe(eventName, callback) {
    callbacks[eventName].delete(callback);
    emitter.removeListener(eventName, callback);
  };

  var onEvent = function onEvent() {
    callbacks.default.forEach(function (callback) {
      callback();
    });
  };

  emitter.on('update', onEvent);

  var update = function update(event, prop) {
    if (!event) {
      event = 'update';
    }
    emitter.emit(event, prop);
  };

  return {
    register: register,
    unregister: unregister,
    unsubscribe: unsubscribe,
    update: update
  };
}();

exports.default = updater;

},{"events":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsInNyYy9TdG9yZS5qcyIsInNyYy91cGRhdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsWUFBdkIsRUFBcUM7QUFDbkMsTUFBTSxPQUFPLElBQWI7QUFDQSxNQUFNLFlBQVksYUFBYSxTQUFiLElBQTBCLEtBQUss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QVEsUUFBUjtBQUNEO0FBQ0QsWUFBUSxJQUFSLENBQWEsS0FBYixFQUFvQixJQUFwQjtBQUNELEdBTEQ7O0FBT0EsU0FBTztBQUNMLHNCQURLO0FBRUwsMEJBRks7QUFHTCw0QkFISztBQUlMO0FBSkssR0FBUDtBQU1ELENBdkRlLEVBQWhCOztrQkF5RGUsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1cGRhdGVyIGZyb20gJy4vdXBkYXRlcic7XG5cbmZ1bmN0aW9uIG1ha2VDYWxsKHVybCwgZmV0Y2hPcHRpb25zKSB7XG4gIGNvbnN0IHRoYXQgPSB0aGlzO1xuICBjb25zdCBldmVudE5hbWUgPSBmZXRjaE9wdGlvbnMuZXZlbnROYW1lIHx8IHRoYXQuc3RvcmVJZDtcbiAgbGV0IHJlc3BvbnNlID0ge307XG4gIGZldGNoKHVybCwgZmV0Y2hPcHRpb25zKVxuICAudGhlbihyZXMgPT4ge1xuICAgIHJlc3BvbnNlLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgcmVzcG9uc2Uub2sgPSByZXMub2s7XG4gICAgaWYoIS9hcHBsaWNhdGlvblxcL2pzb24vLnRlc3QocmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgIHJldHVybiByZXMudGV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfSlcbiAgLnRoZW4ocmVzcCA9PiB7XG4gICAgaWYoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyByZXNwO1xuICAgIH1cbiAgICBpZihmZXRjaE9wdGlvbnMucHJvcE5hbWUpIHtcbiAgICAgIHRoYXQuYWN0aW9ucy5zZXQoZmV0Y2hPcHRpb25zLnByb3BOYW1lLCAgcmVzcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZXIudXBkYXRlKGV2ZW50TmFtZSwgcmVzcCk7XG4gICAgICBpZih0eXBlb2YgZmV0Y2hPcHRpb25zLm9uU3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmZXRjaE9wdGlvbnMub25TdWNjZXNzKHJlc3ApO1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgdXBkYXRlci51cGRhdGUoZmV0Y2hPcHRpb25zLmVycm9yRXZlbnQsIGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlZmF1bHRQcm9wcykge1xuICAgIGlmKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlIGNvbnN0cnVjdG9yIGV4cGVjdHMgbmFtZSBhcyBmaXJzdCBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnN0b3JlTmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wcm9wcyA9IGRlZmF1bHRQcm9wcyB8fCB7fTtcbiAgICB0aGlzLnN0b3JlSWQgPSAoRGF0ZS5ub3coKSArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNjQ3NCkpLnRvU3RyaW5nKDE2KTtcbiAgICB0aGlzLmZldGNoQWN0aW9ucyA9IHt9O1xuICAgIHRoaXMuZm9ybXMgPSB7fTtcbiAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgIHRoaXMuYWN0aW9ucyA9IHtcbiAgICAgIGdldChwcm9wTmFtZSkge1xuICAgICAgICBsZXQgcmV0dXJuUHJvcCA9IHRoYXQucHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICBjb25zdCBzdG9yYWdlS2V5ID0gYCR7dGhhdC5zdG9yZU5hbWV9LSR7cHJvcE5hbWV9YDtcblxuICAgICAgICBpZighcmV0dXJuUHJvcCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5Qcm9wID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuUHJvcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFyZXR1cm5Qcm9wKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVyblByb3AgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVyblByb3AgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuUHJvcDtcbiAgICAgIH0sXG4gICAgICBnZXRBbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGF0LnByb3BzO1xuICAgICAgfSxcbiAgICAgIHNldChwcm9wTmFtZSwgdmFsdWUsIGF1dG9VcGRhdGUgPSB0cnVlLCBwZXJzaXN0KSB7XG4gICAgICAgIHRoYXQucHJvcHNbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSBgJHt0aGF0LnN0b3JlTmFtZX0tJHtwcm9wTmFtZX1gO1xuICAgICAgICBpZihwZXJzaXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYocGVyc2lzdCA9PT0gJ3Nlc3Npb24nKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYXV0b1VwZGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHVwZGF0ZXIudXBkYXRlKHRoYXQuc3RvcmVJZCwgcHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmdldCA9IHRoaXMuYWN0aW9ucy5nZXQ7XG4gICAgdGhpcy5zZXQgPSB0aGlzLmFjdGlvbnMuc2V0O1xuICAgIHRoaXMuZ2V0QWxsID0gdGhpcy5hY3Rpb25zLmdldEFsbDtcbiAgfVxuXG4gIGFkZEVycm9yQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB1cGRhdGVyLnJlZ2lzdGVyKGAke3RoaXMuc3RvcmVJZH0tZXJyb3JgLCBjYWxsYmFjayk7XG4gIH1cblxuICBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHVwZGF0ZXIucmVnaXN0ZXIodGhpcy5zdG9yZUlkLCBjYWxsYmFjayk7XG4gIH1cblxuICBzdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgICB1cGRhdGVyLnJlZ2lzdGVyKHRoaXMuc3RvcmVJZCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgICB1cGRhdGVyLnVuc3Vic2NyaWJlKHRoaXMuc3RvcmVJZCwgY2FsbGJhY2spO1xuICB9XG5cbiAgYWRkQWN0aW9uKGFjdGlvbk5hbWUsIGFjdGlvbiwgYXV0b1VwYXRlID0gdHJ1ZSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGlmKHR5cGVvZiBhY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdTdG9yZSBhZGRBY3Rpb24gZXhwZWN0cyBhIGZ1bmN0aW9uIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGFjdGlvbi5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgIGlmKGF1dG9VcGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVyLnVwZGF0ZSh0aGF0LnN0b3JlSWQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBhZGRJbnB1dChpbnB1dCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuaW5wdXRzW2lucHV0XSA9IHtcbiAgICAgIG9uQ2hhbmdlOiBldiA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXRzW2lucHV0XS52YWx1ZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdXBkYXRlci51cGRhdGUodGhhdC5zdG9yZUlkLCBpbnB1dCk7XG4gICAgICB9LFxuICAgICAgdmFsdWU6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGdldEluaXRhbEZvcm1TdGF0ZShmaWVsZE5hbWVzKSB7XG4gICAgY29uc3QgZmllbGRzID0ge307XG4gICAgZmllbGROYW1lcy5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICBmaWVsZHNbZmllbGROYW1lXSA9IHtcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgb25DaGFuZ2U6IF8gPT4ge31cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4geyBmaWVsZHMsIG9uU3VibWl0OiBfID0+IHt9IH07XG4gIH1cblxuICBhZGRGb3JtKG9wdGlvbnMpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBpZighQXJyYXkuaXNBcnJheShvcHRpb25zLmZpZWxkcykpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmVycm9yKCdhZGRGb3JtIHJlcXVpcmVzIGFuIGFycmF5IG9mIGZpZWxkcyBuYW1lcyBhcyBpdFxcJ3Mgc2Vjb25kIGFndW1lbnQnKTtcbiAgICB9XG4gICAgbGV0IGV2ZW50TmFtZSA9IHRoYXQuc3RvcmVJZDtcbiAgICBcblxuICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXSA9IHtcbiAgICAgIGdldEZvcm0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZmllbGRzOiB0aGlzLmZpZWxkcyxcbiAgICAgICAgICBvblN1Ym1pdDogdGhpcy5vblN1Ym1pdFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGZpZWxkczoge30sXG4gICAgICBvblN1Ym1pdDogZXYgPT4ge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBib2R5ID0ge307XG4gICAgICAgIGxldCBlcnJvciA9IGZhbHNlO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzO1xuICAgICAgICAgIGlmKGZpZWxkc1tmaWVsZF0ucmVxdWlyZWQgJiYgIWZpZWxkc1tmaWVsZF0udmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGRdLmVycm9yID0gYFRoZSAke2ZpZWxkfSBmaWVsZCBpcyByZXF1aXJlZGA7XG4gICAgICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGRdLmVycm9yID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYm9keVtmaWVsZF0gPSBmaWVsZHNbZmllbGRdLnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYoZXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlci51cGRhdGUoZXZlbnROYW1lLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuZmV0Y2hBY3Rpb25zW2ZldGNoQWN0aW9uTmFtZV0oe1xuICAgICAgICAgIGJvZHlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvcHRpb25zLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGQubmFtZV0gPSB7XG4gICAgICAgIHZhbHVlOiB0eXBlb2YgZmllbGQuZGVmYXVsdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogZmllbGQuZGVmYXVsdCxcbiAgICAgICAgcmVxdWlyZWQ6IGZpZWxkLnJlcXVpcmVkIHx8IGZhbHNlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgb25DaGFuZ2U6IGV2ID0+IHtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgICAgaWYoZXYudGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZXYudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoYXQuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGQubmFtZV0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB1cGRhdGVyLnVwZGF0ZShldmVudE5hbWUsIGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmKHR5cGVvZiBvcHRpb25zLm9uVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldmVudE5hbWUgPSBgJHt0aGF0LnN0b3JlSWR9LWZvcm1gO1xuICAgICAgdXBkYXRlci5yZWdpc3RlcihldmVudE5hbWUsIG9wdGlvbnMub25VcGRhdGUpO1xuICAgICAgdXBkYXRlci5yZWdpc3RlcihgJHtldmVudE5hbWV9LWVycm9yYCwgb3B0aW9ucy5vblVwZGF0ZSk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1FcnJvckV2ZW50TmFtZSA9IGAke2V2ZW50TmFtZX0tZm9ybS1lcnJvcmA7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMuZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdXBkYXRlci5yZWdpc3RlcihldmVudE5hbWUsIG9wdGlvbnMub25VcGRhdGUpO1xuICAgICAgdXBkYXRlci5yZWdpc3Rlcihmb3JtRXJyb3JFdmVudE5hbWUsIG9wdGlvbnMuZXJyb3JDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25TdWNjZXNzID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgICB1cGRhdGVyLnVucmVnaXN0ZXIoZXZlbnROYW1lKVxuICAgICAgb3B0aW9ucy5vblN1Y2Nlc3ModmFsKTtcbiAgICAgIHRoaXMuZm9ybXNbbmFtZV0gPSB7fTtcbiAgICB9LmJpbmQodGhpcywgb3B0aW9ucy5uYW1lKTtcblxuICAgIGNvbnN0IGZldGNoQWN0aW9uTmFtZSA9IGAke29wdGlvbnMubmFtZX0tZm9ybWA7XG4gICAgdGhhdC5hZGRGZXRjaEFjdGlvbihmZXRjaEFjdGlvbk5hbWUsIHsgXG4gICAgICB1cmw6IG9wdGlvbnMudXJsLCBcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLCBldmVudE5hbWUsIFxuICAgICAgZXJyb3JFdmVudDogZm9ybUVycm9yRXZlbnROYW1lLCBcbiAgICAgIG9uU3VjY2Vzczogb25TdWNjZXNzIFxuICAgIH0pO1xuICB9XG5cbiAgYWRkRmV0Y2hBY3Rpb24oYWN0aW9uTmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgdGhhdC5mZXRjaEFjdGlvbnNbYWN0aW9uTmFtZV0gPSAocmVxdWVzdCkgPT4ge1xuICAgICAgY29uc3QgZmV0Y2hPcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgZXZlbnROYW1lOiBvcHRpb25zLmV2ZW50TmFtZSB8fCB0aGF0LnN0b3JlSWQsXG4gICAgICAgIGVycm9yRXZlbnQ6IG9wdGlvbnMuZXJyb3JFdmVudCB8fCBgJHt0aGF0LnN0b3JlSWR9LWVycm9yYCxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIG9uU3VjY2Vzczogb3B0aW9ucy5vblN1Y2Nlc3NcbiAgICAgIH07XG4gICAgICBpZihyZXF1ZXN0ICYmIHJlcXVlc3QuYm9keSkge1xuICAgICAgICBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBidWlsZFVybCh1cmwsIHVybEFyZ3MpIHtcbiAgICAgICAgaWYoIXVybEFyZ3MpIHJldHVybiB1cmw7XG4gICAgICAgIE9iamVjdC5rZXlzKHVybEFyZ3MpLmZvckVhY2goYXJnS2V5ID0+IHtcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShhcmdLZXksIHVybEFyZ3NbYXJnS2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cmxBcmdzID0gcmVxdWVzdCAmJiByZXF1ZXN0LnVybEFyZ3M7XG4gICAgICBjb25zdCB1cmwgPSBidWlsZFVybChvcHRpb25zLnVybCwgdXJsQXJncyk7XG4gICAgICBtYWtlQ2FsbC5jYWxsKHRoYXQsIHVybCwgZmV0Y2hPcHRpb25zKTtcbiAgICB9O1xuICB9XG59IiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuY29uc3QgdXBkYXRlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgIGRlZmF1bHQ6IFtdXG4gIH07XG5cbiAgY29uc3QgdW5yZWdpc3RlciA9IGV2ZW50TmFtZSA9PiB7XG4gICAgZGVsZXRlIGNhbGxiYWNrc1tldmVudE5hbWVdO1xuICB9XG5cbiAgY29uc3QgcmVnaXN0ZXIgPSAoZXZlbnQsIGNhbGxiYWNrKSA9PiB7XG4gICAgbGV0IGV2ZW50TmFtZSA9ICdkZWZhdWx0JztcbiAgICBpZiAodHlwZW9mIGV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGV2ZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgZXZlbnROYW1lID0gZXZlbnQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYWxsYmFja3NbZXZlbnROYW1lXSA9IG5ldyBTZXQoKTtcbiAgICB9XG4gICAgY2FsbGJhY2tzW2V2ZW50TmFtZV0uYWRkKGNhbGxiYWNrKTtcblxuICAgIGNhbGxiYWNrc1tldmVudE5hbWVdLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgZW1pdHRlci5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9KTtcblxuICB9O1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gKGV2ZW50TmFtZSwgY2FsbGJhY2spID0+IHtcbiAgICBjYWxsYmFja3NbZXZlbnROYW1lXS5kZWxldGUoY2FsbGJhY2spO1xuICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBjb25zdCBvbkV2ZW50ID0gKCkgPT4ge1xuICAgIGNhbGxiYWNrcy5kZWZhdWx0LmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTsgIFxuXG4gIGVtaXR0ZXIub24oJ3VwZGF0ZScsIG9uRXZlbnQpO1xuXG4gIGNvbnN0IHVwZGF0ZSA9IChldmVudCwgcHJvcCkgPT4ge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIGV2ZW50ID0gJ3VwZGF0ZSc7XG4gICAgfVxuICAgIGVtaXR0ZXIuZW1pdChldmVudCwgcHJvcCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWdpc3RlcixcbiAgICB1bnJlZ2lzdGVyLFxuICAgIHVuc3Vic2NyaWJlLFxuICAgIHVwZGF0ZVxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVyOyJdfQ==
