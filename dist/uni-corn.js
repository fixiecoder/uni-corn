(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.async = global.async || {})));
}(this, function (exports) { 'use strict';

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      var length = args.length;
      switch (length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    var funcTag = '[object Function]';
    var genTag = '[object GeneratorFunction]';
    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8 which returns 'object' for typed array and weak map constructors,
      // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$1 = objectProto$1.toString;

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString$1.call(value) == symbolTag);
    }

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = isFunction(value.valueOf) ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var INFINITY = 1 / 0;
    var MAX_INTEGER = 1.7976931348623157e+308;
    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, array);
          case 1: return func.call(this, args[0], array);
          case 2: return func.call(this, args[0], args[1], array);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }

    function initialParams (fn) {
        return rest(function (args /*..., callback*/) {
            var callback = args.pop();
            fn.call(this, args, callback);
        });
    }

    function applyEach$1(eachfn) {
        return rest(function (fns, args) {
            var go = initialParams(function (args, callback) {
                var that = this;
                return eachfn(fns, function (fn, cb) {
                    fn.apply(that, args.concat([cb]));
                }, callback);
            });
            if (args.length) {
                return go.apply(this, args);
            } else {
                return go;
            }
        });
    }

    /**
     * A method that returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    function once(fn) {
        return function () {
            if (fn === null) return;
            var callFn = fn;
            fn = null;
            callFn.apply(this, arguments);
        };
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a
     * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
     * Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length,
     *  else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value)) && !isFunction(value);
    }

    var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

    function getIterator (coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetPrototype = Object.getPrototypeOf;

    /**
     * Gets the `[[Prototype]]` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {null|Object} Returns the `[[Prototype]]`.
     */
    function getPrototype(value) {
      return nativeGetPrototype(Object(value));
    }

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto$2.hasOwnProperty;

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
      // that are composed entirely of index properties, return `false` for
      // `hasOwnProperty` checks of them.
      return object != null &&
        (hasOwnProperty.call(object, key) ||
          (typeof object == 'object' && key in object && getPrototype(object) === null));
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = Object.keys;

    /**
     * The base implementation of `_.keys` which doesn't skip the constructor
     * property of prototypes or treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      return nativeKeys(Object(object));
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$3.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$2 = objectProto$3.toString;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty$1.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @type {Function}
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /** `Object#toString` result references. */
    var stringTag = '[object String]';

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$3 = objectProto$4.toString;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && objectToString$3.call(value) == stringTag);
    }

    /**
     * Creates an array of index keys for `object` values of arrays,
     * `arguments` objects, and strings, otherwise `null` is returned.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array|null} Returns index keys, else `null`.
     */
    function indexKeys(object) {
      var length = object ? object.length : undefined;
      if (isLength(length) &&
          (isArray(object) || isString(object) || isArguments(object))) {
        return baseTimes(length, String);
      }
      return null;
    }

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

      return value === proto;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      var isProto = isPrototype(object);
      if (!(isProto || isArrayLike(object))) {
        return baseKeys(object);
      }
      var indexes = indexKeys(object),
          skipIndexes = !!indexes,
          result = indexes || [],
          length = result.length;

      for (var key in object) {
        if (baseHas(object, key) &&
            !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
            !(isProto && key == 'constructor')) {
          result.push(key);
        }
      }
      return result;
    }

    function iterator(coll) {
        var i = -1;
        var len;
        if (isArrayLike(coll)) {
            len = coll.length;
            return function next() {
                i++;
                return i < len ? { value: coll[i], key: i } : null;
            };
        }

        var iterate = getIterator(coll);
        if (iterate) {
            return function next() {
                var item = iterate.next();
                if (item.done) return null;
                i++;
                return { value: item.value, key: i };
            };
        }

        var okeys = keys(coll);
        len = okeys.length;
        return function next() {
            i++;
            var key = okeys[i];
            return i < len ? { value: coll[key], key: key } : null;
        };
    }

    function onlyOnce(fn) {
        return function () {
            if (fn === null) throw new Error("Callback was already called.");
            var callFn = fn;
            fn = null;
            callFn.apply(this, arguments);
        };
    }

    function _eachOfLimit(limit) {
        return function (obj, iteratee, callback) {
            callback = once(callback || noop);
            obj = obj || [];
            var nextElem = iterator(obj);
            if (limit <= 0) {
                return callback(null);
            }
            var done = false;
            var running = 0;
            var errored = false;

            (function replenish() {
                if (done && running <= 0) {
                    return callback(null);
                }

                while (running < limit && !errored) {
                    var elem = nextElem();
                    if (elem === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iteratee(elem.value, elem.key, onlyOnce(function (err) {
                        running -= 1;
                        if (err) {
                            callback(err);
                            errored = true;
                        } else {
                            replenish();
                        }
                    }));
                }
            })();
        };
    }

    function doParallelLimit(fn) {
        return function (obj, limit, iteratee, callback) {
            return fn(_eachOfLimit(limit), obj, iteratee, callback);
        };
    }

    function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = once(callback || noop);
        arr = arr || [];
        var results = [];
        var counter = 0;

        eachfn(arr, function (value, _, callback) {
            var index = counter++;
            iteratee(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }

    /**
     * The same as `map` but runs a maximum of `limit` async operations at a time.
     *
     * @name mapLimit
     * @static
     * @memberOf async
     * @see async.map
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a transformed
     * item. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `coll`. Invoked with (err, results).
     */
    var mapLimit = doParallelLimit(_asyncMap);

    function doLimit(fn, limit) {
        return function (iterable, iteratee, callback) {
            return fn(iterable, limit, iteratee, callback);
        };
    }

    /**
     * Produces a new collection of values by mapping each value in `coll` through
     * the `iteratee` function. The `iteratee` is called with an item from `coll`
     * and a callback for when it has finished processing. Each of these callback
     * takes 2 arguments: an `error`, and the transformed item from `coll`. If
     * `iteratee` passes an error to its callback, the main `callback` (for the
     * `map` function) is immediately called with the error.
     *
     * Note, that since this function applies the `iteratee` to each item in
     * parallel, there is no guarantee that the `iteratee` functions will complete
     * in order. However, the results array will be in the same order as the
     * original `coll`.
     *
     * If `map` is passed an Object, the results will be an Array.  The results
     * will roughly be in the order of the original Objects' keys (but this can
     * vary across JavaScript engines)
     *
     * @name map
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed item. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an Array of the
     * transformed items from the `coll`. Invoked with (err, results).
     * @example
     *
     * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
     *     // results is now an array of stats for each file
     * });
     */
    var map = doLimit(mapLimit, Infinity);

    /**
     * Applies the provided arguments to each function in the array, calling
     * `callback` after all functions have completed. If you only provide the first
     * argument, then it will return a function which lets you pass in the
     * arguments as if it were a single function call.
     *
     * @name applyEach
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array|Object} fns - A collection of asynchronous functions to all
     * call with the same arguments
     * @param {...*} [args] - any number of separate arguments to pass to the
     * function.
     * @param {Function} [callback] - the final argument should be the callback,
     * called when all functions have completed processing.
     * @returns {Function} - If only the first argument is provided, it will return
     * a function which lets you pass in the arguments as if it were a single
     * function call.
     * @example
     *
     * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
     *
     * // partial application example:
     * async.each(
     *     buckets,
     *     async.applyEach([enableSearch, updateSchema]),
     *     callback
     * );
     */
    var applyEach = applyEach$1(map);

    /**
     * The same as `map` but runs only a single async operation at a time.
     *
     * @name mapSeries
     * @static
     * @memberOf async
     * @see async.map
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed item. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `coll`. Invoked with (err, results).
     */
    var mapSeries = doLimit(mapLimit, 1);

    /**
     * The same as `applyEach` but runs only a single async operation at a time.
     *
     * @name applyEachSeries
     * @static
     * @memberOf async
     * @see async.applyEach
     * @category Control Flow
     * @param {Array|Object} fns - A collection of asynchronous functions to all
     * call with the same arguments
     * @param {...*} [args] - any number of separate arguments to pass to the
     * function.
     * @param {Function} [callback] - the final argument should be the callback,
     * called when all functions have completed processing.
     * @returns {Function} - If only the first argument is provided, it will return
     * a function which lets you pass in the arguments as if it were a single
     * function call.
     */
    var applyEachSeries = applyEach$1(mapSeries);

    /**
     * Creates a continuation function with some arguments already applied.
     *
     * Useful as a shorthand when combined with other control flow functions. Any
     * arguments passed to the returned function are added to the arguments
     * originally passed to apply.
     *
     * @name apply
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to eventually apply all
     * arguments to. Invokes with (arguments...).
     * @param {...*} arguments... - Any number of arguments to automatically apply
     * when the continuation is called.
     * @example
     *
     * // using apply
     * async.parallel([
     *     async.apply(fs.writeFile, 'testfile1', 'test1'),
     *     async.apply(fs.writeFile, 'testfile2', 'test2')
     * ]);
     *
     *
     * // the same process without using apply
     * async.parallel([
     *     function(callback) {
     *         fs.writeFile('testfile1', 'test1', callback);
     *     },
     *     function(callback) {
     *         fs.writeFile('testfile2', 'test2', callback);
     *     }
     * ]);
     *
     * // It's possible to pass any number of additional arguments when calling the
     * // continuation:
     *
     * node> var fn = async.apply(sys.puts, 'one');
     * node> fn('two', 'three');
     * one
     * two
     * three
     */
    var apply$1 = rest(function (fn, args) {
        return rest(function (callArgs) {
            return fn.apply(null, args.concat(callArgs));
        });
    });

    /**
     * Take a sync function and make it async, passing its return value to a
     * callback. This is useful for plugging sync functions into a waterfall,
     * series, or other async functions. Any arguments passed to the generated
     * function will be passed to the wrapped function (except for the final
     * callback argument). Errors thrown will be passed to the callback.
     *
     * If the function passed to `asyncify` returns a Promise, that promises's
     * resolved/rejected state will be used to call the callback, rather than simply
     * the synchronous return value.
     *
     * This also means you can asyncify ES2016 `async` functions.
     *
     * @name asyncify
     * @static
     * @memberOf async
     * @alias wrapSync
     * @category Util
     * @param {Function} func - The synchronous function to convert to an
     * asynchronous function.
     * @returns {Function} An asynchronous wrapper of the `func`. To be invoked with
     * (callback).
     * @example
     *
     * // passing a regular synchronous function
     * async.waterfall([
     *     async.apply(fs.readFile, filename, "utf8"),
     *     async.asyncify(JSON.parse),
     *     function (data, next) {
     *         // data is the result of parsing the text.
     *         // If there was a parsing error, it would have been caught.
     *     }
     * ], callback);
     *
     * // passing a function returning a promise
     * async.waterfall([
     *     async.apply(fs.readFile, filename, "utf8"),
     *     async.asyncify(function (contents) {
     *         return db.model.create(contents);
     *     }),
     *     function (model, next) {
     *         // `model` is the instantiated model object.
     *         // If there was an error, this function would be skipped.
     *     }
     * ], callback);
     *
     * // es6 example
     * var q = async.queue(async.asyncify(async function(file) {
     *     var intermediateStep = await processFile(file);
     *     return await somePromise(intermediateStep)
     * }));
     *
     * q.push(files);
     */
    function asyncify(func) {
        return initialParams(function (args, callback) {
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (isObject(result) && typeof result.then === 'function') {
                result.then(function (value) {
                    callback(null, value);
                })['catch'](function (err) {
                    callback(err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      return this.__data__['delete'](key);
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }

    /**
     * Checks if `value` is a global object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {null|Object} Returns `value` if it's a global object, else `null`.
     */
    function checkGlobal(value) {
      return (value && value.Object === Object) ? value : null;
    }

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = checkGlobal(typeof global == 'object' && global);

    /** Detect free variable `self`. */
    var freeSelf = checkGlobal(typeof self == 'object' && self);

    /** Detect `this` as the global object. */
    var thisGlobal = checkGlobal(typeof this == 'object' && this);

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = Function.prototype.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = Function.prototype.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$6.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /* Built-in method references that are verified to be native. */
    var nativeCreate = getNative(Object, 'create');

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$7.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
    }

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$8.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty$4.call(data, key);
    }

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /* Built-in method references that are verified to be native. */
    var Map = getNative(root, 'Map');

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
        cache = this.__data__ = new MapCache(cache.__data__);
      }
      cache.set(key, value);
      return this;
    }

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED$2);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values ? values.length : 0;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    var UNORDERED_COMPARE_FLAG$1 = 1;
    var PARTIAL_COMPARE_FLAG$2 = 2;
    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$2,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & UNORDERED_COMPARE_FLAG$1) ? new SetCache : undefined;

      stack.set(array, other);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!seen.has(othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
                  return seen.add(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, customizer, bitmask, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      return result;
    }

    /** Built-in value references. */
    var Symbol$1 = root.Symbol;

    /** Built-in value references. */
    var Uint8Array = root.Uint8Array;

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    var UNORDERED_COMPARE_FLAG$2 = 1;
    var PARTIAL_COMPARE_FLAG$3 = 2;
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var mapTag = '[object Map]';
    var numberTag = '[object Number]';
    var regexpTag = '[object RegExp]';
    var setTag = '[object Set]';
    var stringTag$1 = '[object String]';
    var symbolTag$1 = '[object Symbol]';
    var arrayBufferTag = '[object ArrayBuffer]';
    var dataViewTag = '[object DataView]';
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
          // Coerce dates and booleans to numbers, dates to milliseconds and
          // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
          // not equal.
          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          // Treat `NaN` vs. `NaN` as equal.
          return (object != +object) ? other != +other : object == +other;

        case regexpTag:
        case stringTag$1:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG$3;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= UNORDERED_COMPARE_FLAG$2;
          stack.set(object, other);

          // Recursively compare objects (susceptible to call stack limits).
          return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

        case symbolTag$1:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /** Used to compose bitmasks for comparison styles. */
    var PARTIAL_COMPARE_FLAG$4 = 2;

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} customizer The function to customize comparisons.
     * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG$4,
          objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : baseHas(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      return result;
    }

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView');

    /* Built-in method references that are verified to be native. */
    var Promise = getNative(root, 'Promise');

    /* Built-in method references that are verified to be native. */
    var Set = getNative(root, 'Set');

    /* Built-in method references that are verified to be native. */
    var WeakMap = getNative(root, 'WeakMap');

    var mapTag$1 = '[object Map]';
    var objectTag$1 = '[object Object]';
    var promiseTag = '[object Promise]';
    var setTag$1 = '[object Set]';
    var weakMapTag = '[object WeakMap]';
    var dataViewTag$1 = '[object DataView]';

    /** Used for built-in method references. */
    var objectProto$10 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$4 = objectProto$10.toString;

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map);
    var promiseCtorString = toSource(Promise);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap);
    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function getTag(value) {
      return objectToString$4.call(value);
    }

    // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge, and promises in Node.js.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
        (Map && getTag(new Map) != mapTag$1) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag$1) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = objectToString$4.call(value),
            Ctor = result == objectTag$1 ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag$1;
            case mapCtorString: return mapTag$1;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag$1;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    var getTag$1 = getTag;

    var argsTag$2 = '[object Arguments]';
    var arrayTag$1 = '[object Array]';
    var boolTag$1 = '[object Boolean]';
    var dateTag$1 = '[object Date]';
    var errorTag$1 = '[object Error]';
    var funcTag$1 = '[object Function]';
    var mapTag$2 = '[object Map]';
    var numberTag$1 = '[object Number]';
    var objectTag$2 = '[object Object]';
    var regexpTag$1 = '[object RegExp]';
    var setTag$2 = '[object Set]';
    var stringTag$2 = '[object String]';
    var weakMapTag$1 = '[object WeakMap]';
    var arrayBufferTag$1 = '[object ArrayBuffer]';
    var dataViewTag$2 = '[object DataView]';
    var float32Tag = '[object Float32Array]';
    var float64Tag = '[object Float64Array]';
    var int8Tag = '[object Int8Array]';
    var int16Tag = '[object Int16Array]';
    var int32Tag = '[object Int32Array]';
    var uint8Tag = '[object Uint8Array]';
    var uint8ClampedTag = '[object Uint8ClampedArray]';
    var uint16Tag = '[object Uint16Array]';
    var uint32Tag = '[object Uint32Array]';
    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
    typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
    typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
    typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
    typedArrayTags[setTag$2] = typedArrayTags[stringTag$2] =
    typedArrayTags[weakMapTag$1] = false;

    /** Used for built-in method references. */
    var objectProto$11 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$5 = objectProto$11.toString;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    function isTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[objectToString$5.call(value)];
    }

    /** Used to compose bitmasks for comparison styles. */
    var PARTIAL_COMPARE_FLAG$1 = 2;

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]';
    var arrayTag = '[object Array]';
    var objectTag = '[object Object]';
    /** Used for built-in method references. */
    var objectProto$9 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$9.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
     *  for more details.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = getTag$1(object);
        objTag = objTag == argsTag$1 ? objectTag : objTag;
      }
      if (!othIsArr) {
        othTag = getTag$1(other);
        othTag = othTag == argsTag$1 ? objectTag : othTag;
      }
      var objIsObj = objTag == objectTag && !isHostObject(object),
          othIsObj = othTag == objectTag && !isHostObject(other),
          isSameTag = objTag == othTag;

      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
          : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }
      if (!(bitmask & PARTIAL_COMPARE_FLAG$1)) {
        var objIsWrapped = objIsObj && hasOwnProperty$5.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty$5.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {boolean} [bitmask] The bitmask of comparison flags.
     *  The bitmask may be composed of the following flags:
     *     1 - Unordered comparison
     *     2 - Partial comparison
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }

    var UNORDERED_COMPARE_FLAG = 1;
    var PARTIAL_COMPARE_FLAG = 2;
    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT$1 = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT$1);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined;
    var symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;
    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoize(function(string) {
      var result = [];
      toString(string).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }

    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /** Used as references for various `Number` constants. */
    var INFINITY$2 = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);

      var result,
          index = -1,
          length = path.length;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result) {
        return result;
      }
      var length = object ? object.length : 0;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isString(object) || isArguments(object));
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    var UNORDERED_COMPARE_FLAG$3 = 1;
    var PARTIAL_COMPARE_FLAG$5 = 2;
    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG$3 | PARTIAL_COMPARE_FLAG$5);
      };
    }

    /**
     * This method returns the first argument given to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, baseIteratee(iteratee, 3));
    }

    /**
     * Gets the index at which the first occurrence of `NaN` is found in `array`.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched `NaN`, else `-1`.
     */
    function indexOfNaN(array, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        var other = array[index];
        if (other !== other) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return indexOfNaN(array, fromIndex);
      }
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Determines the best order for running the functions in `tasks`, based on
     * their requirements. Each function can optionally depend on other functions
     * being completed first, and each function is run as soon as its requirements
     * are satisfied.
     *
     * If any of the functions pass an error to their callback, the `auto` sequence
     * will stop. Further tasks will not execute (so any other functions depending
     * on it will not run), and the main `callback` is immediately called with the
     * error.
     *
     * Functions also receive an object containing the results of functions which
     * have completed so far as the first argument, if they have dependencies. If a
     * task function has no dependencies, it will only be passed a callback.
     *
     * @name auto
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Object} tasks - An object. Each of its properties is either a
     * function or an array of requirements, with the function itself the last item
     * in the array. The object's key of a property serves as the name of the task
     * defined by that property, i.e. can be used when specifying requirements for
     * other tasks. The function receives one or two arguments:
     * * a `results` object, containing the results of the previously executed
     *   functions, only passed if the task has any dependencies,
     * * a `callback(err, result)` function, which must be called when finished,
     *   passing an `error` (which can be `null`) and the result of the function's
     *   execution.
     * @param {number} [concurrency=Infinity] - An optional `integer` for
     * determining the maximum number of tasks that can be run in parallel. By
     * default, as many as possible.
     * @param {Function} [callback] - An optional callback which is called when all
     * the tasks have been completed. It receives the `err` argument if any `tasks`
     * pass an error to their callback. Results are always returned; however, if an
     * error occurs, no further `tasks` will be performed, and the results object
     * will only contain partial results. Invoked with (err, results).
     * @example
     *
     * async.auto({
     *     // this function will just be passed a callback
     *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
     *     showData: ['readData', function(results, cb) {
     *         // results.readData is the file's contents
     *         // ...
     *     }]
     * }, callback);
     *
     * async.auto({
     *     get_data: function(callback) {
     *         console.log('in get_data');
     *         // async code to get some data
     *         callback(null, 'data', 'converted to array');
     *     },
     *     make_folder: function(callback) {
     *         console.log('in make_folder');
     *         // async code to create a directory to store a file in
     *         // this is run at the same time as getting the data
     *         callback(null, 'folder');
     *     },
     *     write_file: ['get_data', 'make_folder', function(results, callback) {
     *         console.log('in write_file', JSON.stringify(results));
     *         // once there is some data and the directory exists,
     *         // write the data to a file in the directory
     *         callback(null, 'filename');
     *     }],
     *     email_link: ['write_file', function(results, callback) {
     *         console.log('in email_link', JSON.stringify(results));
     *         // once the file is written let's email a link to it...
     *         // results.write_file contains the filename returned by write_file.
     *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
     *     }]
     * }, function(err, results) {
     *     console.log('err = ', err);
     *     console.log('results = ', results);
     * });
     */
    function auto (tasks, concurrency, callback) {
        if (typeof concurrency === 'function') {
            // concurrency is optional, shift the args.
            callback = concurrency;
            concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$ = keys(tasks);
        var numTasks = keys$$.length;
        if (!numTasks) {
            return callback(null);
        }
        if (!concurrency) {
            concurrency = numTasks;
        }

        var results = {};
        var runningTasks = 0;
        var hasError = false;

        var listeners = {};

        var readyTasks = [];

        // for cycle detection:
        var readyToCheck = []; // tasks that have been identified as reachable
        // without the possibility of returning to an ancestor task
        var uncheckedDependencies = {};

        forOwn(tasks, function (task, key) {
            if (!isArray(task)) {
                // no dependencies
                enqueueTask(key, [task]);
                readyToCheck.push(key);
                return;
            }

            var dependencies = task.slice(0, task.length - 1);
            var remainingDependencies = dependencies.length;
            if (remainingDependencies === 0) {
                enqueueTask(key, task);
                readyToCheck.push(key);
                return;
            }
            uncheckedDependencies[key] = remainingDependencies;

            arrayEach(dependencies, function (dependencyName) {
                if (!tasks[dependencyName]) {
                    throw new Error('async.auto task `' + key + '` has a non-existent dependency in ' + dependencies.join(', '));
                }
                addListener(dependencyName, function () {
                    remainingDependencies--;
                    if (remainingDependencies === 0) {
                        enqueueTask(key, task);
                    }
                });
            });
        });

        checkForDeadlocks();
        processQueue();

        function enqueueTask(key, task) {
            readyTasks.push(function () {
                runTask(key, task);
            });
        }

        function processQueue() {
            if (readyTasks.length === 0 && runningTasks === 0) {
                return callback(null, results);
            }
            while (readyTasks.length && runningTasks < concurrency) {
                var run = readyTasks.shift();
                run();
            }
        }

        function addListener(taskName, fn) {
            var taskListeners = listeners[taskName];
            if (!taskListeners) {
                taskListeners = listeners[taskName] = [];
            }

            taskListeners.push(fn);
        }

        function taskComplete(taskName) {
            var taskListeners = listeners[taskName] || [];
            arrayEach(taskListeners, function (fn) {
                fn();
            });
            processQueue();
        }

        function runTask(key, task) {
            if (hasError) return;

            var taskCallback = onlyOnce(rest(function (err, args) {
                runningTasks--;
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    forOwn(results, function (val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[key] = args;
                    hasError = true;
                    listeners = [];

                    callback(err, safeResults);
                } else {
                    results[key] = args;
                    taskComplete(key);
                }
            }));

            runningTasks++;
            var taskFn = task[task.length - 1];
            if (task.length > 1) {
                taskFn(results, taskCallback);
            } else {
                taskFn(taskCallback);
            }
        }

        function checkForDeadlocks() {
            // Kahn's algorithm
            // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
            // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
            var currentTask;
            var counter = 0;
            while (readyToCheck.length) {
                currentTask = readyToCheck.pop();
                counter++;
                arrayEach(getDependents(currentTask), function (dependent) {
                    if (! --uncheckedDependencies[dependent]) {
                        readyToCheck.push(dependent);
                    }
                });
            }

            if (counter !== numTasks) {
                throw new Error('async.auto cannot execute tasks due to a recursive dependency');
            }
        }

        function getDependents(taskName) {
            var result = [];
            forOwn(tasks, function (task, key) {
                if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
                    result.push(key);
                }
            });
            return result;
        }
    }

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the last unmatched string symbol.
     */
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;

      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    /**
     * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the first unmatched string symbol.
     */
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
          length = strSymbols.length;

      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff';
    var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23';
    var rsComboSymbolsRange = '\\u20d0-\\u20f0';
    var rsVarRange = '\\ufe0e\\ufe0f';
    var rsAstral = '[' + rsAstralRange + ']';
    var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
    var rsFitz = '\\ud83c[\\udffb-\\udfff]';
    var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
    var rsNonAstral = '[^' + rsAstralRange + ']';
    var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
    var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
    var rsZWJ = '\\u200d';
    var reOptMod = rsModifier + '?';
    var rsOptVar = '[' + rsVarRange + ']?';
    var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return string.match(reComplexSymbol);
    }

    /** Used to match leading and trailing whitespace. */
    var reTrim$1 = /^\s+|\s+$/g;

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim$1, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    var argsRegex = /^(function[^\(]*)?\(?\s*([^\)=]*)/m;

    function parseParams(func) {
        return trim(func.toString().match(argsRegex)[2]).split(/\s*\,\s*/);
    }

    /**
     * A dependency-injected version of the {@link async.auto} function. Dependent
     * tasks are specified as parameters to the function, after the usual callback
     * parameter, with the parameter names matching the names of the tasks it
     * depends on. This can provide even more readable task graphs which can be
     * easier to maintain.
     *
     * If a final callback is specified, the task results are similarly injected,
     * specified as named parameters after the initial error parameter.
     *
     * The autoInject function is purely syntactic sugar and its semantics are
     * otherwise equivalent to {@link async.auto}.
     *
     * @name autoInject
     * @static
     * @memberOf async
     * @see async.auto
     * @category Control Flow
     * @param {Object} tasks - An object, each of whose properties is a function of
     * the form 'func([dependencies...], callback). The object's key of a property
     * serves as the name of the task defined by that property, i.e. can be used
     * when specifying requirements for other tasks.
     * * The `callback` parameter is a `callback(err, result)` which must be called
     *   when finished, passing an `error` (which can be `null`) and the result of
     *   the function's execution. The remaining parameters name other tasks on
     *   which the task is dependent, and the results from those tasks are the
     *   arguments of those parameters.
     * @param {Function} [callback] - An optional callback which is called when all
     * the tasks have been completed. It receives the `err` argument if any `tasks`
     * pass an error to their callback. The remaining parameters are task names
     * whose results you are interested in. This callback will only be called when
     * all tasks have finished or an error has occurred, and so do not specify
     * dependencies in the same way as `tasks` do. If an error occurs, no further
     * `tasks` will be performed, and `results` will only be valid for those tasks
     * which managed to complete. Invoked with (err, [results...]).
     * @example
     *
     * //  The example from `auto` can be rewritten as follows:
     * async.autoInject({
     *     get_data: function(callback) {
     *         // async code to get some data
     *         callback(null, 'data', 'converted to array');
     *     },
     *     make_folder: function(callback) {
     *         // async code to create a directory to store a file in
     *         // this is run at the same time as getting the data
     *         callback(null, 'folder');
     *     },
     *     write_file: function(get_data, make_folder, callback) {
     *         // once there is some data and the directory exists,
     *         // write the data to a file in the directory
     *         callback(null, 'filename');
     *     },
     *     email_link: function(write_file, callback) {
     *         // once the file is written let's email a link to it...
     *         // write_file contains the filename returned by write_file.
     *         callback(null, {'file':write_file, 'email':'user@example.com'});
     *     }
     * }, function(err, email_link) {
     *     console.log('err = ', err);
     *     console.log('email_link = ', email_link);
     * });
     *
     * // If you are using a JS minifier that mangles parameter names, `autoInject`
     * // will not work with plain functions, since the parameter names will be
     * // collapsed to a single letter identifier.  To work around this, you can
     * // explicitly specify the names of the parameters your task function needs
     * // in an array, similar to Angular.js dependency injection.  The final
     * // results callback can be provided as an array in the same way.
     *
     * // This still has an advantage over plain `auto`, since the results a task
     * // depends on are still spread into arguments.
     * async.autoInject({
     *     //...
     *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
     *         callback(null, 'filename');
     *     }],
     *     email_link: ['write_file', function(write_file, callback) {
     *         callback(null, {'file':write_file, 'email':'user@example.com'});
     *     }]
     *     //...
     * }, ['email_link', function(err, email_link) {
     *     console.log('err = ', err);
     *     console.log('email_link = ', email_link);
     * }]);
     */
    function autoInject(tasks, callback) {
        var newTasks = {};

        forOwn(tasks, function (taskFn, key) {
            var params;

            if (isArray(taskFn)) {
                params = copyArray(taskFn);
                taskFn = params.pop();

                newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
            } else if (taskFn.length === 0) {
                throw new Error("autoInject task functions require explicit parameters.");
            } else if (taskFn.length === 1) {
                // no dependencies, use the function as-is
                newTasks[key] = taskFn;
            } else {
                params = parseParams(taskFn);
                params.pop();

                newTasks[key] = params.concat(newTask);
            }

            function newTask(results, taskCb) {
                var newArgs = arrayMap(params, function (name) {
                    return results[name];
                });
                newArgs.push(taskCb);
                taskFn.apply(null, newArgs);
            }
        });

        auto(newTasks, callback);
    }

    var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
    var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

    function fallback(fn) {
        setTimeout(fn, 0);
    }

    function wrap(defer) {
        return rest(function (fn, args) {
            defer(function () {
                fn.apply(null, args);
            });
        });
    }

    var _defer;

    if (hasSetImmediate) {
        _defer = setImmediate;
    } else if (hasNextTick) {
        _defer = process.nextTick;
    } else {
        _defer = fallback;
    }

    var setImmediate$1 = wrap(_defer);

    function queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        } else if (concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
        function _insert(q, data, pos, callback) {
            if (callback != null && typeof callback !== 'function') {
                throw new Error('task callback must be a function');
            }
            q.started = true;
            if (!isArray(data)) {
                data = [data];
            }
            if (data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return setImmediate$1(function () {
                    q.drain();
                });
            }
            arrayEach(data, function (task) {
                var item = {
                    data: task,
                    callback: callback || noop
                };

                if (pos) {
                    q.tasks.unshift(item);
                } else {
                    q.tasks.push(item);
                }
            });
            setImmediate$1(q.process);
        }
        function _next(q, tasks) {
            return function () {
                workers -= 1;

                var removed = false;
                var args = arguments;
                arrayEach(tasks, function (task) {
                    arrayEach(workersList, function (worker, index) {
                        if (worker === task && !removed) {
                            workersList.splice(index, 1);
                            removed = true;
                        }
                    });

                    task.callback.apply(task, args);

                    if (args[0] != null) {
                        q.error(args[0], task.data);
                    }
                });

                if (workers <= q.concurrency - q.buffer) {
                    q.unsaturated();
                }

                if (q.tasks.length + workers === 0) {
                    q.drain();
                }
                q.process();
            };
        }

        var workers = 0;
        var workersList = [];
        var q = {
            tasks: [],
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            unsaturated: noop,
            buffer: concurrency / 4,
            empty: noop,
            drain: noop,
            error: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(q, data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q.tasks = [];
            },
            unshift: function (data, callback) {
                _insert(q, data, true, callback);
            },
            process: function () {
                while (!q.paused && workers < q.concurrency && q.tasks.length) {

                    var tasks = q.payload ? q.tasks.splice(0, q.payload) : q.tasks.splice(0, q.tasks.length);

                    var data = arrayMap(tasks, baseProperty('data'));

                    if (q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    workersList.push(tasks[0]);

                    if (workers === q.concurrency) {
                        q.saturated();
                    }

                    var cb = onlyOnce(_next(q, tasks));
                    worker(data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            workersList: function () {
                return workersList;
            },
            idle: function () {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) {
                    return;
                }
                q.paused = false;
                var resumeCount = Math.min(q.concurrency, q.tasks.length);
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= resumeCount; w++) {
                    setImmediate$1(q.process);
                }
            }
        };
        return q;
    }

    /**
     * A cargo of tasks for the worker function to complete. Cargo inherits all of
     * the same methods and event callbacks as {@link async.queue}.
     * @typedef {Object} cargo
     * @property {Function} length - A function returning the number of items
     * waiting to be processed. Invoke with ().
     * @property {number} payload - An `integer` for determining how many tasks
     * should be process per round. This property can be changed after a `cargo` is
     * created to alter the payload on-the-fly.
     * @property {Function} push - Adds `task` to the `queue`. The callback is
     * called once the `worker` has finished processing the task. Instead of a
     * single task, an array of `tasks` can be submitted. The respective callback is
     * used for every task in the list. Invoke with (task, [callback]).
     * @property {Function} saturated - A callback that is called when the
     * `queue.length()` hits the concurrency and further tasks will be queued.
     * @property {Function} empty - A callback that is called when the last item
     * from the `queue` is given to a `worker`.
     * @property {Function} drain - A callback that is called when the last item
     * from the `queue` has returned from the `worker`.
     * @property {Function} idle - a function returning false if there are items
     * waiting or being processed, or true if not. Invoke with ().
     * @property {Function} pause - a function that pauses the processing of tasks
     * until `resume()` is called. Invoke with ().
     * @property {Function} resume - a function that resumes the processing of
     * queued tasks when the queue is paused. Invoke with ().
     * @property {Function} kill - a function that removes the `drain` callback and
     * empties remaining tasks from the queue forcing it to go idle. Invoke with ().
     */

    /**
     * Creates a `cargo` object with the specified payload. Tasks added to the
     * cargo will be processed altogether (up to the `payload` limit). If the
     * `worker` is in progress, the task is queued until it becomes available. Once
     * the `worker` has completed some tasks, each callback of those tasks is
     * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
     * for how `cargo` and `queue` work.
     *
     * While [queue](#queue) passes only one task to one of a group of workers
     * at a time, cargo passes an array of tasks to a single worker, repeating
     * when the worker is finished.
     *
     * @name cargo
     * @static
     * @memberOf async
     * @see async.queue
     * @category Control Flow
     * @param {Function} worker - An asynchronous function for processing an array
     * of queued tasks, which must call its `callback(err)` argument when finished,
     * with an optional `err` argument. Invoked with (tasks, callback).
     * @param {number} [payload=Infinity] - An optional `integer` for determining
     * how many tasks should be processed per round; if omitted, the default is
     * unlimited.
     * @returns {cargo} A cargo object to manage the tasks. Callbacks can
     * attached as certain properties to listen for specific events during the
     * lifecycle of the cargo and inner queue.
     * @example
     *
     * // create a cargo object with payload 2
     * var cargo = async.cargo(function(tasks, callback) {
     *     for (var i=0; i<tasks.length; i++) {
     *         console.log('hello ' + tasks[i].name);
     *     }
     *     callback();
     * }, 2);
     *
     * // add some items
     * cargo.push({name: 'foo'}, function(err) {
     *     console.log('finished processing foo');
     * });
     * cargo.push({name: 'bar'}, function(err) {
     *     console.log('finished processing bar');
     * });
     * cargo.push({name: 'baz'}, function(err) {
     *     console.log('finished processing baz');
     * });
     */
    function cargo(worker, payload) {
      return queue(worker, 1, payload);
    }

    /**
     * The same as `eachOf` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name eachOfLimit
     * @static
     * @memberOf async
     * @see async.eachOf
     * @alias forEachOfLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each
     * item in `coll`. The `key` is the item's key, or index in the case of an
     * array. The iteratee is passed a `callback(err)` which must be called once it
     * has completed. If no error has occurred, the callback should be run without
     * arguments or with an explicit `null` argument. Invoked with
     * (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    function eachOfLimit(obj, limit, iteratee, cb) {
      _eachOfLimit(limit)(obj, iteratee, cb);
    }

    /**
     * The same as `eachOf` but runs only a single async operation at a time.
     *
     * @name eachOfSeries
     * @static
     * @memberOf async
     * @see async.eachOf
     * @alias forEachOfSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`. The
     * `key` is the item's key, or index in the case of an array. The iteratee is
     * passed a `callback(err)` which must be called once it has completed. If no
     * error has occurred, the callback should be run without arguments or with an
     * explicit `null` argument. Invoked with (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Invoked with (err).
     */
    var eachOfSeries = doLimit(eachOfLimit, 1);

    /**
     * Reduces `coll` into a single value using an async `iteratee` to return each
     * successive step. `memo` is the initial state of the reduction. This function
     * only operates in series.
     *
     * For performance reasons, it may make sense to split a call to this function
     * into a parallel map, and then use the normal `Array.prototype.reduce` on the
     * results. This function is for situations where each step in the reduction
     * needs to be async; if you can get the data before reducing it, then it's
     * probably a good idea to do so.
     *
     * @name reduce
     * @static
     * @memberOf async
     * @alias inject, foldl
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {*} memo - The initial state of the reduction.
     * @param {Function} iteratee - A function applied to each item in the
     * array to produce the next step in the reduction. The `iteratee` is passed a
     * `callback(err, reduction)` which accepts an optional error as its first
     * argument, and the state of the reduction as the second. If an error is
     * passed to the callback, the reduction is stopped and the main `callback` is
     * immediately called with the error. Invoked with (memo, item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the reduced value. Invoked with
     * (err, result).
     * @example
     *
     * async.reduce([1,2,3], 0, function(memo, item, callback) {
     *     // pointless async:
     *     process.nextTick(function() {
     *         callback(null, memo + item)
     *     });
     * }, function(err, result) {
     *     // result is now equal to the last value of memo, which is 6
     * });
     */
    function reduce(arr, memo, iteratee, cb) {
        eachOfSeries(arr, function (x, i, cb) {
            iteratee(memo, x, function (err, v) {
                memo = v;
                cb(err);
            });
        }, function (err) {
            cb(err, memo);
        });
    }

    /**
     * Version of the compose function that is more natural to read. Each function
     * consumes the return value of the previous function. It is the equivalent of
     * {@link async.compose} with the arguments reversed.
     *
     * Each function is executed with the `this` binding of the composed function.
     *
     * @name seq
     * @static
     * @memberOf async
     * @see async.compose
     * @category Control Flow
     * @param {...Function} functions - the asynchronous functions to compose
     * @example
     *
     * // Requires lodash (or underscore), express3 and dresende's orm2.
     * // Part of an app, that fetches cats of the logged user.
     * // This example uses `seq` function to avoid overnesting and error
     * // handling clutter.
     * app.get('/cats', function(request, response) {
     *     var User = request.models.User;
     *     async.seq(
     *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
     *         function(user, fn) {
     *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
     *         }
     *     )(req.session.user_id, function (err, cats) {
     *         if (err) {
     *             console.error(err);
     *             response.json({ status: 'error', message: err.message });
     *         } else {
     *             response.json({ status: 'ok', message: 'Cats found', data: cats });
     *         }
     *     });
     * });
     */
    function seq() /* functions... */{
        var fns = arguments;
        return rest(function (args) {
            var that = this;

            var cb = args[args.length - 1];
            if (typeof cb == 'function') {
                args.pop();
            } else {
                cb = noop;
            }

            reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([rest(function (err, nextargs) {
                    cb(err, nextargs);
                })]));
            }, function (err, results) {
                cb.apply(that, [err].concat(results));
            });
        });
    }

    var reverse = Array.prototype.reverse;

    /**
     * Creates a function which is a composition of the passed asynchronous
     * functions. Each function consumes the return value of the function that
     * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
     * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
     *
     * Each function is executed with the `this` binding of the composed function.
     *
     * @name compose
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {...Function} functions - the asynchronous functions to compose
     * @example
     *
     * function add1(n, callback) {
     *     setTimeout(function () {
     *         callback(null, n + 1);
     *     }, 10);
     * }
     *
     * function mul3(n, callback) {
     *     setTimeout(function () {
     *         callback(null, n * 3);
     *     }, 10);
     * }
     *
     * var add1mul3 = async.compose(mul3, add1);
     * add1mul3(4, function (err, result) {
     *     // result now equals 15
     * });
     */
    function compose() /* functions... */{
      return seq.apply(null, reverse.call(arguments));
    }

    function concat$1(eachfn, arr, fn, callback) {
        var result = [];
        eachfn(arr, function (x, index, cb) {
            fn(x, function (err, y) {
                result = result.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, result);
        });
    }

    /**
     * Like `each`, except that it passes the key (or index) as the second argument
     * to the iteratee.
     *
     * @name eachOf
     * @static
     * @memberOf async
     * @alias forEachOf
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each
     * item in `coll`. The `key` is the item's key, or index in the case of an
     * array. The iteratee is passed a `callback(err)` which must be called once it
     * has completed. If no error has occurred, the callback should be run without
     * arguments or with an explicit `null` argument. Invoked with
     * (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     * @example
     *
     * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
     * var configs = {};
     *
     * async.forEachOf(obj, function (value, key, callback) {
     *     fs.readFile(__dirname + value, "utf8", function (err, data) {
     *         if (err) return callback(err);
     *         try {
     *             configs[key] = JSON.parse(data);
     *         } catch (e) {
     *             return callback(e);
     *         }
     *         callback();
     *     });
     * }, function (err) {
     *     if (err) console.error(err.message);
     *     // configs is now a map of JSON data
     *     doSomethingWith(configs);
     * });
     */
    var eachOf = doLimit(eachOfLimit, Infinity);

    function doParallel(fn) {
        return function (obj, iteratee, callback) {
            return fn(eachOf, obj, iteratee, callback);
        };
    }

    /**
     * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
     * the concatenated list. The `iteratee`s are called in parallel, and the
     * results are concatenated as they return. There is no guarantee that the
     * results array will be returned in the original order of `coll` passed to the
     * `iteratee` function.
     *
     * @name concat
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, results)` which must be called once
     * it has completed with an error (which can be `null`) and an array of results.
     * Invoked with (item, callback).
     * @param {Function} [callback(err)] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     * @example
     *
     * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
     *     // files is now a list of filenames that exist in the 3 directories
     * });
     */
    var concat = doParallel(concat$1);

    function doSeries(fn) {
        return function (obj, iteratee, callback) {
            return fn(eachOfSeries, obj, iteratee, callback);
        };
    }

    /**
     * The same as `concat` but runs only a single async operation at a time.
     *
     * @name concatSeries
     * @static
     * @memberOf async
     * @see async.concat
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, results)` which must be called once
     * it has completed with an error (which can be `null`) and an array of results.
     * Invoked with (item, callback).
     * @param {Function} [callback(err)] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     */
    var concatSeries = doSeries(concat$1);

    /**
     * Returns a function that when called, calls-back with the values provided.
     * Useful as the first function in a `waterfall`, or for plugging values in to
     * `auto`.
     *
     * @name constant
     * @static
     * @memberOf async
     * @category Util
     * @param {...*} arguments... - Any number of arguments to automatically invoke
     * callback with.
     * @returns {Function} Returns a function that when invoked, automatically
     * invokes the callback with the previous given arguments.
     * @example
     *
     * async.waterfall([
     *     async.constant(42),
     *     function (value, next) {
     *         // value === 42
     *     },
     *     //...
     * ], callback);
     *
     * async.waterfall([
     *     async.constant(filename, "utf8"),
     *     fs.readFile,
     *     function (fileData, next) {
     *         //...
     *     }
     *     //...
     * ], callback);
     *
     * async.auto({
     *     hostname: async.constant("https://server.net/"),
     *     port: findFreePort,
     *     launchServer: ["hostname", "port", function (options, cb) {
     *         startServer(options, cb);
     *     }],
     *     //...
     * }, callback);
     */
    var constant = rest(function (values) {
        var args = [null].concat(values);
        return initialParams(function (ignoredArgs, callback) {
            return callback.apply(this, args);
        });
    });

    function _createTester(eachfn, check, getResult) {
        return function (arr, limit, iteratee, cb) {
            function done(err) {
                if (cb) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, getResult(false));
                    }
                }
            }
            function wrappedIteratee(x, _, callback) {
                if (!cb) return callback();
                iteratee(x, function (err, v) {
                    if (cb) {
                        if (err) {
                            cb(err);
                            cb = iteratee = false;
                        } else if (check(v)) {
                            cb(null, getResult(true, x));
                            cb = iteratee = false;
                        }
                    }
                    callback();
                });
            }
            if (arguments.length > 3) {
                cb = cb || noop;
                eachfn(arr, limit, wrappedIteratee, done);
            } else {
                cb = iteratee;
                cb = cb || noop;
                iteratee = limit;
                eachfn(arr, wrappedIteratee, done);
            }
        };
    }

    function _findGetResult(v, x) {
        return x;
    }

    /**
     * Returns the first value in `coll` that passes an async truth test. The
     * `iteratee` is applied in parallel, meaning the first iteratee to return
     * `true` will fire the detect `callback` with that result. That means the
     * result might not be the first item in the original `coll` (in terms of order)
     * that passes the test.

     * If order within the original `coll` is important, then look at
     * `detectSeries`.
     *
     * @name detect
     * @static
     * @memberOf async
     * @alias find
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, truthValue)` which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     * @example
     *
     * async.detect(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // result now equals the first file in the list that exists
     * });
     */
    var detect = _createTester(eachOf, identity, _findGetResult);

    /**
     * The same as `detect` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name detectLimit
     * @static
     * @memberOf async
     * @see async.detect
     * @alias findLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, truthValue)` which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     */
    var detectLimit = _createTester(eachOfLimit, identity, _findGetResult);

    /**
     * The same as `detect` but runs only a single async operation at a time.
     *
     * @name detectSeries
     * @static
     * @memberOf async
     * @see async.detect
     * @alias findSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, truthValue)` which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     */
    var detectSeries = _createTester(eachOfSeries, identity, _findGetResult);

    function consoleFunc(name) {
        return rest(function (fn, args) {
            fn.apply(null, args.concat([rest(function (err, args) {
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    } else if (console[name]) {
                        arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            })]));
        });
    }

    /**
     * Logs the result of an `async` function to the `console` using `console.dir`
     * to display the properties of the resulting object. Only works in Node.js or
     * in browsers that support `console.dir` and `console.error` (such as FF and
     * Chrome). If multiple arguments are returned from the async function,
     * `console.dir` is called on each argument in order.
     *
     * @name log
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to eventually apply all
     * arguments to.
     * @param {...*} arguments... - Any number of arguments to apply to the function.
     * @example
     *
     * // in a module
     * var hello = function(name, callback) {
     *     setTimeout(function() {
     *         callback(null, {hello: name});
     *     }, 1000);
     * };
     *
     * // in the node repl
     * node> async.dir(hello, 'world');
     * {hello: 'world'}
     */
    var dir = consoleFunc('dir');

    /**
     * Like {@link async.whilst}, except the `test` is an asynchronous function that
     * is passed a callback in the form of `function (err, truth)`. If error is
     * passed to `test` or `fn`, the main callback is immediately called with the
     * value of the error.
     *
     * @name during
     * @static
     * @memberOf async
     * @see async.whilst
     * @category Control Flow
     * @param {Function} test - asynchronous truth test to perform before each
     * execution of `fn`. Invoked with (callback).
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     * @example
     *
     * var count = 0;
     *
     * async.during(
     *     function (callback) {
     *         return callback(null, count < 5);
     *     },
     *     function (callback) {
     *         count++;
     *         setTimeout(callback, 1000);
     *     },
     *     function (err) {
     *         // 5 seconds have passed
     *     }
     * );
     */
    function during(test, iteratee, cb) {
        cb = cb || noop;

        var next = rest(function (err, args) {
            if (err) {
                cb(err);
            } else {
                args.push(check);
                test.apply(this, args);
            }
        });

        var check = function (err, truth) {
            if (err) return cb(err);
            if (!truth) return cb(null);
            iteratee(next);
        };

        test(check);
    }

    /**
     * The post-check version of {@link async.during}. To reflect the difference in
     * the order of operations, the arguments `test` and `fn` are switched.
     *
     * Also a version of {@link async.doWhilst} with asynchronous `test` function.
     * @name doDuring
     * @static
     * @memberOf async
     * @see async.during
     * @category Control Flow
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} test - asynchronous truth test to perform before each
     * execution of `fn`. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function doDuring(iteratee, test, cb) {
        var calls = 0;

        during(function (next) {
            if (calls++ < 1) return next(null, true);
            test.apply(this, arguments);
        }, iteratee, cb);
    }

    /**
     * Repeatedly call `fn`, while `test` returns `true`. Calls `callback` when
     * stopped, or an error occurs.
     *
     * @name whilst
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Function} test - synchronous truth test to perform before each
     * execution of `fn`. Invoked with ().
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     * @example
     *
     * var count = 0;
     * async.whilst(
     *     function() { return count < 5; },
     *     function(callback) {
     *         count++;
     *         setTimeout(function() {
     *             callback(null, count);
     *         }, 1000);
     *     },
     *     function (err, n) {
     *         // 5 seconds have passed, n = 5
     *     }
     * );
     */
    function whilst(test, iteratee, cb) {
        cb = cb || noop;
        if (!test()) return cb(null);
        var next = rest(function (err, args) {
            if (err) return cb(err);
            if (test.apply(this, args)) return iteratee(next);
            cb.apply(null, [null].concat(args));
        });
        iteratee(next);
    }

    /**
     * The post-check version of {@link async.whilst}. To reflect the difference in
     * the order of operations, the arguments `test` and `fn` are switched.
     *
     * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
     *
     * @name doWhilst
     * @static
     * @memberOf async
     * @see async.whilst
     * @category Control Flow
     * @param {Function} fn - A function which is called each time `test` passes.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} test - synchronous truth test to perform after each
     * execution of `fn`. Invoked with Invoked with the non-error callback results
     * of `fn`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function doWhilst(iteratee, test, cb) {
        var calls = 0;
        return whilst(function () {
            return ++calls <= 1 || test.apply(this, arguments);
        }, iteratee, cb);
    }

    /**
     * Like {@link async.doWhilst}, except the `test` is inverted. Note the
     * argument ordering differs from `until`.
     *
     * @name doUntil
     * @static
     * @memberOf async
     * @see async.doWhilst
     * @category Control Flow
     * @param {Function} fn - A function which is called each time `test` fails.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} test - synchronous truth test to perform after each
     * execution of `fn`. Invoked with the non-error callback results of `fn`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has passed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function doUntil(iteratee, test, cb) {
        return doWhilst(iteratee, function () {
            return !test.apply(this, arguments);
        }, cb);
    }

    function _withoutIndex(iteratee) {
        return function (value, index, callback) {
            return iteratee(value, callback);
        };
    }

    /**
     * The same as `each` but runs a maximum of `limit` async operations at a time.
     *
     * @name eachLimit
     * @static
     * @memberOf async
     * @see async.each
     * @alias forEachLimit
     * @category Collection
     * @param {Array|Object} coll - A colleciton to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each item in `coll`. The
     * iteratee is passed a `callback(err)` which must be called once it has
     * completed. If no error has occurred, the `callback` should be run without
     * arguments or with an explicit `null` argument. The array index is not passed
     * to the iteratee. Invoked with (item, callback). If you need the index, use
     * `eachOfLimit`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    function eachLimit(arr, limit, iteratee, cb) {
      return _eachOfLimit(limit)(arr, _withoutIndex(iteratee), cb);
    }

    /**
     * Applies the function `iteratee` to each item in `coll`, in parallel.
     * The `iteratee` is called with an item from the list, and a callback for when
     * it has finished. If the `iteratee` passes an error to its `callback`, the
     * main `callback` (for the `each` function) is immediately called with the
     * error.
     *
     * Note, that since this function applies `iteratee` to each item in parallel,
     * there is no guarantee that the iteratee functions will complete in order.
     *
     * @name each
     * @static
     * @memberOf async
     * @alias forEach
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item
     * in `coll`. The iteratee is passed a `callback(err)` which must be called once
     * it has completed. If no error has occurred, the `callback` should be run
     * without arguments or with an explicit `null` argument. The array index is not
     * passed to the iteratee. Invoked with (item, callback). If you need the index,
     * use `eachOf`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     * @example
     *
     * // assuming openFiles is an array of file names and saveFile is a function
     * // to save the modified contents of that file:
     *
     * async.each(openFiles, saveFile, function(err){
     *   // if any of the saves produced an error, err would equal that error
     * });
     *
     * // assuming openFiles is an array of file names
     * async.each(openFiles, function(file, callback) {
     *
     *     // Perform operation on file here.
     *     console.log('Processing file ' + file);
     *
     *     if( file.length > 32 ) {
     *       console.log('This file name is too long');
     *       callback('File name too long');
     *     } else {
     *       // Do work to process file here
     *       console.log('File processed');
     *       callback();
     *     }
     * }, function(err) {
     *     // if any of the file processing produced an error, err would equal that error
     *     if( err ) {
     *       // One of the iterations produced an error.
     *       // All processing will now stop.
     *       console.log('A file failed to process');
     *     } else {
     *       console.log('All files have been processed successfully');
     *     }
     * });
     */
    var each = doLimit(eachLimit, Infinity);

    /**
     * The same as `each` but runs only a single async operation at a time.
     *
     * @name eachSeries
     * @static
     * @memberOf async
     * @see async.each
     * @alias forEachSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each
     * item in `coll`. The iteratee is passed a `callback(err)` which must be called
     * once it has completed. If no error has occurred, the `callback` should be run
     * without arguments or with an explicit `null` argument. The array index is
     * not passed to the iteratee. Invoked with (item, callback). If you need the
     * index, use `eachOfSeries`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    var eachSeries = doLimit(eachLimit, 1);

    /**
     * Wrap an async function and ensure it calls its callback on a later tick of
     * the event loop.  If the function already calls its callback on a next tick,
     * no extra deferral is added. This is useful for preventing stack overflows
     * (`RangeError: Maximum call stack size exceeded`) and generally keeping
     * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
     * contained.
     *
     * @name ensureAsync
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} fn - an async function, one that expects a node-style
     * callback as its last argument.
     * @returns {Function} Returns a wrapped function with the exact same call
     * signature as the function passed in.
     * @example
     *
     * function sometimesAsync(arg, callback) {
     *     if (cache[arg]) {
     *         return callback(null, cache[arg]); // this would be synchronous!!
     *     } else {
     *         doSomeIO(arg, callback); // this IO would be asynchronous
     *     }
     * }
     *
     * // this has a risk of stack overflows if many results are cached in a row
     * async.mapSeries(args, sometimesAsync, done);
     *
     * // this will defer sometimesAsync's callback if necessary,
     * // preventing stack overflows
     * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
     */
    function ensureAsync(fn) {
        return initialParams(function (args, callback) {
            var sync = true;
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    setImmediate$1(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            fn.apply(this, args);
            sync = false;
        });
    }

    function notId(v) {
        return !v;
    }

    /**
     * The same as `every` but runs a maximum of `limit` async operations at a time.
     *
     * @name everyLimit
     * @static
     * @memberOf async
     * @see async.every
     * @alias allLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in the
     * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
     * which must be called with a  boolean argument once it has completed. Invoked
     * with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     */
    var everyLimit = _createTester(eachOfLimit, notId, notId);

    /**
     * Returns `true` if every element in `coll` satisfies an async test. If any
     * iteratee call returns `false`, the main `callback` is immediately called.
     *
     * @name every
     * @static
     * @memberOf async
     * @alias all
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the
     * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
     * which must be called with a  boolean argument once it has completed. Invoked
     * with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     * @example
     *
     * async.every(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // if result is true then every file exists
     * });
     */
    var every = doLimit(everyLimit, Infinity);

    /**
     * The same as `every` but runs only a single async operation at a time.
     *
     * @name everySeries
     * @static
     * @memberOf async
     * @see async.every
     * @alias allSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the
     * collection in parallel. The iteratee is passed a `callback(err, truthValue)`
     * which must be called with a  boolean argument once it has completed. Invoked
     * with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     */
    var everySeries = doLimit(everyLimit, 1);

    function _filter(eachfn, arr, iteratee, callback) {
        var results = [];
        eachfn(arr, function (x, index, callback) {
            iteratee(x, function (err, v) {
                if (err) {
                    callback(err);
                } else {
                    if (v) {
                        results.push({ index: index, value: x });
                    }
                    callback();
                }
            });
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, arrayMap(results.sort(function (a, b) {
                    return a.index - b.index;
                }), baseProperty('value')));
            }
        });
    }

    /**
     * The same as `filter` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name filterLimit
     * @static
     * @memberOf async
     * @see async.filter
     * @alias selectLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var filterLimit = doParallelLimit(_filter);

    /**
     * Returns a new array of all the values in `coll` which pass an async truth
     * test. This operation is performed in parallel, but the results array will be
     * in the same order as the original.
     *
     * @name filter
     * @static
     * @memberOf async
     * @alias select
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     * @example
     *
     * async.filter(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, results) {
     *     // results now equals an array of the existing files
     * });
     */
    var filter = doLimit(filterLimit, Infinity);

    /**
     * The same as `filter` but runs only a single async operation at a time.
     *
     * @name filterSeries
     * @static
     * @memberOf async
     * @see async.filter
     * @alias selectSeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results)
     */
    var filterSeries = doLimit(filterLimit, 1);

    /**
     * Calls the asynchronous function `fn` with a callback parameter that allows it
     * to call itself again, in series, indefinitely.

     * If an error is passed to the
     * callback then `errback` is called with the error, and execution stops,
     * otherwise it will never be called.
     *
     * @name forever
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Function} fn - a function to call repeatedly. Invoked with (next).
     * @param {Function} [errback] - when `fn` passes an error to it's callback,
     * this function will be called, and execution stops. Invoked with (err).
     * @example
     *
     * async.forever(
     *     function(next) {
     *         // next is suitable for passing to things that need a callback(err [, whatever]);
     *         // it will result in this function being called again.
     *     },
     *     function(err) {
     *         // if next is called with a value in its first parameter, it will appear
     *         // in here as 'err', and execution will stop.
     *     }
     * );
     */
    function forever(fn, cb) {
        var done = onlyOnce(cb || noop);
        var task = ensureAsync(fn);

        function next(err) {
            if (err) return done(err);
            task(next);
        }
        next();
    }

    /**
     * Creates an iterator function which calls the next function in the `tasks`
     * array, returning a continuation to call the next one after that. It's also
     * possible to “peek” at the next iterator with `iterator.next()`.
     *
     * This function is used internally by the `async` module, but can be useful
     * when you want to manually control the flow of functions in series.
     *
     * @name iterator
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array} tasks - An array of functions to run.
     * @returns The next function to run in the series.
     * @example
     *
     * var iterator = async.iterator([
     *     function() { sys.p('one'); },
     *     function() { sys.p('two'); },
     *     function() { sys.p('three'); }
     * ]);
     *
     * node> var iterator2 = iterator();
     * 'one'
     * node> var iterator3 = iterator2();
     * 'two'
     * node> iterator3();
     * 'three'
     * node> var nextfn = iterator2.next();
     * node> nextfn();
     * 'three'
     */
    function iterator$1 (tasks) {
        function makeCallback(index) {
            function fn() {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            }
            fn.next = function () {
                return index < tasks.length - 1 ? makeCallback(index + 1) : null;
            };
            return fn;
        }
        return makeCallback(0);
    }

    /**
     * Logs the result of an `async` function to the `console`. Only works in
     * Node.js or in browsers that support `console.log` and `console.error` (such
     * as FF and Chrome). If multiple arguments are returned from the async
     * function, `console.log` is called on each argument in order.
     *
     * @name log
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to eventually apply all
     * arguments to.
     * @param {...*} arguments... - Any number of arguments to apply to the function.
     * @example
     *
     * // in a module
     * var hello = function(name, callback) {
     *     setTimeout(function() {
     *         callback(null, 'hello ' + name);
     *     }, 1000);
     * };
     *
     * // in the node repl
     * node> async.log(hello, 'world');
     * 'hello world'
     */
    var log = consoleFunc('log');

    /**
     * The same as `mapValues` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name mapValuesLimit
     * @static
     * @memberOf async
     * @see async.mapValues
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A function to apply to each value in `obj`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed value. Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an object of the
     * transformed values from the `obj`. Invoked with (err, result).
     */
    function mapValuesLimit(obj, limit, iteratee, callback) {
        var newObj = {};
        eachOfLimit(obj, limit, function (val, key, next) {
            iteratee(val, key, function (err, result) {
                if (err) return next(err);
                newObj[key] = result;
                next();
            });
        }, function (err) {
            callback(err, newObj);
        });
    }

    /**
     * A relative of `map`, designed for use with objects.
     *
     * Produces a new Object by mapping each value of `obj` through the `iteratee`
     * function. The `iteratee` is called each `value` and `key` from `obj` and a
     * callback for when it has finished processing. Each of these callbacks takes
     * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
     * passes an error to its callback, the main `callback` (for the `mapValues`
     * function) is immediately called with the error.
     *
     * Note, the order of the keys in the result is not guaranteed.  The keys will
     * be roughly in the order they complete, (but this is very engine-specific)
     *
     * @name mapValues
     * @static
     * @memberOf async
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each value and key in
     * `coll`. The iteratee is passed a `callback(err, transformed)` which must be
     * called once it has completed with an error (which can be `null`) and a
     * transformed value. Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `obj`. Invoked with (err, result).
     * @example
     *
     * async.mapValues({
     *     f1: 'file1',
     *     f2: 'file2',
     *     f3: 'file3'
     * }, fs.stat, function(err, result) {
     *     // results is now a map of stats for each file, e.g.
     *     // {
     *     //     f1: [stats for file1],
     *     //     f2: [stats for file2],
     *     //     f3: [stats for file3]
     *     // }
     * });
     */

    var mapValues = doLimit(mapValuesLimit, Infinity);

    /**
     * The same as `mapValues` but runs only a single async operation at a time.
     *
     * @name mapValuesSeries
     * @static
     * @memberOf async
     * @see async.mapValues
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each value in `obj`.
     * The iteratee is passed a `callback(err, transformed)` which must be called
     * once it has completed with an error (which can be `null`) and a
     * transformed value. Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an object of the
     * transformed values from the `obj`. Invoked with (err, result).
     */
    var mapValuesSeries = doLimit(mapValuesLimit, 1);

    function has(obj, key) {
        return key in obj;
    }

    /**
     * Caches the results of an `async` function. When creating a hash to store
     * function results against, the callback is omitted from the hash and an
     * optional hash function can be used.
     *
     * If no hash function is specified, the first argument is used as a hash key,
     * which may work reasonably if it is a string or a data type that converts to a
     * distinct string. Note that objects and arrays will not behave reasonably.
     * Neither will cases where the other arguments are significant. In such cases,
     * specify your own hash function.
     *
     * The cache of results is exposed as the `memo` property of the function
     * returned by `memoize`.
     *
     * @name memoize
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} fn - The function to proxy and cache results from.
     * @param {Function} hasher - An optional function for generating a custom hash
     * for storing results. It has all the arguments applied to it apart from the
     * callback, and must be synchronous.
     * @example
     *
     * var slow_fn = function(name, callback) {
     *     // do something
     *     callback(null, result);
     * };
     * var fn = async.memoize(slow_fn);
     *
     * // fn can now be used as if it were slow_fn
     * fn('some name', function() {
     *     // callback
     * });
     */
    function memoize$1(fn, hasher) {
        var memo = Object.create(null);
        var queues = Object.create(null);
        hasher = hasher || identity;
        var memoized = initialParams(function memoized(args, callback) {
            var key = hasher.apply(null, args);
            if (has(memo, key)) {
                setImmediate$1(function () {
                    callback.apply(null, memo[key]);
                });
            } else if (has(queues, key)) {
                queues[key].push(callback);
            } else {
                queues[key] = [callback];
                fn.apply(null, args.concat([rest(function (args) {
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                })]));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    }

    /**
     * Calls `callback` on a later loop around the event loop. In Node.js this just
     * calls `setImmediate`.  In the browser it will use `setImmediate` if
     * available, otherwise `setTimeout(callback, 0)`, which means other higher
     * priority events may precede the execution of `callback`.
     *
     * This is used internally for browser-compatibility purposes.
     *
     * @name nextTick
     * @static
     * @memberOf async
     * @alias setImmediate
     * @category Util
     * @param {Function} callback - The function to call on a later loop around
     * the event loop. Invoked with (args...).
     * @param {...*} args... - any number of additional arguments to pass to the
     * callback on the next tick.
     * @example
     *
     * var call_order = [];
     * async.nextTick(function() {
     *     call_order.push('two');
     *     // call_order now equals ['one','two']
     * });
     * call_order.push('one');
     *
     * async.setImmediate(function (a, b, c) {
     *     // a, b, and c equal 1, 2, and 3
     * }, 1, 2, 3);
     */
    var _defer$1;

    if (hasNextTick) {
        _defer$1 = process.nextTick;
    } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
    } else {
        _defer$1 = fallback;
    }

    var nextTick = wrap(_defer$1);

    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};

        eachfn(tasks, function (task, key, callback) {
            task(rest(function (err, args) {
                if (args.length <= 1) {
                    args = args[0];
                }
                results[key] = args;
                callback(err);
            }));
        }, function (err) {
            callback(err, results);
        });
    }

    /**
     * The same as `parallel` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name parallel
     * @static
     * @memberOf async
     * @see async.parallel
     * @category Control Flow
     * @param {Array|Collection} tasks - A collection containing functions to run.
     * Each function is passed a `callback(err, result)` which it must call on
     * completion with an error `err` (which can be `null`) and an optional `result`
     * value.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed successfully. This function gets a results array
     * (or object) containing all the result arguments passed to the task callbacks.
     * Invoked with (err, results).
     */
    function parallelLimit(tasks, limit, cb) {
      return _parallel(_eachOfLimit(limit), tasks, cb);
    }

    /**
     * Run the `tasks` collection of functions in parallel, without waiting until
     * the previous function has completed. If any of the functions pass an error to
     * its callback, the main `callback` is immediately called with the value of the
     * error. Once the `tasks` have completed, the results are passed to the final
     * `callback` as an array.
     *
     * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
     * parallel execution of code.  If your tasks do not use any timers or perform
     * any I/O, they will actually be executed in series.  Any synchronous setup
     * sections for each task will happen one after the other.  JavaScript remains
     * single-threaded.
     *
     * It is also possible to use an object instead of an array. Each property will
     * be run as a function and the results will be passed to the final `callback`
     * as an object instead of an array. This can be a more readable way of handling
     * results from {@link async.parallel}.
     *
     * @name parallel
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array|Object} tasks - A collection containing functions to run.
     * Each function is passed a `callback(err, result)` which it must call on
     * completion with an error `err` (which can be `null`) and an optional `result`
     * value.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed successfully. This function gets a results array
     * (or object) containing all the result arguments passed to the task callbacks.
     * Invoked with (err, results).
     * @example
     * async.parallel([
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     // the results array will equal ['one','two'] even though
     *     // the second function had a shorter timeout.
     * });
     *
     * // an example using an object instead of an array
     * async.parallel({
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 1);
     *         }, 200);
     *     },
     *     two: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 2);
     *         }, 100);
     *     }
     * }, function(err, results) {
     *     // results is now equals to: {one: 1, two: 2}
     * });
     */
    var parallel = doLimit(parallelLimit, Infinity);

    /**
     * A queue of tasks for the worker function to complete.
     * @typedef {Object} queue
     * @property {Function} length - a function returning the number of items
     * waiting to be processed. Invoke with ().
     * @property {Function} started - a function returning whether or not any
     * items have been pushed and processed by the queue. Invoke with ().
     * @property {Function} running - a function returning the number of items
     * currently being processed. Invoke with ().
     * @property {Function} workersList - a function returning the array of items
     * currently being processed. Invoke with ().
     * @property {Function} idle - a function returning false if there are items
     * waiting or being processed, or true if not. Invoke with ().
     * @property {number} concurrency - an integer for determining how many `worker`
     * functions should be run in parallel. This property can be changed after a
     * `queue` is created to alter the concurrency on-the-fly.
     * @property {Function} push - add a new task to the `queue`. Calls `callback`
     * once the `worker` has finished processing the task. Instead of a single task,
     * a `tasks` array can be submitted. The respective callback is used for every
     * task in the list. Invoke with (task, [callback]),
     * @property {Function} unshift - add a new task to the front of the `queue`.
     * Invoke with (task, [callback]).
     * @property {Function} saturated - a callback that is called when the number of
     * running workers hits the `concurrency` limit, and further tasks will be
     * queued.
     * @property {Function} unsaturated - a callback that is called when the number
     * of running workers is less than the `concurrency` & `buffer` limits, and
     * further tasks will not be queued.
     * @property {number} buffer - A minimum threshold buffer in order to say that
     * the `queue` is `unsaturated`.
     * @property {Function} empty - a callback that is called when the last item
     * from the `queue` is given to a `worker`.
     * @property {Function} drain - a callback that is called when the last item
     * from the `queue` has returned from the `worker`.
     * @property {Function} error - a callback that is called when a task errors.
     * Has the signature `function(error, task)`.
     * @property {boolean} paused - a boolean for determining whether the queue is
     * in a paused state.
     * @property {Function} pause - a function that pauses the processing of tasks
     * until `resume()` is called. Invoke with ().
     * @property {Function} resume - a function that resumes the processing of
     * queued tasks when the queue is paused. Invoke with ().
     * @property {Function} kill - a function that removes the `drain` callback and
     * empties remaining tasks from the queue forcing it to go idle. Invoke with ().
     */

    /**
     * Creates a `queue` object with the specified `concurrency`. Tasks added to the
     * `queue` are processed in parallel (up to the `concurrency` limit). If all
     * `worker`s are in progress, the task is queued until one becomes available.
     * Once a `worker` completes a `task`, that `task`'s callback is called.
     *
     * @name queue
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Function} worker - An asynchronous function for processing a queued
     * task, which must call its `callback(err)` argument when finished, with an
     * optional `error` as an argument.  If you want to handle errors from an
     * individual task, pass a callback to `q.push()`. Invoked with
     * (task, callback).
     * @param {number} [concurrency=1] - An `integer` for determining how many
     * `worker` functions should be run in parallel.  If omitted, the concurrency
     * defaults to `1`.  If the concurrency is `0`, an error is thrown.
     * @returns {queue} A queue object to manage the tasks. Callbacks can
     * attached as certain properties to listen for specific events during the
     * lifecycle of the queue.
     * @example
     *
     * // create a queue object with concurrency 2
     * var q = async.queue(function(task, callback) {
     *     console.log('hello ' + task.name);
     *     callback();
     * }, 2);
     *
     * // assign a callback
     * q.drain = function() {
     *     console.log('all items have been processed');
     * };
     *
     * // add some items to the queue
     * q.push({name: 'foo'}, function(err) {
     *     console.log('finished processing foo');
     * });
     * q.push({name: 'bar'}, function (err) {
     *     console.log('finished processing bar');
     * });
     *
     * // add some items to the queue (batch-wise)
     * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
     *     console.log('finished processing item');
     * });
     *
     * // add some items to the front of the queue
     * q.unshift({name: 'bar'}, function (err) {
     *     console.log('finished processing bar');
     * });
     */
    function queue$1 (worker, concurrency) {
      return queue(function (items, cb) {
        worker(items[0], cb);
      }, concurrency, 1);
    }

    /**
     * The same as {@link async.queue} only tasks are assigned a priority and
     * completed in ascending priority order.
     *
     * @name priorityQueue
     * @static
     * @memberOf async
     * @see async.queue
     * @category Control Flow
     * @param {Function} worker - An asynchronous function for processing a queued
     * task, which must call its `callback(err)` argument when finished, with an
     * optional `error` as an argument.  If you want to handle errors from an
     * individual task, pass a callback to `q.push()`. Invoked with
     * (task, callback).
     * @param {number} concurrency - An `integer` for determining how many `worker`
     * functions should be run in parallel.  If omitted, the concurrency defaults to
     * `1`.  If the concurrency is `0`, an error is thrown.
     * @returns {queue} A priorityQueue object to manage the tasks. There are two
     * differences between `queue` and `priorityQueue` objects:
     * * `push(task, priority, [callback])` - `priority` should be a number. If an
     *   array of `tasks` is given, all tasks will be assigned the same priority.
     * * The `unshift` method was removed.
     */
    function priorityQueue (worker, concurrency) {
        function _compareTasks(a, b) {
            return a.priority - b.priority;
        }

        function _binarySearch(sequence, item, compare) {
            var beg = -1,
                end = sequence.length - 1;
            while (beg < end) {
                var mid = beg + (end - beg + 1 >>> 1);
                if (compare(item, sequence[mid]) >= 0) {
                    beg = mid;
                } else {
                    end = mid - 1;
                }
            }
            return beg;
        }

        function _insert(q, data, priority, callback) {
            if (callback != null && typeof callback !== 'function') {
                throw new Error('task callback must be a function');
            }
            q.started = true;
            if (!isArray(data)) {
                data = [data];
            }
            if (data.length === 0) {
                // call drain immediately if there are no tasks
                return setImmediate$1(function () {
                    q.drain();
                });
            }
            arrayEach(data, function (task) {
                var item = {
                    data: task,
                    priority: priority,
                    callback: typeof callback === 'function' ? callback : noop
                };

                q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

                setImmediate$1(q.process);
            });
        }

        // Start with a normal queue
        var q = queue$1(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
            _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _([1, 2]).forEach(function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, baseIteratee(iteratee, 3));
    }

    /**
     * Runs the `tasks` array of functions in parallel, without waiting until the
     * previous function has completed. Once any the `tasks` completed or pass an
     * error to its callback, the main `callback` is immediately called. It's
     * equivalent to `Promise.race()`.
     *
     * @name race
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array} tasks - An array containing functions to run. Each function
     * is passed a `callback(err, result)` which it must call on completion with an
     * error `err` (which can be `null`) and an optional `result` value.
     * @param {Function} callback - A callback to run once any of the functions have
     * completed. This function gets an error or result from the first function that
     * completed. Invoked with (err, result).
     * @example
     *
     * async.race([
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ],
     * // main callback
     * function(err, result) {
     *     // the result will be equal to 'two' as it finishes earlier
     * });
     */
    function race(tasks, cb) {
        cb = once(cb || noop);
        if (!isArray(tasks)) return cb(new TypeError('First argument to race must be an array of functions'));
        if (!tasks.length) return cb();
        forEach(tasks, function (task) {
            task(cb);
        });
    }

    var slice = Array.prototype.slice;

    /**
     * Same as `reduce`, only operates on `coll` in reverse order.
     *
     * @name reduceRight
     * @static
     * @memberOf async
     * @see async.reduce
     * @alias foldr
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {*} memo - The initial state of the reduction.
     * @param {Function} iteratee - A function applied to each item in the
     * array to produce the next step in the reduction. The `iteratee` is passed a
     * `callback(err, reduction)` which accepts an optional error as its first
     * argument, and the state of the reduction as the second. If an error is
     * passed to the callback, the reduction is stopped and the main `callback` is
     * immediately called with the error. Invoked with (memo, item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the reduced value. Invoked with
     * (err, result).
     */
    function reduceRight(arr, memo, iteratee, cb) {
      var reversed = slice.call(arr).reverse();
      reduce(reversed, memo, iteratee, cb);
    }

    /**
     * Wraps the function in another function that always returns data even when it
     * errors.
     *
     * The object returned has either the property `error` or `value`.
     *
     * @name reflect
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The function you want to wrap
     * @returns {Function} - A function that always passes null to it's callback as
     * the error. The second argument to the callback will be an `object` with
     * either an `error` or a `value` property.
     * @example
     *
     * async.parallel([
     *     async.reflect(function(callback) {
     *         // do some stuff ...
     *         callback(null, 'one');
     *     }),
     *     async.reflect(function(callback) {
     *         // do some more stuff but error ...
     *         callback('bad stuff happened');
     *     }),
     *     async.reflect(function(callback) {
     *         // do some more stuff ...
     *         callback(null, 'two');
     *     })
     * ],
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results[0].value = 'one'
     *     // results[1].error = 'bad stuff happened'
     *     // results[2].value = 'two'
     * });
     */
    function reflect(fn) {
        return initialParams(function reflectOn(args, reflectCallback) {
            args.push(rest(function callback(err, cbArgs) {
                if (err) {
                    reflectCallback(null, {
                        error: err
                    });
                } else {
                    var value = null;
                    if (cbArgs.length === 1) {
                        value = cbArgs[0];
                    } else if (cbArgs.length > 1) {
                        value = cbArgs;
                    }
                    reflectCallback(null, {
                        value: value
                    });
                }
            }));

            return fn.apply(this, args);
        });
    }

    function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function (value, cb) {
            iteratee(value, function (err, v) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, !v);
                }
            });
        }, callback);
    }

    /**
     * The same as `reject` but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name rejectLimit
     * @static
     * @memberOf async
     * @see async.reject
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var rejectLimit = doParallelLimit(reject$1);

    /**
     * The opposite of `filter`. Removes values that pass an `async` truth test.
     *
     * @name reject
     * @static
     * @memberOf async
     * @see async.filter
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     * @example
     *
     * async.reject(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, results) {
     *     // results now equals an array of missing files
     *     createFiles(results);
     * });
     */
    var reject = doLimit(rejectLimit, Infinity);

    /**
     * A helper function that wraps an array of functions with reflect.
     *
     * @name reflectAll
     * @static
     * @memberOf async
     * @see async.reflect
     * @category Util
     * @param {Array} tasks - The array of functions to wrap in `async.reflect`.
     * @returns {Array} Returns an array of functions, each function wrapped in
     * `async.reflect`
     * @example
     *
     * let tasks = [
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         // do some more stuff but error ...
     *         callback(new Error('bad stuff happened'));
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ];
     *
     * async.parallel(async.reflectAll(tasks),
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results[0].value = 'one'
     *     // results[1].error = Error('bad stuff happened')
     *     // results[2].value = 'two'
     * });
     */
    function reflectAll(tasks) {
      return tasks.map(reflect);
    }

    /**
     * The same as `reject` but runs only a single async operation at a time.
     *
     * @name rejectSeries
     * @static
     * @memberOf async
     * @see async.reject
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var rejectSeries = doLimit(rejectLimit, 1);

    /**
     * Run the functions in the `tasks` collection in series, each one running once
     * the previous function has completed. If any functions in the series pass an
     * error to its callback, no more functions are run, and `callback` is
     * immediately called with the value of the error. Otherwise, `callback`
     * receives an array of results when `tasks` have completed.
     *
     * It is also possible to use an object instead of an array. Each property will
     * be run as a function, and the results will be passed to the final `callback`
     * as an object instead of an array. This can be a more readable way of handling
     *  results from {@link async.series}.
     *
     * **Note** that while many implementations preserve the order of object
     * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
     * explicitly states that
     *
     * > The mechanics and order of enumerating the properties is not specified.
     *
     * So if you rely on the order in which your series of functions are executed,
     * and want this to work on all platforms, consider using an array.
     *
     * @name series
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array|Object} tasks - A collection containing functions to run, each
     * function is passed a `callback(err, result)` it must call on completion with
     * an error `err` (which can be `null`) and an optional `result` value.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed. This function gets a results array (or object)
     * containing all the result arguments passed to the `task` callbacks. Invoked
     * with (err, result).
     * @example
     * async.series([
     *     function(callback) {
     *         // do some stuff ...
     *         callback(null, 'one');
     *     },
     *     function(callback) {
     *         // do some more stuff ...
     *         callback(null, 'two');
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     // results is now equal to ['one', 'two']
     * });
     *
     * async.series({
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 1);
     *         }, 200);
     *     },
     *     two: function(callback){
     *         setTimeout(function() {
     *             callback(null, 2);
     *         }, 100);
     *     }
     * }, function(err, results) {
     *     // results is now equal to: {one: 1, two: 2}
     * });
     */
    function series(tasks, cb) {
      return _parallel(eachOfSeries, tasks, cb);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant$1(value) {
      return function() {
        return value;
      };
    }

    /**
     * Attempts to get a successful response from `task` no more than `times` times
     * before returning an error. If the task is successful, the `callback` will be
     * passed the result of the successful task. If all attempts fail, the callback
     * will be passed the error and result (if any) of the final attempt.
     *
     * @name retry
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
     * object with `times` and `interval` or a number.
     * * `times` - The number of attempts to make before giving up.  The default
     *   is `5`.
     * * `interval` - The time to wait between retries, in milliseconds.  The
     *   default is `0`. The interval may also be specified as a function of the
     *   retry count (see example).
     * * If `opts` is a number, the number specifies the number of times to retry,
     *   with the default interval of `0`.
     * @param {Function} task - A function which receives two arguments: (1) a
     * `callback(err, result)` which must be called when finished, passing `err`
     * (which can be `null`) and the `result` of the function's execution, and (2)
     * a `results` object, containing the results of the previously executed
     * functions (if nested inside another control flow). Invoked with
     * (callback, results).
     * @param {Function} [callback] - An optional callback which is called when the
     * task has succeeded, or after the final failed attempt. It receives the `err`
     * and `result` arguments of the last attempt at completing the `task`. Invoked
     * with (err, results).
     * @example
     *
     * // The `retry` function can be used as a stand-alone control flow by passing
     * // a callback, as shown below:
     *
     * // try calling apiMethod 3 times
     * async.retry(3, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod 3 times, waiting 200 ms between each retry
     * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod 10 times with exponential backoff
     * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
     * async.retry({
     *   times: 10,
     *   interval: function(retryCount) {
     *     return 50 * Math.pow(2, retryCount);
     *   }
     * }, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod the default 5 times no delay between each retry
     * async.retry(apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // It can also be embedded within other control flow functions to retry
     * // individual methods that are not as reliable, like this:
     * async.auto({
     *     users: api.getUsers.bind(api),
     *     payments: async.retry(3, api.getPayments.bind(api))
     * }, function(err, results) {
     *     // do something with the results
     * });
     */
    function retry(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;

        var opts = {
            times: DEFAULT_TIMES,
            intervalFunc: constant$1(DEFAULT_INTERVAL)
        };

        function parseTimes(acc, t) {
            if (typeof t === 'object') {
                acc.times = +t.times || DEFAULT_TIMES;

                acc.intervalFunc = typeof t.interval === 'function' ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
            } else if (typeof t === 'number' || typeof t === 'string') {
                acc.times = +t || DEFAULT_TIMES;
            } else {
                throw new Error("Invalid arguments for async.retry");
            }
        }

        if (arguments.length < 3 && typeof times === 'function') {
            callback = task || noop;
            task = times;
        } else {
            parseTimes(opts, times);
            callback = callback || noop;
        }

        if (typeof task !== 'function') {
            throw new Error("Invalid arguments for async.retry");
        }

        var attempts = [];
        for (var i = 1; i < opts.times + 1; i++) {
            var isFinalAttempt = i == opts.times;
            attempts.push(retryAttempt(isFinalAttempt));
            var interval = opts.intervalFunc(i);
            if (!isFinalAttempt && interval > 0) {
                attempts.push(retryInterval(interval));
            }
        }

        series(attempts, function (done, data) {
            data = data[data.length - 1];
            callback(data.err, data.result);
        });

        function retryAttempt(isFinalAttempt) {
            return function (seriesCallback) {
                task(function (err, result) {
                    seriesCallback(!err || isFinalAttempt, {
                        err: err,
                        result: result
                    });
                });
            };
        }

        function retryInterval(interval) {
            return function (seriesCallback) {
                setTimeout(function () {
                    seriesCallback(null);
                }, interval);
            };
        }
    }

    /**
     * A close relative of `retry`.  This method wraps a task and makes it
     * retryable, rather than immediately calling it with retries.
     *
     * @name retryable
     * @static
     * @memberOf async
     * @see async.retry
     * @category Control Flow
     * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
     * options, exactly the same as from `retry`
     * @param {Function} task - the asynchronous function to wrap
     * @returns {Functions} The wrapped function, which when invoked, will retry on
     * an error, based on the parameters specified in `opts`.
     * @example
     *
     * async.auto({
     *     dep1: async.retryable(3, getFromFlakyService),
     *     process: ["dep1", async.retryable(3, function (results, cb) {
     *         maybeProcessData(results.dep1, cb);
     *     })]
     * }, callback);
     */
    function retryable (opts, task) {
        if (!task) {
            task = opts;
            opts = null;
        }
        return initialParams(function (args, callback) {
            function taskFn(cb) {
                task.apply(null, args.concat([cb]));
            }

            if (opts) retry(opts, taskFn, callback);else retry(taskFn, callback);
        });
    }

    /**
     * The same as `some` but runs a maximum of `limit` async operations at a time.
     *
     * @name someLimit
     * @static
     * @memberOf async
     * @see async.some
     * @alias anyLimit
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in the array
     * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
     * be called with a boolean argument once it has completed. Invoked with
     * (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     */
    var someLimit = _createTester(eachOfLimit, Boolean, identity);

    /**
     * Returns `true` if at least one element in the `coll` satisfies an async test.
     * If any iteratee call returns `true`, the main `callback` is immediately
     * called.
     *
     * @name some
     * @static
     * @memberOf async
     * @alias any
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the array
     * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
     * be called with a boolean argument once it has completed. Invoked with
     * (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     * @example
     *
     * async.some(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // if result is true then at least one of the files exists
     * });
     */
    var some = doLimit(someLimit, Infinity);

    /**
     * The same as `some` but runs only a single async operation at a time.
     *
     * @name someSeries
     * @static
     * @memberOf async
     * @see async.some
     * @alias anySeries
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in the array
     * in parallel. The iteratee is passed a `callback(err, truthValue)` which must
     * be called with a boolean argument once it has completed. Invoked with
     * (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     */
    var someSeries = doLimit(someLimit, 1);

    /**
     * Sorts a list by the results of running each `coll` value through an async
     * `iteratee`.
     *
     * @name sortBy
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A function to apply to each item in `coll`.
     * The iteratee is passed a `callback(err, sortValue)` which must be called once
     * it has completed with an error (which can be `null`) and a value to use as
     * the sort criteria. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is the items
     * from the original `coll` sorted by the values returned by the `iteratee`
     * calls. Invoked with (err, results).
     * @example
     *
     * async.sortBy(['file1','file2','file3'], function(file, callback) {
     *     fs.stat(file, function(err, stats) {
     *         callback(err, stats.mtime);
     *     });
     * }, function(err, results) {
     *     // results is now the original array of files sorted by
     *     // modified date
     * });
     *
     * // By modifying the callback parameter the
     * // sorting order can be influenced:
     *
     * // ascending order
     * async.sortBy([1,9,3,5], function(x, callback) {
     *     callback(null, x);
     * }, function(err,result) {
     *     // result callback
     * });
     *
     * // descending order
     * async.sortBy([1,9,3,5], function(x, callback) {
     *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
     * }, function(err,result) {
     *     // result callback
     * });
     */
    function sortBy(arr, iteratee, cb) {
        map(arr, function (x, cb) {
            iteratee(x, function (err, criteria) {
                if (err) return cb(err);
                cb(null, { value: x, criteria: criteria });
            });
        }, function (err, results) {
            if (err) return cb(err);
            cb(null, arrayMap(results.sort(comparator), baseProperty('value')));
        });

        function comparator(left, right) {
            var a = left.criteria,
                b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    }

    /**
     * Sets a time limit on an asynchronous function. If the function does not call
     * its callback within the specified miliseconds, it will be called with a
     * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
     *
     * @name timeout
     * @static
     * @memberOf async
     * @category Util
     * @param {Function} function - The asynchronous function you want to set the
     * time limit.
     * @param {number} miliseconds - The specified time limit.
     * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
     * to timeout Error for more information..
     * @returns {Function} Returns a wrapped function that can be used with any of
     * the control flow functions.
     * @example
     *
     * async.timeout(function(callback) {
     *     doAsyncTask(callback);
     * }, 1000);
     */
    function timeout(asyncFn, miliseconds, info) {
        var originalCallback, timer;
        var timedOut = false;

        function injectedCallback() {
            if (!timedOut) {
                originalCallback.apply(null, arguments);
                clearTimeout(timer);
            }
        }

        function timeoutCallback() {
            var name = asyncFn.name || 'anonymous';
            var error = new Error('Callback function "' + name + '" timed out.');
            error.code = 'ETIMEDOUT';
            if (info) {
                error.info = info;
            }
            timedOut = true;
            originalCallback(error);
        }

        return initialParams(function (args, origCallback) {
            originalCallback = origCallback;
            // setup timer and call original function
            timer = setTimeout(timeoutCallback, miliseconds);
            asyncFn.apply(null, args.concat(injectedCallback));
        });
    }

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil;
    var nativeMax$1 = Math.max;
    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments to numbers.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax$1(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
    * The same as {@link times} but runs a maximum of `limit` async operations at a
    * time.
     *
     * @name timesLimit
     * @static
     * @memberOf async
     * @see async.times
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - The function to call `n` times. Invoked with the
     * iteration index and a callback (n, next).
     * @param {Function} callback - see {@link async.map}.
     */
    function timeLimit(count, limit, iteratee, cb) {
      return mapLimit(baseRange(0, count, 1), limit, iteratee, cb);
    }

    /**
     * Calls the `iteratee` function `n` times, and accumulates results in the same
     * manner you would use with {@link async.map}.
     *
     * @name times
     * @static
     * @memberOf async
     * @see async.map
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {Function} iteratee - The function to call `n` times. Invoked with the
     * iteration index and a callback (n, next).
     * @param {Function} callback - see {@link async.map}.
     * @example
     *
     * // Pretend this is some complicated async factory
     * var createUser = function(id, callback) {
     *     callback(null, {
     *         id: 'user' + id
     *     });
     * };
     *
     * // generate 5 users
     * async.times(5, function(n, next) {
     *     createUser(n, function(err, user) {
     *         next(err, user);
     *     });
     * }, function(err, users) {
     *     // we should now have 5 users
     * });
     */
    var times = doLimit(timeLimit, Infinity);

    /**
     * The same as {@link async.times} but runs only a single async operation at a time.
     *
     * @name timesSeries
     * @static
     * @memberOf async
     * @see async.times
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {Function} iteratee - The function to call `n` times. Invoked with the
     * iteration index and a callback (n, next).
     * @param {Function} callback - see {@link async.map}.
     */
    var timesSeries = doLimit(timeLimit, 1);

    /**
     * A relative of `reduce`.  Takes an Object or Array, and iterates over each
     * element in series, each step potentially mutating an `accumulator` value.
     * The type of the accumulator defaults to the type of collection passed in.
     *
     * @name transform
     * @static
     * @memberOf async
     * @category Collection
     * @param {Array|Object} coll - A collection to iterate over.
     * @param {*} [accumulator] - The initial state of the transform.  If omitted,
     * it will default to an empty Object or Array, depending on the type of `coll`
     * @param {Function} iteratee - A function applied to each item in the
     * collection that potentially modifies the accumulator. The `iteratee` is
     * passed a `callback(err)` which accepts an optional error as its first
     * argument. If an error is passed to the callback, the transform is stopped
     * and the main `callback` is immediately called with the error.
     * Invoked with (accumulator, item, key, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the transformed accumulator.
     * Invoked with (err, result).
     * @example
     *
     * async.transform([1,2,3], function(acc, item, index, callback) {
     *     // pointless async:
     *     process.nextTick(function() {
     *         acc.push(item * 2)
     *         callback(null)
     *     });
     * }, function(err, result) {
     *     // result is now equal to [2, 4, 6]
     * });
     *
     * @example
     *
     * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
     *     setImmediate(function () {
     *         obj[key] = val * 2;
     *         callback();
     *     })
     * }, function (err, result) {
     *     // result is equal to {a: 2, b: 4, c: 6}
     * })
     */
    function transform(arr, acc, iteratee, callback) {
        if (arguments.length === 3) {
            callback = iteratee;
            iteratee = acc;
            acc = isArray(arr) ? [] : {};
        }

        eachOf(arr, function (v, k, cb) {
            iteratee(acc, v, k, cb);
        }, function (err) {
            callback(err, acc);
        });
    }

    /**
     * Undoes a {@link async.memoize}d function, reverting it to the original,
     * unmemoized form. Handy for testing.
     *
     * @name unmemoize
     * @static
     * @memberOf async
     * @see async.memoize
     * @category Util
     * @param {Function} fn - the memoized function
     */
    function unmemoize(fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    }

    /**
     * Repeatedly call `fn` until `test` returns `true`. Calls `callback` when
     * stopped, or an error occurs. `callback` will be passed an error and any
     * arguments passed to the final `fn`'s callback.
     *
     * The inverse of {@link async.whilst}.
     *
     * @name until
     * @static
     * @memberOf async
     * @see async.whilst
     * @category Control Flow
     * @param {Function} test - synchronous truth test to perform before each
     * execution of `fn`. Invoked with ().
     * @param {Function} fn - A function which is called each time `test` fails.
     * The function is passed a `callback(err)`, which must be called once it has
     * completed with an optional `err` argument. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has passed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `fn`'s
     * callback. Invoked with (err, [results]);
     */
    function until(test, iteratee, cb) {
        return whilst(function () {
            return !test.apply(this, arguments);
        }, iteratee, cb);
    }

    /**
     * Runs the `tasks` array of functions in series, each passing their results to
     * the next in the array. However, if any of the `tasks` pass an error to their
     * own callback, the next function is not executed, and the main `callback` is
     * immediately called with the error.
     *
     * @name waterfall
     * @static
     * @memberOf async
     * @category Control Flow
     * @param {Array} tasks - An array of functions to run, each function is passed
     * a `callback(err, result1, result2, ...)` it must call on completion. The
     * first argument is an error (which can be `null`) and any further arguments
     * will be passed as arguments in order to the next task.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed. This will be passed the results of the last task's
     * callback. Invoked with (err, [results]).
     * @example
     *
     * async.waterfall([
     *     function(callback) {
     *         callback(null, 'one', 'two');
     *     },
     *     function(arg1, arg2, callback) {
     *         // arg1 now equals 'one' and arg2 now equals 'two'
     *         callback(null, 'three');
     *     },
     *     function(arg1, callback) {
     *         // arg1 now equals 'three'
     *         callback(null, 'done');
     *     }
     * ], function (err, result) {
     *     // result now equals 'done'
     * });
     *
     * // Or, with named functions:
     * async.waterfall([
     *     myFirstFunction,
     *     mySecondFunction,
     *     myLastFunction,
     * ], function (err, result) {
     *     // result now equals 'done'
     * });
     * function myFirstFunction(callback) {
     *     callback(null, 'one', 'two');
     * }
     * function mySecondFunction(arg1, arg2, callback) {
     *     // arg1 now equals 'one' and arg2 now equals 'two'
     *     callback(null, 'three');
     * }
     * function myLastFunction(arg1, callback) {
     *     // arg1 now equals 'three'
     *     callback(null, 'done');
     * }
     */
    function waterfall (tasks, cb) {
        cb = once(cb || noop);
        if (!isArray(tasks)) return cb(new Error('First argument to waterfall must be an array of functions'));
        if (!tasks.length) return cb();
        var taskIndex = 0;

        function nextTask(args) {
            if (taskIndex === tasks.length) {
                return cb.apply(null, [null].concat(args));
            }

            var taskCallback = onlyOnce(rest(function (err, args) {
                if (err) {
                    return cb.apply(null, [err].concat(args));
                }
                nextTask(args);
            }));

            args.push(taskCallback);

            var task = tasks[taskIndex++];
            task.apply(null, args);
        }

        nextTask([]);
    }

    var index = {
        applyEach: applyEach,
        applyEachSeries: applyEachSeries,
        apply: apply$1,
        asyncify: asyncify,
        auto: auto,
        autoInject: autoInject,
        cargo: cargo,
        compose: compose,
        concat: concat,
        concatSeries: concatSeries,
        constant: constant,
        detect: detect,
        detectLimit: detectLimit,
        detectSeries: detectSeries,
        dir: dir,
        doDuring: doDuring,
        doUntil: doUntil,
        doWhilst: doWhilst,
        during: during,
        each: each,
        eachLimit: eachLimit,
        eachOf: eachOf,
        eachOfLimit: eachOfLimit,
        eachOfSeries: eachOfSeries,
        eachSeries: eachSeries,
        ensureAsync: ensureAsync,
        every: every,
        everyLimit: everyLimit,
        everySeries: everySeries,
        filter: filter,
        filterLimit: filterLimit,
        filterSeries: filterSeries,
        forever: forever,
        iterator: iterator$1,
        log: log,
        map: map,
        mapLimit: mapLimit,
        mapSeries: mapSeries,
        mapValues: mapValues,
        mapValuesLimit: mapValuesLimit,
        mapValuesSeries: mapValuesSeries,
        memoize: memoize$1,
        nextTick: nextTick,
        parallel: parallel,
        parallelLimit: parallelLimit,
        priorityQueue: priorityQueue,
        queue: queue$1,
        race: race,
        reduce: reduce,
        reduceRight: reduceRight,
        reflect: reflect,
        reflectAll: reflectAll,
        reject: reject,
        rejectLimit: rejectLimit,
        rejectSeries: rejectSeries,
        retry: retry,
        retryable: retryable,
        seq: seq,
        series: series,
        setImmediate: setImmediate$1,
        some: some,
        someLimit: someLimit,
        someSeries: someSeries,
        sortBy: sortBy,
        timeout: timeout,
        times: times,
        timesLimit: timeLimit,
        timesSeries: timesSeries,
        transform: transform,
        unmemoize: unmemoize,
        until: until,
        waterfall: waterfall,
        whilst: whilst,

        // aliases
        all: every,
        any: some,
        forEach: each,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
    };

    exports['default'] = index;
    exports.applyEach = applyEach;
    exports.applyEachSeries = applyEachSeries;
    exports.apply = apply$1;
    exports.asyncify = asyncify;
    exports.auto = auto;
    exports.autoInject = autoInject;
    exports.cargo = cargo;
    exports.compose = compose;
    exports.concat = concat;
    exports.concatSeries = concatSeries;
    exports.constant = constant;
    exports.detect = detect;
    exports.detectLimit = detectLimit;
    exports.detectSeries = detectSeries;
    exports.dir = dir;
    exports.doDuring = doDuring;
    exports.doUntil = doUntil;
    exports.doWhilst = doWhilst;
    exports.during = during;
    exports.each = each;
    exports.eachLimit = eachLimit;
    exports.eachOf = eachOf;
    exports.eachOfLimit = eachOfLimit;
    exports.eachOfSeries = eachOfSeries;
    exports.eachSeries = eachSeries;
    exports.ensureAsync = ensureAsync;
    exports.every = every;
    exports.everyLimit = everyLimit;
    exports.everySeries = everySeries;
    exports.filter = filter;
    exports.filterLimit = filterLimit;
    exports.filterSeries = filterSeries;
    exports.forever = forever;
    exports.iterator = iterator$1;
    exports.log = log;
    exports.map = map;
    exports.mapLimit = mapLimit;
    exports.mapSeries = mapSeries;
    exports.mapValues = mapValues;
    exports.mapValuesLimit = mapValuesLimit;
    exports.mapValuesSeries = mapValuesSeries;
    exports.memoize = memoize$1;
    exports.nextTick = nextTick;
    exports.parallel = parallel;
    exports.parallelLimit = parallelLimit;
    exports.priorityQueue = priorityQueue;
    exports.queue = queue$1;
    exports.race = race;
    exports.reduce = reduce;
    exports.reduceRight = reduceRight;
    exports.reflect = reflect;
    exports.reflectAll = reflectAll;
    exports.reject = reject;
    exports.rejectLimit = rejectLimit;
    exports.rejectSeries = rejectSeries;
    exports.retry = retry;
    exports.retryable = retryable;
    exports.seq = seq;
    exports.series = series;
    exports.setImmediate = setImmediate$1;
    exports.some = some;
    exports.someLimit = someLimit;
    exports.someSeries = someSeries;
    exports.sortBy = sortBy;
    exports.timeout = timeout;
    exports.times = times;
    exports.timesLimit = timeLimit;
    exports.timesSeries = timesSeries;
    exports.transform = transform;
    exports.unmemoize = unmemoize;
    exports.until = until;
    exports.waterfall = waterfall;
    exports.whilst = whilst;
    exports.all = every;
    exports.allLimit = everyLimit;
    exports.allSeries = everySeries;
    exports.any = some;
    exports.anyLimit = someLimit;
    exports.anySeries = someSeries;
    exports.find = detect;
    exports.findLimit = detectLimit;
    exports.findSeries = detectSeries;
    exports.forEach = each;
    exports.forEachSeries = eachSeries;
    exports.forEachLimit = eachLimit;
    exports.forEachOf = eachOf;
    exports.forEachOfSeries = eachOfSeries;
    exports.forEachOfLimit = eachOfLimit;
    exports.inject = reduce;
    exports.foldl = reduce;
    exports.foldr = reduceRight;
    exports.select = filter;
    exports.selectLimit = filterLimit;
    exports.selectSeries = filterSeries;
    exports.wrapSync = asyncify;

}));
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
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
    key: 'addAction',
    value: function addAction(actionName, action) {
      var autoUpate = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var that = this;
      if (typeof action !== 'function') {
        return console.error('Store addAction invalid argument type - Actions must be functions');
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

},{"./updater":5}],5:[function(require,module,exports){
'use strict';

var _events = require('events');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      callbacks[eventName] = [];
    }
    callbacks[eventName].push(callback);
    emitter.on(eventName, function (prop) {
      _async2.default.each(callbacks[eventName], function (callback) {
        callback(prop);
      });
    });
  };

  var onEvent = function onEvent() {
    _async2.default.each(callbacks.default, function (callback) {
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
    update: update
  };
}();

},{"async":1,"events":2}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvZGlzdC9hc3luYy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyYy9TdG9yZS5qcyIsInNyYy91cGRhdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdHFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUEsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCLFlBQXZCLEVBQXFDO0FBQ25DLE1BQU0sT0FBTyxJQUFiO0FBQ0EsTUFBTSxZQUFZLGFBQWEsU0FBYixJQUEwQixLQUFLLE9BQWpEO0FBQ0EsTUFBSSxXQUFXLEVBQWY7QUFDQSxRQUFNLEdBQU4sRUFBVyxZQUFYLEVBQ0MsSUFERCxDQUNNLGVBQU87QUFDWCxhQUFTLE1BQVQsR0FBa0IsSUFBSSxNQUF0QjtBQUNBLGFBQVMsRUFBVCxHQUFjLElBQUksRUFBbEI7QUFDQSxRQUFHLENBQUMsb0JBQW9CLElBQXBCLENBQXlCLElBQUksT0FBSixDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBekIsQ0FBSixFQUErRDtBQUM3RCxhQUFPLElBQUksSUFBSixFQUFQO0FBQ0Q7QUFDRCxXQUFPLElBQUksSUFBSixFQUFQO0FBQ0QsR0FSRCxFQVNDLElBVEQsQ0FTTSxnQkFBUTtBQUNaLFFBQUcsQ0FBQyxTQUFTLEVBQWIsRUFBaUI7QUFDZixZQUFNLElBQU47QUFDRDtBQUNELFFBQUcsYUFBYSxRQUFoQixFQUEwQjtBQUN4QixXQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLGFBQWEsUUFBOUIsRUFBeUMsSUFBekM7QUFDRCxLQUZELE1BRU87QUFDTCx3QkFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixJQUExQjtBQUNBLFVBQUcsT0FBTyxhQUFhLFNBQXBCLEtBQWtDLFVBQXJDLEVBQWlEO0FBQy9DLHFCQUFhLFNBQWIsQ0FBdUIsSUFBdkI7QUFDRDtBQUNGO0FBQ0YsR0FyQkQsRUFzQkMsS0F0QkQsQ0FzQk8sZUFBTztBQUNaLHNCQUFRLE1BQVIsQ0FBZSxhQUFhLFVBQTVCLEVBQXdDLEdBQXhDO0FBQ0QsR0F4QkQ7QUF5QkQ7O0lBRW9CLEs7QUFDbkIsaUJBQVksSUFBWixFQUFrQixZQUFsQixFQUFnQztBQUFBOztBQUM5QixRQUFHLENBQUMsSUFBSixFQUFVO0FBQ1IsWUFBTSxJQUFJLEtBQUosQ0FBVSxrREFBVixDQUFOO0FBQ0Q7QUFDRCxRQUFNLE9BQU8sSUFBYjtBQUNBLFNBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUssS0FBTCxHQUFhLGdCQUFnQixFQUE3QjtBQUNBLFNBQUssT0FBTCxHQUFlLENBQUMsS0FBSyxHQUFMLEtBQWEsS0FBSyxJQUFMLENBQVUsS0FBSyxNQUFMLEtBQWdCLElBQTFCLENBQWQsRUFBK0MsUUFBL0MsQ0FBd0QsRUFBeEQsQ0FBZjtBQUNBLFNBQUssWUFBTCxHQUFvQixFQUFwQjtBQUNBLFNBQUssS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBSyxPQUFMLEdBQWU7QUFDYixTQURhLGVBQ1QsUUFEUyxFQUNDO0FBQ1osWUFBSSxhQUFhLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBakI7QUFDQSxZQUFNLGFBQWdCLEtBQUssU0FBckIsU0FBa0MsUUFBeEM7O0FBRUEsWUFBRyxDQUFDLFVBQUosRUFBZ0I7QUFDZCxjQUFJO0FBQ0YseUJBQWEsS0FBSyxLQUFMLENBQVcsYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQVgsQ0FBYjtBQUNELFdBRkQsQ0FFRSxPQUFPLENBQVAsRUFBVTtBQUNWLHlCQUFhLGFBQWEsT0FBYixDQUFxQixVQUFyQixDQUFiO0FBQ0Q7QUFDRjs7QUFFRCxZQUFHLENBQUMsVUFBSixFQUFnQjtBQUNkLGNBQUk7QUFDRix5QkFBYSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsVUFBdkIsQ0FBWCxDQUFiO0FBQ0QsV0FGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVO0FBQ1YseUJBQWEsYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQWI7QUFDRDtBQUNGOztBQUVELGVBQU8sVUFBUDtBQUNELE9BdEJZO0FBdUJiLFlBdkJhLG9CQXVCSjtBQUNQLGVBQU8sS0FBSyxLQUFaO0FBQ0QsT0F6Qlk7QUEwQmIsU0ExQmEsZUEwQlQsUUExQlMsRUEwQkMsS0ExQkQsRUEwQm9DO0FBQUEsWUFBNUIsVUFBNEIseURBQWYsSUFBZTtBQUFBLFlBQVQsT0FBUzs7QUFDL0MsYUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixLQUF2QjtBQUNBLFlBQU0sYUFBZ0IsS0FBSyxTQUFyQixTQUFrQyxRQUF4QztBQUNBLFlBQUcsWUFBWSxJQUFmLEVBQXFCO0FBQ25CLHVCQUFhLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMsS0FBakM7QUFDRCxTQUZELE1BRU8sSUFBRyxZQUFZLFNBQWYsRUFBMEI7QUFDL0IsdUJBQWEsVUFBYixDQUF3QixVQUF4QjtBQUNBLHlCQUFlLE9BQWYsQ0FBdUIsVUFBdkIsRUFBbUMsS0FBbkM7QUFDRDtBQUNELFlBQUcsZUFBZSxJQUFsQixFQUF3QjtBQUN0Qiw0QkFBUSxNQUFSLENBQWUsS0FBSyxPQUFwQixFQUE2QixRQUE3QjtBQUNEO0FBQ0Y7QUF0Q1ksS0FBZjtBQXdDQSxTQUFLLEdBQUwsR0FBVyxLQUFLLE9BQUwsQ0FBYSxHQUF4QjtBQUNBLFNBQUssR0FBTCxHQUFXLEtBQUssT0FBTCxDQUFhLEdBQXhCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBSyxPQUFMLENBQWEsTUFBM0I7QUFDRDs7OztxQ0FFZ0IsUSxFQUFVO0FBQ3pCLHdCQUFRLFFBQVIsQ0FBb0IsS0FBSyxPQUF6QixhQUEwQyxRQUExQztBQUNEOzs7Z0NBRVcsUSxFQUFVO0FBQ3BCLHdCQUFRLFFBQVIsQ0FBaUIsS0FBSyxPQUF0QixFQUErQixRQUEvQjtBQUNEOzs7OEJBRVMsVSxFQUFZLE0sRUFBMEI7QUFBQSxVQUFsQixTQUFrQix5REFBTixJQUFNOztBQUM5QyxVQUFNLE9BQU8sSUFBYjtBQUNBLFVBQUcsT0FBTyxNQUFQLEtBQWtCLFVBQXJCLEVBQWlDO0FBQy9CLGVBQU8sUUFBUSxLQUFSLENBQWMsbUVBQWQsQ0FBUDtBQUNEO0FBQ0QsV0FBSyxPQUFMLENBQWEsVUFBYixJQUEyQixZQUFhO0FBQUEsMENBQVQsSUFBUztBQUFULGNBQVM7QUFBQTs7QUFDdEMsZUFBTyxLQUFQLENBQWEsSUFBYixFQUFtQixJQUFuQjtBQUNBLFlBQUcsY0FBYyxJQUFqQixFQUF1QjtBQUNyQiw0QkFBUSxNQUFSLENBQWUsS0FBSyxPQUFwQjtBQUNEO0FBQ0YsT0FMRDtBQU1EOzs7NkJBRVEsSyxFQUFPO0FBQUE7O0FBQ2QsVUFBTSxPQUFPLElBQWI7QUFDQSxXQUFLLE1BQUwsQ0FBWSxLQUFaLElBQXFCO0FBQ25CLGtCQUFVLHNCQUFNO0FBQ2QsZ0JBQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsS0FBbkIsR0FBMkIsR0FBRyxNQUFILENBQVUsS0FBckM7QUFDQSw0QkFBUSxNQUFSLENBQWUsS0FBSyxPQUFwQixFQUE2QixLQUE3QjtBQUNELFNBSmtCO0FBS25CLGVBQU87QUFMWSxPQUFyQjtBQU9EOzs7dUNBRWtCLFUsRUFBWTtBQUM3QixVQUFNLFNBQVMsRUFBZjtBQUNBLGlCQUFXLE9BQVgsQ0FBbUIscUJBQWE7QUFDOUIsZUFBTyxTQUFQLElBQW9CO0FBQ2xCLGlCQUFPLEVBRFc7QUFFbEIsaUJBQU8sSUFGVztBQUdsQixvQkFBVSxxQkFBSyxDQUFFO0FBSEMsU0FBcEI7QUFLRCxPQU5EO0FBT0EsYUFBTyxFQUFFLGNBQUYsRUFBVSxVQUFVLHFCQUFLLENBQUUsQ0FBM0IsRUFBUDtBQUNEOzs7NEJBRU8sTyxFQUFTO0FBQUE7O0FBQ2YsVUFBTSxPQUFPLElBQWI7QUFDQSxVQUFHLENBQUMsTUFBTSxPQUFOLENBQWMsUUFBUSxNQUF0QixDQUFKLEVBQW1DO0FBQ2pDLGVBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsbUVBQXJCO0FBQ0Q7QUFDRCxVQUFJLFlBQVksS0FBSyxPQUFyQjs7QUFHQSxXQUFLLEtBQUwsQ0FBVyxRQUFRLElBQW5CLElBQTJCO0FBQ3pCLGVBRHlCLHFCQUNmO0FBQ1IsaUJBQU87QUFDTCxvQkFBUSxLQUFLLE1BRFI7QUFFTCxzQkFBVSxLQUFLO0FBRlYsV0FBUDtBQUlELFNBTndCOztBQU96QixnQkFBUSxFQVBpQjtBQVF6QixrQkFBVSxzQkFBTTtBQUNkLGFBQUcsY0FBSDtBQUNBLGNBQU0sT0FBTyxFQUFiO0FBQ0EsY0FBSSxRQUFRLEtBQVo7QUFDQSxpQkFBTyxJQUFQLENBQVksT0FBSyxLQUFMLENBQVcsUUFBUSxJQUFuQixFQUF5QixNQUFyQyxFQUE2QyxPQUE3QyxDQUFxRCxpQkFBUztBQUM1RCxnQkFBTSxTQUFTLE9BQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBeEM7QUFDQSxnQkFBRyxPQUFPLEtBQVAsRUFBYyxRQUFkLElBQTBCLENBQUMsT0FBTyxLQUFQLEVBQWMsS0FBNUMsRUFBbUQ7QUFDakQscUJBQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFBdUMsS0FBdkMsWUFBc0QsS0FBdEQ7QUFDQSxzQkFBUSxJQUFSO0FBQ0QsYUFIRCxNQUdPO0FBQ0wscUJBQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFBdUMsS0FBdkMsR0FBK0MsSUFBL0M7QUFDRDtBQUNELGlCQUFLLEtBQUwsSUFBYyxPQUFPLEtBQVAsRUFBYyxLQUE1QjtBQUNELFdBVEQ7QUFVQSxjQUFHLFVBQVUsSUFBYixFQUFtQjtBQUNqQixtQkFBTyxrQkFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixRQUFRLElBQWxDLENBQVA7QUFDRDtBQUNELGVBQUssWUFBTCxDQUFrQixlQUFsQixFQUFtQztBQUNqQztBQURpQyxXQUFuQztBQUdEO0FBNUJ3QixPQUEzQjtBQThCQSxjQUFRLE1BQVIsQ0FBZSxPQUFmLENBQXVCLGlCQUFTO0FBQzlCLGVBQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZ0MsTUFBTSxJQUF0QyxJQUE4QztBQUM1QyxpQkFBTyxPQUFPLE1BQU0sT0FBYixLQUF5QixXQUF6QixHQUF1QyxJQUF2QyxHQUE4QyxNQUFNLE9BRGY7QUFFNUMsb0JBQVUsTUFBTSxRQUFOLElBQWtCLEtBRmdCO0FBRzVDLGlCQUFPLElBSHFDO0FBSTVDLG9CQUFVLHNCQUFNO0FBQ2QsZ0JBQUksUUFBUSxHQUFHLE1BQUgsQ0FBVSxLQUF0QjtBQUNBLGdCQUFHLEdBQUcsTUFBSCxDQUFVLElBQVYsS0FBbUIsVUFBdEIsRUFBa0M7QUFDaEMsc0JBQVEsR0FBRyxNQUFILENBQVUsT0FBbEI7QUFDRDtBQUNELGlCQUFLLEtBQUwsQ0FBVyxRQUFRLElBQW5CLEVBQXlCLE1BQXpCLENBQWdDLE1BQU0sSUFBdEMsRUFBNEMsS0FBNUMsR0FBb0QsS0FBcEQ7QUFDQSw4QkFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixLQUExQjtBQUNEO0FBWDJDLFNBQTlDO0FBYUQsT0FkRDs7QUFnQkEsVUFBRyxPQUFPLFFBQVEsUUFBZixLQUE0QixVQUEvQixFQUEyQztBQUN6QyxvQkFBZSxLQUFLLE9BQXBCO0FBQ0EsMEJBQVEsUUFBUixDQUFpQixTQUFqQixFQUE0QixRQUFRLFFBQXBDO0FBQ0EsMEJBQVEsUUFBUixDQUFvQixTQUFwQixhQUF1QyxRQUFRLFFBQS9DO0FBQ0Q7QUFDRCxVQUFNLHFCQUF3QixTQUF4QixnQkFBTjtBQUNBLFVBQUcsT0FBTyxRQUFRLGFBQWYsS0FBaUMsVUFBcEMsRUFBZ0Q7QUFDOUMsMEJBQVEsUUFBUixDQUFpQixTQUFqQixFQUE0QixRQUFRLFFBQXBDO0FBQ0EsMEJBQVEsUUFBUixDQUFpQixrQkFBakIsRUFBcUMsUUFBUSxhQUE3QztBQUNEOztBQUVELFVBQU0sWUFBWSxVQUFTLElBQVQsRUFBZSxHQUFmLEVBQW9CO0FBQ3BDLDBCQUFRLFVBQVIsQ0FBbUIsU0FBbkI7QUFDQSxnQkFBUSxTQUFSLENBQWtCLEdBQWxCO0FBQ0EsYUFBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixFQUFuQjtBQUNELE9BSmlCLENBSWhCLElBSmdCLENBSVgsSUFKVyxFQUlMLFFBQVEsSUFKSCxDQUFsQjs7QUFNQSxVQUFNLGtCQUFxQixRQUFRLElBQTdCLFVBQU47QUFDQSxXQUFLLGNBQUwsQ0FBb0IsZUFBcEIsRUFBcUM7QUFDbkMsYUFBSyxRQUFRLEdBRHNCO0FBRW5DLGdCQUFRLE1BRjJCLEVBRW5CLG9CQUZtQjtBQUduQyxvQkFBWSxrQkFIdUI7QUFJbkMsbUJBQVc7QUFKd0IsT0FBckM7QUFNRDs7O21DQUVjLFUsRUFBWSxPLEVBQVM7QUFDbEMsVUFBTSxPQUFPLElBQWI7QUFDQSxVQUFNLFNBQVMsUUFBUSxNQUFSLENBQWUsV0FBZixFQUFmO0FBQ0EsV0FBSyxZQUFMLENBQWtCLFVBQWxCLElBQWdDLFVBQUMsT0FBRCxFQUFhO0FBQzNDLFlBQU0sZUFBZTtBQUNuQixrQkFBUSxRQUFRLE1BQVIsSUFBa0IsS0FEUDtBQUVuQixtQkFBUyxFQUFFLGdCQUFnQixrQkFBbEIsRUFGVTtBQUduQixxQkFBVyxRQUFRLFNBQVIsSUFBcUIsS0FBSyxPQUhsQjtBQUluQixzQkFBWSxRQUFRLFVBQVIsSUFBeUIsS0FBSyxPQUE5QixXQUpPO0FBS25CLHVCQUFhLGFBTE07QUFNbkIscUJBQVcsUUFBUTtBQU5BLFNBQXJCO0FBUUEsWUFBRyxXQUFXLFFBQVEsSUFBdEIsRUFBNEI7QUFDMUIsdUJBQWEsSUFBYixHQUFvQixLQUFLLFNBQUwsQ0FBZSxRQUFRLElBQXZCLENBQXBCO0FBQ0Q7QUFDRCxpQkFBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCLE9BQXZCLEVBQWdDO0FBQzlCLGNBQUcsQ0FBQyxPQUFKLEVBQWEsT0FBTyxHQUFQO0FBQ2IsaUJBQU8sSUFBUCxDQUFZLE9BQVosRUFBcUIsT0FBckIsQ0FBNkIsa0JBQVU7QUFDckMsa0JBQU0sSUFBSSxPQUFKLENBQVksTUFBWixFQUFvQixRQUFRLE1BQVIsQ0FBcEIsQ0FBTjtBQUNELFdBRkQ7QUFHQSxpQkFBTyxHQUFQO0FBQ0Q7O0FBRUQsWUFBTSxVQUFVLFdBQVcsUUFBUSxPQUFuQztBQUNBLFlBQU0sTUFBTSxTQUFTLFFBQVEsR0FBakIsRUFBc0IsT0FBdEIsQ0FBWjtBQUNBLGlCQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLEdBQXBCLEVBQXlCLFlBQXpCO0FBQ0QsT0F2QkQ7QUF3QkQ7Ozs7OztrQkFoTmtCLEs7Ozs7O0FDbkNyQjs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxVQUFXLFlBQU07QUFDckIsTUFBTSxVQUFVLDBCQUFoQjs7QUFFQSxNQUFNLFlBQVk7QUFDaEIsYUFBUztBQURPLEdBQWxCOztBQUlBLE1BQU0sYUFBYSxTQUFiLFVBQWEsWUFBYTtBQUM5QixXQUFPLFVBQVUsU0FBVixDQUFQO0FBQ0QsR0FGRDs7QUFJQSxNQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBcUI7QUFDcEMsUUFBSSxZQUFZLFNBQWhCO0FBQ0EsUUFBSSxPQUFPLEtBQVAsS0FBaUIsVUFBckIsRUFBaUM7QUFDL0IsaUJBQVcsS0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU8sS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUNwQyxrQkFBWSxLQUFaO0FBQ0Q7QUFDRCxRQUFJLE9BQU8sVUFBVSxTQUFWLENBQVAsS0FBZ0MsV0FBcEMsRUFBaUQ7QUFDL0MsZ0JBQVUsU0FBVixJQUF1QixFQUF2QjtBQUNEO0FBQ0QsY0FBVSxTQUFWLEVBQXFCLElBQXJCLENBQTBCLFFBQTFCO0FBQ0EsWUFBUSxFQUFSLENBQVcsU0FBWCxFQUFzQixVQUFDLElBQUQsRUFBVTtBQUM5QixzQkFBTSxJQUFOLENBQVcsVUFBVSxTQUFWLENBQVgsRUFBaUMsVUFBQyxRQUFELEVBQWM7QUFDN0MsaUJBQVMsSUFBVDtBQUNELE9BRkQ7QUFHRCxLQUpEO0FBS0QsR0FoQkQ7O0FBa0JBLE1BQU0sVUFBVSxTQUFWLE9BQVUsR0FBTTtBQUNwQixvQkFBTSxJQUFOLENBQVcsVUFBVSxPQUFyQixFQUE4QixVQUFDLFFBQUQsRUFBYztBQUMxQztBQUNELEtBRkQ7QUFHRCxHQUpEOztBQU1BLFVBQVEsRUFBUixDQUFXLFFBQVgsRUFBcUIsT0FBckI7O0FBRUEsTUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCO0FBQzlCLFFBQUksQ0FBQyxLQUFMLEVBQVk7QUFDVixjQUFRLFFBQVI7QUFDRDs7QUFFRCxZQUFRLElBQVIsQ0FBYSxLQUFiLEVBQW9CLElBQXBCO0FBQ0QsR0FORDs7QUFRQSxTQUFPO0FBQ0wsY0FBVSxRQURMO0FBRUwsZ0JBQVksVUFGUDtBQUdMLFlBQVE7QUFISCxHQUFQO0FBS0QsQ0FsRGUsRUFBaEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgICAoZmFjdG9yeSgoZ2xvYmFsLmFzeW5jID0gZ2xvYmFsLmFzeW5jIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gICAgICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgICAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuICAgICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gICAgICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICAgICAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3Qoe30pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdChudWxsKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIHZhciBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0Z1bmN0aW9uKF8pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgICAgIC8vIGluIFNhZmFyaSA4IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCB3ZWFrIG1hcCBjb25zdHJ1Y3RvcnMsXG4gICAgICAvLyBhbmQgUGhhbnRvbUpTIDEuOSB3aGljaCByZXR1cm5zICdmdW5jdGlvbicgZm9yIGBOb2RlTGlzdGAgaW5zdGFuY2VzLlxuICAgICAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gICAgICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAgICAgKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gICAgICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG4gICAgfVxuXG4gICAgLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kMSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gICAgICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gICAgICogb2YgdmFsdWVzLlxuICAgICAqL1xuICAgIHZhciBvYmplY3RUb1N0cmluZyQxID0gb2JqZWN0UHJvdG8kMS50b1N0cmluZztcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAgICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgICAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZyQxLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG4gICAgdmFyIE5BTiA9IDAgLyAwO1xuXG4gICAgLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbiAgICB2YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbiAgICAvKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xuICAgIHZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbiAgICAvKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG4gICAgdmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbiAgICAvKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbiAgICB2YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuICAgIC8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG4gICAgdmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8udG9OdW1iZXIoMy4yKTtcbiAgICAgKiAvLyA9PiAzLjJcbiAgICAgKlxuICAgICAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAgICogLy8gPT4gNWUtMzI0XG4gICAgICpcbiAgICAgKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAgICAgKiAvLyA9PiBJbmZpbml0eVxuICAgICAqXG4gICAgICogXy50b051bWJlcignMy4yJyk7XG4gICAgICogLy8gPT4gMy4yXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gTkFOO1xuICAgICAgfVxuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB2YXIgb3RoZXIgPSBpc0Z1bmN0aW9uKHZhbHVlLnZhbHVlT2YpID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICAgICAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgICAgIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgICAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICAgICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIElORklOSVRZID0gMSAvIDA7XG4gICAgdmFyIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDg7XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4xMi4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBudW1iZXIuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8udG9GaW5pdGUoMy4yKTtcbiAgICAgKiAvLyA9PiAzLjJcbiAgICAgKlxuICAgICAqIF8udG9GaW5pdGUoTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAgICogLy8gPT4gNWUtMzI0XG4gICAgICpcbiAgICAgKiBfLnRvRmluaXRlKEluZmluaXR5KTtcbiAgICAgKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICAgICAqXG4gICAgICogXy50b0Zpbml0ZSgnMy4yJyk7XG4gICAgICogLy8gPT4gMy4yXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9GaW5pdGUodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gICAgICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICAgICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICAgICAgcmV0dXJuIHNpZ24gKiBNQVhfSU5URUdFUjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA6IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAgICAgKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2ludGVnZXIpLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLnRvSW50ZWdlcigzLjIpO1xuICAgICAqIC8vID0+IDNcbiAgICAgKlxuICAgICAqIF8udG9JbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICAgICAqIC8vID0+IDBcbiAgICAgKlxuICAgICAqIF8udG9JbnRlZ2VyKEluZmluaXR5KTtcbiAgICAgKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICAgICAqXG4gICAgICogXy50b0ludGVnZXIoJzMuMicpO1xuICAgICAqIC8vID0+IDNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0b0Zpbml0ZSh2YWx1ZSksXG4gICAgICAgICAgcmVtYWluZGVyID0gcmVzdWx0ICUgMTtcblxuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlbWFpbmRlciA/IHJlc3VsdCAtIHJlbWFpbmRlciA6IHJlc3VsdCkgOiAwO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG4gICAgdmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuICAgIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbiAgICB2YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAgICAgKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXNcbiAgICAgKiBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvbiB0aGVcbiAgICAgKiBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vbWRuLmlvL3Jlc3RfcGFyYW1ldGVycykuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIHNheSA9IF8ucmVzdChmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICAgICAqICAgcmV0dXJuIHdoYXQgKyAnICcgKyBfLmluaXRpYWwobmFtZXMpLmpvaW4oJywgJykgK1xuICAgICAqICAgICAoXy5zaXplKG5hbWVzKSA+IDEgPyAnLCAmICcgOiAnJykgKyBfLmxhc3QobmFtZXMpO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogc2F5KCdoZWxsbycsICdmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJyk7XG4gICAgICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc3QoZnVuYywgc3RhcnQpIHtcbiAgICAgIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgICAgIH1cbiAgICAgIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHRvSW50ZWdlcihzdGFydCksIDApO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJyYXkpO1xuICAgICAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcnJheSk7XG4gICAgICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsUGFyYW1zIChmbikge1xuICAgICAgICByZXR1cm4gcmVzdChmdW5jdGlvbiAoYXJncyAvKi4uLiwgY2FsbGJhY2sqLykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgYXJncywgY2FsbGJhY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseUVhY2gkMShlYWNoZm4pIHtcbiAgICAgICAgcmV0dXJuIHJlc3QoZnVuY3Rpb24gKGZucywgYXJncykge1xuICAgICAgICAgICAgdmFyIGdvID0gaW5pdGlhbFBhcmFtcyhmdW5jdGlvbiAoYXJncywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVhY2hmbihmbnMsIGZ1bmN0aW9uIChmbiwgY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncy5jb25jYXQoW2NiXSkpO1xuICAgICAgICAgICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ287XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgbWV0aG9kIHRoYXQgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAyLjMuMFxuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAgICAgKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gICAgICovXG4gICAgZnVuY3Rpb24gbm9vcCgpIHtcbiAgICAgIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25jZShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGZuID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgY2FsbEZuID0gZm47XG4gICAgICAgICAgICBmbiA9IG51bGw7XG4gICAgICAgICAgICBjYWxsRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhXG4gICAgICogW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpIHRoYXQgYWZmZWN0c1xuICAgICAqIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICAgICAqL1xuICAgIHZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4gICAgLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG4gICAgdmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAgICAgKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCxcbiAgICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLmlzTGVuZ3RoKDMpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmlzTGVuZ3RoKCczJyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgICAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICAgICAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAgICAgKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG5cbiAgICBmdW5jdGlvbiBnZXRJdGVyYXRvciAoY29sbCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JTeW1ib2wgJiYgY29sbFtpdGVyYXRvclN5bWJvbF0gJiYgY29sbFtpdGVyYXRvclN5bWJvbF0oKTtcbiAgICB9XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG4gICAgdmFyIG5hdGl2ZUdldFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGBbW1Byb3RvdHlwZV1dYCBvZiBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgdGhlIGBbW1Byb3RvdHlwZV1dYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRQcm90b3R5cGUodmFsdWUpIHtcbiAgICAgIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGUoT2JqZWN0KHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQyID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvJDIuaGFzT3duUHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSGFzKG9iamVjdCwga2V5KSB7XG4gICAgICAvLyBBdm9pZCBhIGJ1ZyBpbiBJRSAxMC0xMSB3aGVyZSBvYmplY3RzIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIGBudWxsYCxcbiAgICAgIC8vIHRoYXQgYXJlIGNvbXBvc2VkIGVudGlyZWx5IG9mIGluZGV4IHByb3BlcnRpZXMsIHJldHVybiBgZmFsc2VgIGZvclxuICAgICAgLy8gYGhhc093blByb3BlcnR5YCBjaGVja3Mgb2YgdGhlbS5cbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJlxuICAgICAgICAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgfHxcbiAgICAgICAgICAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJiBrZXkgaW4gb2JqZWN0ICYmIGdldFByb3RvdHlwZShvYmplY3QpID09PSBudWxsKSk7XG4gICAgfVxuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xuICAgIHZhciBuYXRpdmVLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHNraXAgdGhlIGNvbnN0cnVjdG9yXG4gICAgICogcHJvcGVydHkgb2YgcHJvdG90eXBlcyBvciB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgICAgIHJldHVybiBuYXRpdmVLZXlzKE9iamVjdChvYmplY3QpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gICAgICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAgICAgKiBpcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQzID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQxID0gb2JqZWN0UHJvdG8kMy5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDIgPSBvYmplY3RQcm90byQzLnRvU3RyaW5nO1xuXG4gICAgLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8kMy5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgICAgIC8vIFNhZmFyaSA4LjEgaW5jb3JyZWN0bHkgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gICAgICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5JDEuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nJDIuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5KCdhYmMnKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5KF8ubm9vcCk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbiAgICAvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG4gICAgdmFyIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ0ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDMgPSBvYmplY3RQcm90byQ0LnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNTdHJpbmcoMSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmckMy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgaW5kZXgga2V5cyBmb3IgYG9iamVjdGAgdmFsdWVzIG9mIGFycmF5cyxcbiAgICAgKiBgYXJndW1lbnRzYCBvYmplY3RzLCBhbmQgc3RyaW5ncywgb3RoZXJ3aXNlIGBudWxsYCBpcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBSZXR1cm5zIGluZGV4IGtleXMsIGVsc2UgYG51bGxgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluZGV4S2V5cyhvYmplY3QpIHtcbiAgICAgIHZhciBsZW5ndGggPSBvYmplY3QgPyBvYmplY3QubGVuZ3RoIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAgICAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzU3RyaW5nKG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VUaW1lcyhsZW5ndGgsIFN0cmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbiAgICB2YXIgTUFYX1NBRkVfSU5URUdFUiQxID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbiAgICB2YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSJDEgOiBsZW5ndGg7XG4gICAgICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAgICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kNSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gICAgICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvJDU7XG5cbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICAgICAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3Qua2V5cylcbiAgICAgKiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBGb28oKSB7XG4gICAgICogICB0aGlzLmEgPSAxO1xuICAgICAqICAgdGhpcy5iID0gMjtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICAgICAqXG4gICAgICogXy5rZXlzKG5ldyBGb28pO1xuICAgICAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICAgKlxuICAgICAqIF8ua2V5cygnaGknKTtcbiAgICAgKiAvLyA9PiBbJzAnLCAnMSddXG4gICAgICovXG4gICAgZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgICAgIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KTtcbiAgICAgIGlmICghKGlzUHJvdG8gfHwgaXNBcnJheUxpa2Uob2JqZWN0KSkpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VLZXlzKG9iamVjdCk7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXhlcyA9IGluZGV4S2V5cyhvYmplY3QpLFxuICAgICAgICAgIHNraXBJbmRleGVzID0gISFpbmRleGVzLFxuICAgICAgICAgIHJlc3VsdCA9IGluZGV4ZXMgfHwgW10sXG4gICAgICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAoYmFzZUhhcyhvYmplY3QsIGtleSkgJiZcbiAgICAgICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpICYmXG4gICAgICAgICAgICAhKGlzUHJvdG8gJiYga2V5ID09ICdjb25zdHJ1Y3RvcicpKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpdGVyYXRvcihjb2xsKSB7XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHZhciBsZW47XG4gICAgICAgIGlmIChpc0FycmF5TGlrZShjb2xsKSkge1xuICAgICAgICAgICAgbGVuID0gY29sbC5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPCBsZW4gPyB7IHZhbHVlOiBjb2xsW2ldLCBrZXk6IGkgfSA6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdGUgPSBnZXRJdGVyYXRvcihjb2xsKTtcbiAgICAgICAgaWYgKGl0ZXJhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaXRlcmF0ZS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZG9uZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBpdGVtLnZhbHVlLCBrZXk6IGkgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2tleXMgPSBrZXlzKGNvbGwpO1xuICAgICAgICBsZW4gPSBva2V5cy5sZW5ndGg7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgdmFyIGtleSA9IG9rZXlzW2ldO1xuICAgICAgICAgICAgcmV0dXJuIGkgPCBsZW4gPyB7IHZhbHVlOiBjb2xsW2tleV0sIGtleToga2V5IH0gOiBudWxsO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ubHlPbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZm4gPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIHdhcyBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICAgICAgICB2YXIgY2FsbEZuID0gZm47XG4gICAgICAgICAgICBmbiA9IG51bGw7XG4gICAgICAgICAgICBjYWxsRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZWFjaE9mTGltaXQobGltaXQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICAgICAgb2JqID0gb2JqIHx8IFtdO1xuICAgICAgICAgICAgdmFyIG5leHRFbGVtID0gaXRlcmF0b3Iob2JqKTtcbiAgICAgICAgICAgIGlmIChsaW1pdCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBydW5uaW5nID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvcmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiByZXBsZW5pc2goKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUgJiYgcnVubmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAocnVubmluZyA8IGxpbWl0ICYmICFlcnJvcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gbmV4dEVsZW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZWUoZWxlbS52YWx1ZSwgZWxlbS5rZXksIG9ubHlPbmNlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmcgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBsZW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9QYXJhbGxlbExpbWl0KGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBsaW1pdCwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oX2VhY2hPZkxpbWl0KGxpbWl0KSwgb2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hc3luY01hcChlYWNoZm4sIGFyciwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgYXJyID0gYXJyIHx8IFtdO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHZhbHVlLCBfLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gY291bnRlcisrO1xuICAgICAgICAgICAgaXRlcmF0ZWUodmFsdWUsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHY7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgbWFwYCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIG1hcExpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cmFuc2Zvcm1lZClgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogb25jZSBpdCBoYXMgY29tcGxldGVkIHdpdGggYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhIHRyYW5zZm9ybWVkXG4gICAgICogaXRlbS4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIGFuIGFycmF5IG9mIHRoZVxuICAgICAqIHRyYW5zZm9ybWVkIGl0ZW1zIGZyb20gdGhlIGBjb2xsYC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqL1xuICAgIHZhciBtYXBMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfYXN5bmNNYXApO1xuXG4gICAgZnVuY3Rpb24gZG9MaW1pdChmbiwgbGltaXQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVyYWJsZSwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oaXRlcmFibGUsIGxpbWl0LCBpdGVyYXRlZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2R1Y2VzIGEgbmV3IGNvbGxlY3Rpb24gb2YgdmFsdWVzIGJ5IG1hcHBpbmcgZWFjaCB2YWx1ZSBpbiBgY29sbGAgdGhyb3VnaFxuICAgICAqIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9uLiBUaGUgYGl0ZXJhdGVlYCBpcyBjYWxsZWQgd2l0aCBhbiBpdGVtIGZyb20gYGNvbGxgXG4gICAgICogYW5kIGEgY2FsbGJhY2sgZm9yIHdoZW4gaXQgaGFzIGZpbmlzaGVkIHByb2Nlc3NpbmcuIEVhY2ggb2YgdGhlc2UgY2FsbGJhY2tcbiAgICAgKiB0YWtlcyAyIGFyZ3VtZW50czogYW4gYGVycm9yYCwgYW5kIHRoZSB0cmFuc2Zvcm1lZCBpdGVtIGZyb20gYGNvbGxgLiBJZlxuICAgICAqIGBpdGVyYXRlZWAgcGFzc2VzIGFuIGVycm9yIHRvIGl0cyBjYWxsYmFjaywgdGhlIG1haW4gYGNhbGxiYWNrYCAoZm9yIHRoZVxuICAgICAqIGBtYXBgIGZ1bmN0aW9uKSBpcyBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGUgZXJyb3IuXG4gICAgICpcbiAgICAgKiBOb3RlLCB0aGF0IHNpbmNlIHRoaXMgZnVuY3Rpb24gYXBwbGllcyB0aGUgYGl0ZXJhdGVlYCB0byBlYWNoIGl0ZW0gaW5cbiAgICAgKiBwYXJhbGxlbCwgdGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb25zIHdpbGwgY29tcGxldGVcbiAgICAgKiBpbiBvcmRlci4gSG93ZXZlciwgdGhlIHJlc3VsdHMgYXJyYXkgd2lsbCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbiAgICAgKiBvcmlnaW5hbCBgY29sbGAuXG4gICAgICpcbiAgICAgKiBJZiBgbWFwYCBpcyBwYXNzZWQgYW4gT2JqZWN0LCB0aGUgcmVzdWx0cyB3aWxsIGJlIGFuIEFycmF5LiAgVGhlIHJlc3VsdHNcbiAgICAgKiB3aWxsIHJvdWdobHkgYmUgaW4gdGhlIG9yZGVyIG9mIHRoZSBvcmlnaW5hbCBPYmplY3RzJyBrZXlzIChidXQgdGhpcyBjYW5cbiAgICAgKiB2YXJ5IGFjcm9zcyBKYXZhU2NyaXB0IGVuZ2luZXMpXG4gICAgICpcbiAgICAgKiBAbmFtZSBtYXBcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFcbiAgICAgKiB0cmFuc2Zvcm1lZCBpdGVtLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgYW4gQXJyYXkgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgaXRlbXMgZnJvbSB0aGUgYGNvbGxgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLm1hcChbJ2ZpbGUxJywnZmlsZTInLCdmaWxlMyddLCBmcy5zdGF0LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBpcyBub3cgYW4gYXJyYXkgb2Ygc3RhdHMgZm9yIGVhY2ggZmlsZVxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBtYXAgPSBkb0xpbWl0KG1hcExpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgdG8gZWFjaCBmdW5jdGlvbiBpbiB0aGUgYXJyYXksIGNhbGxpbmdcbiAgICAgKiBgY2FsbGJhY2tgIGFmdGVyIGFsbCBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQuIElmIHlvdSBvbmx5IHByb3ZpZGUgdGhlIGZpcnN0XG4gICAgICogYXJndW1lbnQsIHRoZW4gaXQgd2lsbCByZXR1cm4gYSBmdW5jdGlvbiB3aGljaCBsZXRzIHlvdSBwYXNzIGluIHRoZVxuICAgICAqIGFyZ3VtZW50cyBhcyBpZiBpdCB3ZXJlIGEgc2luZ2xlIGZ1bmN0aW9uIGNhbGwuXG4gICAgICpcbiAgICAgKiBAbmFtZSBhcHBseUVhY2hcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBmbnMgLSBBIGNvbGxlY3Rpb24gb2YgYXN5bmNocm9ub3VzIGZ1bmN0aW9ucyB0byBhbGxcbiAgICAgKiBjYWxsIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBhbnkgbnVtYmVyIG9mIHNlcGFyYXRlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZVxuICAgICAqIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSB0aGUgZmluYWwgYXJndW1lbnQgc2hvdWxkIGJlIHRoZSBjYWxsYmFjayxcbiAgICAgKiBjYWxsZWQgd2hlbiBhbGwgZnVuY3Rpb25zIGhhdmUgY29tcGxldGVkIHByb2Nlc3NpbmcuXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSAtIElmIG9ubHkgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBpdCB3aWxsIHJldHVyblxuICAgICAqIGEgZnVuY3Rpb24gd2hpY2ggbGV0cyB5b3UgcGFzcyBpbiB0aGUgYXJndW1lbnRzIGFzIGlmIGl0IHdlcmUgYSBzaW5nbGVcbiAgICAgKiBmdW5jdGlvbiBjYWxsLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5hcHBseUVhY2goW2VuYWJsZVNlYXJjaCwgdXBkYXRlU2NoZW1hXSwgJ2J1Y2tldCcsIGNhbGxiYWNrKTtcbiAgICAgKlxuICAgICAqIC8vIHBhcnRpYWwgYXBwbGljYXRpb24gZXhhbXBsZTpcbiAgICAgKiBhc3luYy5lYWNoKFxuICAgICAqICAgICBidWNrZXRzLFxuICAgICAqICAgICBhc3luYy5hcHBseUVhY2goW2VuYWJsZVNlYXJjaCwgdXBkYXRlU2NoZW1hXSksXG4gICAgICogICAgIGNhbGxiYWNrXG4gICAgICogKTtcbiAgICAgKi9cbiAgICB2YXIgYXBwbHlFYWNoID0gYXBwbHlFYWNoJDEobWFwKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBtYXBgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIG1hcFNlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLm1hcFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cmFuc2Zvcm1lZClgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogb25jZSBpdCBoYXMgY29tcGxldGVkIHdpdGggYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhXG4gICAgICogdHJhbnNmb3JtZWQgaXRlbS4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIGFuIGFycmF5IG9mIHRoZVxuICAgICAqIHRyYW5zZm9ybWVkIGl0ZW1zIGZyb20gdGhlIGBjb2xsYC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqL1xuICAgIHZhciBtYXBTZXJpZXMgPSBkb0xpbWl0KG1hcExpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBhcHBseUVhY2hgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGFwcGx5RWFjaFNlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmFwcGx5RWFjaFxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gZm5zIC0gQSBjb2xsZWN0aW9uIG9mIGFzeW5jaHJvbm91cyBmdW5jdGlvbnMgdG8gYWxsXG4gICAgICogY2FsbCB3aXRoIHRoZSBzYW1lIGFyZ3VtZW50c1xuICAgICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIC0gYW55IG51bWJlciBvZiBzZXBhcmF0ZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGVcbiAgICAgKiBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gdGhlIGZpbmFsIGFyZ3VtZW50IHNob3VsZCBiZSB0aGUgY2FsbGJhY2ssXG4gICAgICogY2FsbGVkIHdoZW4gYWxsIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZCBwcm9jZXNzaW5nLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBJZiBvbmx5IHRoZSBmaXJzdCBhcmd1bWVudCBpcyBwcm92aWRlZCwgaXQgd2lsbCByZXR1cm5cbiAgICAgKiBhIGZ1bmN0aW9uIHdoaWNoIGxldHMgeW91IHBhc3MgaW4gdGhlIGFyZ3VtZW50cyBhcyBpZiBpdCB3ZXJlIGEgc2luZ2xlXG4gICAgICogZnVuY3Rpb24gY2FsbC5cbiAgICAgKi9cbiAgICB2YXIgYXBwbHlFYWNoU2VyaWVzID0gYXBwbHlFYWNoJDEobWFwU2VyaWVzKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb250aW51YXRpb24gZnVuY3Rpb24gd2l0aCBzb21lIGFyZ3VtZW50cyBhbHJlYWR5IGFwcGxpZWQuXG4gICAgICpcbiAgICAgKiBVc2VmdWwgYXMgYSBzaG9ydGhhbmQgd2hlbiBjb21iaW5lZCB3aXRoIG90aGVyIGNvbnRyb2wgZmxvdyBmdW5jdGlvbnMuIEFueVxuICAgICAqIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIHJldHVybmVkIGZ1bmN0aW9uIGFyZSBhZGRlZCB0byB0aGUgYXJndW1lbnRzXG4gICAgICogb3JpZ2luYWxseSBwYXNzZWQgdG8gYXBwbHkuXG4gICAgICpcbiAgICAgKiBAbmFtZSBhcHBseVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gVGhlIGZ1bmN0aW9uIHlvdSB3YW50IHRvIGV2ZW50dWFsbHkgYXBwbHkgYWxsXG4gICAgICogYXJndW1lbnRzIHRvLiBJbnZva2VzIHdpdGggKGFyZ3VtZW50cy4uLikuXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmd1bWVudHMuLi4gLSBBbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBhdXRvbWF0aWNhbGx5IGFwcGx5XG4gICAgICogd2hlbiB0aGUgY29udGludWF0aW9uIGlzIGNhbGxlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gdXNpbmcgYXBwbHlcbiAgICAgKiBhc3luYy5wYXJhbGxlbChbXG4gICAgICogICAgIGFzeW5jLmFwcGx5KGZzLndyaXRlRmlsZSwgJ3Rlc3RmaWxlMScsICd0ZXN0MScpLFxuICAgICAqICAgICBhc3luYy5hcHBseShmcy53cml0ZUZpbGUsICd0ZXN0ZmlsZTInLCAndGVzdDInKVxuICAgICAqIF0pO1xuICAgICAqXG4gICAgICpcbiAgICAgKiAvLyB0aGUgc2FtZSBwcm9jZXNzIHdpdGhvdXQgdXNpbmcgYXBwbHlcbiAgICAgKiBhc3luYy5wYXJhbGxlbChbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBmcy53cml0ZUZpbGUoJ3Rlc3RmaWxlMScsICd0ZXN0MScsIGNhbGxiYWNrKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGZzLndyaXRlRmlsZSgndGVzdGZpbGUyJywgJ3Rlc3QyJywgY2FsbGJhY2spO1xuICAgICAqICAgICB9XG4gICAgICogXSk7XG4gICAgICpcbiAgICAgKiAvLyBJdCdzIHBvc3NpYmxlIHRvIHBhc3MgYW55IG51bWJlciBvZiBhZGRpdGlvbmFsIGFyZ3VtZW50cyB3aGVuIGNhbGxpbmcgdGhlXG4gICAgICogLy8gY29udGludWF0aW9uOlxuICAgICAqXG4gICAgICogbm9kZT4gdmFyIGZuID0gYXN5bmMuYXBwbHkoc3lzLnB1dHMsICdvbmUnKTtcbiAgICAgKiBub2RlPiBmbigndHdvJywgJ3RocmVlJyk7XG4gICAgICogb25lXG4gICAgICogdHdvXG4gICAgICogdGhyZWVcbiAgICAgKi9cbiAgICB2YXIgYXBwbHkkMSA9IHJlc3QoZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChjYWxsQXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGNhbGxBcmdzKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGFrZSBhIHN5bmMgZnVuY3Rpb24gYW5kIG1ha2UgaXQgYXN5bmMsIHBhc3NpbmcgaXRzIHJldHVybiB2YWx1ZSB0byBhXG4gICAgICogY2FsbGJhY2suIFRoaXMgaXMgdXNlZnVsIGZvciBwbHVnZ2luZyBzeW5jIGZ1bmN0aW9ucyBpbnRvIGEgd2F0ZXJmYWxsLFxuICAgICAqIHNlcmllcywgb3Igb3RoZXIgYXN5bmMgZnVuY3Rpb25zLiBBbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZ2VuZXJhdGVkXG4gICAgICogZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb24gKGV4Y2VwdCBmb3IgdGhlIGZpbmFsXG4gICAgICogY2FsbGJhY2sgYXJndW1lbnQpLiBFcnJvcnMgdGhyb3duIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIElmIHRoZSBmdW5jdGlvbiBwYXNzZWQgdG8gYGFzeW5jaWZ5YCByZXR1cm5zIGEgUHJvbWlzZSwgdGhhdCBwcm9taXNlcydzXG4gICAgICogcmVzb2x2ZWQvcmVqZWN0ZWQgc3RhdGUgd2lsbCBiZSB1c2VkIHRvIGNhbGwgdGhlIGNhbGxiYWNrLCByYXRoZXIgdGhhbiBzaW1wbHlcbiAgICAgKiB0aGUgc3luY2hyb25vdXMgcmV0dXJuIHZhbHVlLlxuICAgICAqXG4gICAgICogVGhpcyBhbHNvIG1lYW5zIHlvdSBjYW4gYXN5bmNpZnkgRVMyMDE2IGBhc3luY2AgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQG5hbWUgYXN5bmNpZnlcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIHdyYXBTeW5jXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIHN5bmNocm9ub3VzIGZ1bmN0aW9uIHRvIGNvbnZlcnQgdG8gYW5cbiAgICAgKiBhc3luY2hyb25vdXMgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBbiBhc3luY2hyb25vdXMgd3JhcHBlciBvZiB0aGUgYGZ1bmNgLiBUbyBiZSBpbnZva2VkIHdpdGhcbiAgICAgKiAoY2FsbGJhY2spLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBwYXNzaW5nIGEgcmVndWxhciBzeW5jaHJvbm91cyBmdW5jdGlvblxuICAgICAqIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICogICAgIGFzeW5jLmFwcGx5KGZzLnJlYWRGaWxlLCBmaWxlbmFtZSwgXCJ1dGY4XCIpLFxuICAgICAqICAgICBhc3luYy5hc3luY2lmeShKU09OLnBhcnNlKSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGRhdGEsIG5leHQpIHtcbiAgICAgKiAgICAgICAgIC8vIGRhdGEgaXMgdGhlIHJlc3VsdCBvZiBwYXJzaW5nIHRoZSB0ZXh0LlxuICAgICAqICAgICAgICAgLy8gSWYgdGhlcmUgd2FzIGEgcGFyc2luZyBlcnJvciwgaXQgd291bGQgaGF2ZSBiZWVuIGNhdWdodC5cbiAgICAgKiAgICAgfVxuICAgICAqIF0sIGNhbGxiYWNrKTtcbiAgICAgKlxuICAgICAqIC8vIHBhc3NpbmcgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBwcm9taXNlXG4gICAgICogYXN5bmMud2F0ZXJmYWxsKFtcbiAgICAgKiAgICAgYXN5bmMuYXBwbHkoZnMucmVhZEZpbGUsIGZpbGVuYW1lLCBcInV0ZjhcIiksXG4gICAgICogICAgIGFzeW5jLmFzeW5jaWZ5KGZ1bmN0aW9uIChjb250ZW50cykge1xuICAgICAqICAgICAgICAgcmV0dXJuIGRiLm1vZGVsLmNyZWF0ZShjb250ZW50cyk7XG4gICAgICogICAgIH0pLFxuICAgICAqICAgICBmdW5jdGlvbiAobW9kZWwsIG5leHQpIHtcbiAgICAgKiAgICAgICAgIC8vIGBtb2RlbGAgaXMgdGhlIGluc3RhbnRpYXRlZCBtb2RlbCBvYmplY3QuXG4gICAgICogICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYW4gZXJyb3IsIHRoaXMgZnVuY3Rpb24gd291bGQgYmUgc2tpcHBlZC5cbiAgICAgKiAgICAgfVxuICAgICAqIF0sIGNhbGxiYWNrKTtcbiAgICAgKlxuICAgICAqIC8vIGVzNiBleGFtcGxlXG4gICAgICogdmFyIHEgPSBhc3luYy5xdWV1ZShhc3luYy5hc3luY2lmeShhc3luYyBmdW5jdGlvbihmaWxlKSB7XG4gICAgICogICAgIHZhciBpbnRlcm1lZGlhdGVTdGVwID0gYXdhaXQgcHJvY2Vzc0ZpbGUoZmlsZSk7XG4gICAgICogICAgIHJldHVybiBhd2FpdCBzb21lUHJvbWlzZShpbnRlcm1lZGlhdGVTdGVwKVxuICAgICAqIH0pKTtcbiAgICAgKlxuICAgICAqIHEucHVzaChmaWxlcyk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gYXN5bmNpZnkoZnVuYykge1xuICAgICAgICByZXR1cm4gaW5pdGlhbFBhcmFtcyhmdW5jdGlvbiAoYXJncywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgcmVzdWx0IGlzIFByb21pc2Ugb2JqZWN0XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QocmVzdWx0KSAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pWydjYXRjaCddKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLm1lc3NhZ2UgPyBlcnIgOiBuZXcgRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAgICAgKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gICAgICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gICAgICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICAgICAqL1xuICAgIHZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGNsZWFyXG4gICAgICogQG1lbWJlck9mIExpc3RDYWNoZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICAgICAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFcbiAgICAgKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICAgICAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAgICAgKiB2YXIgb3RoZXIgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gICAgICpcbiAgICAgKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmVxKCdhJywgJ2EnKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmVxKE5hTiwgTmFOKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gICAgICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gbGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4gICAgLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGRlbGV0ZVxuICAgICAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgZGF0YS5wb3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBnZXRcbiAgICAgKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gICAgICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBoYXNcbiAgICAgKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgICAgIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgc2V0XG4gICAgICogQG1lbWJlck9mIExpc3RDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuICAgIExpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuICAgIExpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuICAgIExpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuICAgIExpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGNsZWFyXG4gICAgICogQG1lbWJlck9mIFN0YWNrXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgICAgIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZGVsZXRlXG4gICAgICogQG1lbWJlck9mIFN0YWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBnZXRcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBoYXNcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAgICAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgICAgIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGdsb2JhbCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyBgdmFsdWVgIGlmIGl0J3MgYSBnbG9iYWwgb2JqZWN0LCBlbHNlIGBudWxsYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjaGVja0dsb2JhbCh2YWx1ZSkge1xuICAgICAgcmV0dXJuICh2YWx1ZSAmJiB2YWx1ZS5PYmplY3QgPT09IE9iamVjdCkgPyB2YWx1ZSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbiAgICB2YXIgZnJlZUdsb2JhbCA9IGNoZWNrR2xvYmFsKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKTtcblxuICAgIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG4gICAgdmFyIGZyZWVTZWxmID0gY2hlY2tHbG9iYWwodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZik7XG5cbiAgICAvKiogRGV0ZWN0IGB0aGlzYCBhcyB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgICB2YXIgdGhpc0dsb2JhbCA9IGNoZWNrR2xvYmFsKHR5cGVvZiB0aGlzID09ICdvYmplY3QnICYmIHRoaXMpO1xuXG4gICAgLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG4gICAgdmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IHRoaXNHbG9iYWwgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbiAgICB2YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbiAgICB2YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gICAgICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG4gICAgfSgpKTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgICAgIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xuICAgIHZhciBmdW5jVG9TdHJpbmckMSA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICAgICAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmdW5jVG9TdHJpbmckMS5jYWxsKGZ1bmMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gICAgICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1wYXR0ZXJucykuXG4gICAgICovXG4gICAgdmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbiAgICB2YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kNiA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG4gICAgdmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQyID0gb2JqZWN0UHJvdG8kNi5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG4gICAgdmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgICAgIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5JDIpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgICAgIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gICAgICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gICAgICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbiAgICB2YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgY2xlYXJcbiAgICAgKiBAbWVtYmVyT2YgSGFzaFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgICAgIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZGVsZXRlXG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbiAgICB2YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDcgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5JDMgPSBvYmplY3RQcm90byQ3Lmhhc093blByb3BlcnR5O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGdldFxuICAgICAqIEBtZW1iZXJPZiBIYXNoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gICAgICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5JDMuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kOCA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbiAgICB2YXIgaGFzT3duUHJvcGVydHkkNCA9IG9iamVjdFByb3RvJDguaGFzT3duUHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBIYXNoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gICAgICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eSQ0LmNhbGwoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG4gICAgdmFyIEhBU0hfVU5ERUZJTkVEJDEgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIHNldFxuICAgICAqIEBtZW1iZXJPZiBIYXNoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gICAgICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQkMSA6IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgICAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbiAgICBIYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbiAgICBIYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuICAgIEhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG4gICAgSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbiAgICBIYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBjbGVhclxuICAgICAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gICAgICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAgICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICAgICAgOiAodmFsdWUgPT09IG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICAgICAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gICAgICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICAgICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICAgICAgOiBkYXRhLm1hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBkZWxldGVcbiAgICAgKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gICAgICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGdldFxuICAgICAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgICAgIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIHNldFxuICAgICAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbiAgICBNYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuICAgIE1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbiAgICBNYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG4gICAgTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuICAgIE1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuICAgIC8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xuICAgIHZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgc2V0XG4gICAgICogQG1lbWJlck9mIFN0YWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBjYWNoZSA9IHRoaXMuX19kYXRhX187XG4gICAgICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUgJiYgY2FjaGUuX19kYXRhX18ubGVuZ3RoID09IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICAgICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKGNhY2hlLl9fZGF0YV9fKTtcbiAgICAgIH1cbiAgICAgIGNhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gICAgICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuICAgIFN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG4gICAgU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuICAgIFN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcbiAgICBTdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG4gICAgU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4gICAgLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xuICAgIHZhciBIQVNIX1VOREVGSU5FRCQyID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgYWRkXG4gICAgICogQG1lbWJlck9mIFNldENhY2hlXG4gICAgICogQGFsaWFzIHB1c2hcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICAgICAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEJDIpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBoYXNcbiAgICAgKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICAgICAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG4gICAgU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG4gICAgU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICAgICAqIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUckMSA9IDE7XG4gICAgdmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDIgPSAyO1xuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAgICAgKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAgICAgKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUckMixcbiAgICAgICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gICAgICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgICAgICBzZWVuID0gKGJpdG1hc2sgJiBVTk9SREVSRURfQ09NUEFSRV9GTEFHJDEpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gICAgICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcblxuICAgICAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgaWYgKHNlZW4pIHtcbiAgICAgICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWVuLmhhcyhvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5hZGQob3RoSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgU3ltYm9sJDEgPSByb290LlN5bWJvbDtcblxuICAgIC8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICAgICAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICAgICAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUckMiA9IDE7XG4gICAgdmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDMgPSAyO1xuICAgIHZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICAgIHZhciBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nO1xuICAgIHZhciBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXSc7XG4gICAgdmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nO1xuICAgIHZhciBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJztcbiAgICB2YXIgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXSc7XG4gICAgdmFyIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nO1xuICAgIHZhciBzdHJpbmdUYWckMSA9ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgIHZhciBzeW1ib2xUYWckMSA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuICAgIHZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG4gICAgdmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcbiAgICB2YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wkMSA/IFN5bWJvbCQxLnByb3RvdHlwZSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gICAgICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAgICAgKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICAgICAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgICAgIHN3aXRjaCAodGFnKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgICAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGNhc2UgYm9vbFRhZzpcbiAgICAgICAgY2FzZSBkYXRlVGFnOlxuICAgICAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZFxuICAgICAgICAgIC8vIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzXG4gICAgICAgICAgLy8gbm90IGVxdWFsLlxuICAgICAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgICAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICAgICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAgICAgLy8gVHJlYXQgYE5hTmAgdnMuIGBOYU5gIGFzIGVxdWFsLlxuICAgICAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpID8gb3RoZXIgIT0gK290aGVyIDogb2JqZWN0ID09ICtvdGhlcjtcblxuICAgICAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgICAgY2FzZSBzdHJpbmdUYWckMTpcbiAgICAgICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgICAgIGNhc2UgbWFwVGFnOlxuICAgICAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgICAgICBjYXNlIHNldFRhZzpcbiAgICAgICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDM7XG4gICAgICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJpdG1hc2sgfD0gVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQyO1xuICAgICAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcblxuICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICAgIHJldHVybiBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcblxuICAgICAgICBjYXNlIHN5bWJvbFRhZyQxOlxuICAgICAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG4gICAgdmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDQgPSAyO1xuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAgICAgKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICAgICAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUckNCxcbiAgICAgICAgICBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgICAgIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICAgICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICAgICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogYmFzZUhhcyhvdGhlciwga2V5KSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuXG4gICAgICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgICAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSlcbiAgICAgICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgICAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKTtcblxuICAgIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbiAgICB2YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyk7XG5cbiAgICB2YXIgbWFwVGFnJDEgPSAnW29iamVjdCBNYXBdJztcbiAgICB2YXIgb2JqZWN0VGFnJDEgPSAnW29iamVjdCBPYmplY3RdJztcbiAgICB2YXIgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJztcbiAgICB2YXIgc2V0VGFnJDEgPSAnW29iamVjdCBTZXRdJztcbiAgICB2YXIgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcbiAgICB2YXIgZGF0YVZpZXdUYWckMSA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDEwID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDQgPSBvYmplY3RQcm90byQxMC50b1N0cmluZztcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG4gICAgdmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KTtcbiAgICB2YXIgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCk7XG4gICAgdmFyIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSk7XG4gICAgdmFyIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpO1xuICAgIHZhciB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRUYWcodmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RUb1N0cmluZyQ0LmNhbGwodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuICAgIC8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuICAgIGlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZyQxKSB8fFxuICAgICAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWckMSkgfHxcbiAgICAgICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgICAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWckMSkgfHxcbiAgICAgICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICAgICAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nJDQuY2FsbCh2YWx1ZSksXG4gICAgICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyQxID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnJDE7XG4gICAgICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWckMTtcbiAgICAgICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnJDE7XG4gICAgICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGdldFRhZyQxID0gZ2V0VGFnO1xuXG4gICAgdmFyIGFyZ3NUYWckMiA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuICAgIHZhciBhcnJheVRhZyQxID0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB2YXIgYm9vbFRhZyQxID0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICAgIHZhciBkYXRlVGFnJDEgPSAnW29iamVjdCBEYXRlXSc7XG4gICAgdmFyIGVycm9yVGFnJDEgPSAnW29iamVjdCBFcnJvcl0nO1xuICAgIHZhciBmdW5jVGFnJDEgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIHZhciBtYXBUYWckMiA9ICdbb2JqZWN0IE1hcF0nO1xuICAgIHZhciBudW1iZXJUYWckMSA9ICdbb2JqZWN0IE51bWJlcl0nO1xuICAgIHZhciBvYmplY3RUYWckMiA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIHZhciByZWdleHBUYWckMSA9ICdbb2JqZWN0IFJlZ0V4cF0nO1xuICAgIHZhciBzZXRUYWckMiA9ICdbb2JqZWN0IFNldF0nO1xuICAgIHZhciBzdHJpbmdUYWckMiA9ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgIHZhciB3ZWFrTWFwVGFnJDEgPSAnW29iamVjdCBXZWFrTWFwXSc7XG4gICAgdmFyIGFycmF5QnVmZmVyVGFnJDEgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xuICAgIHZhciBkYXRhVmlld1RhZyQyID0gJ1tvYmplY3QgRGF0YVZpZXddJztcbiAgICB2YXIgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nO1xuICAgIHZhciBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSc7XG4gICAgdmFyIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJztcbiAgICB2YXIgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XSc7XG4gICAgdmFyIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nO1xuICAgIHZhciB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJztcbiAgICB2YXIgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJztcbiAgICB2YXIgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJztcbiAgICB2YXIgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcbiAgICAvKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG4gICAgdmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG4gICAgdHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxuICAgIHR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxuICAgIHR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuICAgIHR5cGVkQXJyYXlUYWdzW2FyZ3NUYWckMl0gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZyQxXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWckMV0gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnJDFdID1cbiAgICB0eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZyQyXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWckMV0gPVxuICAgIHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnJDFdID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZyQxXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbbWFwVGFnJDJdID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnJDFdID1cbiAgICB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWckMl0gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWckMV0gPVxuICAgIHR5cGVkQXJyYXlUYWdzW3NldFRhZyQyXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZyQyXSA9XG4gICAgdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZyQxXSA9IGZhbHNlO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQxMSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gICAgICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gICAgICogb2YgdmFsdWVzLlxuICAgICAqL1xuICAgIHZhciBvYmplY3RUb1N0cmluZyQ1ID0gb2JqZWN0UHJvdG8kMTEudG9TdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMy4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgICAgIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZyQ1LmNhbGwodmFsdWUpXTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckMSA9IDI7XG5cbiAgICAvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG4gICAgdmFyIGFyZ3NUYWckMSA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuICAgIHZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgdmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kOSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbiAgICB2YXIgaGFzT3duUHJvcGVydHkkNSA9IG9iamVjdFByb3RvJDkuaGFzT3duUHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gICAgICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICAgICAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAgICAgKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgICAgIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gICAgICBpZiAoIW9iaklzQXJyKSB7XG4gICAgICAgIG9ialRhZyA9IGdldFRhZyQxKG9iamVjdCk7XG4gICAgICAgIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnJDEgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gICAgICB9XG4gICAgICBpZiAoIW90aElzQXJyKSB7XG4gICAgICAgIG90aFRhZyA9IGdldFRhZyQxKG90aGVyKTtcbiAgICAgICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWckMSA/IG9iamVjdFRhZyA6IG90aFRhZztcbiAgICAgIH1cbiAgICAgIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvYmplY3QpLFxuICAgICAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG90aGVyKSxcbiAgICAgICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gICAgICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghKGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyQxKSkge1xuICAgICAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkkNS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eSQ1LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICAgICAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLlxuICAgICAqICBUaGUgYml0bWFzayBtYXkgYmUgY29tcG9zZWQgb2YgdGhlIGZvbGxvd2luZyBmbGFnczpcbiAgICAgKiAgICAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gICAgICogICAgIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgIH1cblxuICAgIHZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSwgY3VzdG9taXplcikge1xuICAgICAgdmFyIGluZGV4ID0gbWF0Y2hEYXRhLmxlbmd0aCxcbiAgICAgICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAhbGVuZ3RoO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgICB2YXIgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgICAgIGlmICgobm9DdXN0b21pemVyICYmIGRhdGFbMl0pXG4gICAgICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgICAgIDogIShkYXRhWzBdIGluIG9iamVjdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgICAgIHZhciBrZXkgPSBkYXRhWzBdLFxuICAgICAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICAgIHNyY1ZhbHVlID0gZGF0YVsxXTtcblxuICAgICAgICBpZiAobm9DdXN0b21pemVyICYmIGRhdGFbMl0pIHtcbiAgICAgICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzdGFjayA9IG5ldyBTdGFjaztcbiAgICAgICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgfCBQQVJUSUFMX0NPTVBBUkVfRkxBRywgc3RhY2spXG4gICAgICAgICAgICAgICAgOiByZXN1bHRcbiAgICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICAgICAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgICAgIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICAgICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgbWF0Y2hlc1Byb3BlcnR5YCBmb3Igc291cmNlIHZhbHVlcyBzdWl0YWJsZVxuICAgICAqIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdFtrZXldID09PSBzcmNWYWx1ZSAmJlxuICAgICAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lc24ndCBjbG9uZSBgc291cmNlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICAgICAgdmFyIG1hdGNoRGF0YSA9IGdldE1hdGNoRGF0YShzb3VyY2UpO1xuICAgICAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKG1hdGNoRGF0YVswXVswXSwgbWF0Y2hEYXRhWzBdWzFdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA9PT0gc291cmNlIHx8IGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xuICAgIHZhciBGVU5DX0VSUk9SX1RFWFQkMSA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gICAgICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICAgICAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICAgICAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gICAgICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gICAgICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gICAgICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAgICAgKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICAgICAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAgICAgKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gICAgICpcbiAgICAgKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAgICAgKiB2YWx1ZXMob2JqZWN0KTtcbiAgICAgKiAvLyA9PiBbMSwgMl1cbiAgICAgKlxuICAgICAqIHZhbHVlcyhvdGhlcik7XG4gICAgICogLy8gPT4gWzMsIDRdXG4gICAgICpcbiAgICAgKiBvYmplY3QuYSA9IDI7XG4gICAgICogdmFsdWVzKG9iamVjdCk7XG4gICAgICogLy8gPT4gWzEsIDJdXG4gICAgICpcbiAgICAgKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAgICAgKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gICAgICogdmFsdWVzKG9iamVjdCk7XG4gICAgICogLy8gPT4gWydhJywgJ2InXVxuICAgICAqXG4gICAgICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAgICAgKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQkMSk7XG4gICAgICB9XG4gICAgICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICAgICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgICAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICAgICAgcmV0dXJuIG1lbW9pemVkO1xuICAgIH1cblxuICAgIC8vIEFzc2lnbiBjYWNoZSB0byBgXy5tZW1vaXplYC5cbiAgICBtZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbiAgICAvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbiAgICB2YXIgSU5GSU5JVFkkMSA9IDEgLyAwO1xuXG4gICAgLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG4gICAgdmFyIHN5bWJvbFByb3RvJDEgPSBTeW1ib2wkMSA/IFN5bWJvbCQxLnByb3RvdHlwZSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byQxID8gc3ltYm9sUHJvdG8kMS50b1N0cmluZyA6IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAgICAgKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gICAgICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICAgICAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSQxKSA/ICctMCcgOiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAgICAgKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8udG9TdHJpbmcobnVsbCk7XG4gICAgICogLy8gPT4gJydcbiAgICAgKlxuICAgICAqIF8udG9TdHJpbmcoLTApO1xuICAgICAqIC8vID0+ICctMCdcbiAgICAgKlxuICAgICAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAgICAgKiAvLyA9PiAnMSwyLDMnXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbiAgICB2YXIgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PShcXC58XFxbXFxdKSg/OlxcNHwkKSkvZztcblxuICAgIC8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xuICAgIHZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICAgICAqL1xuICAgIHZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplKGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgdG9TdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gICAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHN0cmluZ1RvUGF0aCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS87XG4gICAgdmFyIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgICAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xuICAgIHZhciBJTkZJTklUWSQyID0gMSAvIDA7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gICAgICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgICAgIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkkMikgPyAnLTAnIDogcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gICAgICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICAgICAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgdXNlZCBpbiBpdHMgcGxhY2UuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMy43LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gICAgICpcbiAgICAgKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICAgICAqIC8vID0+IDNcbiAgICAgKlxuICAgICAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICAgICAqIC8vID0+IDNcbiAgICAgKlxuICAgICAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAgICAgKiAvLyA9PiAnZGVmYXVsdCdcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICAgICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHBhdGhgIGV4aXN0cyBvbiBgb2JqZWN0YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICAgICAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICAgICAgdmFyIHJlc3VsdCxcbiAgICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgICAgICBpZiAoIShyZXN1bHQgPSBvYmplY3QgIT0gbnVsbCAmJiBoYXNGdW5jKG9iamVjdCwga2V5KSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHZhciBsZW5ndGggPSBvYmplY3QgPyBvYmplY3QubGVuZ3RoIDogMDtcbiAgICAgIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNTdHJpbmcob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAgICAgKlxuICAgICAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG4gICAgfVxuXG4gICAgdmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUckMyA9IDE7XG4gICAgdmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDUgPSAyO1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICAgICAgaWYgKGlzS2V5KHBhdGgpICYmIGlzU3RyaWN0Q29tcGFyYWJsZShzcmNWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKHRvS2V5KHBhdGgpLCBzcmNWYWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHZhciBvYmpWYWx1ZSA9IGdldChvYmplY3QsIHBhdGgpO1xuICAgICAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgICAgID8gaGFzSW4ob2JqZWN0LCBwYXRoKVxuICAgICAgICAgIDogYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCB1bmRlZmluZWQsIFVOT1JERVJFRF9DT01QQVJFX0ZMQUckMyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHJDUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBnaXZlbiB0byBpdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAgICAgKlxuICAgICAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDIuNC4wXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0cyA9IFtcbiAgICAgKiAgIHsgJ2EnOiB7ICdiJzogMiB9IH0sXG4gICAgICogICB7ICdhJzogeyAnYic6IDEgfSB9XG4gICAgICogXTtcbiAgICAgKlxuICAgICAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYicpKTtcbiAgICAgKiAvLyA9PiBbMiwgMV1cbiAgICAgKlxuICAgICAqIF8ubWFwKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InXSkpLCAnYS5iJyk7XG4gICAgICogLy8gPT4gWzEsIDJdXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICAgICAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHRvS2V5KHBhdGgpKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXRlcmF0ZWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IFt2YWx1ZT1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhbiBpdGVyYXRlZS5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VJdGVyYXRlZSh2YWx1ZSkge1xuICAgICAgLy8gRG9uJ3Qgc3RvcmUgdGhlIGB0eXBlb2ZgIHJlc3VsdCBpbiBhIHZhcmlhYmxlIHRvIGF2b2lkIGEgSklUIGJ1ZyBpbiBTYWZhcmkgOS5cbiAgICAgIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgICAgIDogYmFzZU1hdGNoZXModmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyBvdmVyIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBhbmRcbiAgICAgKiBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAgICAgKiBhcmd1bWVudHM6ICh2YWx1ZSwga2V5LCBvYmplY3QpLiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uXG4gICAgICogZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAwLjMuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAgICogQHNlZSBfLmZvck93blJpZ2h0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIEZvbygpIHtcbiAgICAgKiAgIHRoaXMuYSA9IDE7XG4gICAgICogICB0aGlzLmIgPSAyO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gICAgICpcbiAgICAgKiBfLmZvck93bihuZXcgRm9vLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICogICBjb25zb2xlLmxvZyhrZXkpO1xuICAgICAqIH0pO1xuICAgICAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3JPd24ob2JqZWN0LCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBgTmFOYCBpcyBmb3VuZCBpbiBgYXJyYXlgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIGBOYU5gLCBlbHNlIGAtMWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICAgICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgICAgdmFyIG90aGVyID0gYXJyYXlbaW5kZXhdO1xuICAgICAgICBpZiAob3RoZXIgIT09IG90aGVyKSB7XG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICAgICAgaWYgKHZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4KTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgdGhlIGJlc3Qgb3JkZXIgZm9yIHJ1bm5pbmcgdGhlIGZ1bmN0aW9ucyBpbiBgdGFza3NgLCBiYXNlZCBvblxuICAgICAqIHRoZWlyIHJlcXVpcmVtZW50cy4gRWFjaCBmdW5jdGlvbiBjYW4gb3B0aW9uYWxseSBkZXBlbmQgb24gb3RoZXIgZnVuY3Rpb25zXG4gICAgICogYmVpbmcgY29tcGxldGVkIGZpcnN0LCBhbmQgZWFjaCBmdW5jdGlvbiBpcyBydW4gYXMgc29vbiBhcyBpdHMgcmVxdWlyZW1lbnRzXG4gICAgICogYXJlIHNhdGlzZmllZC5cbiAgICAgKlxuICAgICAqIElmIGFueSBvZiB0aGUgZnVuY3Rpb25zIHBhc3MgYW4gZXJyb3IgdG8gdGhlaXIgY2FsbGJhY2ssIHRoZSBgYXV0b2Agc2VxdWVuY2VcbiAgICAgKiB3aWxsIHN0b3AuIEZ1cnRoZXIgdGFza3Mgd2lsbCBub3QgZXhlY3V0ZSAoc28gYW55IG90aGVyIGZ1bmN0aW9ucyBkZXBlbmRpbmdcbiAgICAgKiBvbiBpdCB3aWxsIG5vdCBydW4pLCBhbmQgdGhlIG1haW4gYGNhbGxiYWNrYCBpcyBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGVcbiAgICAgKiBlcnJvci5cbiAgICAgKlxuICAgICAqIEZ1bmN0aW9ucyBhbHNvIHJlY2VpdmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgZnVuY3Rpb25zIHdoaWNoXG4gICAgICogaGF2ZSBjb21wbGV0ZWQgc28gZmFyIGFzIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgdGhleSBoYXZlIGRlcGVuZGVuY2llcy4gSWYgYVxuICAgICAqIHRhc2sgZnVuY3Rpb24gaGFzIG5vIGRlcGVuZGVuY2llcywgaXQgd2lsbCBvbmx5IGJlIHBhc3NlZCBhIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQG5hbWUgYXV0b1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhc2tzIC0gQW4gb2JqZWN0LiBFYWNoIG9mIGl0cyBwcm9wZXJ0aWVzIGlzIGVpdGhlciBhXG4gICAgICogZnVuY3Rpb24gb3IgYW4gYXJyYXkgb2YgcmVxdWlyZW1lbnRzLCB3aXRoIHRoZSBmdW5jdGlvbiBpdHNlbGYgdGhlIGxhc3QgaXRlbVxuICAgICAqIGluIHRoZSBhcnJheS4gVGhlIG9iamVjdCdzIGtleSBvZiBhIHByb3BlcnR5IHNlcnZlcyBhcyB0aGUgbmFtZSBvZiB0aGUgdGFza1xuICAgICAqIGRlZmluZWQgYnkgdGhhdCBwcm9wZXJ0eSwgaS5lLiBjYW4gYmUgdXNlZCB3aGVuIHNwZWNpZnlpbmcgcmVxdWlyZW1lbnRzIGZvclxuICAgICAqIG90aGVyIHRhc2tzLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgb25lIG9yIHR3byBhcmd1bWVudHM6XG4gICAgICogKiBhIGByZXN1bHRzYCBvYmplY3QsIGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgdGhlIHByZXZpb3VzbHkgZXhlY3V0ZWRcbiAgICAgKiAgIGZ1bmN0aW9ucywgb25seSBwYXNzZWQgaWYgdGhlIHRhc2sgaGFzIGFueSBkZXBlbmRlbmNpZXMsXG4gICAgICogKiBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdClgIGZ1bmN0aW9uLCB3aGljaCBtdXN0IGJlIGNhbGxlZCB3aGVuIGZpbmlzaGVkLFxuICAgICAqICAgcGFzc2luZyBhbiBgZXJyb3JgICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgdGhlIHJlc3VsdCBvZiB0aGUgZnVuY3Rpb24nc1xuICAgICAqICAgZXhlY3V0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVuY3k9SW5maW5pdHldIC0gQW4gb3B0aW9uYWwgYGludGVnZXJgIGZvclxuICAgICAqIGRldGVybWluaW5nIHRoZSBtYXhpbXVtIG51bWJlciBvZiB0YXNrcyB0aGF0IGNhbiBiZSBydW4gaW4gcGFyYWxsZWwuIEJ5XG4gICAgICogZGVmYXVsdCwgYXMgbWFueSBhcyBwb3NzaWJsZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsXG4gICAgICogdGhlIHRhc2tzIGhhdmUgYmVlbiBjb21wbGV0ZWQuIEl0IHJlY2VpdmVzIHRoZSBgZXJyYCBhcmd1bWVudCBpZiBhbnkgYHRhc2tzYFxuICAgICAqIHBhc3MgYW4gZXJyb3IgdG8gdGhlaXIgY2FsbGJhY2suIFJlc3VsdHMgYXJlIGFsd2F5cyByZXR1cm5lZDsgaG93ZXZlciwgaWYgYW5cbiAgICAgKiBlcnJvciBvY2N1cnMsIG5vIGZ1cnRoZXIgYHRhc2tzYCB3aWxsIGJlIHBlcmZvcm1lZCwgYW5kIHRoZSByZXN1bHRzIG9iamVjdFxuICAgICAqIHdpbGwgb25seSBjb250YWluIHBhcnRpYWwgcmVzdWx0cy4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5hdXRvKHtcbiAgICAgKiAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIGp1c3QgYmUgcGFzc2VkIGEgY2FsbGJhY2tcbiAgICAgKiAgICAgcmVhZERhdGE6IGFzeW5jLmFwcGx5KGZzLnJlYWRGaWxlLCAnZGF0YS50eHQnLCAndXRmLTgnKSxcbiAgICAgKiAgICAgc2hvd0RhdGE6IFsncmVhZERhdGEnLCBmdW5jdGlvbihyZXN1bHRzLCBjYikge1xuICAgICAqICAgICAgICAgLy8gcmVzdWx0cy5yZWFkRGF0YSBpcyB0aGUgZmlsZSdzIGNvbnRlbnRzXG4gICAgICogICAgICAgICAvLyAuLi5cbiAgICAgKiAgICAgfV1cbiAgICAgKiB9LCBjYWxsYmFjayk7XG4gICAgICpcbiAgICAgKiBhc3luYy5hdXRvKHtcbiAgICAgKiAgICAgZ2V0X2RhdGE6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZygnaW4gZ2V0X2RhdGEnKTtcbiAgICAgKiAgICAgICAgIC8vIGFzeW5jIGNvZGUgdG8gZ2V0IHNvbWUgZGF0YVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2RhdGEnLCAnY29udmVydGVkIHRvIGFycmF5Jyk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIG1ha2VfZm9sZGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coJ2luIG1ha2VfZm9sZGVyJyk7XG4gICAgICogICAgICAgICAvLyBhc3luYyBjb2RlIHRvIGNyZWF0ZSBhIGRpcmVjdG9yeSB0byBzdG9yZSBhIGZpbGUgaW5cbiAgICAgKiAgICAgICAgIC8vIHRoaXMgaXMgcnVuIGF0IHRoZSBzYW1lIHRpbWUgYXMgZ2V0dGluZyB0aGUgZGF0YVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZvbGRlcicpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICB3cml0ZV9maWxlOiBbJ2dldF9kYXRhJywgJ21ha2VfZm9sZGVyJywgZnVuY3Rpb24ocmVzdWx0cywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNvbnNvbGUubG9nKCdpbiB3cml0ZV9maWxlJywgSlNPTi5zdHJpbmdpZnkocmVzdWx0cykpO1xuICAgICAqICAgICAgICAgLy8gb25jZSB0aGVyZSBpcyBzb21lIGRhdGEgYW5kIHRoZSBkaXJlY3RvcnkgZXhpc3RzLFxuICAgICAqICAgICAgICAgLy8gd3JpdGUgdGhlIGRhdGEgdG8gYSBmaWxlIGluIHRoZSBkaXJlY3RvcnlcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdmaWxlbmFtZScpO1xuICAgICAqICAgICB9XSxcbiAgICAgKiAgICAgZW1haWxfbGluazogWyd3cml0ZV9maWxlJywgZnVuY3Rpb24ocmVzdWx0cywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBlbWFpbF9saW5rJywgSlNPTi5zdHJpbmdpZnkocmVzdWx0cykpO1xuICAgICAqICAgICAgICAgLy8gb25jZSB0aGUgZmlsZSBpcyB3cml0dGVuIGxldCdzIGVtYWlsIGEgbGluayB0byBpdC4uLlxuICAgICAqICAgICAgICAgLy8gcmVzdWx0cy53cml0ZV9maWxlIGNvbnRhaW5zIHRoZSBmaWxlbmFtZSByZXR1cm5lZCBieSB3cml0ZV9maWxlLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgeydmaWxlJzpyZXN1bHRzLndyaXRlX2ZpbGUsICdlbWFpbCc6J3VzZXJAZXhhbXBsZS5jb20nfSk7XG4gICAgICogICAgIH1dXG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdlcnIgPSAnLCBlcnIpO1xuICAgICAqICAgICBjb25zb2xlLmxvZygncmVzdWx0cyA9ICcsIHJlc3VsdHMpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGF1dG8gKHRhc2tzLCBjb25jdXJyZW5jeSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25jdXJyZW5jeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY29uY3VycmVuY3kgaXMgb3B0aW9uYWwsIHNoaWZ0IHRoZSBhcmdzLlxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjb25jdXJyZW5jeTtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayA9IG9uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgIHZhciBrZXlzJCQgPSBrZXlzKHRhc2tzKTtcbiAgICAgICAgdmFyIG51bVRhc2tzID0ga2V5cyQkLmxlbmd0aDtcbiAgICAgICAgaWYgKCFudW1UYXNrcykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gbnVtVGFza3M7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgICAgICB2YXIgcnVubmluZ1Rhc2tzID0gMDtcbiAgICAgICAgdmFyIGhhc0Vycm9yID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHt9O1xuXG4gICAgICAgIHZhciByZWFkeVRhc2tzID0gW107XG5cbiAgICAgICAgLy8gZm9yIGN5Y2xlIGRldGVjdGlvbjpcbiAgICAgICAgdmFyIHJlYWR5VG9DaGVjayA9IFtdOyAvLyB0YXNrcyB0aGF0IGhhdmUgYmVlbiBpZGVudGlmaWVkIGFzIHJlYWNoYWJsZVxuICAgICAgICAvLyB3aXRob3V0IHRoZSBwb3NzaWJpbGl0eSBvZiByZXR1cm5pbmcgdG8gYW4gYW5jZXN0b3IgdGFza1xuICAgICAgICB2YXIgdW5jaGVja2VkRGVwZW5kZW5jaWVzID0ge307XG5cbiAgICAgICAgZm9yT3duKHRhc2tzLCBmdW5jdGlvbiAodGFzaywga2V5KSB7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkodGFzaykpIHtcbiAgICAgICAgICAgICAgICAvLyBubyBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAgICAgICBlbnF1ZXVlVGFzayhrZXksIFt0YXNrXSk7XG4gICAgICAgICAgICAgICAgcmVhZHlUb0NoZWNrLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkZXBlbmRlbmNpZXMgPSB0YXNrLnNsaWNlKDAsIHRhc2subGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB2YXIgcmVtYWluaW5nRGVwZW5kZW5jaWVzID0gZGVwZW5kZW5jaWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdEZXBlbmRlbmNpZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlbnF1ZXVlVGFzayhrZXksIHRhc2spO1xuICAgICAgICAgICAgICAgIHJlYWR5VG9DaGVjay5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5jaGVja2VkRGVwZW5kZW5jaWVzW2tleV0gPSByZW1haW5pbmdEZXBlbmRlbmNpZXM7XG5cbiAgICAgICAgICAgIGFycmF5RWFjaChkZXBlbmRlbmNpZXMsIGZ1bmN0aW9uIChkZXBlbmRlbmN5TmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGFza3NbZGVwZW5kZW5jeU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXN5bmMuYXV0byB0YXNrIGAnICsga2V5ICsgJ2AgaGFzIGEgbm9uLWV4aXN0ZW50IGRlcGVuZGVuY3kgaW4gJyArIGRlcGVuZGVuY2llcy5qb2luKCcsICcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWRkTGlzdGVuZXIoZGVwZW5kZW5jeU5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nRGVwZW5kZW5jaWVzLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmdEZXBlbmRlbmNpZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVucXVldWVUYXNrKGtleSwgdGFzayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjaGVja0ZvckRlYWRsb2NrcygpO1xuICAgICAgICBwcm9jZXNzUXVldWUoKTtcblxuICAgICAgICBmdW5jdGlvbiBlbnF1ZXVlVGFzayhrZXksIHRhc2spIHtcbiAgICAgICAgICAgIHJlYWR5VGFza3MucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuVGFzayhrZXksIHRhc2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwcm9jZXNzUXVldWUoKSB7XG4gICAgICAgICAgICBpZiAocmVhZHlUYXNrcy5sZW5ndGggPT09IDAgJiYgcnVubmluZ1Rhc2tzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHJlYWR5VGFza3MubGVuZ3RoICYmIHJ1bm5pbmdUYXNrcyA8IGNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJ1biA9IHJlYWR5VGFza3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZExpc3RlbmVyKHRhc2tOYW1lLCBmbikge1xuICAgICAgICAgICAgdmFyIHRhc2tMaXN0ZW5lcnMgPSBsaXN0ZW5lcnNbdGFza05hbWVdO1xuICAgICAgICAgICAgaWYgKCF0YXNrTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgdGFza0xpc3RlbmVycyA9IGxpc3RlbmVyc1t0YXNrTmFtZV0gPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFza0xpc3RlbmVycy5wdXNoKGZuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRhc2tDb21wbGV0ZSh0YXNrTmFtZSkge1xuICAgICAgICAgICAgdmFyIHRhc2tMaXN0ZW5lcnMgPSBsaXN0ZW5lcnNbdGFza05hbWVdIHx8IFtdO1xuICAgICAgICAgICAgYXJyYXlFYWNoKHRhc2tMaXN0ZW5lcnMsIGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb2Nlc3NRdWV1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcnVuVGFzayhrZXksIHRhc2spIHtcbiAgICAgICAgICAgIGlmIChoYXNFcnJvcikgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgdGFza0NhbGxiYWNrID0gb25seU9uY2UocmVzdChmdW5jdGlvbiAoZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgcnVubmluZ1Rhc2tzLS07XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhZmVSZXN1bHRzID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvck93bihyZXN1bHRzLCBmdW5jdGlvbiAodmFsLCBya2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlUmVzdWx0c1tya2V5XSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNhZmVSZXN1bHRzW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgc2FmZVJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNba2V5XSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tDb21wbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcnVubmluZ1Rhc2tzKys7XG4gICAgICAgICAgICB2YXIgdGFza0ZuID0gdGFza1t0YXNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHRhc2subGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRhc2tGbihyZXN1bHRzLCB0YXNrQ2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrRm4odGFza0NhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRm9yRGVhZGxvY2tzKCkge1xuICAgICAgICAgICAgLy8gS2FobidzIGFsZ29yaXRobVxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVG9wb2xvZ2ljYWxfc29ydGluZyNLYWhuLjI3c19hbGdvcml0aG1cbiAgICAgICAgICAgIC8vIGh0dHA6Ly9jb25uYWxsZS5ibG9nc3BvdC5jb20vMjAxMy8xMC90b3BvbG9naWNhbC1zb3J0aW5na2Fobi1hbGdvcml0aG0uaHRtbFxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUYXNrO1xuICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHJlYWR5VG9DaGVjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFzayA9IHJlYWR5VG9DaGVjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgYXJyYXlFYWNoKGdldERlcGVuZGVudHMoY3VycmVudFRhc2spLCBmdW5jdGlvbiAoZGVwZW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIC0tdW5jaGVja2VkRGVwZW5kZW5jaWVzW2RlcGVuZGVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5VG9DaGVjay5wdXNoKGRlcGVuZGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvdW50ZXIgIT09IG51bVRhc2tzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhc3luYy5hdXRvIGNhbm5vdCBleGVjdXRlIHRhc2tzIGR1ZSB0byBhIHJlY3Vyc2l2ZSBkZXBlbmRlbmN5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXREZXBlbmRlbnRzKHRhc2tOYW1lKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBmb3JPd24odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSh0YXNrKSAmJiBiYXNlSW5kZXhPZih0YXNrLCB0YXNrTmFtZSwgMCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICAgICAqIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgICAgIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgZW5kID0gZW5kID4gbGVuZ3RoID8gbGVuZ3RoIDogZW5kO1xuICAgICAgaWYgKGVuZCA8IDApIHtcbiAgICAgICAgZW5kICs9IGxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgICAgIHN0YXJ0ID4+Pj0gMDtcblxuICAgICAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhc3RzIGBhcnJheWAgdG8gYSBzbGljZSBpZiBpdCdzIG5lZWRlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSBzdGFydCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHNsaWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhc3RTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kO1xuICAgICAgcmV0dXJuICghc3RhcnQgJiYgZW5kID49IGxlbmd0aCkgPyBhcnJheSA6IGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBgXy50cmltYCBhbmQgYF8udHJpbUVuZGAgdG8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgbGFzdCBzdHJpbmcgc3ltYm9sXG4gICAgICogdGhhdCBpcyBub3QgZm91bmQgaW4gdGhlIGNoYXJhY3RlciBzeW1ib2xzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzdHJTeW1ib2xzIFRoZSBzdHJpbmcgc3ltYm9scyB0byBpbnNwZWN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGNoclN5bWJvbHMgVGhlIGNoYXJhY3RlciBzeW1ib2xzIHRvIGZpbmQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3QgdW5tYXRjaGVkIHN0cmluZyBzeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hhcnNFbmRJbmRleChzdHJTeW1ib2xzLCBjaHJTeW1ib2xzKSB7XG4gICAgICB2YXIgaW5kZXggPSBzdHJTeW1ib2xzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGluZGV4LS0gJiYgYmFzZUluZGV4T2YoY2hyU3ltYm9scywgc3RyU3ltYm9sc1tpbmRleF0sIDApID4gLTEpIHt9XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBgXy50cmltYCBhbmQgYF8udHJpbVN0YXJ0YCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBzdHJpbmcgc3ltYm9sXG4gICAgICogdGhhdCBpcyBub3QgZm91bmQgaW4gdGhlIGNoYXJhY3RlciBzeW1ib2xzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzdHJTeW1ib2xzIFRoZSBzdHJpbmcgc3ltYm9scyB0byBpbnNwZWN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGNoclN5bWJvbHMgVGhlIGNoYXJhY3RlciBzeW1ib2xzIHRvIGZpbmQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHVubWF0Y2hlZCBzdHJpbmcgc3ltYm9sLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoYXJzU3RhcnRJbmRleChzdHJTeW1ib2xzLCBjaHJTeW1ib2xzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBzdHJTeW1ib2xzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGggJiYgYmFzZUluZGV4T2YoY2hyU3ltYm9scywgc3RyU3ltYm9sc1tpbmRleF0sIDApID4gLTEpIHt9XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xuICAgIHZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnO1xuICAgIHZhciByc0NvbWJvTWFya3NSYW5nZSA9ICdcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyMyc7XG4gICAgdmFyIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmMCc7XG4gICAgdmFyIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcbiAgICB2YXIgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nO1xuICAgIHZhciByc0NvbWJvID0gJ1snICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgJ10nO1xuICAgIHZhciByc0ZpdHogPSAnXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdJztcbiAgICB2YXIgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJztcbiAgICB2YXIgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJztcbiAgICB2YXIgcnNSZWdpb25hbCA9ICcoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9JztcbiAgICB2YXIgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nO1xuICAgIHZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuICAgIHZhciByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPyc7XG4gICAgdmFyIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPyc7XG4gICAgdmFyIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKic7XG4gICAgdmFyIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbjtcbiAgICB2YXIgcnNTeW1ib2wgPSAnKD86JyArIFtyc05vbkFzdHJhbCArIHJzQ29tYm8gKyAnPycsIHJzQ29tYm8sIHJzUmVnaW9uYWwsIHJzU3VyclBhaXIsIHJzQXN0cmFsXS5qb2luKCd8JykgKyAnKSc7XG4gICAgLyoqIFVzZWQgdG8gbWF0Y2ggW3N0cmluZyBzeW1ib2xzXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC11bmljb2RlKS4gKi9cbiAgICB2YXIgcmVDb21wbGV4U3ltYm9sID0gUmVnRXhwKHJzRml0eiArICcoPz0nICsgcnNGaXR6ICsgJyl8JyArIHJzU3ltYm9sICsgcnNTZXEsICdnJyk7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcubWF0Y2gocmVDb21wbGV4U3ltYm9sKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xuICAgIHZhciByZVRyaW0kMSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlIG9yIHNwZWNpZmllZCBjaGFyYWN0ZXJzIGZyb20gYHN0cmluZ2AuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMy4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgU3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gdHJpbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2NoYXJzPXdoaXRlc3BhY2VdIFRoZSBjaGFyYWN0ZXJzIHRvIHRyaW0uXG4gICAgICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB0cmltbWVkIHN0cmluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50cmltKCcgIGFiYyAgJyk7XG4gICAgICogLy8gPT4gJ2FiYydcbiAgICAgKlxuICAgICAqIF8udHJpbSgnLV8tYWJjLV8tJywgJ18tJyk7XG4gICAgICogLy8gPT4gJ2FiYydcbiAgICAgKlxuICAgICAqIF8ubWFwKFsnICBmb28gICcsICcgIGJhciAgJ10sIF8udHJpbSk7XG4gICAgICogLy8gPT4gWydmb28nLCAnYmFyJ11cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmltKHN0cmluZywgY2hhcnMsIGd1YXJkKSB7XG4gICAgICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICAgICAgaWYgKHN0cmluZyAmJiAoZ3VhcmQgfHwgY2hhcnMgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlVHJpbSQxLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXN0cmluZyB8fCAhKGNoYXJzID0gYmFzZVRvU3RyaW5nKGNoYXJzKSkpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIH1cbiAgICAgIHZhciBzdHJTeW1ib2xzID0gc3RyaW5nVG9BcnJheShzdHJpbmcpLFxuICAgICAgICAgIGNoclN5bWJvbHMgPSBzdHJpbmdUb0FycmF5KGNoYXJzKSxcbiAgICAgICAgICBzdGFydCA9IGNoYXJzU3RhcnRJbmRleChzdHJTeW1ib2xzLCBjaHJTeW1ib2xzKSxcbiAgICAgICAgICBlbmQgPSBjaGFyc0VuZEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpICsgMTtcblxuICAgICAgcmV0dXJuIGNhc3RTbGljZShzdHJTeW1ib2xzLCBzdGFydCwgZW5kKS5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB2YXIgYXJnc1JlZ2V4ID0gL14oZnVuY3Rpb25bXlxcKF0qKT9cXCg/XFxzKihbXlxcKT1dKikvbTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlUGFyYW1zKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIHRyaW0oZnVuYy50b1N0cmluZygpLm1hdGNoKGFyZ3NSZWdleClbMl0pLnNwbGl0KC9cXHMqXFwsXFxzKi8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZGVwZW5kZW5jeS1pbmplY3RlZCB2ZXJzaW9uIG9mIHRoZSB7QGxpbmsgYXN5bmMuYXV0b30gZnVuY3Rpb24uIERlcGVuZGVudFxuICAgICAqIHRhc2tzIGFyZSBzcGVjaWZpZWQgYXMgcGFyYW1ldGVycyB0byB0aGUgZnVuY3Rpb24sIGFmdGVyIHRoZSB1c3VhbCBjYWxsYmFja1xuICAgICAqIHBhcmFtZXRlciwgd2l0aCB0aGUgcGFyYW1ldGVyIG5hbWVzIG1hdGNoaW5nIHRoZSBuYW1lcyBvZiB0aGUgdGFza3MgaXRcbiAgICAgKiBkZXBlbmRzIG9uLiBUaGlzIGNhbiBwcm92aWRlIGV2ZW4gbW9yZSByZWFkYWJsZSB0YXNrIGdyYXBocyB3aGljaCBjYW4gYmVcbiAgICAgKiBlYXNpZXIgdG8gbWFpbnRhaW4uXG4gICAgICpcbiAgICAgKiBJZiBhIGZpbmFsIGNhbGxiYWNrIGlzIHNwZWNpZmllZCwgdGhlIHRhc2sgcmVzdWx0cyBhcmUgc2ltaWxhcmx5IGluamVjdGVkLFxuICAgICAqIHNwZWNpZmllZCBhcyBuYW1lZCBwYXJhbWV0ZXJzIGFmdGVyIHRoZSBpbml0aWFsIGVycm9yIHBhcmFtZXRlci5cbiAgICAgKlxuICAgICAqIFRoZSBhdXRvSW5qZWN0IGZ1bmN0aW9uIGlzIHB1cmVseSBzeW50YWN0aWMgc3VnYXIgYW5kIGl0cyBzZW1hbnRpY3MgYXJlXG4gICAgICogb3RoZXJ3aXNlIGVxdWl2YWxlbnQgdG8ge0BsaW5rIGFzeW5jLmF1dG99LlxuICAgICAqXG4gICAgICogQG5hbWUgYXV0b0luamVjdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmF1dG9cbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhc2tzIC0gQW4gb2JqZWN0LCBlYWNoIG9mIHdob3NlIHByb3BlcnRpZXMgaXMgYSBmdW5jdGlvbiBvZlxuICAgICAqIHRoZSBmb3JtICdmdW5jKFtkZXBlbmRlbmNpZXMuLi5dLCBjYWxsYmFjaykuIFRoZSBvYmplY3QncyBrZXkgb2YgYSBwcm9wZXJ0eVxuICAgICAqIHNlcnZlcyBhcyB0aGUgbmFtZSBvZiB0aGUgdGFzayBkZWZpbmVkIGJ5IHRoYXQgcHJvcGVydHksIGkuZS4gY2FuIGJlIHVzZWRcbiAgICAgKiB3aGVuIHNwZWNpZnlpbmcgcmVxdWlyZW1lbnRzIGZvciBvdGhlciB0YXNrcy5cbiAgICAgKiAqIFRoZSBgY2FsbGJhY2tgIHBhcmFtZXRlciBpcyBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdClgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogICB3aGVuIGZpbmlzaGVkLCBwYXNzaW5nIGFuIGBlcnJvcmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCB0aGUgcmVzdWx0IG9mXG4gICAgICogICB0aGUgZnVuY3Rpb24ncyBleGVjdXRpb24uIFRoZSByZW1haW5pbmcgcGFyYW1ldGVycyBuYW1lIG90aGVyIHRhc2tzIG9uXG4gICAgICogICB3aGljaCB0aGUgdGFzayBpcyBkZXBlbmRlbnQsIGFuZCB0aGUgcmVzdWx0cyBmcm9tIHRob3NlIHRhc2tzIGFyZSB0aGVcbiAgICAgKiAgIGFyZ3VtZW50cyBvZiB0aG9zZSBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBbiBvcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiB0aGUgdGFza3MgaGF2ZSBiZWVuIGNvbXBsZXRlZC4gSXQgcmVjZWl2ZXMgdGhlIGBlcnJgIGFyZ3VtZW50IGlmIGFueSBgdGFza3NgXG4gICAgICogcGFzcyBhbiBlcnJvciB0byB0aGVpciBjYWxsYmFjay4gVGhlIHJlbWFpbmluZyBwYXJhbWV0ZXJzIGFyZSB0YXNrIG5hbWVzXG4gICAgICogd2hvc2UgcmVzdWx0cyB5b3UgYXJlIGludGVyZXN0ZWQgaW4uIFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gICAgICogYWxsIHRhc2tzIGhhdmUgZmluaXNoZWQgb3IgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBhbmQgc28gZG8gbm90IHNwZWNpZnlcbiAgICAgKiBkZXBlbmRlbmNpZXMgaW4gdGhlIHNhbWUgd2F5IGFzIGB0YXNrc2AgZG8uIElmIGFuIGVycm9yIG9jY3Vycywgbm8gZnVydGhlclxuICAgICAqIGB0YXNrc2Agd2lsbCBiZSBwZXJmb3JtZWQsIGFuZCBgcmVzdWx0c2Agd2lsbCBvbmx5IGJlIHZhbGlkIGZvciB0aG9zZSB0YXNrc1xuICAgICAqIHdoaWNoIG1hbmFnZWQgdG8gY29tcGxldGUuIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0cy4uLl0pLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyAgVGhlIGV4YW1wbGUgZnJvbSBgYXV0b2AgY2FuIGJlIHJld3JpdHRlbiBhcyBmb2xsb3dzOlxuICAgICAqIGFzeW5jLmF1dG9JbmplY3Qoe1xuICAgICAqICAgICBnZXRfZGF0YTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGFzeW5jIGNvZGUgdG8gZ2V0IHNvbWUgZGF0YVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2RhdGEnLCAnY29udmVydGVkIHRvIGFycmF5Jyk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIG1ha2VfZm9sZGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXN5bmMgY29kZSB0byBjcmVhdGUgYSBkaXJlY3RvcnkgdG8gc3RvcmUgYSBmaWxlIGluXG4gICAgICogICAgICAgICAvLyB0aGlzIGlzIHJ1biBhdCB0aGUgc2FtZSB0aW1lIGFzIGdldHRpbmcgdGhlIGRhdGFcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdmb2xkZXInKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgd3JpdGVfZmlsZTogZnVuY3Rpb24oZ2V0X2RhdGEsIG1ha2VfZm9sZGVyLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gb25jZSB0aGVyZSBpcyBzb21lIGRhdGEgYW5kIHRoZSBkaXJlY3RvcnkgZXhpc3RzLFxuICAgICAqICAgICAgICAgLy8gd3JpdGUgdGhlIGRhdGEgdG8gYSBmaWxlIGluIHRoZSBkaXJlY3RvcnlcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdmaWxlbmFtZScpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBlbWFpbF9saW5rOiBmdW5jdGlvbih3cml0ZV9maWxlLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gb25jZSB0aGUgZmlsZSBpcyB3cml0dGVuIGxldCdzIGVtYWlsIGEgbGluayB0byBpdC4uLlxuICAgICAqICAgICAgICAgLy8gd3JpdGVfZmlsZSBjb250YWlucyB0aGUgZmlsZW5hbWUgcmV0dXJuZWQgYnkgd3JpdGVfZmlsZS5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIHsnZmlsZSc6d3JpdGVfZmlsZSwgJ2VtYWlsJzondXNlckBleGFtcGxlLmNvbSd9KTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgZW1haWxfbGluaykge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZXJyID0gJywgZXJyKTtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2VtYWlsX2xpbmsgPSAnLCBlbWFpbF9saW5rKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIElmIHlvdSBhcmUgdXNpbmcgYSBKUyBtaW5pZmllciB0aGF0IG1hbmdsZXMgcGFyYW1ldGVyIG5hbWVzLCBgYXV0b0luamVjdGBcbiAgICAgKiAvLyB3aWxsIG5vdCB3b3JrIHdpdGggcGxhaW4gZnVuY3Rpb25zLCBzaW5jZSB0aGUgcGFyYW1ldGVyIG5hbWVzIHdpbGwgYmVcbiAgICAgKiAvLyBjb2xsYXBzZWQgdG8gYSBzaW5nbGUgbGV0dGVyIGlkZW50aWZpZXIuICBUbyB3b3JrIGFyb3VuZCB0aGlzLCB5b3UgY2FuXG4gICAgICogLy8gZXhwbGljaXRseSBzcGVjaWZ5IHRoZSBuYW1lcyBvZiB0aGUgcGFyYW1ldGVycyB5b3VyIHRhc2sgZnVuY3Rpb24gbmVlZHNcbiAgICAgKiAvLyBpbiBhbiBhcnJheSwgc2ltaWxhciB0byBBbmd1bGFyLmpzIGRlcGVuZGVuY3kgaW5qZWN0aW9uLiAgVGhlIGZpbmFsXG4gICAgICogLy8gcmVzdWx0cyBjYWxsYmFjayBjYW4gYmUgcHJvdmlkZWQgYXMgYW4gYXJyYXkgaW4gdGhlIHNhbWUgd2F5LlxuICAgICAqXG4gICAgICogLy8gVGhpcyBzdGlsbCBoYXMgYW4gYWR2YW50YWdlIG92ZXIgcGxhaW4gYGF1dG9gLCBzaW5jZSB0aGUgcmVzdWx0cyBhIHRhc2tcbiAgICAgKiAvLyBkZXBlbmRzIG9uIGFyZSBzdGlsbCBzcHJlYWQgaW50byBhcmd1bWVudHMuXG4gICAgICogYXN5bmMuYXV0b0luamVjdCh7XG4gICAgICogICAgIC8vLi4uXG4gICAgICogICAgIHdyaXRlX2ZpbGU6IFsnZ2V0X2RhdGEnLCAnbWFrZV9mb2xkZXInLCBmdW5jdGlvbihnZXRfZGF0YSwgbWFrZV9mb2xkZXIsIGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZmlsZW5hbWUnKTtcbiAgICAgKiAgICAgfV0sXG4gICAgICogICAgIGVtYWlsX2xpbms6IFsnd3JpdGVfZmlsZScsIGZ1bmN0aW9uKHdyaXRlX2ZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCB7J2ZpbGUnOndyaXRlX2ZpbGUsICdlbWFpbCc6J3VzZXJAZXhhbXBsZS5jb20nfSk7XG4gICAgICogICAgIH1dXG4gICAgICogICAgIC8vLi4uXG4gICAgICogfSwgWydlbWFpbF9saW5rJywgZnVuY3Rpb24oZXJyLCBlbWFpbF9saW5rKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdlcnIgPSAnLCBlcnIpO1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZW1haWxfbGluayA9ICcsIGVtYWlsX2xpbmspO1xuICAgICAqIH1dKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhdXRvSW5qZWN0KHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgbmV3VGFza3MgPSB7fTtcblxuICAgICAgICBmb3JPd24odGFza3MsIGZ1bmN0aW9uICh0YXNrRm4sIGtleSkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcztcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkodGFza0ZuKSkge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGNvcHlBcnJheSh0YXNrRm4pO1xuICAgICAgICAgICAgICAgIHRhc2tGbiA9IHBhcmFtcy5wb3AoKTtcblxuICAgICAgICAgICAgICAgIG5ld1Rhc2tzW2tleV0gPSBwYXJhbXMuY29uY2F0KHBhcmFtcy5sZW5ndGggPiAwID8gbmV3VGFzayA6IHRhc2tGbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2tGbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdXRvSW5qZWN0IHRhc2sgZnVuY3Rpb25zIHJlcXVpcmUgZXhwbGljaXQgcGFyYW1ldGVycy5cIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2tGbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBubyBkZXBlbmRlbmNpZXMsIHVzZSB0aGUgZnVuY3Rpb24gYXMtaXNcbiAgICAgICAgICAgICAgICBuZXdUYXNrc1trZXldID0gdGFza0ZuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJzZVBhcmFtcyh0YXNrRm4pO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5wb3AoKTtcblxuICAgICAgICAgICAgICAgIG5ld1Rhc2tzW2tleV0gPSBwYXJhbXMuY29uY2F0KG5ld1Rhc2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBuZXdUYXNrKHJlc3VsdHMsIHRhc2tDYikge1xuICAgICAgICAgICAgICAgIHZhciBuZXdBcmdzID0gYXJyYXlNYXAocGFyYW1zLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2godGFza0NiKTtcbiAgICAgICAgICAgICAgICB0YXNrRm4uYXBwbHkobnVsbCwgbmV3QXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF1dG8obmV3VGFza3MsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB2YXIgaGFzU2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBzZXRJbW1lZGlhdGU7XG4gICAgdmFyIGhhc05leHRUaWNrID0gdHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwcm9jZXNzLm5leHRUaWNrID09PSAnZnVuY3Rpb24nO1xuXG4gICAgZnVuY3Rpb24gZmFsbGJhY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JhcChkZWZlcikge1xuICAgICAgICByZXR1cm4gcmVzdChmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgICAgIGRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgX2RlZmVyO1xuXG4gICAgaWYgKGhhc1NldEltbWVkaWF0ZSkge1xuICAgICAgICBfZGVmZXIgPSBzZXRJbW1lZGlhdGU7XG4gICAgfSBlbHNlIGlmIChoYXNOZXh0VGljaykge1xuICAgICAgICBfZGVmZXIgPSBwcm9jZXNzLm5leHRUaWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9kZWZlciA9IGZhbGxiYWNrO1xuICAgIH1cblxuICAgIHZhciBzZXRJbW1lZGlhdGUkMSA9IHdyYXAoX2RlZmVyKTtcblxuICAgIGZ1bmN0aW9uIHF1ZXVlKHdvcmtlciwgY29uY3VycmVuY3ksIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKGNvbmN1cnJlbmN5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25jdXJyZW5jeSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25jdXJyZW5jeSBtdXN0IG5vdCBiZSB6ZXJvJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2luc2VydChxLCBkYXRhLCBwb3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCAmJiBxLmlkbGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJhaW4gaW1tZWRpYXRlbHkgaWYgdGhlcmUgYXJlIG5vIHRhc2tzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZSQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJyYXlFYWNoKGRhdGEsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayB8fCBub29wXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcS50YXNrcy51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHEudGFza3MucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldEltbWVkaWF0ZSQxKHEucHJvY2Vzcyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX25leHQocSwgdGFza3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgd29ya2VycyAtPSAxO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICBhcnJheUVhY2godGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5RWFjaCh3b3JrZXJzTGlzdCwgZnVuY3Rpb24gKHdvcmtlciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZXIgPT09IHRhc2sgJiYgIXJlbW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0YXNrLmNhbGxiYWNrLmFwcGx5KHRhc2ssIGFyZ3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHEuZXJyb3IoYXJnc1swXSwgdGFzay5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtlcnMgPD0gcS5jb25jdXJyZW5jeSAtIHEuYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHEudW5zYXR1cmF0ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggKyB3b3JrZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcS5wcm9jZXNzKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdvcmtlcnMgPSAwO1xuICAgICAgICB2YXIgd29ya2Vyc0xpc3QgPSBbXTtcbiAgICAgICAgdmFyIHEgPSB7XG4gICAgICAgICAgICB0YXNrczogW10sXG4gICAgICAgICAgICBjb25jdXJyZW5jeTogY29uY3VycmVuY3ksXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgc2F0dXJhdGVkOiBub29wLFxuICAgICAgICAgICAgdW5zYXR1cmF0ZWQ6IG5vb3AsXG4gICAgICAgICAgICBidWZmZXI6IGNvbmN1cnJlbmN5IC8gNCxcbiAgICAgICAgICAgIGVtcHR5OiBub29wLFxuICAgICAgICAgICAgZHJhaW46IG5vb3AsXG4gICAgICAgICAgICBlcnJvcjogbm9vcCxcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgZmFsc2UsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBraWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcS5kcmFpbiA9IG5vb3A7XG4gICAgICAgICAgICAgICAgcS50YXNrcyA9IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVuc2hpZnQ6IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIF9pbnNlcnQocSwgZGF0YSwgdHJ1ZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIXEucGF1c2VkICYmIHdvcmtlcnMgPCBxLmNvbmN1cnJlbmN5ICYmIHEudGFza3MubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2tzID0gcS5wYXlsb2FkID8gcS50YXNrcy5zcGxpY2UoMCwgcS5wYXlsb2FkKSA6IHEudGFza3Muc3BsaWNlKDAsIHEudGFza3MubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGFycmF5TWFwKHRhc2tzLCBiYXNlUHJvcGVydHkoJ2RhdGEnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHEudGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd29ya2VycyArPSAxO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJzTGlzdC5wdXNoKHRhc2tzWzBdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAod29ya2VycyA9PT0gcS5jb25jdXJyZW5jeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcS5zYXR1cmF0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYiA9IG9ubHlPbmNlKF9uZXh0KHEsIHRhc2tzKSk7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcihkYXRhLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlbmd0aDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxLnRhc2tzLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5uaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlcnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd29ya2Vyc0xpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2Vyc0xpc3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWRsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxLnRhc2tzLmxlbmd0aCArIHdvcmtlcnMgPT09IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBxLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHEucGF1c2VkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHEucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VtZUNvdW50ID0gTWF0aC5taW4ocS5jb25jdXJyZW5jeSwgcS50YXNrcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY2FsbCBxLnByb2Nlc3Mgb25jZSBwZXIgY29uY3VycmVudFxuICAgICAgICAgICAgICAgIC8vIHdvcmtlciB0byBwcmVzZXJ2ZSBmdWxsIGNvbmN1cnJlbmN5IGFmdGVyIHBhdXNlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdyA9IDE7IHcgPD0gcmVzdW1lQ291bnQ7IHcrKykge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUkMShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjYXJnbyBvZiB0YXNrcyBmb3IgdGhlIHdvcmtlciBmdW5jdGlvbiB0byBjb21wbGV0ZS4gQ2FyZ28gaW5oZXJpdHMgYWxsIG9mXG4gICAgICogdGhlIHNhbWUgbWV0aG9kcyBhbmQgZXZlbnQgY2FsbGJhY2tzIGFzIHtAbGluayBhc3luYy5xdWV1ZX0uXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gY2FyZ29cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBsZW5ndGggLSBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgbnVtYmVyIG9mIGl0ZW1zXG4gICAgICogd2FpdGluZyB0byBiZSBwcm9jZXNzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwYXlsb2FkIC0gQW4gYGludGVnZXJgIGZvciBkZXRlcm1pbmluZyBob3cgbWFueSB0YXNrc1xuICAgICAqIHNob3VsZCBiZSBwcm9jZXNzIHBlciByb3VuZC4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgY2hhbmdlZCBhZnRlciBhIGBjYXJnb2AgaXNcbiAgICAgKiBjcmVhdGVkIHRvIGFsdGVyIHRoZSBwYXlsb2FkIG9uLXRoZS1mbHkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcHVzaCAtIEFkZHMgYHRhc2tgIHRvIHRoZSBgcXVldWVgLiBUaGUgY2FsbGJhY2sgaXNcbiAgICAgKiBjYWxsZWQgb25jZSB0aGUgYHdvcmtlcmAgaGFzIGZpbmlzaGVkIHByb2Nlc3NpbmcgdGhlIHRhc2suIEluc3RlYWQgb2YgYVxuICAgICAqIHNpbmdsZSB0YXNrLCBhbiBhcnJheSBvZiBgdGFza3NgIGNhbiBiZSBzdWJtaXR0ZWQuIFRoZSByZXNwZWN0aXZlIGNhbGxiYWNrIGlzXG4gICAgICogdXNlZCBmb3IgZXZlcnkgdGFzayBpbiB0aGUgbGlzdC4gSW52b2tlIHdpdGggKHRhc2ssIFtjYWxsYmFja10pLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHNhdHVyYXRlZCAtIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGVcbiAgICAgKiBgcXVldWUubGVuZ3RoKClgIGhpdHMgdGhlIGNvbmN1cnJlbmN5IGFuZCBmdXJ0aGVyIHRhc2tzIHdpbGwgYmUgcXVldWVkLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGVtcHR5IC0gQSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBsYXN0IGl0ZW1cbiAgICAgKiBmcm9tIHRoZSBgcXVldWVgIGlzIGdpdmVuIHRvIGEgYHdvcmtlcmAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZHJhaW4gLSBBIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGxhc3QgaXRlbVxuICAgICAqIGZyb20gdGhlIGBxdWV1ZWAgaGFzIHJldHVybmVkIGZyb20gdGhlIGB3b3JrZXJgLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGlkbGUgLSBhIGZ1bmN0aW9uIHJldHVybmluZyBmYWxzZSBpZiB0aGVyZSBhcmUgaXRlbXNcbiAgICAgKiB3YWl0aW5nIG9yIGJlaW5nIHByb2Nlc3NlZCwgb3IgdHJ1ZSBpZiBub3QuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHBhdXNlIC0gYSBmdW5jdGlvbiB0aGF0IHBhdXNlcyB0aGUgcHJvY2Vzc2luZyBvZiB0YXNrc1xuICAgICAqIHVudGlsIGByZXN1bWUoKWAgaXMgY2FsbGVkLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSByZXN1bWUgLSBhIGZ1bmN0aW9uIHRoYXQgcmVzdW1lcyB0aGUgcHJvY2Vzc2luZyBvZlxuICAgICAqIHF1ZXVlZCB0YXNrcyB3aGVuIHRoZSBxdWV1ZSBpcyBwYXVzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGtpbGwgLSBhIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgYGRyYWluYCBjYWxsYmFjayBhbmRcbiAgICAgKiBlbXB0aWVzIHJlbWFpbmluZyB0YXNrcyBmcm9tIHRoZSBxdWV1ZSBmb3JjaW5nIGl0IHRvIGdvIGlkbGUuIEludm9rZSB3aXRoICgpLlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGBjYXJnb2Agb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBwYXlsb2FkLiBUYXNrcyBhZGRlZCB0byB0aGVcbiAgICAgKiBjYXJnbyB3aWxsIGJlIHByb2Nlc3NlZCBhbHRvZ2V0aGVyICh1cCB0byB0aGUgYHBheWxvYWRgIGxpbWl0KS4gSWYgdGhlXG4gICAgICogYHdvcmtlcmAgaXMgaW4gcHJvZ3Jlc3MsIHRoZSB0YXNrIGlzIHF1ZXVlZCB1bnRpbCBpdCBiZWNvbWVzIGF2YWlsYWJsZS4gT25jZVxuICAgICAqIHRoZSBgd29ya2VyYCBoYXMgY29tcGxldGVkIHNvbWUgdGFza3MsIGVhY2ggY2FsbGJhY2sgb2YgdGhvc2UgdGFza3MgaXNcbiAgICAgKiBjYWxsZWQuIENoZWNrIG91dCBbdGhlc2VdKGh0dHBzOi8vY2Ftby5naXRodWJ1c2VyY29udGVudC5jb20vNmJiZDM2ZjRjZjViMzVhMGYxMWE5NmRjZDJlOTc3MTFmZmMyZmIzNy82ODc0NzQ3MDczM2EyZjJmNjYyZTYzNmM2Zjc1NjQyZTY3Njk3NDY4NzU2MjJlNjM2ZjZkMmY2MTczNzM2NTc0NzMyZjMxMzYzNzM2MzgzNzMxMmYzNjM4MzEzMDM4MmY2MjYyNjMzMDYzNjY2MjMwMmQzNTY2MzIzOTJkMzEzMTY1MzIyZDM5MzczNDY2MmQzMzMzMzkzNzYzMzYzNDY0NjMzODM1MzgyZTY3Njk2NikgW2FuaW1hdGlvbnNdKGh0dHBzOi8vY2Ftby5naXRodWJ1c2VyY29udGVudC5jb20vZjQ4MTBlMDBlMWM1ZjVmOGFkZGJlM2U5ZjQ5MDY0ZmQ1ZDEwMjY5OS82ODc0NzQ3MDczM2EyZjJmNjYyZTYzNmM2Zjc1NjQyZTY3Njk3NDY4NzU2MjJlNjM2ZjZkMmY2MTczNzM2NTc0NzMyZjMxMzYzNzM2MzgzNzMxMmYzNjM4MzEzMDMxMmYzODM0NjMzOTMyMzAzNjM2MmQzNTY2MzIzOTJkMzEzMTY1MzIyZDM4MzEzNDY2MmQzOTY0MzM2NDMwMzIzNDMxMzM2MjY2NjQyZTY3Njk2NilcbiAgICAgKiBmb3IgaG93IGBjYXJnb2AgYW5kIGBxdWV1ZWAgd29yay5cbiAgICAgKlxuICAgICAqIFdoaWxlIFtxdWV1ZV0oI3F1ZXVlKSBwYXNzZXMgb25seSBvbmUgdGFzayB0byBvbmUgb2YgYSBncm91cCBvZiB3b3JrZXJzXG4gICAgICogYXQgYSB0aW1lLCBjYXJnbyBwYXNzZXMgYW4gYXJyYXkgb2YgdGFza3MgdG8gYSBzaW5nbGUgd29ya2VyLCByZXBlYXRpbmdcbiAgICAgKiB3aGVuIHRoZSB3b3JrZXIgaXMgZmluaXNoZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBjYXJnb1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnF1ZXVlXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHdvcmtlciAtIEFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBmb3IgcHJvY2Vzc2luZyBhbiBhcnJheVxuICAgICAqIG9mIHF1ZXVlZCB0YXNrcywgd2hpY2ggbXVzdCBjYWxsIGl0cyBgY2FsbGJhY2soZXJyKWAgYXJndW1lbnQgd2hlbiBmaW5pc2hlZCxcbiAgICAgKiB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKHRhc2tzLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXlsb2FkPUluZmluaXR5XSAtIEFuIG9wdGlvbmFsIGBpbnRlZ2VyYCBmb3IgZGV0ZXJtaW5pbmdcbiAgICAgKiBob3cgbWFueSB0YXNrcyBzaG91bGQgYmUgcHJvY2Vzc2VkIHBlciByb3VuZDsgaWYgb21pdHRlZCwgdGhlIGRlZmF1bHQgaXNcbiAgICAgKiB1bmxpbWl0ZWQuXG4gICAgICogQHJldHVybnMge2NhcmdvfSBBIGNhcmdvIG9iamVjdCB0byBtYW5hZ2UgdGhlIHRhc2tzLiBDYWxsYmFja3MgY2FuXG4gICAgICogYXR0YWNoZWQgYXMgY2VydGFpbiBwcm9wZXJ0aWVzIHRvIGxpc3RlbiBmb3Igc3BlY2lmaWMgZXZlbnRzIGR1cmluZyB0aGVcbiAgICAgKiBsaWZlY3ljbGUgb2YgdGhlIGNhcmdvIGFuZCBpbm5lciBxdWV1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gY3JlYXRlIGEgY2FyZ28gb2JqZWN0IHdpdGggcGF5bG9hZCAyXG4gICAgICogdmFyIGNhcmdvID0gYXN5bmMuY2FyZ28oZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZvciAodmFyIGk9MDsgaTx0YXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvICcgKyB0YXNrc1tpXS5uYW1lKTtcbiAgICAgKiAgICAgfVxuICAgICAqICAgICBjYWxsYmFjaygpO1xuICAgICAqIH0sIDIpO1xuICAgICAqXG4gICAgICogLy8gYWRkIHNvbWUgaXRlbXNcbiAgICAgKiBjYXJnby5wdXNoKHtuYW1lOiAnZm9vJ30sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcHJvY2Vzc2luZyBmb28nKTtcbiAgICAgKiB9KTtcbiAgICAgKiBjYXJnby5wdXNoKHtuYW1lOiAnYmFyJ30sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcHJvY2Vzc2luZyBiYXInKTtcbiAgICAgKiB9KTtcbiAgICAgKiBjYXJnby5wdXNoKHtuYW1lOiAnYmF6J30sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcHJvY2Vzc2luZyBiYXonKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjYXJnbyh3b3JrZXIsIHBheWxvYWQpIHtcbiAgICAgIHJldHVybiBxdWV1ZSh3b3JrZXIsIDEsIHBheWxvYWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBlYWNoT2ZgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYVxuICAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoT2ZMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmVhY2hPZlxuICAgICAqIEBhbGlhcyBmb3JFYWNoT2ZMaW1pdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaFxuICAgICAqIGl0ZW0gaW4gYGNvbGxgLiBUaGUgYGtleWAgaXMgdGhlIGl0ZW0ncyBrZXksIG9yIGluZGV4IGluIHRoZSBjYXNlIG9mIGFuXG4gICAgICogYXJyYXkuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdFxuICAgICAqIGhhcyBjb21wbGV0ZWQuIElmIG5vIGVycm9yIGhhcyBvY2N1cnJlZCwgdGhlIGNhbGxiYWNrIHNob3VsZCBiZSBydW4gd2l0aG91dFxuICAgICAqIGFyZ3VtZW50cyBvciB3aXRoIGFuIGV4cGxpY2l0IGBudWxsYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoXG4gICAgICogKGl0ZW0sIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVhY2hPZkxpbWl0KG9iaiwgbGltaXQsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgX2VhY2hPZkxpbWl0KGxpbWl0KShvYmosIGl0ZXJhdGVlLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hPZmAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZWFjaE9mU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZWFjaE9mXG4gICAgICogQGFsaWFzIGZvckVhY2hPZlNlcmllc1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLiBUaGVcbiAgICAgKiBga2V5YCBpcyB0aGUgaXRlbSdzIGtleSwgb3IgaW5kZXggaW4gdGhlIGNhc2Ugb2YgYW4gYXJyYXkuIFRoZSBpdGVyYXRlZSBpc1xuICAgICAqIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIElmIG5vXG4gICAgICogZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGJlIHJ1biB3aXRob3V0IGFyZ3VtZW50cyBvciB3aXRoIGFuXG4gICAgICogZXhwbGljaXQgYG51bGxgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGl0ZW0sIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqL1xuICAgIHZhciBlYWNoT2ZTZXJpZXMgPSBkb0xpbWl0KGVhY2hPZkxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIFJlZHVjZXMgYGNvbGxgIGludG8gYSBzaW5nbGUgdmFsdWUgdXNpbmcgYW4gYXN5bmMgYGl0ZXJhdGVlYCB0byByZXR1cm4gZWFjaFxuICAgICAqIHN1Y2Nlc3NpdmUgc3RlcC4gYG1lbW9gIGlzIHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSByZWR1Y3Rpb24uIFRoaXMgZnVuY3Rpb25cbiAgICAgKiBvbmx5IG9wZXJhdGVzIGluIHNlcmllcy5cbiAgICAgKlxuICAgICAqIEZvciBwZXJmb3JtYW5jZSByZWFzb25zLCBpdCBtYXkgbWFrZSBzZW5zZSB0byBzcGxpdCBhIGNhbGwgdG8gdGhpcyBmdW5jdGlvblxuICAgICAqIGludG8gYSBwYXJhbGxlbCBtYXAsIGFuZCB0aGVuIHVzZSB0aGUgbm9ybWFsIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBvbiB0aGVcbiAgICAgKiByZXN1bHRzLiBUaGlzIGZ1bmN0aW9uIGlzIGZvciBzaXR1YXRpb25zIHdoZXJlIGVhY2ggc3RlcCBpbiB0aGUgcmVkdWN0aW9uXG4gICAgICogbmVlZHMgdG8gYmUgYXN5bmM7IGlmIHlvdSBjYW4gZ2V0IHRoZSBkYXRhIGJlZm9yZSByZWR1Y2luZyBpdCwgdGhlbiBpdCdzXG4gICAgICogcHJvYmFibHkgYSBnb29kIGlkZWEgdG8gZG8gc28uXG4gICAgICpcbiAgICAgKiBAbmFtZSByZWR1Y2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIGluamVjdCwgZm9sZGxcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0geyp9IG1lbW8gLSBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgcmVkdWN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiBhcHBsaWVkIHRvIGVhY2ggaXRlbSBpbiB0aGVcbiAgICAgKiBhcnJheSB0byBwcm9kdWNlIHRoZSBuZXh0IHN0ZXAgaW4gdGhlIHJlZHVjdGlvbi4gVGhlIGBpdGVyYXRlZWAgaXMgcGFzc2VkIGFcbiAgICAgKiBgY2FsbGJhY2soZXJyLCByZWR1Y3Rpb24pYCB3aGljaCBhY2NlcHRzIGFuIG9wdGlvbmFsIGVycm9yIGFzIGl0cyBmaXJzdFxuICAgICAqIGFyZ3VtZW50LCBhbmQgdGhlIHN0YXRlIG9mIHRoZSByZWR1Y3Rpb24gYXMgdGhlIHNlY29uZC4gSWYgYW4gZXJyb3IgaXNcbiAgICAgKiBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrLCB0aGUgcmVkdWN0aW9uIGlzIHN0b3BwZWQgYW5kIHRoZSBtYWluIGBjYWxsYmFja2AgaXNcbiAgICAgKiBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGUgZXJyb3IuIEludm9rZWQgd2l0aCAobWVtbywgaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gUmVzdWx0IGlzIHRoZSByZWR1Y2VkIHZhbHVlLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5yZWR1Y2UoWzEsMiwzXSwgMCwgZnVuY3Rpb24obWVtbywgaXRlbSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgLy8gcG9pbnRsZXNzIGFzeW5jOlxuICAgICAqICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgbWVtbyArIGl0ZW0pXG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBpcyBub3cgZXF1YWwgdG8gdGhlIGxhc3QgdmFsdWUgb2YgbWVtbywgd2hpY2ggaXMgNlxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZHVjZShhcnIsIG1lbW8sIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICBlYWNoT2ZTZXJpZXMoYXJyLCBmdW5jdGlvbiAoeCwgaSwgY2IpIHtcbiAgICAgICAgICAgIGl0ZXJhdGVlKG1lbW8sIHgsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICBtZW1vID0gdjtcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNiKGVyciwgbWVtbyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZlcnNpb24gb2YgdGhlIGNvbXBvc2UgZnVuY3Rpb24gdGhhdCBpcyBtb3JlIG5hdHVyYWwgdG8gcmVhZC4gRWFjaCBmdW5jdGlvblxuICAgICAqIGNvbnN1bWVzIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIHByZXZpb3VzIGZ1bmN0aW9uLiBJdCBpcyB0aGUgZXF1aXZhbGVudCBvZlxuICAgICAqIHtAbGluayBhc3luYy5jb21wb3NlfSB3aXRoIHRoZSBhcmd1bWVudHMgcmV2ZXJzZWQuXG4gICAgICpcbiAgICAgKiBFYWNoIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjb21wb3NlZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBuYW1lIHNlcVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmNvbXBvc2VcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zIC0gdGhlIGFzeW5jaHJvbm91cyBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBSZXF1aXJlcyBsb2Rhc2ggKG9yIHVuZGVyc2NvcmUpLCBleHByZXNzMyBhbmQgZHJlc2VuZGUncyBvcm0yLlxuICAgICAqIC8vIFBhcnQgb2YgYW4gYXBwLCB0aGF0IGZldGNoZXMgY2F0cyBvZiB0aGUgbG9nZ2VkIHVzZXIuXG4gICAgICogLy8gVGhpcyBleGFtcGxlIHVzZXMgYHNlcWAgZnVuY3Rpb24gdG8gYXZvaWQgb3Zlcm5lc3RpbmcgYW5kIGVycm9yXG4gICAgICogLy8gaGFuZGxpbmcgY2x1dHRlci5cbiAgICAgKiBhcHAuZ2V0KCcvY2F0cycsIGZ1bmN0aW9uKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgICogICAgIHZhciBVc2VyID0gcmVxdWVzdC5tb2RlbHMuVXNlcjtcbiAgICAgKiAgICAgYXN5bmMuc2VxKFxuICAgICAqICAgICAgICAgXy5iaW5kKFVzZXIuZ2V0LCBVc2VyKSwgIC8vICdVc2VyLmdldCcgaGFzIHNpZ25hdHVyZSAoaWQsIGNhbGxiYWNrKGVyciwgZGF0YSkpXG4gICAgICogICAgICAgICBmdW5jdGlvbih1c2VyLCBmbikge1xuICAgICAqICAgICAgICAgICAgIHVzZXIuZ2V0Q2F0cyhmbik7ICAgICAgLy8gJ2dldENhdHMnIGhhcyBzaWduYXR1cmUgKGNhbGxiYWNrKGVyciwgZGF0YSkpXG4gICAgICogICAgICAgICB9XG4gICAgICogICAgICkocmVxLnNlc3Npb24udXNlcl9pZCwgZnVuY3Rpb24gKGVyciwgY2F0cykge1xuICAgICAqICAgICAgICAgaWYgKGVycikge1xuICAgICAqICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgKiAgICAgICAgICAgICByZXNwb25zZS5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcbiAgICAgKiAgICAgICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgICAgICAgcmVzcG9uc2UuanNvbih7IHN0YXR1czogJ29rJywgbWVzc2FnZTogJ0NhdHMgZm91bmQnLCBkYXRhOiBjYXRzIH0pO1xuICAgICAqICAgICAgICAgfVxuICAgICAqICAgICB9KTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXEoKSAvKiBmdW5jdGlvbnMuLi4gKi97XG4gICAgICAgIHZhciBmbnMgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBjYiA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNiID0gbm9vcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVkdWNlKGZucywgYXJncywgZnVuY3Rpb24gKG5ld2FyZ3MsIGZuLCBjYikge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIG5ld2FyZ3MuY29uY2F0KFtyZXN0KGZ1bmN0aW9uIChlcnIsIG5leHRhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKGVyciwgbmV4dGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pXSkpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGNiLmFwcGx5KHRoYXQsIFtlcnJdLmNvbmNhdChyZXN1bHRzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHJldmVyc2UgPSBBcnJheS5wcm90b3R5cGUucmV2ZXJzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB3aGljaCBpcyBhIGNvbXBvc2l0aW9uIG9mIHRoZSBwYXNzZWQgYXN5bmNocm9ub3VzXG4gICAgICogZnVuY3Rpb25zLiBFYWNoIGZ1bmN0aW9uIGNvbnN1bWVzIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiBmb2xsb3dzLiBDb21wb3NpbmcgZnVuY3Rpb25zIGBmKClgLCBgZygpYCwgYW5kIGBoKClgIHdvdWxkIHByb2R1Y2UgdGhlIHJlc3VsdFxuICAgICAqIG9mIGBmKGcoaCgpKSlgLCBvbmx5IHRoaXMgdmVyc2lvbiB1c2VzIGNhbGxiYWNrcyB0byBvYnRhaW4gdGhlIHJldHVybiB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBFYWNoIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjb21wb3NlZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNvbXBvc2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9ucyAtIHRoZSBhc3luY2hyb25vdXMgZnVuY3Rpb25zIHRvIGNvbXBvc2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gYWRkMShuLCBjYWxsYmFjaykge1xuICAgICAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIG4gKyAxKTtcbiAgICAgKiAgICAgfSwgMTApO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIG11bDMobiwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCBuICogMyk7XG4gICAgICogICAgIH0sIDEwKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiB2YXIgYWRkMW11bDMgPSBhc3luYy5jb21wb3NlKG11bDMsIGFkZDEpO1xuICAgICAqIGFkZDFtdWwzKDQsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgbm93IGVxdWFscyAxNVxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXBvc2UoKSAvKiBmdW5jdGlvbnMuLi4gKi97XG4gICAgICByZXR1cm4gc2VxLmFwcGx5KG51bGwsIHJldmVyc2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25jYXQkMShlYWNoZm4sIGFyciwgZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHgsIGluZGV4LCBjYikge1xuICAgICAgICAgICAgZm4oeCwgZnVuY3Rpb24gKGVyciwgeSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoeSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpa2UgYGVhY2hgLCBleGNlcHQgdGhhdCBpdCBwYXNzZXMgdGhlIGtleSAob3IgaW5kZXgpIGFzIHRoZSBzZWNvbmQgYXJndW1lbnRcbiAgICAgKiB0byB0aGUgaXRlcmF0ZWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoT2ZcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIGZvckVhY2hPZlxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoXG4gICAgICogaXRlbSBpbiBgY29sbGAuIFRoZSBga2V5YCBpcyB0aGUgaXRlbSdzIGtleSwgb3IgaW5kZXggaW4gdGhlIGNhc2Ugb2YgYW5cbiAgICAgKiBhcnJheS4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0XG4gICAgICogaGFzIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGJlIHJ1biB3aXRob3V0XG4gICAgICogYXJndW1lbnRzIG9yIHdpdGggYW4gZXhwbGljaXQgYG51bGxgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGhcbiAgICAgKiAoaXRlbSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBvYmogPSB7ZGV2OiBcIi9kZXYuanNvblwiLCB0ZXN0OiBcIi90ZXN0Lmpzb25cIiwgcHJvZDogXCIvcHJvZC5qc29uXCJ9O1xuICAgICAqIHZhciBjb25maWdzID0ge307XG4gICAgICpcbiAgICAgKiBhc3luYy5mb3JFYWNoT2Yob2JqLCBmdW5jdGlvbiAodmFsdWUsIGtleSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZnMucmVhZEZpbGUoX19kaXJuYW1lICsgdmFsdWUsIFwidXRmOFwiLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICogICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgKiAgICAgICAgIHRyeSB7XG4gICAgICogICAgICAgICAgICAgY29uZmlnc1trZXldID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgKiAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgKiAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgICogICAgICAgICB9XG4gICAgICogICAgICAgICBjYWxsYmFjaygpO1xuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICogICAgIGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAqICAgICAvLyBjb25maWdzIGlzIG5vdyBhIG1hcCBvZiBKU09OIGRhdGFcbiAgICAgKiAgICAgZG9Tb21ldGhpbmdXaXRoKGNvbmZpZ3MpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBlYWNoT2YgPSBkb0xpbWl0KGVhY2hPZkxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICBmdW5jdGlvbiBkb1BhcmFsbGVsKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihlYWNoT2YsIG9iaiwgaXRlcmF0ZWUsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGBpdGVyYXRlZWAgdG8gZWFjaCBpdGVtIGluIGBjb2xsYCwgY29uY2F0ZW5hdGluZyB0aGUgcmVzdWx0cy4gUmV0dXJuc1xuICAgICAqIHRoZSBjb25jYXRlbmF0ZWQgbGlzdC4gVGhlIGBpdGVyYXRlZWBzIGFyZSBjYWxsZWQgaW4gcGFyYWxsZWwsIGFuZCB0aGVcbiAgICAgKiByZXN1bHRzIGFyZSBjb25jYXRlbmF0ZWQgYXMgdGhleSByZXR1cm4uIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZVxuICAgICAqIHJlc3VsdHMgYXJyYXkgd2lsbCBiZSByZXR1cm5lZCBpbiB0aGUgb3JpZ2luYWwgb3JkZXIgb2YgYGNvbGxgIHBhc3NlZCB0byB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQG5hbWUgY29uY2F0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHRzKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZVxuICAgICAqIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFuIGFycmF5IG9mIHJlc3VsdHMuXG4gICAgICogSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrKGVycildIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0cyBpcyBhbiBhcnJheVxuICAgICAqIGNvbnRhaW5pbmcgdGhlIGNvbmNhdGVuYXRlZCByZXN1bHRzIG9mIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9uLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuY29uY2F0KFsnZGlyMScsJ2RpcjInLCdkaXIzJ10sIGZzLnJlYWRkaXIsIGZ1bmN0aW9uKGVyciwgZmlsZXMpIHtcbiAgICAgKiAgICAgLy8gZmlsZXMgaXMgbm93IGEgbGlzdCBvZiBmaWxlbmFtZXMgdGhhdCBleGlzdCBpbiB0aGUgMyBkaXJlY3Rvcmllc1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBjb25jYXQgPSBkb1BhcmFsbGVsKGNvbmNhdCQxKTtcblxuICAgIGZ1bmN0aW9uIGRvU2VyaWVzKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihlYWNoT2ZTZXJpZXMsIG9iaiwgaXRlcmF0ZWUsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgY29uY2F0YCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBjb25jYXRTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5jb25jYXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0cylgIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2VcbiAgICAgKiBpdCBoYXMgY29tcGxldGVkIHdpdGggYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbiBhcnJheSBvZiByZXN1bHRzLlxuICAgICAqIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFjayhlcnIpXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgYW4gYXJyYXlcbiAgICAgKiBjb250YWluaW5nIHRoZSBjb25jYXRlbmF0ZWQgcmVzdWx0cyBvZiB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbi4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIGNvbmNhdFNlcmllcyA9IGRvU2VyaWVzKGNvbmNhdCQxKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdoZW4gY2FsbGVkLCBjYWxscy1iYWNrIHdpdGggdGhlIHZhbHVlcyBwcm92aWRlZC5cbiAgICAgKiBVc2VmdWwgYXMgdGhlIGZpcnN0IGZ1bmN0aW9uIGluIGEgYHdhdGVyZmFsbGAsIG9yIGZvciBwbHVnZ2luZyB2YWx1ZXMgaW4gdG9cbiAgICAgKiBgYXV0b2AuXG4gICAgICpcbiAgICAgKiBAbmFtZSBjb25zdGFudFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJndW1lbnRzLi4uIC0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgdG8gYXV0b21hdGljYWxseSBpbnZva2VcbiAgICAgKiBjYWxsYmFjayB3aXRoLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBpbnZva2VkLCBhdXRvbWF0aWNhbGx5XG4gICAgICogaW52b2tlcyB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgcHJldmlvdXMgZ2l2ZW4gYXJndW1lbnRzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy53YXRlcmZhbGwoW1xuICAgICAqICAgICBhc3luYy5jb25zdGFudCg0MiksXG4gICAgICogICAgIGZ1bmN0aW9uICh2YWx1ZSwgbmV4dCkge1xuICAgICAqICAgICAgICAgLy8gdmFsdWUgPT09IDQyXG4gICAgICogICAgIH0sXG4gICAgICogICAgIC8vLi4uXG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogYXN5bmMud2F0ZXJmYWxsKFtcbiAgICAgKiAgICAgYXN5bmMuY29uc3RhbnQoZmlsZW5hbWUsIFwidXRmOFwiKSxcbiAgICAgKiAgICAgZnMucmVhZEZpbGUsXG4gICAgICogICAgIGZ1bmN0aW9uIChmaWxlRGF0YSwgbmV4dCkge1xuICAgICAqICAgICAgICAgLy8uLi5cbiAgICAgKiAgICAgfVxuICAgICAqICAgICAvLy4uLlxuICAgICAqIF0sIGNhbGxiYWNrKTtcbiAgICAgKlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICBob3N0bmFtZTogYXN5bmMuY29uc3RhbnQoXCJodHRwczovL3NlcnZlci5uZXQvXCIpLFxuICAgICAqICAgICBwb3J0OiBmaW5kRnJlZVBvcnQsXG4gICAgICogICAgIGxhdW5jaFNlcnZlcjogW1wiaG9zdG5hbWVcIiwgXCJwb3J0XCIsIGZ1bmN0aW9uIChvcHRpb25zLCBjYikge1xuICAgICAqICAgICAgICAgc3RhcnRTZXJ2ZXIob3B0aW9ucywgY2IpO1xuICAgICAqICAgICB9XSxcbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiB9LCBjYWxsYmFjayk7XG4gICAgICovXG4gICAgdmFyIGNvbnN0YW50ID0gcmVzdChmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgIHZhciBhcmdzID0gW251bGxdLmNvbmNhdCh2YWx1ZXMpO1xuICAgICAgICByZXR1cm4gaW5pdGlhbFBhcmFtcyhmdW5jdGlvbiAoaWdub3JlZEFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZVRlc3RlcihlYWNoZm4sIGNoZWNrLCBnZXRSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGxpbWl0LCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBnZXRSZXN1bHQoZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyYXBwZWRJdGVyYXRlZSh4LCBfLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIGl0ZXJhdGVlKHgsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdGVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZ2V0UmVzdWx0KHRydWUsIHgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdGVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIGNiID0gY2IgfHwgbm9vcDtcbiAgICAgICAgICAgICAgICBlYWNoZm4oYXJyLCBsaW1pdCwgd3JhcHBlZEl0ZXJhdGVlLCBkb25lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2IgPSBpdGVyYXRlZTtcbiAgICAgICAgICAgICAgICBjYiA9IGNiIHx8IG5vb3A7XG4gICAgICAgICAgICAgICAgaXRlcmF0ZWUgPSBsaW1pdDtcbiAgICAgICAgICAgICAgICBlYWNoZm4oYXJyLCB3cmFwcGVkSXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9maW5kR2V0UmVzdWx0KHYsIHgpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgdmFsdWUgaW4gYGNvbGxgIHRoYXQgcGFzc2VzIGFuIGFzeW5jIHRydXRoIHRlc3QuIFRoZVxuICAgICAqIGBpdGVyYXRlZWAgaXMgYXBwbGllZCBpbiBwYXJhbGxlbCwgbWVhbmluZyB0aGUgZmlyc3QgaXRlcmF0ZWUgdG8gcmV0dXJuXG4gICAgICogYHRydWVgIHdpbGwgZmlyZSB0aGUgZGV0ZWN0IGBjYWxsYmFja2Agd2l0aCB0aGF0IHJlc3VsdC4gVGhhdCBtZWFucyB0aGVcbiAgICAgKiByZXN1bHQgbWlnaHQgbm90IGJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBvcmlnaW5hbCBgY29sbGAgKGluIHRlcm1zIG9mIG9yZGVyKVxuICAgICAqIHRoYXQgcGFzc2VzIHRoZSB0ZXN0LlxuXG4gICAgICogSWYgb3JkZXIgd2l0aGluIHRoZSBvcmlnaW5hbCBgY29sbGAgaXMgaW1wb3J0YW50LCB0aGVuIGxvb2sgYXRcbiAgICAgKiBgZGV0ZWN0U2VyaWVzYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGRldGVjdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgZmluZFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC5cbiAgICAgKiBSZXN1bHQgd2lsbCBiZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgYXJyYXkgdGhhdCBwYXNzZXMgdGhlIHRydXRoIHRlc3RcbiAgICAgKiAoaXRlcmF0ZWUpIG9yIHRoZSB2YWx1ZSBgdW5kZWZpbmVkYCBpZiBub25lIHBhc3NlZC4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuZGV0ZWN0KFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGVQYXRoLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5hY2Nlc3MoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgIWVycilcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IG5vdyBlcXVhbHMgdGhlIGZpcnN0IGZpbGUgaW4gdGhlIGxpc3QgdGhhdCBleGlzdHNcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgZGV0ZWN0ID0gX2NyZWF0ZVRlc3RlcihlYWNoT2YsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZGV0ZWN0YCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZGV0ZWN0TGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5kZXRlY3RcbiAgICAgKiBAYWxpYXMgZmluZExpbWl0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC5cbiAgICAgKiBSZXN1bHQgd2lsbCBiZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgYXJyYXkgdGhhdCBwYXNzZXMgdGhlIHRydXRoIHRlc3RcbiAgICAgKiAoaXRlcmF0ZWUpIG9yIHRoZSB2YWx1ZSBgdW5kZWZpbmVkYCBpZiBub25lIHBhc3NlZC4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgZGV0ZWN0TGltaXQgPSBfY3JlYXRlVGVzdGVyKGVhY2hPZkxpbWl0LCBpZGVudGl0eSwgX2ZpbmRHZXRSZXN1bHQpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGRldGVjdGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZGV0ZWN0U2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZGV0ZWN0XG4gICAgICogQGFsaWFzIGZpbmRTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhcyBzb29uIGFzIGFueVxuICAgICAqIGl0ZXJhdGVlIHJldHVybnMgYHRydWVgLCBvciBhZnRlciBhbGwgdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuXG4gICAgICogUmVzdWx0IHdpbGwgYmUgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGFycmF5IHRoYXQgcGFzc2VzIHRoZSB0cnV0aCB0ZXN0XG4gICAgICogKGl0ZXJhdGVlKSBvciB0aGUgdmFsdWUgYHVuZGVmaW5lZGAgaWYgbm9uZSBwYXNzZWQuIEludm9rZWQgd2l0aFxuICAgICAqIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgdmFyIGRldGVjdFNlcmllcyA9IF9jcmVhdGVUZXN0ZXIoZWFjaE9mU2VyaWVzLCBpZGVudGl0eSwgX2ZpbmRHZXRSZXN1bHQpO1xuXG4gICAgZnVuY3Rpb24gY29uc29sZUZ1bmMobmFtZSkge1xuICAgICAgICByZXR1cm4gcmVzdChmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KFtyZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnNvbGVbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5RWFjaChhcmdzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGVbbmFtZV0oeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSByZXN1bHQgb2YgYW4gYGFzeW5jYCBmdW5jdGlvbiB0byB0aGUgYGNvbnNvbGVgIHVzaW5nIGBjb25zb2xlLmRpcmBcbiAgICAgKiB0byBkaXNwbGF5IHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSByZXN1bHRpbmcgb2JqZWN0LiBPbmx5IHdvcmtzIGluIE5vZGUuanMgb3JcbiAgICAgKiBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgYGNvbnNvbGUuZGlyYCBhbmQgYGNvbnNvbGUuZXJyb3JgIChzdWNoIGFzIEZGIGFuZFxuICAgICAqIENocm9tZSkuIElmIG11bHRpcGxlIGFyZ3VtZW50cyBhcmUgcmV0dXJuZWQgZnJvbSB0aGUgYXN5bmMgZnVuY3Rpb24sXG4gICAgICogYGNvbnNvbGUuZGlyYCBpcyBjYWxsZWQgb24gZWFjaCBhcmd1bWVudCBpbiBvcmRlci5cbiAgICAgKlxuICAgICAqIEBuYW1lIGxvZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gVGhlIGZ1bmN0aW9uIHlvdSB3YW50IHRvIGV2ZW50dWFsbHkgYXBwbHkgYWxsXG4gICAgICogYXJndW1lbnRzIHRvLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJndW1lbnRzLi4uIC0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgdG8gYXBwbHkgdG8gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBpbiBhIG1vZHVsZVxuICAgICAqIHZhciBoZWxsbyA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCB7aGVsbG86IG5hbWV9KTtcbiAgICAgKiAgICAgfSwgMTAwMCk7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIC8vIGluIHRoZSBub2RlIHJlcGxcbiAgICAgKiBub2RlPiBhc3luYy5kaXIoaGVsbG8sICd3b3JsZCcpO1xuICAgICAqIHtoZWxsbzogJ3dvcmxkJ31cbiAgICAgKi9cbiAgICB2YXIgZGlyID0gY29uc29sZUZ1bmMoJ2RpcicpO1xuXG4gICAgLyoqXG4gICAgICogTGlrZSB7QGxpbmsgYXN5bmMud2hpbHN0fSwgZXhjZXB0IHRoZSBgdGVzdGAgaXMgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiBpcyBwYXNzZWQgYSBjYWxsYmFjayBpbiB0aGUgZm9ybSBvZiBgZnVuY3Rpb24gKGVyciwgdHJ1dGgpYC4gSWYgZXJyb3IgaXNcbiAgICAgKiBwYXNzZWQgdG8gYHRlc3RgIG9yIGBmbmAsIHRoZSBtYWluIGNhbGxiYWNrIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZVxuICAgICAqIHZhbHVlIG9mIHRoZSBlcnJvci5cbiAgICAgKlxuICAgICAqIEBuYW1lIGR1cmluZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLndoaWxzdFxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0IC0gYXN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBiZWZvcmUgZWFjaFxuICAgICAqIGV4ZWN1dGlvbiBvZiBgZm5gLiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGVhY2ggdGltZSBgdGVzdGAgcGFzc2VzLlxuICAgICAqIFRoZSBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXQgaGFzXG4gICAgICogY29tcGxldGVkIHdpdGggYW4gb3B0aW9uYWwgYGVycmAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciB0aGUgdGVzdFxuICAgICAqIGZ1bmN0aW9uIGhhcyBmYWlsZWQgYW5kIHJlcGVhdGVkIGV4ZWN1dGlvbiBvZiBgZm5gIGhhcyBzdG9wcGVkLiBgY2FsbGJhY2tgXG4gICAgICogd2lsbCBiZSBwYXNzZWQgYW4gZXJyb3IgYW5kIGFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSk7XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBjb3VudCA9IDA7XG4gICAgICpcbiAgICAgKiBhc3luYy5kdXJpbmcoXG4gICAgICogICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGNvdW50IDwgNSk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY291bnQrKztcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICogICAgICAgICAvLyA1IHNlY29uZHMgaGF2ZSBwYXNzZWRcbiAgICAgKiAgICAgfVxuICAgICAqICk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZHVyaW5nKHRlc3QsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICBjYiA9IGNiIHx8IG5vb3A7XG5cbiAgICAgICAgdmFyIG5leHQgPSByZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goY2hlY2spO1xuICAgICAgICAgICAgICAgIHRlc3QuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uIChlcnIsIHRydXRoKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgIGlmICghdHJ1dGgpIHJldHVybiBjYihudWxsKTtcbiAgICAgICAgICAgIGl0ZXJhdGVlKG5leHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRlc3QoY2hlY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwb3N0LWNoZWNrIHZlcnNpb24gb2Yge0BsaW5rIGFzeW5jLmR1cmluZ30uIFRvIHJlZmxlY3QgdGhlIGRpZmZlcmVuY2UgaW5cbiAgICAgKiB0aGUgb3JkZXIgb2Ygb3BlcmF0aW9ucywgdGhlIGFyZ3VtZW50cyBgdGVzdGAgYW5kIGBmbmAgYXJlIHN3aXRjaGVkLlxuICAgICAqXG4gICAgICogQWxzbyBhIHZlcnNpb24gb2Yge0BsaW5rIGFzeW5jLmRvV2hpbHN0fSB3aXRoIGFzeW5jaHJvbm91cyBgdGVzdGAgZnVuY3Rpb24uXG4gICAgICogQG5hbWUgZG9EdXJpbmdcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5kdXJpbmdcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBlYWNoIHRpbWUgYHRlc3RgIHBhc3Nlcy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0IC0gYXN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBiZWZvcmUgZWFjaFxuICAgICAqIGV4ZWN1dGlvbiBvZiBgZm5gLiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgZmFpbGVkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvRHVyaW5nKGl0ZXJhdGVlLCB0ZXN0LCBjYikge1xuICAgICAgICB2YXIgY2FsbHMgPSAwO1xuXG4gICAgICAgIGR1cmluZyhmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICAgICAgaWYgKGNhbGxzKysgPCAxKSByZXR1cm4gbmV4dChudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIHRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBlYXRlZGx5IGNhbGwgYGZuYCwgd2hpbGUgYHRlc3RgIHJldHVybnMgYHRydWVgLiBDYWxscyBgY2FsbGJhY2tgIHdoZW5cbiAgICAgKiBzdG9wcGVkLCBvciBhbiBlcnJvciBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbmFtZSB3aGlsc3RcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBzeW5jaHJvbm91cyB0cnV0aCB0ZXN0IHRvIHBlcmZvcm0gYmVmb3JlIGVhY2hcbiAgICAgKiBleGVjdXRpb24gb2YgYGZuYC4gSW52b2tlZCB3aXRoICgpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgZWFjaCB0aW1lIGB0ZXN0YCBwYXNzZXMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHRoZSB0ZXN0XG4gICAgICogZnVuY3Rpb24gaGFzIGZhaWxlZCBhbmQgcmVwZWF0ZWQgZXhlY3V0aW9uIG9mIGBmbmAgaGFzIHN0b3BwZWQuIGBjYWxsYmFja2BcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhbiBlcnJvciBhbmQgYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZpbmFsIGBmbmAnc1xuICAgICAqIGNhbGxiYWNrLiBJbnZva2VkIHdpdGggKGVyciwgW3Jlc3VsdHNdKTtcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIGNvdW50ID0gMDtcbiAgICAgKiBhc3luYy53aGlsc3QoXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gY291bnQgPCA1OyB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY291bnQrKztcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgY291bnQpO1xuICAgICAqICAgICAgICAgfSwgMTAwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uIChlcnIsIG4pIHtcbiAgICAgKiAgICAgICAgIC8vIDUgc2Vjb25kcyBoYXZlIHBhc3NlZCwgbiA9IDVcbiAgICAgKiAgICAgfVxuICAgICAqICk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gd2hpbHN0KHRlc3QsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICBjYiA9IGNiIHx8IG5vb3A7XG4gICAgICAgIGlmICghdGVzdCgpKSByZXR1cm4gY2IobnVsbCk7XG4gICAgICAgIHZhciBuZXh0ID0gcmVzdChmdW5jdGlvbiAoZXJyLCBhcmdzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgIGlmICh0ZXN0LmFwcGx5KHRoaXMsIGFyZ3MpKSByZXR1cm4gaXRlcmF0ZWUobmV4dCk7XG4gICAgICAgICAgICBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0ZXJhdGVlKG5leHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwb3N0LWNoZWNrIHZlcnNpb24gb2Yge0BsaW5rIGFzeW5jLndoaWxzdH0uIFRvIHJlZmxlY3QgdGhlIGRpZmZlcmVuY2UgaW5cbiAgICAgKiB0aGUgb3JkZXIgb2Ygb3BlcmF0aW9ucywgdGhlIGFyZ3VtZW50cyBgdGVzdGAgYW5kIGBmbmAgYXJlIHN3aXRjaGVkLlxuICAgICAqXG4gICAgICogYGRvV2hpbHN0YCBpcyB0byBgd2hpbHN0YCBhcyBgZG8gd2hpbGVgIGlzIHRvIGB3aGlsZWAgaW4gcGxhaW4gSmF2YVNjcmlwdC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGRvV2hpbHN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMud2hpbHN0XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgZWFjaCB0aW1lIGB0ZXN0YCBwYXNzZXMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdCAtIHN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBhZnRlciBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCBJbnZva2VkIHdpdGggdGhlIG5vbi1lcnJvciBjYWxsYmFjayByZXN1bHRzXG4gICAgICogb2YgYGZuYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgZmFpbGVkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvV2hpbHN0KGl0ZXJhdGVlLCB0ZXN0LCBjYikge1xuICAgICAgICB2YXIgY2FsbHMgPSAwO1xuICAgICAgICByZXR1cm4gd2hpbHN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiArK2NhbGxzIDw9IDEgfHwgdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRlZSwgY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpa2Uge0BsaW5rIGFzeW5jLmRvV2hpbHN0fSwgZXhjZXB0IHRoZSBgdGVzdGAgaXMgaW52ZXJ0ZWQuIE5vdGUgdGhlXG4gICAgICogYXJndW1lbnQgb3JkZXJpbmcgZGlmZmVycyBmcm9tIGB1bnRpbGAuXG4gICAgICpcbiAgICAgKiBAbmFtZSBkb1VudGlsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZG9XaGlsc3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBlYWNoIHRpbWUgYHRlc3RgIGZhaWxzLlxuICAgICAqIFRoZSBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXQgaGFzXG4gICAgICogY29tcGxldGVkIHdpdGggYW4gb3B0aW9uYWwgYGVycmAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBzeW5jaHJvbm91cyB0cnV0aCB0ZXN0IHRvIHBlcmZvcm0gYWZ0ZXIgZWFjaFxuICAgICAqIGV4ZWN1dGlvbiBvZiBgZm5gLiBJbnZva2VkIHdpdGggdGhlIG5vbi1lcnJvciBjYWxsYmFjayByZXN1bHRzIG9mIGBmbmAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHRoZSB0ZXN0XG4gICAgICogZnVuY3Rpb24gaGFzIHBhc3NlZCBhbmQgcmVwZWF0ZWQgZXhlY3V0aW9uIG9mIGBmbmAgaGFzIHN0b3BwZWQuIGBjYWxsYmFja2BcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhbiBlcnJvciBhbmQgYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZpbmFsIGBmbmAnc1xuICAgICAqIGNhbGxiYWNrLiBJbnZva2VkIHdpdGggKGVyciwgW3Jlc3VsdHNdKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkb1VudGlsKGl0ZXJhdGVlLCB0ZXN0LCBjYikge1xuICAgICAgICByZXR1cm4gZG9XaGlsc3QoaXRlcmF0ZWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBjYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3dpdGhvdXRJbmRleChpdGVyYXRlZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlZSh2YWx1ZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBlYWNoYCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmVhY2hcbiAgICAgKiBAYWxpYXMgZm9yRWFjaExpbWl0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjaXRvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLiBUaGVcbiAgICAgKiBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQuIElmIG5vIGVycm9yIGhhcyBvY2N1cnJlZCwgdGhlIGBjYWxsYmFja2Agc2hvdWxkIGJlIHJ1biB3aXRob3V0XG4gICAgICogYXJndW1lbnRzIG9yIHdpdGggYW4gZXhwbGljaXQgYG51bGxgIGFyZ3VtZW50LiBUaGUgYXJyYXkgaW5kZXggaXMgbm90IHBhc3NlZFxuICAgICAqIHRvIHRoZSBpdGVyYXRlZS4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuIElmIHlvdSBuZWVkIHRoZSBpbmRleCwgdXNlXG4gICAgICogYGVhY2hPZkxpbWl0YC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIEludm9rZWQgd2l0aCAoZXJyKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlYWNoTGltaXQoYXJyLCBsaW1pdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICByZXR1cm4gX2VhY2hPZkxpbWl0KGxpbWl0KShhcnIsIF93aXRob3V0SW5kZXgoaXRlcmF0ZWUpLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgZnVuY3Rpb24gYGl0ZXJhdGVlYCB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLCBpbiBwYXJhbGxlbC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBjYWxsZWQgd2l0aCBhbiBpdGVtIGZyb20gdGhlIGxpc3QsIGFuZCBhIGNhbGxiYWNrIGZvciB3aGVuXG4gICAgICogaXQgaGFzIGZpbmlzaGVkLiBJZiB0aGUgYGl0ZXJhdGVlYCBwYXNzZXMgYW4gZXJyb3IgdG8gaXRzIGBjYWxsYmFja2AsIHRoZVxuICAgICAqIG1haW4gYGNhbGxiYWNrYCAoZm9yIHRoZSBgZWFjaGAgZnVuY3Rpb24pIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZVxuICAgICAqIGVycm9yLlxuICAgICAqXG4gICAgICogTm90ZSwgdGhhdCBzaW5jZSB0aGlzIGZ1bmN0aW9uIGFwcGxpZXMgYGl0ZXJhdGVlYCB0byBlYWNoIGl0ZW0gaW4gcGFyYWxsZWwsXG4gICAgICogdGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlIGl0ZXJhdGVlIGZ1bmN0aW9ucyB3aWxsIGNvbXBsZXRlIGluIG9yZGVyLlxuICAgICAqXG4gICAgICogQG5hbWUgZWFjaFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgZm9yRWFjaFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW1cbiAgICAgKiBpbiBgY29sbGAuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZVxuICAgICAqIGl0IGhhcyBjb21wbGV0ZWQuIElmIG5vIGVycm9yIGhhcyBvY2N1cnJlZCwgdGhlIGBjYWxsYmFja2Agc2hvdWxkIGJlIHJ1blxuICAgICAqIHdpdGhvdXQgYXJndW1lbnRzIG9yIHdpdGggYW4gZXhwbGljaXQgYG51bGxgIGFyZ3VtZW50LiBUaGUgYXJyYXkgaW5kZXggaXMgbm90XG4gICAgICogcGFzc2VkIHRvIHRoZSBpdGVyYXRlZS4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuIElmIHlvdSBuZWVkIHRoZSBpbmRleCxcbiAgICAgKiB1c2UgYGVhY2hPZmAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIGFzc3VtaW5nIG9wZW5GaWxlcyBpcyBhbiBhcnJheSBvZiBmaWxlIG5hbWVzIGFuZCBzYXZlRmlsZSBpcyBhIGZ1bmN0aW9uXG4gICAgICogLy8gdG8gc2F2ZSB0aGUgbW9kaWZpZWQgY29udGVudHMgb2YgdGhhdCBmaWxlOlxuICAgICAqXG4gICAgICogYXN5bmMuZWFjaChvcGVuRmlsZXMsIHNhdmVGaWxlLCBmdW5jdGlvbihlcnIpe1xuICAgICAqICAgLy8gaWYgYW55IG9mIHRoZSBzYXZlcyBwcm9kdWNlZCBhbiBlcnJvciwgZXJyIHdvdWxkIGVxdWFsIHRoYXQgZXJyb3JcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIGFzc3VtaW5nIG9wZW5GaWxlcyBpcyBhbiBhcnJheSBvZiBmaWxlIG5hbWVzXG4gICAgICogYXN5bmMuZWFjaChvcGVuRmlsZXMsIGZ1bmN0aW9uKGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICpcbiAgICAgKiAgICAgLy8gUGVyZm9ybSBvcGVyYXRpb24gb24gZmlsZSBoZXJlLlxuICAgICAqICAgICBjb25zb2xlLmxvZygnUHJvY2Vzc2luZyBmaWxlICcgKyBmaWxlKTtcbiAgICAgKlxuICAgICAqICAgICBpZiggZmlsZS5sZW5ndGggPiAzMiApIHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnVGhpcyBmaWxlIG5hbWUgaXMgdG9vIGxvbmcnKTtcbiAgICAgKiAgICAgICBjYWxsYmFjaygnRmlsZSBuYW1lIHRvbyBsb25nJyk7XG4gICAgICogICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgLy8gRG8gd29yayB0byBwcm9jZXNzIGZpbGUgaGVyZVxuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdGaWxlIHByb2Nlc3NlZCcpO1xuICAgICAqICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICogICAgIH1cbiAgICAgKiB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgLy8gaWYgYW55IG9mIHRoZSBmaWxlIHByb2Nlc3NpbmcgcHJvZHVjZWQgYW4gZXJyb3IsIGVyciB3b3VsZCBlcXVhbCB0aGF0IGVycm9yXG4gICAgICogICAgIGlmKCBlcnIgKSB7XG4gICAgICogICAgICAgLy8gT25lIG9mIHRoZSBpdGVyYXRpb25zIHByb2R1Y2VkIGFuIGVycm9yLlxuICAgICAqICAgICAgIC8vIEFsbCBwcm9jZXNzaW5nIHdpbGwgbm93IHN0b3AuXG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0EgZmlsZSBmYWlsZWQgdG8gcHJvY2VzcycpO1xuICAgICAqICAgICB9IGVsc2Uge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdBbGwgZmlsZXMgaGF2ZSBiZWVuIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBlYWNoID0gZG9MaW1pdChlYWNoTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBlYWNoYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZWFjaFxuICAgICAqIEBhbGlhcyBmb3JFYWNoU2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2hcbiAgICAgKiBpdGVtIGluIGBjb2xsYC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgYGNhbGxiYWNrYCBzaG91bGQgYmUgcnVuXG4gICAgICogd2l0aG91dCBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIFRoZSBhcnJheSBpbmRleCBpc1xuICAgICAqIG5vdCBwYXNzZWQgdG8gdGhlIGl0ZXJhdGVlLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS4gSWYgeW91IG5lZWQgdGhlXG4gICAgICogaW5kZXgsIHVzZSBgZWFjaE9mU2VyaWVzYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIEludm9rZWQgd2l0aCAoZXJyKS5cbiAgICAgKi9cbiAgICB2YXIgZWFjaFNlcmllcyA9IGRvTGltaXQoZWFjaExpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIFdyYXAgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIGVuc3VyZSBpdCBjYWxscyBpdHMgY2FsbGJhY2sgb24gYSBsYXRlciB0aWNrIG9mXG4gICAgICogdGhlIGV2ZW50IGxvb3AuICBJZiB0aGUgZnVuY3Rpb24gYWxyZWFkeSBjYWxscyBpdHMgY2FsbGJhY2sgb24gYSBuZXh0IHRpY2ssXG4gICAgICogbm8gZXh0cmEgZGVmZXJyYWwgaXMgYWRkZWQuIFRoaXMgaXMgdXNlZnVsIGZvciBwcmV2ZW50aW5nIHN0YWNrIG92ZXJmbG93c1xuICAgICAqIChgUmFuZ2VFcnJvcjogTWF4aW11bSBjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRgKSBhbmQgZ2VuZXJhbGx5IGtlZXBpbmdcbiAgICAgKiBbWmFsZ29dKGh0dHA6Ly9ibG9nLml6cy5tZS9wb3N0LzU5MTQyNzQyMTQzL2Rlc2lnbmluZy1hcGlzLWZvci1hc3luY2hyb255KVxuICAgICAqIGNvbnRhaW5lZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVuc3VyZUFzeW5jXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBhbiBhc3luYyBmdW5jdGlvbiwgb25lIHRoYXQgZXhwZWN0cyBhIG5vZGUtc3R5bGVcbiAgICAgKiBjYWxsYmFjayBhcyBpdHMgbGFzdCBhcmd1bWVudC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYSB3cmFwcGVkIGZ1bmN0aW9uIHdpdGggdGhlIGV4YWN0IHNhbWUgY2FsbFxuICAgICAqIHNpZ25hdHVyZSBhcyB0aGUgZnVuY3Rpb24gcGFzc2VkIGluLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzb21ldGltZXNBc3luYyhhcmcsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGlmIChjYWNoZVthcmddKSB7XG4gICAgICogICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgY2FjaGVbYXJnXSk7IC8vIHRoaXMgd291bGQgYmUgc3luY2hyb25vdXMhIVxuICAgICAqICAgICB9IGVsc2Uge1xuICAgICAqICAgICAgICAgZG9Tb21lSU8oYXJnLCBjYWxsYmFjayk7IC8vIHRoaXMgSU8gd291bGQgYmUgYXN5bmNocm9ub3VzXG4gICAgICogICAgIH1cbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiAvLyB0aGlzIGhhcyBhIHJpc2sgb2Ygc3RhY2sgb3ZlcmZsb3dzIGlmIG1hbnkgcmVzdWx0cyBhcmUgY2FjaGVkIGluIGEgcm93XG4gICAgICogYXN5bmMubWFwU2VyaWVzKGFyZ3MsIHNvbWV0aW1lc0FzeW5jLCBkb25lKTtcbiAgICAgKlxuICAgICAqIC8vIHRoaXMgd2lsbCBkZWZlciBzb21ldGltZXNBc3luYydzIGNhbGxiYWNrIGlmIG5lY2Vzc2FyeSxcbiAgICAgKiAvLyBwcmV2ZW50aW5nIHN0YWNrIG92ZXJmbG93c1xuICAgICAqIGFzeW5jLm1hcFNlcmllcyhhcmdzLCBhc3luYy5lbnN1cmVBc3luYyhzb21ldGltZXNBc3luYyksIGRvbmUpO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVuc3VyZUFzeW5jKGZuKSB7XG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChhcmdzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgYXJncy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5uZXJBcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIGlmIChzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGlubmVyQXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGlubmVyQXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIHN5bmMgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm90SWQodikge1xuICAgICAgICByZXR1cm4gIXY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGV2ZXJ5YCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGV2ZXJ5TGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5ldmVyeVxuICAgICAqIEBhbGlhcyBhbGxMaW1pdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYFxuICAgICAqIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdpdGggYSAgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWRcbiAgICAgKiB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmMgdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBldmVyeUxpbWl0ID0gX2NyZWF0ZVRlc3RlcihlYWNoT2ZMaW1pdCwgbm90SWQsIG5vdElkKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGV2ZXJ5IGVsZW1lbnQgaW4gYGNvbGxgIHNhdGlzZmllcyBhbiBhc3luYyB0ZXN0LiBJZiBhbnlcbiAgICAgKiBpdGVyYXRlZSBjYWxsIHJldHVybnMgYGZhbHNlYCwgdGhlIG1haW4gYGNhbGxiYWNrYCBpcyBpbW1lZGlhdGVseSBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBldmVyeVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgYWxsXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIHRoZVxuICAgICAqIGNvbGxlY3Rpb24gaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWBcbiAgICAgKiB3aGljaCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkXG4gICAgICogd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgdGhlIGFzeW5jIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuZXZlcnkoWydmaWxlMScsJ2ZpbGUyJywnZmlsZTMnXSwgZnVuY3Rpb24oZmlsZVBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLmFjY2VzcyhmaWxlUGF0aCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAhZXJyKVxuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyBpZiByZXN1bHQgaXMgdHJ1ZSB0aGVuIGV2ZXJ5IGZpbGUgZXhpc3RzXG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGV2ZXJ5ID0gZG9MaW1pdChldmVyeUxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZXZlcnlgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGV2ZXJ5U2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZXZlcnlcbiAgICAgKiBAYWxpYXMgYWxsU2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIHRoZVxuICAgICAqIGNvbGxlY3Rpb24gaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWBcbiAgICAgKiB3aGljaCBtdXN0IGJlIGNhbGxlZCB3aXRoIGEgIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkXG4gICAgICogd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgdGhlIGFzeW5jIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgZXZlcnlTZXJpZXMgPSBkb0xpbWl0KGV2ZXJ5TGltaXQsIDEpO1xuXG4gICAgZnVuY3Rpb24gX2ZpbHRlcihlYWNoZm4sIGFyciwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGVhY2hmbihhcnIsIGZ1bmN0aW9uICh4LCBpbmRleCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGl0ZXJhdGVlKHgsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7IGluZGV4OiBpbmRleCwgdmFsdWU6IHggfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGFycmF5TWFwKHJlc3VsdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gICAgICAgICAgICAgICAgfSksIGJhc2VQcm9wZXJ0eSgndmFsdWUnKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZmlsdGVyYCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZmlsdGVyTGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5maWx0ZXJcbiAgICAgKiBAYWxpYXMgc2VsZWN0TGltaXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgZmlsdGVyTGltaXQgPSBkb1BhcmFsbGVsTGltaXQoX2ZpbHRlcik7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIGFsbCB0aGUgdmFsdWVzIGluIGBjb2xsYCB3aGljaCBwYXNzIGFuIGFzeW5jIHRydXRoXG4gICAgICogdGVzdC4gVGhpcyBvcGVyYXRpb24gaXMgcGVyZm9ybWVkIGluIHBhcmFsbGVsLCBidXQgdGhlIHJlc3VsdHMgYXJyYXkgd2lsbCBiZVxuICAgICAqIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBvcmlnaW5hbC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGZpbHRlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgc2VsZWN0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuZmlsdGVyKFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGVQYXRoLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5hY2Nlc3MoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgIWVycilcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHJlc3VsdHMgbm93IGVxdWFscyBhbiBhcnJheSBvZiB0aGUgZXhpc3RpbmcgZmlsZXNcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgZmlsdGVyID0gZG9MaW1pdChmaWx0ZXJMaW1pdCwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGZpbHRlcmAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZmlsdGVyU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZmlsdGVyXG4gICAgICogQGFsaWFzIHNlbGVjdFNlcmllc1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGBpdGVyYXRlZWAgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgLCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cylcbiAgICAgKi9cbiAgICB2YXIgZmlsdGVyU2VyaWVzID0gZG9MaW1pdChmaWx0ZXJMaW1pdCwgMSk7XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGBmbmAgd2l0aCBhIGNhbGxiYWNrIHBhcmFtZXRlciB0aGF0IGFsbG93cyBpdFxuICAgICAqIHRvIGNhbGwgaXRzZWxmIGFnYWluLCBpbiBzZXJpZXMsIGluZGVmaW5pdGVseS5cblxuICAgICAqIElmIGFuIGVycm9yIGlzIHBhc3NlZCB0byB0aGVcbiAgICAgKiBjYWxsYmFjayB0aGVuIGBlcnJiYWNrYCBpcyBjYWxsZWQgd2l0aCB0aGUgZXJyb3IsIGFuZCBleGVjdXRpb24gc3RvcHMsXG4gICAgICogb3RoZXJ3aXNlIGl0IHdpbGwgbmV2ZXIgYmUgY2FsbGVkLlxuICAgICAqXG4gICAgICogQG5hbWUgZm9yZXZlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBhIGZ1bmN0aW9uIHRvIGNhbGwgcmVwZWF0ZWRseS4gSW52b2tlZCB3aXRoIChuZXh0KS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZXJyYmFja10gLSB3aGVuIGBmbmAgcGFzc2VzIGFuIGVycm9yIHRvIGl0J3MgY2FsbGJhY2ssXG4gICAgICogdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCwgYW5kIGV4ZWN1dGlvbiBzdG9wcy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5mb3JldmVyKFxuICAgICAqICAgICBmdW5jdGlvbihuZXh0KSB7XG4gICAgICogICAgICAgICAvLyBuZXh0IGlzIHN1aXRhYmxlIGZvciBwYXNzaW5nIHRvIHRoaW5ncyB0aGF0IG5lZWQgYSBjYWxsYmFjayhlcnIgWywgd2hhdGV2ZXJdKTtcbiAgICAgKiAgICAgICAgIC8vIGl0IHdpbGwgcmVzdWx0IGluIHRoaXMgZnVuY3Rpb24gYmVpbmcgY2FsbGVkIGFnYWluLlxuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgICAgIC8vIGlmIG5leHQgaXMgY2FsbGVkIHdpdGggYSB2YWx1ZSBpbiBpdHMgZmlyc3QgcGFyYW1ldGVyLCBpdCB3aWxsIGFwcGVhclxuICAgICAqICAgICAgICAgLy8gaW4gaGVyZSBhcyAnZXJyJywgYW5kIGV4ZWN1dGlvbiB3aWxsIHN0b3AuXG4gICAgICogICAgIH1cbiAgICAgKiApO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZvcmV2ZXIoZm4sIGNiKSB7XG4gICAgICAgIHZhciBkb25lID0gb25seU9uY2UoY2IgfHwgbm9vcCk7XG4gICAgICAgIHZhciB0YXNrID0gZW5zdXJlQXN5bmMoZm4pO1xuXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgdGFzayhuZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpdGVyYXRvciBmdW5jdGlvbiB3aGljaCBjYWxscyB0aGUgbmV4dCBmdW5jdGlvbiBpbiB0aGUgYHRhc2tzYFxuICAgICAqIGFycmF5LCByZXR1cm5pbmcgYSBjb250aW51YXRpb24gdG8gY2FsbCB0aGUgbmV4dCBvbmUgYWZ0ZXIgdGhhdC4gSXQncyBhbHNvXG4gICAgICogcG9zc2libGUgdG8g4oCccGVla+KAnSBhdCB0aGUgbmV4dCBpdGVyYXRvciB3aXRoIGBpdGVyYXRvci5uZXh0KClgLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGludGVybmFsbHkgYnkgdGhlIGBhc3luY2AgbW9kdWxlLCBidXQgY2FuIGJlIHVzZWZ1bFxuICAgICAqIHdoZW4geW91IHdhbnQgdG8gbWFudWFsbHkgY29udHJvbCB0aGUgZmxvdyBvZiBmdW5jdGlvbnMgaW4gc2VyaWVzLlxuICAgICAqXG4gICAgICogQG5hbWUgaXRlcmF0b3JcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRhc2tzIC0gQW4gYXJyYXkgb2YgZnVuY3Rpb25zIHRvIHJ1bi5cbiAgICAgKiBAcmV0dXJucyBUaGUgbmV4dCBmdW5jdGlvbiB0byBydW4gaW4gdGhlIHNlcmllcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIGl0ZXJhdG9yID0gYXN5bmMuaXRlcmF0b3IoW1xuICAgICAqICAgICBmdW5jdGlvbigpIHsgc3lzLnAoJ29uZScpOyB9LFxuICAgICAqICAgICBmdW5jdGlvbigpIHsgc3lzLnAoJ3R3bycpOyB9LFxuICAgICAqICAgICBmdW5jdGlvbigpIHsgc3lzLnAoJ3RocmVlJyk7IH1cbiAgICAgKiBdKTtcbiAgICAgKlxuICAgICAqIG5vZGU+IHZhciBpdGVyYXRvcjIgPSBpdGVyYXRvcigpO1xuICAgICAqICdvbmUnXG4gICAgICogbm9kZT4gdmFyIGl0ZXJhdG9yMyA9IGl0ZXJhdG9yMigpO1xuICAgICAqICd0d28nXG4gICAgICogbm9kZT4gaXRlcmF0b3IzKCk7XG4gICAgICogJ3RocmVlJ1xuICAgICAqIG5vZGU+IHZhciBuZXh0Zm4gPSBpdGVyYXRvcjIubmV4dCgpO1xuICAgICAqIG5vZGU+IG5leHRmbigpO1xuICAgICAqICd0aHJlZSdcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpdGVyYXRvciQxICh0YXNrcykge1xuICAgICAgICBmdW5jdGlvbiBtYWtlQ2FsbGJhY2soaW5kZXgpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZuKCkge1xuICAgICAgICAgICAgICAgIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza3NbaW5kZXhdLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmbi5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA8IHRhc2tzLmxlbmd0aCAtIDEgPyBtYWtlQ2FsbGJhY2soaW5kZXggKyAxKSA6IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYWtlQ2FsbGJhY2soMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgcmVzdWx0IG9mIGFuIGBhc3luY2AgZnVuY3Rpb24gdG8gdGhlIGBjb25zb2xlYC4gT25seSB3b3JrcyBpblxuICAgICAqIE5vZGUuanMgb3IgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IGBjb25zb2xlLmxvZ2AgYW5kIGBjb25zb2xlLmVycm9yYCAoc3VjaFxuICAgICAqIGFzIEZGIGFuZCBDaHJvbWUpLiBJZiBtdWx0aXBsZSBhcmd1bWVudHMgYXJlIHJldHVybmVkIGZyb20gdGhlIGFzeW5jXG4gICAgICogZnVuY3Rpb24sIGBjb25zb2xlLmxvZ2AgaXMgY2FsbGVkIG9uIGVhY2ggYXJndW1lbnQgaW4gb3JkZXIuXG4gICAgICpcbiAgICAgKiBAbmFtZSBsb2dcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbiAtIFRoZSBmdW5jdGlvbiB5b3Ugd2FudCB0byBldmVudHVhbGx5IGFwcGx5IGFsbFxuICAgICAqIGFyZ3VtZW50cyB0by5cbiAgICAgKiBAcGFyYW0gey4uLip9IGFyZ3VtZW50cy4uLiAtIEFueSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGFwcGx5IHRvIHRoZSBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gaW4gYSBtb2R1bGVcbiAgICAgKiB2YXIgaGVsbG8gPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICAgICAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2hlbGxvICcgKyBuYW1lKTtcbiAgICAgKiAgICAgfSwgMTAwMCk7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIC8vIGluIHRoZSBub2RlIHJlcGxcbiAgICAgKiBub2RlPiBhc3luYy5sb2coaGVsbG8sICd3b3JsZCcpO1xuICAgICAqICdoZWxsbyB3b3JsZCdcbiAgICAgKi9cbiAgICB2YXIgbG9nID0gY29uc29sZUZ1bmMoJ2xvZycpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYG1hcFZhbHVlc2AgYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgICogdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIG1hcFZhbHVlc0xpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwVmFsdWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggdmFsdWUgaW4gYG9iamAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFcbiAgICAgKiB0cmFuc2Zvcm1lZCB2YWx1ZS4gSW52b2tlZCB3aXRoICh2YWx1ZSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHQgaXMgYW4gb2JqZWN0IG9mIHRoZVxuICAgICAqIHRyYW5zZm9ybWVkIHZhbHVlcyBmcm9tIHRoZSBgb2JqYC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwVmFsdWVzTGltaXQob2JqLCBsaW1pdCwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBuZXdPYmogPSB7fTtcbiAgICAgICAgZWFjaE9mTGltaXQob2JqLCBsaW1pdCwgZnVuY3Rpb24gKHZhbCwga2V5LCBuZXh0KSB7XG4gICAgICAgICAgICBpdGVyYXRlZSh2YWwsIGtleSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBuZXdPYmopO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHJlbGF0aXZlIG9mIGBtYXBgLCBkZXNpZ25lZCBmb3IgdXNlIHdpdGggb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIFByb2R1Y2VzIGEgbmV3IE9iamVjdCBieSBtYXBwaW5nIGVhY2ggdmFsdWUgb2YgYG9iamAgdGhyb3VnaCB0aGUgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9uLiBUaGUgYGl0ZXJhdGVlYCBpcyBjYWxsZWQgZWFjaCBgdmFsdWVgIGFuZCBga2V5YCBmcm9tIGBvYmpgIGFuZCBhXG4gICAgICogY2FsbGJhY2sgZm9yIHdoZW4gaXQgaGFzIGZpbmlzaGVkIHByb2Nlc3NpbmcuIEVhY2ggb2YgdGhlc2UgY2FsbGJhY2tzIHRha2VzXG4gICAgICogdHdvIGFyZ3VtZW50czogYW4gYGVycm9yYCwgYW5kIHRoZSB0cmFuc2Zvcm1lZCBpdGVtIGZyb20gYG9iamAuIElmIGBpdGVyYXRlZWBcbiAgICAgKiBwYXNzZXMgYW4gZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIChmb3IgdGhlIGBtYXBWYWx1ZXNgXG4gICAgICogZnVuY3Rpb24pIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKlxuICAgICAqIE5vdGUsIHRoZSBvcmRlciBvZiB0aGUga2V5cyBpbiB0aGUgcmVzdWx0IGlzIG5vdCBndWFyYW50ZWVkLiAgVGhlIGtleXMgd2lsbFxuICAgICAqIGJlIHJvdWdobHkgaW4gdGhlIG9yZGVyIHRoZXkgY29tcGxldGUsIChidXQgdGhpcyBpcyB2ZXJ5IGVuZ2luZS1zcGVjaWZpYylcbiAgICAgKlxuICAgICAqIEBuYW1lIG1hcFZhbHVlc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHZhbHVlIGFuZCBrZXkgaW5cbiAgICAgKiBgY29sbGAuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cmFuc2Zvcm1lZClgIHdoaWNoIG11c3QgYmVcbiAgICAgKiBjYWxsZWQgb25jZSBpdCBoYXMgY29tcGxldGVkIHdpdGggYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhXG4gICAgICogdHJhbnNmb3JtZWQgdmFsdWUuIEludm9rZWQgd2l0aCAodmFsdWUsIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0cyBpcyBhbiBhcnJheSBvZiB0aGVcbiAgICAgKiB0cmFuc2Zvcm1lZCBpdGVtcyBmcm9tIHRoZSBgb2JqYC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLm1hcFZhbHVlcyh7XG4gICAgICogICAgIGYxOiAnZmlsZTEnLFxuICAgICAqICAgICBmMjogJ2ZpbGUyJyxcbiAgICAgKiAgICAgZjM6ICdmaWxlMydcbiAgICAgKiB9LCBmcy5zdGF0LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBhIG1hcCBvZiBzdGF0cyBmb3IgZWFjaCBmaWxlLCBlLmcuXG4gICAgICogICAgIC8vIHtcbiAgICAgKiAgICAgLy8gICAgIGYxOiBbc3RhdHMgZm9yIGZpbGUxXSxcbiAgICAgKiAgICAgLy8gICAgIGYyOiBbc3RhdHMgZm9yIGZpbGUyXSxcbiAgICAgKiAgICAgLy8gICAgIGYzOiBbc3RhdHMgZm9yIGZpbGUzXVxuICAgICAqICAgICAvLyB9XG4gICAgICogfSk7XG4gICAgICovXG5cbiAgICB2YXIgbWFwVmFsdWVzID0gZG9MaW1pdChtYXBWYWx1ZXNMaW1pdCwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYG1hcFZhbHVlc2AgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwVmFsdWVzU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwVmFsdWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCB2YWx1ZSBpbiBgb2JqYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJhbnNmb3JtZWQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYVxuICAgICAqIHRyYW5zZm9ybWVkIHZhbHVlLiBJbnZva2VkIHdpdGggKHZhbHVlLCBrZXksIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdCBpcyBhbiBvYmplY3Qgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgdmFsdWVzIGZyb20gdGhlIGBvYmpgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgbWFwVmFsdWVzU2VyaWVzID0gZG9MaW1pdChtYXBWYWx1ZXNMaW1pdCwgMSk7XG5cbiAgICBmdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSBpbiBvYmo7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FjaGVzIHRoZSByZXN1bHRzIG9mIGFuIGBhc3luY2AgZnVuY3Rpb24uIFdoZW4gY3JlYXRpbmcgYSBoYXNoIHRvIHN0b3JlXG4gICAgICogZnVuY3Rpb24gcmVzdWx0cyBhZ2FpbnN0LCB0aGUgY2FsbGJhY2sgaXMgb21pdHRlZCBmcm9tIHRoZSBoYXNoIGFuZCBhblxuICAgICAqIG9wdGlvbmFsIGhhc2ggZnVuY3Rpb24gY2FuIGJlIHVzZWQuXG4gICAgICpcbiAgICAgKiBJZiBubyBoYXNoIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIHVzZWQgYXMgYSBoYXNoIGtleSxcbiAgICAgKiB3aGljaCBtYXkgd29yayByZWFzb25hYmx5IGlmIGl0IGlzIGEgc3RyaW5nIG9yIGEgZGF0YSB0eXBlIHRoYXQgY29udmVydHMgdG8gYVxuICAgICAqIGRpc3RpbmN0IHN0cmluZy4gTm90ZSB0aGF0IG9iamVjdHMgYW5kIGFycmF5cyB3aWxsIG5vdCBiZWhhdmUgcmVhc29uYWJseS5cbiAgICAgKiBOZWl0aGVyIHdpbGwgY2FzZXMgd2hlcmUgdGhlIG90aGVyIGFyZ3VtZW50cyBhcmUgc2lnbmlmaWNhbnQuIEluIHN1Y2ggY2FzZXMsXG4gICAgICogc3BlY2lmeSB5b3VyIG93biBoYXNoIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGNhY2hlIG9mIHJlc3VsdHMgaXMgZXhwb3NlZCBhcyB0aGUgYG1lbW9gIHByb3BlcnR5IG9mIHRoZSBmdW5jdGlvblxuICAgICAqIHJldHVybmVkIGJ5IGBtZW1vaXplYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIG1lbW9pemVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBwcm94eSBhbmQgY2FjaGUgcmVzdWx0cyBmcm9tLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc2hlciAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBnZW5lcmF0aW5nIGEgY3VzdG9tIGhhc2hcbiAgICAgKiBmb3Igc3RvcmluZyByZXN1bHRzLiBJdCBoYXMgYWxsIHRoZSBhcmd1bWVudHMgYXBwbGllZCB0byBpdCBhcGFydCBmcm9tIHRoZVxuICAgICAqIGNhbGxiYWNrLCBhbmQgbXVzdCBiZSBzeW5jaHJvbm91cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIHNsb3dfZm4gPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmdcbiAgICAgKiAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgKiB9O1xuICAgICAqIHZhciBmbiA9IGFzeW5jLm1lbW9pemUoc2xvd19mbik7XG4gICAgICpcbiAgICAgKiAvLyBmbiBjYW4gbm93IGJlIHVzZWQgYXMgaWYgaXQgd2VyZSBzbG93X2ZuXG4gICAgICogZm4oJ3NvbWUgbmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAvLyBjYWxsYmFja1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1lbW9pemUkMShmbiwgaGFzaGVyKSB7XG4gICAgICAgIHZhciBtZW1vID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIHF1ZXVlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGhhc2hlciA9IGhhc2hlciB8fCBpZGVudGl0eTtcbiAgICAgICAgdmFyIG1lbW9pemVkID0gaW5pdGlhbFBhcmFtcyhmdW5jdGlvbiBtZW1vaXplZChhcmdzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGtleSA9IGhhc2hlci5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChoYXMobWVtbywga2V5KSkge1xuICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgbWVtb1trZXldKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzKHF1ZXVlcywga2V5KSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlc1trZXldLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWV1ZXNba2V5XSA9IFtjYWxsYmFja107XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW3Jlc3QoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVtb1trZXldID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHEgPSBxdWV1ZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxW2ldLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtZW1vaXplZC5tZW1vID0gbWVtbztcbiAgICAgICAgbWVtb2l6ZWQudW5tZW1vaXplZCA9IGZuO1xuICAgICAgICByZXR1cm4gbWVtb2l6ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgYGNhbGxiYWNrYCBvbiBhIGxhdGVyIGxvb3AgYXJvdW5kIHRoZSBldmVudCBsb29wLiBJbiBOb2RlLmpzIHRoaXMganVzdFxuICAgICAqIGNhbGxzIGBzZXRJbW1lZGlhdGVgLiAgSW4gdGhlIGJyb3dzZXIgaXQgd2lsbCB1c2UgYHNldEltbWVkaWF0ZWAgaWZcbiAgICAgKiBhdmFpbGFibGUsIG90aGVyd2lzZSBgc2V0VGltZW91dChjYWxsYmFjaywgMClgLCB3aGljaCBtZWFucyBvdGhlciBoaWdoZXJcbiAgICAgKiBwcmlvcml0eSBldmVudHMgbWF5IHByZWNlZGUgdGhlIGV4ZWN1dGlvbiBvZiBgY2FsbGJhY2tgLlxuICAgICAqXG4gICAgICogVGhpcyBpcyB1c2VkIGludGVybmFsbHkgZm9yIGJyb3dzZXItY29tcGF0aWJpbGl0eSBwdXJwb3Nlcy5cbiAgICAgKlxuICAgICAqIEBuYW1lIG5leHRUaWNrXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBzZXRJbW1lZGlhdGVcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gYSBsYXRlciBsb29wIGFyb3VuZFxuICAgICAqIHRoZSBldmVudCBsb29wLiBJbnZva2VkIHdpdGggKGFyZ3MuLi4pLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJncy4uLiAtIGFueSBudW1iZXIgb2YgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGVcbiAgICAgKiBjYWxsYmFjayBvbiB0aGUgbmV4dCB0aWNrLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgY2FsbF9vcmRlciA9IFtdO1xuICAgICAqIGFzeW5jLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAqICAgICBjYWxsX29yZGVyLnB1c2goJ3R3bycpO1xuICAgICAqICAgICAvLyBjYWxsX29yZGVyIG5vdyBlcXVhbHMgWydvbmUnLCd0d28nXVxuICAgICAqIH0pO1xuICAgICAqIGNhbGxfb3JkZXIucHVzaCgnb25lJyk7XG4gICAgICpcbiAgICAgKiBhc3luYy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgKiAgICAgLy8gYSwgYiwgYW5kIGMgZXF1YWwgMSwgMiwgYW5kIDNcbiAgICAgKiB9LCAxLCAyLCAzKTtcbiAgICAgKi9cbiAgICB2YXIgX2RlZmVyJDE7XG5cbiAgICBpZiAoaGFzTmV4dFRpY2spIHtcbiAgICAgICAgX2RlZmVyJDEgPSBwcm9jZXNzLm5leHRUaWNrO1xuICAgIH0gZWxzZSBpZiAoaGFzU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIF9kZWZlciQxID0gc2V0SW1tZWRpYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9kZWZlciQxID0gZmFsbGJhY2s7XG4gICAgfVxuXG4gICAgdmFyIG5leHRUaWNrID0gd3JhcChfZGVmZXIkMSk7XG5cbiAgICBmdW5jdGlvbiBfcGFyYWxsZWwoZWFjaGZuLCB0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IGlzQXJyYXlMaWtlKHRhc2tzKSA/IFtdIDoge307XG5cbiAgICAgICAgZWFjaGZuKHRhc2tzLCBmdW5jdGlvbiAodGFzaywga2V5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGFzayhyZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c1trZXldID0gYXJncztcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgcGFyYWxsZWxgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYVxuICAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBwYXJhbGxlbFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnBhcmFsbGVsXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8Q29sbGVjdGlvbn0gdGFza3MgLSBBIGNvbGxlY3Rpb24gY29udGFpbmluZyBmdW5jdGlvbnMgdG8gcnVuLlxuICAgICAqIEVhY2ggZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgd2hpY2ggaXQgbXVzdCBjYWxsIG9uXG4gICAgICogY29tcGxldGlvbiB3aXRoIGFuIGVycm9yIGBlcnJgICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW4gb3B0aW9uYWwgYHJlc3VsdGBcbiAgICAgKiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFsbCB0aGVcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LiBUaGlzIGZ1bmN0aW9uIGdldHMgYSByZXN1bHRzIGFycmF5XG4gICAgICogKG9yIG9iamVjdCkgY29udGFpbmluZyBhbGwgdGhlIHJlc3VsdCBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSB0YXNrIGNhbGxiYWNrcy5cbiAgICAgKiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcGFyYWxsZWxMaW1pdCh0YXNrcywgbGltaXQsIGNiKSB7XG4gICAgICByZXR1cm4gX3BhcmFsbGVsKF9lYWNoT2ZMaW1pdChsaW1pdCksIHRhc2tzLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUnVuIHRoZSBgdGFza3NgIGNvbGxlY3Rpb24gb2YgZnVuY3Rpb25zIGluIHBhcmFsbGVsLCB3aXRob3V0IHdhaXRpbmcgdW50aWxcbiAgICAgKiB0aGUgcHJldmlvdXMgZnVuY3Rpb24gaGFzIGNvbXBsZXRlZC4gSWYgYW55IG9mIHRoZSBmdW5jdGlvbnMgcGFzcyBhbiBlcnJvciB0b1xuICAgICAqIGl0cyBjYWxsYmFjaywgdGhlIG1haW4gYGNhbGxiYWNrYCBpcyBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGUgdmFsdWUgb2YgdGhlXG4gICAgICogZXJyb3IuIE9uY2UgdGhlIGB0YXNrc2AgaGF2ZSBjb21wbGV0ZWQsIHRoZSByZXN1bHRzIGFyZSBwYXNzZWQgdG8gdGhlIGZpbmFsXG4gICAgICogYGNhbGxiYWNrYCBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBgcGFyYWxsZWxgIGlzIGFib3V0IGtpY2tpbmctb2ZmIEkvTyB0YXNrcyBpbiBwYXJhbGxlbCwgbm90IGFib3V0XG4gICAgICogcGFyYWxsZWwgZXhlY3V0aW9uIG9mIGNvZGUuICBJZiB5b3VyIHRhc2tzIGRvIG5vdCB1c2UgYW55IHRpbWVycyBvciBwZXJmb3JtXG4gICAgICogYW55IEkvTywgdGhleSB3aWxsIGFjdHVhbGx5IGJlIGV4ZWN1dGVkIGluIHNlcmllcy4gIEFueSBzeW5jaHJvbm91cyBzZXR1cFxuICAgICAqIHNlY3Rpb25zIGZvciBlYWNoIHRhc2sgd2lsbCBoYXBwZW4gb25lIGFmdGVyIHRoZSBvdGhlci4gIEphdmFTY3JpcHQgcmVtYWluc1xuICAgICAqIHNpbmdsZS10aHJlYWRlZC5cbiAgICAgKlxuICAgICAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gdXNlIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5LiBFYWNoIHByb3BlcnR5IHdpbGxcbiAgICAgKiBiZSBydW4gYXMgYSBmdW5jdGlvbiBhbmQgdGhlIHJlc3VsdHMgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGZpbmFsIGBjYWxsYmFja2BcbiAgICAgKiBhcyBhbiBvYmplY3QgaW5zdGVhZCBvZiBhbiBhcnJheS4gVGhpcyBjYW4gYmUgYSBtb3JlIHJlYWRhYmxlIHdheSBvZiBoYW5kbGluZ1xuICAgICAqIHJlc3VsdHMgZnJvbSB7QGxpbmsgYXN5bmMucGFyYWxsZWx9LlxuICAgICAqXG4gICAgICogQG5hbWUgcGFyYWxsZWxcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB0YXNrcyAtIEEgY29sbGVjdGlvbiBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBydW4uXG4gICAgICogRWFjaCBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCB3aGljaCBpdCBtdXN0IGNhbGwgb25cbiAgICAgKiBjb21wbGV0aW9uIHdpdGggYW4gZXJyb3IgYGVycmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbiBvcHRpb25hbCBgcmVzdWx0YFxuICAgICAqIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBydW4gb25jZSBhbGwgdGhlXG4gICAgICogZnVuY3Rpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4gVGhpcyBmdW5jdGlvbiBnZXRzIGEgcmVzdWx0cyBhcnJheVxuICAgICAqIChvciBvYmplY3QpIGNvbnRhaW5pbmcgYWxsIHRoZSByZXN1bHQgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgdGFzayBjYWxsYmFja3MuXG4gICAgICogSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYXN5bmMucGFyYWxsZWwoW1xuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJyk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAndHdvJyk7XG4gICAgICogICAgICAgICB9LCAxMDApO1xuICAgICAqICAgICB9XG4gICAgICogXSxcbiAgICAgKiAvLyBvcHRpb25hbCBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyB0aGUgcmVzdWx0cyBhcnJheSB3aWxsIGVxdWFsIFsnb25lJywndHdvJ10gZXZlbiB0aG91Z2hcbiAgICAgKiAgICAgLy8gdGhlIHNlY29uZCBmdW5jdGlvbiBoYWQgYSBzaG9ydGVyIHRpbWVvdXQuXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBhbiBleGFtcGxlIHVzaW5nIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5XG4gICAgICogYXN5bmMucGFyYWxsZWwoe1xuICAgICAqICAgICBvbmU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIDEpO1xuICAgICAqICAgICAgICAgfSwgMjAwKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgdHdvOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAyKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBpcyBub3cgZXF1YWxzIHRvOiB7b25lOiAxLCB0d286IDJ9XG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIHBhcmFsbGVsID0gZG9MaW1pdChwYXJhbGxlbExpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBBIHF1ZXVlIG9mIHRhc2tzIGZvciB0aGUgd29ya2VyIGZ1bmN0aW9uIHRvIGNvbXBsZXRlLlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IHF1ZXVlXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gbGVuZ3RoIC0gYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG51bWJlciBvZiBpdGVtc1xuICAgICAqIHdhaXRpbmcgdG8gYmUgcHJvY2Vzc2VkLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBzdGFydGVkIC0gYSBmdW5jdGlvbiByZXR1cm5pbmcgd2hldGhlciBvciBub3QgYW55XG4gICAgICogaXRlbXMgaGF2ZSBiZWVuIHB1c2hlZCBhbmQgcHJvY2Vzc2VkIGJ5IHRoZSBxdWV1ZS4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcnVubmluZyAtIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBudW1iZXIgb2YgaXRlbXNcbiAgICAgKiBjdXJyZW50bHkgYmVpbmcgcHJvY2Vzc2VkLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB3b3JrZXJzTGlzdCAtIGEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBhcnJheSBvZiBpdGVtc1xuICAgICAqIGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGlkbGUgLSBhIGZ1bmN0aW9uIHJldHVybmluZyBmYWxzZSBpZiB0aGVyZSBhcmUgaXRlbXNcbiAgICAgKiB3YWl0aW5nIG9yIGJlaW5nIHByb2Nlc3NlZCwgb3IgdHJ1ZSBpZiBub3QuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb25jdXJyZW5jeSAtIGFuIGludGVnZXIgZm9yIGRldGVybWluaW5nIGhvdyBtYW55IGB3b3JrZXJgXG4gICAgICogZnVuY3Rpb25zIHNob3VsZCBiZSBydW4gaW4gcGFyYWxsZWwuIFRoaXMgcHJvcGVydHkgY2FuIGJlIGNoYW5nZWQgYWZ0ZXIgYVxuICAgICAqIGBxdWV1ZWAgaXMgY3JlYXRlZCB0byBhbHRlciB0aGUgY29uY3VycmVuY3kgb24tdGhlLWZseS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBwdXNoIC0gYWRkIGEgbmV3IHRhc2sgdG8gdGhlIGBxdWV1ZWAuIENhbGxzIGBjYWxsYmFja2BcbiAgICAgKiBvbmNlIHRoZSBgd29ya2VyYCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZyB0aGUgdGFzay4gSW5zdGVhZCBvZiBhIHNpbmdsZSB0YXNrLFxuICAgICAqIGEgYHRhc2tzYCBhcnJheSBjYW4gYmUgc3VibWl0dGVkLiBUaGUgcmVzcGVjdGl2ZSBjYWxsYmFjayBpcyB1c2VkIGZvciBldmVyeVxuICAgICAqIHRhc2sgaW4gdGhlIGxpc3QuIEludm9rZSB3aXRoICh0YXNrLCBbY2FsbGJhY2tdKSxcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1bnNoaWZ0IC0gYWRkIGEgbmV3IHRhc2sgdG8gdGhlIGZyb250IG9mIHRoZSBgcXVldWVgLlxuICAgICAqIEludm9rZSB3aXRoICh0YXNrLCBbY2FsbGJhY2tdKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBzYXR1cmF0ZWQgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIG51bWJlciBvZlxuICAgICAqIHJ1bm5pbmcgd29ya2VycyBoaXRzIHRoZSBgY29uY3VycmVuY3lgIGxpbWl0LCBhbmQgZnVydGhlciB0YXNrcyB3aWxsIGJlXG4gICAgICogcXVldWVkLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVuc2F0dXJhdGVkIC0gYSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBudW1iZXJcbiAgICAgKiBvZiBydW5uaW5nIHdvcmtlcnMgaXMgbGVzcyB0aGFuIHRoZSBgY29uY3VycmVuY3lgICYgYGJ1ZmZlcmAgbGltaXRzLCBhbmRcbiAgICAgKiBmdXJ0aGVyIHRhc2tzIHdpbGwgbm90IGJlIHF1ZXVlZC5cbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYnVmZmVyIC0gQSBtaW5pbXVtIHRocmVzaG9sZCBidWZmZXIgaW4gb3JkZXIgdG8gc2F5IHRoYXRcbiAgICAgKiB0aGUgYHF1ZXVlYCBpcyBgdW5zYXR1cmF0ZWRgLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGVtcHR5IC0gYSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBsYXN0IGl0ZW1cbiAgICAgKiBmcm9tIHRoZSBgcXVldWVgIGlzIGdpdmVuIHRvIGEgYHdvcmtlcmAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZHJhaW4gLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGxhc3QgaXRlbVxuICAgICAqIGZyb20gdGhlIGBxdWV1ZWAgaGFzIHJldHVybmVkIGZyb20gdGhlIGB3b3JrZXJgLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGVycm9yIC0gYSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIGEgdGFzayBlcnJvcnMuXG4gICAgICogSGFzIHRoZSBzaWduYXR1cmUgYGZ1bmN0aW9uKGVycm9yLCB0YXNrKWAuXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBwYXVzZWQgLSBhIGJvb2xlYW4gZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIHF1ZXVlIGlzXG4gICAgICogaW4gYSBwYXVzZWQgc3RhdGUuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcGF1c2UgLSBhIGZ1bmN0aW9uIHRoYXQgcGF1c2VzIHRoZSBwcm9jZXNzaW5nIG9mIHRhc2tzXG4gICAgICogdW50aWwgYHJlc3VtZSgpYCBpcyBjYWxsZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJlc3VtZSAtIGEgZnVuY3Rpb24gdGhhdCByZXN1bWVzIHRoZSBwcm9jZXNzaW5nIG9mXG4gICAgICogcXVldWVkIHRhc2tzIHdoZW4gdGhlIHF1ZXVlIGlzIHBhdXNlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0ga2lsbCAtIGEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBgZHJhaW5gIGNhbGxiYWNrIGFuZFxuICAgICAqIGVtcHRpZXMgcmVtYWluaW5nIHRhc2tzIGZyb20gdGhlIHF1ZXVlIGZvcmNpbmcgaXQgdG8gZ28gaWRsZS4gSW52b2tlIHdpdGggKCkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYHF1ZXVlYCBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIGBjb25jdXJyZW5jeWAuIFRhc2tzIGFkZGVkIHRvIHRoZVxuICAgICAqIGBxdWV1ZWAgYXJlIHByb2Nlc3NlZCBpbiBwYXJhbGxlbCAodXAgdG8gdGhlIGBjb25jdXJyZW5jeWAgbGltaXQpLiBJZiBhbGxcbiAgICAgKiBgd29ya2VyYHMgYXJlIGluIHByb2dyZXNzLCB0aGUgdGFzayBpcyBxdWV1ZWQgdW50aWwgb25lIGJlY29tZXMgYXZhaWxhYmxlLlxuICAgICAqIE9uY2UgYSBgd29ya2VyYCBjb21wbGV0ZXMgYSBgdGFza2AsIHRoYXQgYHRhc2tgJ3MgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICAgICAqXG4gICAgICogQG5hbWUgcXVldWVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHdvcmtlciAtIEFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBmb3IgcHJvY2Vzc2luZyBhIHF1ZXVlZFxuICAgICAqIHRhc2ssIHdoaWNoIG11c3QgY2FsbCBpdHMgYGNhbGxiYWNrKGVycilgIGFyZ3VtZW50IHdoZW4gZmluaXNoZWQsIHdpdGggYW5cbiAgICAgKiBvcHRpb25hbCBgZXJyb3JgIGFzIGFuIGFyZ3VtZW50LiAgSWYgeW91IHdhbnQgdG8gaGFuZGxlIGVycm9ycyBmcm9tIGFuXG4gICAgICogaW5kaXZpZHVhbCB0YXNrLCBwYXNzIGEgY2FsbGJhY2sgdG8gYHEucHVzaCgpYC4gSW52b2tlZCB3aXRoXG4gICAgICogKHRhc2ssIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbmN5PTFdIC0gQW4gYGludGVnZXJgIGZvciBkZXRlcm1pbmluZyBob3cgbWFueVxuICAgICAqIGB3b3JrZXJgIGZ1bmN0aW9ucyBzaG91bGQgYmUgcnVuIGluIHBhcmFsbGVsLiAgSWYgb21pdHRlZCwgdGhlIGNvbmN1cnJlbmN5XG4gICAgICogZGVmYXVsdHMgdG8gYDFgLiAgSWYgdGhlIGNvbmN1cnJlbmN5IGlzIGAwYCwgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgICAqIEByZXR1cm5zIHtxdWV1ZX0gQSBxdWV1ZSBvYmplY3QgdG8gbWFuYWdlIHRoZSB0YXNrcy4gQ2FsbGJhY2tzIGNhblxuICAgICAqIGF0dGFjaGVkIGFzIGNlcnRhaW4gcHJvcGVydGllcyB0byBsaXN0ZW4gZm9yIHNwZWNpZmljIGV2ZW50cyBkdXJpbmcgdGhlXG4gICAgICogbGlmZWN5Y2xlIG9mIHRoZSBxdWV1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gY3JlYXRlIGEgcXVldWUgb2JqZWN0IHdpdGggY29uY3VycmVuY3kgMlxuICAgICAqIHZhciBxID0gYXN5bmMucXVldWUoZnVuY3Rpb24odGFzaywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2hlbGxvICcgKyB0YXNrLm5hbWUpO1xuICAgICAqICAgICBjYWxsYmFjaygpO1xuICAgICAqIH0sIDIpO1xuICAgICAqXG4gICAgICogLy8gYXNzaWduIGEgY2FsbGJhY2tcbiAgICAgKiBxLmRyYWluID0gZnVuY3Rpb24oKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdhbGwgaXRlbXMgaGF2ZSBiZWVuIHByb2Nlc3NlZCcpO1xuICAgICAqIH07XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtcyB0byB0aGUgcXVldWVcbiAgICAgKiBxLnB1c2goe25hbWU6ICdmb28nfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGZvbycpO1xuICAgICAqIH0pO1xuICAgICAqIHEucHVzaCh7bmFtZTogJ2Jhcid9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGJhcicpO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gYWRkIHNvbWUgaXRlbXMgdG8gdGhlIHF1ZXVlIChiYXRjaC13aXNlKVxuICAgICAqIHEucHVzaChbe25hbWU6ICdiYXonfSx7bmFtZTogJ2JheSd9LHtuYW1lOiAnYmF4J31dLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgaXRlbScpO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gYWRkIHNvbWUgaXRlbXMgdG8gdGhlIGZyb250IG9mIHRoZSBxdWV1ZVxuICAgICAqIHEudW5zaGlmdCh7bmFtZTogJ2Jhcid9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGJhcicpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHF1ZXVlJDEgKHdvcmtlciwgY29uY3VycmVuY3kpIHtcbiAgICAgIHJldHVybiBxdWV1ZShmdW5jdGlvbiAoaXRlbXMsIGNiKSB7XG4gICAgICAgIHdvcmtlcihpdGVtc1swXSwgY2IpO1xuICAgICAgfSwgY29uY3VycmVuY3ksIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIHtAbGluayBhc3luYy5xdWV1ZX0gb25seSB0YXNrcyBhcmUgYXNzaWduZWQgYSBwcmlvcml0eSBhbmRcbiAgICAgKiBjb21wbGV0ZWQgaW4gYXNjZW5kaW5nIHByaW9yaXR5IG9yZGVyLlxuICAgICAqXG4gICAgICogQG5hbWUgcHJpb3JpdHlRdWV1ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnF1ZXVlXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHdvcmtlciAtIEFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBmb3IgcHJvY2Vzc2luZyBhIHF1ZXVlZFxuICAgICAqIHRhc2ssIHdoaWNoIG11c3QgY2FsbCBpdHMgYGNhbGxiYWNrKGVycilgIGFyZ3VtZW50IHdoZW4gZmluaXNoZWQsIHdpdGggYW5cbiAgICAgKiBvcHRpb25hbCBgZXJyb3JgIGFzIGFuIGFyZ3VtZW50LiAgSWYgeW91IHdhbnQgdG8gaGFuZGxlIGVycm9ycyBmcm9tIGFuXG4gICAgICogaW5kaXZpZHVhbCB0YXNrLCBwYXNzIGEgY2FsbGJhY2sgdG8gYHEucHVzaCgpYC4gSW52b2tlZCB3aXRoXG4gICAgICogKHRhc2ssIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29uY3VycmVuY3kgLSBBbiBgaW50ZWdlcmAgZm9yIGRldGVybWluaW5nIGhvdyBtYW55IGB3b3JrZXJgXG4gICAgICogZnVuY3Rpb25zIHNob3VsZCBiZSBydW4gaW4gcGFyYWxsZWwuICBJZiBvbWl0dGVkLCB0aGUgY29uY3VycmVuY3kgZGVmYXVsdHMgdG9cbiAgICAgKiBgMWAuICBJZiB0aGUgY29uY3VycmVuY3kgaXMgYDBgLCBhbiBlcnJvciBpcyB0aHJvd24uXG4gICAgICogQHJldHVybnMge3F1ZXVlfSBBIHByaW9yaXR5UXVldWUgb2JqZWN0IHRvIG1hbmFnZSB0aGUgdGFza3MuIFRoZXJlIGFyZSB0d29cbiAgICAgKiBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBxdWV1ZWAgYW5kIGBwcmlvcml0eVF1ZXVlYCBvYmplY3RzOlxuICAgICAqICogYHB1c2godGFzaywgcHJpb3JpdHksIFtjYWxsYmFja10pYCAtIGBwcmlvcml0eWAgc2hvdWxkIGJlIGEgbnVtYmVyLiBJZiBhblxuICAgICAqICAgYXJyYXkgb2YgYHRhc2tzYCBpcyBnaXZlbiwgYWxsIHRhc2tzIHdpbGwgYmUgYXNzaWduZWQgdGhlIHNhbWUgcHJpb3JpdHkuXG4gICAgICogKiBUaGUgYHVuc2hpZnRgIG1ldGhvZCB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmlvcml0eVF1ZXVlICh3b3JrZXIsIGNvbmN1cnJlbmN5KSB7XG4gICAgICAgIGZ1bmN0aW9uIF9jb21wYXJlVGFza3MoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2JpbmFyeVNlYXJjaChzZXF1ZW5jZSwgaXRlbSwgY29tcGFyZSkge1xuICAgICAgICAgICAgdmFyIGJlZyA9IC0xLFxuICAgICAgICAgICAgICAgIGVuZCA9IHNlcXVlbmNlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoYmVnIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1pZCA9IGJlZyArIChlbmQgLSBiZWcgKyAxID4+PiAxKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShpdGVtLCBzZXF1ZW5jZVttaWRdKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZyA9IG1pZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBiZWc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfaW5zZXJ0KHEsIGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YXNrIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcS5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGRyYWluIGltbWVkaWF0ZWx5IGlmIHRoZXJlIGFyZSBubyB0YXNrc1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXRJbW1lZGlhdGUkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHEuZHJhaW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFycmF5RWFjaChkYXRhLCBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0YXNrLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgPyBjYWxsYmFjayA6IG5vb3BcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcS50YXNrcy5zcGxpY2UoX2JpbmFyeVNlYXJjaChxLnRhc2tzLCBpdGVtLCBfY29tcGFyZVRhc2tzKSArIDEsIDAsIGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEocS5wcm9jZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG5vcm1hbCBxdWV1ZVxuICAgICAgICB2YXIgcSA9IHF1ZXVlJDEod29ya2VyLCBjb25jdXJyZW5jeSk7XG5cbiAgICAgICAgLy8gT3ZlcnJpZGUgcHVzaCB0byBhY2NlcHQgc2Vjb25kIHBhcmFtZXRlciByZXByZXNlbnRpbmcgcHJpb3JpdHlcbiAgICAgICAgcS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCBwcmlvcml0eSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFJlbW92ZSB1bnNoaWZ0IGZ1bmN0aW9uXG4gICAgICAgIGRlbGV0ZSBxLnVuc2hpZnQ7XG5cbiAgICAgICAgcmV0dXJuIHE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgICAgICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0FycmF5TGlrZShjb2xsZWN0aW9uKSkge1xuICAgICAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAgICAgKi9cbiAgICB2YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggZWxlbWVudC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgICAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gICAgICogcHJvcGVydHkgYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmBcbiAgICAgKiBvciBgXy5mb3JPd25gIGZvciBvYmplY3QgaXRlcmF0aW9uLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQGFsaWFzIGVhY2hcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAgICAgKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8oWzEsIDJdKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICogICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICogfSk7XG4gICAgICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gICAgICpcbiAgICAgKiBfLmZvckVhY2goeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICogICBjb25zb2xlLmxvZyhrZXkpO1xuICAgICAqIH0pO1xuICAgICAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICAgIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RWFjaCA6IGJhc2VFYWNoO1xuICAgICAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUnVucyB0aGUgYHRhc2tzYCBhcnJheSBvZiBmdW5jdGlvbnMgaW4gcGFyYWxsZWwsIHdpdGhvdXQgd2FpdGluZyB1bnRpbCB0aGVcbiAgICAgKiBwcmV2aW91cyBmdW5jdGlvbiBoYXMgY29tcGxldGVkLiBPbmNlIGFueSB0aGUgYHRhc2tzYCBjb21wbGV0ZWQgb3IgcGFzcyBhblxuICAgICAqIGVycm9yIHRvIGl0cyBjYWxsYmFjaywgdGhlIG1haW4gYGNhbGxiYWNrYCBpcyBpbW1lZGlhdGVseSBjYWxsZWQuIEl0J3NcbiAgICAgKiBlcXVpdmFsZW50IHRvIGBQcm9taXNlLnJhY2UoKWAuXG4gICAgICpcbiAgICAgKiBAbmFtZSByYWNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0YXNrcyAtIEFuIGFycmF5IGNvbnRhaW5pbmcgZnVuY3Rpb25zIHRvIHJ1bi4gRWFjaCBmdW5jdGlvblxuICAgICAqIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdClgIHdoaWNoIGl0IG11c3QgY2FsbCBvbiBjb21wbGV0aW9uIHdpdGggYW5cbiAgICAgKiBlcnJvciBgZXJyYCAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFuIG9wdGlvbmFsIGByZXN1bHRgIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gQSBjYWxsYmFjayB0byBydW4gb25jZSBhbnkgb2YgdGhlIGZ1bmN0aW9ucyBoYXZlXG4gICAgICogY29tcGxldGVkLiBUaGlzIGZ1bmN0aW9uIGdldHMgYW4gZXJyb3Igb3IgcmVzdWx0IGZyb20gdGhlIGZpcnN0IGZ1bmN0aW9uIHRoYXRcbiAgICAgKiBjb21wbGV0ZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5yYWNlKFtcbiAgICAgKiAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ29uZScpO1xuICAgICAqICAgICAgICAgfSwgMjAwKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ3R3bycpO1xuICAgICAqICAgICAgICAgfSwgMTAwKTtcbiAgICAgKiAgICAgfVxuICAgICAqIF0sXG4gICAgICogLy8gbWFpbiBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHRoZSByZXN1bHQgd2lsbCBiZSBlcXVhbCB0byAndHdvJyBhcyBpdCBmaW5pc2hlcyBlYXJsaWVyXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmFjZSh0YXNrcywgY2IpIHtcbiAgICAgICAgY2IgPSBvbmNlKGNiIHx8IG5vb3ApO1xuICAgICAgICBpZiAoIWlzQXJyYXkodGFza3MpKSByZXR1cm4gY2IobmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gcmFjZSBtdXN0IGJlIGFuIGFycmF5IG9mIGZ1bmN0aW9ucycpKTtcbiAgICAgICAgaWYgKCF0YXNrcy5sZW5ndGgpIHJldHVybiBjYigpO1xuICAgICAgICBmb3JFYWNoKHRhc2tzLCBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgdGFzayhjYik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYHJlZHVjZWAsIG9ubHkgb3BlcmF0ZXMgb24gYGNvbGxgIGluIHJldmVyc2Ugb3JkZXIuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZWR1Y2VSaWdodFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnJlZHVjZVxuICAgICAqIEBhbGlhcyBmb2xkclxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7Kn0gbWVtbyAtIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSByZWR1Y3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZWFjaCBpdGVtIGluIHRoZVxuICAgICAqIGFycmF5IHRvIHByb2R1Y2UgdGhlIG5leHQgc3RlcCBpbiB0aGUgcmVkdWN0aW9uLiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYVxuICAgICAqIGBjYWxsYmFjayhlcnIsIHJlZHVjdGlvbilgIHdoaWNoIGFjY2VwdHMgYW4gb3B0aW9uYWwgZXJyb3IgYXMgaXRzIGZpcnN0XG4gICAgICogYXJndW1lbnQsIGFuZCB0aGUgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbiBhcyB0aGUgc2Vjb25kLiBJZiBhbiBlcnJvciBpc1xuICAgICAqIHBhc3NlZCB0byB0aGUgY2FsbGJhY2ssIHRoZSByZWR1Y3Rpb24gaXMgc3RvcHBlZCBhbmQgdGhlIG1haW4gYGNhbGxiYWNrYCBpc1xuICAgICAqIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci4gSW52b2tlZCB3aXRoIChtZW1vLCBpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgaXMgdGhlIHJlZHVjZWQgdmFsdWUuIEludm9rZWQgd2l0aFxuICAgICAqIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVkdWNlUmlnaHQoYXJyLCBtZW1vLCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgIHZhciByZXZlcnNlZCA9IHNsaWNlLmNhbGwoYXJyKS5yZXZlcnNlKCk7XG4gICAgICByZWR1Y2UocmV2ZXJzZWQsIG1lbW8sIGl0ZXJhdGVlLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JhcHMgdGhlIGZ1bmN0aW9uIGluIGFub3RoZXIgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyBkYXRhIGV2ZW4gd2hlbiBpdFxuICAgICAqIGVycm9ycy5cbiAgICAgKlxuICAgICAqIFRoZSBvYmplY3QgcmV0dXJuZWQgaGFzIGVpdGhlciB0aGUgcHJvcGVydHkgYGVycm9yYCBvciBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQG5hbWUgcmVmbGVjdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gVGhlIGZ1bmN0aW9uIHlvdSB3YW50IHRvIHdyYXBcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gQSBmdW5jdGlvbiB0aGF0IGFsd2F5cyBwYXNzZXMgbnVsbCB0byBpdCdzIGNhbGxiYWNrIGFzXG4gICAgICogdGhlIGVycm9yLiBUaGUgc2Vjb25kIGFyZ3VtZW50IHRvIHRoZSBjYWxsYmFjayB3aWxsIGJlIGFuIGBvYmplY3RgIHdpdGhcbiAgICAgKiBlaXRoZXIgYW4gYGVycm9yYCBvciBhIGB2YWx1ZWAgcHJvcGVydHkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnBhcmFsbGVsKFtcbiAgICAgKiAgICAgYXN5bmMucmVmbGVjdChmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBzdHVmZiAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdvbmUnKTtcbiAgICAgKiAgICAgfSksXG4gICAgICogICAgIGFzeW5jLnJlZmxlY3QoZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGRvIHNvbWUgbW9yZSBzdHVmZiBidXQgZXJyb3IgLi4uXG4gICAgICogICAgICAgICBjYWxsYmFjaygnYmFkIHN0dWZmIGhhcHBlbmVkJyk7XG4gICAgICogICAgIH0pLFxuICAgICAqICAgICBhc3luYy5yZWZsZWN0KGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIG1vcmUgc3R1ZmYgLi4uXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAndHdvJyk7XG4gICAgICogICAgIH0pXG4gICAgICogXSxcbiAgICAgKiAvLyBvcHRpb25hbCBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyB2YWx1ZXNcbiAgICAgKiAgICAgLy8gcmVzdWx0c1swXS52YWx1ZSA9ICdvbmUnXG4gICAgICogICAgIC8vIHJlc3VsdHNbMV0uZXJyb3IgPSAnYmFkIHN0dWZmIGhhcHBlbmVkJ1xuICAgICAqICAgICAvLyByZXN1bHRzWzJdLnZhbHVlID0gJ3R3bydcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWZsZWN0KGZuKSB7XG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIHJlZmxlY3RPbihhcmdzLCByZWZsZWN0Q2FsbGJhY2spIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChyZXN0KGZ1bmN0aW9uIGNhbGxiYWNrKGVyciwgY2JBcmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWZsZWN0Q2FsbGJhY2sobnVsbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2JBcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYkFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2JBcmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2JBcmdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZmxlY3RDYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlamVjdCQxKGVhY2hmbiwgYXJyLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgX2ZpbHRlcihlYWNoZm4sIGFyciwgZnVuY3Rpb24gKHZhbHVlLCBjYikge1xuICAgICAgICAgICAgaXRlcmF0ZWUodmFsdWUsIGZ1bmN0aW9uIChlcnIsIHYpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgIXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYHJlamVjdGAgYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgICogdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlamVjdExpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVqZWN0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGBpdGVyYXRlZWAgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgLCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIHJlamVjdExpbWl0ID0gZG9QYXJhbGxlbExpbWl0KHJlamVjdCQxKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHBvc2l0ZSBvZiBgZmlsdGVyYC4gUmVtb3ZlcyB2YWx1ZXMgdGhhdCBwYXNzIGFuIGBhc3luY2AgdHJ1dGggdGVzdC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlamVjdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmZpbHRlclxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGBpdGVyYXRlZWAgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgLCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnJlamVjdChbJ2ZpbGUxJywnZmlsZTInLCdmaWxlMyddLCBmdW5jdGlvbihmaWxlUGF0aCwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZnMuYWNjZXNzKGZpbGVQYXRoLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICFlcnIpXG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIG5vdyBlcXVhbHMgYW4gYXJyYXkgb2YgbWlzc2luZyBmaWxlc1xuICAgICAqICAgICBjcmVhdGVGaWxlcyhyZXN1bHRzKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0ID0gZG9MaW1pdChyZWplY3RMaW1pdCwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogQSBoZWxwZXIgZnVuY3Rpb24gdGhhdCB3cmFwcyBhbiBhcnJheSBvZiBmdW5jdGlvbnMgd2l0aCByZWZsZWN0LlxuICAgICAqXG4gICAgICogQG5hbWUgcmVmbGVjdEFsbFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnJlZmxlY3RcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRhc2tzIC0gVGhlIGFycmF5IG9mIGZ1bmN0aW9ucyB0byB3cmFwIGluIGBhc3luYy5yZWZsZWN0YC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZnVuY3Rpb25zLCBlYWNoIGZ1bmN0aW9uIHdyYXBwZWQgaW5cbiAgICAgKiBgYXN5bmMucmVmbGVjdGBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogbGV0IHRhc2tzID0gW1xuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJyk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBtb3JlIHN0dWZmIGJ1dCBlcnJvciAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcignYmFkIHN0dWZmIGhhcHBlbmVkJykpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAndHdvJyk7XG4gICAgICogICAgICAgICB9LCAxMDApO1xuICAgICAqICAgICB9XG4gICAgICogXTtcbiAgICAgKlxuICAgICAqIGFzeW5jLnBhcmFsbGVsKGFzeW5jLnJlZmxlY3RBbGwodGFza3MpLFxuICAgICAqIC8vIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHZhbHVlc1xuICAgICAqICAgICAvLyByZXN1bHRzWzBdLnZhbHVlID0gJ29uZSdcbiAgICAgKiAgICAgLy8gcmVzdWx0c1sxXS5lcnJvciA9IEVycm9yKCdiYWQgc3R1ZmYgaGFwcGVuZWQnKVxuICAgICAqICAgICAvLyByZXN1bHRzWzJdLnZhbHVlID0gJ3R3bydcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWZsZWN0QWxsKHRhc2tzKSB7XG4gICAgICByZXR1cm4gdGFza3MubWFwKHJlZmxlY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGByZWplY3RgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlamVjdFNlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnJlamVjdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGBpdGVyYXRlZWAgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgLCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIHJlamVjdFNlcmllcyA9IGRvTGltaXQocmVqZWN0TGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogUnVuIHRoZSBmdW5jdGlvbnMgaW4gdGhlIGB0YXNrc2AgY29sbGVjdGlvbiBpbiBzZXJpZXMsIGVhY2ggb25lIHJ1bm5pbmcgb25jZVxuICAgICAqIHRoZSBwcmV2aW91cyBmdW5jdGlvbiBoYXMgY29tcGxldGVkLiBJZiBhbnkgZnVuY3Rpb25zIGluIHRoZSBzZXJpZXMgcGFzcyBhblxuICAgICAqIGVycm9yIHRvIGl0cyBjYWxsYmFjaywgbm8gbW9yZSBmdW5jdGlvbnMgYXJlIHJ1biwgYW5kIGBjYWxsYmFja2AgaXNcbiAgICAgKiBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGUgdmFsdWUgb2YgdGhlIGVycm9yLiBPdGhlcndpc2UsIGBjYWxsYmFja2BcbiAgICAgKiByZWNlaXZlcyBhbiBhcnJheSBvZiByZXN1bHRzIHdoZW4gYHRhc2tzYCBoYXZlIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gdXNlIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5LiBFYWNoIHByb3BlcnR5IHdpbGxcbiAgICAgKiBiZSBydW4gYXMgYSBmdW5jdGlvbiwgYW5kIHRoZSByZXN1bHRzIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBmaW5hbCBgY2FsbGJhY2tgXG4gICAgICogYXMgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkuIFRoaXMgY2FuIGJlIGEgbW9yZSByZWFkYWJsZSB3YXkgb2YgaGFuZGxpbmdcbiAgICAgKiAgcmVzdWx0cyBmcm9tIHtAbGluayBhc3luYy5zZXJpZXN9LlxuICAgICAqXG4gICAgICogKipOb3RlKiogdGhhdCB3aGlsZSBtYW55IGltcGxlbWVudGF0aW9ucyBwcmVzZXJ2ZSB0aGUgb3JkZXIgb2Ygb2JqZWN0XG4gICAgICogcHJvcGVydGllcywgdGhlIFtFQ01BU2NyaXB0IExhbmd1YWdlIFNwZWNpZmljYXRpb25dKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy04LjYpXG4gICAgICogZXhwbGljaXRseSBzdGF0ZXMgdGhhdFxuICAgICAqXG4gICAgICogPiBUaGUgbWVjaGFuaWNzIGFuZCBvcmRlciBvZiBlbnVtZXJhdGluZyB0aGUgcHJvcGVydGllcyBpcyBub3Qgc3BlY2lmaWVkLlxuICAgICAqXG4gICAgICogU28gaWYgeW91IHJlbHkgb24gdGhlIG9yZGVyIGluIHdoaWNoIHlvdXIgc2VyaWVzIG9mIGZ1bmN0aW9ucyBhcmUgZXhlY3V0ZWQsXG4gICAgICogYW5kIHdhbnQgdGhpcyB0byB3b3JrIG9uIGFsbCBwbGF0Zm9ybXMsIGNvbnNpZGVyIHVzaW5nIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQG5hbWUgc2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gdGFza3MgLSBBIGNvbGxlY3Rpb24gY29udGFpbmluZyBmdW5jdGlvbnMgdG8gcnVuLCBlYWNoXG4gICAgICogZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgaXQgbXVzdCBjYWxsIG9uIGNvbXBsZXRpb24gd2l0aFxuICAgICAqIGFuIGVycm9yIGBlcnJgICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW4gb3B0aW9uYWwgYHJlc3VsdGAgdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFsbCB0aGVcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQuIFRoaXMgZnVuY3Rpb24gZ2V0cyBhIHJlc3VsdHMgYXJyYXkgKG9yIG9iamVjdClcbiAgICAgKiBjb250YWluaW5nIGFsbCB0aGUgcmVzdWx0IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGB0YXNrYCBjYWxsYmFja3MuIEludm9rZWRcbiAgICAgKiB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBhc3luYy5zZXJpZXMoW1xuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBzdHVmZiAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdvbmUnKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGRvIHNvbWUgbW9yZSBzdHVmZiAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgfVxuICAgICAqIF0sXG4gICAgICogLy8gb3B0aW9uYWwgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBpcyBub3cgZXF1YWwgdG8gWydvbmUnLCAndHdvJ11cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIGFzeW5jLnNlcmllcyh7XG4gICAgICogICAgIG9uZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgMSk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICB0d286IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgMik7XG4gICAgICogICAgICAgICB9LCAxMDApO1xuICAgICAqICAgICB9XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHJlc3VsdHMgaXMgbm93IGVxdWFsIHRvOiB7b25lOiAxLCB0d286IDJ9XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VyaWVzKHRhc2tzLCBjYikge1xuICAgICAgcmV0dXJuIF9wYXJhbGxlbChlYWNoT2ZTZXJpZXMsIHRhc2tzLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDIuNC4wXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gICAgICpcbiAgICAgKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAgICAgKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAgICAgKlxuICAgICAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdGFudCQxKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gZ2V0IGEgc3VjY2Vzc2Z1bCByZXNwb25zZSBmcm9tIGB0YXNrYCBubyBtb3JlIHRoYW4gYHRpbWVzYCB0aW1lc1xuICAgICAqIGJlZm9yZSByZXR1cm5pbmcgYW4gZXJyb3IuIElmIHRoZSB0YXNrIGlzIHN1Y2Nlc3NmdWwsIHRoZSBgY2FsbGJhY2tgIHdpbGwgYmVcbiAgICAgKiBwYXNzZWQgdGhlIHJlc3VsdCBvZiB0aGUgc3VjY2Vzc2Z1bCB0YXNrLiBJZiBhbGwgYXR0ZW1wdHMgZmFpbCwgdGhlIGNhbGxiYWNrXG4gICAgICogd2lsbCBiZSBwYXNzZWQgdGhlIGVycm9yIGFuZCByZXN1bHQgKGlmIGFueSkgb2YgdGhlIGZpbmFsIGF0dGVtcHQuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZXRyeVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVtYmVyfSBbb3B0cyA9IHt0aW1lczogNSwgaW50ZXJ2YWw6IDB9fCA1XSAtIENhbiBiZSBlaXRoZXIgYW5cbiAgICAgKiBvYmplY3Qgd2l0aCBgdGltZXNgIGFuZCBgaW50ZXJ2YWxgIG9yIGEgbnVtYmVyLlxuICAgICAqICogYHRpbWVzYCAtIFRoZSBudW1iZXIgb2YgYXR0ZW1wdHMgdG8gbWFrZSBiZWZvcmUgZ2l2aW5nIHVwLiAgVGhlIGRlZmF1bHRcbiAgICAgKiAgIGlzIGA1YC5cbiAgICAgKiAqIGBpbnRlcnZhbGAgLSBUaGUgdGltZSB0byB3YWl0IGJldHdlZW4gcmV0cmllcywgaW4gbWlsbGlzZWNvbmRzLiAgVGhlXG4gICAgICogICBkZWZhdWx0IGlzIGAwYC4gVGhlIGludGVydmFsIG1heSBhbHNvIGJlIHNwZWNpZmllZCBhcyBhIGZ1bmN0aW9uIG9mIHRoZVxuICAgICAqICAgcmV0cnkgY291bnQgKHNlZSBleGFtcGxlKS5cbiAgICAgKiAqIElmIGBvcHRzYCBpcyBhIG51bWJlciwgdGhlIG51bWJlciBzcGVjaWZpZXMgdGhlIG51bWJlciBvZiB0aW1lcyB0byByZXRyeSxcbiAgICAgKiAgIHdpdGggdGhlIGRlZmF1bHQgaW50ZXJ2YWwgb2YgYDBgLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRhc2sgLSBBIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIHR3byBhcmd1bWVudHM6ICgxKSBhXG4gICAgICogYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgd2hlbiBmaW5pc2hlZCwgcGFzc2luZyBgZXJyYFxuICAgICAqICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgdGhlIGByZXN1bHRgIG9mIHRoZSBmdW5jdGlvbidzIGV4ZWN1dGlvbiwgYW5kICgyKVxuICAgICAqIGEgYHJlc3VsdHNgIG9iamVjdCwgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcHJldmlvdXNseSBleGVjdXRlZFxuICAgICAqIGZ1bmN0aW9ucyAoaWYgbmVzdGVkIGluc2lkZSBhbm90aGVyIGNvbnRyb2wgZmxvdykuIEludm9rZWQgd2l0aFxuICAgICAqIChjYWxsYmFjaywgcmVzdWx0cykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIHRoZVxuICAgICAqIHRhc2sgaGFzIHN1Y2NlZWRlZCwgb3IgYWZ0ZXIgdGhlIGZpbmFsIGZhaWxlZCBhdHRlbXB0LiBJdCByZWNlaXZlcyB0aGUgYGVycmBcbiAgICAgKiBhbmQgYHJlc3VsdGAgYXJndW1lbnRzIG9mIHRoZSBsYXN0IGF0dGVtcHQgYXQgY29tcGxldGluZyB0aGUgYHRhc2tgLiBJbnZva2VkXG4gICAgICogd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gVGhlIGByZXRyeWAgZnVuY3Rpb24gY2FuIGJlIHVzZWQgYXMgYSBzdGFuZC1hbG9uZSBjb250cm9sIGZsb3cgYnkgcGFzc2luZ1xuICAgICAqIC8vIGEgY2FsbGJhY2ssIGFzIHNob3duIGJlbG93OlxuICAgICAqXG4gICAgICogLy8gdHJ5IGNhbGxpbmcgYXBpTWV0aG9kIDMgdGltZXNcbiAgICAgKiBhc3luYy5yZXRyeSgzLCBhcGlNZXRob2QsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXN1bHRcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIHRyeSBjYWxsaW5nIGFwaU1ldGhvZCAzIHRpbWVzLCB3YWl0aW5nIDIwMCBtcyBiZXR3ZWVuIGVhY2ggcmV0cnlcbiAgICAgKiBhc3luYy5yZXRyeSh7dGltZXM6IDMsIGludGVydmFsOiAyMDB9LCBhcGlNZXRob2QsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXN1bHRcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIHRyeSBjYWxsaW5nIGFwaU1ldGhvZCAxMCB0aW1lcyB3aXRoIGV4cG9uZW50aWFsIGJhY2tvZmZcbiAgICAgKiAvLyAoaS5lLiBpbnRlcnZhbHMgb2YgMTAwLCAyMDAsIDQwMCwgODAwLCAxNjAwLCAuLi4gbWlsbGlzZWNvbmRzKVxuICAgICAqIGFzeW5jLnJldHJ5KHtcbiAgICAgKiAgIHRpbWVzOiAxMCxcbiAgICAgKiAgIGludGVydmFsOiBmdW5jdGlvbihyZXRyeUNvdW50KSB7XG4gICAgICogICAgIHJldHVybiA1MCAqIE1hdGgucG93KDIsIHJldHJ5Q291bnQpO1xuICAgICAqICAgfVxuICAgICAqIH0sIGFwaU1ldGhvZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3VsdFxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gdHJ5IGNhbGxpbmcgYXBpTWV0aG9kIHRoZSBkZWZhdWx0IDUgdGltZXMgbm8gZGVsYXkgYmV0d2VlbiBlYWNoIHJldHJ5XG4gICAgICogYXN5bmMucmV0cnkoYXBpTWV0aG9kLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgcmVzdWx0XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBJdCBjYW4gYWxzbyBiZSBlbWJlZGRlZCB3aXRoaW4gb3RoZXIgY29udHJvbCBmbG93IGZ1bmN0aW9ucyB0byByZXRyeVxuICAgICAqIC8vIGluZGl2aWR1YWwgbWV0aG9kcyB0aGF0IGFyZSBub3QgYXMgcmVsaWFibGUsIGxpa2UgdGhpczpcbiAgICAgKiBhc3luYy5hdXRvKHtcbiAgICAgKiAgICAgdXNlcnM6IGFwaS5nZXRVc2Vycy5iaW5kKGFwaSksXG4gICAgICogICAgIHBheW1lbnRzOiBhc3luYy5yZXRyeSgzLCBhcGkuZ2V0UGF5bWVudHMuYmluZChhcGkpKVxuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgcmVzdWx0c1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJldHJ5KHRpbWVzLCB0YXNrLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgREVGQVVMVF9USU1FUyA9IDU7XG4gICAgICAgIHZhciBERUZBVUxUX0lOVEVSVkFMID0gMDtcblxuICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgIHRpbWVzOiBERUZBVUxUX1RJTUVTLFxuICAgICAgICAgICAgaW50ZXJ2YWxGdW5jOiBjb25zdGFudCQxKERFRkFVTFRfSU5URVJWQUwpXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VUaW1lcyhhY2MsIHQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBhY2MudGltZXMgPSArdC50aW1lcyB8fCBERUZBVUxUX1RJTUVTO1xuXG4gICAgICAgICAgICAgICAgYWNjLmludGVydmFsRnVuYyA9IHR5cGVvZiB0LmludGVydmFsID09PSAnZnVuY3Rpb24nID8gdC5pbnRlcnZhbCA6IGNvbnN0YW50JDEoK3QuaW50ZXJ2YWwgfHwgREVGQVVMVF9JTlRFUlZBTCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0ID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBhY2MudGltZXMgPSArdCB8fCBERUZBVUxUX1RJTUVTO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50cyBmb3IgYXN5bmMucmV0cnlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMgJiYgdHlwZW9mIHRpbWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHRhc2sgfHwgbm9vcDtcbiAgICAgICAgICAgIHRhc2sgPSB0aW1lcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlVGltZXMob3B0cywgdGltZXMpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBub29wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0YXNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50cyBmb3IgYXN5bmMucmV0cnlcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXR0ZW1wdHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBvcHRzLnRpbWVzICsgMTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXNGaW5hbEF0dGVtcHQgPSBpID09IG9wdHMudGltZXM7XG4gICAgICAgICAgICBhdHRlbXB0cy5wdXNoKHJldHJ5QXR0ZW1wdChpc0ZpbmFsQXR0ZW1wdCkpO1xuICAgICAgICAgICAgdmFyIGludGVydmFsID0gb3B0cy5pbnRlcnZhbEZ1bmMoaSk7XG4gICAgICAgICAgICBpZiAoIWlzRmluYWxBdHRlbXB0ICYmIGludGVydmFsID4gMCkge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VyaWVzKGF0dGVtcHRzLCBmdW5jdGlvbiAoZG9uZSwgZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGFbZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEuZXJyLCBkYXRhLnJlc3VsdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJldHJ5QXR0ZW1wdChpc0ZpbmFsQXR0ZW1wdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJpZXNDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRhc2soZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllc0NhbGxiYWNrKCFlcnIgfHwgaXNGaW5hbEF0dGVtcHQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycjogZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmV0cnlJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzZXJpZXNDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXJpZXNDYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBjbG9zZSByZWxhdGl2ZSBvZiBgcmV0cnlgLiAgVGhpcyBtZXRob2Qgd3JhcHMgYSB0YXNrIGFuZCBtYWtlcyBpdFxuICAgICAqIHJldHJ5YWJsZSwgcmF0aGVyIHRoYW4gaW1tZWRpYXRlbHkgY2FsbGluZyBpdCB3aXRoIHJldHJpZXMuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZXRyeWFibGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5yZXRyeVxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudW1iZXJ9IFtvcHRzID0ge3RpbWVzOiA1LCBpbnRlcnZhbDogMH18IDVdIC0gb3B0aW9uYWxcbiAgICAgKiBvcHRpb25zLCBleGFjdGx5IHRoZSBzYW1lIGFzIGZyb20gYHJldHJ5YFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRhc2sgLSB0aGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9uIHRvIHdyYXBcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb25zfSBUaGUgd3JhcHBlZCBmdW5jdGlvbiwgd2hpY2ggd2hlbiBpbnZva2VkLCB3aWxsIHJldHJ5IG9uXG4gICAgICogYW4gZXJyb3IsIGJhc2VkIG9uIHRoZSBwYXJhbWV0ZXJzIHNwZWNpZmllZCBpbiBgb3B0c2AuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICBkZXAxOiBhc3luYy5yZXRyeWFibGUoMywgZ2V0RnJvbUZsYWt5U2VydmljZSksXG4gICAgICogICAgIHByb2Nlc3M6IFtcImRlcDFcIiwgYXN5bmMucmV0cnlhYmxlKDMsIGZ1bmN0aW9uIChyZXN1bHRzLCBjYikge1xuICAgICAqICAgICAgICAgbWF5YmVQcm9jZXNzRGF0YShyZXN1bHRzLmRlcDEsIGNiKTtcbiAgICAgKiAgICAgfSldXG4gICAgICogfSwgY2FsbGJhY2spO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJldHJ5YWJsZSAob3B0cywgdGFzaykge1xuICAgICAgICBpZiAoIXRhc2spIHtcbiAgICAgICAgICAgIHRhc2sgPSBvcHRzO1xuICAgICAgICAgICAgb3B0cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gKGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiB0YXNrRm4oY2IpIHtcbiAgICAgICAgICAgICAgICB0YXNrLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KFtjYl0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMpIHJldHJ5KG9wdHMsIHRhc2tGbiwgY2FsbGJhY2spO2Vsc2UgcmV0cnkodGFza0ZuLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBzb21lYCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHNvbWVMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnNvbWVcbiAgICAgKiBAYWxpYXMgYW55TGltaXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIHRoZSBhcnJheVxuICAgICAqIGluIHBhcmFsbGVsLiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgIHdoaWNoIG11c3RcbiAgICAgKiBiZSBjYWxsZWQgd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhcyBzb29uIGFzIGFueVxuICAgICAqIGl0ZXJhdGVlIHJldHVybnMgYHRydWVgLCBvciBhZnRlciBhbGwgdGhlIGl0ZXJhdGVlIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLlxuICAgICAqIFJlc3VsdCB3aWxsIGJlIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYCBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmNcbiAgICAgKiB0ZXN0cy4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgdmFyIHNvbWVMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoZWFjaE9mTGltaXQsIEJvb2xlYW4sIGlkZW50aXR5KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBgY29sbGAgc2F0aXNmaWVzIGFuIGFzeW5jIHRlc3QuXG4gICAgICogSWYgYW55IGl0ZXJhdGVlIGNhbGwgcmV0dXJucyBgdHJ1ZWAsIHRoZSBtYWluIGBjYWxsYmFja2AgaXMgaW1tZWRpYXRlbHlcbiAgICAgKiBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBzb21lXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBhbnlcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XG4gICAgICogaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAgd2hpY2ggbXVzdFxuICAgICAqIGJlIGNhbGxlZCB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuXG4gICAgICogUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luY1xuICAgICAqIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuc29tZShbJ2ZpbGUxJywnZmlsZTInLCdmaWxlMyddLCBmdW5jdGlvbihmaWxlUGF0aCwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZnMuYWNjZXNzKGZpbGVQYXRoLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICFlcnIpXG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGlmIHJlc3VsdCBpcyB0cnVlIHRoZW4gYXQgbGVhc3Qgb25lIG9mIHRoZSBmaWxlcyBleGlzdHNcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgc29tZSA9IGRvTGltaXQoc29tZUxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgc29tZWAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgc29tZVNlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnNvbWVcbiAgICAgKiBAYWxpYXMgYW55U2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIHRoZSBhcnJheVxuICAgICAqIGluIHBhcmFsbGVsLiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgIHdoaWNoIG11c3RcbiAgICAgKiBiZSBjYWxsZWQgd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhcyBzb29uIGFzIGFueVxuICAgICAqIGl0ZXJhdGVlIHJldHVybnMgYHRydWVgLCBvciBhZnRlciBhbGwgdGhlIGl0ZXJhdGVlIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLlxuICAgICAqIFJlc3VsdCB3aWxsIGJlIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYCBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmNcbiAgICAgKiB0ZXN0cy4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgdmFyIHNvbWVTZXJpZXMgPSBkb0xpbWl0KHNvbWVMaW1pdCwgMSk7XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyBhIGxpc3QgYnkgdGhlIHJlc3VsdHMgb2YgcnVubmluZyBlYWNoIGBjb2xsYCB2YWx1ZSB0aHJvdWdoIGFuIGFzeW5jXG4gICAgICogYGl0ZXJhdGVlYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHNvcnRCeVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgc29ydFZhbHVlKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZVxuICAgICAqIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGEgdmFsdWUgdG8gdXNlIGFzXG4gICAgICogdGhlIHNvcnQgY3JpdGVyaWEuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIHRoZSBpdGVtc1xuICAgICAqIGZyb20gdGhlIG9yaWdpbmFsIGBjb2xsYCBzb3J0ZWQgYnkgdGhlIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgYGl0ZXJhdGVlYFxuICAgICAqIGNhbGxzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnNvcnRCeShbJ2ZpbGUxJywnZmlsZTInLCdmaWxlMyddLCBmdW5jdGlvbihmaWxlLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5zdGF0KGZpbGUsIGZ1bmN0aW9uKGVyciwgc3RhdHMpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKGVyciwgc3RhdHMubXRpbWUpO1xuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBpcyBub3cgdGhlIG9yaWdpbmFsIGFycmF5IG9mIGZpbGVzIHNvcnRlZCBieVxuICAgICAqICAgICAvLyBtb2RpZmllZCBkYXRlXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBCeSBtb2RpZnlpbmcgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciB0aGVcbiAgICAgKiAvLyBzb3J0aW5nIG9yZGVyIGNhbiBiZSBpbmZsdWVuY2VkOlxuICAgICAqXG4gICAgICogLy8gYXNjZW5kaW5nIG9yZGVyXG4gICAgICogYXN5bmMuc29ydEJ5KFsxLDksMyw1XSwgZnVuY3Rpb24oeCwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgY2FsbGJhY2sobnVsbCwgeCk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgY2FsbGJhY2tcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgKiBhc3luYy5zb3J0QnkoWzEsOSwzLDVdLCBmdW5jdGlvbih4LCBjYWxsYmFjaykge1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCB4Ki0xKTsgICAgLy88LSB4Ki0xIGluc3RlYWQgb2YgeCwgdHVybnMgdGhlIG9yZGVyIGFyb3VuZFxuICAgICAqIH0sIGZ1bmN0aW9uKGVycixyZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IGNhbGxiYWNrXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gc29ydEJ5KGFyciwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIG1hcChhcnIsIGZ1bmN0aW9uICh4LCBjYikge1xuICAgICAgICAgICAgaXRlcmF0ZWUoeCwgZnVuY3Rpb24gKGVyciwgY3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgICAgICBjYihudWxsLCB7IHZhbHVlOiB4LCBjcml0ZXJpYTogY3JpdGVyaWEgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG4gICAgICAgICAgICBjYihudWxsLCBhcnJheU1hcChyZXN1bHRzLnNvcnQoY29tcGFyYXRvciksIGJhc2VQcm9wZXJ0eSgndmFsdWUnKSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjb21wYXJhdG9yKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhIHRpbWUgbGltaXQgb24gYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uLiBJZiB0aGUgZnVuY3Rpb24gZG9lcyBub3QgY2FsbFxuICAgICAqIGl0cyBjYWxsYmFjayB3aXRoaW4gdGhlIHNwZWNpZmllZCBtaWxpc2Vjb25kcywgaXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBhXG4gICAgICogdGltZW91dCBlcnJvci4gVGhlIGNvZGUgcHJvcGVydHkgZm9yIHRoZSBlcnJvciBvYmplY3Qgd2lsbCBiZSBgJ0VUSU1FRE9VVCdgLlxuICAgICAqXG4gICAgICogQG5hbWUgdGltZW91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gVGhlIGFzeW5jaHJvbm91cyBmdW5jdGlvbiB5b3Ugd2FudCB0byBzZXQgdGhlXG4gICAgICogdGltZSBsaW1pdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWlsaXNlY29uZHMgLSBUaGUgc3BlY2lmaWVkIHRpbWUgbGltaXQuXG4gICAgICogQHBhcmFtIHsqfSBbaW5mb10gLSBBbnkgdmFyaWFibGUgeW91IHdhbnQgYXR0YWNoZWQgKGBzdHJpbmdgLCBgb2JqZWN0YCwgZXRjKVxuICAgICAqIHRvIHRpbWVvdXQgRXJyb3IgZm9yIG1vcmUgaW5mb3JtYXRpb24uLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBhIHdyYXBwZWQgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGFueSBvZlxuICAgICAqIHRoZSBjb250cm9sIGZsb3cgZnVuY3Rpb25zLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy50aW1lb3V0KGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgIGRvQXN5bmNUYXNrKGNhbGxiYWNrKTtcbiAgICAgKiB9LCAxMDAwKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0aW1lb3V0KGFzeW5jRm4sIG1pbGlzZWNvbmRzLCBpbmZvKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbENhbGxiYWNrLCB0aW1lcjtcbiAgICAgICAgdmFyIHRpbWVkT3V0ID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5qZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGlmICghdGltZWRPdXQpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gYXN5bmNGbi5uYW1lIHx8ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdDYWxsYmFjayBmdW5jdGlvbiBcIicgKyBuYW1lICsgJ1wiIHRpbWVkIG91dC4nKTtcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSAnRVRJTUVET1VUJztcbiAgICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IuaW5mbyA9IGluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChhcmdzLCBvcmlnQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSBvcmlnQ2FsbGJhY2s7XG4gICAgICAgICAgICAvLyBzZXR1cCB0aW1lciBhbmQgY2FsbCBvcmlnaW5hbCBmdW5jdGlvblxuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgbWlsaXNlY29uZHMpO1xuICAgICAgICAgICAgYXN5bmNGbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChpbmplY3RlZENhbGxiYWNrKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbiAgICB2YXIgbmF0aXZlQ2VpbCA9IE1hdGguY2VpbDtcbiAgICB2YXIgbmF0aXZlTWF4JDEgPSBNYXRoLm1heDtcbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yYW5nZWAgYW5kIGBfLnJhbmdlUmlnaHRgIHdoaWNoIGRvZXNuJ3RcbiAgICAgKiBjb2VyY2UgYXJndW1lbnRzIHRvIG51bWJlcnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgVGhlIGVuZCBvZiB0aGUgcmFuZ2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgVGhlIHZhbHVlIHRvIGluY3JlbWVudCBvciBkZWNyZW1lbnQgYnkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSByYW5nZSBvZiBudW1iZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VSYW5nZShzdGFydCwgZW5kLCBzdGVwLCBmcm9tUmlnaHQpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heCQxKG5hdGl2ZUNlaWwoKGVuZCAtIHN0YXJ0KSAvIChzdGVwIHx8IDEpKSwgMCksXG4gICAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIHJlc3VsdFtmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XSA9IHN0YXJ0O1xuICAgICAgICBzdGFydCArPSBzdGVwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFRoZSBzYW1lIGFzIHtAbGluayB0aW1lc30gYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgdGltZXNMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnRpbWVzXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIG51bWJlciBvZiB0aW1lcyB0byBydW4gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGBuYCB0aW1lcy4gSW52b2tlZCB3aXRoIHRoZVxuICAgICAqIGl0ZXJhdGlvbiBpbmRleCBhbmQgYSBjYWxsYmFjayAobiwgbmV4dCkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBzZWUge0BsaW5rIGFzeW5jLm1hcH0uXG4gICAgICovXG4gICAgZnVuY3Rpb24gdGltZUxpbWl0KGNvdW50LCBsaW1pdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICByZXR1cm4gbWFwTGltaXQoYmFzZVJhbmdlKDAsIGNvdW50LCAxKSwgbGltaXQsIGl0ZXJhdGVlLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb24gYG5gIHRpbWVzLCBhbmQgYWNjdW11bGF0ZXMgcmVzdWx0cyBpbiB0aGUgc2FtZVxuICAgICAqIG1hbm5lciB5b3Ugd291bGQgdXNlIHdpdGgge0BsaW5rIGFzeW5jLm1hcH0uXG4gICAgICpcbiAgICAgKiBAbmFtZSB0aW1lc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLm1hcFxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcnVuIHRoZSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGBuYCB0aW1lcy4gSW52b2tlZCB3aXRoIHRoZVxuICAgICAqIGl0ZXJhdGlvbiBpbmRleCBhbmQgYSBjYWxsYmFjayAobiwgbmV4dCkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBzZWUge0BsaW5rIGFzeW5jLm1hcH0uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIFByZXRlbmQgdGhpcyBpcyBzb21lIGNvbXBsaWNhdGVkIGFzeW5jIGZhY3RvcnlcbiAgICAgKiB2YXIgY3JlYXRlVXNlciA9IGZ1bmN0aW9uKGlkLCBjYWxsYmFjaykge1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCB7XG4gICAgICogICAgICAgICBpZDogJ3VzZXInICsgaWRcbiAgICAgKiAgICAgfSk7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIC8vIGdlbmVyYXRlIDUgdXNlcnNcbiAgICAgKiBhc3luYy50aW1lcyg1LCBmdW5jdGlvbihuLCBuZXh0KSB7XG4gICAgICogICAgIGNyZWF0ZVVzZXIobiwgZnVuY3Rpb24oZXJyLCB1c2VyKSB7XG4gICAgICogICAgICAgICBuZXh0KGVyciwgdXNlcik7XG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgdXNlcnMpIHtcbiAgICAgKiAgICAgLy8gd2Ugc2hvdWxkIG5vdyBoYXZlIDUgdXNlcnNcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgdGltZXMgPSBkb0xpbWl0KHRpbWVMaW1pdCwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMge0BsaW5rIGFzeW5jLnRpbWVzfSBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSB0aW1lc1Nlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnRpbWVzXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIG51bWJlciBvZiB0aW1lcyB0byBydW4gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgYG5gIHRpbWVzLiBJbnZva2VkIHdpdGggdGhlXG4gICAgICogaXRlcmF0aW9uIGluZGV4IGFuZCBhIGNhbGxiYWNrIChuLCBuZXh0KS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHNlZSB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKi9cbiAgICB2YXIgdGltZXNTZXJpZXMgPSBkb0xpbWl0KHRpbWVMaW1pdCwgMSk7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlbGF0aXZlIG9mIGByZWR1Y2VgLiAgVGFrZXMgYW4gT2JqZWN0IG9yIEFycmF5LCBhbmQgaXRlcmF0ZXMgb3ZlciBlYWNoXG4gICAgICogZWxlbWVudCBpbiBzZXJpZXMsIGVhY2ggc3RlcCBwb3RlbnRpYWxseSBtdXRhdGluZyBhbiBgYWNjdW11bGF0b3JgIHZhbHVlLlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBhY2N1bXVsYXRvciBkZWZhdWx0cyB0byB0aGUgdHlwZSBvZiBjb2xsZWN0aW9uIHBhc3NlZCBpbi5cbiAgICAgKlxuICAgICAqIEBuYW1lIHRyYW5zZm9ybVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gLSBUaGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgdHJhbnNmb3JtLiAgSWYgb21pdHRlZCxcbiAgICAgKiBpdCB3aWxsIGRlZmF1bHQgdG8gYW4gZW1wdHkgT2JqZWN0IG9yIEFycmF5LCBkZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgYGNvbGxgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZWFjaCBpdGVtIGluIHRoZVxuICAgICAqIGNvbGxlY3Rpb24gdGhhdCBwb3RlbnRpYWxseSBtb2RpZmllcyB0aGUgYWNjdW11bGF0b3IuIFRoZSBgaXRlcmF0ZWVgIGlzXG4gICAgICogcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIGFjY2VwdHMgYW4gb3B0aW9uYWwgZXJyb3IgYXMgaXRzIGZpcnN0XG4gICAgICogYXJndW1lbnQuIElmIGFuIGVycm9yIGlzIHBhc3NlZCB0byB0aGUgY2FsbGJhY2ssIHRoZSB0cmFuc2Zvcm0gaXMgc3RvcHBlZFxuICAgICAqIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKiBJbnZva2VkIHdpdGggKGFjY3VtdWxhdG9yLCBpdGVtLCBrZXksIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIFJlc3VsdCBpcyB0aGUgdHJhbnNmb3JtZWQgYWNjdW11bGF0b3IuXG4gICAgICogSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnRyYW5zZm9ybShbMSwyLDNdLCBmdW5jdGlvbihhY2MsIGl0ZW0sIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAqICAgICAvLyBwb2ludGxlc3MgYXN5bmM6XG4gICAgICogICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICBhY2MucHVzaChpdGVtICogMilcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBpcyBub3cgZXF1YWwgdG8gWzIsIDQsIDZdXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMudHJhbnNmb3JtKHthOiAxLCBiOiAyLCBjOiAzfSwgZnVuY3Rpb24gKG9iaiwgdmFsLCBrZXksIGNhbGxiYWNrKSB7XG4gICAgICogICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICBvYmpba2V5XSA9IHZhbCAqIDI7XG4gICAgICogICAgICAgICBjYWxsYmFjaygpO1xuICAgICAqICAgICB9KVxuICAgICAqIH0sIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgaXMgZXF1YWwgdG8ge2E6IDIsIGI6IDQsIGM6IDZ9XG4gICAgICogfSlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm0oYXJyLCBhY2MsIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBpdGVyYXRlZTtcbiAgICAgICAgICAgIGl0ZXJhdGVlID0gYWNjO1xuICAgICAgICAgICAgYWNjID0gaXNBcnJheShhcnIpID8gW10gOiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVhY2hPZihhcnIsIGZ1bmN0aW9uICh2LCBrLCBjYikge1xuICAgICAgICAgICAgaXRlcmF0ZWUoYWNjLCB2LCBrLCBjYik7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgYWNjKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVW5kb2VzIGEge0BsaW5rIGFzeW5jLm1lbW9pemV9ZCBmdW5jdGlvbiwgcmV2ZXJ0aW5nIGl0IHRvIHRoZSBvcmlnaW5hbCxcbiAgICAgKiB1bm1lbW9pemVkIGZvcm0uIEhhbmR5IGZvciB0ZXN0aW5nLlxuICAgICAqXG4gICAgICogQG5hbWUgdW5tZW1vaXplXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWVtb2l6ZVxuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgbWVtb2l6ZWQgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bm1lbW9pemUoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoZm4udW5tZW1vaXplZCB8fCBmbikuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBlYXRlZGx5IGNhbGwgYGZuYCB1bnRpbCBgdGVzdGAgcmV0dXJucyBgdHJ1ZWAuIENhbGxzIGBjYWxsYmFja2Agd2hlblxuICAgICAqIHN0b3BwZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gYGNhbGxiYWNrYCB3aWxsIGJlIHBhc3NlZCBhbiBlcnJvciBhbmQgYW55XG4gICAgICogYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogVGhlIGludmVyc2Ugb2Yge0BsaW5rIGFzeW5jLndoaWxzdH0uXG4gICAgICpcbiAgICAgKiBAbmFtZSB1bnRpbFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLndoaWxzdFxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0IC0gc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGJlZm9yZSBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCAoKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGVhY2ggdGltZSBgdGVzdGAgZmFpbHMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHRoZSB0ZXN0XG4gICAgICogZnVuY3Rpb24gaGFzIHBhc3NlZCBhbmQgcmVwZWF0ZWQgZXhlY3V0aW9uIG9mIGBmbmAgaGFzIHN0b3BwZWQuIGBjYWxsYmFja2BcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhbiBlcnJvciBhbmQgYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZpbmFsIGBmbmAnc1xuICAgICAqIGNhbGxiYWNrLiBJbnZva2VkIHdpdGggKGVyciwgW3Jlc3VsdHNdKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1bnRpbCh0ZXN0LCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgICAgcmV0dXJuIHdoaWxzdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRlc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSwgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIHRoZSBgdGFza3NgIGFycmF5IG9mIGZ1bmN0aW9ucyBpbiBzZXJpZXMsIGVhY2ggcGFzc2luZyB0aGVpciByZXN1bHRzIHRvXG4gICAgICogdGhlIG5leHQgaW4gdGhlIGFycmF5LiBIb3dldmVyLCBpZiBhbnkgb2YgdGhlIGB0YXNrc2AgcGFzcyBhbiBlcnJvciB0byB0aGVpclxuICAgICAqIG93biBjYWxsYmFjaywgdGhlIG5leHQgZnVuY3Rpb24gaXMgbm90IGV4ZWN1dGVkLCBhbmQgdGhlIG1haW4gYGNhbGxiYWNrYCBpc1xuICAgICAqIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKlxuICAgICAqIEBuYW1lIHdhdGVyZmFsbFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFza3MgLSBBbiBhcnJheSBvZiBmdW5jdGlvbnMgdG8gcnVuLCBlYWNoIGZ1bmN0aW9uIGlzIHBhc3NlZFxuICAgICAqIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0MSwgcmVzdWx0MiwgLi4uKWAgaXQgbXVzdCBjYWxsIG9uIGNvbXBsZXRpb24uIFRoZVxuICAgICAqIGZpcnN0IGFyZ3VtZW50IGlzIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW55IGZ1cnRoZXIgYXJndW1lbnRzXG4gICAgICogd2lsbCBiZSBwYXNzZWQgYXMgYXJndW1lbnRzIGluIG9yZGVyIHRvIHRoZSBuZXh0IHRhc2suXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFsbCB0aGVcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQuIFRoaXMgd2lsbCBiZSBwYXNzZWQgdGhlIHJlc3VsdHMgb2YgdGhlIGxhc3QgdGFzaydzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy53YXRlcmZhbGwoW1xuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ29uZScsICd0d28nKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24oYXJnMSwgYXJnMiwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGFyZzEgbm93IGVxdWFscyAnb25lJyBhbmQgYXJnMiBub3cgZXF1YWxzICd0d28nXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAndGhyZWUnKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24oYXJnMSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGFyZzEgbm93IGVxdWFscyAndGhyZWUnXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZG9uZScpO1xuICAgICAqICAgICB9XG4gICAgICogXSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBub3cgZXF1YWxzICdkb25lJ1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gT3IsIHdpdGggbmFtZWQgZnVuY3Rpb25zOlxuICAgICAqIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICogICAgIG15Rmlyc3RGdW5jdGlvbixcbiAgICAgKiAgICAgbXlTZWNvbmRGdW5jdGlvbixcbiAgICAgKiAgICAgbXlMYXN0RnVuY3Rpb24sXG4gICAgICogXSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBub3cgZXF1YWxzICdkb25lJ1xuICAgICAqIH0pO1xuICAgICAqIGZ1bmN0aW9uIG15Rmlyc3RGdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCAnb25lJywgJ3R3bycpO1xuICAgICAqIH1cbiAgICAgKiBmdW5jdGlvbiBteVNlY29uZEZ1bmN0aW9uKGFyZzEsIGFyZzIsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIGFyZzEgbm93IGVxdWFscyAnb25lJyBhbmQgYXJnMiBub3cgZXF1YWxzICd0d28nXG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsICd0aHJlZScpO1xuICAgICAqIH1cbiAgICAgKiBmdW5jdGlvbiBteUxhc3RGdW5jdGlvbihhcmcxLCBjYWxsYmFjaykge1xuICAgICAqICAgICAvLyBhcmcxIG5vdyBlcXVhbHMgJ3RocmVlJ1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCAnZG9uZScpO1xuICAgICAqIH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3YXRlcmZhbGwgKHRhc2tzLCBjYikge1xuICAgICAgICBjYiA9IG9uY2UoY2IgfHwgbm9vcCk7XG4gICAgICAgIGlmICghaXNBcnJheSh0YXNrcykpIHJldHVybiBjYihuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIHdhdGVyZmFsbCBtdXN0IGJlIGFuIGFycmF5IG9mIGZ1bmN0aW9ucycpKTtcbiAgICAgICAgaWYgKCF0YXNrcy5sZW5ndGgpIHJldHVybiBjYigpO1xuICAgICAgICB2YXIgdGFza0luZGV4ID0gMDtcblxuICAgICAgICBmdW5jdGlvbiBuZXh0VGFzayhhcmdzKSB7XG4gICAgICAgICAgICBpZiAodGFza0luZGV4ID09PSB0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IuYXBwbHkobnVsbCwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0YXNrQ2FsbGJhY2sgPSBvbmx5T25jZShyZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYi5hcHBseShudWxsLCBbZXJyXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0VGFzayhhcmdzKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgYXJncy5wdXNoKHRhc2tDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NbdGFza0luZGV4KytdO1xuICAgICAgICAgICAgdGFzay5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5leHRUYXNrKFtdKTtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSB7XG4gICAgICAgIGFwcGx5RWFjaDogYXBwbHlFYWNoLFxuICAgICAgICBhcHBseUVhY2hTZXJpZXM6IGFwcGx5RWFjaFNlcmllcyxcbiAgICAgICAgYXBwbHk6IGFwcGx5JDEsXG4gICAgICAgIGFzeW5jaWZ5OiBhc3luY2lmeSxcbiAgICAgICAgYXV0bzogYXV0byxcbiAgICAgICAgYXV0b0luamVjdDogYXV0b0luamVjdCxcbiAgICAgICAgY2FyZ286IGNhcmdvLFxuICAgICAgICBjb21wb3NlOiBjb21wb3NlLFxuICAgICAgICBjb25jYXQ6IGNvbmNhdCxcbiAgICAgICAgY29uY2F0U2VyaWVzOiBjb25jYXRTZXJpZXMsXG4gICAgICAgIGNvbnN0YW50OiBjb25zdGFudCxcbiAgICAgICAgZGV0ZWN0OiBkZXRlY3QsXG4gICAgICAgIGRldGVjdExpbWl0OiBkZXRlY3RMaW1pdCxcbiAgICAgICAgZGV0ZWN0U2VyaWVzOiBkZXRlY3RTZXJpZXMsXG4gICAgICAgIGRpcjogZGlyLFxuICAgICAgICBkb0R1cmluZzogZG9EdXJpbmcsXG4gICAgICAgIGRvVW50aWw6IGRvVW50aWwsXG4gICAgICAgIGRvV2hpbHN0OiBkb1doaWxzdCxcbiAgICAgICAgZHVyaW5nOiBkdXJpbmcsXG4gICAgICAgIGVhY2g6IGVhY2gsXG4gICAgICAgIGVhY2hMaW1pdDogZWFjaExpbWl0LFxuICAgICAgICBlYWNoT2Y6IGVhY2hPZixcbiAgICAgICAgZWFjaE9mTGltaXQ6IGVhY2hPZkxpbWl0LFxuICAgICAgICBlYWNoT2ZTZXJpZXM6IGVhY2hPZlNlcmllcyxcbiAgICAgICAgZWFjaFNlcmllczogZWFjaFNlcmllcyxcbiAgICAgICAgZW5zdXJlQXN5bmM6IGVuc3VyZUFzeW5jLFxuICAgICAgICBldmVyeTogZXZlcnksXG4gICAgICAgIGV2ZXJ5TGltaXQ6IGV2ZXJ5TGltaXQsXG4gICAgICAgIGV2ZXJ5U2VyaWVzOiBldmVyeVNlcmllcyxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZpbHRlckxpbWl0OiBmaWx0ZXJMaW1pdCxcbiAgICAgICAgZmlsdGVyU2VyaWVzOiBmaWx0ZXJTZXJpZXMsXG4gICAgICAgIGZvcmV2ZXI6IGZvcmV2ZXIsXG4gICAgICAgIGl0ZXJhdG9yOiBpdGVyYXRvciQxLFxuICAgICAgICBsb2c6IGxvZyxcbiAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgIG1hcExpbWl0OiBtYXBMaW1pdCxcbiAgICAgICAgbWFwU2VyaWVzOiBtYXBTZXJpZXMsXG4gICAgICAgIG1hcFZhbHVlczogbWFwVmFsdWVzLFxuICAgICAgICBtYXBWYWx1ZXNMaW1pdDogbWFwVmFsdWVzTGltaXQsXG4gICAgICAgIG1hcFZhbHVlc1NlcmllczogbWFwVmFsdWVzU2VyaWVzLFxuICAgICAgICBtZW1vaXplOiBtZW1vaXplJDEsXG4gICAgICAgIG5leHRUaWNrOiBuZXh0VGljayxcbiAgICAgICAgcGFyYWxsZWw6IHBhcmFsbGVsLFxuICAgICAgICBwYXJhbGxlbExpbWl0OiBwYXJhbGxlbExpbWl0LFxuICAgICAgICBwcmlvcml0eVF1ZXVlOiBwcmlvcml0eVF1ZXVlLFxuICAgICAgICBxdWV1ZTogcXVldWUkMSxcbiAgICAgICAgcmFjZTogcmFjZSxcbiAgICAgICAgcmVkdWNlOiByZWR1Y2UsXG4gICAgICAgIHJlZHVjZVJpZ2h0OiByZWR1Y2VSaWdodCxcbiAgICAgICAgcmVmbGVjdDogcmVmbGVjdCxcbiAgICAgICAgcmVmbGVjdEFsbDogcmVmbGVjdEFsbCxcbiAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgIHJlamVjdExpbWl0OiByZWplY3RMaW1pdCxcbiAgICAgICAgcmVqZWN0U2VyaWVzOiByZWplY3RTZXJpZXMsXG4gICAgICAgIHJldHJ5OiByZXRyeSxcbiAgICAgICAgcmV0cnlhYmxlOiByZXRyeWFibGUsXG4gICAgICAgIHNlcTogc2VxLFxuICAgICAgICBzZXJpZXM6IHNlcmllcyxcbiAgICAgICAgc2V0SW1tZWRpYXRlOiBzZXRJbW1lZGlhdGUkMSxcbiAgICAgICAgc29tZTogc29tZSxcbiAgICAgICAgc29tZUxpbWl0OiBzb21lTGltaXQsXG4gICAgICAgIHNvbWVTZXJpZXM6IHNvbWVTZXJpZXMsXG4gICAgICAgIHNvcnRCeTogc29ydEJ5LFxuICAgICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgICB0aW1lczogdGltZXMsXG4gICAgICAgIHRpbWVzTGltaXQ6IHRpbWVMaW1pdCxcbiAgICAgICAgdGltZXNTZXJpZXM6IHRpbWVzU2VyaWVzLFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgdW5tZW1vaXplOiB1bm1lbW9pemUsXG4gICAgICAgIHVudGlsOiB1bnRpbCxcbiAgICAgICAgd2F0ZXJmYWxsOiB3YXRlcmZhbGwsXG4gICAgICAgIHdoaWxzdDogd2hpbHN0LFxuXG4gICAgICAgIC8vIGFsaWFzZXNcbiAgICAgICAgYWxsOiBldmVyeSxcbiAgICAgICAgYW55OiBzb21lLFxuICAgICAgICBmb3JFYWNoOiBlYWNoLFxuICAgICAgICBmb3JFYWNoU2VyaWVzOiBlYWNoU2VyaWVzLFxuICAgICAgICBmb3JFYWNoTGltaXQ6IGVhY2hMaW1pdCxcbiAgICAgICAgZm9yRWFjaE9mOiBlYWNoT2YsXG4gICAgICAgIGZvckVhY2hPZlNlcmllczogZWFjaE9mU2VyaWVzLFxuICAgICAgICBmb3JFYWNoT2ZMaW1pdDogZWFjaE9mTGltaXQsXG4gICAgICAgIGluamVjdDogcmVkdWNlLFxuICAgICAgICBmb2xkbDogcmVkdWNlLFxuICAgICAgICBmb2xkcjogcmVkdWNlUmlnaHQsXG4gICAgICAgIHNlbGVjdDogZmlsdGVyLFxuICAgICAgICBzZWxlY3RMaW1pdDogZmlsdGVyTGltaXQsXG4gICAgICAgIHNlbGVjdFNlcmllczogZmlsdGVyU2VyaWVzLFxuICAgICAgICB3cmFwU3luYzogYXN5bmNpZnlcbiAgICB9O1xuXG4gICAgZXhwb3J0c1snZGVmYXVsdCddID0gaW5kZXg7XG4gICAgZXhwb3J0cy5hcHBseUVhY2ggPSBhcHBseUVhY2g7XG4gICAgZXhwb3J0cy5hcHBseUVhY2hTZXJpZXMgPSBhcHBseUVhY2hTZXJpZXM7XG4gICAgZXhwb3J0cy5hcHBseSA9IGFwcGx5JDE7XG4gICAgZXhwb3J0cy5hc3luY2lmeSA9IGFzeW5jaWZ5O1xuICAgIGV4cG9ydHMuYXV0byA9IGF1dG87XG4gICAgZXhwb3J0cy5hdXRvSW5qZWN0ID0gYXV0b0luamVjdDtcbiAgICBleHBvcnRzLmNhcmdvID0gY2FyZ287XG4gICAgZXhwb3J0cy5jb21wb3NlID0gY29tcG9zZTtcbiAgICBleHBvcnRzLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBleHBvcnRzLmNvbmNhdFNlcmllcyA9IGNvbmNhdFNlcmllcztcbiAgICBleHBvcnRzLmNvbnN0YW50ID0gY29uc3RhbnQ7XG4gICAgZXhwb3J0cy5kZXRlY3QgPSBkZXRlY3Q7XG4gICAgZXhwb3J0cy5kZXRlY3RMaW1pdCA9IGRldGVjdExpbWl0O1xuICAgIGV4cG9ydHMuZGV0ZWN0U2VyaWVzID0gZGV0ZWN0U2VyaWVzO1xuICAgIGV4cG9ydHMuZGlyID0gZGlyO1xuICAgIGV4cG9ydHMuZG9EdXJpbmcgPSBkb0R1cmluZztcbiAgICBleHBvcnRzLmRvVW50aWwgPSBkb1VudGlsO1xuICAgIGV4cG9ydHMuZG9XaGlsc3QgPSBkb1doaWxzdDtcbiAgICBleHBvcnRzLmR1cmluZyA9IGR1cmluZztcbiAgICBleHBvcnRzLmVhY2ggPSBlYWNoO1xuICAgIGV4cG9ydHMuZWFjaExpbWl0ID0gZWFjaExpbWl0O1xuICAgIGV4cG9ydHMuZWFjaE9mID0gZWFjaE9mO1xuICAgIGV4cG9ydHMuZWFjaE9mTGltaXQgPSBlYWNoT2ZMaW1pdDtcbiAgICBleHBvcnRzLmVhY2hPZlNlcmllcyA9IGVhY2hPZlNlcmllcztcbiAgICBleHBvcnRzLmVhY2hTZXJpZXMgPSBlYWNoU2VyaWVzO1xuICAgIGV4cG9ydHMuZW5zdXJlQXN5bmMgPSBlbnN1cmVBc3luYztcbiAgICBleHBvcnRzLmV2ZXJ5ID0gZXZlcnk7XG4gICAgZXhwb3J0cy5ldmVyeUxpbWl0ID0gZXZlcnlMaW1pdDtcbiAgICBleHBvcnRzLmV2ZXJ5U2VyaWVzID0gZXZlcnlTZXJpZXM7XG4gICAgZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZXhwb3J0cy5maWx0ZXJMaW1pdCA9IGZpbHRlckxpbWl0O1xuICAgIGV4cG9ydHMuZmlsdGVyU2VyaWVzID0gZmlsdGVyU2VyaWVzO1xuICAgIGV4cG9ydHMuZm9yZXZlciA9IGZvcmV2ZXI7XG4gICAgZXhwb3J0cy5pdGVyYXRvciA9IGl0ZXJhdG9yJDE7XG4gICAgZXhwb3J0cy5sb2cgPSBsb2c7XG4gICAgZXhwb3J0cy5tYXAgPSBtYXA7XG4gICAgZXhwb3J0cy5tYXBMaW1pdCA9IG1hcExpbWl0O1xuICAgIGV4cG9ydHMubWFwU2VyaWVzID0gbWFwU2VyaWVzO1xuICAgIGV4cG9ydHMubWFwVmFsdWVzID0gbWFwVmFsdWVzO1xuICAgIGV4cG9ydHMubWFwVmFsdWVzTGltaXQgPSBtYXBWYWx1ZXNMaW1pdDtcbiAgICBleHBvcnRzLm1hcFZhbHVlc1NlcmllcyA9IG1hcFZhbHVlc1NlcmllcztcbiAgICBleHBvcnRzLm1lbW9pemUgPSBtZW1vaXplJDE7XG4gICAgZXhwb3J0cy5uZXh0VGljayA9IG5leHRUaWNrO1xuICAgIGV4cG9ydHMucGFyYWxsZWwgPSBwYXJhbGxlbDtcbiAgICBleHBvcnRzLnBhcmFsbGVsTGltaXQgPSBwYXJhbGxlbExpbWl0O1xuICAgIGV4cG9ydHMucHJpb3JpdHlRdWV1ZSA9IHByaW9yaXR5UXVldWU7XG4gICAgZXhwb3J0cy5xdWV1ZSA9IHF1ZXVlJDE7XG4gICAgZXhwb3J0cy5yYWNlID0gcmFjZTtcbiAgICBleHBvcnRzLnJlZHVjZSA9IHJlZHVjZTtcbiAgICBleHBvcnRzLnJlZHVjZVJpZ2h0ID0gcmVkdWNlUmlnaHQ7XG4gICAgZXhwb3J0cy5yZWZsZWN0ID0gcmVmbGVjdDtcbiAgICBleHBvcnRzLnJlZmxlY3RBbGwgPSByZWZsZWN0QWxsO1xuICAgIGV4cG9ydHMucmVqZWN0ID0gcmVqZWN0O1xuICAgIGV4cG9ydHMucmVqZWN0TGltaXQgPSByZWplY3RMaW1pdDtcbiAgICBleHBvcnRzLnJlamVjdFNlcmllcyA9IHJlamVjdFNlcmllcztcbiAgICBleHBvcnRzLnJldHJ5ID0gcmV0cnk7XG4gICAgZXhwb3J0cy5yZXRyeWFibGUgPSByZXRyeWFibGU7XG4gICAgZXhwb3J0cy5zZXEgPSBzZXE7XG4gICAgZXhwb3J0cy5zZXJpZXMgPSBzZXJpZXM7XG4gICAgZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGUkMTtcbiAgICBleHBvcnRzLnNvbWUgPSBzb21lO1xuICAgIGV4cG9ydHMuc29tZUxpbWl0ID0gc29tZUxpbWl0O1xuICAgIGV4cG9ydHMuc29tZVNlcmllcyA9IHNvbWVTZXJpZXM7XG4gICAgZXhwb3J0cy5zb3J0QnkgPSBzb3J0Qnk7XG4gICAgZXhwb3J0cy50aW1lb3V0ID0gdGltZW91dDtcbiAgICBleHBvcnRzLnRpbWVzID0gdGltZXM7XG4gICAgZXhwb3J0cy50aW1lc0xpbWl0ID0gdGltZUxpbWl0O1xuICAgIGV4cG9ydHMudGltZXNTZXJpZXMgPSB0aW1lc1NlcmllcztcbiAgICBleHBvcnRzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICBleHBvcnRzLnVubWVtb2l6ZSA9IHVubWVtb2l6ZTtcbiAgICBleHBvcnRzLnVudGlsID0gdW50aWw7XG4gICAgZXhwb3J0cy53YXRlcmZhbGwgPSB3YXRlcmZhbGw7XG4gICAgZXhwb3J0cy53aGlsc3QgPSB3aGlsc3Q7XG4gICAgZXhwb3J0cy5hbGwgPSBldmVyeTtcbiAgICBleHBvcnRzLmFsbExpbWl0ID0gZXZlcnlMaW1pdDtcbiAgICBleHBvcnRzLmFsbFNlcmllcyA9IGV2ZXJ5U2VyaWVzO1xuICAgIGV4cG9ydHMuYW55ID0gc29tZTtcbiAgICBleHBvcnRzLmFueUxpbWl0ID0gc29tZUxpbWl0O1xuICAgIGV4cG9ydHMuYW55U2VyaWVzID0gc29tZVNlcmllcztcbiAgICBleHBvcnRzLmZpbmQgPSBkZXRlY3Q7XG4gICAgZXhwb3J0cy5maW5kTGltaXQgPSBkZXRlY3RMaW1pdDtcbiAgICBleHBvcnRzLmZpbmRTZXJpZXMgPSBkZXRlY3RTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JFYWNoID0gZWFjaDtcbiAgICBleHBvcnRzLmZvckVhY2hTZXJpZXMgPSBlYWNoU2VyaWVzO1xuICAgIGV4cG9ydHMuZm9yRWFjaExpbWl0ID0gZWFjaExpbWl0O1xuICAgIGV4cG9ydHMuZm9yRWFjaE9mID0gZWFjaE9mO1xuICAgIGV4cG9ydHMuZm9yRWFjaE9mU2VyaWVzID0gZWFjaE9mU2VyaWVzO1xuICAgIGV4cG9ydHMuZm9yRWFjaE9mTGltaXQgPSBlYWNoT2ZMaW1pdDtcbiAgICBleHBvcnRzLmluamVjdCA9IHJlZHVjZTtcbiAgICBleHBvcnRzLmZvbGRsID0gcmVkdWNlO1xuICAgIGV4cG9ydHMuZm9sZHIgPSByZWR1Y2VSaWdodDtcbiAgICBleHBvcnRzLnNlbGVjdCA9IGZpbHRlcjtcbiAgICBleHBvcnRzLnNlbGVjdExpbWl0ID0gZmlsdGVyTGltaXQ7XG4gICAgZXhwb3J0cy5zZWxlY3RTZXJpZXMgPSBmaWx0ZXJTZXJpZXM7XG4gICAgZXhwb3J0cy53cmFwU3luYyA9IGFzeW5jaWZ5O1xuXG59KSk7IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxufSAoKSlcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IGNhY2hlZFNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1cGRhdGVyIGZyb20gJy4vdXBkYXRlcic7XG5cbmZ1bmN0aW9uIG1ha2VDYWxsKHVybCwgZmV0Y2hPcHRpb25zKSB7XG4gIGNvbnN0IHRoYXQgPSB0aGlzO1xuICBjb25zdCBldmVudE5hbWUgPSBmZXRjaE9wdGlvbnMuZXZlbnROYW1lIHx8IHRoYXQuc3RvcmVJZDtcbiAgbGV0IHJlc3BvbnNlID0ge307XG4gIGZldGNoKHVybCwgZmV0Y2hPcHRpb25zKVxuICAudGhlbihyZXMgPT4ge1xuICAgIHJlc3BvbnNlLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgcmVzcG9uc2Uub2sgPSByZXMub2s7XG4gICAgaWYoIS9hcHBsaWNhdGlvblxcL2pzb24vLnRlc3QocmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgIHJldHVybiByZXMudGV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgfSlcbiAgLnRoZW4ocmVzcCA9PiB7XG4gICAgaWYoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyByZXNwO1xuICAgIH1cbiAgICBpZihmZXRjaE9wdGlvbnMucHJvcE5hbWUpIHtcbiAgICAgIHRoYXQuYWN0aW9ucy5zZXQoZmV0Y2hPcHRpb25zLnByb3BOYW1lLCAgcmVzcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZXIudXBkYXRlKGV2ZW50TmFtZSwgcmVzcCk7XG4gICAgICBpZih0eXBlb2YgZmV0Y2hPcHRpb25zLm9uU3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmZXRjaE9wdGlvbnMub25TdWNjZXNzKHJlc3ApO1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgdXBkYXRlci51cGRhdGUoZmV0Y2hPcHRpb25zLmVycm9yRXZlbnQsIGVycik7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlZmF1bHRQcm9wcykge1xuICAgIGlmKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0b3JlIGNvbnN0cnVjdG9yIGV4cGVjdHMgbmFtZSBhcyBmaXJzdCBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnN0b3JlTmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wcm9wcyA9IGRlZmF1bHRQcm9wcyB8fCB7fTtcbiAgICB0aGlzLnN0b3JlSWQgPSAoRGF0ZS5ub3coKSArIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogNjQ3NCkpLnRvU3RyaW5nKDE2KTtcbiAgICB0aGlzLmZldGNoQWN0aW9ucyA9IHt9O1xuICAgIHRoaXMuZm9ybXMgPSB7fTtcbiAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgIHRoaXMuYWN0aW9ucyA9IHtcbiAgICAgIGdldChwcm9wTmFtZSkge1xuICAgICAgICBsZXQgcmV0dXJuUHJvcCA9IHRoYXQucHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICBjb25zdCBzdG9yYWdlS2V5ID0gYCR7dGhhdC5zdG9yZU5hbWV9LSR7cHJvcE5hbWV9YDtcblxuICAgICAgICBpZighcmV0dXJuUHJvcCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5Qcm9wID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuUHJvcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFyZXR1cm5Qcm9wKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVyblByb3AgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVyblByb3AgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuUHJvcDtcbiAgICAgIH0sXG4gICAgICBnZXRBbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGF0LnByb3BzO1xuICAgICAgfSxcbiAgICAgIHNldChwcm9wTmFtZSwgdmFsdWUsIGF1dG9VcGRhdGUgPSB0cnVlLCBwZXJzaXN0KSB7XG4gICAgICAgIHRoYXQucHJvcHNbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSBgJHt0aGF0LnN0b3JlTmFtZX0tJHtwcm9wTmFtZX1gO1xuICAgICAgICBpZihwZXJzaXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYocGVyc2lzdCA9PT0gJ3Nlc3Npb24nKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYXV0b1VwZGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHVwZGF0ZXIudXBkYXRlKHRoYXQuc3RvcmVJZCwgcHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmdldCA9IHRoaXMuYWN0aW9ucy5nZXQ7XG4gICAgdGhpcy5zZXQgPSB0aGlzLmFjdGlvbnMuc2V0O1xuICAgIHRoaXMuZ2V0QWxsID0gdGhpcy5hY3Rpb25zLmdldEFsbDtcbiAgfVxuXG4gIGFkZEVycm9yQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB1cGRhdGVyLnJlZ2lzdGVyKGAke3RoaXMuc3RvcmVJZH0tZXJyb3JgLCBjYWxsYmFjayk7XG4gIH1cblxuICBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHVwZGF0ZXIucmVnaXN0ZXIodGhpcy5zdG9yZUlkLCBjYWxsYmFjayk7XG4gIH1cblxuICBhZGRBY3Rpb24oYWN0aW9uTmFtZSwgYWN0aW9uLCBhdXRvVXBhdGUgPSB0cnVlKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgaWYodHlwZW9mIGFjdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ1N0b3JlIGFkZEFjdGlvbiBpbnZhbGlkIGFyZ3VtZW50IHR5cGUgLSBBY3Rpb25zIG11c3QgYmUgZnVuY3Rpb25zJyk7XG4gICAgfVxuICAgIHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBhY3Rpb24uYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICBpZihhdXRvVXBhdGUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlci51cGRhdGUodGhhdC5zdG9yZUlkKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgYWRkSW5wdXQoaW5wdXQpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLmlucHV0c1tpbnB1dF0gPSB7XG4gICAgICBvbkNoYW5nZTogZXYgPT4ge1xuICAgICAgICB0aGlzLmlucHV0c1tpbnB1dF0udmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgIHVwZGF0ZXIudXBkYXRlKHRoYXQuc3RvcmVJZCwgaW5wdXQpO1xuICAgICAgfSxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gIH1cblxuICBnZXRJbml0YWxGb3JtU3RhdGUoZmllbGROYW1lcykge1xuICAgIGNvbnN0IGZpZWxkcyA9IHt9O1xuICAgIGZpZWxkTmFtZXMuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xuICAgICAgZmllbGRzW2ZpZWxkTmFtZV0gPSB7XG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIG9uQ2hhbmdlOiBfID0+IHt9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgZmllbGRzLCBvblN1Ym1pdDogXyA9PiB7fSB9O1xuICB9XG5cbiAgYWRkRm9ybShvcHRpb25zKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgaWYoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5maWVsZHMpKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5lcnJvcignYWRkRm9ybSByZXF1aXJlcyBhbiBhcnJheSBvZiBmaWVsZHMgbmFtZXMgYXMgaXRcXCdzIHNlY29uZCBhZ3VtZW50Jyk7XG4gICAgfVxuICAgIGxldCBldmVudE5hbWUgPSB0aGF0LnN0b3JlSWQ7XG4gICAgXG5cbiAgICB0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0gPSB7XG4gICAgICBnZXRGb3JtKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZpZWxkczogdGhpcy5maWVsZHMsXG4gICAgICAgICAgb25TdWJtaXQ6IHRoaXMub25TdWJtaXRcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBmaWVsZHM6IHt9LFxuICAgICAgb25TdWJtaXQ6IGV2ID0+IHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgYm9keSA9IHt9O1xuICAgICAgICBsZXQgZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mb3Jtc1tvcHRpb25zLm5hbWVdLmZpZWxkcykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5mb3Jtc1tvcHRpb25zLm5hbWVdLmZpZWxkcztcbiAgICAgICAgICBpZihmaWVsZHNbZmllbGRdLnJlcXVpcmVkICYmICFmaWVsZHNbZmllbGRdLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzW2ZpZWxkXS5lcnJvciA9IGBUaGUgJHtmaWVsZH0gZmllbGQgaXMgcmVxdWlyZWRgO1xuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzW2ZpZWxkXS5lcnJvciA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJvZHlbZmllbGRdID0gZmllbGRzW2ZpZWxkXS52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZXIudXBkYXRlKGV2ZW50TmFtZSwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmZldGNoQWN0aW9uc1tmZXRjaEFjdGlvbk5hbWVdKHtcbiAgICAgICAgICBib2R5XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgb3B0aW9ucy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICB0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzW2ZpZWxkLm5hbWVdID0ge1xuICAgICAgICB2YWx1ZTogdHlwZW9mIGZpZWxkLmRlZmF1bHQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGZpZWxkLmRlZmF1bHQsXG4gICAgICAgIHJlcXVpcmVkOiBmaWVsZC5yZXF1aXJlZCB8fCBmYWxzZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIG9uQ2hhbmdlOiBldiA9PiB7XG4gICAgICAgICAgbGV0IHZhbHVlID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgIGlmKGV2LnRhcmdldC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGV2LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzW2ZpZWxkLm5hbWVdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgdXBkYXRlci51cGRhdGUoZXZlbnROYW1lLCBmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpZih0eXBlb2Ygb3B0aW9ucy5vblVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZlbnROYW1lID0gYCR7dGhhdC5zdG9yZUlkfS1mb3JtYDtcbiAgICAgIHVwZGF0ZXIucmVnaXN0ZXIoZXZlbnROYW1lLCBvcHRpb25zLm9uVXBkYXRlKTtcbiAgICAgIHVwZGF0ZXIucmVnaXN0ZXIoYCR7ZXZlbnROYW1lfS1lcnJvcmAsIG9wdGlvbnMub25VcGRhdGUpO1xuICAgIH1cbiAgICBjb25zdCBmb3JtRXJyb3JFdmVudE5hbWUgPSBgJHtldmVudE5hbWV9LWZvcm0tZXJyb3JgO1xuICAgIGlmKHR5cGVvZiBvcHRpb25zLmVycm9yQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHVwZGF0ZXIucmVnaXN0ZXIoZXZlbnROYW1lLCBvcHRpb25zLm9uVXBkYXRlKTtcbiAgICAgIHVwZGF0ZXIucmVnaXN0ZXIoZm9ybUVycm9yRXZlbnROYW1lLCBvcHRpb25zLmVycm9yQ2FsbGJhY2spO1xuICAgIH1cblxuICAgIGNvbnN0IG9uU3VjY2VzcyA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAgICAgdXBkYXRlci51bnJlZ2lzdGVyKGV2ZW50TmFtZSlcbiAgICAgIG9wdGlvbnMub25TdWNjZXNzKHZhbCk7XG4gICAgICB0aGlzLmZvcm1zW25hbWVdID0ge307XG4gICAgfS5iaW5kKHRoaXMsIG9wdGlvbnMubmFtZSk7XG5cbiAgICBjb25zdCBmZXRjaEFjdGlvbk5hbWUgPSBgJHtvcHRpb25zLm5hbWV9LWZvcm1gO1xuICAgIHRoYXQuYWRkRmV0Y2hBY3Rpb24oZmV0Y2hBY3Rpb25OYW1lLCB7IFxuICAgICAgdXJsOiBvcHRpb25zLnVybCwgXG4gICAgICBtZXRob2Q6ICdwb3N0JywgZXZlbnROYW1lLCBcbiAgICAgIGVycm9yRXZlbnQ6IGZvcm1FcnJvckV2ZW50TmFtZSwgXG4gICAgICBvblN1Y2Nlc3M6IG9uU3VjY2VzcyBcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEZldGNoQWN0aW9uKGFjdGlvbk5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBtZXRob2QgPSBvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIHRoYXQuZmV0Y2hBY3Rpb25zW2FjdGlvbk5hbWVdID0gKHJlcXVlc3QpID0+IHtcbiAgICAgIGNvbnN0IGZldGNoT3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGV2ZW50TmFtZTogb3B0aW9ucy5ldmVudE5hbWUgfHwgdGhhdC5zdG9yZUlkLFxuICAgICAgICBlcnJvckV2ZW50OiBvcHRpb25zLmVycm9yRXZlbnQgfHwgYCR7dGhhdC5zdG9yZUlkfS1lcnJvcmAsXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICBvblN1Y2Nlc3M6IG9wdGlvbnMub25TdWNjZXNzXG4gICAgICB9O1xuICAgICAgaWYocmVxdWVzdCAmJiByZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYnVpbGRVcmwodXJsLCB1cmxBcmdzKSB7XG4gICAgICAgIGlmKCF1cmxBcmdzKSByZXR1cm4gdXJsO1xuICAgICAgICBPYmplY3Qua2V5cyh1cmxBcmdzKS5mb3JFYWNoKGFyZ0tleSA9PiB7XG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoYXJnS2V5LCB1cmxBcmdzW2FyZ0tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXJsQXJncyA9IHJlcXVlc3QgJiYgcmVxdWVzdC51cmxBcmdzO1xuICAgICAgY29uc3QgdXJsID0gYnVpbGRVcmwob3B0aW9ucy51cmwsIHVybEFyZ3MpO1xuICAgICAgbWFrZUNhbGwuY2FsbCh0aGF0LCB1cmwsIGZldGNoT3B0aW9ucyk7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5cbmNvbnN0IHVwZGF0ZXIgPSAoKCkgPT4ge1xuICBjb25zdCBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICBkZWZhdWx0OiBbXVxuICB9O1xuXG4gIGNvbnN0IHVucmVnaXN0ZXIgPSBldmVudE5hbWUgPT4ge1xuICAgIGRlbGV0ZSBjYWxsYmFja3NbZXZlbnROYW1lXTtcbiAgfVxuXG4gIGNvbnN0IHJlZ2lzdGVyID0gKGV2ZW50LCBjYWxsYmFjaykgPT4ge1xuICAgIGxldCBldmVudE5hbWUgPSAnZGVmYXVsdCc7XG4gICAgaWYgKHR5cGVvZiBldmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBldmVudDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBldmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGV2ZW50TmFtZSA9IGV2ZW50O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrc1tldmVudE5hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgY2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgZW1pdHRlci5vbihldmVudE5hbWUsIChwcm9wKSA9PiB7XG4gICAgICBhc3luYy5lYWNoKGNhbGxiYWNrc1tldmVudE5hbWVdLCAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY2FsbGJhY2socHJvcCk7XG4gICAgICB9KTtcbiAgICB9KVxuICB9O1xuXG4gIGNvbnN0IG9uRXZlbnQgPSAoKSA9PiB7XG4gICAgYXN5bmMuZWFjaChjYWxsYmFja3MuZGVmYXVsdCwgKGNhbGxiYWNrKSA9PiB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9OyAgXG5cbiAgZW1pdHRlci5vbigndXBkYXRlJywgb25FdmVudCk7XG5cbiAgY29uc3QgdXBkYXRlID0gKGV2ZW50LCBwcm9wKSA9PiB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgZXZlbnQgPSAndXBkYXRlJztcbiAgICB9XG5cbiAgICBlbWl0dGVyLmVtaXQoZXZlbnQsIHByb3ApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIHVucmVnaXN0ZXI6IHVucmVnaXN0ZXIsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfVxufSkoKTtcbiJdfQ==
