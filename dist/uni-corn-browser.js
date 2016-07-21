(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./updater":4}],3:[function(require,module,exports){
'use strict';

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Store = _Store2.default;

},{"./Store":2}],4:[function(require,module,exports){
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

},{"events":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsInNyYy9TdG9yZS5qcyIsInNyYy9icm93c2VyLWJ1bmRsZS5qcyIsInNyYy91cGRhdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsWUFBdkIsRUFBcUM7QUFDbkMsTUFBTSxPQUFPLElBQWI7QUFDQSxNQUFNLFlB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QUFELEVBQVEsSUFBUixFQUFpQjtBQUM5QixRQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1YsY0FBUSxRQUFSO0FBQ0Q7QUFDRCxZQUFRLElBQVIsQ0FBYSxLQUFiLEVBQW9CLElBQXBCO0FBQ0QsR0FMRDs7QUFPQSxTQUFPO0FBQ0wsc0JBREs7QUFFTCwwQkFGSztBQUdMLDRCQUhLO0FBSUw7QUFKSyxHQUFQO0FBTUQsQ0F2RGUsRUFBaEI7O2tCQXlEZSxPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHVwZGF0ZXIgZnJvbSAnLi91cGRhdGVyJztcblxuZnVuY3Rpb24gbWFrZUNhbGwodXJsLCBmZXRjaE9wdGlvbnMpIHtcbiAgY29uc3QgdGhhdCA9IHRoaXM7XG4gIGNvbnN0IGV2ZW50TmFtZSA9IGZldGNoT3B0aW9ucy5ldmVudE5hbWUgfHwgdGhhdC5zdG9yZUlkO1xuICBsZXQgcmVzcG9uc2UgPSB7fTtcbiAgZmV0Y2godXJsLCBmZXRjaE9wdGlvbnMpXG4gIC50aGVuKHJlcyA9PiB7XG4gICAgcmVzcG9uc2Uuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICByZXNwb25zZS5vayA9IHJlcy5vaztcbiAgICBpZighL2FwcGxpY2F0aW9uXFwvanNvbi8udGVzdChyZXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9KVxuICAudGhlbihyZXNwID0+IHtcbiAgICBpZighcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IHJlc3A7XG4gICAgfVxuICAgIGlmKGZldGNoT3B0aW9ucy5wcm9wTmFtZSkge1xuICAgICAgdGhhdC5hY3Rpb25zLnNldChmZXRjaE9wdGlvbnMucHJvcE5hbWUsICByZXNwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlci51cGRhdGUoZXZlbnROYW1lLCByZXNwKTtcbiAgICAgIGlmKHR5cGVvZiBmZXRjaE9wdGlvbnMub25TdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZldGNoT3B0aW9ucy5vblN1Y2Nlc3MocmVzcCk7XG4gICAgICB9XG4gICAgfVxuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICB1cGRhdGVyLnVwZGF0ZShmZXRjaE9wdGlvbnMuZXJyb3JFdmVudCwgZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVmYXVsdFByb3BzKSB7XG4gICAgaWYoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmUgY29uc3RydWN0b3IgZXhwZWN0cyBuYW1lIGFzIGZpcnN0IGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuc3RvcmVOYW1lID0gbmFtZTtcbiAgICB0aGlzLnByb3BzID0gZGVmYXVsdFByb3BzIHx8IHt9O1xuICAgIHRoaXMuc3RvcmVJZCA9IChEYXRlLm5vdygpICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA2NDc0KSkudG9TdHJpbmcoMTYpO1xuICAgIHRoaXMuZmV0Y2hBY3Rpb25zID0ge307XG4gICAgdGhpcy5mb3JtcyA9IHt9O1xuICAgIHRoaXMuaW5wdXRzID0ge307XG4gICAgdGhpcy5hY3Rpb25zID0ge1xuICAgICAgZ2V0KHByb3BOYW1lKSB7XG4gICAgICAgIGxldCByZXR1cm5Qcm9wID0gdGhhdC5wcm9wc1twcm9wTmFtZV07XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSBgJHt0aGF0LnN0b3JlTmFtZX0tJHtwcm9wTmFtZX1gO1xuXG4gICAgICAgIGlmKCFyZXR1cm5Qcm9wKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVyblByb3AgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm5Qcm9wID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXJldHVyblByb3ApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuUHJvcCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuUHJvcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5Qcm9wO1xuICAgICAgfSxcbiAgICAgIGdldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoYXQucHJvcHM7XG4gICAgICB9LFxuICAgICAgc2V0KHByb3BOYW1lLCB2YWx1ZSwgYXV0b1VwZGF0ZSA9IHRydWUsIHBlcnNpc3QpIHtcbiAgICAgICAgdGhhdC5wcm9wc1twcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgY29uc3Qgc3RvcmFnZUtleSA9IGAke3RoYXQuc3RvcmVOYW1lfS0ke3Byb3BOYW1lfWA7XG4gICAgICAgIGlmKHBlcnNpc3QgPT09IHRydWUpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZihwZXJzaXN0ID09PSAnc2Vzc2lvbicpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihhdXRvVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgdXBkYXRlci51cGRhdGUodGhhdC5zdG9yZUlkLCBwcm9wTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZ2V0ID0gdGhpcy5hY3Rpb25zLmdldDtcbiAgICB0aGlzLnNldCA9IHRoaXMuYWN0aW9ucy5zZXQ7XG4gICAgdGhpcy5nZXRBbGwgPSB0aGlzLmFjdGlvbnMuZ2V0QWxsO1xuICB9XG5cbiAgYWRkRXJyb3JDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHVwZGF0ZXIucmVnaXN0ZXIoYCR7dGhpcy5zdG9yZUlkfS1lcnJvcmAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdXBkYXRlci5yZWdpc3Rlcih0aGlzLnN0b3JlSWQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHN1YnNjcmliZShjYWxsYmFjaykge1xuICAgIHVwZGF0ZXIucmVnaXN0ZXIodGhpcy5zdG9yZUlkLCBjYWxsYmFjayk7XG4gIH1cblxuICB1bnN1YnNjcmliZShjYWxsYmFjaykge1xuICAgIHVwZGF0ZXIudW5zdWJzY3JpYmUodGhpcy5zdG9yZUlkLCBjYWxsYmFjayk7XG4gIH1cblxuICBhZGRBY3Rpb24oYWN0aW9uTmFtZSwgYWN0aW9uLCBhdXRvVXBhdGUgPSB0cnVlKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgaWYodHlwZW9mIGFjdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1N0b3JlIGFkZEFjdGlvbiBleHBlY3RzIGEgZnVuY3Rpb24gYXMgdGhlIHNlY29uZCBhcmd1bWVudCcpO1xuICAgIH1cbiAgICB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgYWN0aW9uLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgaWYoYXV0b1VwYXRlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZXIudXBkYXRlKHRoYXQuc3RvcmVJZCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGFkZElucHV0KGlucHV0KSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5pbnB1dHNbaW5wdXRdID0ge1xuICAgICAgb25DaGFuZ2U6IGV2ID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dHNbaW5wdXRdLnZhbHVlID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgICAgICB1cGRhdGVyLnVwZGF0ZSh0aGF0LnN0b3JlSWQsIGlucHV0KTtcbiAgICAgIH0sXG4gICAgICB2YWx1ZTogJydcbiAgICB9O1xuICB9XG5cbiAgZ2V0SW5pdGFsRm9ybVN0YXRlKGZpZWxkTmFtZXMpIHtcbiAgICBjb25zdCBmaWVsZHMgPSB7fTtcbiAgICBmaWVsZE5hbWVzLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICAgIGZpZWxkc1tmaWVsZE5hbWVdID0ge1xuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBvbkNoYW5nZTogXyA9PiB7fVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7IGZpZWxkcywgb25TdWJtaXQ6IF8gPT4ge30gfTtcbiAgfVxuXG4gIGFkZEZvcm0ob3B0aW9ucykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGlmKCFBcnJheS5pc0FycmF5KG9wdGlvbnMuZmllbGRzKSkge1xuICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IoJ2FkZEZvcm0gcmVxdWlyZXMgYW4gYXJyYXkgb2YgZmllbGRzIG5hbWVzIGFzIGl0XFwncyBzZWNvbmQgYWd1bWVudCcpO1xuICAgIH1cbiAgICBsZXQgZXZlbnROYW1lID0gdGhhdC5zdG9yZUlkO1xuICAgIFxuXG4gICAgdGhpcy5mb3Jtc1tvcHRpb25zLm5hbWVdID0ge1xuICAgICAgZ2V0Rm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBmaWVsZHM6IHRoaXMuZmllbGRzLFxuICAgICAgICAgIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgZmllbGRzOiB7fSxcbiAgICAgIG9uU3VibWl0OiBldiA9PiB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB7fTtcbiAgICAgICAgbGV0IGVycm9yID0gZmFsc2U7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHM7XG4gICAgICAgICAgaWYoZmllbGRzW2ZpZWxkXS5yZXF1aXJlZCAmJiAhZmllbGRzW2ZpZWxkXS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jtc1tvcHRpb25zLm5hbWVdLmZpZWxkc1tmaWVsZF0uZXJyb3IgPSBgVGhlICR7ZmllbGR9IGZpZWxkIGlzIHJlcXVpcmVkYDtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3Jtc1tvcHRpb25zLm5hbWVdLmZpZWxkc1tmaWVsZF0uZXJyb3IgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBib2R5W2ZpZWxkXSA9IGZpZWxkc1tmaWVsZF0udmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZihlcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiB1cGRhdGVyLnVwZGF0ZShldmVudE5hbWUsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5mZXRjaEFjdGlvbnNbZmV0Y2hBY3Rpb25OYW1lXSh7XG4gICAgICAgICAgYm9keVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG9wdGlvbnMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgdGhpcy5mb3Jtc1tvcHRpb25zLm5hbWVdLmZpZWxkc1tmaWVsZC5uYW1lXSA9IHtcbiAgICAgICAgdmFsdWU6IHR5cGVvZiBmaWVsZC5kZWZhdWx0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBmaWVsZC5kZWZhdWx0LFxuICAgICAgICByZXF1aXJlZDogZmllbGQucmVxdWlyZWQgfHwgZmFsc2UsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBvbkNoYW5nZTogZXYgPT4ge1xuICAgICAgICAgIGxldCB2YWx1ZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICBpZihldi50YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgdmFsdWUgPSBldi50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhhdC5mb3Jtc1tvcHRpb25zLm5hbWVdLmZpZWxkc1tmaWVsZC5uYW1lXS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIHVwZGF0ZXIudXBkYXRlKGV2ZW50TmFtZSwgZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgaWYodHlwZW9mIG9wdGlvbnMub25VcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2ZW50TmFtZSA9IGAke3RoYXQuc3RvcmVJZH0tZm9ybWA7XG4gICAgICB1cGRhdGVyLnJlZ2lzdGVyKGV2ZW50TmFtZSwgb3B0aW9ucy5vblVwZGF0ZSk7XG4gICAgICB1cGRhdGVyLnJlZ2lzdGVyKGAke2V2ZW50TmFtZX0tZXJyb3JgLCBvcHRpb25zLm9uVXBkYXRlKTtcbiAgICB9XG4gICAgY29uc3QgZm9ybUVycm9yRXZlbnROYW1lID0gYCR7ZXZlbnROYW1lfS1mb3JtLWVycm9yYDtcbiAgICBpZih0eXBlb2Ygb3B0aW9ucy5lcnJvckNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB1cGRhdGVyLnJlZ2lzdGVyKGV2ZW50TmFtZSwgb3B0aW9ucy5vblVwZGF0ZSk7XG4gICAgICB1cGRhdGVyLnJlZ2lzdGVyKGZvcm1FcnJvckV2ZW50TmFtZSwgb3B0aW9ucy5lcnJvckNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjb25zdCBvblN1Y2Nlc3MgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgICAgIHVwZGF0ZXIudW5yZWdpc3RlcihldmVudE5hbWUpXG4gICAgICBvcHRpb25zLm9uU3VjY2Vzcyh2YWwpO1xuICAgICAgdGhpcy5mb3Jtc1tuYW1lXSA9IHt9O1xuICAgIH0uYmluZCh0aGlzLCBvcHRpb25zLm5hbWUpO1xuXG4gICAgY29uc3QgZmV0Y2hBY3Rpb25OYW1lID0gYCR7b3B0aW9ucy5uYW1lfS1mb3JtYDtcbiAgICB0aGF0LmFkZEZldGNoQWN0aW9uKGZldGNoQWN0aW9uTmFtZSwgeyBcbiAgICAgIHVybDogb3B0aW9ucy51cmwsIFxuICAgICAgbWV0aG9kOiAncG9zdCcsIGV2ZW50TmFtZSwgXG4gICAgICBlcnJvckV2ZW50OiBmb3JtRXJyb3JFdmVudE5hbWUsIFxuICAgICAgb25TdWNjZXNzOiBvblN1Y2Nlc3MgXG4gICAgfSk7XG4gIH1cblxuICBhZGRGZXRjaEFjdGlvbihhY3Rpb25OYW1lLCBvcHRpb25zKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3QgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICB0aGF0LmZldGNoQWN0aW9uc1thY3Rpb25OYW1lXSA9IChyZXF1ZXN0KSA9PiB7XG4gICAgICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBldmVudE5hbWU6IG9wdGlvbnMuZXZlbnROYW1lIHx8IHRoYXQuc3RvcmVJZCxcbiAgICAgICAgZXJyb3JFdmVudDogb3B0aW9ucy5lcnJvckV2ZW50IHx8IGAke3RoYXQuc3RvcmVJZH0tZXJyb3JgLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgb25TdWNjZXNzOiBvcHRpb25zLm9uU3VjY2Vzc1xuICAgICAgfTtcbiAgICAgIGlmKHJlcXVlc3QgJiYgcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkVXJsKHVybCwgdXJsQXJncykge1xuICAgICAgICBpZighdXJsQXJncykgcmV0dXJuIHVybDtcbiAgICAgICAgT2JqZWN0LmtleXModXJsQXJncykuZm9yRWFjaChhcmdLZXkgPT4ge1xuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKGFyZ0tleSwgdXJsQXJnc1thcmdLZXldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybEFyZ3MgPSByZXF1ZXN0ICYmIHJlcXVlc3QudXJsQXJncztcbiAgICAgIGNvbnN0IHVybCA9IGJ1aWxkVXJsKG9wdGlvbnMudXJsLCB1cmxBcmdzKTtcbiAgICAgIG1ha2VDYWxsLmNhbGwodGhhdCwgdXJsLCBmZXRjaE9wdGlvbnMpO1xuICAgIH07XG4gIH1cbn0iLCJpbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG53aW5kb3cuU3RvcmUgPSBTdG9yZTsiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG5jb25zdCB1cGRhdGVyID0gKCgpID0+IHtcbiAgY29uc3QgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgZGVmYXVsdDogW11cbiAgfTtcblxuICBjb25zdCB1bnJlZ2lzdGVyID0gZXZlbnROYW1lID0+IHtcbiAgICBkZWxldGUgY2FsbGJhY2tzW2V2ZW50TmFtZV07XG4gIH1cblxuICBjb25zdCByZWdpc3RlciA9IChldmVudCwgY2FsbGJhY2spID0+IHtcbiAgICBsZXQgZXZlbnROYW1lID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0eXBlb2YgZXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gZXZlbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXZlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBldmVudE5hbWUgPSBldmVudDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFja3NbZXZlbnROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNhbGxiYWNrc1tldmVudE5hbWVdID0gbmV3IFNldCgpO1xuICAgIH1cbiAgICBjYWxsYmFja3NbZXZlbnROYW1lXS5hZGQoY2FsbGJhY2spO1xuXG4gICAgY2FsbGJhY2tzW2V2ZW50TmFtZV0uZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBlbWl0dGVyLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgY29uc3QgdW5zdWJzY3JpYmUgPSAoZXZlbnROYW1lLCBjYWxsYmFjaykgPT4ge1xuICAgIGNhbGxiYWNrc1tldmVudE5hbWVdLmRlbGV0ZShjYWxsYmFjayk7XG4gICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNvbnN0IG9uRXZlbnQgPSAoKSA9PiB7XG4gICAgY2FsbGJhY2tzLmRlZmF1bHQuZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9OyAgXG5cbiAgZW1pdHRlci5vbigndXBkYXRlJywgb25FdmVudCk7XG5cbiAgY29uc3QgdXBkYXRlID0gKGV2ZW50LCBwcm9wKSA9PiB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgZXZlbnQgPSAndXBkYXRlJztcbiAgICB9XG4gICAgZW1pdHRlci5lbWl0KGV2ZW50LCBwcm9wKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlZ2lzdGVyLFxuICAgIHVucmVnaXN0ZXIsXG4gICAgdW5zdWJzY3JpYmUsXG4gICAgdXBkYXRlXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZXI7Il19
