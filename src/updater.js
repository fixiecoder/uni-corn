import { EventEmitter } from 'events';
import async from 'async';

const updater = (() => {
  const emitter = new EventEmitter();

  const callbacks = {
    default: []
  };

  const unregister = eventName => {
    // const indexOfCallback = callbacks.indexOf(eventName);
    delete callbacks[eventName];
  }

  const register = (event, callback) => {
    let eventName = 'default';
    if (typeof event === 'function') {
      callback = event;
    } else if (typeof event === 'string') {
      eventName = event;
    }
    if (typeof callbacks[eventName] === 'undefined') {
      callbacks[eventName] = [];
    }
    callbacks[eventName].push(callback);
    emitter.on(eventName, (prop) => {
      async.each(callbacks[eventName], (callback) => {
        callback(prop);
      });
    })
  };

  const onEvent = () => {
    async.each(callbacks.default, (callback) => {
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
    register: register,
    unregister: unregister,
    update: update
  }
})();

export default updater;