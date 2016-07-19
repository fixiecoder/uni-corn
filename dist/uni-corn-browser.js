(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./updater":6}],5:[function(require,module,exports){
'use strict';

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Store = _Store2.default;

},{"./Store":4}],6:[function(require,module,exports){
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

},{"async":1,"events":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvZGlzdC9hc3luYy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyYy9TdG9yZS5qcyIsInNyYy9icm93c2VyLWJ1bmRsZS5qcyIsInNyYy91cGRhdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdHFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUEsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCLFlBQXZCLEVBQXFDO0FBQ25DLE1BQU0sT0FBTyxJQUFiO0FBQ0EsTUFBTSxZQUFZLGFBQWEsU0FBYixJQUEwQixLQUFLLE9BQWpEO0FBQ0EsTUFBSSxXQUFXLEVBQWY7QUFDQSxRQUFNLEdBQU4sRUFBVyxZQUFYLEVBQ0MsSUFERCxDQUNNLGVBQU87QUFDWCxhQUFTLE1BQVQsR0FBa0IsSUFBSSxNQUF0QjtBQUNBLGFBQVMsRUFBVCxHQUFjLElBQUksRUFBbEI7QUFDQSxRQUFHLENBQUMsb0JBQW9CLElBQXBCLENBQXlCLElBQUksT0FBSixDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsQ0FBekIsQ0FBSixFQUErRDtBQUM3RCxhQUFPLElBQUksSUFBSixFQUFQO0FBQ0Q7QUFDRCxXQUFPLElBQUksSUFBSixFQUFQO0FBQ0QsR0FSRCxFQVNDLElBVEQsQ0FTTSxnQkFBUTtBQUNaLFFBQUcsQ0FBQyxTQUFTLEVBQWIsRUFBaUI7QUFDZixZQUFNLElBQU47QUFDRDtBQUNELFFBQUcsYUFBYSxRQUFoQixFQUEwQjtBQUN4QixXQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLGFBQWEsUUFBOUIsRUFBeUMsSUFBekM7QUFDRCxLQUZELE1BRU87QUFDTCx3QkFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixJQUExQjtBQUNBLFVBQUcsT0FBTyxhQUFhLFNBQXBCLEtBQWtDLFVBQXJDLEVBQWlEO0FBQy9DLHFCQUFhLFNBQWIsQ0FBdUIsSUFBdkI7QUFDRDtBQUNGO0FBQ0YsR0FyQkQsRUFzQkMsS0F0QkQsQ0FzQk8sZUFBTztBQUNaLHNCQUFRLE1BQVIsQ0FBZSxhQUFhLFVBQTVCLEVBQXdDLEdBQXhDO0FBQ0QsR0F4QkQ7QUF5QkQ7O0lBRW9CLEs7QUFDbkIsaUJBQVksSUFBWixFQUFrQixZQUFsQixFQUFnQztBQUFBOztBQUM5QixRQUFHLENBQUMsSUFBSixFQUFVO0FBQ1IsWUFBTSxJQUFJLEtBQUosQ0FBVSxrREFBVixDQUFOO0FBQ0Q7QUFDRCxRQUFNLE9BQU8sSUFBYjtBQUNBLFNBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUssS0FBTCxHQUFhLGdCQUFnQixFQUE3QjtBQUNBLFNBQUssT0FBTCxHQUFlLENBQUMsS0FBSyxHQUFMLEtBQWEsS0FBSyxJQUFMLENBQVUsS0FBSyxNQUFMLEtBQWdCLElBQTFCLENBQWQsRUFBK0MsUUFBL0MsQ0FBd0QsRUFBeEQsQ0FBZjtBQUNBLFNBQUssWUFBTCxHQUFvQixFQUFwQjtBQUNBLFNBQUssS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBSyxPQUFMLEdBQWU7QUFDYixTQURhLGVBQ1QsUUFEUyxFQUNDO0FBQ1osWUFBSSxhQUFhLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBakI7QUFDQSxZQUFNLGFBQWdCLEtBQUssU0FBckIsU0FBa0MsUUFBeEM7O0FBRUEsWUFBRyxDQUFDLFVBQUosRUFBZ0I7QUFDZCxjQUFJO0FBQ0YseUJBQWEsS0FBSyxLQUFMLENBQVcsYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQVgsQ0FBYjtBQUNELFdBRkQsQ0FFRSxPQUFPLENBQVAsRUFBVTtBQUNWLHlCQUFhLGFBQWEsT0FBYixDQUFxQixVQUFyQixDQUFiO0FBQ0Q7QUFDRjs7QUFFRCxZQUFHLENBQUMsVUFBSixFQUFnQjtBQUNkLGNBQUk7QUFDRix5QkFBYSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsVUFBdkIsQ0FBWCxDQUFiO0FBQ0QsV0FGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVO0FBQ1YseUJBQWEsYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQWI7QUFDRDtBQUNGOztBQUVELGVBQU8sVUFBUDtBQUNELE9BdEJZO0FBdUJiLFlBdkJhLG9CQXVCSjtBQUNQLGVBQU8sS0FBSyxLQUFaO0FBQ0QsT0F6Qlk7QUEwQmIsU0ExQmEsZUEwQlQsUUExQlMsRUEwQkMsS0ExQkQsRUEwQm9DO0FBQUEsWUFBNUIsVUFBNEIseURBQWYsSUFBZTtBQUFBLFlBQVQsT0FBUzs7QUFDL0MsYUFBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixLQUF2QjtBQUNBLFlBQU0sYUFBZ0IsS0FBSyxTQUFyQixTQUFrQyxRQUF4QztBQUNBLFlBQUcsWUFBWSxJQUFmLEVBQXFCO0FBQ25CLHVCQUFhLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMsS0FBakM7QUFDRCxTQUZELE1BRU8sSUFBRyxZQUFZLFNBQWYsRUFBMEI7QUFDL0IsdUJBQWEsVUFBYixDQUF3QixVQUF4QjtBQUNBLHlCQUFlLE9BQWYsQ0FBdUIsVUFBdkIsRUFBbUMsS0FBbkM7QUFDRDtBQUNELFlBQUcsZUFBZSxJQUFsQixFQUF3QjtBQUN0Qiw0QkFBUSxNQUFSLENBQWUsS0FBSyxPQUFwQixFQUE2QixRQUE3QjtBQUNEO0FBQ0Y7QUF0Q1ksS0FBZjtBQXdDQSxTQUFLLEdBQUwsR0FBVyxLQUFLLE9BQUwsQ0FBYSxHQUF4QjtBQUNBLFNBQUssR0FBTCxHQUFXLEtBQUssT0FBTCxDQUFhLEdBQXhCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsS0FBSyxPQUFMLENBQWEsTUFBM0I7QUFDRDs7OztxQ0FFZ0IsUSxFQUFVO0FBQ3pCLHdCQUFRLFFBQVIsQ0FBb0IsS0FBSyxPQUF6QixhQUEwQyxRQUExQztBQUNEOzs7Z0NBRVcsUSxFQUFVO0FBQ3BCLHdCQUFRLFFBQVIsQ0FBaUIsS0FBSyxPQUF0QixFQUErQixRQUEvQjtBQUNEOzs7OEJBRVMsVSxFQUFZLE0sRUFBMEI7QUFBQSxVQUFsQixTQUFrQix5REFBTixJQUFNOztBQUM5QyxVQUFNLE9BQU8sSUFBYjtBQUNBLFVBQUcsT0FBTyxNQUFQLEtBQWtCLFVBQXJCLEVBQWlDO0FBQy9CLGVBQU8sUUFBUSxLQUFSLENBQWMsbUVBQWQsQ0FBUDtBQUNEO0FBQ0QsV0FBSyxPQUFMLENBQWEsVUFBYixJQUEyQixZQUFhO0FBQUEsMENBQVQsSUFBUztBQUFULGNBQVM7QUFBQTs7QUFDdEMsZUFBTyxLQUFQLENBQWEsSUFBYixFQUFtQixJQUFuQjtBQUNBLFlBQUcsY0FBYyxJQUFqQixFQUF1QjtBQUNyQiw0QkFBUSxNQUFSLENBQWUsS0FBSyxPQUFwQjtBQUNEO0FBQ0YsT0FMRDtBQU1EOzs7NkJBRVEsSyxFQUFPO0FBQUE7O0FBQ2QsVUFBTSxPQUFPLElBQWI7QUFDQSxXQUFLLE1BQUwsQ0FBWSxLQUFaLElBQXFCO0FBQ25CLGtCQUFVLHNCQUFNO0FBQ2QsZ0JBQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsS0FBbkIsR0FBMkIsR0FBRyxNQUFILENBQVUsS0FBckM7QUFDQSw0QkFBUSxNQUFSLENBQWUsS0FBSyxPQUFwQixFQUE2QixLQUE3QjtBQUNELFNBSmtCO0FBS25CLGVBQU87QUFMWSxPQUFyQjtBQU9EOzs7dUNBRWtCLFUsRUFBWTtBQUM3QixVQUFNLFNBQVMsRUFBZjtBQUNBLGlCQUFXLE9BQVgsQ0FBbUIscUJBQWE7QUFDOUIsZUFBTyxTQUFQLElBQW9CO0FBQ2xCLGlCQUFPLEVBRFc7QUFFbEIsaUJBQU8sSUFGVztBQUdsQixvQkFBVSxxQkFBSyxDQUFFO0FBSEMsU0FBcEI7QUFLRCxPQU5EO0FBT0EsYUFBTyxFQUFFLGNBQUYsRUFBVSxVQUFVLHFCQUFLLENBQUUsQ0FBM0IsRUFBUDtBQUNEOzs7NEJBRU8sTyxFQUFTO0FBQUE7O0FBQ2YsVUFBTSxPQUFPLElBQWI7QUFDQSxVQUFHLENBQUMsTUFBTSxPQUFOLENBQWMsUUFBUSxNQUF0QixDQUFKLEVBQW1DO0FBQ2pDLGVBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsbUVBQXJCO0FBQ0Q7QUFDRCxVQUFJLFlBQVksS0FBSyxPQUFyQjs7QUFHQSxXQUFLLEtBQUwsQ0FBVyxRQUFRLElBQW5CLElBQTJCO0FBQ3pCLGVBRHlCLHFCQUNmO0FBQ1IsaUJBQU87QUFDTCxvQkFBUSxLQUFLLE1BRFI7QUFFTCxzQkFBVSxLQUFLO0FBRlYsV0FBUDtBQUlELFNBTndCOztBQU96QixnQkFBUSxFQVBpQjtBQVF6QixrQkFBVSxzQkFBTTtBQUNkLGFBQUcsY0FBSDtBQUNBLGNBQU0sT0FBTyxFQUFiO0FBQ0EsY0FBSSxRQUFRLEtBQVo7QUFDQSxpQkFBTyxJQUFQLENBQVksT0FBSyxLQUFMLENBQVcsUUFBUSxJQUFuQixFQUF5QixNQUFyQyxFQUE2QyxPQUE3QyxDQUFxRCxpQkFBUztBQUM1RCxnQkFBTSxTQUFTLE9BQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBeEM7QUFDQSxnQkFBRyxPQUFPLEtBQVAsRUFBYyxRQUFkLElBQTBCLENBQUMsT0FBTyxLQUFQLEVBQWMsS0FBNUMsRUFBbUQ7QUFDakQscUJBQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFBdUMsS0FBdkMsWUFBc0QsS0FBdEQ7QUFDQSxzQkFBUSxJQUFSO0FBQ0QsYUFIRCxNQUdPO0FBQ0wscUJBQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBaEMsRUFBdUMsS0FBdkMsR0FBK0MsSUFBL0M7QUFDRDtBQUNELGlCQUFLLEtBQUwsSUFBYyxPQUFPLEtBQVAsRUFBYyxLQUE1QjtBQUNELFdBVEQ7QUFVQSxjQUFHLFVBQVUsSUFBYixFQUFtQjtBQUNqQixtQkFBTyxrQkFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixRQUFRLElBQWxDLENBQVA7QUFDRDtBQUNELGVBQUssWUFBTCxDQUFrQixlQUFsQixFQUFtQztBQUNqQztBQURpQyxXQUFuQztBQUdEO0FBNUJ3QixPQUEzQjtBQThCQSxjQUFRLE1BQVIsQ0FBZSxPQUFmLENBQXVCLGlCQUFTO0FBQzlCLGVBQUssS0FBTCxDQUFXLFFBQVEsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZ0MsTUFBTSxJQUF0QyxJQUE4QztBQUM1QyxpQkFBTyxPQUFPLE1BQU0sT0FBYixLQUF5QixXQUF6QixHQUF1QyxJQUF2QyxHQUE4QyxNQUFNLE9BRGY7QUFFNUMsb0JBQVUsTUFBTSxRQUFOLElBQWtCLEtBRmdCO0FBRzVDLGlCQUFPLElBSHFDO0FBSTVDLG9CQUFVLHNCQUFNO0FBQ2QsZ0JBQUksUUFBUSxHQUFHLE1BQUgsQ0FBVSxLQUF0QjtBQUNBLGdCQUFHLEdBQUcsTUFBSCxDQUFVLElBQVYsS0FBbUIsVUFBdEIsRUFBa0M7QUFDaEMsc0JBQVEsR0FBRyxNQUFILENBQVUsT0FBbEI7QUFDRDtBQUNELGlCQUFLLEtBQUwsQ0FBVyxRQUFRLElBQW5CLEVBQXlCLE1BQXpCLENBQWdDLE1BQU0sSUFBdEMsRUFBNEMsS0FBNUMsR0FBb0QsS0FBcEQ7QUFDQSw4QkFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixLQUExQjtBQUNEO0FBWDJDLFNBQTlDO0FBYUQsT0FkRDs7QUFnQkEsVUFBRyxPQUFPLFFBQVEsUUFBZixLQUE0QixVQUEvQixFQUEyQztBQUN6QyxvQkFBZSxLQUFLLE9BQXBCO0FBQ0EsMEJBQVEsUUFBUixDQUFpQixTQUFqQixFQUE0QixRQUFRLFFBQXBDO0FBQ0EsMEJBQVEsUUFBUixDQUFvQixTQUFwQixhQUF1QyxRQUFRLFFBQS9DO0FBQ0Q7QUFDRCxVQUFNLHFCQUF3QixTQUF4QixnQkFBTjtBQUNBLFVBQUcsT0FBTyxRQUFRLGFBQWYsS0FBaUMsVUFBcEMsRUFBZ0Q7QUFDOUMsMEJBQVEsUUFBUixDQUFpQixTQUFqQixFQUE0QixRQUFRLFFBQXBDO0FBQ0EsMEJBQVEsUUFBUixDQUFpQixrQkFBakIsRUFBcUMsUUFBUSxhQUE3QztBQUNEOztBQUVELFVBQU0sWUFBWSxVQUFTLElBQVQsRUFBZSxHQUFmLEVBQW9CO0FBQ3BDLDBCQUFRLFVBQVIsQ0FBbUIsU0FBbkI7QUFDQSxnQkFBUSxTQUFSLENBQWtCLEdBQWxCO0FBQ0EsYUFBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixFQUFuQjtBQUNELE9BSmlCLENBSWhCLElBSmdCLENBSVgsSUFKVyxFQUlMLFFBQVEsSUFKSCxDQUFsQjs7QUFNQSxVQUFNLGtCQUFxQixRQUFRLElBQTdCLFVBQU47QUFDQSxXQUFLLGNBQUwsQ0FBb0IsZUFBcEIsRUFBcUM7QUFDbkMsYUFBSyxRQUFRLEdBRHNCO0FBRW5DLGdCQUFRLE1BRjJCLEVBRW5CLG9CQUZtQjtBQUduQyxvQkFBWSxrQkFIdUI7QUFJbkMsbUJBQVc7QUFKd0IsT0FBckM7QUFNRDs7O21DQUVjLFUsRUFBWSxPLEVBQVM7QUFDbEMsVUFBTSxPQUFPLElBQWI7QUFDQSxVQUFNLFNBQVMsUUFBUSxNQUFSLENBQWUsV0FBZixFQUFmO0FBQ0EsV0FBSyxZQUFMLENBQWtCLFVBQWxCLElBQWdDLFVBQUMsT0FBRCxFQUFhO0FBQzNDLFlBQU0sZUFBZTtBQUNuQixrQkFBUSxRQUFRLE1BQVIsSUFBa0IsS0FEUDtBQUVuQixtQkFBUyxFQUFFLGdCQUFnQixrQkFBbEIsRUFGVTtBQUduQixxQkFBVyxRQUFRLFNBQVIsSUFBcUIsS0FBSyxPQUhsQjtBQUluQixzQkFBWSxRQUFRLFVBQVIsSUFBeUIsS0FBSyxPQUE5QixXQUpPO0FBS25CLHVCQUFhLGFBTE07QUFNbkIscUJBQVcsUUFBUTtBQU5BLFNBQXJCO0FBUUEsWUFBRyxXQUFXLFFBQVEsSUFBdEIsRUFBNEI7QUFDMUIsdUJBQWEsSUFBYixHQUFvQixLQUFLLFNBQUwsQ0FBZSxRQUFRLElBQXZCLENBQXBCO0FBQ0Q7QUFDRCxpQkFBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCLE9BQXZCLEVBQWdDO0FBQzlCLGNBQUcsQ0FBQyxPQUFKLEVBQWEsT0FBTyxHQUFQO0FBQ2IsaUJBQU8sSUFBUCxDQUFZLE9BQVosRUFBcUIsT0FBckIsQ0FBNkIsa0JBQVU7QUFDckMsa0JBQU0sSUFBSSxPQUFKLENBQVksTUFBWixFQUFvQixRQUFRLE1BQVIsQ0FBcEIsQ0FBTjtBQUNELFdBRkQ7QUFHQSxpQkFBTyxHQUFQO0FBQ0Q7O0FBRUQsWUFBTSxVQUFVLFdBQVcsUUFBUSxPQUFuQztBQUNBLFlBQU0sTUFBTSxTQUFTLFFBQVEsR0FBakIsRUFBc0IsT0FBdEIsQ0FBWjtBQUNBLGlCQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLEdBQXBCLEVBQXlCLFlBQXpCO0FBQ0QsT0F2QkQ7QUF3QkQ7Ozs7OztrQkFoTmtCLEs7Ozs7O0FDbkNyQjs7Ozs7O0FBQ0EsT0FBTyxLQUFQOzs7OztBQ0RBOztBQUNBOzs7Ozs7QUFFQSxJQUFNLFVBQVcsWUFBTTtBQUNyQixNQUFNLFVBQVUsMEJBQWhCOztBQUVBLE1BQU0sWUFBWTtBQUNoQixhQUFTO0FBRE8sR0FBbEI7O0FBSUEsTUFBTSxhQUFhLFNBQWIsVUFBYSxZQUFhO0FBQzlCLFdBQU8sVUFBVSxTQUFWLENBQVA7QUFDRCxHQUZEOztBQUlBLE1BQU0sV0FBVyxTQUFYLFFBQVcsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFxQjtBQUNwQyxRQUFJLFlBQVksU0FBaEI7QUFDQSxRQUFJLE9BQU8sS0FBUCxLQUFpQixVQUFyQixFQUFpQztBQUMvQixpQkFBVyxLQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksT0FBTyxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQ3BDLGtCQUFZLEtBQVo7QUFDRDtBQUNELFFBQUksT0FBTyxVQUFVLFNBQVYsQ0FBUCxLQUFnQyxXQUFwQyxFQUFpRDtBQUMvQyxnQkFBVSxTQUFWLElBQXVCLEVBQXZCO0FBQ0Q7QUFDRCxjQUFVLFNBQVYsRUFBcUIsSUFBckIsQ0FBMEIsUUFBMUI7QUFDQSxZQUFRLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFVBQUMsSUFBRCxFQUFVO0FBQzlCLHNCQUFNLElBQU4sQ0FBVyxVQUFVLFNBQVYsQ0FBWCxFQUFpQyxVQUFDLFFBQUQsRUFBYztBQUM3QyxpQkFBUyxJQUFUO0FBQ0QsT0FGRDtBQUdELEtBSkQ7QUFLRCxHQWhCRDs7QUFrQkEsTUFBTSxVQUFVLFNBQVYsT0FBVSxHQUFNO0FBQ3BCLG9CQUFNLElBQU4sQ0FBVyxVQUFVLE9BQXJCLEVBQThCLFVBQUMsUUFBRCxFQUFjO0FBQzFDO0FBQ0QsS0FGRDtBQUdELEdBSkQ7O0FBTUEsVUFBUSxFQUFSLENBQVcsUUFBWCxFQUFxQixPQUFyQjs7QUFFQSxNQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDOUIsUUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNWLGNBQVEsUUFBUjtBQUNEOztBQUVELFlBQVEsSUFBUixDQUFhLEtBQWIsRUFBb0IsSUFBcEI7QUFDRCxHQU5EOztBQVFBLFNBQU87QUFDTCxjQUFVLFFBREw7QUFFTCxnQkFBWSxVQUZQO0FBR0wsWUFBUTtBQUhILEdBQVA7QUFLRCxDQWxEZSxFQUFoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAgIChmYWN0b3J5KChnbG9iYWwuYXN5bmMgPSBnbG9iYWwuYXN5bmMgfHwge30pKSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAgICAgKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAgICAgKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gICAgICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdCh7fSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzT2JqZWN0KG51bGwpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgdmFyIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gICAgICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gICAgICogb2YgdmFsdWVzLlxuICAgICAqL1xuICAgIHZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCxcbiAgICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLmlzRnVuY3Rpb24oXyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAgICAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIHdlYWsgbWFwIGNvbnN0cnVjdG9ycyxcbiAgICAgIC8vIGFuZCBQaGFudG9tSlMgMS45IHdoaWNoIHJldHVybnMgJ2Z1bmN0aW9uJyBmb3IgYE5vZGVMaXN0YCBpbnN0YW5jZXMuXG4gICAgICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgICAgIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICAgICAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdExpa2Uoe30pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqXG4gICAgICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgICAgIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JztcbiAgICB9XG5cbiAgICAvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG4gICAgdmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQxID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDEgPSBvYmplY3RQcm90byQxLnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nJDEuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbiAgICB2YXIgTkFOID0gMCAvIDA7XG5cbiAgICAvKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xuICAgIHZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG4gICAgdmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbiAgICB2YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuICAgIC8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xuICAgIHZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4gICAgLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbiAgICB2YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50b051bWJlcigzLjIpO1xuICAgICAqIC8vID0+IDMuMlxuICAgICAqXG4gICAgICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgKiAvLyA9PiA1ZS0zMjRcbiAgICAgKlxuICAgICAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IEluZmluaXR5XG4gICAgICpcbiAgICAgKiBfLnRvTnVtYmVyKCczLjInKTtcbiAgICAgKiAvLyA9PiAzLjJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBOQU47XG4gICAgICB9XG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGlzRnVuY3Rpb24odmFsdWUudmFsdWVPZikgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gICAgICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICAgICAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgICAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgSU5GSU5JVFkgPSAxIC8gMDtcbiAgICB2YXIgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwODtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgZmluaXRlIG51bWJlci5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjEyLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50b0Zpbml0ZSgzLjIpO1xuICAgICAqIC8vID0+IDMuMlxuICAgICAqXG4gICAgICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgKiAvLyA9PiA1ZS0zMjRcbiAgICAgKlxuICAgICAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAgICpcbiAgICAgKiBfLnRvRmluaXRlKCczLjInKTtcbiAgICAgKiAvLyA9PiAzLjJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6IDA7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gSU5GSU5JVFkgfHwgdmFsdWUgPT09IC1JTkZJTklUWSkge1xuICAgICAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgICAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIGludGVnZXIuXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICAgICAqIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50ZWdlcikuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8udG9JbnRlZ2VyKDMuMik7XG4gICAgICogLy8gPT4gM1xuICAgICAqXG4gICAgICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAgICogLy8gPT4gMFxuICAgICAqXG4gICAgICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICAgICAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAgICpcbiAgICAgKiBfLnRvSW50ZWdlcignMy4yJyk7XG4gICAgICogLy8gPT4gM1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHRvRmluaXRlKHZhbHVlKSxcbiAgICAgICAgICByZW1haW5kZXIgPSByZXN1bHQgJSAxO1xuXG4gICAgICByZXR1cm4gcmVzdWx0ID09PSByZXN1bHQgPyAocmVtYWluZGVyID8gcmVzdWx0IC0gcmVtYWluZGVyIDogcmVzdWx0KSA6IDA7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbiAgICB2YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xuICAgIHZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZVxuICAgICAqIGNyZWF0ZWQgZnVuY3Rpb24gYW5kIGFyZ3VtZW50cyBmcm9tIGBzdGFydGAgYW5kIGJleW9uZCBwcm92aWRlZCBhc1xuICAgICAqIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZVxuICAgICAqIFtyZXN0IHBhcmFtZXRlcl0oaHR0cHM6Ly9tZG4uaW8vcmVzdF9wYXJhbWV0ZXJzKS5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgc2F5ID0gXy5yZXN0KGZ1bmN0aW9uKHdoYXQsIG5hbWVzKSB7XG4gICAgICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gICAgICogICAgIChfLnNpemUobmFtZXMpID4gMSA/ICcsICYgJyA6ICcnKSArIF8ubGFzdChuYW1lcyk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzYXkoJ2hlbGxvJywgJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnKTtcbiAgICAgKiAvLyA9PiAnaGVsbG8gZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzdChmdW5jLCBzdGFydCkge1xuICAgICAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICAgICAgfVxuICAgICAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogdG9JbnRlZ2VyKHN0YXJ0KSwgMCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChzdGFydCkge1xuICAgICAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcnJheSk7XG4gICAgICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3NbMF0sIGFycmF5KTtcbiAgICAgICAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgYXJnc1sxXSwgYXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRpYWxQYXJhbXMgKGZuKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChhcmdzIC8qLi4uLCBjYWxsYmFjayovKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBhcmdzLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5RWFjaCQxKGVhY2hmbikge1xuICAgICAgICByZXR1cm4gcmVzdChmdW5jdGlvbiAoZm5zLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgZ28gPSBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChhcmdzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gZWFjaGZuKGZucywgZnVuY3Rpb24gKGZuLCBjYikge1xuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzLmNvbmNhdChbY2JdKSk7XG4gICAgICAgICAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ28uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBtZXRob2QgdGhhdCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDIuMy4wXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50aW1lcygyLCBfLm5vb3ApO1xuICAgICAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub29wKCkge1xuICAgICAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZm4gPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBjYWxsRm4gPSBmbjtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGFcbiAgICAgKiBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MikgdGhhdCBhZmZlY3RzXG4gICAgICogU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gICAgICovXG4gICAgdmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbiAgICAvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbiAgICB2YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvblxuICAgICAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLFxuICAgICAqICBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIF8uaXNMZW5ndGgoMyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqXG4gICAgICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uaXNMZW5ndGgoJzMnKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gICAgICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICAgICAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgaXRlcmF0b3JTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcblxuICAgIGZ1bmN0aW9uIGdldEl0ZXJhdG9yIChjb2xsKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclN5bWJvbCAmJiBjb2xsW2l0ZXJhdG9yU3ltYm9sXSAmJiBjb2xsW2l0ZXJhdG9yU3ltYm9sXSgpO1xuICAgIH1cblxuICAgIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbiAgICB2YXIgbmF0aXZlR2V0UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYFtbUHJvdG90eXBlXV1gIG9mIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgYFtbUHJvdG90eXBlXV1gLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFByb3RvdHlwZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUdldFByb3RvdHlwZShPYmplY3QodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDIgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8kMi5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc2Agd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VIYXMob2JqZWN0LCBrZXkpIHtcbiAgICAgIC8vIEF2b2lkIGEgYnVnIGluIElFIDEwLTExIHdoZXJlIG9iamVjdHMgd2l0aCBhIFtbUHJvdG90eXBlXV0gb2YgYG51bGxgLFxuICAgICAgLy8gdGhhdCBhcmUgY29tcG9zZWQgZW50aXJlbHkgb2YgaW5kZXggcHJvcGVydGllcywgcmV0dXJuIGBmYWxzZWAgZm9yXG4gICAgICAvLyBgaGFzT3duUHJvcGVydHlgIGNoZWNrcyBvZiB0aGVtLlxuICAgICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmXG4gICAgICAgIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSB8fFxuICAgICAgICAgICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmIGtleSBpbiBvYmplY3QgJiYgZ2V0UHJvdG90eXBlKG9iamVjdCkgPT09IG51bGwpKTtcbiAgICB9XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG4gICAgdmFyIG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cztcblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3Qgc2tpcCB0aGUgY29uc3RydWN0b3JcbiAgICAgKiBwcm9wZXJ0eSBvZiBwcm90b3R5cGVzIG9yIHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUtleXMoT2JqZWN0KG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAgICAgKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICAgICAqIGlzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSA0LjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDMgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5JDEgPSBvYmplY3RQcm90byQzLmhhc093blByb3BlcnR5O1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmckMiA9IG9iamVjdFByb3RvJDMudG9TdHJpbmc7XG5cbiAgICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90byQzLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAgICAgLy8gU2FmYXJpIDguMSBpbmNvcnJlY3RseSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgICAgIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkkMS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAgICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmckMi5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXkoJ2FiYycpO1xuICAgICAqIC8vID0+IGZhbHNlXG4gICAgICpcbiAgICAgKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuICAgIC8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDQgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmckMyA9IG9iamVjdFByb3RvJDQudG9TdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc1N0cmluZygnYWJjJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5pc1N0cmluZygxKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZyQzLmNhbGwodmFsdWUpID09IHN0cmluZ1RhZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBpbmRleCBrZXlzIGZvciBgb2JqZWN0YCB2YWx1ZXMgb2YgYXJyYXlzLFxuICAgICAqIGBhcmd1bWVudHNgIG9iamVjdHMsIGFuZCBzdHJpbmdzLCBvdGhlcndpc2UgYG51bGxgIGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IFJldHVybnMgaW5kZXgga2V5cywgZWxzZSBgbnVsbGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhLZXlzKG9iamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgICAgICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNTdHJpbmcob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSkge1xuICAgICAgICByZXR1cm4gYmFzZVRpbWVzKGxlbmd0aCwgU3RyaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xuICAgIHZhciBNQVhfU0FGRV9JTlRFR0VSJDEgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xuICAgIHZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIkMSA6IGxlbmd0aDtcbiAgICAgIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ1ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgICAgIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG8kNTtcblxuICAgICAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gICAgICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICAgICAqIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIEZvbygpIHtcbiAgICAgKiAgIHRoaXMuYSA9IDE7XG4gICAgICogICB0aGlzLmIgPSAyO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gICAgICpcbiAgICAgKiBfLmtleXMobmV3IEZvbyk7XG4gICAgICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgICAqXG4gICAgICogXy5rZXlzKCdoaScpO1xuICAgICAqIC8vID0+IFsnMCcsICcxJ11cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICAgICAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpO1xuICAgICAgaWYgKCEoaXNQcm90byB8fCBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgICAgICByZXR1cm4gYmFzZUtleXMob2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleGVzID0gaW5kZXhLZXlzKG9iamVjdCksXG4gICAgICAgICAgc2tpcEluZGV4ZXMgPSAhIWluZGV4ZXMsXG4gICAgICAgICAgcmVzdWx0ID0gaW5kZXhlcyB8fCBbXSxcbiAgICAgICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChiYXNlSGFzKG9iamVjdCwga2V5KSAmJlxuICAgICAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgICAgICEoaXNQcm90byAmJiBrZXkgPT0gJ2NvbnN0cnVjdG9yJykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGl0ZXJhdG9yKGNvbGwpIHtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgaWYgKGlzQXJyYXlMaWtlKGNvbGwpKSB7XG4gICAgICAgICAgICBsZW4gPSBjb2xsLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA8IGxlbiA/IHsgdmFsdWU6IGNvbGxbaV0sIGtleTogaSB9IDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0ZSA9IGdldEl0ZXJhdG9yKGNvbGwpO1xuICAgICAgICBpZiAoaXRlcmF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVyYXRlLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kb25lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGl0ZW0udmFsdWUsIGtleTogaSB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBva2V5cyA9IGtleXMoY29sbCk7XG4gICAgICAgIGxlbiA9IG9rZXlzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB2YXIga2V5ID0gb2tleXNbaV07XG4gICAgICAgICAgICByZXR1cm4gaSA8IGxlbiA/IHsgdmFsdWU6IGNvbGxba2V5XSwga2V5OiBrZXkgfSA6IG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25seU9uY2UoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChmbiA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgd2FzIGFscmVhZHkgY2FsbGVkLlwiKTtcbiAgICAgICAgICAgIHZhciBjYWxsRm4gPSBmbjtcbiAgICAgICAgICAgIGZuID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9lYWNoT2ZMaW1pdChsaW1pdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG9uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICAgICAgICBvYmogPSBvYmogfHwgW107XG4gICAgICAgICAgICB2YXIgbmV4dEVsZW0gPSBpdGVyYXRvcihvYmopO1xuICAgICAgICAgICAgaWYgKGxpbWl0IDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJ1bm5pbmcgPSAwO1xuICAgICAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIHJlcGxlbmlzaCgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSAmJiBydW5uaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChydW5uaW5nIDwgbGltaXQgJiYgIWVycm9yZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBuZXh0RWxlbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcnVubmluZyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlZShlbGVtLnZhbHVlLCBlbGVtLmtleSwgb25seU9uY2UoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxlbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1BhcmFsbGVsTGltaXQoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGxpbWl0LCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihfZWFjaE9mTGltaXQobGltaXQpLCBvYmosIGl0ZXJhdGVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2FzeW5jTWFwKGVhY2hmbiwgYXJyLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgICBhcnIgPSBhcnIgfHwgW107XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAodmFsdWUsIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgICAgICBpdGVyYXRlZSh2YWx1ZSwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBtYXBgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwTGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tYXBcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGEgdHJhbnNmb3JtZWRcbiAgICAgKiBpdGVtLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgYW4gYXJyYXkgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgaXRlbXMgZnJvbSB0aGUgYGNvbGxgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIG1hcExpbWl0ID0gZG9QYXJhbGxlbExpbWl0KF9hc3luY01hcCk7XG5cbiAgICBmdW5jdGlvbiBkb0xpbWl0KGZuLCBsaW1pdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZXJhYmxlLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmbihpdGVyYWJsZSwgbGltaXQsIGl0ZXJhdGVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvZHVjZXMgYSBuZXcgY29sbGVjdGlvbiBvZiB2YWx1ZXMgYnkgbWFwcGluZyBlYWNoIHZhbHVlIGluIGBjb2xsYCB0aHJvdWdoXG4gICAgICogdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb24uIFRoZSBgaXRlcmF0ZWVgIGlzIGNhbGxlZCB3aXRoIGFuIGl0ZW0gZnJvbSBgY29sbGBcbiAgICAgKiBhbmQgYSBjYWxsYmFjayBmb3Igd2hlbiBpdCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZy4gRWFjaCBvZiB0aGVzZSBjYWxsYmFja1xuICAgICAqIHRha2VzIDIgYXJndW1lbnRzOiBhbiBgZXJyb3JgLCBhbmQgdGhlIHRyYW5zZm9ybWVkIGl0ZW0gZnJvbSBgY29sbGAuIElmXG4gICAgICogYGl0ZXJhdGVlYCBwYXNzZXMgYW4gZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIChmb3IgdGhlXG4gICAgICogYG1hcGAgZnVuY3Rpb24pIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKlxuICAgICAqIE5vdGUsIHRoYXQgc2luY2UgdGhpcyBmdW5jdGlvbiBhcHBsaWVzIHRoZSBgaXRlcmF0ZWVgIHRvIGVhY2ggaXRlbSBpblxuICAgICAqIHBhcmFsbGVsLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbnMgd2lsbCBjb21wbGV0ZVxuICAgICAqIGluIG9yZGVyLiBIb3dldmVyLCB0aGUgcmVzdWx0cyBhcnJheSB3aWxsIGJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuICAgICAqIG9yaWdpbmFsIGBjb2xsYC5cbiAgICAgKlxuICAgICAqIElmIGBtYXBgIGlzIHBhc3NlZCBhbiBPYmplY3QsIHRoZSByZXN1bHRzIHdpbGwgYmUgYW4gQXJyYXkuICBUaGUgcmVzdWx0c1xuICAgICAqIHdpbGwgcm91Z2hseSBiZSBpbiB0aGUgb3JkZXIgb2YgdGhlIG9yaWdpbmFsIE9iamVjdHMnIGtleXMgKGJ1dCB0aGlzIGNhblxuICAgICAqIHZhcnkgYWNyb3NzIEphdmFTY3JpcHQgZW5naW5lcylcbiAgICAgKlxuICAgICAqIEBuYW1lIG1hcFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJhbnNmb3JtZWQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYVxuICAgICAqIHRyYW5zZm9ybWVkIGl0ZW0uIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0cyBpcyBhbiBBcnJheSBvZiB0aGVcbiAgICAgKiB0cmFuc2Zvcm1lZCBpdGVtcyBmcm9tIHRoZSBgY29sbGAuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMubWFwKFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZzLnN0YXQsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBhbiBhcnJheSBvZiBzdGF0cyBmb3IgZWFjaCBmaWxlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIG1hcCA9IGRvTGltaXQobWFwTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyB0byBlYWNoIGZ1bmN0aW9uIGluIHRoZSBhcnJheSwgY2FsbGluZ1xuICAgICAqIGBjYWxsYmFja2AgYWZ0ZXIgYWxsIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZC4gSWYgeW91IG9ubHkgcHJvdmlkZSB0aGUgZmlyc3RcbiAgICAgKiBhcmd1bWVudCwgdGhlbiBpdCB3aWxsIHJldHVybiBhIGZ1bmN0aW9uIHdoaWNoIGxldHMgeW91IHBhc3MgaW4gdGhlXG4gICAgICogYXJndW1lbnRzIGFzIGlmIGl0IHdlcmUgYSBzaW5nbGUgZnVuY3Rpb24gY2FsbC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGFwcGx5RWFjaFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGZucyAtIEEgY29sbGVjdGlvbiBvZiBhc3luY2hyb25vdXMgZnVuY3Rpb25zIHRvIGFsbFxuICAgICAqIGNhbGwgd2l0aCB0aGUgc2FtZSBhcmd1bWVudHNcbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXSAtIGFueSBudW1iZXIgb2Ygc2VwYXJhdGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlXG4gICAgICogZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIHRoZSBmaW5hbCBhcmd1bWVudCBzaG91bGQgYmUgdGhlIGNhbGxiYWNrLFxuICAgICAqIGNhbGxlZCB3aGVuIGFsbCBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQgcHJvY2Vzc2luZy5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gSWYgb25seSB0aGUgZmlyc3QgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGl0IHdpbGwgcmV0dXJuXG4gICAgICogYSBmdW5jdGlvbiB3aGljaCBsZXRzIHlvdSBwYXNzIGluIHRoZSBhcmd1bWVudHMgYXMgaWYgaXQgd2VyZSBhIHNpbmdsZVxuICAgICAqIGZ1bmN0aW9uIGNhbGwuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmFwcGx5RWFjaChbZW5hYmxlU2VhcmNoLCB1cGRhdGVTY2hlbWFdLCAnYnVja2V0JywgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogLy8gcGFydGlhbCBhcHBsaWNhdGlvbiBleGFtcGxlOlxuICAgICAqIGFzeW5jLmVhY2goXG4gICAgICogICAgIGJ1Y2tldHMsXG4gICAgICogICAgIGFzeW5jLmFwcGx5RWFjaChbZW5hYmxlU2VhcmNoLCB1cGRhdGVTY2hlbWFdKSxcbiAgICAgKiAgICAgY2FsbGJhY2tcbiAgICAgKiApO1xuICAgICAqL1xuICAgIHZhciBhcHBseUVhY2ggPSBhcHBseUVhY2gkMShtYXApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYG1hcGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFcbiAgICAgKiB0cmFuc2Zvcm1lZCBpdGVtLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgYW4gYXJyYXkgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgaXRlbXMgZnJvbSB0aGUgYGNvbGxgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICovXG4gICAgdmFyIG1hcFNlcmllcyA9IGRvTGltaXQobWFwTGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGFwcGx5RWFjaGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgYXBwbHlFYWNoU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuYXBwbHlFYWNoXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBmbnMgLSBBIGNvbGxlY3Rpb24gb2YgYXN5bmNocm9ub3VzIGZ1bmN0aW9ucyB0byBhbGxcbiAgICAgKiBjYWxsIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc10gLSBhbnkgbnVtYmVyIG9mIHNlcGFyYXRlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZVxuICAgICAqIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSB0aGUgZmluYWwgYXJndW1lbnQgc2hvdWxkIGJlIHRoZSBjYWxsYmFjayxcbiAgICAgKiBjYWxsZWQgd2hlbiBhbGwgZnVuY3Rpb25zIGhhdmUgY29tcGxldGVkIHByb2Nlc3NpbmcuXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSAtIElmIG9ubHkgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBpdCB3aWxsIHJldHVyblxuICAgICAqIGEgZnVuY3Rpb24gd2hpY2ggbGV0cyB5b3UgcGFzcyBpbiB0aGUgYXJndW1lbnRzIGFzIGlmIGl0IHdlcmUgYSBzaW5nbGVcbiAgICAgKiBmdW5jdGlvbiBjYWxsLlxuICAgICAqL1xuICAgIHZhciBhcHBseUVhY2hTZXJpZXMgPSBhcHBseUVhY2gkMShtYXBTZXJpZXMpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbnRpbnVhdGlvbiBmdW5jdGlvbiB3aXRoIHNvbWUgYXJndW1lbnRzIGFscmVhZHkgYXBwbGllZC5cbiAgICAgKlxuICAgICAqIFVzZWZ1bCBhcyBhIHNob3J0aGFuZCB3aGVuIGNvbWJpbmVkIHdpdGggb3RoZXIgY29udHJvbCBmbG93IGZ1bmN0aW9ucy4gQW55XG4gICAgICogYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gYXJlIGFkZGVkIHRvIHRoZSBhcmd1bWVudHNcbiAgICAgKiBvcmlnaW5hbGx5IHBhc3NlZCB0byBhcHBseS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGFwcGx5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgZnVuY3Rpb24geW91IHdhbnQgdG8gZXZlbnR1YWxseSBhcHBseSBhbGxcbiAgICAgKiBhcmd1bWVudHMgdG8uIEludm9rZXMgd2l0aCAoYXJndW1lbnRzLi4uKS5cbiAgICAgKiBAcGFyYW0gey4uLip9IGFyZ3VtZW50cy4uLiAtIEFueSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGF1dG9tYXRpY2FsbHkgYXBwbHlcbiAgICAgKiB3aGVuIHRoZSBjb250aW51YXRpb24gaXMgY2FsbGVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyB1c2luZyBhcHBseVxuICAgICAqIGFzeW5jLnBhcmFsbGVsKFtcbiAgICAgKiAgICAgYXN5bmMuYXBwbHkoZnMud3JpdGVGaWxlLCAndGVzdGZpbGUxJywgJ3Rlc3QxJyksXG4gICAgICogICAgIGFzeW5jLmFwcGx5KGZzLndyaXRlRmlsZSwgJ3Rlc3RmaWxlMicsICd0ZXN0MicpXG4gICAgICogXSk7XG4gICAgICpcbiAgICAgKlxuICAgICAqIC8vIHRoZSBzYW1lIHByb2Nlc3Mgd2l0aG91dCB1c2luZyBhcHBseVxuICAgICAqIGFzeW5jLnBhcmFsbGVsKFtcbiAgICAgKiAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGZzLndyaXRlRmlsZSgndGVzdGZpbGUxJywgJ3Rlc3QxJywgY2FsbGJhY2spO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgZnMud3JpdGVGaWxlKCd0ZXN0ZmlsZTInLCAndGVzdDInLCBjYWxsYmFjayk7XG4gICAgICogICAgIH1cbiAgICAgKiBdKTtcbiAgICAgKlxuICAgICAqIC8vIEl0J3MgcG9zc2libGUgdG8gcGFzcyBhbnkgbnVtYmVyIG9mIGFkZGl0aW9uYWwgYXJndW1lbnRzIHdoZW4gY2FsbGluZyB0aGVcbiAgICAgKiAvLyBjb250aW51YXRpb246XG4gICAgICpcbiAgICAgKiBub2RlPiB2YXIgZm4gPSBhc3luYy5hcHBseShzeXMucHV0cywgJ29uZScpO1xuICAgICAqIG5vZGU+IGZuKCd0d28nLCAndGhyZWUnKTtcbiAgICAgKiBvbmVcbiAgICAgKiB0d29cbiAgICAgKiB0aHJlZVxuICAgICAqL1xuICAgIHZhciBhcHBseSQxID0gcmVzdChmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHJlc3QoZnVuY3Rpb24gKGNhbGxBcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoY2FsbEFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlIGEgc3luYyBmdW5jdGlvbiBhbmQgbWFrZSBpdCBhc3luYywgcGFzc2luZyBpdHMgcmV0dXJuIHZhbHVlIHRvIGFcbiAgICAgKiBjYWxsYmFjay4gVGhpcyBpcyB1c2VmdWwgZm9yIHBsdWdnaW5nIHN5bmMgZnVuY3Rpb25zIGludG8gYSB3YXRlcmZhbGwsXG4gICAgICogc2VyaWVzLCBvciBvdGhlciBhc3luYyBmdW5jdGlvbnMuIEFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBnZW5lcmF0ZWRcbiAgICAgKiBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvbiAoZXhjZXB0IGZvciB0aGUgZmluYWxcbiAgICAgKiBjYWxsYmFjayBhcmd1bWVudCkuIEVycm9ycyB0aHJvd24gd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogSWYgdGhlIGZ1bmN0aW9uIHBhc3NlZCB0byBgYXN5bmNpZnlgIHJldHVybnMgYSBQcm9taXNlLCB0aGF0IHByb21pc2VzJ3NcbiAgICAgKiByZXNvbHZlZC9yZWplY3RlZCBzdGF0ZSB3aWxsIGJlIHVzZWQgdG8gY2FsbCB0aGUgY2FsbGJhY2ssIHJhdGhlciB0aGFuIHNpbXBseVxuICAgICAqIHRoZSBzeW5jaHJvbm91cyByZXR1cm4gdmFsdWUuXG4gICAgICpcbiAgICAgKiBUaGlzIGFsc28gbWVhbnMgeW91IGNhbiBhc3luY2lmeSBFUzIwMTYgYGFzeW5jYCBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbmFtZSBhc3luY2lmeVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgd3JhcFN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgc3luY2hyb25vdXMgZnVuY3Rpb24gdG8gY29udmVydCB0byBhblxuICAgICAqIGFzeW5jaHJvbm91cyBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEFuIGFzeW5jaHJvbm91cyB3cmFwcGVyIG9mIHRoZSBgZnVuY2AuIFRvIGJlIGludm9rZWQgd2l0aFxuICAgICAqIChjYWxsYmFjaykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIHBhc3NpbmcgYSByZWd1bGFyIHN5bmNocm9ub3VzIGZ1bmN0aW9uXG4gICAgICogYXN5bmMud2F0ZXJmYWxsKFtcbiAgICAgKiAgICAgYXN5bmMuYXBwbHkoZnMucmVhZEZpbGUsIGZpbGVuYW1lLCBcInV0ZjhcIiksXG4gICAgICogICAgIGFzeW5jLmFzeW5jaWZ5KEpTT04ucGFyc2UpLFxuICAgICAqICAgICBmdW5jdGlvbiAoZGF0YSwgbmV4dCkge1xuICAgICAqICAgICAgICAgLy8gZGF0YSBpcyB0aGUgcmVzdWx0IG9mIHBhcnNpbmcgdGhlIHRleHQuXG4gICAgICogICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYSBwYXJzaW5nIGVycm9yLCBpdCB3b3VsZCBoYXZlIGJlZW4gY2F1Z2h0LlxuICAgICAqICAgICB9XG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogLy8gcGFzc2luZyBhIGZ1bmN0aW9uIHJldHVybmluZyBhIHByb21pc2VcbiAgICAgKiBhc3luYy53YXRlcmZhbGwoW1xuICAgICAqICAgICBhc3luYy5hcHBseShmcy5yZWFkRmlsZSwgZmlsZW5hbWUsIFwidXRmOFwiKSxcbiAgICAgKiAgICAgYXN5bmMuYXN5bmNpZnkoZnVuY3Rpb24gKGNvbnRlbnRzKSB7XG4gICAgICogICAgICAgICByZXR1cm4gZGIubW9kZWwuY3JlYXRlKGNvbnRlbnRzKTtcbiAgICAgKiAgICAgfSksXG4gICAgICogICAgIGZ1bmN0aW9uIChtb2RlbCwgbmV4dCkge1xuICAgICAqICAgICAgICAgLy8gYG1vZGVsYCBpcyB0aGUgaW5zdGFudGlhdGVkIG1vZGVsIG9iamVjdC5cbiAgICAgKiAgICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiBlcnJvciwgdGhpcyBmdW5jdGlvbiB3b3VsZCBiZSBza2lwcGVkLlxuICAgICAqICAgICB9XG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogLy8gZXM2IGV4YW1wbGVcbiAgICAgKiB2YXIgcSA9IGFzeW5jLnF1ZXVlKGFzeW5jLmFzeW5jaWZ5KGFzeW5jIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgKiAgICAgdmFyIGludGVybWVkaWF0ZVN0ZXAgPSBhd2FpdCBwcm9jZXNzRmlsZShmaWxlKTtcbiAgICAgKiAgICAgcmV0dXJuIGF3YWl0IHNvbWVQcm9taXNlKGludGVybWVkaWF0ZVN0ZXApXG4gICAgICogfSkpO1xuICAgICAqXG4gICAgICogcS5wdXNoKGZpbGVzKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3luY2lmeShmdW5jKSB7XG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChhcmdzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiByZXN1bHQgaXMgUHJvbWlzZSBvYmplY3RcbiAgICAgICAgICAgIGlmIChpc09iamVjdChyZXN1bHQpICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSlbJ2NhdGNoJ10oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIubWVzc2FnZSA/IGVyciA6IG5ldyBFcnJvcihlcnIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICAgICAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAgICAgKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAgICAgKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAgICovXG4gICAgdmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgY2xlYXJcbiAgICAgKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gICAgICB0aGlzLl9fZGF0YV9fID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYVxuICAgICAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gICAgICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgNC4wLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICAgICAqIHZhciBvdGhlciA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAgICAgKlxuICAgICAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uZXEoJ2EnLCAnYScpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKlxuICAgICAqIF8uZXEoTmFOLCBOYU4pO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAgICAgKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICAgICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbiAgICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZGVsZXRlXG4gICAgICogQG1lbWJlck9mIExpc3RDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICAgICAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgICAgICBkYXRhLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGdldFxuICAgICAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgICAgIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICAgICAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBzZXRcbiAgICAgKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbiAgICBMaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG4gICAgTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgY2xlYXJcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICAgICAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBkZWxldGVcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGdldFxuICAgICAqIEBtZW1iZXJPZiBTdGFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBTdGFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gICAgICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAgICAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZ2xvYmFsIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge251bGx8T2JqZWN0fSBSZXR1cm5zIGB2YWx1ZWAgaWYgaXQncyBhIGdsb2JhbCBvYmplY3QsIGVsc2UgYG51bGxgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrR2xvYmFsKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICYmIHZhbHVlLk9iamVjdCA9PT0gT2JqZWN0KSA/IHZhbHVlIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xuICAgIHZhciBmcmVlR2xvYmFsID0gY2hlY2tHbG9iYWwodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpO1xuXG4gICAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbiAgICB2YXIgZnJlZVNlbGYgPSBjaGVja0dsb2JhbCh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKTtcblxuICAgIC8qKiBEZXRlY3QgYHRoaXNgIGFzIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xuICAgIHZhciB0aGlzR2xvYmFsID0gY2hlY2tHbG9iYWwodHlwZW9mIHRoaXMgPT0gJ29iamVjdCcgJiYgdGhpcyk7XG5cbiAgICAvKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgICB2YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgdGhpc0dsb2JhbCB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xuICAgIHZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbiAgICAvKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xuICAgIHZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgICAgIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbiAgICB9KCkpO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICAgICAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG4gICAgdmFyIGZ1bmNUb1N0cmluZyQxID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gICAgICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZyQxLmNhbGwoZnVuYyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAgICAgKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXBhdHRlcm5zKS5cbiAgICAgKi9cbiAgICB2YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xuICAgIHZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ2ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbiAgICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gICAgdmFyIGhhc093blByb3BlcnR5JDIgPSBvYmplY3RQcm90byQ2Lmhhc093blByb3BlcnR5O1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbiAgICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICAgICAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkkMikucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgICAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgICAgIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICAgICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgICAgIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBjbGVhclxuICAgICAqIEBtZW1iZXJPZiBIYXNoXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICAgICAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBkZWxldGVcbiAgICAgKiBAbWVtYmVyT2YgSGFzaFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xuICAgIHZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kNyA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAvKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbiAgICB2YXIgaGFzT3duUHJvcGVydHkkMyA9IG9iamVjdFByb3RvJDcuaGFzT3duUHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZ2V0XG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkkMy5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ4ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQ0ID0gb2JqZWN0UHJvdG8kOC5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgaGFzXG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5JDQuY2FsbChkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbiAgICB2YXIgSEFTSF9VTkRFRklORUQkMSA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgc2V0XG4gICAgICogQG1lbWJlck9mIEhhc2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCQxIDogdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuICAgIEhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuICAgIEhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG4gICAgSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbiAgICBIYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuICAgIEhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGNsZWFyXG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgICAgIHRoaXMuX19kYXRhX18gPSB7XG4gICAgICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICAgICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgICAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gICAgICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgICAgIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgICAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgICAgICA6IGRhdGEubWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGRlbGV0ZVxuICAgICAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgICAgIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgZ2V0XG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gICAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgaGFzXG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICAgICAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG5hbWUgc2V0XG4gICAgICogQG1lbWJlck9mIE1hcENhY2hlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gICAgICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuICAgIE1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG4gICAgTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuICAgIE1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbiAgICBNYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG4gICAgTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4gICAgLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG4gICAgdmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBzZXRcbiAgICAgKiBAbWVtYmVyT2YgU3RhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSAmJiBjYWNoZS5fX2RhdGFfXy5sZW5ndGggPT0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgICAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUoY2FjaGUuX19kYXRhX18pO1xuICAgICAgfVxuICAgICAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgICAgIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG4gICAgU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcbiAgICBTdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG4gICAgU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuICAgIFN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcbiAgICBTdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbiAgICAvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG4gICAgdmFyIEhBU0hfVU5ERUZJTkVEJDIgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAbmFtZSBhZGRcbiAgICAgKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAgICAgKiBAYWxpYXMgcHVzaFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gICAgICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQkMik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBuYW1lIGhhc1xuICAgICAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gICAgICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cbiAgICBTZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcbiAgICBTZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gICAgICogc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAgICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQxID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckMiA9IDI7XG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICAgICAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICAgICAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyQyLFxuICAgICAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgICAgIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgICAgIHNlZW4gPSAoYml0bWFzayAmIFVOT1JERVJFRF9DT01QQVJFX0ZMQUckMSkgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuXG4gICAgICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgICAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBpZiAoc2Vlbikge1xuICAgICAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlZW4uaGFzKG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzZWVuLmFkZChvdGhJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBTeW1ib2wkMSA9IHJvb3QuU3ltYm9sO1xuXG4gICAgLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gICAgICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQyID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckMyA9IDI7XG4gICAgdmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXSc7XG4gICAgdmFyIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXSc7XG4gICAgdmFyIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJztcbiAgICB2YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXSc7XG4gICAgdmFyIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nO1xuICAgIHZhciByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJztcbiAgICB2YXIgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG4gICAgdmFyIHN0cmluZ1RhZyQxID0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgdmFyIHN5bWJvbFRhZyQxID0gJ1tvYmplY3QgU3ltYm9sXSc7XG4gICAgdmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbiAgICB2YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuICAgIHZhciBzeW1ib2xQcm90byA9IFN5bWJvbCQxID8gU3ltYm9sJDEucHJvdG90eXBlIDogdW5kZWZpbmVkO1xuICAgIHZhciBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAgICAgKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICAgICAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gICAgICogIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgc3dpdGNoICh0YWcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgY2FzZSBib29sVGFnOlxuICAgICAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kXG4gICAgICAgICAgLy8gYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXNcbiAgICAgICAgICAvLyBub3QgZXF1YWwuXG4gICAgICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgICAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdCkgPyBvdGhlciAhPSArb3RoZXIgOiBvYmplY3QgPT0gK290aGVyO1xuXG4gICAgICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgICBjYXNlIHN0cmluZ1RhZyQxOlxuICAgICAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICAgICAgY2FzZSBtYXBUYWc6XG4gICAgICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUckMztcbiAgICAgICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYml0bWFzayB8PSBVTk9SREVSRURfQ09NUEFSRV9GTEFHJDI7XG4gICAgICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuXG4gICAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgICAgcmV0dXJuIGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuXG4gICAgICAgIGNhc2Ugc3ltYm9sVGFnJDE6XG4gICAgICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckNCA9IDI7XG5cbiAgICAvKipcbiAgICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICAgICAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gICAgICogIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyQ0LFxuICAgICAgICAgIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICAgICAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gICAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgICAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBiYXNlSGFzKG90aGVyLCBrZXkpKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG5cbiAgICAgIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKVxuICAgICAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICAgICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAgICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xuICAgIHZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbiAgICAvKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG4gICAgdmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuICAgIHZhciBtYXBUYWckMSA9ICdbb2JqZWN0IE1hcF0nO1xuICAgIHZhciBvYmplY3RUYWckMSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIHZhciBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nO1xuICAgIHZhciBzZXRUYWckMSA9ICdbb2JqZWN0IFNldF0nO1xuICAgIHZhciB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuICAgIHZhciBkYXRhVmlld1RhZyQxID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuICAgIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgb2JqZWN0UHJvdG8kMTAgPSBPYmplY3QucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZXNvbHZlIHRoZVxuICAgICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgICAqIG9mIHZhbHVlcy5cbiAgICAgKi9cbiAgICB2YXIgb2JqZWN0VG9TdHJpbmckNCA9IG9iamVjdFByb3RvJDEwLnRvU3RyaW5nO1xuXG4gICAgLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbiAgICB2YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpO1xuICAgIHZhciBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKTtcbiAgICB2YXIgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKTtcbiAgICB2YXIgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCk7XG4gICAgdmFyIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFRhZyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nJDQuY2FsbCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4gICAgLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG4gICAgaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnJDEpIHx8XG4gICAgICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZyQxKSB8fFxuICAgICAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZyQxKSB8fFxuICAgICAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gICAgICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmckNC5jYWxsKHZhbHVlKSxcbiAgICAgICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnJDEgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWckMTtcbiAgICAgICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZyQxO1xuICAgICAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWckMTtcbiAgICAgICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgZ2V0VGFnJDEgPSBnZXRUYWc7XG5cbiAgICB2YXIgYXJnc1RhZyQyID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gICAgdmFyIGFycmF5VGFnJDEgPSAnW29iamVjdCBBcnJheV0nO1xuICAgIHZhciBib29sVGFnJDEgPSAnW29iamVjdCBCb29sZWFuXSc7XG4gICAgdmFyIGRhdGVUYWckMSA9ICdbb2JqZWN0IERhdGVdJztcbiAgICB2YXIgZXJyb3JUYWckMSA9ICdbb2JqZWN0IEVycm9yXSc7XG4gICAgdmFyIGZ1bmNUYWckMSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgdmFyIG1hcFRhZyQyID0gJ1tvYmplY3QgTWFwXSc7XG4gICAgdmFyIG51bWJlclRhZyQxID0gJ1tvYmplY3QgTnVtYmVyXSc7XG4gICAgdmFyIG9iamVjdFRhZyQyID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgdmFyIHJlZ2V4cFRhZyQxID0gJ1tvYmplY3QgUmVnRXhwXSc7XG4gICAgdmFyIHNldFRhZyQyID0gJ1tvYmplY3QgU2V0XSc7XG4gICAgdmFyIHN0cmluZ1RhZyQyID0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgdmFyIHdlYWtNYXBUYWckMSA9ICdbb2JqZWN0IFdlYWtNYXBdJztcbiAgICB2YXIgYXJyYXlCdWZmZXJUYWckMSA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG4gICAgdmFyIGRhdGFWaWV3VGFnJDIgPSAnW29iamVjdCBEYXRhVmlld10nO1xuICAgIHZhciBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XSc7XG4gICAgdmFyIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJztcbiAgICB2YXIgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nO1xuICAgIHZhciBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJztcbiAgICB2YXIgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XSc7XG4gICAgdmFyIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nO1xuICAgIHZhciB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nO1xuICAgIHZhciB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nO1xuICAgIHZhciB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuICAgIC8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbiAgICB2YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbiAgICB0eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbiAgICB0eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbiAgICB0eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG4gICAgdHlwZWRBcnJheVRhZ3NbYXJnc1RhZyQyXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnJDFdID1cbiAgICB0eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZyQxXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWckMV0gPVxuICAgIHR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnJDJdID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZyQxXSA9XG4gICAgdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWckMV0gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnJDFdID1cbiAgICB0eXBlZEFycmF5VGFnc1ttYXBUYWckMl0gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWckMV0gPVxuICAgIHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZyQyXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZyQxXSA9XG4gICAgdHlwZWRBcnJheVRhZ3Nbc2V0VGFnJDJdID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnJDJdID1cbiAgICB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnJDFdID0gZmFsc2U7XG5cbiAgICAvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG4gICAgdmFyIG9iamVjdFByb3RvJDExID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAgICAgKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAgICAgKiBvZiB2YWx1ZXMuXG4gICAgICovXG4gICAgdmFyIG9iamVjdFRvU3RyaW5nJDUgPSBvYmplY3RQcm90byQxMS50b1N0cmluZztcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAzLjAuMFxuICAgICAqIEBjYXRlZ29yeSBMYW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsXG4gICAgICogIGVsc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKlxuICAgICAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAgICAgKiAvLyA9PiBmYWxzZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICAgICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nJDUuY2FsbCh2YWx1ZSldO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xuICAgIHZhciBQQVJUSUFMX0NPTVBBUkVfRkxBRyQxID0gMjtcblxuICAgIC8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbiAgICB2YXIgYXJnc1RhZyQxID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gICAgdmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB2YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xuICAgIHZhciBvYmplY3RQcm90byQ5ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAgIC8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQ1ID0gb2JqZWN0UHJvdG8kOS5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAgICAgKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gICAgICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICAgICAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgICAgIGlmICghb2JqSXNBcnIpIHtcbiAgICAgICAgb2JqVGFnID0gZ2V0VGFnJDEob2JqZWN0KTtcbiAgICAgICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWckMSA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgICAgIH1cbiAgICAgIGlmICghb3RoSXNBcnIpIHtcbiAgICAgICAgb3RoVGFnID0gZ2V0VGFnJDEob3RoZXIpO1xuICAgICAgICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyQxID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuICAgICAgfVxuICAgICAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG9iamVjdCksXG4gICAgICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnICYmICFpc0hvc3RPYmplY3Qob3RoZXIpLFxuICAgICAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgICAgIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKCEoYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHJDEpKSB7XG4gICAgICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eSQ1LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5JDUuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICAgICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWlzU2FtZVRhZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gICAgICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAgICAgKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuXG4gICAgICogIFRoZSBiaXRtYXNrIG1heSBiZSBjb21wb3NlZCBvZiB0aGUgZm9sbG93aW5nIGZsYWdzOlxuICAgICAqICAgICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAgICAgKiAgICAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICAgICAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgfVxuXG4gICAgdmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgPSAxO1xuICAgIHZhciBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gICAgICB2YXIgaW5kZXggPSBtYXRjaERhdGEubGVuZ3RoLFxuICAgICAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICFsZW5ndGg7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSlcbiAgICAgICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICAgICAgdmFyIGtleSA9IGRhdGFbMF0sXG4gICAgICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgICAgIGlmIChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSkge1xuICAgICAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHLCBzdGFjaylcbiAgICAgICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICAgICApKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gICAgICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3Mgb2YgYG9iamVjdGAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TWF0Y2hEYXRhKG9iamVjdCkge1xuICAgICAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgICAgICByZXN1bHRbbGVuZ3RoXSA9IFtrZXksIHZhbHVlLCBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gICAgICogZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHNyY1ZhbHVlICYmXG4gICAgICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gICAgICB2YXIgbWF0Y2hEYXRhID0gZ2V0TWF0Y2hEYXRhKHNvdXJjZSk7XG4gICAgICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG4gICAgdmFyIEZVTkNfRVJST1JfVEVYVCQxID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAgICAgKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gICAgICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAgICAgKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAgICAgKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAgICAgKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICAgICAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gICAgICogbWV0aG9kIGludGVyZmFjZSBvZiBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICAgICAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAgICAgKlxuICAgICAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICAgICAqIHZhbHVlcyhvYmplY3QpO1xuICAgICAqIC8vID0+IFsxLCAyXVxuICAgICAqXG4gICAgICogdmFsdWVzKG90aGVyKTtcbiAgICAgKiAvLyA9PiBbMywgNF1cbiAgICAgKlxuICAgICAqIG9iamVjdC5hID0gMjtcbiAgICAgKiB2YWx1ZXMob2JqZWN0KTtcbiAgICAgKiAvLyA9PiBbMSwgMl1cbiAgICAgKlxuICAgICAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICAgICAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAgICAgKiB2YWx1ZXMob2JqZWN0KTtcbiAgICAgKiAvLyA9PiBbJ2EnLCAnYiddXG4gICAgICpcbiAgICAgKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICAgICAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICAgICAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCQxKTtcbiAgICAgIH1cbiAgICAgIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgICAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gICAgICByZXR1cm4gbWVtb2l6ZWQ7XG4gICAgfVxuXG4gICAgLy8gQXNzaWduIGNhY2hlIHRvIGBfLm1lbW9pemVgLlxuICAgIG1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuICAgIC8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xuICAgIHZhciBJTkZJTklUWSQxID0gMSAvIDA7XG5cbiAgICAvKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbiAgICB2YXIgc3ltYm9sUHJvdG8kMSA9IFN5bWJvbCQxID8gU3ltYm9sJDEucHJvdG90eXBlIDogdW5kZWZpbmVkO1xuICAgIHZhciBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvJDEgPyBzeW1ib2xQcm90byQxLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICAgICAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgICAgIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gICAgICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZJDEpID8gJy0wJyA6IHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICAgICAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IExhbmdcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXy50b1N0cmluZyhudWxsKTtcbiAgICAgKiAvLyA9PiAnJ1xuICAgICAqXG4gICAgICogXy50b1N0cmluZygtMCk7XG4gICAgICogLy8gPT4gJy0wJ1xuICAgICAqXG4gICAgICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICAgICAqIC8vID0+ICcxLDIsMydcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xuICAgIHZhciByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KFxcLnxcXFtcXF0pKD86XFw0fCQpKS9nO1xuXG4gICAgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG4gICAgdmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gICAgICovXG4gICAgdmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemUoZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB0b1N0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN0cmluZykge1xuICAgICAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbiAgICB9XG5cbiAgICB2YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLztcbiAgICB2YXIgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG4gICAgdmFyIElORklOSVRZJDIgPSAxIC8gMDtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICAgICAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSQyKSA/ICctMCcgOiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgICAgIHBhdGggPSBpc0tleShwYXRoLCBvYmplY3QpID8gW3BhdGhdIDogY2FzdFBhdGgocGF0aCk7XG5cbiAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gICAgICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyB1c2VkIGluIGl0cyBwbGFjZS5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAzLjcuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICAgKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICAgICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAgICAgKlxuICAgICAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gICAgICogLy8gPT4gM1xuICAgICAqXG4gICAgICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gICAgICogLy8gPT4gM1xuICAgICAqXG4gICAgICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICAgICAqIC8vID0+ICdkZWZhdWx0J1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gICAgICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gICAgICB2YXIgcmVzdWx0LFxuICAgICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiAwO1xuICAgICAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAgICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc1N0cmluZyhvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDQuMC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAgICAgKiAvLyA9PiB0cnVlXG4gICAgICpcbiAgICAgKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqXG4gICAgICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gICAgICogLy8gPT4gZmFsc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbiAgICB9XG5cbiAgICB2YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQzID0gMTtcbiAgICB2YXIgUEFSVElBTF9DT01QQVJFX0ZMQUckNSA9IDI7XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2Vzbid0IGNsb25lIGBzcmNWYWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gICAgICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUodG9LZXkocGF0aCksIHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIHVuZGVmaW5lZCwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyQzIHwgUEFSVElBTF9DT01QQVJFX0ZMQUckNSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGdpdmVuIHRvIGl0LlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICAgICAqXG4gICAgICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICAgICAqIC8vID0+IHRydWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMi40LjBcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBvYmplY3RzID0gW1xuICAgICAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAgICAgKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAgICAgKiBdO1xuICAgICAqXG4gICAgICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICAgICAqIC8vID0+IFsyLCAxXVxuICAgICAqXG4gICAgICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAgICAgKiAvLyA9PiBbMSwgMl1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gICAgICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gICAgICAvLyBEb24ndCBzdG9yZSB0aGUgYHR5cGVvZmAgcmVzdWx0IGluIGEgdmFyaWFibGUgdG8gYXZvaWQgYSBKSVQgYnVnIGluIFNhZmFyaSA5LlxuICAgICAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFuZFxuICAgICAqIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZVxuICAgICAqIGFyZ3VtZW50czogKHZhbHVlLCBrZXksIG9iamVjdCkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb25cbiAgICAgKiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBfXG4gICAgICogQHNpbmNlIDAuMy4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICAgKiBAc2VlIF8uZm9yT3duUmlnaHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gRm9vKCkge1xuICAgICAqICAgdGhpcy5hID0gMTtcbiAgICAgKiAgIHRoaXMuYiA9IDI7XG4gICAgICogfVxuICAgICAqXG4gICAgICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAgICAgKlxuICAgICAqIF8uZm9yT3duKG5ldyBGb28sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgICogfSk7XG4gICAgICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgICAgIHJldHVybiBvYmplY3QgJiYgYmFzZUZvck93bihvYmplY3QsIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGBOYU5gIGlzIGZvdW5kIGluIGBhcnJheWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgYE5hTmAsIGVsc2UgYC0xYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gICAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgICB2YXIgb3RoZXIgPSBhcnJheVtpbmRleF07XG4gICAgICAgIGlmIChvdGhlciAhPT0gb3RoZXIpIHtcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gICAgICBpZiAodmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgpO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB0aGUgYmVzdCBvcmRlciBmb3IgcnVubmluZyB0aGUgZnVuY3Rpb25zIGluIGB0YXNrc2AsIGJhc2VkIG9uXG4gICAgICogdGhlaXIgcmVxdWlyZW1lbnRzLiBFYWNoIGZ1bmN0aW9uIGNhbiBvcHRpb25hbGx5IGRlcGVuZCBvbiBvdGhlciBmdW5jdGlvbnNcbiAgICAgKiBiZWluZyBjb21wbGV0ZWQgZmlyc3QsIGFuZCBlYWNoIGZ1bmN0aW9uIGlzIHJ1biBhcyBzb29uIGFzIGl0cyByZXF1aXJlbWVudHNcbiAgICAgKiBhcmUgc2F0aXNmaWVkLlxuICAgICAqXG4gICAgICogSWYgYW55IG9mIHRoZSBmdW5jdGlvbnMgcGFzcyBhbiBlcnJvciB0byB0aGVpciBjYWxsYmFjaywgdGhlIGBhdXRvYCBzZXF1ZW5jZVxuICAgICAqIHdpbGwgc3RvcC4gRnVydGhlciB0YXNrcyB3aWxsIG5vdCBleGVjdXRlIChzbyBhbnkgb3RoZXIgZnVuY3Rpb25zIGRlcGVuZGluZ1xuICAgICAqIG9uIGl0IHdpbGwgbm90IHJ1biksIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZVxuICAgICAqIGVycm9yLlxuICAgICAqXG4gICAgICogRnVuY3Rpb25zIGFsc28gcmVjZWl2ZSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiBmdW5jdGlvbnMgd2hpY2hcbiAgICAgKiBoYXZlIGNvbXBsZXRlZCBzbyBmYXIgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiB0aGV5IGhhdmUgZGVwZW5kZW5jaWVzLiBJZiBhXG4gICAgICogdGFzayBmdW5jdGlvbiBoYXMgbm8gZGVwZW5kZW5jaWVzLCBpdCB3aWxsIG9ubHkgYmUgcGFzc2VkIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAbmFtZSBhdXRvXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFza3MgLSBBbiBvYmplY3QuIEVhY2ggb2YgaXRzIHByb3BlcnRpZXMgaXMgZWl0aGVyIGFcbiAgICAgKiBmdW5jdGlvbiBvciBhbiBhcnJheSBvZiByZXF1aXJlbWVudHMsIHdpdGggdGhlIGZ1bmN0aW9uIGl0c2VsZiB0aGUgbGFzdCBpdGVtXG4gICAgICogaW4gdGhlIGFycmF5LiBUaGUgb2JqZWN0J3Mga2V5IG9mIGEgcHJvcGVydHkgc2VydmVzIGFzIHRoZSBuYW1lIG9mIHRoZSB0YXNrXG4gICAgICogZGVmaW5lZCBieSB0aGF0IHByb3BlcnR5LCBpLmUuIGNhbiBiZSB1c2VkIHdoZW4gc3BlY2lmeWluZyByZXF1aXJlbWVudHMgZm9yXG4gICAgICogb3RoZXIgdGFza3MuIFRoZSBmdW5jdGlvbiByZWNlaXZlcyBvbmUgb3IgdHdvIGFyZ3VtZW50czpcbiAgICAgKiAqIGEgYHJlc3VsdHNgIG9iamVjdCwgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiB0aGUgcHJldmlvdXNseSBleGVjdXRlZFxuICAgICAqICAgZnVuY3Rpb25zLCBvbmx5IHBhc3NlZCBpZiB0aGUgdGFzayBoYXMgYW55IGRlcGVuZGVuY2llcyxcbiAgICAgKiAqIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgZnVuY3Rpb24sIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdoZW4gZmluaXNoZWQsXG4gICAgICogICBwYXNzaW5nIGFuIGBlcnJvcmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCB0aGUgcmVzdWx0IG9mIHRoZSBmdW5jdGlvbidzXG4gICAgICogICBleGVjdXRpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW5jeT1JbmZpbml0eV0gLSBBbiBvcHRpb25hbCBgaW50ZWdlcmAgZm9yXG4gICAgICogZGV0ZXJtaW5pbmcgdGhlIG1heGltdW0gbnVtYmVyIG9mIHRhc2tzIHRoYXQgY2FuIGJlIHJ1biBpbiBwYXJhbGxlbC4gQnlcbiAgICAgKiBkZWZhdWx0LCBhcyBtYW55IGFzIHBvc3NpYmxlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBbiBvcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiB0aGUgdGFza3MgaGF2ZSBiZWVuIGNvbXBsZXRlZC4gSXQgcmVjZWl2ZXMgdGhlIGBlcnJgIGFyZ3VtZW50IGlmIGFueSBgdGFza3NgXG4gICAgICogcGFzcyBhbiBlcnJvciB0byB0aGVpciBjYWxsYmFjay4gUmVzdWx0cyBhcmUgYWx3YXlzIHJldHVybmVkOyBob3dldmVyLCBpZiBhblxuICAgICAqIGVycm9yIG9jY3Vycywgbm8gZnVydGhlciBgdGFza3NgIHdpbGwgYmUgcGVyZm9ybWVkLCBhbmQgdGhlIHJlc3VsdHMgb2JqZWN0XG4gICAgICogd2lsbCBvbmx5IGNvbnRhaW4gcGFydGlhbCByZXN1bHRzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwganVzdCBiZSBwYXNzZWQgYSBjYWxsYmFja1xuICAgICAqICAgICByZWFkRGF0YTogYXN5bmMuYXBwbHkoZnMucmVhZEZpbGUsICdkYXRhLnR4dCcsICd1dGYtOCcpLFxuICAgICAqICAgICBzaG93RGF0YTogWydyZWFkRGF0YScsIGZ1bmN0aW9uKHJlc3VsdHMsIGNiKSB7XG4gICAgICogICAgICAgICAvLyByZXN1bHRzLnJlYWREYXRhIGlzIHRoZSBmaWxlJ3MgY29udGVudHNcbiAgICAgKiAgICAgICAgIC8vIC4uLlxuICAgICAqICAgICB9XVxuICAgICAqIH0sIGNhbGxiYWNrKTtcbiAgICAgKlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICBnZXRfZGF0YTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBnZXRfZGF0YScpO1xuICAgICAqICAgICAgICAgLy8gYXN5bmMgY29kZSB0byBnZXQgc29tZSBkYXRhXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZGF0YScsICdjb252ZXJ0ZWQgdG8gYXJyYXknKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgbWFrZV9mb2xkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZygnaW4gbWFrZV9mb2xkZXInKTtcbiAgICAgKiAgICAgICAgIC8vIGFzeW5jIGNvZGUgdG8gY3JlYXRlIGEgZGlyZWN0b3J5IHRvIHN0b3JlIGEgZmlsZSBpblxuICAgICAqICAgICAgICAgLy8gdGhpcyBpcyBydW4gYXQgdGhlIHNhbWUgdGltZSBhcyBnZXR0aW5nIHRoZSBkYXRhXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZm9sZGVyJyk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIHdyaXRlX2ZpbGU6IFsnZ2V0X2RhdGEnLCAnbWFrZV9mb2xkZXInLCBmdW5jdGlvbihyZXN1bHRzLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coJ2luIHdyaXRlX2ZpbGUnLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZXJlIGlzIHNvbWUgZGF0YSBhbmQgdGhlIGRpcmVjdG9yeSBleGlzdHMsXG4gICAgICogICAgICAgICAvLyB3cml0ZSB0aGUgZGF0YSB0byBhIGZpbGUgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZpbGVuYW1lJyk7XG4gICAgICogICAgIH1dLFxuICAgICAqICAgICBlbWFpbF9saW5rOiBbJ3dyaXRlX2ZpbGUnLCBmdW5jdGlvbihyZXN1bHRzLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coJ2luIGVtYWlsX2xpbmsnLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZSBmaWxlIGlzIHdyaXR0ZW4gbGV0J3MgZW1haWwgYSBsaW5rIHRvIGl0Li4uXG4gICAgICogICAgICAgICAvLyByZXN1bHRzLndyaXRlX2ZpbGUgY29udGFpbnMgdGhlIGZpbGVuYW1lIHJldHVybmVkIGJ5IHdyaXRlX2ZpbGUuXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCB7J2ZpbGUnOnJlc3VsdHMud3JpdGVfZmlsZSwgJ2VtYWlsJzondXNlckBleGFtcGxlLmNvbSd9KTtcbiAgICAgKiAgICAgfV1cbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2VyciA9ICcsIGVycik7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdyZXN1bHRzID0gJywgcmVzdWx0cyk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gYXV0byAodGFza3MsIGNvbmN1cnJlbmN5LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmN1cnJlbmN5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25jdXJyZW5jeSBpcyBvcHRpb25hbCwgc2hpZnQgdGhlIGFyZ3MuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNvbmN1cnJlbmN5O1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrID0gb25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgICAgdmFyIGtleXMkJCA9IGtleXModGFza3MpO1xuICAgICAgICB2YXIgbnVtVGFza3MgPSBrZXlzJCQubGVuZ3RoO1xuICAgICAgICBpZiAoIW51bVRhc2tzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25jdXJyZW5jeSkge1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSBudW1UYXNrcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHRzID0ge307XG4gICAgICAgIHZhciBydW5uaW5nVGFza3MgPSAwO1xuICAgICAgICB2YXIgaGFzRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0ge307XG5cbiAgICAgICAgdmFyIHJlYWR5VGFza3MgPSBbXTtcblxuICAgICAgICAvLyBmb3IgY3ljbGUgZGV0ZWN0aW9uOlxuICAgICAgICB2YXIgcmVhZHlUb0NoZWNrID0gW107IC8vIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIGlkZW50aWZpZWQgYXMgcmVhY2hhYmxlXG4gICAgICAgIC8vIHdpdGhvdXQgdGhlIHBvc3NpYmlsaXR5IG9mIHJldHVybmluZyB0byBhbiBhbmNlc3RvciB0YXNrXG4gICAgICAgIHZhciB1bmNoZWNrZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuICAgICAgICBmb3JPd24odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICghaXNBcnJheSh0YXNrKSkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGRlcGVuZGVuY2llc1xuICAgICAgICAgICAgICAgIGVucXVldWVUYXNrKGtleSwgW3Rhc2tdKTtcbiAgICAgICAgICAgICAgICByZWFkeVRvQ2hlY2sucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRlcGVuZGVuY2llcyA9IHRhc2suc2xpY2UoMCwgdGFzay5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciByZW1haW5pbmdEZXBlbmRlbmNpZXMgPSBkZXBlbmRlbmNpZXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0RlcGVuZGVuY2llcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGVucXVldWVUYXNrKGtleSwgdGFzayk7XG4gICAgICAgICAgICAgICAgcmVhZHlUb0NoZWNrLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1bmNoZWNrZWREZXBlbmRlbmNpZXNba2V5XSA9IHJlbWFpbmluZ0RlcGVuZGVuY2llcztcblxuICAgICAgICAgICAgYXJyYXlFYWNoKGRlcGVuZGVuY2llcywgZnVuY3Rpb24gKGRlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXNrc1tkZXBlbmRlbmN5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhc3luYy5hdXRvIHRhc2sgYCcgKyBrZXkgKyAnYCBoYXMgYSBub24tZXhpc3RlbnQgZGVwZW5kZW5jeSBpbiAnICsgZGVwZW5kZW5jaWVzLmpvaW4oJywgJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcihkZXBlbmRlbmN5TmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmdEZXBlbmRlbmNpZXMtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZ0RlcGVuZGVuY2llcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5xdWV1ZVRhc2soa2V5LCB0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNoZWNrRm9yRGVhZGxvY2tzKCk7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVucXVldWVUYXNrKGtleSwgdGFzaykge1xuICAgICAgICAgICAgcmVhZHlUYXNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5UYXNrKGtleSwgdGFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgICAgIGlmIChyZWFkeVRhc2tzLmxlbmd0aCA9PT0gMCAmJiBydW5uaW5nVGFza3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAocmVhZHlUYXNrcy5sZW5ndGggJiYgcnVubmluZ1Rhc2tzIDwgY29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgICAgICB2YXIgcnVuID0gcmVhZHlUYXNrcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIodGFza05hbWUsIGZuKSB7XG4gICAgICAgICAgICB2YXIgdGFza0xpc3RlbmVycyA9IGxpc3RlbmVyc1t0YXNrTmFtZV07XG4gICAgICAgICAgICBpZiAoIXRhc2tMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0YXNrTGlzdGVuZXJzID0gbGlzdGVuZXJzW3Rhc2tOYW1lXSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXNrTGlzdGVuZXJzLnB1c2goZm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdGFza0NvbXBsZXRlKHRhc2tOYW1lKSB7XG4gICAgICAgICAgICB2YXIgdGFza0xpc3RlbmVycyA9IGxpc3RlbmVyc1t0YXNrTmFtZV0gfHwgW107XG4gICAgICAgICAgICBhcnJheUVhY2godGFza0xpc3RlbmVycywgZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJvY2Vzc1F1ZXVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBydW5UYXNrKGtleSwgdGFzaykge1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciB0YXNrQ2FsbGJhY2sgPSBvbmx5T25jZShyZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVGFza3MtLTtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2FmZVJlc3VsdHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yT3duKHJlc3VsdHMsIGZ1bmN0aW9uICh2YWwsIHJrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVSZXN1bHRzW3JrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2FmZVJlc3VsdHNba2V5XSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBzYWZlUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1trZXldID0gYXJncztcbiAgICAgICAgICAgICAgICAgICAgdGFza0NvbXBsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBydW5uaW5nVGFza3MrKztcbiAgICAgICAgICAgIHZhciB0YXNrRm4gPSB0YXNrW3Rhc2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAodGFzay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGFza0ZuKHJlc3VsdHMsIHRhc2tDYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhc2tGbih0YXNrQ2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tGb3JEZWFkbG9ja3MoKSB7XG4gICAgICAgICAgICAvLyBLYWhuJ3MgYWxnb3JpdGhtXG4gICAgICAgICAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Ub3BvbG9naWNhbF9zb3J0aW5nI0thaG4uMjdzX2FsZ29yaXRobVxuICAgICAgICAgICAgLy8gaHR0cDovL2Nvbm5hbGxlLmJsb2dzcG90LmNvbS8yMDEzLzEwL3RvcG9sb2dpY2FsLXNvcnRpbmdrYWhuLWFsZ29yaXRobS5odG1sXG4gICAgICAgICAgICB2YXIgY3VycmVudFRhc2s7XG4gICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocmVhZHlUb0NoZWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXNrID0gcmVhZHlUb0NoZWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBhcnJheUVhY2goZ2V0RGVwZW5kZW50cyhjdXJyZW50VGFzayksIGZ1bmN0aW9uIChkZXBlbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgLS11bmNoZWNrZWREZXBlbmRlbmNpZXNbZGVwZW5kZW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlUb0NoZWNrLnB1c2goZGVwZW5kZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY291bnRlciAhPT0gbnVtVGFza3MpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FzeW5jLmF1dG8gY2Fubm90IGV4ZWN1dGUgdGFza3MgZHVlIHRvIGEgcmVjdXJzaXZlIGRlcGVuZGVuY3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldERlcGVuZGVudHModGFza05hbWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvck93bih0YXNrcywgZnVuY3Rpb24gKHRhc2ssIGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHRhc2spICYmIGJhc2VJbmRleE9mKHRhc2ssIHRhc2tOYW1lLCAwKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gICAgICogc2hvcnRoYW5kcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICAgICAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gICAgICB9XG4gICAgICBlbmQgPSBlbmQgPiBsZW5ndGggPyBsZW5ndGggOiBlbmQ7XG4gICAgICBpZiAoZW5kIDwgMCkge1xuICAgICAgICBlbmQgKz0gbGVuZ3RoO1xuICAgICAgfVxuICAgICAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICAgICAgc3RhcnQgPj4+PSAwO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FzdHMgYGFycmF5YCB0byBhIHNsaWNlIGlmIGl0J3MgbmVlZGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3Qgc2xpY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FzdFNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQ7XG4gICAgICByZXR1cm4gKCFzdGFydCAmJiBlbmQgPj0gbGVuZ3RoKSA/IGFycmF5IDogYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltRW5kYCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHN0cmluZyBzeW1ib2xcbiAgICAgKiB0aGF0IGlzIG5vdCBmb3VuZCBpbiB0aGUgY2hhcmFjdGVyIHN5bWJvbHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0clN5bWJvbHMgVGhlIHN0cmluZyBzeW1ib2xzIHRvIGluc3BlY3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbGFzdCB1bm1hdGNoZWQgc3RyaW5nIHN5bWJvbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjaGFyc0VuZEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgICAgIHZhciBpbmRleCA9IHN0clN5bWJvbHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaW5kZXgtLSAmJiBiYXNlSW5kZXhPZihjaHJTeW1ib2xzLCBzdHJTeW1ib2xzW2luZGV4XSwgMCkgPiAtMSkge31cbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltU3RhcnRgIHRvIGdldCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHN0cmluZyBzeW1ib2xcbiAgICAgKiB0aGF0IGlzIG5vdCBmb3VuZCBpbiB0aGUgY2hhcmFjdGVyIHN5bWJvbHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHN0clN5bWJvbHMgVGhlIHN0cmluZyBzeW1ib2xzIHRvIGluc3BlY3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gY2hyU3ltYm9scyBUaGUgY2hhcmFjdGVyIHN5bWJvbHMgdG8gZmluZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgdW5tYXRjaGVkIHN0cmluZyBzeW1ib2wuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hhcnNTdGFydEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IHN0clN5bWJvbHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCAmJiBiYXNlSW5kZXhPZihjaHJTeW1ib2xzLCBzdHJTeW1ib2xzW2luZGV4XSwgMCkgPiAtMSkge31cbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG4gICAgdmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZic7XG4gICAgdmFyIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJztcbiAgICB2YXIgcnNDb21ib1N5bWJvbHNSYW5nZSA9ICdcXFxcdTIwZDAtXFxcXHUyMGYwJztcbiAgICB2YXIgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnO1xuICAgIHZhciByc0FzdHJhbCA9ICdbJyArIHJzQXN0cmFsUmFuZ2UgKyAnXSc7XG4gICAgdmFyIHJzQ29tYm8gPSAnWycgKyByc0NvbWJvTWFya3NSYW5nZSArIHJzQ29tYm9TeW1ib2xzUmFuZ2UgKyAnXSc7XG4gICAgdmFyIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nO1xuICAgIHZhciByc01vZGlmaWVyID0gJyg/OicgKyByc0NvbWJvICsgJ3wnICsgcnNGaXR6ICsgJyknO1xuICAgIHZhciByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nO1xuICAgIHZhciByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nO1xuICAgIHZhciByc1N1cnJQYWlyID0gJ1tcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXSc7XG4gICAgdmFyIHJzWldKID0gJ1xcXFx1MjAwZCc7XG4gICAgdmFyIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JztcbiAgICB2YXIgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JztcbiAgICB2YXIgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJztcbiAgICB2YXIgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luO1xuICAgIHZhciByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcbiAgICAvKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xuICAgIHZhciByZUNvbXBsZXhTeW1ib2wgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZy5tYXRjaChyZUNvbXBsZXhTeW1ib2wpO1xuICAgIH1cblxuICAgIC8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG4gICAgdmFyIHJlVHJpbSQxID0gL15cXHMrfFxccyskL2c7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2Ugb3Igc3BlY2lmaWVkIGNoYXJhY3RlcnMgZnJvbSBgc3RyaW5nYC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgX1xuICAgICAqIEBzaW5jZSAzLjAuMFxuICAgICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byB0cmltLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbY2hhcnM9d2hpdGVzcGFjZV0gVGhlIGNoYXJhY3RlcnMgdG8gdHJpbS5cbiAgICAgKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHRyaW1tZWQgc3RyaW5nLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBfLnRyaW0oJyAgYWJjICAnKTtcbiAgICAgKiAvLyA9PiAnYWJjJ1xuICAgICAqXG4gICAgICogXy50cmltKCctXy1hYmMtXy0nLCAnXy0nKTtcbiAgICAgKiAvLyA9PiAnYWJjJ1xuICAgICAqXG4gICAgICogXy5tYXAoWycgIGZvbyAgJywgJyAgYmFyICAnXSwgXy50cmltKTtcbiAgICAgKiAvLyA9PiBbJ2ZvbycsICdiYXInXVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyaW0oc3RyaW5nLCBjaGFycywgZ3VhcmQpIHtcbiAgICAgIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gICAgICBpZiAoc3RyaW5nICYmIChndWFyZCB8fCBjaGFycyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UocmVUcmltJDEsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmICghc3RyaW5nIHx8ICEoY2hhcnMgPSBiYXNlVG9TdHJpbmcoY2hhcnMpKSkge1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgfVxuICAgICAgdmFyIHN0clN5bWJvbHMgPSBzdHJpbmdUb0FycmF5KHN0cmluZyksXG4gICAgICAgICAgY2hyU3ltYm9scyA9IHN0cmluZ1RvQXJyYXkoY2hhcnMpLFxuICAgICAgICAgIHN0YXJ0ID0gY2hhcnNTdGFydEluZGV4KHN0clN5bWJvbHMsIGNoclN5bWJvbHMpLFxuICAgICAgICAgIGVuZCA9IGNoYXJzRW5kSW5kZXgoc3RyU3ltYm9scywgY2hyU3ltYm9scykgKyAxO1xuXG4gICAgICByZXR1cm4gY2FzdFNsaWNlKHN0clN5bWJvbHMsIHN0YXJ0LCBlbmQpLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHZhciBhcmdzUmVnZXggPSAvXihmdW5jdGlvblteXFwoXSopP1xcKD9cXHMqKFteXFwpPV0qKS9tO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VQYXJhbXMoZnVuYykge1xuICAgICAgICByZXR1cm4gdHJpbShmdW5jLnRvU3RyaW5nKCkubWF0Y2goYXJnc1JlZ2V4KVsyXSkuc3BsaXQoL1xccypcXCxcXHMqLyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBkZXBlbmRlbmN5LWluamVjdGVkIHZlcnNpb24gb2YgdGhlIHtAbGluayBhc3luYy5hdXRvfSBmdW5jdGlvbi4gRGVwZW5kZW50XG4gICAgICogdGFza3MgYXJlIHNwZWNpZmllZCBhcyBwYXJhbWV0ZXJzIHRvIHRoZSBmdW5jdGlvbiwgYWZ0ZXIgdGhlIHVzdWFsIGNhbGxiYWNrXG4gICAgICogcGFyYW1ldGVyLCB3aXRoIHRoZSBwYXJhbWV0ZXIgbmFtZXMgbWF0Y2hpbmcgdGhlIG5hbWVzIG9mIHRoZSB0YXNrcyBpdFxuICAgICAqIGRlcGVuZHMgb24uIFRoaXMgY2FuIHByb3ZpZGUgZXZlbiBtb3JlIHJlYWRhYmxlIHRhc2sgZ3JhcGhzIHdoaWNoIGNhbiBiZVxuICAgICAqIGVhc2llciB0byBtYWludGFpbi5cbiAgICAgKlxuICAgICAqIElmIGEgZmluYWwgY2FsbGJhY2sgaXMgc3BlY2lmaWVkLCB0aGUgdGFzayByZXN1bHRzIGFyZSBzaW1pbGFybHkgaW5qZWN0ZWQsXG4gICAgICogc3BlY2lmaWVkIGFzIG5hbWVkIHBhcmFtZXRlcnMgYWZ0ZXIgdGhlIGluaXRpYWwgZXJyb3IgcGFyYW1ldGVyLlxuICAgICAqXG4gICAgICogVGhlIGF1dG9JbmplY3QgZnVuY3Rpb24gaXMgcHVyZWx5IHN5bnRhY3RpYyBzdWdhciBhbmQgaXRzIHNlbWFudGljcyBhcmVcbiAgICAgKiBvdGhlcndpc2UgZXF1aXZhbGVudCB0byB7QGxpbmsgYXN5bmMuYXV0b30uXG4gICAgICpcbiAgICAgKiBAbmFtZSBhdXRvSW5qZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuYXV0b1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFza3MgLSBBbiBvYmplY3QsIGVhY2ggb2Ygd2hvc2UgcHJvcGVydGllcyBpcyBhIGZ1bmN0aW9uIG9mXG4gICAgICogdGhlIGZvcm0gJ2Z1bmMoW2RlcGVuZGVuY2llcy4uLl0sIGNhbGxiYWNrKS4gVGhlIG9iamVjdCdzIGtleSBvZiBhIHByb3BlcnR5XG4gICAgICogc2VydmVzIGFzIHRoZSBuYW1lIG9mIHRoZSB0YXNrIGRlZmluZWQgYnkgdGhhdCBwcm9wZXJ0eSwgaS5lLiBjYW4gYmUgdXNlZFxuICAgICAqIHdoZW4gc3BlY2lmeWluZyByZXF1aXJlbWVudHMgZm9yIG90aGVyIHRhc2tzLlxuICAgICAqICogVGhlIGBjYWxsYmFja2AgcGFyYW1ldGVyIGlzIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiAgIHdoZW4gZmluaXNoZWQsIHBhc3NpbmcgYW4gYGVycm9yYCAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIHRoZSByZXN1bHQgb2ZcbiAgICAgKiAgIHRoZSBmdW5jdGlvbidzIGV4ZWN1dGlvbi4gVGhlIHJlbWFpbmluZyBwYXJhbWV0ZXJzIG5hbWUgb3RoZXIgdGFza3Mgb25cbiAgICAgKiAgIHdoaWNoIHRoZSB0YXNrIGlzIGRlcGVuZGVudCwgYW5kIHRoZSByZXN1bHRzIGZyb20gdGhvc2UgdGFza3MgYXJlIHRoZVxuICAgICAqICAgYXJndW1lbnRzIG9mIHRob3NlIHBhcmFtZXRlcnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIHRoZSB0YXNrcyBoYXZlIGJlZW4gY29tcGxldGVkLiBJdCByZWNlaXZlcyB0aGUgYGVycmAgYXJndW1lbnQgaWYgYW55IGB0YXNrc2BcbiAgICAgKiBwYXNzIGFuIGVycm9yIHRvIHRoZWlyIGNhbGxiYWNrLiBUaGUgcmVtYWluaW5nIHBhcmFtZXRlcnMgYXJlIHRhc2sgbmFtZXNcbiAgICAgKiB3aG9zZSByZXN1bHRzIHlvdSBhcmUgaW50ZXJlc3RlZCBpbi4gVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAgICAgKiBhbGwgdGFza3MgaGF2ZSBmaW5pc2hlZCBvciBhbiBlcnJvciBoYXMgb2NjdXJyZWQsIGFuZCBzbyBkbyBub3Qgc3BlY2lmeVxuICAgICAqIGRlcGVuZGVuY2llcyBpbiB0aGUgc2FtZSB3YXkgYXMgYHRhc2tzYCBkby4gSWYgYW4gZXJyb3Igb2NjdXJzLCBubyBmdXJ0aGVyXG4gICAgICogYHRhc2tzYCB3aWxsIGJlIHBlcmZvcm1lZCwgYW5kIGByZXN1bHRzYCB3aWxsIG9ubHkgYmUgdmFsaWQgZm9yIHRob3NlIHRhc2tzXG4gICAgICogd2hpY2ggbWFuYWdlZCB0byBjb21wbGV0ZS4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzLi4uXSkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vICBUaGUgZXhhbXBsZSBmcm9tIGBhdXRvYCBjYW4gYmUgcmV3cml0dGVuIGFzIGZvbGxvd3M6XG4gICAgICogYXN5bmMuYXV0b0luamVjdCh7XG4gICAgICogICAgIGdldF9kYXRhOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXN5bmMgY29kZSB0byBnZXQgc29tZSBkYXRhXG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZGF0YScsICdjb252ZXJ0ZWQgdG8gYXJyYXknKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgbWFrZV9mb2xkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBhc3luYyBjb2RlIHRvIGNyZWF0ZSBhIGRpcmVjdG9yeSB0byBzdG9yZSBhIGZpbGUgaW5cbiAgICAgKiAgICAgICAgIC8vIHRoaXMgaXMgcnVuIGF0IHRoZSBzYW1lIHRpbWUgYXMgZ2V0dGluZyB0aGUgZGF0YVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZvbGRlcicpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICB3cml0ZV9maWxlOiBmdW5jdGlvbihnZXRfZGF0YSwgbWFrZV9mb2xkZXIsIGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZXJlIGlzIHNvbWUgZGF0YSBhbmQgdGhlIGRpcmVjdG9yeSBleGlzdHMsXG4gICAgICogICAgICAgICAvLyB3cml0ZSB0aGUgZGF0YSB0byBhIGZpbGUgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ2ZpbGVuYW1lJyk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGVtYWlsX2xpbms6IGZ1bmN0aW9uKHdyaXRlX2ZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBvbmNlIHRoZSBmaWxlIGlzIHdyaXR0ZW4gbGV0J3MgZW1haWwgYSBsaW5rIHRvIGl0Li4uXG4gICAgICogICAgICAgICAvLyB3cml0ZV9maWxlIGNvbnRhaW5zIHRoZSBmaWxlbmFtZSByZXR1cm5lZCBieSB3cml0ZV9maWxlLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgeydmaWxlJzp3cml0ZV9maWxlLCAnZW1haWwnOid1c2VyQGV4YW1wbGUuY29tJ30pO1xuICAgICAqICAgICB9XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCBlbWFpbF9saW5rKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdlcnIgPSAnLCBlcnIpO1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZW1haWxfbGluayA9ICcsIGVtYWlsX2xpbmspO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gSWYgeW91IGFyZSB1c2luZyBhIEpTIG1pbmlmaWVyIHRoYXQgbWFuZ2xlcyBwYXJhbWV0ZXIgbmFtZXMsIGBhdXRvSW5qZWN0YFxuICAgICAqIC8vIHdpbGwgbm90IHdvcmsgd2l0aCBwbGFpbiBmdW5jdGlvbnMsIHNpbmNlIHRoZSBwYXJhbWV0ZXIgbmFtZXMgd2lsbCBiZVxuICAgICAqIC8vIGNvbGxhcHNlZCB0byBhIHNpbmdsZSBsZXR0ZXIgaWRlbnRpZmllci4gIFRvIHdvcmsgYXJvdW5kIHRoaXMsIHlvdSBjYW5cbiAgICAgKiAvLyBleHBsaWNpdGx5IHNwZWNpZnkgdGhlIG5hbWVzIG9mIHRoZSBwYXJhbWV0ZXJzIHlvdXIgdGFzayBmdW5jdGlvbiBuZWVkc1xuICAgICAqIC8vIGluIGFuIGFycmF5LCBzaW1pbGFyIHRvIEFuZ3VsYXIuanMgZGVwZW5kZW5jeSBpbmplY3Rpb24uICBUaGUgZmluYWxcbiAgICAgKiAvLyByZXN1bHRzIGNhbGxiYWNrIGNhbiBiZSBwcm92aWRlZCBhcyBhbiBhcnJheSBpbiB0aGUgc2FtZSB3YXkuXG4gICAgICpcbiAgICAgKiAvLyBUaGlzIHN0aWxsIGhhcyBhbiBhZHZhbnRhZ2Ugb3ZlciBwbGFpbiBgYXV0b2AsIHNpbmNlIHRoZSByZXN1bHRzIGEgdGFza1xuICAgICAqIC8vIGRlcGVuZHMgb24gYXJlIHN0aWxsIHNwcmVhZCBpbnRvIGFyZ3VtZW50cy5cbiAgICAgKiBhc3luYy5hdXRvSW5qZWN0KHtcbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiAgICAgd3JpdGVfZmlsZTogWydnZXRfZGF0YScsICdtYWtlX2ZvbGRlcicsIGZ1bmN0aW9uKGdldF9kYXRhLCBtYWtlX2ZvbGRlciwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdmaWxlbmFtZScpO1xuICAgICAqICAgICB9XSxcbiAgICAgKiAgICAgZW1haWxfbGluazogWyd3cml0ZV9maWxlJywgZnVuY3Rpb24od3JpdGVfZmlsZSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIHsnZmlsZSc6d3JpdGVfZmlsZSwgJ2VtYWlsJzondXNlckBleGFtcGxlLmNvbSd9KTtcbiAgICAgKiAgICAgfV1cbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiB9LCBbJ2VtYWlsX2xpbmsnLCBmdW5jdGlvbihlcnIsIGVtYWlsX2xpbmspIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2VyciA9ICcsIGVycik7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdlbWFpbF9saW5rID0gJywgZW1haWxfbGluayk7XG4gICAgICogfV0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGF1dG9JbmplY3QodGFza3MsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBuZXdUYXNrcyA9IHt9O1xuXG4gICAgICAgIGZvck93bih0YXNrcywgZnVuY3Rpb24gKHRhc2tGbiwga2V5KSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zO1xuXG4gICAgICAgICAgICBpZiAoaXNBcnJheSh0YXNrRm4pKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gY29weUFycmF5KHRhc2tGbik7XG4gICAgICAgICAgICAgICAgdGFza0ZuID0gcGFyYW1zLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgbmV3VGFza3Nba2V5XSA9IHBhcmFtcy5jb25jYXQocGFyYW1zLmxlbmd0aCA+IDAgPyBuZXdUYXNrIDogdGFza0ZuKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFza0ZuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF1dG9JbmplY3QgdGFzayBmdW5jdGlvbnMgcmVxdWlyZSBleHBsaWNpdCBwYXJhbWV0ZXJzLlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFza0ZuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGRlcGVuZGVuY2llcywgdXNlIHRoZSBmdW5jdGlvbiBhcy1pc1xuICAgICAgICAgICAgICAgIG5ld1Rhc2tzW2tleV0gPSB0YXNrRm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcnNlUGFyYW1zKHRhc2tGbik7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgbmV3VGFza3Nba2V5XSA9IHBhcmFtcy5jb25jYXQobmV3VGFzayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG5ld1Rhc2socmVzdWx0cywgdGFza0NiKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0FyZ3MgPSBhcnJheU1hcChwYXJhbXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaCh0YXNrQ2IpO1xuICAgICAgICAgICAgICAgIHRhc2tGbi5hcHBseShudWxsLCBuZXdBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXV0byhuZXdUYXNrcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHZhciBoYXNTZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nICYmIHNldEltbWVkaWF0ZTtcbiAgICB2YXIgaGFzTmV4dFRpY2sgPSB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09ICdmdW5jdGlvbic7XG5cbiAgICBmdW5jdGlvbiBmYWxsYmFjayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cmFwKGRlZmVyKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICAgICAgZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBfZGVmZXI7XG5cbiAgICBpZiAoaGFzU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIF9kZWZlciA9IHNldEltbWVkaWF0ZTtcbiAgICB9IGVsc2UgaWYgKGhhc05leHRUaWNrKSB7XG4gICAgICAgIF9kZWZlciA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2RlZmVyID0gZmFsbGJhY2s7XG4gICAgfVxuXG4gICAgdmFyIHNldEltbWVkaWF0ZSQxID0gd3JhcChfZGVmZXIpO1xuXG4gICAgZnVuY3Rpb24gcXVldWUod29ya2VyLCBjb25jdXJyZW5jeSwgcGF5bG9hZCkge1xuICAgICAgICBpZiAoY29uY3VycmVuY3kgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uY3VycmVuY3kgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbmN1cnJlbmN5ID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmN1cnJlbmN5IG11c3Qgbm90IGJlIHplcm8nKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfaW5zZXJ0KHEsIGRhdGEsIHBvcywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFzayBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHEuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwICYmIHEuaWRsZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCBkcmFpbiBpbW1lZGlhdGVseSBpZiB0aGVyZSBhcmUgbm8gdGFza3NcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0SW1tZWRpYXRlJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBxLmRyYWluKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcnJheUVhY2goZGF0YSwgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGFzayxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrIHx8IG5vb3BcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgICAgICAgICBxLnRhc2tzLnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcS50YXNrcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEocS5wcm9jZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfbmV4dChxLCB0YXNrcykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3b3JrZXJzIC09IDE7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgIGFycmF5RWFjaCh0YXNrcywgZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlFYWNoKHdvcmtlcnNMaXN0LCBmdW5jdGlvbiAod29ya2VyLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtlciA9PT0gdGFzayAmJiAhcmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlcnNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRhc2suY2FsbGJhY2suYXBwbHkodGFzaywgYXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3NbMF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcS5lcnJvcihhcmdzWzBdLCB0YXNrLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAod29ya2VycyA8PSBxLmNvbmN1cnJlbmN5IC0gcS5idWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcS51bnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChxLnRhc2tzLmxlbmd0aCArIHdvcmtlcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBxLnByb2Nlc3MoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd29ya2VycyA9IDA7XG4gICAgICAgIHZhciB3b3JrZXJzTGlzdCA9IFtdO1xuICAgICAgICB2YXIgcSA9IHtcbiAgICAgICAgICAgIHRhc2tzOiBbXSxcbiAgICAgICAgICAgIGNvbmN1cnJlbmN5OiBjb25jdXJyZW5jeSxcbiAgICAgICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICBzYXR1cmF0ZWQ6IG5vb3AsXG4gICAgICAgICAgICB1bnNhdHVyYXRlZDogbm9vcCxcbiAgICAgICAgICAgIGJ1ZmZlcjogY29uY3VycmVuY3kgLyA0LFxuICAgICAgICAgICAgZW1wdHk6IG5vb3AsXG4gICAgICAgICAgICBkcmFpbjogbm9vcCxcbiAgICAgICAgICAgIGVycm9yOiBub29wLFxuICAgICAgICAgICAgc3RhcnRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCBmYWxzZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBxLmRyYWluID0gbm9vcDtcbiAgICAgICAgICAgICAgICBxLnRhc2tzID0gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zaGlmdDogZnVuY3Rpb24gKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2luc2VydChxLCBkYXRhLCB0cnVlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdoaWxlICghcS5wYXVzZWQgJiYgd29ya2VycyA8IHEuY29uY3VycmVuY3kgJiYgcS50YXNrcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFza3MgPSBxLnBheWxvYWQgPyBxLnRhc2tzLnNwbGljZSgwLCBxLnBheWxvYWQpIDogcS50YXNrcy5zcGxpY2UoMCwgcS50YXNrcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gYXJyYXlNYXAodGFza3MsIGJhc2VQcm9wZXJ0eSgnZGF0YScpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocS50YXNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHEuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3b3JrZXJzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcnNMaXN0LnB1c2godGFza3NbMF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZXJzID09PSBxLmNvbmN1cnJlbmN5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxLnNhdHVyYXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gb25seU9uY2UoX25leHQocSwgdGFza3MpKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyKGRhdGEsIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VycztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3b3JrZXJzTGlzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3b3JrZXJzTGlzdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZGxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHEudGFza3MubGVuZ3RoICsgd29ya2VycyA9PT0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHEucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocS5wYXVzZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdW1lQ291bnQgPSBNYXRoLm1pbihxLmNvbmN1cnJlbmN5LCBxLnRhc2tzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjYWxsIHEucHJvY2VzcyBvbmNlIHBlciBjb25jdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gd29ya2VyIHRvIHByZXNlcnZlIGZ1bGwgY29uY3VycmVuY3kgYWZ0ZXIgcGF1c2VcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB3ID0gMTsgdyA8PSByZXN1bWVDb3VudDsgdysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZSQxKHEucHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGNhcmdvIG9mIHRhc2tzIGZvciB0aGUgd29ya2VyIGZ1bmN0aW9uIHRvIGNvbXBsZXRlLiBDYXJnbyBpbmhlcml0cyBhbGwgb2ZcbiAgICAgKiB0aGUgc2FtZSBtZXRob2RzIGFuZCBldmVudCBjYWxsYmFja3MgYXMge0BsaW5rIGFzeW5jLnF1ZXVlfS5cbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBjYXJnb1xuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGxlbmd0aCAtIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBudW1iZXIgb2YgaXRlbXNcbiAgICAgKiB3YWl0aW5nIHRvIGJlIHByb2Nlc3NlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBheWxvYWQgLSBBbiBgaW50ZWdlcmAgZm9yIGRldGVybWluaW5nIGhvdyBtYW55IHRhc2tzXG4gICAgICogc2hvdWxkIGJlIHByb2Nlc3MgcGVyIHJvdW5kLiBUaGlzIHByb3BlcnR5IGNhbiBiZSBjaGFuZ2VkIGFmdGVyIGEgYGNhcmdvYCBpc1xuICAgICAqIGNyZWF0ZWQgdG8gYWx0ZXIgdGhlIHBheWxvYWQgb24tdGhlLWZseS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBwdXNoIC0gQWRkcyBgdGFza2AgdG8gdGhlIGBxdWV1ZWAuIFRoZSBjYWxsYmFjayBpc1xuICAgICAqIGNhbGxlZCBvbmNlIHRoZSBgd29ya2VyYCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZyB0aGUgdGFzay4gSW5zdGVhZCBvZiBhXG4gICAgICogc2luZ2xlIHRhc2ssIGFuIGFycmF5IG9mIGB0YXNrc2AgY2FuIGJlIHN1Ym1pdHRlZC4gVGhlIHJlc3BlY3RpdmUgY2FsbGJhY2sgaXNcbiAgICAgKiB1c2VkIGZvciBldmVyeSB0YXNrIGluIHRoZSBsaXN0LiBJbnZva2Ugd2l0aCAodGFzaywgW2NhbGxiYWNrXSkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gc2F0dXJhdGVkIC0gQSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZVxuICAgICAqIGBxdWV1ZS5sZW5ndGgoKWAgaGl0cyB0aGUgY29uY3VycmVuY3kgYW5kIGZ1cnRoZXIgdGFza3Mgd2lsbCBiZSBxdWV1ZWQuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZW1wdHkgLSBBIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGxhc3QgaXRlbVxuICAgICAqIGZyb20gdGhlIGBxdWV1ZWAgaXMgZ2l2ZW4gdG8gYSBgd29ya2VyYC5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBkcmFpbiAtIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgbGFzdCBpdGVtXG4gICAgICogZnJvbSB0aGUgYHF1ZXVlYCBoYXMgcmV0dXJuZWQgZnJvbSB0aGUgYHdvcmtlcmAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gaWRsZSAtIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGZhbHNlIGlmIHRoZXJlIGFyZSBpdGVtc1xuICAgICAqIHdhaXRpbmcgb3IgYmVpbmcgcHJvY2Vzc2VkLCBvciB0cnVlIGlmIG5vdC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcGF1c2UgLSBhIGZ1bmN0aW9uIHRoYXQgcGF1c2VzIHRoZSBwcm9jZXNzaW5nIG9mIHRhc2tzXG4gICAgICogdW50aWwgYHJlc3VtZSgpYCBpcyBjYWxsZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHJlc3VtZSAtIGEgZnVuY3Rpb24gdGhhdCByZXN1bWVzIHRoZSBwcm9jZXNzaW5nIG9mXG4gICAgICogcXVldWVkIHRhc2tzIHdoZW4gdGhlIHF1ZXVlIGlzIHBhdXNlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0ga2lsbCAtIGEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBgZHJhaW5gIGNhbGxiYWNrIGFuZFxuICAgICAqIGVtcHRpZXMgcmVtYWluaW5nIHRhc2tzIGZyb20gdGhlIHF1ZXVlIGZvcmNpbmcgaXQgdG8gZ28gaWRsZS4gSW52b2tlIHdpdGggKCkuXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYGNhcmdvYCBvYmplY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHBheWxvYWQuIFRhc2tzIGFkZGVkIHRvIHRoZVxuICAgICAqIGNhcmdvIHdpbGwgYmUgcHJvY2Vzc2VkIGFsdG9nZXRoZXIgKHVwIHRvIHRoZSBgcGF5bG9hZGAgbGltaXQpLiBJZiB0aGVcbiAgICAgKiBgd29ya2VyYCBpcyBpbiBwcm9ncmVzcywgdGhlIHRhc2sgaXMgcXVldWVkIHVudGlsIGl0IGJlY29tZXMgYXZhaWxhYmxlLiBPbmNlXG4gICAgICogdGhlIGB3b3JrZXJgIGhhcyBjb21wbGV0ZWQgc29tZSB0YXNrcywgZWFjaCBjYWxsYmFjayBvZiB0aG9zZSB0YXNrcyBpc1xuICAgICAqIGNhbGxlZC4gQ2hlY2sgb3V0IFt0aGVzZV0oaHR0cHM6Ly9jYW1vLmdpdGh1YnVzZXJjb250ZW50LmNvbS82YmJkMzZmNGNmNWIzNWEwZjExYTk2ZGNkMmU5NzcxMWZmYzJmYjM3LzY4NzQ3NDcwNzMzYTJmMmY2NjJlNjM2YzZmNzU2NDJlNjc2OTc0Njg3NTYyMmU2MzZmNmQyZjYxNzM3MzY1NzQ3MzJmMzEzNjM3MzYzODM3MzEyZjM2MzgzMTMwMzgyZjYyNjI2MzMwNjM2NjYyMzAyZDM1NjYzMjM5MmQzMTMxNjUzMjJkMzkzNzM0NjYyZDMzMzMzOTM3NjMzNjM0NjQ2MzM4MzUzODJlNjc2OTY2KSBbYW5pbWF0aW9uc10oaHR0cHM6Ly9jYW1vLmdpdGh1YnVzZXJjb250ZW50LmNvbS9mNDgxMGUwMGUxYzVmNWY4YWRkYmUzZTlmNDkwNjRmZDVkMTAyNjk5LzY4NzQ3NDcwNzMzYTJmMmY2NjJlNjM2YzZmNzU2NDJlNjc2OTc0Njg3NTYyMmU2MzZmNmQyZjYxNzM3MzY1NzQ3MzJmMzEzNjM3MzYzODM3MzEyZjM2MzgzMTMwMzEyZjM4MzQ2MzM5MzIzMDM2MzYyZDM1NjYzMjM5MmQzMTMxNjUzMjJkMzgzMTM0NjYyZDM5NjQzMzY0MzAzMjM0MzEzMzYyNjY2NDJlNjc2OTY2KVxuICAgICAqIGZvciBob3cgYGNhcmdvYCBhbmQgYHF1ZXVlYCB3b3JrLlxuICAgICAqXG4gICAgICogV2hpbGUgW3F1ZXVlXSgjcXVldWUpIHBhc3NlcyBvbmx5IG9uZSB0YXNrIHRvIG9uZSBvZiBhIGdyb3VwIG9mIHdvcmtlcnNcbiAgICAgKiBhdCBhIHRpbWUsIGNhcmdvIHBhc3NlcyBhbiBhcnJheSBvZiB0YXNrcyB0byBhIHNpbmdsZSB3b3JrZXIsIHJlcGVhdGluZ1xuICAgICAqIHdoZW4gdGhlIHdvcmtlciBpcyBmaW5pc2hlZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNhcmdvXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucXVldWVcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd29ya2VyIC0gQW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIGFuIGFycmF5XG4gICAgICogb2YgcXVldWVkIHRhc2tzLCB3aGljaCBtdXN0IGNhbGwgaXRzIGBjYWxsYmFjayhlcnIpYCBhcmd1bWVudCB3aGVuIGZpbmlzaGVkLFxuICAgICAqIHdpdGggYW4gb3B0aW9uYWwgYGVycmAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAodGFza3MsIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BheWxvYWQ9SW5maW5pdHldIC0gQW4gb3B0aW9uYWwgYGludGVnZXJgIGZvciBkZXRlcm1pbmluZ1xuICAgICAqIGhvdyBtYW55IHRhc2tzIHNob3VsZCBiZSBwcm9jZXNzZWQgcGVyIHJvdW5kOyBpZiBvbWl0dGVkLCB0aGUgZGVmYXVsdCBpc1xuICAgICAqIHVubGltaXRlZC5cbiAgICAgKiBAcmV0dXJucyB7Y2FyZ299IEEgY2FyZ28gb2JqZWN0IHRvIG1hbmFnZSB0aGUgdGFza3MuIENhbGxiYWNrcyBjYW5cbiAgICAgKiBhdHRhY2hlZCBhcyBjZXJ0YWluIHByb3BlcnRpZXMgdG8gbGlzdGVuIGZvciBzcGVjaWZpYyBldmVudHMgZHVyaW5nIHRoZVxuICAgICAqIGxpZmVjeWNsZSBvZiB0aGUgY2FyZ28gYW5kIGlubmVyIHF1ZXVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBjcmVhdGUgYSBjYXJnbyBvYmplY3Qgd2l0aCBwYXlsb2FkIDJcbiAgICAgKiB2YXIgY2FyZ28gPSBhc3luYy5jYXJnbyhmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZm9yICh2YXIgaT0wOyBpPHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gJyArIHRhc2tzW2ldLm5hbWUpO1xuICAgICAqICAgICB9XG4gICAgICogICAgIGNhbGxiYWNrKCk7XG4gICAgICogfSwgMik7XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtc1xuICAgICAqIGNhcmdvLnB1c2goe25hbWU6ICdmb28nfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGZvbycpO1xuICAgICAqIH0pO1xuICAgICAqIGNhcmdvLnB1c2goe25hbWU6ICdiYXInfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGJhcicpO1xuICAgICAqIH0pO1xuICAgICAqIGNhcmdvLnB1c2goe25hbWU6ICdiYXonfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwcm9jZXNzaW5nIGJheicpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhcmdvKHdvcmtlciwgcGF5bG9hZCkge1xuICAgICAgcmV0dXJuIHF1ZXVlKHdvcmtlciwgMSwgcGF5bG9hZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hPZmAgYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgICogdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hPZkxpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZWFjaE9mXG4gICAgICogQGFsaWFzIGZvckVhY2hPZkxpbWl0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoXG4gICAgICogaXRlbSBpbiBgY29sbGAuIFRoZSBga2V5YCBpcyB0aGUgaXRlbSdzIGtleSwgb3IgaW5kZXggaW4gdGhlIGNhc2Ugb2YgYW5cbiAgICAgKiBhcnJheS4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0XG4gICAgICogaGFzIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGJlIHJ1biB3aXRob3V0XG4gICAgICogYXJndW1lbnRzIG9yIHdpdGggYW4gZXhwbGljaXQgYG51bGxgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGhcbiAgICAgKiAoaXRlbSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZWFjaE9mTGltaXQob2JqLCBsaW1pdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICBfZWFjaE9mTGltaXQobGltaXQpKG9iaiwgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZWFjaE9mYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoT2ZTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5lYWNoT2ZcbiAgICAgKiBAYWxpYXMgZm9yRWFjaE9mU2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuIFRoZVxuICAgICAqIGBrZXlgIGlzIHRoZSBpdGVtJ3Mga2V5LCBvciBpbmRleCBpbiB0aGUgY2FzZSBvZiBhbiBhcnJheS4gVGhlIGl0ZXJhdGVlIGlzXG4gICAgICogcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSWYgbm9cbiAgICAgKiBlcnJvciBoYXMgb2NjdXJyZWQsIHRoZSBjYWxsYmFjayBzaG91bGQgYmUgcnVuIHdpdGhvdXQgYXJndW1lbnRzIG9yIHdpdGggYW5cbiAgICAgKiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAoaXRlbSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICovXG4gICAgdmFyIGVhY2hPZlNlcmllcyA9IGRvTGltaXQoZWFjaE9mTGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogUmVkdWNlcyBgY29sbGAgaW50byBhIHNpbmdsZSB2YWx1ZSB1c2luZyBhbiBhc3luYyBgaXRlcmF0ZWVgIHRvIHJldHVybiBlYWNoXG4gICAgICogc3VjY2Vzc2l2ZSBzdGVwLiBgbWVtb2AgaXMgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbi4gVGhpcyBmdW5jdGlvblxuICAgICAqIG9ubHkgb3BlcmF0ZXMgaW4gc2VyaWVzLlxuICAgICAqXG4gICAgICogRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIGl0IG1heSBtYWtlIHNlbnNlIHRvIHNwbGl0IGEgY2FsbCB0byB0aGlzIGZ1bmN0aW9uXG4gICAgICogaW50byBhIHBhcmFsbGVsIG1hcCwgYW5kIHRoZW4gdXNlIHRoZSBub3JtYWwgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG9uIHRoZVxuICAgICAqIHJlc3VsdHMuIFRoaXMgZnVuY3Rpb24gaXMgZm9yIHNpdHVhdGlvbnMgd2hlcmUgZWFjaCBzdGVwIGluIHRoZSByZWR1Y3Rpb25cbiAgICAgKiBuZWVkcyB0byBiZSBhc3luYzsgaWYgeW91IGNhbiBnZXQgdGhlIGRhdGEgYmVmb3JlIHJlZHVjaW5nIGl0LCB0aGVuIGl0J3NcbiAgICAgKiBwcm9iYWJseSBhIGdvb2QgaWRlYSB0byBkbyBzby5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlZHVjZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgaW5qZWN0LCBmb2xkbFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7Kn0gbWVtbyAtIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSByZWR1Y3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZWFjaCBpdGVtIGluIHRoZVxuICAgICAqIGFycmF5IHRvIHByb2R1Y2UgdGhlIG5leHQgc3RlcCBpbiB0aGUgcmVkdWN0aW9uLiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYVxuICAgICAqIGBjYWxsYmFjayhlcnIsIHJlZHVjdGlvbilgIHdoaWNoIGFjY2VwdHMgYW4gb3B0aW9uYWwgZXJyb3IgYXMgaXRzIGZpcnN0XG4gICAgICogYXJndW1lbnQsIGFuZCB0aGUgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbiBhcyB0aGUgc2Vjb25kLiBJZiBhbiBlcnJvciBpc1xuICAgICAqIHBhc3NlZCB0byB0aGUgY2FsbGJhY2ssIHRoZSByZWR1Y3Rpb24gaXMgc3RvcHBlZCBhbmQgdGhlIG1haW4gYGNhbGxiYWNrYCBpc1xuICAgICAqIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci4gSW52b2tlZCB3aXRoIChtZW1vLCBpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgaXMgdGhlIHJlZHVjZWQgdmFsdWUuIEludm9rZWQgd2l0aFxuICAgICAqIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnJlZHVjZShbMSwyLDNdLCAwLCBmdW5jdGlvbihtZW1vLCBpdGVtLCBjYWxsYmFjaykge1xuICAgICAqICAgICAvLyBwb2ludGxlc3MgYXN5bmM6XG4gICAgICogICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCBtZW1vICsgaXRlbSlcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IGlzIG5vdyBlcXVhbCB0byB0aGUgbGFzdCB2YWx1ZSBvZiBtZW1vLCB3aGljaCBpcyA2XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVkdWNlKGFyciwgbWVtbywgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIGVhY2hPZlNlcmllcyhhcnIsIGZ1bmN0aW9uICh4LCBpLCBjYikge1xuICAgICAgICAgICAgaXRlcmF0ZWUobWVtbywgeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIG1lbW8gPSB2O1xuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2IoZXJyLCBtZW1vKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBvZiB0aGUgY29tcG9zZSBmdW5jdGlvbiB0aGF0IGlzIG1vcmUgbmF0dXJhbCB0byByZWFkLiBFYWNoIGZ1bmN0aW9uXG4gICAgICogY29uc3VtZXMgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgcHJldmlvdXMgZnVuY3Rpb24uIEl0IGlzIHRoZSBlcXVpdmFsZW50IG9mXG4gICAgICoge0BsaW5rIGFzeW5jLmNvbXBvc2V9IHdpdGggdGhlIGFyZ3VtZW50cyByZXZlcnNlZC5cbiAgICAgKlxuICAgICAqIEVhY2ggZnVuY3Rpb24gaXMgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIGNvbXBvc2VkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQG5hbWUgc2VxXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuY29tcG9zZVxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnMgLSB0aGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIFJlcXVpcmVzIGxvZGFzaCAob3IgdW5kZXJzY29yZSksIGV4cHJlc3MzIGFuZCBkcmVzZW5kZSdzIG9ybTIuXG4gICAgICogLy8gUGFydCBvZiBhbiBhcHAsIHRoYXQgZmV0Y2hlcyBjYXRzIG9mIHRoZSBsb2dnZWQgdXNlci5cbiAgICAgKiAvLyBUaGlzIGV4YW1wbGUgdXNlcyBgc2VxYCBmdW5jdGlvbiB0byBhdm9pZCBvdmVybmVzdGluZyBhbmQgZXJyb3JcbiAgICAgKiAvLyBoYW5kbGluZyBjbHV0dGVyLlxuICAgICAqIGFwcC5nZXQoJy9jYXRzJywgZnVuY3Rpb24ocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICAgKiAgICAgdmFyIFVzZXIgPSByZXF1ZXN0Lm1vZGVscy5Vc2VyO1xuICAgICAqICAgICBhc3luYy5zZXEoXG4gICAgICogICAgICAgICBfLmJpbmQoVXNlci5nZXQsIFVzZXIpLCAgLy8gJ1VzZXIuZ2V0JyBoYXMgc2lnbmF0dXJlIChpZCwgY2FsbGJhY2soZXJyLCBkYXRhKSlcbiAgICAgKiAgICAgICAgIGZ1bmN0aW9uKHVzZXIsIGZuKSB7XG4gICAgICogICAgICAgICAgICAgdXNlci5nZXRDYXRzKGZuKTsgICAgICAvLyAnZ2V0Q2F0cycgaGFzIHNpZ25hdHVyZSAoY2FsbGJhY2soZXJyLCBkYXRhKSlcbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgKShyZXEuc2Vzc2lvbi51c2VyX2lkLCBmdW5jdGlvbiAoZXJyLCBjYXRzKSB7XG4gICAgICogICAgICAgICBpZiAoZXJyKSB7XG4gICAgICogICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAqICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xuICAgICAqICAgICAgICAgfSBlbHNlIHtcbiAgICAgKiAgICAgICAgICAgICByZXNwb25zZS5qc29uKHsgc3RhdHVzOiAnb2snLCBtZXNzYWdlOiAnQ2F0cyBmb3VuZCcsIGRhdGE6IGNhdHMgfSk7XG4gICAgICogICAgICAgICB9XG4gICAgICogICAgIH0pO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNlcSgpIC8qIGZ1bmN0aW9ucy4uLiAqL3tcbiAgICAgICAgdmFyIGZucyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIHJlc3QoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGNiID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2IgPSBub29wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWR1Y2UoZm5zLCBhcmdzLCBmdW5jdGlvbiAobmV3YXJncywgZm4sIGNiKSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgbmV3YXJncy5jb25jYXQoW3Jlc3QoZnVuY3Rpb24gKGVyciwgbmV4dGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyLCBuZXh0YXJncyk7XG4gICAgICAgICAgICAgICAgfSldKSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgY2IuYXBwbHkodGhhdCwgW2Vycl0uY29uY2F0KHJlc3VsdHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgcmV2ZXJzZSA9IEFycmF5LnByb3RvdHlwZS5yZXZlcnNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHdoaWNoIGlzIGEgY29tcG9zaXRpb24gb2YgdGhlIHBhc3NlZCBhc3luY2hyb25vdXNcbiAgICAgKiBmdW5jdGlvbnMuIEVhY2ggZnVuY3Rpb24gY29uc3VtZXMgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24gdGhhdFxuICAgICAqIGZvbGxvd3MuIENvbXBvc2luZyBmdW5jdGlvbnMgYGYoKWAsIGBnKClgLCBhbmQgYGgoKWAgd291bGQgcHJvZHVjZSB0aGUgcmVzdWx0XG4gICAgICogb2YgYGYoZyhoKCkpKWAsIG9ubHkgdGhpcyB2ZXJzaW9uIHVzZXMgY2FsbGJhY2tzIHRvIG9idGFpbiB0aGUgcmV0dXJuIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEVhY2ggZnVuY3Rpb24gaXMgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIGNvbXBvc2VkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQG5hbWUgY29tcG9zZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zIC0gdGhlIGFzeW5jaHJvbm91cyBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBhZGQxKG4sIGNhbGxiYWNrKSB7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgbiArIDEpO1xuICAgICAqICAgICB9LCAxMCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gbXVsMyhuLCBjYWxsYmFjaykge1xuICAgICAqICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIG4gKiAzKTtcbiAgICAgKiAgICAgfSwgMTApO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHZhciBhZGQxbXVsMyA9IGFzeW5jLmNvbXBvc2UobXVsMywgYWRkMSk7XG4gICAgICogYWRkMW11bDMoNCwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBub3cgZXF1YWxzIDE1XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gY29tcG9zZSgpIC8qIGZ1bmN0aW9ucy4uLiAqL3tcbiAgICAgIHJldHVybiBzZXEuYXBwbHkobnVsbCwgcmV2ZXJzZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmNhdCQxKGVhY2hmbiwgYXJyLCBmbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBlYWNoZm4oYXJyLCBmdW5jdGlvbiAoeCwgaW5kZXgsIGNiKSB7XG4gICAgICAgICAgICBmbih4LCBmdW5jdGlvbiAoZXJyLCB5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh5IHx8IFtdKTtcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlrZSBgZWFjaGAsIGV4Y2VwdCB0aGF0IGl0IHBhc3NlcyB0aGUga2V5IChvciBpbmRleCkgYXMgdGhlIHNlY29uZCBhcmd1bWVudFxuICAgICAqIHRvIHRoZSBpdGVyYXRlZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hPZlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAYWxpYXMgZm9yRWFjaE9mXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2hcbiAgICAgKiBpdGVtIGluIGBjb2xsYC4gVGhlIGBrZXlgIGlzIHRoZSBpdGVtJ3Mga2V5LCBvciBpbmRleCBpbiB0aGUgY2FzZSBvZiBhblxuICAgICAqIGFycmF5LiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXRcbiAgICAgKiBoYXMgY29tcGxldGVkLiBJZiBubyBlcnJvciBoYXMgb2NjdXJyZWQsIHRoZSBjYWxsYmFjayBzaG91bGQgYmUgcnVuIHdpdGhvdXRcbiAgICAgKiBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBrZXksIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIEludm9rZWQgd2l0aCAoZXJyKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG9iaiA9IHtkZXY6IFwiL2Rldi5qc29uXCIsIHRlc3Q6IFwiL3Rlc3QuanNvblwiLCBwcm9kOiBcIi9wcm9kLmpzb25cIn07XG4gICAgICogdmFyIGNvbmZpZ3MgPSB7fTtcbiAgICAgKlxuICAgICAqIGFzeW5jLmZvckVhY2hPZihvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5yZWFkRmlsZShfX2Rpcm5hbWUgKyB2YWx1ZSwgXCJ1dGY4XCIsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgKiAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAqICAgICAgICAgdHJ5IHtcbiAgICAgKiAgICAgICAgICAgICBjb25maWdzW2tleV0gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAqICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAqICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgaWYgKGVycikgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICogICAgIC8vIGNvbmZpZ3MgaXMgbm93IGEgbWFwIG9mIEpTT04gZGF0YVxuICAgICAqICAgICBkb1NvbWV0aGluZ1dpdGgoY29uZmlncyk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGVhY2hPZiA9IGRvTGltaXQoZWFjaE9mTGltaXQsIEluZmluaXR5KTtcblxuICAgIGZ1bmN0aW9uIGRvUGFyYWxsZWwoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGVhY2hPZiwgb2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgYGl0ZXJhdGVlYCB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLCBjb25jYXRlbmF0aW5nIHRoZSByZXN1bHRzLiBSZXR1cm5zXG4gICAgICogdGhlIGNvbmNhdGVuYXRlZCBsaXN0LiBUaGUgYGl0ZXJhdGVlYHMgYXJlIGNhbGxlZCBpbiBwYXJhbGxlbCwgYW5kIHRoZVxuICAgICAqIHJlc3VsdHMgYXJlIGNvbmNhdGVuYXRlZCBhcyB0aGV5IHJldHVybi4gVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlXG4gICAgICogcmVzdWx0cyBhcnJheSB3aWxsIGJlIHJldHVybmVkIGluIHRoZSBvcmlnaW5hbCBvcmRlciBvZiBgY29sbGAgcGFzc2VkIHRvIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAbmFtZSBjb25jYXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdHMpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlXG4gICAgICogaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW4gYXJyYXkgb2YgcmVzdWx0cy5cbiAgICAgKiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2soZXJyKV0gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIGFuIGFycmF5XG4gICAgICogY29udGFpbmluZyB0aGUgY29uY2F0ZW5hdGVkIHJlc3VsdHMgb2YgdGhlIGBpdGVyYXRlZWAgZnVuY3Rpb24uIEludm9rZWQgd2l0aFxuICAgICAqIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5jb25jYXQoWydkaXIxJywnZGlyMicsJ2RpcjMnXSwgZnMucmVhZGRpciwgZnVuY3Rpb24oZXJyLCBmaWxlcykge1xuICAgICAqICAgICAvLyBmaWxlcyBpcyBub3cgYSBsaXN0IG9mIGZpbGVuYW1lcyB0aGF0IGV4aXN0IGluIHRoZSAzIGRpcmVjdG9yaWVzXG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGNvbmNhdCA9IGRvUGFyYWxsZWwoY29uY2F0JDEpO1xuXG4gICAgZnVuY3Rpb24gZG9TZXJpZXMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGZuKGVhY2hPZlNlcmllcywgb2JqLCBpdGVyYXRlZSwgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBjb25jYXRgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNvbmNhdFNlcmllc1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmNvbmNhdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHRzKWAgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZVxuICAgICAqIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFuIGFycmF5IG9mIHJlc3VsdHMuXG4gICAgICogSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrKGVycildIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0cyBpcyBhbiBhcnJheVxuICAgICAqIGNvbnRhaW5pbmcgdGhlIGNvbmNhdGVuYXRlZCByZXN1bHRzIG9mIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9uLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgY29uY2F0U2VyaWVzID0gZG9TZXJpZXMoY29uY2F0JDEpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBjYWxsZWQsIGNhbGxzLWJhY2sgd2l0aCB0aGUgdmFsdWVzIHByb3ZpZGVkLlxuICAgICAqIFVzZWZ1bCBhcyB0aGUgZmlyc3QgZnVuY3Rpb24gaW4gYSBgd2F0ZXJmYWxsYCwgb3IgZm9yIHBsdWdnaW5nIHZhbHVlcyBpbiB0b1xuICAgICAqIGBhdXRvYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGNvbnN0YW50XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmd1bWVudHMuLi4gLSBBbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBhdXRvbWF0aWNhbGx5IGludm9rZVxuICAgICAqIGNhbGxiYWNrIHdpdGguXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aGVuIGludm9rZWQsIGF1dG9tYXRpY2FsbHlcbiAgICAgKiBpbnZva2VzIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBwcmV2aW91cyBnaXZlbiBhcmd1bWVudHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICogICAgIGFzeW5jLmNvbnN0YW50KDQyKSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKHZhbHVlLCBuZXh0KSB7XG4gICAgICogICAgICAgICAvLyB2YWx1ZSA9PT0gNDJcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgLy8uLi5cbiAgICAgKiBdLCBjYWxsYmFjayk7XG4gICAgICpcbiAgICAgKiBhc3luYy53YXRlcmZhbGwoW1xuICAgICAqICAgICBhc3luYy5jb25zdGFudChmaWxlbmFtZSwgXCJ1dGY4XCIpLFxuICAgICAqICAgICBmcy5yZWFkRmlsZSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGZpbGVEYXRhLCBuZXh0KSB7XG4gICAgICogICAgICAgICAvLy4uLlxuICAgICAqICAgICB9XG4gICAgICogICAgIC8vLi4uXG4gICAgICogXSwgY2FsbGJhY2spO1xuICAgICAqXG4gICAgICogYXN5bmMuYXV0byh7XG4gICAgICogICAgIGhvc3RuYW1lOiBhc3luYy5jb25zdGFudChcImh0dHBzOi8vc2VydmVyLm5ldC9cIiksXG4gICAgICogICAgIHBvcnQ6IGZpbmRGcmVlUG9ydCxcbiAgICAgKiAgICAgbGF1bmNoU2VydmVyOiBbXCJob3N0bmFtZVwiLCBcInBvcnRcIiwgZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XG4gICAgICogICAgICAgICBzdGFydFNlcnZlcihvcHRpb25zLCBjYik7XG4gICAgICogICAgIH1dLFxuICAgICAqICAgICAvLy4uLlxuICAgICAqIH0sIGNhbGxiYWNrKTtcbiAgICAgKi9cbiAgICB2YXIgY29uc3RhbnQgPSByZXN0KGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbbnVsbF0uY29uY2F0KHZhbHVlcyk7XG4gICAgICAgIHJldHVybiBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIChpZ25vcmVkQXJncywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlVGVzdGVyKGVhY2hmbiwgY2hlY2ssIGdldFJlc3VsdCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFyciwgbGltaXQsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGdldFJlc3VsdChmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gd3JhcHBlZEl0ZXJhdGVlKHgsIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgaXRlcmF0ZWUoeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiID0gaXRlcmF0ZWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2sodikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBnZXRSZXN1bHQodHJ1ZSwgeCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiID0gaXRlcmF0ZWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgY2IgPSBjYiB8fCBub29wO1xuICAgICAgICAgICAgICAgIGVhY2hmbihhcnIsIGxpbWl0LCB3cmFwcGVkSXRlcmF0ZWUsIGRvbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYiA9IGl0ZXJhdGVlO1xuICAgICAgICAgICAgICAgIGNiID0gY2IgfHwgbm9vcDtcbiAgICAgICAgICAgICAgICBpdGVyYXRlZSA9IGxpbWl0O1xuICAgICAgICAgICAgICAgIGVhY2hmbihhcnIsIHdyYXBwZWRJdGVyYXRlZSwgZG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2ZpbmRHZXRSZXN1bHQodiwgeCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCB2YWx1ZSBpbiBgY29sbGAgdGhhdCBwYXNzZXMgYW4gYXN5bmMgdHJ1dGggdGVzdC4gVGhlXG4gICAgICogYGl0ZXJhdGVlYCBpcyBhcHBsaWVkIGluIHBhcmFsbGVsLCBtZWFuaW5nIHRoZSBmaXJzdCBpdGVyYXRlZSB0byByZXR1cm5cbiAgICAgKiBgdHJ1ZWAgd2lsbCBmaXJlIHRoZSBkZXRlY3QgYGNhbGxiYWNrYCB3aXRoIHRoYXQgcmVzdWx0LiBUaGF0IG1lYW5zIHRoZVxuICAgICAqIHJlc3VsdCBtaWdodCBub3QgYmUgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIG9yaWdpbmFsIGBjb2xsYCAoaW4gdGVybXMgb2Ygb3JkZXIpXG4gICAgICogdGhhdCBwYXNzZXMgdGhlIHRlc3QuXG5cbiAgICAgKiBJZiBvcmRlciB3aXRoaW4gdGhlIG9yaWdpbmFsIGBjb2xsYCBpcyBpbXBvcnRhbnQsIHRoZW4gbG9vayBhdFxuICAgICAqIGBkZXRlY3RTZXJpZXNgLlxuICAgICAqXG4gICAgICogQG5hbWUgZGV0ZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBmaW5kXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyBhbnlcbiAgICAgKiBpdGVyYXRlZSByZXR1cm5zIGB0cnVlYCwgb3IgYWZ0ZXIgYWxsIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLlxuICAgICAqIFJlc3VsdCB3aWxsIGJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBhcnJheSB0aGF0IHBhc3NlcyB0aGUgdHJ1dGggdGVzdFxuICAgICAqIChpdGVyYXRlZSkgb3IgdGhlIHZhbHVlIGB1bmRlZmluZWRgIGlmIG5vbmUgcGFzc2VkLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5kZXRlY3QoWydmaWxlMScsJ2ZpbGUyJywnZmlsZTMnXSwgZnVuY3Rpb24oZmlsZVBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLmFjY2VzcyhmaWxlUGF0aCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAhZXJyKVxuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgbm93IGVxdWFscyB0aGUgZmlyc3QgZmlsZSBpbiB0aGUgbGlzdCB0aGF0IGV4aXN0c1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBkZXRlY3QgPSBfY3JlYXRlVGVzdGVyKGVhY2hPZiwgaWRlbnRpdHksIF9maW5kR2V0UmVzdWx0KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBkZXRlY3RgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYVxuICAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBkZXRlY3RMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmRldGVjdFxuICAgICAqIEBhbGlhcyBmaW5kTGltaXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyBhbnlcbiAgICAgKiBpdGVyYXRlZSByZXR1cm5zIGB0cnVlYCwgb3IgYWZ0ZXIgYWxsIHRoZSBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLlxuICAgICAqIFJlc3VsdCB3aWxsIGJlIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBhcnJheSB0aGF0IHBhc3NlcyB0aGUgdHJ1dGggdGVzdFxuICAgICAqIChpdGVyYXRlZSkgb3IgdGhlIHZhbHVlIGB1bmRlZmluZWRgIGlmIG5vbmUgcGFzc2VkLiBJbnZva2VkIHdpdGhcbiAgICAgKiAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBkZXRlY3RMaW1pdCA9IF9jcmVhdGVUZXN0ZXIoZWFjaE9mTGltaXQsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZGV0ZWN0YCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBkZXRlY3RTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5kZXRlY3RcbiAgICAgKiBAYWxpYXMgZmluZFNlcmllc1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuXG4gICAgICogVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC5cbiAgICAgKiBSZXN1bHQgd2lsbCBiZSB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgYXJyYXkgdGhhdCBwYXNzZXMgdGhlIHRydXRoIHRlc3RcbiAgICAgKiAoaXRlcmF0ZWUpIG9yIHRoZSB2YWx1ZSBgdW5kZWZpbmVkYCBpZiBub25lIHBhc3NlZC4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgZGV0ZWN0U2VyaWVzID0gX2NyZWF0ZVRlc3RlcihlYWNoT2ZTZXJpZXMsIGlkZW50aXR5LCBfZmluZEdldFJlc3VsdCk7XG5cbiAgICBmdW5jdGlvbiBjb25zb2xlRnVuYyhuYW1lKSB7XG4gICAgICAgIHJldHVybiByZXN0KGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW3Jlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uc29sZVtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlFYWNoKGFyZ3MsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZVtuYW1lXSh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSldKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIHJlc3VsdCBvZiBhbiBgYXN5bmNgIGZ1bmN0aW9uIHRvIHRoZSBgY29uc29sZWAgdXNpbmcgYGNvbnNvbGUuZGlyYFxuICAgICAqIHRvIGRpc3BsYXkgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHJlc3VsdGluZyBvYmplY3QuIE9ubHkgd29ya3MgaW4gTm9kZS5qcyBvclxuICAgICAqIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBgY29uc29sZS5kaXJgIGFuZCBgY29uc29sZS5lcnJvcmAgKHN1Y2ggYXMgRkYgYW5kXG4gICAgICogQ2hyb21lKS4gSWYgbXVsdGlwbGUgYXJndW1lbnRzIGFyZSByZXR1cm5lZCBmcm9tIHRoZSBhc3luYyBmdW5jdGlvbixcbiAgICAgKiBgY29uc29sZS5kaXJgIGlzIGNhbGxlZCBvbiBlYWNoIGFyZ3VtZW50IGluIG9yZGVyLlxuICAgICAqXG4gICAgICogQG5hbWUgbG9nXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgZnVuY3Rpb24geW91IHdhbnQgdG8gZXZlbnR1YWxseSBhcHBseSBhbGxcbiAgICAgKiBhcmd1bWVudHMgdG8uXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmd1bWVudHMuLi4gLSBBbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBhcHBseSB0byB0aGUgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIC8vIGluIGEgbW9kdWxlXG4gICAgICogdmFyIGhlbGxvID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsIHtoZWxsbzogbmFtZX0pO1xuICAgICAqICAgICB9LCAxMDAwKTtcbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogLy8gaW4gdGhlIG5vZGUgcmVwbFxuICAgICAqIG5vZGU+IGFzeW5jLmRpcihoZWxsbywgJ3dvcmxkJyk7XG4gICAgICoge2hlbGxvOiAnd29ybGQnfVxuICAgICAqL1xuICAgIHZhciBkaXIgPSBjb25zb2xlRnVuYygnZGlyJyk7XG5cbiAgICAvKipcbiAgICAgKiBMaWtlIHtAbGluayBhc3luYy53aGlsc3R9LCBleGNlcHQgdGhlIGB0ZXN0YCBpcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gdGhhdFxuICAgICAqIGlzIHBhc3NlZCBhIGNhbGxiYWNrIGluIHRoZSBmb3JtIG9mIGBmdW5jdGlvbiAoZXJyLCB0cnV0aClgLiBJZiBlcnJvciBpc1xuICAgICAqIHBhc3NlZCB0byBgdGVzdGAgb3IgYGZuYCwgdGhlIG1haW4gY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlXG4gICAgICogdmFsdWUgb2YgdGhlIGVycm9yLlxuICAgICAqXG4gICAgICogQG5hbWUgZHVyaW5nXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMud2hpbHN0XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBhc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGJlZm9yZSBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgZWFjaCB0aW1lIGB0ZXN0YCBwYXNzZXMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHRoZSB0ZXN0XG4gICAgICogZnVuY3Rpb24gaGFzIGZhaWxlZCBhbmQgcmVwZWF0ZWQgZXhlY3V0aW9uIG9mIGBmbmAgaGFzIHN0b3BwZWQuIGBjYWxsYmFja2BcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhbiBlcnJvciBhbmQgYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZpbmFsIGBmbmAnc1xuICAgICAqIGNhbGxiYWNrLiBJbnZva2VkIHdpdGggKGVyciwgW3Jlc3VsdHNdKTtcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIGNvdW50ID0gMDtcbiAgICAgKlxuICAgICAqIGFzeW5jLmR1cmluZyhcbiAgICAgKiAgICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgY291bnQgPCA1KTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb3VudCsrO1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgICAgIC8vIDUgc2Vjb25kcyBoYXZlIHBhc3NlZFxuICAgICAqICAgICB9XG4gICAgICogKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkdXJpbmcodGVzdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIGNiID0gY2IgfHwgbm9vcDtcblxuICAgICAgICB2YXIgbmV4dCA9IHJlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChjaGVjayk7XG4gICAgICAgICAgICAgICAgdGVzdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKGVyciwgdHJ1dGgpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgaWYgKCF0cnV0aCkgcmV0dXJuIGNiKG51bGwpO1xuICAgICAgICAgICAgaXRlcmF0ZWUobmV4dCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGVzdChjaGVjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHBvc3QtY2hlY2sgdmVyc2lvbiBvZiB7QGxpbmsgYXN5bmMuZHVyaW5nfS4gVG8gcmVmbGVjdCB0aGUgZGlmZmVyZW5jZSBpblxuICAgICAqIHRoZSBvcmRlciBvZiBvcGVyYXRpb25zLCB0aGUgYXJndW1lbnRzIGB0ZXN0YCBhbmQgYGZuYCBhcmUgc3dpdGNoZWQuXG4gICAgICpcbiAgICAgKiBBbHNvIGEgdmVyc2lvbiBvZiB7QGxpbmsgYXN5bmMuZG9XaGlsc3R9IHdpdGggYXN5bmNocm9ub3VzIGB0ZXN0YCBmdW5jdGlvbi5cbiAgICAgKiBAbmFtZSBkb0R1cmluZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmR1cmluZ1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGVhY2ggdGltZSBgdGVzdGAgcGFzc2VzLlxuICAgICAqIFRoZSBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkIG9uY2UgaXQgaGFzXG4gICAgICogY29tcGxldGVkIHdpdGggYW4gb3B0aW9uYWwgYGVycmAgYXJndW1lbnQuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBhc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGJlZm9yZSBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCAoY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciB0aGUgdGVzdFxuICAgICAqIGZ1bmN0aW9uIGhhcyBmYWlsZWQgYW5kIHJlcGVhdGVkIGV4ZWN1dGlvbiBvZiBgZm5gIGhhcyBzdG9wcGVkLiBgY2FsbGJhY2tgXG4gICAgICogd2lsbCBiZSBwYXNzZWQgYW4gZXJyb3IgYW5kIGFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9EdXJpbmcoaXRlcmF0ZWUsIHRlc3QsIGNiKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG5cbiAgICAgICAgZHVyaW5nKGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgICAgICBpZiAoY2FsbHMrKyA8IDEpIHJldHVybiBuZXh0KG51bGwsIHRydWUpO1xuICAgICAgICAgICAgdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRlZSwgY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGVhdGVkbHkgY2FsbCBgZm5gLCB3aGlsZSBgdGVzdGAgcmV0dXJucyBgdHJ1ZWAuIENhbGxzIGBjYWxsYmFja2Agd2hlblxuICAgICAqIHN0b3BwZWQsIG9yIGFuIGVycm9yIG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHdoaWxzdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdCAtIHN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBiZWZvcmUgZWFjaFxuICAgICAqIGV4ZWN1dGlvbiBvZiBgZm5gLiBJbnZva2VkIHdpdGggKCkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBlYWNoIHRpbWUgYHRlc3RgIHBhc3Nlcy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgZmFpbGVkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgY291bnQgPSAwO1xuICAgICAqIGFzeW5jLndoaWxzdChcbiAgICAgKiAgICAgZnVuY3Rpb24oKSB7IHJldHVybiBjb3VudCA8IDU7IH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjb3VudCsrO1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBjb3VudCk7XG4gICAgICogICAgICAgICB9LCAxMDAwKTtcbiAgICAgKiAgICAgfSxcbiAgICAgKiAgICAgZnVuY3Rpb24gKGVyciwgbikge1xuICAgICAqICAgICAgICAgLy8gNSBzZWNvbmRzIGhhdmUgcGFzc2VkLCBuID0gNVxuICAgICAqICAgICB9XG4gICAgICogKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3aGlsc3QodGVzdCwgaXRlcmF0ZWUsIGNiKSB7XG4gICAgICAgIGNiID0gY2IgfHwgbm9vcDtcbiAgICAgICAgaWYgKCF0ZXN0KCkpIHJldHVybiBjYihudWxsKTtcbiAgICAgICAgdmFyIG5leHQgPSByZXN0KGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgaWYgKHRlc3QuYXBwbHkodGhpcywgYXJncykpIHJldHVybiBpdGVyYXRlZShuZXh0KTtcbiAgICAgICAgICAgIGNiLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXRlcmF0ZWUobmV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHBvc3QtY2hlY2sgdmVyc2lvbiBvZiB7QGxpbmsgYXN5bmMud2hpbHN0fS4gVG8gcmVmbGVjdCB0aGUgZGlmZmVyZW5jZSBpblxuICAgICAqIHRoZSBvcmRlciBvZiBvcGVyYXRpb25zLCB0aGUgYXJndW1lbnRzIGB0ZXN0YCBhbmQgYGZuYCBhcmUgc3dpdGNoZWQuXG4gICAgICpcbiAgICAgKiBgZG9XaGlsc3RgIGlzIHRvIGB3aGlsc3RgIGFzIGBkbyB3aGlsZWAgaXMgdG8gYHdoaWxlYCBpbiBwbGFpbiBKYXZhU2NyaXB0LlxuICAgICAqXG4gICAgICogQG5hbWUgZG9XaGlsc3RcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy53aGlsc3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBlYWNoIHRpbWUgYHRlc3RgIHBhc3Nlcy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZXN0IC0gc3luY2hyb25vdXMgdHJ1dGggdGVzdCB0byBwZXJmb3JtIGFmdGVyIGVhY2hcbiAgICAgKiBleGVjdXRpb24gb2YgYGZuYC4gSW52b2tlZCB3aXRoIEludm9rZWQgd2l0aCB0aGUgbm9uLWVycm9yIGNhbGxiYWNrIHJlc3VsdHNcbiAgICAgKiBvZiBgZm5gLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciB0aGUgdGVzdFxuICAgICAqIGZ1bmN0aW9uIGhhcyBmYWlsZWQgYW5kIHJlcGVhdGVkIGV4ZWN1dGlvbiBvZiBgZm5gIGhhcyBzdG9wcGVkLiBgY2FsbGJhY2tgXG4gICAgICogd2lsbCBiZSBwYXNzZWQgYW4gZXJyb3IgYW5kIGFueSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9XaGlsc3QoaXRlcmF0ZWUsIHRlc3QsIGNiKSB7XG4gICAgICAgIHZhciBjYWxscyA9IDA7XG4gICAgICAgIHJldHVybiB3aGlsc3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICsrY2FsbHMgPD0gMSB8fCB0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGl0ZXJhdGVlLCBjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlrZSB7QGxpbmsgYXN5bmMuZG9XaGlsc3R9LCBleGNlcHQgdGhlIGB0ZXN0YCBpcyBpbnZlcnRlZC4gTm90ZSB0aGVcbiAgICAgKiBhcmd1bWVudCBvcmRlcmluZyBkaWZmZXJzIGZyb20gYHVudGlsYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGRvVW50aWxcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5kb1doaWxzdFxuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGVhY2ggdGltZSBgdGVzdGAgZmFpbHMuXG4gICAgICogVGhlIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWQgb25jZSBpdCBoYXNcbiAgICAgKiBjb21wbGV0ZWQgd2l0aCBhbiBvcHRpb25hbCBgZXJyYCBhcmd1bWVudC4gSW52b2tlZCB3aXRoIChjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdCAtIHN5bmNocm9ub3VzIHRydXRoIHRlc3QgdG8gcGVyZm9ybSBhZnRlciBlYWNoXG4gICAgICogZXhlY3V0aW9uIG9mIGBmbmAuIEludm9rZWQgd2l0aCB0aGUgbm9uLWVycm9yIGNhbGxiYWNrIHJlc3VsdHMgb2YgYGZuYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgcGFzc2VkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvVW50aWwoaXRlcmF0ZWUsIHRlc3QsIGNiKSB7XG4gICAgICAgIHJldHVybiBkb1doaWxzdChpdGVyYXRlZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGNiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfd2l0aG91dEluZGV4KGl0ZXJhdGVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGVlKHZhbHVlLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZWFjaExpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZWFjaFxuICAgICAqIEBhbGlhcyBmb3JFYWNoTGltaXRcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWNpdG9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiBgY29sbGAuIFRoZVxuICAgICAqIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgYGNhbGxiYWNrYCBzaG91bGQgYmUgcnVuIHdpdGhvdXRcbiAgICAgKiBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIFRoZSBhcnJheSBpbmRleCBpcyBub3QgcGFzc2VkXG4gICAgICogdG8gdGhlIGl0ZXJhdGVlLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS4gSWYgeW91IG5lZWQgdGhlIGluZGV4LCB1c2VcbiAgICAgKiBgZWFjaE9mTGltaXRgLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVhY2hMaW1pdChhcnIsIGxpbWl0LCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgIHJldHVybiBfZWFjaE9mTGltaXQobGltaXQpKGFyciwgX3dpdGhvdXRJbmRleChpdGVyYXRlZSksIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBmdW5jdGlvbiBgaXRlcmF0ZWVgIHRvIGVhY2ggaXRlbSBpbiBgY29sbGAsIGluIHBhcmFsbGVsLlxuICAgICAqIFRoZSBgaXRlcmF0ZWVgIGlzIGNhbGxlZCB3aXRoIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdCwgYW5kIGEgY2FsbGJhY2sgZm9yIHdoZW5cbiAgICAgKiBpdCBoYXMgZmluaXNoZWQuIElmIHRoZSBgaXRlcmF0ZWVgIHBhc3NlcyBhbiBlcnJvciB0byBpdHMgYGNhbGxiYWNrYCwgdGhlXG4gICAgICogbWFpbiBgY2FsbGJhY2tgIChmb3IgdGhlIGBlYWNoYCBmdW5jdGlvbikgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlXG4gICAgICogZXJyb3IuXG4gICAgICpcbiAgICAgKiBOb3RlLCB0aGF0IHNpbmNlIHRoaXMgZnVuY3Rpb24gYXBwbGllcyBgaXRlcmF0ZWVgIHRvIGVhY2ggaXRlbSBpbiBwYXJhbGxlbCxcbiAgICAgKiB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIHdpbGwgY29tcGxldGUgaW4gb3JkZXIuXG4gICAgICpcbiAgICAgKiBAbmFtZSBlYWNoXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBmb3JFYWNoXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbVxuICAgICAqIGluIGBjb2xsYC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlXG4gICAgICogaXQgaGFzIGNvbXBsZXRlZC4gSWYgbm8gZXJyb3IgaGFzIG9jY3VycmVkLCB0aGUgYGNhbGxiYWNrYCBzaG91bGQgYmUgcnVuXG4gICAgICogd2l0aG91dCBhcmd1bWVudHMgb3Igd2l0aCBhbiBleHBsaWNpdCBgbnVsbGAgYXJndW1lbnQuIFRoZSBhcnJheSBpbmRleCBpcyBub3RcbiAgICAgKiBwYXNzZWQgdG8gdGhlIGl0ZXJhdGVlLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS4gSWYgeW91IG5lZWQgdGhlIGluZGV4LFxuICAgICAqIHVzZSBgZWFjaE9mYC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGxcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIEludm9rZWQgd2l0aCAoZXJyKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gYXNzdW1pbmcgb3BlbkZpbGVzIGlzIGFuIGFycmF5IG9mIGZpbGUgbmFtZXMgYW5kIHNhdmVGaWxlIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAvLyB0byBzYXZlIHRoZSBtb2RpZmllZCBjb250ZW50cyBvZiB0aGF0IGZpbGU6XG4gICAgICpcbiAgICAgKiBhc3luYy5lYWNoKG9wZW5GaWxlcywgc2F2ZUZpbGUsIGZ1bmN0aW9uKGVycil7XG4gICAgICogICAvLyBpZiBhbnkgb2YgdGhlIHNhdmVzIHByb2R1Y2VkIGFuIGVycm9yLCBlcnIgd291bGQgZXF1YWwgdGhhdCBlcnJvclxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gYXNzdW1pbmcgb3BlbkZpbGVzIGlzIGFuIGFycmF5IG9mIGZpbGUgbmFtZXNcbiAgICAgKiBhc3luYy5lYWNoKG9wZW5GaWxlcywgZnVuY3Rpb24oZmlsZSwgY2FsbGJhY2spIHtcbiAgICAgKlxuICAgICAqICAgICAvLyBQZXJmb3JtIG9wZXJhdGlvbiBvbiBmaWxlIGhlcmUuXG4gICAgICogICAgIGNvbnNvbGUubG9nKCdQcm9jZXNzaW5nIGZpbGUgJyArIGZpbGUpO1xuICAgICAqXG4gICAgICogICAgIGlmKCBmaWxlLmxlbmd0aCA+IDMyICkge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdUaGlzIGZpbGUgbmFtZSBpcyB0b28gbG9uZycpO1xuICAgICAqICAgICAgIGNhbGxiYWNrKCdGaWxlIG5hbWUgdG9vIGxvbmcnKTtcbiAgICAgKiAgICAgfSBlbHNlIHtcbiAgICAgKiAgICAgICAvLyBEbyB3b3JrIHRvIHByb2Nlc3MgZmlsZSBoZXJlXG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0ZpbGUgcHJvY2Vzc2VkJyk7XG4gICAgICogICAgICAgY2FsbGJhY2soKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAvLyBpZiBhbnkgb2YgdGhlIGZpbGUgcHJvY2Vzc2luZyBwcm9kdWNlZCBhbiBlcnJvciwgZXJyIHdvdWxkIGVxdWFsIHRoYXQgZXJyb3JcbiAgICAgKiAgICAgaWYoIGVyciApIHtcbiAgICAgKiAgICAgICAvLyBPbmUgb2YgdGhlIGl0ZXJhdGlvbnMgcHJvZHVjZWQgYW4gZXJyb3IuXG4gICAgICogICAgICAgLy8gQWxsIHByb2Nlc3Npbmcgd2lsbCBub3cgc3RvcC5cbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnQSBmaWxlIGZhaWxlZCB0byBwcm9jZXNzJyk7XG4gICAgICogICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0FsbCBmaWxlcyBoYXZlIGJlZW4gcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAqICAgICB9XG4gICAgICogfSk7XG4gICAgICovXG4gICAgdmFyIGVhY2ggPSBkb0xpbWl0KGVhY2hMaW1pdCwgSW5maW5pdHkpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYGVhY2hgIGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIGVhY2hTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5lYWNoXG4gICAgICogQGFsaWFzIGZvckVhY2hTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaFxuICAgICAqIGl0ZW0gaW4gYGNvbGxgLiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogb25jZSBpdCBoYXMgY29tcGxldGVkLiBJZiBubyBlcnJvciBoYXMgb2NjdXJyZWQsIHRoZSBgY2FsbGJhY2tgIHNob3VsZCBiZSBydW5cbiAgICAgKiB3aXRob3V0IGFyZ3VtZW50cyBvciB3aXRoIGFuIGV4cGxpY2l0IGBudWxsYCBhcmd1bWVudC4gVGhlIGFycmF5IGluZGV4IGlzXG4gICAgICogbm90IHBhc3NlZCB0byB0aGUgaXRlcmF0ZWUuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLiBJZiB5b3UgbmVlZCB0aGVcbiAgICAgKiBpbmRleCwgdXNlIGBlYWNoT2ZTZXJpZXNgLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbFxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gSW52b2tlZCB3aXRoIChlcnIpLlxuICAgICAqL1xuICAgIHZhciBlYWNoU2VyaWVzID0gZG9MaW1pdChlYWNoTGltaXQsIDEpO1xuXG4gICAgLyoqXG4gICAgICogV3JhcCBhbiBhc3luYyBmdW5jdGlvbiBhbmQgZW5zdXJlIGl0IGNhbGxzIGl0cyBjYWxsYmFjayBvbiBhIGxhdGVyIHRpY2sgb2ZcbiAgICAgKiB0aGUgZXZlbnQgbG9vcC4gIElmIHRoZSBmdW5jdGlvbiBhbHJlYWR5IGNhbGxzIGl0cyBjYWxsYmFjayBvbiBhIG5leHQgdGljayxcbiAgICAgKiBubyBleHRyYSBkZWZlcnJhbCBpcyBhZGRlZC4gVGhpcyBpcyB1c2VmdWwgZm9yIHByZXZlbnRpbmcgc3RhY2sgb3ZlcmZsb3dzXG4gICAgICogKGBSYW5nZUVycm9yOiBNYXhpbXVtIGNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZGApIGFuZCBnZW5lcmFsbHkga2VlcGluZ1xuICAgICAqIFtaYWxnb10oaHR0cDovL2Jsb2cuaXpzLm1lL3Bvc3QvNTkxNDI3NDIxNDMvZGVzaWduaW5nLWFwaXMtZm9yLWFzeW5jaHJvbnkpXG4gICAgICogY29udGFpbmVkLlxuICAgICAqXG4gICAgICogQG5hbWUgZW5zdXJlQXN5bmNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGFuIGFzeW5jIGZ1bmN0aW9uLCBvbmUgdGhhdCBleHBlY3RzIGEgbm9kZS1zdHlsZVxuICAgICAqIGNhbGxiYWNrIGFzIGl0cyBsYXN0IGFyZ3VtZW50LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBhIHdyYXBwZWQgZnVuY3Rpb24gd2l0aCB0aGUgZXhhY3Qgc2FtZSBjYWxsXG4gICAgICogc2lnbmF0dXJlIGFzIHRoZSBmdW5jdGlvbiBwYXNzZWQgaW4uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNvbWV0aW1lc0FzeW5jKGFyZywgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgaWYgKGNhY2hlW2FyZ10pIHtcbiAgICAgKiAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBjYWNoZVthcmddKTsgLy8gdGhpcyB3b3VsZCBiZSBzeW5jaHJvbm91cyEhXG4gICAgICogICAgIH0gZWxzZSB7XG4gICAgICogICAgICAgICBkb1NvbWVJTyhhcmcsIGNhbGxiYWNrKTsgLy8gdGhpcyBJTyB3b3VsZCBiZSBhc3luY2hyb25vdXNcbiAgICAgKiAgICAgfVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIC8vIHRoaXMgaGFzIGEgcmlzayBvZiBzdGFjayBvdmVyZmxvd3MgaWYgbWFueSByZXN1bHRzIGFyZSBjYWNoZWQgaW4gYSByb3dcbiAgICAgKiBhc3luYy5tYXBTZXJpZXMoYXJncywgc29tZXRpbWVzQXN5bmMsIGRvbmUpO1xuICAgICAqXG4gICAgICogLy8gdGhpcyB3aWxsIGRlZmVyIHNvbWV0aW1lc0FzeW5jJ3MgY2FsbGJhY2sgaWYgbmVjZXNzYXJ5LFxuICAgICAqIC8vIHByZXZlbnRpbmcgc3RhY2sgb3ZlcmZsb3dzXG4gICAgICogYXN5bmMubWFwU2VyaWVzKGFyZ3MsIGFzeW5jLmVuc3VyZUFzeW5jKHNvbWV0aW1lc0FzeW5jKSwgZG9uZSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZW5zdXJlQXN5bmMoZm4pIHtcbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gKGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3luYyA9IHRydWU7XG4gICAgICAgICAgICBhcmdzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbm5lckFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgaWYgKHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgaW5uZXJBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgc3luYyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3RJZCh2KSB7XG4gICAgICAgIHJldHVybiAhdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZXZlcnlgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZXZlcnlMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmV2ZXJ5XG4gICAgICogQGFsaWFzIGFsbExpbWl0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiB0aGVcbiAgICAgKiBjb2xsZWN0aW9uIGluIHBhcmFsbGVsLiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJ1dGhWYWx1ZSlgXG4gICAgICogd2hpY2ggbXVzdCBiZSBjYWxsZWQgd2l0aCBhICBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZFxuICAgICAqIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIFJlc3VsdCB3aWxsIGJlIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYFxuICAgICAqIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luYyB0ZXN0cy4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICovXG4gICAgdmFyIGV2ZXJ5TGltaXQgPSBfY3JlYXRlVGVzdGVyKGVhY2hPZkxpbWl0LCBub3RJZCwgbm90SWQpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgZXZlcnkgZWxlbWVudCBpbiBgY29sbGAgc2F0aXNmaWVzIGFuIGFzeW5jIHRlc3QuIElmIGFueVxuICAgICAqIGl0ZXJhdGVlIGNhbGwgcmV0dXJucyBgZmFsc2VgLCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIGV2ZXJ5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBhbGxcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYFxuICAgICAqIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdpdGggYSAgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWRcbiAgICAgKiB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmMgdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5ldmVyeShbJ2ZpbGUxJywnZmlsZTInLCdmaWxlMyddLCBmdW5jdGlvbihmaWxlUGF0aCwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZnMuYWNjZXNzKGZpbGVQYXRoLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICFlcnIpXG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGlmIHJlc3VsdCBpcyB0cnVlIHRoZW4gZXZlcnkgZmlsZSBleGlzdHNcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgZXZlcnkgPSBkb0xpbWl0KGV2ZXJ5TGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBldmVyeWAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgZXZlcnlTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5ldmVyeVxuICAgICAqIEBhbGlhcyBhbGxTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYFxuICAgICAqIHdoaWNoIG11c3QgYmUgY2FsbGVkIHdpdGggYSAgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWRcbiAgICAgKiB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKiBkZXBlbmRpbmcgb24gdGhlIHZhbHVlcyBvZiB0aGUgYXN5bmMgdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBldmVyeVNlcmllcyA9IGRvTGltaXQoZXZlcnlMaW1pdCwgMSk7XG5cbiAgICBmdW5jdGlvbiBfZmlsdGVyKGVhY2hmbiwgYXJyLCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZWFjaGZuKGFyciwgZnVuY3Rpb24gKHgsIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaXRlcmF0ZWUoeCwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgaW5kZXg6IGluZGV4LCB2YWx1ZTogeCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgYXJyYXlNYXAocmVzdWx0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleDtcbiAgICAgICAgICAgICAgICB9KSwgYmFzZVByb3BlcnR5KCd2YWx1ZScpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBmaWx0ZXJgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYVxuICAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBmaWx0ZXJMaW1pdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLmZpbHRlclxuICAgICAqIEBhbGlhcyBzZWxlY3RMaW1pdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBgaXRlcmF0ZWVgIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqL1xuICAgIHZhciBmaWx0ZXJMaW1pdCA9IGRvUGFyYWxsZWxMaW1pdChfZmlsdGVyKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgYWxsIHRoZSB2YWx1ZXMgaW4gYGNvbGxgIHdoaWNoIHBhc3MgYW4gYXN5bmMgdHJ1dGhcbiAgICAgKiB0ZXN0LiBUaGlzIG9wZXJhdGlvbiBpcyBwZXJmb3JtZWQgaW4gcGFyYWxsZWwsIGJ1dCB0aGUgcmVzdWx0cyBhcnJheSB3aWxsIGJlXG4gICAgICogaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIG9yaWdpbmFsLlxuICAgICAqXG4gICAgICogQG5hbWUgZmlsdGVyXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBhbGlhcyBzZWxlY3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBgaXRlcmF0ZWVgIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCwgd2hpY2ggbXVzdCBiZSBjYWxsZWRcbiAgICAgKiB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aCAoaXRlbSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5maWx0ZXIoWydmaWxlMScsJ2ZpbGUyJywnZmlsZTMnXSwgZnVuY3Rpb24oZmlsZVBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLmFjY2VzcyhmaWxlUGF0aCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAhZXJyKVxuICAgICAqICAgICB9KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBub3cgZXF1YWxzIGFuIGFycmF5IG9mIHRoZSBleGlzdGluZyBmaWxlc1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBmaWx0ZXIgPSBkb0xpbWl0KGZpbHRlckxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgZmlsdGVyYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBmaWx0ZXJTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5maWx0ZXJcbiAgICAgKiBAYWxpYXMgc2VsZWN0U2VyaWVzXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKVxuICAgICAqL1xuICAgIHZhciBmaWx0ZXJTZXJpZXMgPSBkb0xpbWl0KGZpbHRlckxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxzIHRoZSBhc3luY2hyb25vdXMgZnVuY3Rpb24gYGZuYCB3aXRoIGEgY2FsbGJhY2sgcGFyYW1ldGVyIHRoYXQgYWxsb3dzIGl0XG4gICAgICogdG8gY2FsbCBpdHNlbGYgYWdhaW4sIGluIHNlcmllcywgaW5kZWZpbml0ZWx5LlxuXG4gICAgICogSWYgYW4gZXJyb3IgaXMgcGFzc2VkIHRvIHRoZVxuICAgICAqIGNhbGxiYWNrIHRoZW4gYGVycmJhY2tgIGlzIGNhbGxlZCB3aXRoIHRoZSBlcnJvciwgYW5kIGV4ZWN1dGlvbiBzdG9wcyxcbiAgICAgKiBvdGhlcndpc2UgaXQgd2lsbCBuZXZlciBiZSBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBmb3JldmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGEgZnVuY3Rpb24gdG8gY2FsbCByZXBlYXRlZGx5LiBJbnZva2VkIHdpdGggKG5leHQpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlcnJiYWNrXSAtIHdoZW4gYGZuYCBwYXNzZXMgYW4gZXJyb3IgdG8gaXQncyBjYWxsYmFjayxcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkLCBhbmQgZXhlY3V0aW9uIHN0b3BzLiBJbnZva2VkIHdpdGggKGVycikuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLmZvcmV2ZXIoXG4gICAgICogICAgIGZ1bmN0aW9uKG5leHQpIHtcbiAgICAgKiAgICAgICAgIC8vIG5leHQgaXMgc3VpdGFibGUgZm9yIHBhc3NpbmcgdG8gdGhpbmdzIHRoYXQgbmVlZCBhIGNhbGxiYWNrKGVyciBbLCB3aGF0ZXZlcl0pO1xuICAgICAqICAgICAgICAgLy8gaXQgd2lsbCByZXN1bHQgaW4gdGhpcyBmdW5jdGlvbiBiZWluZyBjYWxsZWQgYWdhaW4uXG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgLy8gaWYgbmV4dCBpcyBjYWxsZWQgd2l0aCBhIHZhbHVlIGluIGl0cyBmaXJzdCBwYXJhbWV0ZXIsIGl0IHdpbGwgYXBwZWFyXG4gICAgICogICAgICAgICAvLyBpbiBoZXJlIGFzICdlcnInLCBhbmQgZXhlY3V0aW9uIHdpbGwgc3RvcC5cbiAgICAgKiAgICAgfVxuICAgICAqICk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9yZXZlcihmbiwgY2IpIHtcbiAgICAgICAgdmFyIGRvbmUgPSBvbmx5T25jZShjYiB8fCBub29wKTtcbiAgICAgICAgdmFyIHRhc2sgPSBlbnN1cmVBc3luYyhmbik7XG5cbiAgICAgICAgZnVuY3Rpb24gbmV4dChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICB0YXNrKG5leHQpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGl0ZXJhdG9yIGZ1bmN0aW9uIHdoaWNoIGNhbGxzIHRoZSBuZXh0IGZ1bmN0aW9uIGluIHRoZSBgdGFza3NgXG4gICAgICogYXJyYXksIHJldHVybmluZyBhIGNvbnRpbnVhdGlvbiB0byBjYWxsIHRoZSBuZXh0IG9uZSBhZnRlciB0aGF0LiBJdCdzIGFsc29cbiAgICAgKiBwb3NzaWJsZSB0byDigJxwZWVr4oCdIGF0IHRoZSBuZXh0IGl0ZXJhdG9yIHdpdGggYGl0ZXJhdG9yLm5leHQoKWAuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgYGFzeW5jYCBtb2R1bGUsIGJ1dCBjYW4gYmUgdXNlZnVsXG4gICAgICogd2hlbiB5b3Ugd2FudCB0byBtYW51YWxseSBjb250cm9sIHRoZSBmbG93IG9mIGZ1bmN0aW9ucyBpbiBzZXJpZXMuXG4gICAgICpcbiAgICAgKiBAbmFtZSBpdGVyYXRvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFza3MgLSBBbiBhcnJheSBvZiBmdW5jdGlvbnMgdG8gcnVuLlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXh0IGZ1bmN0aW9uIHRvIHJ1biBpbiB0aGUgc2VyaWVzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgaXRlcmF0b3IgPSBhc3luYy5pdGVyYXRvcihbXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyBzeXMucCgnb25lJyk7IH0sXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyBzeXMucCgndHdvJyk7IH0sXG4gICAgICogICAgIGZ1bmN0aW9uKCkgeyBzeXMucCgndGhyZWUnKTsgfVxuICAgICAqIF0pO1xuICAgICAqXG4gICAgICogbm9kZT4gdmFyIGl0ZXJhdG9yMiA9IGl0ZXJhdG9yKCk7XG4gICAgICogJ29uZSdcbiAgICAgKiBub2RlPiB2YXIgaXRlcmF0b3IzID0gaXRlcmF0b3IyKCk7XG4gICAgICogJ3R3bydcbiAgICAgKiBub2RlPiBpdGVyYXRvcjMoKTtcbiAgICAgKiAndGhyZWUnXG4gICAgICogbm9kZT4gdmFyIG5leHRmbiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICogbm9kZT4gbmV4dGZuKCk7XG4gICAgICogJ3RocmVlJ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGl0ZXJhdG9yJDEgKHRhc2tzKSB7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VDYWxsYmFjayhpbmRleCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZm4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0YXNrc1tpbmRleF0uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZuLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgdGFza3MubGVuZ3RoIC0gMSA/IG1ha2VDYWxsYmFjayhpbmRleCArIDEpIDogbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ha2VDYWxsYmFjaygwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSByZXN1bHQgb2YgYW4gYGFzeW5jYCBmdW5jdGlvbiB0byB0aGUgYGNvbnNvbGVgLiBPbmx5IHdvcmtzIGluXG4gICAgICogTm9kZS5qcyBvciBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgYGNvbnNvbGUubG9nYCBhbmQgYGNvbnNvbGUuZXJyb3JgIChzdWNoXG4gICAgICogYXMgRkYgYW5kIENocm9tZSkuIElmIG11bHRpcGxlIGFyZ3VtZW50cyBhcmUgcmV0dXJuZWQgZnJvbSB0aGUgYXN5bmNcbiAgICAgKiBmdW5jdGlvbiwgYGNvbnNvbGUubG9nYCBpcyBjYWxsZWQgb24gZWFjaCBhcmd1bWVudCBpbiBvcmRlci5cbiAgICAgKlxuICAgICAqIEBuYW1lIGxvZ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIC0gVGhlIGZ1bmN0aW9uIHlvdSB3YW50IHRvIGV2ZW50dWFsbHkgYXBwbHkgYWxsXG4gICAgICogYXJndW1lbnRzIHRvLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJndW1lbnRzLi4uIC0gQW55IG51bWJlciBvZiBhcmd1bWVudHMgdG8gYXBwbHkgdG8gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBpbiBhIG1vZHVsZVxuICAgICAqIHZhciBoZWxsbyA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnaGVsbG8gJyArIG5hbWUpO1xuICAgICAqICAgICB9LCAxMDAwKTtcbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogLy8gaW4gdGhlIG5vZGUgcmVwbFxuICAgICAqIG5vZGU+IGFzeW5jLmxvZyhoZWxsbywgJ3dvcmxkJyk7XG4gICAgICogJ2hlbGxvIHdvcmxkJ1xuICAgICAqL1xuICAgIHZhciBsb2cgPSBjb25zb2xlRnVuYygnbG9nJyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgbWFwVmFsdWVzYCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgbWFwVmFsdWVzTGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tYXBWYWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCB2YWx1ZSBpbiBgb2JqYC5cbiAgICAgKiBUaGUgaXRlcmF0ZWUgaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgdHJhbnNmb3JtZWQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYVxuICAgICAqIHRyYW5zZm9ybWVkIHZhbHVlLiBJbnZva2VkIHdpdGggKHZhbHVlLCBrZXksIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYGl0ZXJhdGVlYFxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdCBpcyBhbiBvYmplY3Qgb2YgdGhlXG4gICAgICogdHJhbnNmb3JtZWQgdmFsdWVzIGZyb20gdGhlIGBvYmpgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBWYWx1ZXNMaW1pdChvYmosIGxpbWl0LCBpdGVyYXRlZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xuICAgICAgICBlYWNoT2ZMaW1pdChvYmosIGxpbWl0LCBmdW5jdGlvbiAodmFsLCBrZXksIG5leHQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGVlKHZhbCwga2V5LCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gbmV4dChlcnIpO1xuICAgICAgICAgICAgICAgIG5ld09ialtrZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG5ld09iaik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgcmVsYXRpdmUgb2YgYG1hcGAsIGRlc2lnbmVkIGZvciB1c2Ugd2l0aCBvYmplY3RzLlxuICAgICAqXG4gICAgICogUHJvZHVjZXMgYSBuZXcgT2JqZWN0IGJ5IG1hcHBpbmcgZWFjaCB2YWx1ZSBvZiBgb2JqYCB0aHJvdWdoIHRoZSBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb24uIFRoZSBgaXRlcmF0ZWVgIGlzIGNhbGxlZCBlYWNoIGB2YWx1ZWAgYW5kIGBrZXlgIGZyb20gYG9iamAgYW5kIGFcbiAgICAgKiBjYWxsYmFjayBmb3Igd2hlbiBpdCBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZy4gRWFjaCBvZiB0aGVzZSBjYWxsYmFja3MgdGFrZXNcbiAgICAgKiB0d28gYXJndW1lbnRzOiBhbiBgZXJyb3JgLCBhbmQgdGhlIHRyYW5zZm9ybWVkIGl0ZW0gZnJvbSBgb2JqYC4gSWYgYGl0ZXJhdGVlYFxuICAgICAqIHBhc3NlcyBhbiBlcnJvciB0byBpdHMgY2FsbGJhY2ssIHRoZSBtYWluIGBjYWxsYmFja2AgKGZvciB0aGUgYG1hcFZhbHVlc2BcbiAgICAgKiBmdW5jdGlvbikgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqXG4gICAgICogTm90ZSwgdGhlIG9yZGVyIG9mIHRoZSBrZXlzIGluIHRoZSByZXN1bHQgaXMgbm90IGd1YXJhbnRlZWQuICBUaGUga2V5cyB3aWxsXG4gICAgICogYmUgcm91Z2hseSBpbiB0aGUgb3JkZXIgdGhleSBjb21wbGV0ZSwgKGJ1dCB0aGlzIGlzIHZlcnkgZW5naW5lLXNwZWNpZmljKVxuICAgICAqXG4gICAgICogQG5hbWUgbWFwVmFsdWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggdmFsdWUgYW5kIGtleSBpblxuICAgICAqIGBjb2xsYC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRyYW5zZm9ybWVkKWAgd2hpY2ggbXVzdCBiZVxuICAgICAqIGNhbGxlZCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFcbiAgICAgKiB0cmFuc2Zvcm1lZCB2YWx1ZS4gSW52b2tlZCB3aXRoICh2YWx1ZSwga2V5LCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGBpdGVyYXRlZWBcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBSZXN1bHRzIGlzIGFuIGFycmF5IG9mIHRoZVxuICAgICAqIHRyYW5zZm9ybWVkIGl0ZW1zIGZyb20gdGhlIGBvYmpgLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMubWFwVmFsdWVzKHtcbiAgICAgKiAgICAgZjE6ICdmaWxlMScsXG4gICAgICogICAgIGYyOiAnZmlsZTInLFxuICAgICAqICAgICBmMzogJ2ZpbGUzJ1xuICAgICAqIH0sIGZzLnN0YXQsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdHMgaXMgbm93IGEgbWFwIG9mIHN0YXRzIGZvciBlYWNoIGZpbGUsIGUuZy5cbiAgICAgKiAgICAgLy8ge1xuICAgICAqICAgICAvLyAgICAgZjE6IFtzdGF0cyBmb3IgZmlsZTFdLFxuICAgICAqICAgICAvLyAgICAgZjI6IFtzdGF0cyBmb3IgZmlsZTJdLFxuICAgICAqICAgICAvLyAgICAgZjM6IFtzdGF0cyBmb3IgZmlsZTNdXG4gICAgICogICAgIC8vIH1cbiAgICAgKiB9KTtcbiAgICAgKi9cblxuICAgIHZhciBtYXBWYWx1ZXMgPSBkb0xpbWl0KG1hcFZhbHVlc0xpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgbWFwVmFsdWVzYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBtYXBWYWx1ZXNTZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tYXBWYWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHZhbHVlIGluIGBvYmpgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cmFuc2Zvcm1lZClgIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogb25jZSBpdCBoYXMgY29tcGxldGVkIHdpdGggYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhXG4gICAgICogdHJhbnNmb3JtZWQgdmFsdWUuIEludm9rZWQgd2l0aCAodmFsdWUsIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBgaXRlcmF0ZWVgXG4gICAgICogZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQsIG9yIGFuIGVycm9yIG9jY3Vycy4gUmVzdWx0IGlzIGFuIG9iamVjdCBvZiB0aGVcbiAgICAgKiB0cmFuc2Zvcm1lZCB2YWx1ZXMgZnJvbSB0aGUgYG9iamAuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqL1xuICAgIHZhciBtYXBWYWx1ZXNTZXJpZXMgPSBkb0xpbWl0KG1hcFZhbHVlc0xpbWl0LCAxKTtcblxuICAgIGZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICAgICAgICByZXR1cm4ga2V5IGluIG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWNoZXMgdGhlIHJlc3VsdHMgb2YgYW4gYGFzeW5jYCBmdW5jdGlvbi4gV2hlbiBjcmVhdGluZyBhIGhhc2ggdG8gc3RvcmVcbiAgICAgKiBmdW5jdGlvbiByZXN1bHRzIGFnYWluc3QsIHRoZSBjYWxsYmFjayBpcyBvbWl0dGVkIGZyb20gdGhlIGhhc2ggYW5kIGFuXG4gICAgICogb3B0aW9uYWwgaGFzaCBmdW5jdGlvbiBjYW4gYmUgdXNlZC5cbiAgICAgKlxuICAgICAqIElmIG5vIGhhc2ggZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCB0aGUgZmlyc3QgYXJndW1lbnQgaXMgdXNlZCBhcyBhIGhhc2gga2V5LFxuICAgICAqIHdoaWNoIG1heSB3b3JrIHJlYXNvbmFibHkgaWYgaXQgaXMgYSBzdHJpbmcgb3IgYSBkYXRhIHR5cGUgdGhhdCBjb252ZXJ0cyB0byBhXG4gICAgICogZGlzdGluY3Qgc3RyaW5nLiBOb3RlIHRoYXQgb2JqZWN0cyBhbmQgYXJyYXlzIHdpbGwgbm90IGJlaGF2ZSByZWFzb25hYmx5LlxuICAgICAqIE5laXRoZXIgd2lsbCBjYXNlcyB3aGVyZSB0aGUgb3RoZXIgYXJndW1lbnRzIGFyZSBzaWduaWZpY2FudC4gSW4gc3VjaCBjYXNlcyxcbiAgICAgKiBzcGVjaWZ5IHlvdXIgb3duIGhhc2ggZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBUaGUgY2FjaGUgb2YgcmVzdWx0cyBpcyBleHBvc2VkIGFzIHRoZSBgbWVtb2AgcHJvcGVydHkgb2YgdGhlIGZ1bmN0aW9uXG4gICAgICogcmV0dXJuZWQgYnkgYG1lbW9pemVgLlxuICAgICAqXG4gICAgICogQG5hbWUgbWVtb2l6ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIHByb3h5IGFuZCBjYWNoZSByZXN1bHRzIGZyb20uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzaGVyIC0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gZm9yIGdlbmVyYXRpbmcgYSBjdXN0b20gaGFzaFxuICAgICAqIGZvciBzdG9yaW5nIHJlc3VsdHMuIEl0IGhhcyBhbGwgdGhlIGFyZ3VtZW50cyBhcHBsaWVkIHRvIGl0IGFwYXJ0IGZyb20gdGhlXG4gICAgICogY2FsbGJhY2ssIGFuZCBtdXN0IGJlIHN5bmNocm9ub3VzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiB2YXIgc2xvd19mbiA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZ1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAqIH07XG4gICAgICogdmFyIGZuID0gYXN5bmMubWVtb2l6ZShzbG93X2ZuKTtcbiAgICAgKlxuICAgICAqIC8vIGZuIGNhbiBub3cgYmUgdXNlZCBhcyBpZiBpdCB3ZXJlIHNsb3dfZm5cbiAgICAgKiBmbignc29tZSBuYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICogICAgIC8vIGNhbGxiYWNrXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gbWVtb2l6ZSQxKGZuLCBoYXNoZXIpIHtcbiAgICAgICAgdmFyIG1lbW8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIgcXVldWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgaGFzaGVyID0gaGFzaGVyIHx8IGlkZW50aXR5O1xuICAgICAgICB2YXIgbWVtb2l6ZWQgPSBpbml0aWFsUGFyYW1zKGZ1bmN0aW9uIG1lbW9pemVkKGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gaGFzaGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKGhhcyhtZW1vLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBtZW1vW2tleV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXMocXVldWVzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcXVldWVzW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1ZXVlc1trZXldID0gW2NhbGxiYWNrXTtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzLmNvbmNhdChbcmVzdChmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgICAgICAgICBtZW1vW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcSA9IHF1ZXVlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcXVldWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHFbaV0uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1lbW9pemVkLm1lbW8gPSBtZW1vO1xuICAgICAgICBtZW1vaXplZC51bm1lbW9pemVkID0gZm47XG4gICAgICAgIHJldHVybiBtZW1vaXplZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBgY2FsbGJhY2tgIG9uIGEgbGF0ZXIgbG9vcCBhcm91bmQgdGhlIGV2ZW50IGxvb3AuIEluIE5vZGUuanMgdGhpcyBqdXN0XG4gICAgICogY2FsbHMgYHNldEltbWVkaWF0ZWAuICBJbiB0aGUgYnJvd3NlciBpdCB3aWxsIHVzZSBgc2V0SW1tZWRpYXRlYCBpZlxuICAgICAqIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKWAsIHdoaWNoIG1lYW5zIG90aGVyIGhpZ2hlclxuICAgICAqIHByaW9yaXR5IGV2ZW50cyBtYXkgcHJlY2VkZSB0aGUgZXhlY3V0aW9uIG9mIGBjYWxsYmFja2AuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHVzZWQgaW50ZXJuYWxseSBmb3IgYnJvd3Nlci1jb21wYXRpYmlsaXR5IHB1cnBvc2VzLlxuICAgICAqXG4gICAgICogQG5hbWUgbmV4dFRpY2tcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIHNldEltbWVkaWF0ZVxuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBhIGxhdGVyIGxvb3AgYXJvdW5kXG4gICAgICogdGhlIGV2ZW50IGxvb3AuIEludm9rZWQgd2l0aCAoYXJncy4uLikuXG4gICAgICogQHBhcmFtIHsuLi4qfSBhcmdzLi4uIC0gYW55IG51bWJlciBvZiBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZVxuICAgICAqIGNhbGxiYWNrIG9uIHRoZSBuZXh0IHRpY2suXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBjYWxsX29yZGVyID0gW107XG4gICAgICogYXN5bmMubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICogICAgIGNhbGxfb3JkZXIucHVzaCgndHdvJyk7XG4gICAgICogICAgIC8vIGNhbGxfb3JkZXIgbm93IGVxdWFscyBbJ29uZScsJ3R3byddXG4gICAgICogfSk7XG4gICAgICogY2FsbF9vcmRlci5wdXNoKCdvbmUnKTtcbiAgICAgKlxuICAgICAqIGFzeW5jLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAqICAgICAvLyBhLCBiLCBhbmQgYyBlcXVhbCAxLCAyLCBhbmQgM1xuICAgICAqIH0sIDEsIDIsIDMpO1xuICAgICAqL1xuICAgIHZhciBfZGVmZXIkMTtcblxuICAgIGlmIChoYXNOZXh0VGljaykge1xuICAgICAgICBfZGVmZXIkMSA9IHByb2Nlc3MubmV4dFRpY2s7XG4gICAgfSBlbHNlIGlmIChoYXNTZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgX2RlZmVyJDEgPSBzZXRJbW1lZGlhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2RlZmVyJDEgPSBmYWxsYmFjaztcbiAgICB9XG5cbiAgICB2YXIgbmV4dFRpY2sgPSB3cmFwKF9kZWZlciQxKTtcblxuICAgIGZ1bmN0aW9uIF9wYXJhbGxlbChlYWNoZm4sIHRhc2tzLCBjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG4gICAgICAgIHZhciByZXN1bHRzID0gaXNBcnJheUxpa2UodGFza3MpID8gW10gOiB7fTtcblxuICAgICAgICBlYWNoZm4odGFza3MsIGZ1bmN0aW9uICh0YXNrLCBrZXksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0YXNrKHJlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzW2tleV0gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBwYXJhbGxlbGAgYnV0IHJ1bnMgYSBtYXhpbXVtIG9mIGBsaW1pdGAgYXN5bmMgb3BlcmF0aW9ucyBhdCBhXG4gICAgICogdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHBhcmFsbGVsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucGFyYWxsZWxcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheXxDb2xsZWN0aW9ufSB0YXNrcyAtIEEgY29sbGVjdGlvbiBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBydW4uXG4gICAgICogRWFjaCBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCB3aGljaCBpdCBtdXN0IGNhbGwgb25cbiAgICAgKiBjb21wbGV0aW9uIHdpdGggYW4gZXJyb3IgYGVycmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbiBvcHRpb25hbCBgcmVzdWx0YFxuICAgICAqIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gcnVuIG9uY2UgYWxsIHRoZVxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuIFRoaXMgZnVuY3Rpb24gZ2V0cyBhIHJlc3VsdHMgYXJyYXlcbiAgICAgKiAob3Igb2JqZWN0KSBjb250YWluaW5nIGFsbCB0aGUgcmVzdWx0IGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIHRhc2sgY2FsbGJhY2tzLlxuICAgICAqIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYXJhbGxlbExpbWl0KHRhc2tzLCBsaW1pdCwgY2IpIHtcbiAgICAgIHJldHVybiBfcGFyYWxsZWwoX2VhY2hPZkxpbWl0KGxpbWl0KSwgdGFza3MsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW4gdGhlIGB0YXNrc2AgY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgaW4gcGFyYWxsZWwsIHdpdGhvdXQgd2FpdGluZyB1bnRpbFxuICAgICAqIHRoZSBwcmV2aW91cyBmdW5jdGlvbiBoYXMgY29tcGxldGVkLiBJZiBhbnkgb2YgdGhlIGZ1bmN0aW9ucyBwYXNzIGFuIGVycm9yIHRvXG4gICAgICogaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSBvZiB0aGVcbiAgICAgKiBlcnJvci4gT25jZSB0aGUgYHRhc2tzYCBoYXZlIGNvbXBsZXRlZCwgdGhlIHJlc3VsdHMgYXJlIHBhc3NlZCB0byB0aGUgZmluYWxcbiAgICAgKiBgY2FsbGJhY2tgIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogKipOb3RlOioqIGBwYXJhbGxlbGAgaXMgYWJvdXQga2lja2luZy1vZmYgSS9PIHRhc2tzIGluIHBhcmFsbGVsLCBub3QgYWJvdXRcbiAgICAgKiBwYXJhbGxlbCBleGVjdXRpb24gb2YgY29kZS4gIElmIHlvdXIgdGFza3MgZG8gbm90IHVzZSBhbnkgdGltZXJzIG9yIHBlcmZvcm1cbiAgICAgKiBhbnkgSS9PLCB0aGV5IHdpbGwgYWN0dWFsbHkgYmUgZXhlY3V0ZWQgaW4gc2VyaWVzLiAgQW55IHN5bmNocm9ub3VzIHNldHVwXG4gICAgICogc2VjdGlvbnMgZm9yIGVhY2ggdGFzayB3aWxsIGhhcHBlbiBvbmUgYWZ0ZXIgdGhlIG90aGVyLiAgSmF2YVNjcmlwdCByZW1haW5zXG4gICAgICogc2luZ2xlLXRocmVhZGVkLlxuICAgICAqXG4gICAgICogSXQgaXMgYWxzbyBwb3NzaWJsZSB0byB1c2UgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkuIEVhY2ggcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIHJ1biBhcyBhIGZ1bmN0aW9uIGFuZCB0aGUgcmVzdWx0cyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgZmluYWwgYGNhbGxiYWNrYFxuICAgICAqIGFzIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5LiBUaGlzIGNhbiBiZSBhIG1vcmUgcmVhZGFibGUgd2F5IG9mIGhhbmRsaW5nXG4gICAgICogcmVzdWx0cyBmcm9tIHtAbGluayBhc3luYy5wYXJhbGxlbH0uXG4gICAgICpcbiAgICAgKiBAbmFtZSBwYXJhbGxlbFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IHRhc2tzIC0gQSBjb2xsZWN0aW9uIGNvbnRhaW5pbmcgZnVuY3Rpb25zIHRvIHJ1bi5cbiAgICAgKiBFYWNoIGZ1bmN0aW9uIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdClgIHdoaWNoIGl0IG11c3QgY2FsbCBvblxuICAgICAqIGNvbXBsZXRpb24gd2l0aCBhbiBlcnJvciBgZXJyYCAod2hpY2ggY2FuIGJlIGBudWxsYCkgYW5kIGFuIG9wdGlvbmFsIGByZXN1bHRgXG4gICAgICogdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFsbCB0aGVcbiAgICAgKiBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LiBUaGlzIGZ1bmN0aW9uIGdldHMgYSByZXN1bHRzIGFycmF5XG4gICAgICogKG9yIG9iamVjdCkgY29udGFpbmluZyBhbGwgdGhlIHJlc3VsdCBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSB0YXNrIGNhbGxiYWNrcy5cbiAgICAgKiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0cykuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBhc3luYy5wYXJhbGxlbChbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICdvbmUnKTtcbiAgICAgKiAgICAgICAgIH0sIDIwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiBdLFxuICAgICAqIC8vIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHRoZSByZXN1bHRzIGFycmF5IHdpbGwgZXF1YWwgWydvbmUnLCd0d28nXSBldmVuIHRob3VnaFxuICAgICAqICAgICAvLyB0aGUgc2Vjb25kIGZ1bmN0aW9uIGhhZCBhIHNob3J0ZXIgdGltZW91dC5cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIGFuIGV4YW1wbGUgdXNpbmcgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXlcbiAgICAgKiBhc3luYy5wYXJhbGxlbCh7XG4gICAgICogICAgIG9uZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgMSk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICB0d286IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIDIpO1xuICAgICAqICAgICAgICAgfSwgMTAwKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBlcXVhbHMgdG86IHtvbmU6IDEsIHR3bzogMn1cbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB2YXIgcGFyYWxsZWwgPSBkb0xpbWl0KHBhcmFsbGVsTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIEEgcXVldWUgb2YgdGFza3MgZm9yIHRoZSB3b3JrZXIgZnVuY3Rpb24gdG8gY29tcGxldGUuXG4gICAgICogQHR5cGVkZWYge09iamVjdH0gcXVldWVcbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBsZW5ndGggLSBhIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgbnVtYmVyIG9mIGl0ZW1zXG4gICAgICogd2FpdGluZyB0byBiZSBwcm9jZXNzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHN0YXJ0ZWQgLSBhIGZ1bmN0aW9uIHJldHVybmluZyB3aGV0aGVyIG9yIG5vdCBhbnlcbiAgICAgKiBpdGVtcyBoYXZlIGJlZW4gcHVzaGVkIGFuZCBwcm9jZXNzZWQgYnkgdGhlIHF1ZXVlLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBydW5uaW5nIC0gYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG51bWJlciBvZiBpdGVtc1xuICAgICAqIGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWQuIEludm9rZSB3aXRoICgpLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHdvcmtlcnNMaXN0IC0gYSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGFycmF5IG9mIGl0ZW1zXG4gICAgICogY3VycmVudGx5IGJlaW5nIHByb2Nlc3NlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gaWRsZSAtIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGZhbHNlIGlmIHRoZXJlIGFyZSBpdGVtc1xuICAgICAqIHdhaXRpbmcgb3IgYmVpbmcgcHJvY2Vzc2VkLCBvciB0cnVlIGlmIG5vdC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbmN1cnJlbmN5IC0gYW4gaW50ZWdlciBmb3IgZGV0ZXJtaW5pbmcgaG93IG1hbnkgYHdvcmtlcmBcbiAgICAgKiBmdW5jdGlvbnMgc2hvdWxkIGJlIHJ1biBpbiBwYXJhbGxlbC4gVGhpcyBwcm9wZXJ0eSBjYW4gYmUgY2hhbmdlZCBhZnRlciBhXG4gICAgICogYHF1ZXVlYCBpcyBjcmVhdGVkIHRvIGFsdGVyIHRoZSBjb25jdXJyZW5jeSBvbi10aGUtZmx5LlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHB1c2ggLSBhZGQgYSBuZXcgdGFzayB0byB0aGUgYHF1ZXVlYC4gQ2FsbHMgYGNhbGxiYWNrYFxuICAgICAqIG9uY2UgdGhlIGB3b3JrZXJgIGhhcyBmaW5pc2hlZCBwcm9jZXNzaW5nIHRoZSB0YXNrLiBJbnN0ZWFkIG9mIGEgc2luZ2xlIHRhc2ssXG4gICAgICogYSBgdGFza3NgIGFycmF5IGNhbiBiZSBzdWJtaXR0ZWQuIFRoZSByZXNwZWN0aXZlIGNhbGxiYWNrIGlzIHVzZWQgZm9yIGV2ZXJ5XG4gICAgICogdGFzayBpbiB0aGUgbGlzdC4gSW52b2tlIHdpdGggKHRhc2ssIFtjYWxsYmFja10pLFxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVuc2hpZnQgLSBhZGQgYSBuZXcgdGFzayB0byB0aGUgZnJvbnQgb2YgdGhlIGBxdWV1ZWAuXG4gICAgICogSW52b2tlIHdpdGggKHRhc2ssIFtjYWxsYmFja10pLlxuICAgICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHNhdHVyYXRlZCAtIGEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgbnVtYmVyIG9mXG4gICAgICogcnVubmluZyB3b3JrZXJzIGhpdHMgdGhlIGBjb25jdXJyZW5jeWAgbGltaXQsIGFuZCBmdXJ0aGVyIHRhc2tzIHdpbGwgYmVcbiAgICAgKiBxdWV1ZWQuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdW5zYXR1cmF0ZWQgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIG51bWJlclxuICAgICAqIG9mIHJ1bm5pbmcgd29ya2VycyBpcyBsZXNzIHRoYW4gdGhlIGBjb25jdXJyZW5jeWAgJiBgYnVmZmVyYCBsaW1pdHMsIGFuZFxuICAgICAqIGZ1cnRoZXIgdGFza3Mgd2lsbCBub3QgYmUgcXVldWVkLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBidWZmZXIgLSBBIG1pbmltdW0gdGhyZXNob2xkIGJ1ZmZlciBpbiBvcmRlciB0byBzYXkgdGhhdFxuICAgICAqIHRoZSBgcXVldWVgIGlzIGB1bnNhdHVyYXRlZGAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZW1wdHkgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGxhc3QgaXRlbVxuICAgICAqIGZyb20gdGhlIGBxdWV1ZWAgaXMgZ2l2ZW4gdG8gYSBgd29ya2VyYC5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBkcmFpbiAtIGEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgbGFzdCBpdGVtXG4gICAgICogZnJvbSB0aGUgYHF1ZXVlYCBoYXMgcmV0dXJuZWQgZnJvbSB0aGUgYHdvcmtlcmAuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZXJyb3IgLSBhIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gYSB0YXNrIGVycm9ycy5cbiAgICAgKiBIYXMgdGhlIHNpZ25hdHVyZSBgZnVuY3Rpb24oZXJyb3IsIHRhc2spYC5cbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHBhdXNlZCAtIGEgYm9vbGVhbiBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgcXVldWUgaXNcbiAgICAgKiBpbiBhIHBhdXNlZCBzdGF0ZS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBwYXVzZSAtIGEgZnVuY3Rpb24gdGhhdCBwYXVzZXMgdGhlIHByb2Nlc3Npbmcgb2YgdGFza3NcbiAgICAgKiB1bnRpbCBgcmVzdW1lKClgIGlzIGNhbGxlZC4gSW52b2tlIHdpdGggKCkuXG4gICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gcmVzdW1lIC0gYSBmdW5jdGlvbiB0aGF0IHJlc3VtZXMgdGhlIHByb2Nlc3Npbmcgb2ZcbiAgICAgKiBxdWV1ZWQgdGFza3Mgd2hlbiB0aGUgcXVldWUgaXMgcGF1c2VkLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBraWxsIC0gYSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGBkcmFpbmAgY2FsbGJhY2sgYW5kXG4gICAgICogZW1wdGllcyByZW1haW5pbmcgdGFza3MgZnJvbSB0aGUgcXVldWUgZm9yY2luZyBpdCB0byBnbyBpZGxlLiBJbnZva2Ugd2l0aCAoKS5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBgcXVldWVgIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgYGNvbmN1cnJlbmN5YC4gVGFza3MgYWRkZWQgdG8gdGhlXG4gICAgICogYHF1ZXVlYCBhcmUgcHJvY2Vzc2VkIGluIHBhcmFsbGVsICh1cCB0byB0aGUgYGNvbmN1cnJlbmN5YCBsaW1pdCkuIElmIGFsbFxuICAgICAqIGB3b3JrZXJgcyBhcmUgaW4gcHJvZ3Jlc3MsIHRoZSB0YXNrIGlzIHF1ZXVlZCB1bnRpbCBvbmUgYmVjb21lcyBhdmFpbGFibGUuXG4gICAgICogT25jZSBhIGB3b3JrZXJgIGNvbXBsZXRlcyBhIGB0YXNrYCwgdGhhdCBgdGFza2AncyBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbmFtZSBxdWV1ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd29ya2VyIC0gQW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIGEgcXVldWVkXG4gICAgICogdGFzaywgd2hpY2ggbXVzdCBjYWxsIGl0cyBgY2FsbGJhY2soZXJyKWAgYXJndW1lbnQgd2hlbiBmaW5pc2hlZCwgd2l0aCBhblxuICAgICAqIG9wdGlvbmFsIGBlcnJvcmAgYXMgYW4gYXJndW1lbnQuICBJZiB5b3Ugd2FudCB0byBoYW5kbGUgZXJyb3JzIGZyb20gYW5cbiAgICAgKiBpbmRpdmlkdWFsIHRhc2ssIHBhc3MgYSBjYWxsYmFjayB0byBgcS5wdXNoKClgLiBJbnZva2VkIHdpdGhcbiAgICAgKiAodGFzaywgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVuY3k9MV0gLSBBbiBgaW50ZWdlcmAgZm9yIGRldGVybWluaW5nIGhvdyBtYW55XG4gICAgICogYHdvcmtlcmAgZnVuY3Rpb25zIHNob3VsZCBiZSBydW4gaW4gcGFyYWxsZWwuICBJZiBvbWl0dGVkLCB0aGUgY29uY3VycmVuY3lcbiAgICAgKiBkZWZhdWx0cyB0byBgMWAuICBJZiB0aGUgY29uY3VycmVuY3kgaXMgYDBgLCBhbiBlcnJvciBpcyB0aHJvd24uXG4gICAgICogQHJldHVybnMge3F1ZXVlfSBBIHF1ZXVlIG9iamVjdCB0byBtYW5hZ2UgdGhlIHRhc2tzLiBDYWxsYmFja3MgY2FuXG4gICAgICogYXR0YWNoZWQgYXMgY2VydGFpbiBwcm9wZXJ0aWVzIHRvIGxpc3RlbiBmb3Igc3BlY2lmaWMgZXZlbnRzIGR1cmluZyB0aGVcbiAgICAgKiBsaWZlY3ljbGUgb2YgdGhlIHF1ZXVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBjcmVhdGUgYSBxdWV1ZSBvYmplY3Qgd2l0aCBjb25jdXJyZW5jeSAyXG4gICAgICogdmFyIHEgPSBhc3luYy5xdWV1ZShmdW5jdGlvbih0YXNrLCBjYWxsYmFjaykge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnaGVsbG8gJyArIHRhc2submFtZSk7XG4gICAgICogICAgIGNhbGxiYWNrKCk7XG4gICAgICogfSwgMik7XG4gICAgICpcbiAgICAgKiAvLyBhc3NpZ24gYSBjYWxsYmFja1xuICAgICAqIHEuZHJhaW4gPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2FsbCBpdGVtcyBoYXZlIGJlZW4gcHJvY2Vzc2VkJyk7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIC8vIGFkZCBzb21lIGl0ZW1zIHRvIHRoZSBxdWV1ZVxuICAgICAqIHEucHVzaCh7bmFtZTogJ2Zvbyd9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgZm9vJyk7XG4gICAgICogfSk7XG4gICAgICogcS5wdXNoKHtuYW1lOiAnYmFyJ30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgYmFyJyk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtcyB0byB0aGUgcXVldWUgKGJhdGNoLXdpc2UpXG4gICAgICogcS5wdXNoKFt7bmFtZTogJ2Jheid9LHtuYW1lOiAnYmF5J30se25hbWU6ICdiYXgnfV0sIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnZmluaXNoZWQgcHJvY2Vzc2luZyBpdGVtJyk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBhZGQgc29tZSBpdGVtcyB0byB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlXG4gICAgICogcS51bnNoaWZ0KHtuYW1lOiAnYmFyJ30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHByb2Nlc3NpbmcgYmFyJyk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcXVldWUkMSAod29ya2VyLCBjb25jdXJyZW5jeSkge1xuICAgICAgcmV0dXJuIHF1ZXVlKGZ1bmN0aW9uIChpdGVtcywgY2IpIHtcbiAgICAgICAgd29ya2VyKGl0ZW1zWzBdLCBjYik7XG4gICAgICB9LCBjb25jdXJyZW5jeSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMge0BsaW5rIGFzeW5jLnF1ZXVlfSBvbmx5IHRhc2tzIGFyZSBhc3NpZ25lZCBhIHByaW9yaXR5IGFuZFxuICAgICAqIGNvbXBsZXRlZCBpbiBhc2NlbmRpbmcgcHJpb3JpdHkgb3JkZXIuXG4gICAgICpcbiAgICAgKiBAbmFtZSBwcmlvcml0eVF1ZXVlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucXVldWVcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd29ya2VyIC0gQW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGZvciBwcm9jZXNzaW5nIGEgcXVldWVkXG4gICAgICogdGFzaywgd2hpY2ggbXVzdCBjYWxsIGl0cyBgY2FsbGJhY2soZXJyKWAgYXJndW1lbnQgd2hlbiBmaW5pc2hlZCwgd2l0aCBhblxuICAgICAqIG9wdGlvbmFsIGBlcnJvcmAgYXMgYW4gYXJndW1lbnQuICBJZiB5b3Ugd2FudCB0byBoYW5kbGUgZXJyb3JzIGZyb20gYW5cbiAgICAgKiBpbmRpdmlkdWFsIHRhc2ssIHBhc3MgYSBjYWxsYmFjayB0byBgcS5wdXNoKClgLiBJbnZva2VkIHdpdGhcbiAgICAgKiAodGFzaywgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb25jdXJyZW5jeSAtIEFuIGBpbnRlZ2VyYCBmb3IgZGV0ZXJtaW5pbmcgaG93IG1hbnkgYHdvcmtlcmBcbiAgICAgKiBmdW5jdGlvbnMgc2hvdWxkIGJlIHJ1biBpbiBwYXJhbGxlbC4gIElmIG9taXR0ZWQsIHRoZSBjb25jdXJyZW5jeSBkZWZhdWx0cyB0b1xuICAgICAqIGAxYC4gIElmIHRoZSBjb25jdXJyZW5jeSBpcyBgMGAsIGFuIGVycm9yIGlzIHRocm93bi5cbiAgICAgKiBAcmV0dXJucyB7cXVldWV9IEEgcHJpb3JpdHlRdWV1ZSBvYmplY3QgdG8gbWFuYWdlIHRoZSB0YXNrcy4gVGhlcmUgYXJlIHR3b1xuICAgICAqIGRpZmZlcmVuY2VzIGJldHdlZW4gYHF1ZXVlYCBhbmQgYHByaW9yaXR5UXVldWVgIG9iamVjdHM6XG4gICAgICogKiBgcHVzaCh0YXNrLCBwcmlvcml0eSwgW2NhbGxiYWNrXSlgIC0gYHByaW9yaXR5YCBzaG91bGQgYmUgYSBudW1iZXIuIElmIGFuXG4gICAgICogICBhcnJheSBvZiBgdGFza3NgIGlzIGdpdmVuLCBhbGwgdGFza3Mgd2lsbCBiZSBhc3NpZ25lZCB0aGUgc2FtZSBwcmlvcml0eS5cbiAgICAgKiAqIFRoZSBgdW5zaGlmdGAgbWV0aG9kIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByaW9yaXR5UXVldWUgKHdvcmtlciwgY29uY3VycmVuY3kpIHtcbiAgICAgICAgZnVuY3Rpb24gX2NvbXBhcmVUYXNrcyhhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfYmluYXJ5U2VhcmNoKHNlcXVlbmNlLCBpdGVtLCBjb21wYXJlKSB7XG4gICAgICAgICAgICB2YXIgYmVnID0gLTEsXG4gICAgICAgICAgICAgICAgZW5kID0gc2VxdWVuY2UubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChiZWcgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWlkID0gYmVnICsgKGVuZCAtIGJlZyArIDEgPj4+IDEpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIHNlcXVlbmNlW21pZF0pID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmVnID0gbWlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IG1pZCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9pbnNlcnQocSwgZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rhc2sgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgZHJhaW4gaW1tZWRpYXRlbHkgaWYgdGhlcmUgYXJlIG5vIHRhc2tzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZSQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcS5kcmFpbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJyYXlFYWNoKGRhdGEsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRhc2ssXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IGNhbGxiYWNrIDogbm9vcFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBxLnRhc2tzLnNwbGljZShfYmluYXJ5U2VhcmNoKHEudGFza3MsIGl0ZW0sIF9jb21wYXJlVGFza3MpICsgMSwgMCwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUkMShxLnByb2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCB3aXRoIGEgbm9ybWFsIHF1ZXVlXG4gICAgICAgIHZhciBxID0gcXVldWUkMSh3b3JrZXIsIGNvbmN1cnJlbmN5KTtcblxuICAgICAgICAvLyBPdmVycmlkZSBwdXNoIHRvIGFjY2VwdCBzZWNvbmQgcGFyYW1ldGVyIHJlcHJlc2VudGluZyBwcmlvcml0eVxuICAgICAgICBxLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgcHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBfaW5zZXJ0KHEsIGRhdGEsIHByaW9yaXR5LCBjYWxsYmFjayk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHVuc2hpZnQgZnVuY3Rpb25cbiAgICAgICAgZGVsZXRlIHEudW5zaGlmdDtcblxuICAgICAgICByZXR1cm4gcTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICAgICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICAgICAqL1xuICAgIHZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAgICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKipOb3RlOioqIEFzIHdpdGggb3RoZXIgXCJDb2xsZWN0aW9uc1wiIG1ldGhvZHMsIG9iamVjdHMgd2l0aCBhIFwibGVuZ3RoXCJcbiAgICAgKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICAgICAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKiBAYWxpYXMgZWFjaFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICAgICAqIEBzZWUgXy5mb3JFYWNoUmlnaHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgKiB9KTtcbiAgICAgKiAvLyA9PiBMb2dzIGAxYCB0aGVuIGAyYC5cbiAgICAgKlxuICAgICAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgICogfSk7XG4gICAgICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgICAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlFYWNoIDogYmFzZUVhY2g7XG4gICAgICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIHRoZSBgdGFza3NgIGFycmF5IG9mIGZ1bmN0aW9ucyBpbiBwYXJhbGxlbCwgd2l0aG91dCB3YWl0aW5nIHVudGlsIHRoZVxuICAgICAqIHByZXZpb3VzIGZ1bmN0aW9uIGhhcyBjb21wbGV0ZWQuIE9uY2UgYW55IHRoZSBgdGFza3NgIGNvbXBsZXRlZCBvciBwYXNzIGFuXG4gICAgICogZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzIGltbWVkaWF0ZWx5IGNhbGxlZC4gSXQnc1xuICAgICAqIGVxdWl2YWxlbnQgdG8gYFByb21pc2UucmFjZSgpYC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJhY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRhc2tzIC0gQW4gYXJyYXkgY29udGFpbmluZyBmdW5jdGlvbnMgdG8gcnVuLiBFYWNoIGZ1bmN0aW9uXG4gICAgICogaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVyciwgcmVzdWx0KWAgd2hpY2ggaXQgbXVzdCBjYWxsIG9uIGNvbXBsZXRpb24gd2l0aCBhblxuICAgICAqIGVycm9yIGBlcnJgICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW4gb3B0aW9uYWwgYHJlc3VsdGAgdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBvbmNlIGFueSBvZiB0aGUgZnVuY3Rpb25zIGhhdmVcbiAgICAgKiBjb21wbGV0ZWQuIFRoaXMgZnVuY3Rpb24gZ2V0cyBhbiBlcnJvciBvciByZXN1bHQgZnJvbSB0aGUgZmlyc3QgZnVuY3Rpb24gdGhhdFxuICAgICAqIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoIChlcnIsIHJlc3VsdCkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnJhY2UoW1xuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJyk7XG4gICAgICogICAgICAgICB9LCAyMDApO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAndHdvJyk7XG4gICAgICogICAgICAgICB9LCAxMDApO1xuICAgICAqICAgICB9XG4gICAgICogXSxcbiAgICAgKiAvLyBtYWluIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gdGhlIHJlc3VsdCB3aWxsIGJlIGVxdWFsIHRvICd0d28nIGFzIGl0IGZpbmlzaGVzIGVhcmxpZXJcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByYWNlKHRhc2tzLCBjYikge1xuICAgICAgICBjYiA9IG9uY2UoY2IgfHwgbm9vcCk7XG4gICAgICAgIGlmICghaXNBcnJheSh0YXNrcykpIHJldHVybiBjYihuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCB0byByYWNlIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJykpO1xuICAgICAgICBpZiAoIXRhc2tzLmxlbmd0aCkgcmV0dXJuIGNiKCk7XG4gICAgICAgIGZvckVhY2godGFza3MsIGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICB0YXNrKGNiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgcmVkdWNlYCwgb25seSBvcGVyYXRlcyBvbiBgY29sbGAgaW4gcmV2ZXJzZSBvcmRlci5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJlZHVjZVJpZ2h0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVkdWNlXG4gICAgICogQGFsaWFzIGZvbGRyXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHsqfSBtZW1vIC0gVGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIHJlZHVjdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gYXBwbGllZCB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogYXJyYXkgdG8gcHJvZHVjZSB0aGUgbmV4dCBzdGVwIGluIHRoZSByZWR1Y3Rpb24uIFRoZSBgaXRlcmF0ZWVgIGlzIHBhc3NlZCBhXG4gICAgICogYGNhbGxiYWNrKGVyciwgcmVkdWN0aW9uKWAgd2hpY2ggYWNjZXB0cyBhbiBvcHRpb25hbCBlcnJvciBhcyBpdHMgZmlyc3RcbiAgICAgKiBhcmd1bWVudCwgYW5kIHRoZSBzdGF0ZSBvZiB0aGUgcmVkdWN0aW9uIGFzIHRoZSBzZWNvbmQuIElmIGFuIGVycm9yIGlzXG4gICAgICogcGFzc2VkIHRvIHRoZSBjYWxsYmFjaywgdGhlIHJlZHVjdGlvbiBpcyBzdG9wcGVkIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzXG4gICAgICogaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLiBJbnZva2VkIHdpdGggKG1lbW8sIGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIFJlc3VsdCBpcyB0aGUgcmVkdWNlZCB2YWx1ZS4gSW52b2tlZCB3aXRoXG4gICAgICogKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWR1Y2VSaWdodChhcnIsIG1lbW8sIGl0ZXJhdGVlLCBjYikge1xuICAgICAgdmFyIHJldmVyc2VkID0gc2xpY2UuY2FsbChhcnIpLnJldmVyc2UoKTtcbiAgICAgIHJlZHVjZShyZXZlcnNlZCwgbWVtbywgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyB0aGUgZnVuY3Rpb24gaW4gYW5vdGhlciBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIGRhdGEgZXZlbiB3aGVuIGl0XG4gICAgICogZXJyb3JzLlxuICAgICAqXG4gICAgICogVGhlIG9iamVjdCByZXR1cm5lZCBoYXMgZWl0aGVyIHRoZSBwcm9wZXJ0eSBgZXJyb3JgIG9yIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZWZsZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgZnVuY3Rpb24geW91IHdhbnQgdG8gd3JhcFxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBBIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHBhc3NlcyBudWxsIHRvIGl0J3MgY2FsbGJhY2sgYXNcbiAgICAgKiB0aGUgZXJyb3IuIFRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrIHdpbGwgYmUgYW4gYG9iamVjdGAgd2l0aFxuICAgICAqIGVpdGhlciBhbiBgZXJyb3JgIG9yIGEgYHZhbHVlYCBwcm9wZXJ0eS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMucGFyYWxsZWwoW1xuICAgICAqICAgICBhc3luYy5yZWZsZWN0KGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIHN0dWZmIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ29uZScpO1xuICAgICAqICAgICB9KSxcbiAgICAgKiAgICAgYXN5bmMucmVmbGVjdChmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBtb3JlIHN0dWZmIGJ1dCBlcnJvciAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKCdiYWQgc3R1ZmYgaGFwcGVuZWQnKTtcbiAgICAgKiAgICAgfSksXG4gICAgICogICAgIGFzeW5jLnJlZmxlY3QoZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgICAgIC8vIGRvIHNvbWUgbW9yZSBzdHVmZiAuLi5cbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgfSlcbiAgICAgKiBdLFxuICAgICAqIC8vIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAgICogZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHZhbHVlc1xuICAgICAqICAgICAvLyByZXN1bHRzWzBdLnZhbHVlID0gJ29uZSdcbiAgICAgKiAgICAgLy8gcmVzdWx0c1sxXS5lcnJvciA9ICdiYWQgc3R1ZmYgaGFwcGVuZWQnXG4gICAgICogICAgIC8vIHJlc3VsdHNbMl0udmFsdWUgPSAndHdvJ1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZmxlY3QoZm4pIHtcbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gcmVmbGVjdE9uKGFyZ3MsIHJlZmxlY3RDYWxsYmFjaykge1xuICAgICAgICAgICAgYXJncy5wdXNoKHJlc3QoZnVuY3Rpb24gY2FsbGJhY2soZXJyLCBjYkFyZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZmxlY3RDYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYkFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNiQXJnc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYkFyZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYkFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmbGVjdENhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVqZWN0JDEoZWFjaGZuLCBhcnIsIGl0ZXJhdGVlLCBjYWxsYmFjaykge1xuICAgICAgICBfZmlsdGVyKGVhY2hmbiwgYXJyLCBmdW5jdGlvbiAodmFsdWUsIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRlZSh2YWx1ZSwgZnVuY3Rpb24gKGVyciwgdikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCAhdik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyBgcmVqZWN0YCBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAgKiB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgcmVqZWN0TGltaXRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5yZWplY3RcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXN5bmMgb3BlcmF0aW9ucyBhdCBhIHRpbWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0TGltaXQgPSBkb1BhcmFsbGVsTGltaXQocmVqZWN0JDEpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9wcG9zaXRlIG9mIGBmaWx0ZXJgLiBSZW1vdmVzIHZhbHVlcyB0aGF0IHBhc3MgYW4gYGFzeW5jYCB0cnV0aCB0ZXN0LlxuICAgICAqXG4gICAgICogQG5hbWUgcmVqZWN0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuZmlsdGVyXG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMucmVqZWN0KFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGVQYXRoLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5hY2Nlc3MoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgIWVycilcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIHJlc3VsdHMgbm93IGVxdWFscyBhbiBhcnJheSBvZiBtaXNzaW5nIGZpbGVzXG4gICAgICogICAgIGNyZWF0ZUZpbGVzKHJlc3VsdHMpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciByZWplY3QgPSBkb0xpbWl0KHJlamVjdExpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBBIGhlbHBlciBmdW5jdGlvbiB0aGF0IHdyYXBzIGFuIGFycmF5IG9mIGZ1bmN0aW9ucyB3aXRoIHJlZmxlY3QuXG4gICAgICpcbiAgICAgKiBAbmFtZSByZWZsZWN0QWxsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVmbGVjdFxuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFza3MgLSBUaGUgYXJyYXkgb2YgZnVuY3Rpb25zIHRvIHdyYXAgaW4gYGFzeW5jLnJlZmxlY3RgLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBmdW5jdGlvbnMsIGVhY2ggZnVuY3Rpb24gd3JhcHBlZCBpblxuICAgICAqIGBhc3luYy5yZWZsZWN0YFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBsZXQgdGFza3MgPSBbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICdvbmUnKTtcbiAgICAgKiAgICAgICAgIH0sIDIwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIG1vcmUgc3R1ZmYgYnV0IGVycm9yIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdiYWQgc3R1ZmYgaGFwcGVuZWQnKSk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0d28nKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiBdO1xuICAgICAqXG4gICAgICogYXN5bmMucGFyYWxsZWwoYXN5bmMucmVmbGVjdEFsbCh0YXNrcyksXG4gICAgICogLy8gb3B0aW9uYWwgY2FsbGJhY2tcbiAgICAgKiBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gdmFsdWVzXG4gICAgICogICAgIC8vIHJlc3VsdHNbMF0udmFsdWUgPSAnb25lJ1xuICAgICAqICAgICAvLyByZXN1bHRzWzFdLmVycm9yID0gRXJyb3IoJ2JhZCBzdHVmZiBoYXBwZW5lZCcpXG4gICAgICogICAgIC8vIHJlc3VsdHNbMl0udmFsdWUgPSAndHdvJ1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZmxlY3RBbGwodGFza3MpIHtcbiAgICAgIHJldHVybiB0YXNrcy5tYXAocmVmbGVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYHJlamVjdGAgYnV0IHJ1bnMgb25seSBhIHNpbmdsZSBhc3luYyBvcGVyYXRpb24gYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgcmVqZWN0U2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMucmVqZWN0XG4gICAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbCAtIEEgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBBIHRydXRoIHRlc3QgdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGluIGBjb2xsYC5cbiAgICAgKiBUaGUgYGl0ZXJhdGVlYCBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAsIHdoaWNoIG11c3QgYmUgY2FsbGVkXG4gICAgICogd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQgb25jZSBpdCBoYXMgY29tcGxldGVkLiBJbnZva2VkIHdpdGggKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgYWxsIHRoZVxuICAgICAqIGBpdGVyYXRlZWAgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0U2VyaWVzID0gZG9MaW1pdChyZWplY3RMaW1pdCwgMSk7XG5cbiAgICAvKipcbiAgICAgKiBSdW4gdGhlIGZ1bmN0aW9ucyBpbiB0aGUgYHRhc2tzYCBjb2xsZWN0aW9uIGluIHNlcmllcywgZWFjaCBvbmUgcnVubmluZyBvbmNlXG4gICAgICogdGhlIHByZXZpb3VzIGZ1bmN0aW9uIGhhcyBjb21wbGV0ZWQuIElmIGFueSBmdW5jdGlvbnMgaW4gdGhlIHNlcmllcyBwYXNzIGFuXG4gICAgICogZXJyb3IgdG8gaXRzIGNhbGxiYWNrLCBubyBtb3JlIGZ1bmN0aW9ucyBhcmUgcnVuLCBhbmQgYGNhbGxiYWNrYCBpc1xuICAgICAqIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSB2YWx1ZSBvZiB0aGUgZXJyb3IuIE90aGVyd2lzZSwgYGNhbGxiYWNrYFxuICAgICAqIHJlY2VpdmVzIGFuIGFycmF5IG9mIHJlc3VsdHMgd2hlbiBgdGFza3NgIGhhdmUgY29tcGxldGVkLlxuICAgICAqXG4gICAgICogSXQgaXMgYWxzbyBwb3NzaWJsZSB0byB1c2UgYW4gb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkuIEVhY2ggcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIHJ1biBhcyBhIGZ1bmN0aW9uLCBhbmQgdGhlIHJlc3VsdHMgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGZpbmFsIGBjYWxsYmFja2BcbiAgICAgKiBhcyBhbiBvYmplY3QgaW5zdGVhZCBvZiBhbiBhcnJheS4gVGhpcyBjYW4gYmUgYSBtb3JlIHJlYWRhYmxlIHdheSBvZiBoYW5kbGluZ1xuICAgICAqICByZXN1bHRzIGZyb20ge0BsaW5rIGFzeW5jLnNlcmllc30uXG4gICAgICpcbiAgICAgKiAqKk5vdGUqKiB0aGF0IHdoaWxlIG1hbnkgaW1wbGVtZW50YXRpb25zIHByZXNlcnZlIHRoZSBvcmRlciBvZiBvYmplY3RcbiAgICAgKiBwcm9wZXJ0aWVzLCB0aGUgW0VDTUFTY3JpcHQgTGFuZ3VhZ2UgU3BlY2lmaWNhdGlvbl0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguNilcbiAgICAgKiBleHBsaWNpdGx5IHN0YXRlcyB0aGF0XG4gICAgICpcbiAgICAgKiA+IFRoZSBtZWNoYW5pY3MgYW5kIG9yZGVyIG9mIGVudW1lcmF0aW5nIHRoZSBwcm9wZXJ0aWVzIGlzIG5vdCBzcGVjaWZpZWQuXG4gICAgICpcbiAgICAgKiBTbyBpZiB5b3UgcmVseSBvbiB0aGUgb3JkZXIgaW4gd2hpY2ggeW91ciBzZXJpZXMgb2YgZnVuY3Rpb25zIGFyZSBleGVjdXRlZCxcbiAgICAgKiBhbmQgd2FudCB0aGlzIHRvIHdvcmsgb24gYWxsIHBsYXRmb3JtcywgY29uc2lkZXIgdXNpbmcgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAbmFtZSBzZXJpZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB0YXNrcyAtIEEgY29sbGVjdGlvbiBjb250YWluaW5nIGZ1bmN0aW9ucyB0byBydW4sIGVhY2hcbiAgICAgKiBmdW5jdGlvbiBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCBpdCBtdXN0IGNhbGwgb24gY29tcGxldGlvbiB3aXRoXG4gICAgICogYW4gZXJyb3IgYGVycmAgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbiBvcHRpb25hbCBgcmVzdWx0YCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gcnVuIG9uY2UgYWxsIHRoZVxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZC4gVGhpcyBmdW5jdGlvbiBnZXRzIGEgcmVzdWx0cyBhcnJheSAob3Igb2JqZWN0KVxuICAgICAqIGNvbnRhaW5pbmcgYWxsIHRoZSByZXN1bHQgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgYHRhc2tgIGNhbGxiYWNrcy4gSW52b2tlZFxuICAgICAqIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGFzeW5jLnNlcmllcyhbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICAvLyBkbyBzb21lIHN0dWZmIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ29uZScpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gZG8gc29tZSBtb3JlIHN0dWZmIC4uLlxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ3R3bycpO1xuICAgICAqICAgICB9XG4gICAgICogXSxcbiAgICAgKiAvLyBvcHRpb25hbCBjYWxsYmFja1xuICAgICAqIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyBlcXVhbCB0byBbJ29uZScsICd0d28nXVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogYXN5bmMuc2VyaWVzKHtcbiAgICAgKiAgICAgb25lOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAxKTtcbiAgICAgKiAgICAgICAgIH0sIDIwMCk7XG4gICAgICogICAgIH0sXG4gICAgICogICAgIHR3bzogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAqICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAyKTtcbiAgICAgKiAgICAgICAgIH0sIDEwMCk7XG4gICAgICogICAgIH1cbiAgICAgKiB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0cyBpcyBub3cgZXF1YWwgdG86IHtvbmU6IDEsIHR3bzogMn1cbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXJpZXModGFza3MsIGNiKSB7XG4gICAgICByZXR1cm4gX3BhcmFsbGVsKGVhY2hPZlNlcmllcywgdGFza3MsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIF9cbiAgICAgKiBAc2luY2UgMi40LjBcbiAgICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAgICAgKlxuICAgICAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICAgICAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICAgICAqXG4gICAgICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gICAgICogLy8gPT4gdHJ1ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0YW50JDEodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBnZXQgYSBzdWNjZXNzZnVsIHJlc3BvbnNlIGZyb20gYHRhc2tgIG5vIG1vcmUgdGhhbiBgdGltZXNgIHRpbWVzXG4gICAgICogYmVmb3JlIHJldHVybmluZyBhbiBlcnJvci4gSWYgdGhlIHRhc2sgaXMgc3VjY2Vzc2Z1bCwgdGhlIGBjYWxsYmFja2Agd2lsbCBiZVxuICAgICAqIHBhc3NlZCB0aGUgcmVzdWx0IG9mIHRoZSBzdWNjZXNzZnVsIHRhc2suIElmIGFsbCBhdHRlbXB0cyBmYWlsLCB0aGUgY2FsbGJhY2tcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCB0aGUgZXJyb3IgYW5kIHJlc3VsdCAoaWYgYW55KSBvZiB0aGUgZmluYWwgYXR0ZW1wdC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJldHJ5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudW1iZXJ9IFtvcHRzID0ge3RpbWVzOiA1LCBpbnRlcnZhbDogMH18IDVdIC0gQ2FuIGJlIGVpdGhlciBhblxuICAgICAqIG9iamVjdCB3aXRoIGB0aW1lc2AgYW5kIGBpbnRlcnZhbGAgb3IgYSBudW1iZXIuXG4gICAgICogKiBgdGltZXNgIC0gVGhlIG51bWJlciBvZiBhdHRlbXB0cyB0byBtYWtlIGJlZm9yZSBnaXZpbmcgdXAuICBUaGUgZGVmYXVsdFxuICAgICAqICAgaXMgYDVgLlxuICAgICAqICogYGludGVydmFsYCAtIFRoZSB0aW1lIHRvIHdhaXQgYmV0d2VlbiByZXRyaWVzLCBpbiBtaWxsaXNlY29uZHMuICBUaGVcbiAgICAgKiAgIGRlZmF1bHQgaXMgYDBgLiBUaGUgaW50ZXJ2YWwgbWF5IGFsc28gYmUgc3BlY2lmaWVkIGFzIGEgZnVuY3Rpb24gb2YgdGhlXG4gICAgICogICByZXRyeSBjb3VudCAoc2VlIGV4YW1wbGUpLlxuICAgICAqICogSWYgYG9wdHNgIGlzIGEgbnVtYmVyLCB0aGUgbnVtYmVyIHNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJldHJ5LFxuICAgICAqICAgd2l0aCB0aGUgZGVmYXVsdCBpbnRlcnZhbCBvZiBgMGAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGFzayAtIEEgZnVuY3Rpb24gd2hpY2ggcmVjZWl2ZXMgdHdvIGFyZ3VtZW50czogKDEpIGFcbiAgICAgKiBgY2FsbGJhY2soZXJyLCByZXN1bHQpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCB3aGVuIGZpbmlzaGVkLCBwYXNzaW5nIGBlcnJgXG4gICAgICogKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCB0aGUgYHJlc3VsdGAgb2YgdGhlIGZ1bmN0aW9uJ3MgZXhlY3V0aW9uLCBhbmQgKDIpXG4gICAgICogYSBgcmVzdWx0c2Agb2JqZWN0LCBjb250YWluaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBwcmV2aW91c2x5IGV4ZWN1dGVkXG4gICAgICogZnVuY3Rpb25zIChpZiBuZXN0ZWQgaW5zaWRlIGFub3RoZXIgY29udHJvbCBmbG93KS4gSW52b2tlZCB3aXRoXG4gICAgICogKGNhbGxiYWNrLCByZXN1bHRzKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlXG4gICAgICogdGFzayBoYXMgc3VjY2VlZGVkLCBvciBhZnRlciB0aGUgZmluYWwgZmFpbGVkIGF0dGVtcHQuIEl0IHJlY2VpdmVzIHRoZSBgZXJyYFxuICAgICAqIGFuZCBgcmVzdWx0YCBhcmd1bWVudHMgb2YgdGhlIGxhc3QgYXR0ZW1wdCBhdCBjb21wbGV0aW5nIHRoZSBgdGFza2AuIEludm9rZWRcbiAgICAgKiB3aXRoIChlcnIsIHJlc3VsdHMpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBUaGUgYHJldHJ5YCBmdW5jdGlvbiBjYW4gYmUgdXNlZCBhcyBhIHN0YW5kLWFsb25lIGNvbnRyb2wgZmxvdyBieSBwYXNzaW5nXG4gICAgICogLy8gYSBjYWxsYmFjaywgYXMgc2hvd24gYmVsb3c6XG4gICAgICpcbiAgICAgKiAvLyB0cnkgY2FsbGluZyBhcGlNZXRob2QgMyB0aW1lc1xuICAgICAqIGFzeW5jLnJldHJ5KDMsIGFwaU1ldGhvZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3VsdFxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gdHJ5IGNhbGxpbmcgYXBpTWV0aG9kIDMgdGltZXMsIHdhaXRpbmcgMjAwIG1zIGJldHdlZW4gZWFjaCByZXRyeVxuICAgICAqIGFzeW5jLnJldHJ5KHt0aW1lczogMywgaW50ZXJ2YWw6IDIwMH0sIGFwaU1ldGhvZCwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3VsdFxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gdHJ5IGNhbGxpbmcgYXBpTWV0aG9kIDEwIHRpbWVzIHdpdGggZXhwb25lbnRpYWwgYmFja29mZlxuICAgICAqIC8vIChpLmUuIGludGVydmFscyBvZiAxMDAsIDIwMCwgNDAwLCA4MDAsIDE2MDAsIC4uLiBtaWxsaXNlY29uZHMpXG4gICAgICogYXN5bmMucmV0cnkoe1xuICAgICAqICAgdGltZXM6IDEwLFxuICAgICAqICAgaW50ZXJ2YWw6IGZ1bmN0aW9uKHJldHJ5Q291bnQpIHtcbiAgICAgKiAgICAgcmV0dXJuIDUwICogTWF0aC5wb3coMiwgcmV0cnlDb3VudCk7XG4gICAgICogICB9XG4gICAgICogfSwgYXBpTWV0aG9kLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgcmVzdWx0XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyB0cnkgY2FsbGluZyBhcGlNZXRob2QgdGhlIGRlZmF1bHQgNSB0aW1lcyBubyBkZWxheSBiZXR3ZWVuIGVhY2ggcmV0cnlcbiAgICAgKiBhc3luYy5yZXRyeShhcGlNZXRob2QsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXN1bHRcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIEl0IGNhbiBhbHNvIGJlIGVtYmVkZGVkIHdpdGhpbiBvdGhlciBjb250cm9sIGZsb3cgZnVuY3Rpb25zIHRvIHJldHJ5XG4gICAgICogLy8gaW5kaXZpZHVhbCBtZXRob2RzIHRoYXQgYXJlIG5vdCBhcyByZWxpYWJsZSwgbGlrZSB0aGlzOlxuICAgICAqIGFzeW5jLmF1dG8oe1xuICAgICAqICAgICB1c2VyczogYXBpLmdldFVzZXJzLmJpbmQoYXBpKSxcbiAgICAgKiAgICAgcGF5bWVudHM6IGFzeW5jLnJldHJ5KDMsIGFwaS5nZXRQYXltZW50cy5iaW5kKGFwaSkpXG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgICogICAgIC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXN1bHRzXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmV0cnkodGltZXMsIHRhc2ssIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBERUZBVUxUX1RJTUVTID0gNTtcbiAgICAgICAgdmFyIERFRkFVTFRfSU5URVJWQUwgPSAwO1xuXG4gICAgICAgIHZhciBvcHRzID0ge1xuICAgICAgICAgICAgdGltZXM6IERFRkFVTFRfVElNRVMsXG4gICAgICAgICAgICBpbnRlcnZhbEZ1bmM6IGNvbnN0YW50JDEoREVGQVVMVF9JTlRFUlZBTClcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBwYXJzZVRpbWVzKGFjYywgdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9ICt0LnRpbWVzIHx8IERFRkFVTFRfVElNRVM7XG5cbiAgICAgICAgICAgICAgICBhY2MuaW50ZXJ2YWxGdW5jID0gdHlwZW9mIHQuaW50ZXJ2YWwgPT09ICdmdW5jdGlvbicgPyB0LmludGVydmFsIDogY29uc3RhbnQkMSgrdC5pbnRlcnZhbCB8fCBERUZBVUxUX0lOVEVSVkFMKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHQgPT09ICdudW1iZXInIHx8IHR5cGVvZiB0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGFjYy50aW1lcyA9ICt0IHx8IERFRkFVTFRfVElNRVM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnRzIGZvciBhc3luYy5yZXRyeVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMyAmJiB0eXBlb2YgdGltZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdGFzayB8fCBub29wO1xuICAgICAgICAgICAgdGFzayA9IHRpbWVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VUaW1lcyhvcHRzLCB0aW1lcyk7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IG5vb3A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRhc2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnRzIGZvciBhc3luYy5yZXRyeVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhdHRlbXB0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG9wdHMudGltZXMgKyAxOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpc0ZpbmFsQXR0ZW1wdCA9IGkgPT0gb3B0cy50aW1lcztcbiAgICAgICAgICAgIGF0dGVtcHRzLnB1c2gocmV0cnlBdHRlbXB0KGlzRmluYWxBdHRlbXB0KSk7XG4gICAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSBvcHRzLmludGVydmFsRnVuYyhpKTtcbiAgICAgICAgICAgIGlmICghaXNGaW5hbEF0dGVtcHQgJiYgaW50ZXJ2YWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMucHVzaChyZXRyeUludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXJpZXMoYXR0ZW1wdHMsIGZ1bmN0aW9uIChkb25lLCBkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5lcnIsIGRhdGEucmVzdWx0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmV0cnlBdHRlbXB0KGlzRmluYWxBdHRlbXB0KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcmllc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGFzayhmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzQ2FsbGJhY2soIWVyciB8fCBpc0ZpbmFsQXR0ZW1wdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyOiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXRyeUludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlcmllc0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllc0NhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGNsb3NlIHJlbGF0aXZlIG9mIGByZXRyeWAuICBUaGlzIG1ldGhvZCB3cmFwcyBhIHRhc2sgYW5kIG1ha2VzIGl0XG4gICAgICogcmV0cnlhYmxlLCByYXRoZXIgdGhhbiBpbW1lZGlhdGVseSBjYWxsaW5nIGl0IHdpdGggcmV0cmllcy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHJldHJ5YWJsZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWVtYmVyT2YgYXN5bmNcbiAgICAgKiBAc2VlIGFzeW5jLnJldHJ5XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bWJlcn0gW29wdHMgPSB7dGltZXM6IDUsIGludGVydmFsOiAwfXwgNV0gLSBvcHRpb25hbFxuICAgICAqIG9wdGlvbnMsIGV4YWN0bHkgdGhlIHNhbWUgYXMgZnJvbSBgcmV0cnlgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdGFzayAtIHRoZSBhc3luY2hyb25vdXMgZnVuY3Rpb24gdG8gd3JhcFxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbnN9IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLCB3aGljaCB3aGVuIGludm9rZWQsIHdpbGwgcmV0cnkgb25cbiAgICAgKiBhbiBlcnJvciwgYmFzZWQgb24gdGhlIHBhcmFtZXRlcnMgc3BlY2lmaWVkIGluIGBvcHRzYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuYXV0byh7XG4gICAgICogICAgIGRlcDE6IGFzeW5jLnJldHJ5YWJsZSgzLCBnZXRGcm9tRmxha3lTZXJ2aWNlKSxcbiAgICAgKiAgICAgcHJvY2VzczogW1wiZGVwMVwiLCBhc3luYy5yZXRyeWFibGUoMywgZnVuY3Rpb24gKHJlc3VsdHMsIGNiKSB7XG4gICAgICogICAgICAgICBtYXliZVByb2Nlc3NEYXRhKHJlc3VsdHMuZGVwMSwgY2IpO1xuICAgICAqICAgICB9KV1cbiAgICAgKiB9LCBjYWxsYmFjayk7XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmV0cnlhYmxlIChvcHRzLCB0YXNrKSB7XG4gICAgICAgIGlmICghdGFzaykge1xuICAgICAgICAgICAgdGFzayA9IG9wdHM7XG4gICAgICAgICAgICBvcHRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdGlhbFBhcmFtcyhmdW5jdGlvbiAoYXJncywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRhc2tGbihjYikge1xuICAgICAgICAgICAgICAgIHRhc2suYXBwbHkobnVsbCwgYXJncy5jb25jYXQoW2NiXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cykgcmV0cnkob3B0cywgdGFza0ZuLCBjYWxsYmFjayk7ZWxzZSByZXRyeSh0YXNrRm4sIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNhbWUgYXMgYHNvbWVgIGJ1dCBydW5zIGEgbWF4aW11bSBvZiBgbGltaXRgIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqXG4gICAgICogQG5hbWUgc29tZUxpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuc29tZVxuICAgICAqIEBhbGlhcyBhbnlMaW1pdFxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhc3luYyBvcGVyYXRpb25zIGF0IGEgdGltZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XG4gICAgICogaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAgd2hpY2ggbXVzdFxuICAgICAqIGJlIGNhbGxlZCB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuXG4gICAgICogUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luY1xuICAgICAqIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgc29tZUxpbWl0ID0gX2NyZWF0ZVRlc3RlcihlYWNoT2ZMaW1pdCwgQm9vbGVhbiwgaWRlbnRpdHkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIGBjb2xsYCBzYXRpc2ZpZXMgYW4gYXN5bmMgdGVzdC5cbiAgICAgKiBJZiBhbnkgaXRlcmF0ZWUgY2FsbCByZXR1cm5zIGB0cnVlYCwgdGhlIG1haW4gYGNhbGxiYWNrYCBpcyBpbW1lZGlhdGVseVxuICAgICAqIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBuYW1lIHNvbWVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQGFsaWFzIGFueVxuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSB0cnV0aCB0ZXN0IHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXlcbiAgICAgKiBpbiBwYXJhbGxlbC4gVGhlIGl0ZXJhdGVlIGlzIHBhc3NlZCBhIGBjYWxsYmFjayhlcnIsIHRydXRoVmFsdWUpYCB3aGljaCBtdXN0XG4gICAgICogYmUgY2FsbGVkIHdpdGggYSBib29sZWFuIGFyZ3VtZW50IG9uY2UgaXQgaGFzIGNvbXBsZXRlZC4gSW52b2tlZCB3aXRoXG4gICAgICogKGl0ZW0sIGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyBhbnlcbiAgICAgKiBpdGVyYXRlZSByZXR1cm5zIGB0cnVlYCwgb3IgYWZ0ZXIgYWxsIHRoZSBpdGVyYXRlZSBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC5cbiAgICAgKiBSZXN1bHQgd2lsbCBiZSBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWAgZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgdGhlIGFzeW5jXG4gICAgICogdGVzdHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHQpLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy5zb21lKFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGVQYXRoLCBjYWxsYmFjaykge1xuICAgICAqICAgICBmcy5hY2Nlc3MoZmlsZVBhdGgsIGZ1bmN0aW9uKGVycikge1xuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgIWVycilcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gaWYgcmVzdWx0IGlzIHRydWUgdGhlbiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZpbGVzIGV4aXN0c1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciBzb21lID0gZG9MaW1pdChzb21lTGltaXQsIEluZmluaXR5KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzYW1lIGFzIGBzb21lYCBidXQgcnVucyBvbmx5IGEgc2luZ2xlIGFzeW5jIG9wZXJhdGlvbiBhdCBhIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSBzb21lU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMuc29tZVxuICAgICAqIEBhbGlhcyBhbnlTZXJpZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsIC0gQSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgdHJ1dGggdGVzdCB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XG4gICAgICogaW4gcGFyYWxsZWwuIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCB0cnV0aFZhbHVlKWAgd2hpY2ggbXVzdFxuICAgICAqIGJlIGNhbGxlZCB3aXRoIGEgYm9vbGVhbiBhcmd1bWVudCBvbmNlIGl0IGhhcyBjb21wbGV0ZWQuIEludm9rZWQgd2l0aFxuICAgICAqIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFzIHNvb24gYXMgYW55XG4gICAgICogaXRlcmF0ZWUgcmV0dXJucyBgdHJ1ZWAsIG9yIGFmdGVyIGFsbCB0aGUgaXRlcmF0ZWUgZnVuY3Rpb25zIGhhdmUgZmluaXNoZWQuXG4gICAgICogUmVzdWx0IHdpbGwgYmUgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIHRoZSBhc3luY1xuICAgICAqIHRlc3RzLiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKi9cbiAgICB2YXIgc29tZVNlcmllcyA9IGRvTGltaXQoc29tZUxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIFNvcnRzIGEgbGlzdCBieSB0aGUgcmVzdWx0cyBvZiBydW5uaW5nIGVhY2ggYGNvbGxgIHZhbHVlIHRocm91Z2ggYW4gYXN5bmNcbiAgICAgKiBgaXRlcmF0ZWVgLlxuICAgICAqXG4gICAgICogQG5hbWUgc29ydEJ5XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gaW4gYGNvbGxgLlxuICAgICAqIFRoZSBpdGVyYXRlZSBpcyBwYXNzZWQgYSBgY2FsbGJhY2soZXJyLCBzb3J0VmFsdWUpYCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlXG4gICAgICogaXQgaGFzIGNvbXBsZXRlZCB3aXRoIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYSB2YWx1ZSB0byB1c2UgYXNcbiAgICAgKiB0aGUgc29ydCBjcml0ZXJpYS4gSW52b2tlZCB3aXRoIChpdGVtLCBjYWxsYmFjaykuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFsbCB0aGVcbiAgICAgKiBgaXRlcmF0ZWVgIGZ1bmN0aW9ucyBoYXZlIGZpbmlzaGVkLCBvciBhbiBlcnJvciBvY2N1cnMuIFJlc3VsdHMgaXMgdGhlIGl0ZW1zXG4gICAgICogZnJvbSB0aGUgb3JpZ2luYWwgYGNvbGxgIHNvcnRlZCBieSB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBgaXRlcmF0ZWVgXG4gICAgICogY2FsbHMuIEludm9rZWQgd2l0aCAoZXJyLCByZXN1bHRzKS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMuc29ydEJ5KFsnZmlsZTEnLCdmaWxlMicsJ2ZpbGUzJ10sIGZ1bmN0aW9uKGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGZzLnN0YXQoZmlsZSwgZnVuY3Rpb24oZXJyLCBzdGF0cykge1xuICAgICAqICAgICAgICAgY2FsbGJhY2soZXJyLCBzdGF0cy5tdGltZSk7XG4gICAgICogICAgIH0pO1xuICAgICAqIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAqICAgICAvLyByZXN1bHRzIGlzIG5vdyB0aGUgb3JpZ2luYWwgYXJyYXkgb2YgZmlsZXMgc29ydGVkIGJ5XG4gICAgICogICAgIC8vIG1vZGlmaWVkIGRhdGVcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIEJ5IG1vZGlmeWluZyB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyIHRoZVxuICAgICAqIC8vIHNvcnRpbmcgb3JkZXIgY2FuIGJlIGluZmx1ZW5jZWQ6XG4gICAgICpcbiAgICAgKiAvLyBhc2NlbmRpbmcgb3JkZXJcbiAgICAgKiBhc3luYy5zb3J0QnkoWzEsOSwzLDVdLCBmdW5jdGlvbih4LCBjYWxsYmFjaykge1xuICAgICAqICAgICBjYWxsYmFjayhudWxsLCB4KTtcbiAgICAgKiB9LCBmdW5jdGlvbihlcnIscmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBjYWxsYmFja1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gZGVzY2VuZGluZyBvcmRlclxuICAgICAqIGFzeW5jLnNvcnRCeShbMSw5LDMsNV0sIGZ1bmN0aW9uKHgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsIHgqLTEpOyAgICAvLzwtIHgqLTEgaW5zdGVhZCBvZiB4LCB0dXJucyB0aGUgb3JkZXIgYXJvdW5kXG4gICAgICogfSwgZnVuY3Rpb24oZXJyLHJlc3VsdCkge1xuICAgICAqICAgICAvLyByZXN1bHQgY2FsbGJhY2tcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzb3J0QnkoYXJyLCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgICAgbWFwKGFyciwgZnVuY3Rpb24gKHgsIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRlZSh4LCBmdW5jdGlvbiAoZXJyLCBjcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgICAgIGNiKG51bGwsIHsgdmFsdWU6IHgsIGNyaXRlcmlhOiBjcml0ZXJpYSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgIGNiKG51bGwsIGFycmF5TWFwKHJlc3VsdHMuc29ydChjb21wYXJhdG9yKSwgYmFzZVByb3BlcnR5KCd2YWx1ZScpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmF0b3IobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYSxcbiAgICAgICAgICAgICAgICBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdGltZSBsaW1pdCBvbiBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24uIElmIHRoZSBmdW5jdGlvbiBkb2VzIG5vdCBjYWxsXG4gICAgICogaXRzIGNhbGxiYWNrIHdpdGhpbiB0aGUgc3BlY2lmaWVkIG1pbGlzZWNvbmRzLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGFcbiAgICAgKiB0aW1lb3V0IGVycm9yLiBUaGUgY29kZSBwcm9wZXJ0eSBmb3IgdGhlIGVycm9yIG9iamVjdCB3aWxsIGJlIGAnRVRJTUVET1VUJ2AuXG4gICAgICpcbiAgICAgKiBAbmFtZSB0aW1lb3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBVdGlsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSBUaGUgYXN5bmNocm9ub3VzIGZ1bmN0aW9uIHlvdSB3YW50IHRvIHNldCB0aGVcbiAgICAgKiB0aW1lIGxpbWl0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaWxpc2Vjb25kcyAtIFRoZSBzcGVjaWZpZWQgdGltZSBsaW1pdC5cbiAgICAgKiBAcGFyYW0geyp9IFtpbmZvXSAtIEFueSB2YXJpYWJsZSB5b3Ugd2FudCBhdHRhY2hlZCAoYHN0cmluZ2AsIGBvYmplY3RgLCBldGMpXG4gICAgICogdG8gdGltZW91dCBFcnJvciBmb3IgbW9yZSBpbmZvcm1hdGlvbi4uXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGEgd3JhcHBlZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYW55IG9mXG4gICAgICogdGhlIGNvbnRyb2wgZmxvdyBmdW5jdGlvbnMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLnRpbWVvdXQoZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgKiAgICAgZG9Bc3luY1Rhc2soY2FsbGJhY2spO1xuICAgICAqIH0sIDEwMDApO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRpbWVvdXQoYXN5bmNGbiwgbWlsaXNlY29uZHMsIGluZm8pIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsQ2FsbGJhY2ssIHRpbWVyO1xuICAgICAgICB2YXIgdGltZWRPdXQgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBpbmplY3RlZENhbGxiYWNrKCkge1xuICAgICAgICAgICAgaWYgKCF0aW1lZE91dCkge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBhc3luY0ZuLm5hbWUgfHwgJ2Fub255bW91cyc7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0NhbGxiYWNrIGZ1bmN0aW9uIFwiJyArIG5hbWUgKyAnXCIgdGltZWQgb3V0LicpO1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9ICdFVElNRURPVVQnO1xuICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICBlcnJvci5pbmZvID0gaW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluaXRpYWxQYXJhbXMoZnVuY3Rpb24gKGFyZ3MsIG9yaWdDYWxsYmFjaykge1xuICAgICAgICAgICAgb3JpZ2luYWxDYWxsYmFjayA9IG9yaWdDYWxsYmFjaztcbiAgICAgICAgICAgIC8vIHNldHVwIHRpbWVyIGFuZCBjYWxsIG9yaWdpbmFsIGZ1bmN0aW9uXG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBtaWxpc2Vjb25kcyk7XG4gICAgICAgICAgICBhc3luY0ZuLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGluamVjdGVkQ2FsbGJhY2spKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xuICAgIHZhciBuYXRpdmVDZWlsID0gTWF0aC5jZWlsO1xuICAgIHZhciBuYXRpdmVNYXgkMSA9IE1hdGgubWF4O1xuICAgIC8qKlxuICAgICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJhbmdlYCBhbmQgYF8ucmFuZ2VSaWdodGAgd2hpY2ggZG9lc24ndFxuICAgICAqIGNvZXJjZSBhcmd1bWVudHMgdG8gbnVtYmVycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVuZCBUaGUgZW5kIG9mIHRoZSByYW5nZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlcCBUaGUgdmFsdWUgdG8gaW5jcmVtZW50IG9yIGRlY3JlbWVudCBieS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHJhbmdlIG9mIG51bWJlcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYmFzZVJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXAsIGZyb21SaWdodCkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4JDEobmF0aXZlQ2VpbCgoZW5kIC0gc3RhcnQpIC8gKHN0ZXAgfHwgMSkpLCAwKSxcbiAgICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgcmVzdWx0W2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ICs9IHN0ZXA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogVGhlIHNhbWUgYXMge0BsaW5rIHRpbWVzfSBidXQgcnVucyBhIG1heGltdW0gb2YgYGxpbWl0YCBhc3luYyBvcGVyYXRpb25zIGF0IGFcbiAgICAqIHRpbWUuXG4gICAgICpcbiAgICAgKiBAbmFtZSB0aW1lc0xpbWl0XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMudGltZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJ1biB0aGUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGFzeW5jIG9wZXJhdGlvbnMgYXQgYSB0aW1lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgYG5gIHRpbWVzLiBJbnZva2VkIHdpdGggdGhlXG4gICAgICogaXRlcmF0aW9uIGluZGV4IGFuZCBhIGNhbGxiYWNrIChuLCBuZXh0KS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHNlZSB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0aW1lTGltaXQoY291bnQsIGxpbWl0LCBpdGVyYXRlZSwgY2IpIHtcbiAgICAgIHJldHVybiBtYXBMaW1pdChiYXNlUmFuZ2UoMCwgY291bnQsIDEpLCBsaW1pdCwgaXRlcmF0ZWUsIGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgYGl0ZXJhdGVlYCBmdW5jdGlvbiBgbmAgdGltZXMsIGFuZCBhY2N1bXVsYXRlcyByZXN1bHRzIGluIHRoZSBzYW1lXG4gICAgICogbWFubmVyIHlvdSB3b3VsZCB1c2Ugd2l0aCB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHRpbWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMubWFwXG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIG51bWJlciBvZiB0aW1lcyB0byBydW4gdGhlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgYG5gIHRpbWVzLiBJbnZva2VkIHdpdGggdGhlXG4gICAgICogaXRlcmF0aW9uIGluZGV4IGFuZCBhIGNhbGxiYWNrIChuLCBuZXh0KS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIHNlZSB7QGxpbmsgYXN5bmMubWFwfS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogLy8gUHJldGVuZCB0aGlzIGlzIHNvbWUgY29tcGxpY2F0ZWQgYXN5bmMgZmFjdG9yeVxuICAgICAqIHZhciBjcmVhdGVVc2VyID0gZnVuY3Rpb24oaWQsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgKiAgICAgICAgIGlkOiAndXNlcicgKyBpZFxuICAgICAqICAgICB9KTtcbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogLy8gZ2VuZXJhdGUgNSB1c2Vyc1xuICAgICAqIGFzeW5jLnRpbWVzKDUsIGZ1bmN0aW9uKG4sIG5leHQpIHtcbiAgICAgKiAgICAgY3JlYXRlVXNlcihuLCBmdW5jdGlvbihlcnIsIHVzZXIpIHtcbiAgICAgKiAgICAgICAgIG5leHQoZXJyLCB1c2VyKTtcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCB1c2Vycykge1xuICAgICAqICAgICAvLyB3ZSBzaG91bGQgbm93IGhhdmUgNSB1c2Vyc1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHZhciB0aW1lcyA9IGRvTGltaXQodGltZUxpbWl0LCBJbmZpbml0eSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2FtZSBhcyB7QGxpbmsgYXN5bmMudGltZXN9IGJ1dCBydW5zIG9ubHkgYSBzaW5nbGUgYXN5bmMgb3BlcmF0aW9uIGF0IGEgdGltZS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHRpbWVzU2VyaWVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMudGltZXNcbiAgICAgKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJ1biB0aGUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBgbmAgdGltZXMuIEludm9rZWQgd2l0aCB0aGVcbiAgICAgKiBpdGVyYXRpb24gaW5kZXggYW5kIGEgY2FsbGJhY2sgKG4sIG5leHQpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gc2VlIHtAbGluayBhc3luYy5tYXB9LlxuICAgICAqL1xuICAgIHZhciB0aW1lc1NlcmllcyA9IGRvTGltaXQodGltZUxpbWl0LCAxKTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVsYXRpdmUgb2YgYHJlZHVjZWAuICBUYWtlcyBhbiBPYmplY3Qgb3IgQXJyYXksIGFuZCBpdGVyYXRlcyBvdmVyIGVhY2hcbiAgICAgKiBlbGVtZW50IGluIHNlcmllcywgZWFjaCBzdGVwIHBvdGVudGlhbGx5IG11dGF0aW5nIGFuIGBhY2N1bXVsYXRvcmAgdmFsdWUuXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGFjY3VtdWxhdG9yIGRlZmF1bHRzIHRvIHRoZSB0eXBlIG9mIGNvbGxlY3Rpb24gcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQG5hbWUgdHJhbnNmb3JtXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGwgLSBBIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSAtIFRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSB0cmFuc2Zvcm0uICBJZiBvbWl0dGVkLFxuICAgICAqIGl0IHdpbGwgZGVmYXVsdCB0byBhbiBlbXB0eSBPYmplY3Qgb3IgQXJyYXksIGRlcGVuZGluZyBvbiB0aGUgdHlwZSBvZiBgY29sbGBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSAtIEEgZnVuY3Rpb24gYXBwbGllZCB0byBlYWNoIGl0ZW0gaW4gdGhlXG4gICAgICogY29sbGVjdGlvbiB0aGF0IHBvdGVudGlhbGx5IG1vZGlmaWVzIHRoZSBhY2N1bXVsYXRvci4gVGhlIGBpdGVyYXRlZWAgaXNcbiAgICAgKiBwYXNzZWQgYSBgY2FsbGJhY2soZXJyKWAgd2hpY2ggYWNjZXB0cyBhbiBvcHRpb25hbCBlcnJvciBhcyBpdHMgZmlyc3RcbiAgICAgKiBhcmd1bWVudC4gSWYgYW4gZXJyb3IgaXMgcGFzc2VkIHRvIHRoZSBjYWxsYmFjaywgdGhlIHRyYW5zZm9ybSBpcyBzdG9wcGVkXG4gICAgICogYW5kIHRoZSBtYWluIGBjYWxsYmFja2AgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqIEludm9rZWQgd2l0aCAoYWNjdW11bGF0b3IsIGl0ZW0sIGtleSwgY2FsbGJhY2spLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBhbGwgdGhlXG4gICAgICogYGl0ZXJhdGVlYCBmdW5jdGlvbnMgaGF2ZSBmaW5pc2hlZC4gUmVzdWx0IGlzIHRoZSB0cmFuc2Zvcm1lZCBhY2N1bXVsYXRvci5cbiAgICAgKiBJbnZva2VkIHdpdGggKGVyciwgcmVzdWx0KS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYXN5bmMudHJhbnNmb3JtKFsxLDIsM10sIGZ1bmN0aW9uKGFjYywgaXRlbSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIHBvaW50bGVzcyBhc3luYzpcbiAgICAgKiAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgIGFjYy5wdXNoKGl0ZW0gKiAyKVxuICAgICAqICAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICAgKiAgICAgfSk7XG4gICAgICogfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IGlzIG5vdyBlcXVhbCB0byBbMiwgNCwgNl1cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBhc3luYy50cmFuc2Zvcm0oe2E6IDEsIGI6IDIsIGM6IDN9LCBmdW5jdGlvbiAob2JqLCB2YWwsIGtleSwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIG9ialtrZXldID0gdmFsICogMjtcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICogICAgIH0pXG4gICAgICogfSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICogICAgIC8vIHJlc3VsdCBpcyBlcXVhbCB0byB7YTogMiwgYjogNCwgYzogNn1cbiAgICAgKiB9KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybShhcnIsIGFjYywgaXRlcmF0ZWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGl0ZXJhdGVlO1xuICAgICAgICAgICAgaXRlcmF0ZWUgPSBhY2M7XG4gICAgICAgICAgICBhY2MgPSBpc0FycmF5KGFycikgPyBbXSA6IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaE9mKGFyciwgZnVuY3Rpb24gKHYsIGssIGNiKSB7XG4gICAgICAgICAgICBpdGVyYXRlZShhY2MsIHYsIGssIGNiKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBhY2MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmRvZXMgYSB7QGxpbmsgYXN5bmMubWVtb2l6ZX1kIGZ1bmN0aW9uLCByZXZlcnRpbmcgaXQgdG8gdGhlIG9yaWdpbmFsLFxuICAgICAqIHVubWVtb2l6ZWQgZm9ybS4gSGFuZHkgZm9yIHRlc3RpbmcuXG4gICAgICpcbiAgICAgKiBAbmFtZSB1bm1lbW9pemVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQG1lbWJlck9mIGFzeW5jXG4gICAgICogQHNlZSBhc3luYy5tZW1vaXplXG4gICAgICogQGNhdGVnb3J5IFV0aWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBtZW1vaXplZCBmdW5jdGlvblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVubWVtb2l6ZShmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChmbi51bm1lbW9pemVkIHx8IGZuKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGVhdGVkbHkgY2FsbCBgZm5gIHVudGlsIGB0ZXN0YCByZXR1cm5zIGB0cnVlYC4gQ2FsbHMgYGNhbGxiYWNrYCB3aGVuXG4gICAgICogc3RvcHBlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLiBgY2FsbGJhY2tgIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnlcbiAgICAgKiBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBmaW5hbCBgZm5gJ3MgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBUaGUgaW52ZXJzZSBvZiB7QGxpbmsgYXN5bmMud2hpbHN0fS5cbiAgICAgKlxuICAgICAqIEBuYW1lIHVudGlsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBzZWUgYXN5bmMud2hpbHN0XG4gICAgICogQGNhdGVnb3J5IENvbnRyb2wgRmxvd1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgLSBzeW5jaHJvbm91cyB0cnV0aCB0ZXN0IHRvIHBlcmZvcm0gYmVmb3JlIGVhY2hcbiAgICAgKiBleGVjdXRpb24gb2YgYGZuYC4gSW52b2tlZCB3aXRoICgpLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgZWFjaCB0aW1lIGB0ZXN0YCBmYWlscy5cbiAgICAgKiBUaGUgZnVuY3Rpb24gaXMgcGFzc2VkIGEgYGNhbGxiYWNrKGVycilgLCB3aGljaCBtdXN0IGJlIGNhbGxlZCBvbmNlIGl0IGhhc1xuICAgICAqIGNvbXBsZXRlZCB3aXRoIGFuIG9wdGlvbmFsIGBlcnJgIGFyZ3VtZW50LiBJbnZva2VkIHdpdGggKGNhbGxiYWNrKS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHRlc3RcbiAgICAgKiBmdW5jdGlvbiBoYXMgcGFzc2VkIGFuZCByZXBlYXRlZCBleGVjdXRpb24gb2YgYGZuYCBoYXMgc3RvcHBlZC4gYGNhbGxiYWNrYFxuICAgICAqIHdpbGwgYmUgcGFzc2VkIGFuIGVycm9yIGFuZCBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZmluYWwgYGZuYCdzXG4gICAgICogY2FsbGJhY2suIEludm9rZWQgd2l0aCAoZXJyLCBbcmVzdWx0c10pO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVudGlsKHRlc3QsIGl0ZXJhdGVlLCBjYikge1xuICAgICAgICByZXR1cm4gd2hpbHN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBpdGVyYXRlZSwgY2IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgdGhlIGB0YXNrc2AgYXJyYXkgb2YgZnVuY3Rpb25zIGluIHNlcmllcywgZWFjaCBwYXNzaW5nIHRoZWlyIHJlc3VsdHMgdG9cbiAgICAgKiB0aGUgbmV4dCBpbiB0aGUgYXJyYXkuIEhvd2V2ZXIsIGlmIGFueSBvZiB0aGUgYHRhc2tzYCBwYXNzIGFuIGVycm9yIHRvIHRoZWlyXG4gICAgICogb3duIGNhbGxiYWNrLCB0aGUgbmV4dCBmdW5jdGlvbiBpcyBub3QgZXhlY3V0ZWQsIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzXG4gICAgICogaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqXG4gICAgICogQG5hbWUgd2F0ZXJmYWxsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZW1iZXJPZiBhc3luY1xuICAgICAqIEBjYXRlZ29yeSBDb250cm9sIEZsb3dcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0YXNrcyAtIEFuIGFycmF5IG9mIGZ1bmN0aW9ucyB0byBydW4sIGVhY2ggZnVuY3Rpb24gaXMgcGFzc2VkXG4gICAgICogYSBgY2FsbGJhY2soZXJyLCByZXN1bHQxLCByZXN1bHQyLCAuLi4pYCBpdCBtdXN0IGNhbGwgb24gY29tcGxldGlvbi4gVGhlXG4gICAgICogZmlyc3QgYXJndW1lbnQgaXMgYW4gZXJyb3IgKHdoaWNoIGNhbiBiZSBgbnVsbGApIGFuZCBhbnkgZnVydGhlciBhcmd1bWVudHNcbiAgICAgKiB3aWxsIGJlIHBhc3NlZCBhcyBhcmd1bWVudHMgaW4gb3JkZXIgdG8gdGhlIG5leHQgdGFzay5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gcnVuIG9uY2UgYWxsIHRoZVxuICAgICAqIGZ1bmN0aW9ucyBoYXZlIGNvbXBsZXRlZC4gVGhpcyB3aWxsIGJlIHBhc3NlZCB0aGUgcmVzdWx0cyBvZiB0aGUgbGFzdCB0YXNrJ3NcbiAgICAgKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGFzeW5jLndhdGVyZmFsbChbXG4gICAgICogICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJywgJ3R3bycpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihhcmcxLCBhcmcyLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXJnMSBub3cgZXF1YWxzICdvbmUnIGFuZCBhcmcyIG5vdyBlcXVhbHMgJ3R3bydcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICd0aHJlZScpO1xuICAgICAqICAgICB9LFxuICAgICAqICAgICBmdW5jdGlvbihhcmcxLCBjYWxsYmFjaykge1xuICAgICAqICAgICAgICAgLy8gYXJnMSBub3cgZXF1YWxzICd0aHJlZSdcbiAgICAgKiAgICAgICAgIGNhbGxiYWNrKG51bGwsICdkb25lJyk7XG4gICAgICogICAgIH1cbiAgICAgKiBdLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IG5vdyBlcXVhbHMgJ2RvbmUnXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiAvLyBPciwgd2l0aCBuYW1lZCBmdW5jdGlvbnM6XG4gICAgICogYXN5bmMud2F0ZXJmYWxsKFtcbiAgICAgKiAgICAgbXlGaXJzdEZ1bmN0aW9uLFxuICAgICAqICAgICBteVNlY29uZEZ1bmN0aW9uLFxuICAgICAqICAgICBteUxhc3RGdW5jdGlvbixcbiAgICAgKiBdLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgKiAgICAgLy8gcmVzdWx0IG5vdyBlcXVhbHMgJ2RvbmUnXG4gICAgICogfSk7XG4gICAgICogZnVuY3Rpb24gbXlGaXJzdEZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsICdvbmUnLCAndHdvJyk7XG4gICAgICogfVxuICAgICAqIGZ1bmN0aW9uIG15U2Vjb25kRnVuY3Rpb24oYXJnMSwgYXJnMiwgY2FsbGJhY2spIHtcbiAgICAgKiAgICAgLy8gYXJnMSBub3cgZXF1YWxzICdvbmUnIGFuZCBhcmcyIG5vdyBlcXVhbHMgJ3R3bydcbiAgICAgKiAgICAgY2FsbGJhY2sobnVsbCwgJ3RocmVlJyk7XG4gICAgICogfVxuICAgICAqIGZ1bmN0aW9uIG15TGFzdEZ1bmN0aW9uKGFyZzEsIGNhbGxiYWNrKSB7XG4gICAgICogICAgIC8vIGFyZzEgbm93IGVxdWFscyAndGhyZWUnXG4gICAgICogICAgIGNhbGxiYWNrKG51bGwsICdkb25lJyk7XG4gICAgICogfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdhdGVyZmFsbCAodGFza3MsIGNiKSB7XG4gICAgICAgIGNiID0gb25jZShjYiB8fCBub29wKTtcbiAgICAgICAgaWYgKCFpc0FycmF5KHRhc2tzKSkgcmV0dXJuIGNiKG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gd2F0ZXJmYWxsIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJykpO1xuICAgICAgICBpZiAoIXRhc2tzLmxlbmd0aCkgcmV0dXJuIGNiKCk7XG4gICAgICAgIHZhciB0YXNrSW5kZXggPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIG5leHRUYXNrKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmICh0YXNrSW5kZXggPT09IHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYi5hcHBseShudWxsLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRhc2tDYWxsYmFjayA9IG9ubHlPbmNlKHJlc3QoZnVuY3Rpb24gKGVyciwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiLmFwcGx5KG51bGwsIFtlcnJdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHRUYXNrKGFyZ3MpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBhcmdzLnB1c2godGFza0NhbGxiYWNrKTtcblxuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc1t0YXNrSW5kZXgrK107XG4gICAgICAgICAgICB0YXNrLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dFRhc2soW10pO1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IHtcbiAgICAgICAgYXBwbHlFYWNoOiBhcHBseUVhY2gsXG4gICAgICAgIGFwcGx5RWFjaFNlcmllczogYXBwbHlFYWNoU2VyaWVzLFxuICAgICAgICBhcHBseTogYXBwbHkkMSxcbiAgICAgICAgYXN5bmNpZnk6IGFzeW5jaWZ5LFxuICAgICAgICBhdXRvOiBhdXRvLFxuICAgICAgICBhdXRvSW5qZWN0OiBhdXRvSW5qZWN0LFxuICAgICAgICBjYXJnbzogY2FyZ28sXG4gICAgICAgIGNvbXBvc2U6IGNvbXBvc2UsXG4gICAgICAgIGNvbmNhdDogY29uY2F0LFxuICAgICAgICBjb25jYXRTZXJpZXM6IGNvbmNhdFNlcmllcyxcbiAgICAgICAgY29uc3RhbnQ6IGNvbnN0YW50LFxuICAgICAgICBkZXRlY3Q6IGRldGVjdCxcbiAgICAgICAgZGV0ZWN0TGltaXQ6IGRldGVjdExpbWl0LFxuICAgICAgICBkZXRlY3RTZXJpZXM6IGRldGVjdFNlcmllcyxcbiAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIGRvRHVyaW5nOiBkb0R1cmluZyxcbiAgICAgICAgZG9VbnRpbDogZG9VbnRpbCxcbiAgICAgICAgZG9XaGlsc3Q6IGRvV2hpbHN0LFxuICAgICAgICBkdXJpbmc6IGR1cmluZyxcbiAgICAgICAgZWFjaDogZWFjaCxcbiAgICAgICAgZWFjaExpbWl0OiBlYWNoTGltaXQsXG4gICAgICAgIGVhY2hPZjogZWFjaE9mLFxuICAgICAgICBlYWNoT2ZMaW1pdDogZWFjaE9mTGltaXQsXG4gICAgICAgIGVhY2hPZlNlcmllczogZWFjaE9mU2VyaWVzLFxuICAgICAgICBlYWNoU2VyaWVzOiBlYWNoU2VyaWVzLFxuICAgICAgICBlbnN1cmVBc3luYzogZW5zdXJlQXN5bmMsXG4gICAgICAgIGV2ZXJ5OiBldmVyeSxcbiAgICAgICAgZXZlcnlMaW1pdDogZXZlcnlMaW1pdCxcbiAgICAgICAgZXZlcnlTZXJpZXM6IGV2ZXJ5U2VyaWVzLFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZmlsdGVyTGltaXQ6IGZpbHRlckxpbWl0LFxuICAgICAgICBmaWx0ZXJTZXJpZXM6IGZpbHRlclNlcmllcyxcbiAgICAgICAgZm9yZXZlcjogZm9yZXZlcixcbiAgICAgICAgaXRlcmF0b3I6IGl0ZXJhdG9yJDEsXG4gICAgICAgIGxvZzogbG9nLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgbWFwTGltaXQ6IG1hcExpbWl0LFxuICAgICAgICBtYXBTZXJpZXM6IG1hcFNlcmllcyxcbiAgICAgICAgbWFwVmFsdWVzOiBtYXBWYWx1ZXMsXG4gICAgICAgIG1hcFZhbHVlc0xpbWl0OiBtYXBWYWx1ZXNMaW1pdCxcbiAgICAgICAgbWFwVmFsdWVzU2VyaWVzOiBtYXBWYWx1ZXNTZXJpZXMsXG4gICAgICAgIG1lbW9pemU6IG1lbW9pemUkMSxcbiAgICAgICAgbmV4dFRpY2s6IG5leHRUaWNrLFxuICAgICAgICBwYXJhbGxlbDogcGFyYWxsZWwsXG4gICAgICAgIHBhcmFsbGVsTGltaXQ6IHBhcmFsbGVsTGltaXQsXG4gICAgICAgIHByaW9yaXR5UXVldWU6IHByaW9yaXR5UXVldWUsXG4gICAgICAgIHF1ZXVlOiBxdWV1ZSQxLFxuICAgICAgICByYWNlOiByYWNlLFxuICAgICAgICByZWR1Y2U6IHJlZHVjZSxcbiAgICAgICAgcmVkdWNlUmlnaHQ6IHJlZHVjZVJpZ2h0LFxuICAgICAgICByZWZsZWN0OiByZWZsZWN0LFxuICAgICAgICByZWZsZWN0QWxsOiByZWZsZWN0QWxsLFxuICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgcmVqZWN0TGltaXQ6IHJlamVjdExpbWl0LFxuICAgICAgICByZWplY3RTZXJpZXM6IHJlamVjdFNlcmllcyxcbiAgICAgICAgcmV0cnk6IHJldHJ5LFxuICAgICAgICByZXRyeWFibGU6IHJldHJ5YWJsZSxcbiAgICAgICAgc2VxOiBzZXEsXG4gICAgICAgIHNlcmllczogc2VyaWVzLFxuICAgICAgICBzZXRJbW1lZGlhdGU6IHNldEltbWVkaWF0ZSQxLFxuICAgICAgICBzb21lOiBzb21lLFxuICAgICAgICBzb21lTGltaXQ6IHNvbWVMaW1pdCxcbiAgICAgICAgc29tZVNlcmllczogc29tZVNlcmllcyxcbiAgICAgICAgc29ydEJ5OiBzb3J0QnksXG4gICAgICAgIHRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgICAgIHRpbWVzOiB0aW1lcyxcbiAgICAgICAgdGltZXNMaW1pdDogdGltZUxpbWl0LFxuICAgICAgICB0aW1lc1NlcmllczogdGltZXNTZXJpZXMsXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICB1bm1lbW9pemU6IHVubWVtb2l6ZSxcbiAgICAgICAgdW50aWw6IHVudGlsLFxuICAgICAgICB3YXRlcmZhbGw6IHdhdGVyZmFsbCxcbiAgICAgICAgd2hpbHN0OiB3aGlsc3QsXG5cbiAgICAgICAgLy8gYWxpYXNlc1xuICAgICAgICBhbGw6IGV2ZXJ5LFxuICAgICAgICBhbnk6IHNvbWUsXG4gICAgICAgIGZvckVhY2g6IGVhY2gsXG4gICAgICAgIGZvckVhY2hTZXJpZXM6IGVhY2hTZXJpZXMsXG4gICAgICAgIGZvckVhY2hMaW1pdDogZWFjaExpbWl0LFxuICAgICAgICBmb3JFYWNoT2Y6IGVhY2hPZixcbiAgICAgICAgZm9yRWFjaE9mU2VyaWVzOiBlYWNoT2ZTZXJpZXMsXG4gICAgICAgIGZvckVhY2hPZkxpbWl0OiBlYWNoT2ZMaW1pdCxcbiAgICAgICAgaW5qZWN0OiByZWR1Y2UsXG4gICAgICAgIGZvbGRsOiByZWR1Y2UsXG4gICAgICAgIGZvbGRyOiByZWR1Y2VSaWdodCxcbiAgICAgICAgc2VsZWN0OiBmaWx0ZXIsXG4gICAgICAgIHNlbGVjdExpbWl0OiBmaWx0ZXJMaW1pdCxcbiAgICAgICAgc2VsZWN0U2VyaWVzOiBmaWx0ZXJTZXJpZXMsXG4gICAgICAgIHdyYXBTeW5jOiBhc3luY2lmeVxuICAgIH07XG5cbiAgICBleHBvcnRzWydkZWZhdWx0J10gPSBpbmRleDtcbiAgICBleHBvcnRzLmFwcGx5RWFjaCA9IGFwcGx5RWFjaDtcbiAgICBleHBvcnRzLmFwcGx5RWFjaFNlcmllcyA9IGFwcGx5RWFjaFNlcmllcztcbiAgICBleHBvcnRzLmFwcGx5ID0gYXBwbHkkMTtcbiAgICBleHBvcnRzLmFzeW5jaWZ5ID0gYXN5bmNpZnk7XG4gICAgZXhwb3J0cy5hdXRvID0gYXV0bztcbiAgICBleHBvcnRzLmF1dG9JbmplY3QgPSBhdXRvSW5qZWN0O1xuICAgIGV4cG9ydHMuY2FyZ28gPSBjYXJnbztcbiAgICBleHBvcnRzLmNvbXBvc2UgPSBjb21wb3NlO1xuICAgIGV4cG9ydHMuY29uY2F0ID0gY29uY2F0O1xuICAgIGV4cG9ydHMuY29uY2F0U2VyaWVzID0gY29uY2F0U2VyaWVzO1xuICAgIGV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbiAgICBleHBvcnRzLmRldGVjdCA9IGRldGVjdDtcbiAgICBleHBvcnRzLmRldGVjdExpbWl0ID0gZGV0ZWN0TGltaXQ7XG4gICAgZXhwb3J0cy5kZXRlY3RTZXJpZXMgPSBkZXRlY3RTZXJpZXM7XG4gICAgZXhwb3J0cy5kaXIgPSBkaXI7XG4gICAgZXhwb3J0cy5kb0R1cmluZyA9IGRvRHVyaW5nO1xuICAgIGV4cG9ydHMuZG9VbnRpbCA9IGRvVW50aWw7XG4gICAgZXhwb3J0cy5kb1doaWxzdCA9IGRvV2hpbHN0O1xuICAgIGV4cG9ydHMuZHVyaW5nID0gZHVyaW5nO1xuICAgIGV4cG9ydHMuZWFjaCA9IGVhY2g7XG4gICAgZXhwb3J0cy5lYWNoTGltaXQgPSBlYWNoTGltaXQ7XG4gICAgZXhwb3J0cy5lYWNoT2YgPSBlYWNoT2Y7XG4gICAgZXhwb3J0cy5lYWNoT2ZMaW1pdCA9IGVhY2hPZkxpbWl0O1xuICAgIGV4cG9ydHMuZWFjaE9mU2VyaWVzID0gZWFjaE9mU2VyaWVzO1xuICAgIGV4cG9ydHMuZWFjaFNlcmllcyA9IGVhY2hTZXJpZXM7XG4gICAgZXhwb3J0cy5lbnN1cmVBc3luYyA9IGVuc3VyZUFzeW5jO1xuICAgIGV4cG9ydHMuZXZlcnkgPSBldmVyeTtcbiAgICBleHBvcnRzLmV2ZXJ5TGltaXQgPSBldmVyeUxpbWl0O1xuICAgIGV4cG9ydHMuZXZlcnlTZXJpZXMgPSBldmVyeVNlcmllcztcbiAgICBleHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcbiAgICBleHBvcnRzLmZpbHRlckxpbWl0ID0gZmlsdGVyTGltaXQ7XG4gICAgZXhwb3J0cy5maWx0ZXJTZXJpZXMgPSBmaWx0ZXJTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JldmVyID0gZm9yZXZlcjtcbiAgICBleHBvcnRzLml0ZXJhdG9yID0gaXRlcmF0b3IkMTtcbiAgICBleHBvcnRzLmxvZyA9IGxvZztcbiAgICBleHBvcnRzLm1hcCA9IG1hcDtcbiAgICBleHBvcnRzLm1hcExpbWl0ID0gbWFwTGltaXQ7XG4gICAgZXhwb3J0cy5tYXBTZXJpZXMgPSBtYXBTZXJpZXM7XG4gICAgZXhwb3J0cy5tYXBWYWx1ZXMgPSBtYXBWYWx1ZXM7XG4gICAgZXhwb3J0cy5tYXBWYWx1ZXNMaW1pdCA9IG1hcFZhbHVlc0xpbWl0O1xuICAgIGV4cG9ydHMubWFwVmFsdWVzU2VyaWVzID0gbWFwVmFsdWVzU2VyaWVzO1xuICAgIGV4cG9ydHMubWVtb2l6ZSA9IG1lbW9pemUkMTtcbiAgICBleHBvcnRzLm5leHRUaWNrID0gbmV4dFRpY2s7XG4gICAgZXhwb3J0cy5wYXJhbGxlbCA9IHBhcmFsbGVsO1xuICAgIGV4cG9ydHMucGFyYWxsZWxMaW1pdCA9IHBhcmFsbGVsTGltaXQ7XG4gICAgZXhwb3J0cy5wcmlvcml0eVF1ZXVlID0gcHJpb3JpdHlRdWV1ZTtcbiAgICBleHBvcnRzLnF1ZXVlID0gcXVldWUkMTtcbiAgICBleHBvcnRzLnJhY2UgPSByYWNlO1xuICAgIGV4cG9ydHMucmVkdWNlID0gcmVkdWNlO1xuICAgIGV4cG9ydHMucmVkdWNlUmlnaHQgPSByZWR1Y2VSaWdodDtcbiAgICBleHBvcnRzLnJlZmxlY3QgPSByZWZsZWN0O1xuICAgIGV4cG9ydHMucmVmbGVjdEFsbCA9IHJlZmxlY3RBbGw7XG4gICAgZXhwb3J0cy5yZWplY3QgPSByZWplY3Q7XG4gICAgZXhwb3J0cy5yZWplY3RMaW1pdCA9IHJlamVjdExpbWl0O1xuICAgIGV4cG9ydHMucmVqZWN0U2VyaWVzID0gcmVqZWN0U2VyaWVzO1xuICAgIGV4cG9ydHMucmV0cnkgPSByZXRyeTtcbiAgICBleHBvcnRzLnJldHJ5YWJsZSA9IHJldHJ5YWJsZTtcbiAgICBleHBvcnRzLnNlcSA9IHNlcTtcbiAgICBleHBvcnRzLnNlcmllcyA9IHNlcmllcztcbiAgICBleHBvcnRzLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZSQxO1xuICAgIGV4cG9ydHMuc29tZSA9IHNvbWU7XG4gICAgZXhwb3J0cy5zb21lTGltaXQgPSBzb21lTGltaXQ7XG4gICAgZXhwb3J0cy5zb21lU2VyaWVzID0gc29tZVNlcmllcztcbiAgICBleHBvcnRzLnNvcnRCeSA9IHNvcnRCeTtcbiAgICBleHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIGV4cG9ydHMudGltZXMgPSB0aW1lcztcbiAgICBleHBvcnRzLnRpbWVzTGltaXQgPSB0aW1lTGltaXQ7XG4gICAgZXhwb3J0cy50aW1lc1NlcmllcyA9IHRpbWVzU2VyaWVzO1xuICAgIGV4cG9ydHMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIGV4cG9ydHMudW5tZW1vaXplID0gdW5tZW1vaXplO1xuICAgIGV4cG9ydHMudW50aWwgPSB1bnRpbDtcbiAgICBleHBvcnRzLndhdGVyZmFsbCA9IHdhdGVyZmFsbDtcbiAgICBleHBvcnRzLndoaWxzdCA9IHdoaWxzdDtcbiAgICBleHBvcnRzLmFsbCA9IGV2ZXJ5O1xuICAgIGV4cG9ydHMuYWxsTGltaXQgPSBldmVyeUxpbWl0O1xuICAgIGV4cG9ydHMuYWxsU2VyaWVzID0gZXZlcnlTZXJpZXM7XG4gICAgZXhwb3J0cy5hbnkgPSBzb21lO1xuICAgIGV4cG9ydHMuYW55TGltaXQgPSBzb21lTGltaXQ7XG4gICAgZXhwb3J0cy5hbnlTZXJpZXMgPSBzb21lU2VyaWVzO1xuICAgIGV4cG9ydHMuZmluZCA9IGRldGVjdDtcbiAgICBleHBvcnRzLmZpbmRMaW1pdCA9IGRldGVjdExpbWl0O1xuICAgIGV4cG9ydHMuZmluZFNlcmllcyA9IGRldGVjdFNlcmllcztcbiAgICBleHBvcnRzLmZvckVhY2ggPSBlYWNoO1xuICAgIGV4cG9ydHMuZm9yRWFjaFNlcmllcyA9IGVhY2hTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JFYWNoTGltaXQgPSBlYWNoTGltaXQ7XG4gICAgZXhwb3J0cy5mb3JFYWNoT2YgPSBlYWNoT2Y7XG4gICAgZXhwb3J0cy5mb3JFYWNoT2ZTZXJpZXMgPSBlYWNoT2ZTZXJpZXM7XG4gICAgZXhwb3J0cy5mb3JFYWNoT2ZMaW1pdCA9IGVhY2hPZkxpbWl0O1xuICAgIGV4cG9ydHMuaW5qZWN0ID0gcmVkdWNlO1xuICAgIGV4cG9ydHMuZm9sZGwgPSByZWR1Y2U7XG4gICAgZXhwb3J0cy5mb2xkciA9IHJlZHVjZVJpZ2h0O1xuICAgIGV4cG9ydHMuc2VsZWN0ID0gZmlsdGVyO1xuICAgIGV4cG9ydHMuc2VsZWN0TGltaXQgPSBmaWx0ZXJMaW1pdDtcbiAgICBleHBvcnRzLnNlbGVjdFNlcmllcyA9IGZpbHRlclNlcmllcztcbiAgICBleHBvcnRzLndyYXBTeW5jID0gYXN5bmNpZnk7XG5cbn0pKTsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxuICB0cnkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG59ICgpKVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gY2FjaGVkU2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHVwZGF0ZXIgZnJvbSAnLi91cGRhdGVyJztcblxuZnVuY3Rpb24gbWFrZUNhbGwodXJsLCBmZXRjaE9wdGlvbnMpIHtcbiAgY29uc3QgdGhhdCA9IHRoaXM7XG4gIGNvbnN0IGV2ZW50TmFtZSA9IGZldGNoT3B0aW9ucy5ldmVudE5hbWUgfHwgdGhhdC5zdG9yZUlkO1xuICBsZXQgcmVzcG9uc2UgPSB7fTtcbiAgZmV0Y2godXJsLCBmZXRjaE9wdGlvbnMpXG4gIC50aGVuKHJlcyA9PiB7XG4gICAgcmVzcG9uc2Uuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICByZXNwb25zZS5vayA9IHJlcy5vaztcbiAgICBpZighL2FwcGxpY2F0aW9uXFwvanNvbi8udGVzdChyZXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgcmV0dXJuIHJlcy50ZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiByZXMuanNvbigpO1xuICB9KVxuICAudGhlbihyZXNwID0+IHtcbiAgICBpZighcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IHJlc3A7XG4gICAgfVxuICAgIGlmKGZldGNoT3B0aW9ucy5wcm9wTmFtZSkge1xuICAgICAgdGhhdC5hY3Rpb25zLnNldChmZXRjaE9wdGlvbnMucHJvcE5hbWUsICByZXNwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlci51cGRhdGUoZXZlbnROYW1lLCByZXNwKTtcbiAgICAgIGlmKHR5cGVvZiBmZXRjaE9wdGlvbnMub25TdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZldGNoT3B0aW9ucy5vblN1Y2Nlc3MocmVzcCk7XG4gICAgICB9XG4gICAgfVxuICB9KVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICB1cGRhdGVyLnVwZGF0ZShmZXRjaE9wdGlvbnMuZXJyb3JFdmVudCwgZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVmYXVsdFByb3BzKSB7XG4gICAgaWYoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RvcmUgY29uc3RydWN0b3IgZXhwZWN0cyBuYW1lIGFzIGZpcnN0IGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuc3RvcmVOYW1lID0gbmFtZTtcbiAgICB0aGlzLnByb3BzID0gZGVmYXVsdFByb3BzIHx8IHt9O1xuICAgIHRoaXMuc3RvcmVJZCA9IChEYXRlLm5vdygpICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA2NDc0KSkudG9TdHJpbmcoMTYpO1xuICAgIHRoaXMuZmV0Y2hBY3Rpb25zID0ge307XG4gICAgdGhpcy5mb3JtcyA9IHt9O1xuICAgIHRoaXMuaW5wdXRzID0ge307XG4gICAgdGhpcy5hY3Rpb25zID0ge1xuICAgICAgZ2V0KHByb3BOYW1lKSB7XG4gICAgICAgIGxldCByZXR1cm5Qcm9wID0gdGhhdC5wcm9wc1twcm9wTmFtZV07XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSBgJHt0aGF0LnN0b3JlTmFtZX0tJHtwcm9wTmFtZX1gO1xuXG4gICAgICAgIGlmKCFyZXR1cm5Qcm9wKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVyblByb3AgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm5Qcm9wID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXJldHVyblByb3ApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuUHJvcCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuUHJvcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5Qcm9wO1xuICAgICAgfSxcbiAgICAgIGdldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoYXQucHJvcHM7XG4gICAgICB9LFxuICAgICAgc2V0KHByb3BOYW1lLCB2YWx1ZSwgYXV0b1VwZGF0ZSA9IHRydWUsIHBlcnNpc3QpIHtcbiAgICAgICAgdGhhdC5wcm9wc1twcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgY29uc3Qgc3RvcmFnZUtleSA9IGAke3RoYXQuc3RvcmVOYW1lfS0ke3Byb3BOYW1lfWA7XG4gICAgICAgIGlmKHBlcnNpc3QgPT09IHRydWUpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZihwZXJzaXN0ID09PSAnc2Vzc2lvbicpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihhdXRvVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgdXBkYXRlci51cGRhdGUodGhhdC5zdG9yZUlkLCBwcm9wTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuZ2V0ID0gdGhpcy5hY3Rpb25zLmdldDtcbiAgICB0aGlzLnNldCA9IHRoaXMuYWN0aW9ucy5zZXQ7XG4gICAgdGhpcy5nZXRBbGwgPSB0aGlzLmFjdGlvbnMuZ2V0QWxsO1xuICB9XG5cbiAgYWRkRXJyb3JDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHVwZGF0ZXIucmVnaXN0ZXIoYCR7dGhpcy5zdG9yZUlkfS1lcnJvcmAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdXBkYXRlci5yZWdpc3Rlcih0aGlzLnN0b3JlSWQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGFkZEFjdGlvbihhY3Rpb25OYW1lLCBhY3Rpb24sIGF1dG9VcGF0ZSA9IHRydWUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBpZih0eXBlb2YgYWN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcignU3RvcmUgYWRkQWN0aW9uIGludmFsaWQgYXJndW1lbnQgdHlwZSAtIEFjdGlvbnMgbXVzdCBiZSBmdW5jdGlvbnMnKTtcbiAgICB9XG4gICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGFjdGlvbi5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgIGlmKGF1dG9VcGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVyLnVwZGF0ZSh0aGF0LnN0b3JlSWQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBhZGRJbnB1dChpbnB1dCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuaW5wdXRzW2lucHV0XSA9IHtcbiAgICAgIG9uQ2hhbmdlOiBldiA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXRzW2lucHV0XS52YWx1ZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdXBkYXRlci51cGRhdGUodGhhdC5zdG9yZUlkLCBpbnB1dCk7XG4gICAgICB9LFxuICAgICAgdmFsdWU6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGdldEluaXRhbEZvcm1TdGF0ZShmaWVsZE5hbWVzKSB7XG4gICAgY29uc3QgZmllbGRzID0ge307XG4gICAgZmllbGROYW1lcy5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICBmaWVsZHNbZmllbGROYW1lXSA9IHtcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgb25DaGFuZ2U6IF8gPT4ge31cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4geyBmaWVsZHMsIG9uU3VibWl0OiBfID0+IHt9IH07XG4gIH1cblxuICBhZGRGb3JtKG9wdGlvbnMpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBpZighQXJyYXkuaXNBcnJheShvcHRpb25zLmZpZWxkcykpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmVycm9yKCdhZGRGb3JtIHJlcXVpcmVzIGFuIGFycmF5IG9mIGZpZWxkcyBuYW1lcyBhcyBpdFxcJ3Mgc2Vjb25kIGFndW1lbnQnKTtcbiAgICB9XG4gICAgbGV0IGV2ZW50TmFtZSA9IHRoYXQuc3RvcmVJZDtcbiAgICBcblxuICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXSA9IHtcbiAgICAgIGdldEZvcm0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZmllbGRzOiB0aGlzLmZpZWxkcyxcbiAgICAgICAgICBvblN1Ym1pdDogdGhpcy5vblN1Ym1pdFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGZpZWxkczoge30sXG4gICAgICBvblN1Ym1pdDogZXYgPT4ge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBib2R5ID0ge307XG4gICAgICAgIGxldCBlcnJvciA9IGZhbHNlO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZvcm1zW29wdGlvbnMubmFtZV0uZmllbGRzO1xuICAgICAgICAgIGlmKGZpZWxkc1tmaWVsZF0ucmVxdWlyZWQgJiYgIWZpZWxkc1tmaWVsZF0udmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGRdLmVycm9yID0gYFRoZSAke2ZpZWxkfSBmaWVsZCBpcyByZXF1aXJlZGA7XG4gICAgICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGRdLmVycm9yID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYm9keVtmaWVsZF0gPSBmaWVsZHNbZmllbGRdLnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYoZXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlci51cGRhdGUoZXZlbnROYW1lLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuZmV0Y2hBY3Rpb25zW2ZldGNoQWN0aW9uTmFtZV0oe1xuICAgICAgICAgIGJvZHlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvcHRpb25zLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIHRoaXMuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGQubmFtZV0gPSB7XG4gICAgICAgIHZhbHVlOiB0eXBlb2YgZmllbGQuZGVmYXVsdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogZmllbGQuZGVmYXVsdCxcbiAgICAgICAgcmVxdWlyZWQ6IGZpZWxkLnJlcXVpcmVkIHx8IGZhbHNlLFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgb25DaGFuZ2U6IGV2ID0+IHtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICAgICAgaWYoZXYudGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZXYudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoYXQuZm9ybXNbb3B0aW9ucy5uYW1lXS5maWVsZHNbZmllbGQubmFtZV0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB1cGRhdGVyLnVwZGF0ZShldmVudE5hbWUsIGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmKHR5cGVvZiBvcHRpb25zLm9uVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldmVudE5hbWUgPSBgJHt0aGF0LnN0b3JlSWR9LWZvcm1gO1xuICAgICAgdXBkYXRlci5yZWdpc3RlcihldmVudE5hbWUsIG9wdGlvbnMub25VcGRhdGUpO1xuICAgICAgdXBkYXRlci5yZWdpc3RlcihgJHtldmVudE5hbWV9LWVycm9yYCwgb3B0aW9ucy5vblVwZGF0ZSk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1FcnJvckV2ZW50TmFtZSA9IGAke2V2ZW50TmFtZX0tZm9ybS1lcnJvcmA7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMuZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdXBkYXRlci5yZWdpc3RlcihldmVudE5hbWUsIG9wdGlvbnMub25VcGRhdGUpO1xuICAgICAgdXBkYXRlci5yZWdpc3Rlcihmb3JtRXJyb3JFdmVudE5hbWUsIG9wdGlvbnMuZXJyb3JDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25TdWNjZXNzID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgICB1cGRhdGVyLnVucmVnaXN0ZXIoZXZlbnROYW1lKVxuICAgICAgb3B0aW9ucy5vblN1Y2Nlc3ModmFsKTtcbiAgICAgIHRoaXMuZm9ybXNbbmFtZV0gPSB7fTtcbiAgICB9LmJpbmQodGhpcywgb3B0aW9ucy5uYW1lKTtcblxuICAgIGNvbnN0IGZldGNoQWN0aW9uTmFtZSA9IGAke29wdGlvbnMubmFtZX0tZm9ybWA7XG4gICAgdGhhdC5hZGRGZXRjaEFjdGlvbihmZXRjaEFjdGlvbk5hbWUsIHsgXG4gICAgICB1cmw6IG9wdGlvbnMudXJsLCBcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLCBldmVudE5hbWUsIFxuICAgICAgZXJyb3JFdmVudDogZm9ybUVycm9yRXZlbnROYW1lLCBcbiAgICAgIG9uU3VjY2Vzczogb25TdWNjZXNzIFxuICAgIH0pO1xuICB9XG5cbiAgYWRkRmV0Y2hBY3Rpb24oYWN0aW9uTmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgdGhhdC5mZXRjaEFjdGlvbnNbYWN0aW9uTmFtZV0gPSAocmVxdWVzdCkgPT4ge1xuICAgICAgY29uc3QgZmV0Y2hPcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgZXZlbnROYW1lOiBvcHRpb25zLmV2ZW50TmFtZSB8fCB0aGF0LnN0b3JlSWQsXG4gICAgICAgIGVycm9yRXZlbnQ6IG9wdGlvbnMuZXJyb3JFdmVudCB8fCBgJHt0aGF0LnN0b3JlSWR9LWVycm9yYCxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIG9uU3VjY2Vzczogb3B0aW9ucy5vblN1Y2Nlc3NcbiAgICAgIH07XG4gICAgICBpZihyZXF1ZXN0ICYmIHJlcXVlc3QuYm9keSkge1xuICAgICAgICBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBidWlsZFVybCh1cmwsIHVybEFyZ3MpIHtcbiAgICAgICAgaWYoIXVybEFyZ3MpIHJldHVybiB1cmw7XG4gICAgICAgIE9iamVjdC5rZXlzKHVybEFyZ3MpLmZvckVhY2goYXJnS2V5ID0+IHtcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShhcmdLZXksIHVybEFyZ3NbYXJnS2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cmxBcmdzID0gcmVxdWVzdCAmJiByZXF1ZXN0LnVybEFyZ3M7XG4gICAgICBjb25zdCB1cmwgPSBidWlsZFVybChvcHRpb25zLnVybCwgdXJsQXJncyk7XG4gICAgICBtYWtlQ2FsbC5jYWxsKHRoYXQsIHVybCwgZmV0Y2hPcHRpb25zKTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG53aW5kb3cuU3RvcmUgPSBTdG9yZTsiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcblxuY29uc3QgdXBkYXRlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgIGRlZmF1bHQ6IFtdXG4gIH07XG5cbiAgY29uc3QgdW5yZWdpc3RlciA9IGV2ZW50TmFtZSA9PiB7XG4gICAgZGVsZXRlIGNhbGxiYWNrc1tldmVudE5hbWVdO1xuICB9XG5cbiAgY29uc3QgcmVnaXN0ZXIgPSAoZXZlbnQsIGNhbGxiYWNrKSA9PiB7XG4gICAgbGV0IGV2ZW50TmFtZSA9ICdkZWZhdWx0JztcbiAgICBpZiAodHlwZW9mIGV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGV2ZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgZXZlbnROYW1lID0gZXZlbnQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICBjYWxsYmFja3NbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICBlbWl0dGVyLm9uKGV2ZW50TmFtZSwgKHByb3ApID0+IHtcbiAgICAgIGFzeW5jLmVhY2goY2FsbGJhY2tzW2V2ZW50TmFtZV0sIChjYWxsYmFjaykgPT4ge1xuICAgICAgICBjYWxsYmFjayhwcm9wKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH07XG5cbiAgY29uc3Qgb25FdmVudCA9ICgpID0+IHtcbiAgICBhc3luYy5lYWNoKGNhbGxiYWNrcy5kZWZhdWx0LCAoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07ICBcblxuICBlbWl0dGVyLm9uKCd1cGRhdGUnLCBvbkV2ZW50KTtcblxuICBjb25zdCB1cGRhdGUgPSAoZXZlbnQsIHByb3ApID0+IHtcbiAgICBpZiAoIWV2ZW50KSB7XG4gICAgICBldmVudCA9ICd1cGRhdGUnO1xuICAgIH1cblxuICAgIGVtaXR0ZXIuZW1pdChldmVudCwgcHJvcCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWdpc3RlcjogcmVnaXN0ZXIsXG4gICAgdW5yZWdpc3RlcjogdW5yZWdpc3RlcixcbiAgICB1cGRhdGU6IHVwZGF0ZVxuICB9XG59KSgpO1xuIl19
