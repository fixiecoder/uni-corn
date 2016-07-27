(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	updater = __webpack_require__(1);

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

	  addCallback(callback) {
	    updater.register(this.storeId, callback);
	  }

	  subscribe(callback) {
	    updater.register(this.storeId, callback);
	  }

	  unsubscribe(callback) {
	    updater.unsubscribe(this.storeId, callback);
	  }

	  forceUpdate() {
	    updater.update(this.storeId);
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
	    const that = this;
	    if(!Array.isArray(options.fields)) {
	      window.console.error('addForm requires an array of fields names as it\'s second agument');
	    }
	    let eventName = that.storeId;
	    
	    let submitAction = () => {
	      console.log('no action or fetch specified.')
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
	      submitAction = options.action;
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	EventEmitter = __webpack_require__(2).EventEmitter;
	const updater = (() => {
	  const emitter = new EventEmitter();

	  const callbacks = {
	    default: []
	  };

	  const unregister = eventName => {
	    delete callbacks[eventName];
	  }

	  const register = (event, callback) => {
	    let eventName = 'default';
	    if (typeof event === 'function') {
	      callback = event;
	    } else if (typeof event === 'string') {
	      eventName = event;
	    }
	    emitter.on(eventName, callback);
	  };

	  const unsubscribe = (eventName, callback) => {
	    emitter.removeListener(eventName, callback);
	  }

	  const onEvent = () => {
	    callbacks.default.forEach(callback => {
	      callback();
	    });
	  };  

	  emitter.on('update', onEvent);

	  const update = (event, prop) => {
	    if (!event) {
	      event = 'update';
	    }
	    emitter.emit(event, prop);
	  };

	  return {
	    register,
	    unregister,
	    unsubscribe,
	    update
	  }
	})();

	module.exports = updater;

/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ])
});
;