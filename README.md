# uni-corn

**This project is still very much a work in progress**

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

//example - Creates or updates the property "foo" to the "String" "bar"
set('foo', 'bar');

//note: the value can be of any type.

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

//example
get('foo'); //returns the values "bar"
```
This will return persisted values as well as ones stored only in memory.

### Subscribe

Adds a callback to be called when the store changes.

```javascript
function myCallback(state) {
    console.log(`${state} in store has changed`);
}

myStore.subscribe(myCallback);
```

### Unsubscribe

Removes the callback from the store. it will no longer be called when the store changes.

```javascript
function myCallback(state) {
    console.log(`${state} in store has changed`);
}

myStore.unsubscribe(myCallback);
```
The callback subscribes to the store and will be called when the main event is triggered. 

The callback accepts one argument, `state`, the value of `state` will depend on what triggered the update:

 - If `Store.set()` was called, the value of `state` will be the name of the prop that was set.
 - If `Store.forceUpdate('value')` was called the value of `state` be the value that was passed as `forceUpdates` first argument
 - If a fetch action was called that did not have a prop name assigned then the value of `state` will be the reponse body of the fetch.

A suggested way to use this effectively would be to add a switch statement to your callback to decide on what actions to take depending on what `state` is passed to the callback

```javascript
function myCallback(state) {
    switch(state) {
        case 'name':
            this.setState('name', myStore.get('name'));
            break;
        case 'success':
            window.location = '/success-page';
            break;
    }
}
```

### Add a Custom Action - `Store.addAction`

Custom actions can be created if the default get, set and getAll are not adequate. 

addAction takes an optional third argument `autoUpdate` which defaults to false. If set to true then the default store event will be fired when the action is called.

Custom actions can be asynchronous. Simply include `this.forceUpdate()` within the body of the callback. `forceUpdate()` takes one optional agument, a `String` this will be passed to any subscribing callbacks as the first argument.

**Note: the callback added to addAction must not be an arrow function. Internally uni-corn uses `Function.bind()` to set the context.

```javascript
//Action function
function myAction() {
    console.log('Do something');
    //All store props are available to this function via this.props

    //This will cause the myProject main event to be fired and pass the string "myAction-updated" to any subscribing callbacks"
    setTimeout(_ => {
        this.forceUpdate('myAction-updated');
    }, 2000);
}

//Add action function to the store and give it a name.
myStore.addAction('myAction', myAction[, autoUpdate]);

//To use the custom action simply call it in the same as default actions with the exception that you will need to use the `actions` namespace.
myStore.actions.myAction();
```

### Forms - `Store.addForm`

Creates everything you need to create a form in react. 
can either create and call a fetch action to submit the form or pass the for to a custom action letting that custom action handle the event firing.

```javascript
const options = {
    action: 'submit-login',
    fields: [
        {name: 'username', required: true},
        {name: 'password', required: true}
    ]
};
myStore.addForm('loginForm', options);

### Input - `Store.addInput`

Creates a single input providing a value and onChange function that will update the value and trigger the Store event.

### Add Fetch Action
```javascript
const myFetchAction = {
    url,
    method,
    body,
    onSuccess,
    onError
}
myStore.addFetchAction('myFetchAction', myFetchAction);
```


