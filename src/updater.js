EventEmitter = require('events').EventEmitter;
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