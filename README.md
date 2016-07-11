# uni-corn
Uni directional data flow library that keeps everything really simple!

Create stores to seperate data from differnt parts off the application
Each store comes with get, set and get all actions.

Creating a store creates the default actions and the event handling. To add a callback function that gets fired when the store changes simple pass it into addCallback();

## Installation
$ npm install uni-corn --save

## Example.

```javascript
//import the store class from the npm package
import Store from 'uni-corn';

//create a new store called myStore
const myStore = new Store();

//a callback to be passed to addCallback
function myCallback(prop) {
    console.log('Store has changed');
    console.log(myStore.actions.get(prop));
}

/*
add a callback to be called when the store changes and that's it for the basic setup. uni-corn will now work storing props and tiggering callbacks on store changes.
*/
myStore.addCallback(myCallback);

/*
set a prop in the store which will trigger the callback. The name of the prop that was changed gets passed into the callback as it's first argument
*/
myStore.actions.set('myProp', 'my prop value');
```

## Usage

### Create a New Store

```javascript
const myStore = new Store(defaultProps);
```

Create a new store with an optional argument for default props. Useful if 
you have to set an inital state on components in react.

### Add a callback
```javascript
function myCallback(prop) {
    console.log(`${prop} in store has changed`);
}

myStore.addCallback(myCallback);
```

Add a callback to the store that will be called when any prop in the store is updated. 

The callback accepts one argument, it's value will either be the name of the prop that was updated in the store, or the result of an async fetch request if no propName was given in the fetch action options.

### Add an Custom Action
Custom actions can be created if the default get, set and getAll are not adequate. 
```javascript
//Action function
function myAction() {
    console.log('Do something');
    //All store props are available to this function via this.props
}

//Add action function to the store and give it a name.
myStore.addAction('myAction', myAction);

//To use the custom action simple call it the same as the default ones.
myStore.actions.myAction();
```

### Add Fetch Action
```
 
```


