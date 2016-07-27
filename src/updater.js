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
    // if (typeof callbacks[eventName] === 'undefined') {
    //   callbacks[eventName] = new Set();
    // }
    // callbacks[eventName].add(callback);

    // callbacks[eventName].forEach(callback => {
      emitter.on(eventName, callback);
    // });

  };

  const unsubscribe = (eventName, callback) => {
    // callbacks[eventName].delete(callback);
    // console.log('removing callback from', eventName)
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