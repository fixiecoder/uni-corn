# uni-corn
Uni directional data flow library that keeps everything really simple!

Create stores to seperate data from differnt parts off the application
Each store comes with `get`, `set` and `getAll` actions out of the box.

When you create a `new Store()` you are creating an event that will get fired everytime you set a value or call a custom action in that store. This will then call any callbacks that you have `subscribed` to this store.

## Installation
```bash
$ npm install uni-corn --save
```

## Example.

```javascript
//import the store class from the npm package
import Store from 'uni-corn';

//create a new store called myStore
const myStore = new Store('myStore');

//a callback to be passed to subscribe
function myCallback(prop) {
    console.log('Store has changed');
    console.log(myStore.get(prop));
}

/*
add a callback to be called when the store changes and that's it for the basic setup. uni-corn will now work storing props and tiggering callbacks on store changes.
*/
myStore.subscribe(myCallback);

/*
set a prop in the store which will trigger the callback. The name of the prop that was changed gets passed into the callback as it's first argument
*/
myStore.set('myProp', 'my prop value');
```

## Usage

### Create a New Store

```javascript
const myStore = new Store('myStore', defaultProps);
```

Create a new store with an optional argument for default props. Useful if 
you have to set an inital state on components in react.

### Set

Sets a value in the store. this will cause the main store event to be fired calling any callbacks that you have subcribed to the store, unless you have specified in the third argument to not autoupdate by passing `false`.

```javascript
set(key, value, autoUpdate, persist)
```
#### Arguments

 - key *(required)*
 	- Type: `String`
 	- Purpose: The name of the property you wish to store
 
 - value *(required)*
 	- Type: Any
 	- Purpose: The value of the property you wish to store
 
 - autoUpdate
 	-  Type: `Boolean`
 	-  Default value: `true`
 	-  Purpose: Whether the stores main event is fired
 - persist:
 	- Type: `Boolean` || `String`
 	- Default value: `false`
 	- Purpose: If `true` The value will be stored in localStorage and automatically retrieved by `get`. If the persist value is the `String` `"session"` the value will be stored in sessionStorage and only persist as long as the browser session.

### Get

Retrieves a value stored against the provided `key`, Where `key` is a `String`.

```javascript
get(key)
```
This will return persisted values as well as ones stored only in memory.

### Subscribe

Adds a callback to be called when the store changes.

```javascript
function myCallback(prop) {
    console.log(`${prop} in store has changed`);
}

myStore.subscribe(myCallback);
```

### Unsubscribe

Removes the callback from the store. it will no longer be called when the store changes.

```javascript
function myCallback(prop) {
    console.log(`${prop} in store has changed`);
}

myStore.unsubscribe(myCallback);
```


Add a callback to the store that will be called when any prop in the store is updated. 

The callback accepts one argument, it's value will either be the name of the prop that was updated in the store, or the result of an async fetch request if no propName was given in the fetch action options.

### Add a Custom Action - `Store.addAction`

Custom actions can be created if the default get, set and getAll are not adequate. 

addAction takes an optional third argument `autoUpdate` which defaults to true. If set to false then no events will be fired when the action is called.

```javascript
//Action function
function myAction() {
    console.log('Do something');
    //All store props are available to this function via this.props
}

//Add action function to the store and give it a name.
myStore.addAction('myAction', myAction[, autoUpdate]);

//To use the custom action simple call it the same as the default ones.
myStore.actions.myAction();
```

### Forms - `Store.addForm`

Creates everything you need to create a form in react. 

### Input - `Store.addInput`

Creates a single input providing a value and onChange function that will update the value and trigger the Store event.

### Add Fetch Action
```
const myFetchAction = {
    url,
    method,
    body,
    onSuccess
}
myStore.addFetchAction('myFetchAction', myFetchAction);
```


