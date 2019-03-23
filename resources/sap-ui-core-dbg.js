/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global Node, window */
/*
 * A polyfill for document.baseURI (mainly targeting IE11).
 *
 * Implemented as a property getter to also support dynamically created &lt;base&gt; tags.
 */
if ( !('baseURI' in Node.prototype) ) {
	Object.defineProperty(Node.prototype, 'baseURI', {
		get: function() {
			var doc = this.ownerDocument || this, // a Document node returns ownerDocument null
				// look for first base tag with an href attribute
				// (https://html.spec.whatwg.org/multipage/urls-and-fetching.html#document-base-url )
				baseOrLoc = doc.querySelector("base[href]") || window.location;
			return baseOrLoc.href;
		},
		configurable: true
	});
}
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
  */
// Note: despite its file name, this is the es6-promise-auto.js variant of es6-promise.

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	// ##### BEGIN: MODIFIED BY SAP
	// provide an id during registration and always register to global
	// Original lines:
	// typeof define === 'function' && define.amd ? define(factory) :
	// (global.ES6Promise = factory());
	// Modified lines:
	typeof define === 'function' && define.amd ? define('sap/ui/thirdparty/es6-promise', factory) : null;
	global.ES6Promise = factory();
	// ##### END: MODIFIED BY SAP
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$2) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      // ##### BEGIN: MODIFIED BY SAP
      // Original Line:
      // this._willSettleAt(resolve$$1(entry), i);
      this._willSettleAt(c.resolve(entry), i);
      // ##### END: MODIFIED BY SAP
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$2 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves

    Synchronous example:

    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }

    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```

    Asynchronous example:

    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```

    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    // ##### BEGIN: MODIFIED BY SAP
    // According to the spec, 'callback' is optional, it might not be callable
    // see https://tc39.github.io/proposal-promise-finally/
    if ( isFunction(callback) ) {
    // ##### END: MODIFIED BY SAP

      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });

    // ##### BEGIN: MODIFIED BY SAP
    }

	return promise.then(callback, callback);
    // ##### END: MODIFIED BY SAP

  };

  return Promise;
}();

Promise$2.prototype.then = then;
Promise$2.all = all;
Promise$2.race = race;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      // ##### BEGIN: MODIFIED BY SAP
      // apply polyfill for finally when missing
      if ( typeof P.prototype.finally !== "function" ) {
        P.prototype.finally = Promise$2.prototype.finally;
      }
      // ##### END: MODIFIED BY SAP
      return;
    }
  }

  local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill;
Promise$2.Promise = Promise$2;

Promise$2.polyfill();

return Promise$2;

})));
/**
 * This module contains String polyfills in order to establish unified language features across environments
 */

/** @license
 * String.prototype.startsWith <https://github.com/mathiasbynens/String.prototype.startsWith>
 * MIT License
 * @author Mathias Bynens
 * @version v0.2.0
 */
if (!String.prototype.startsWith) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var toString = {}.toString;
		var startsWith = function(search) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			if (search && toString.call(search) == '[object RegExp]') {
				throw TypeError();
			}
			var stringLength = string.length;
			var searchString = String(search);
			var searchLength = searchString.length;
			var position = arguments.length > 1 ? arguments[1] : undefined;
			// `ToInteger`
			var pos = position ? Number(position) : 0;
			if (pos != pos) { // better `isNaN`
				pos = 0;
			}
			var start = Math.min(Math.max(pos, 0), stringLength);
			// Avoid the `indexOf` call if no match is possible
			if (searchLength + start > stringLength) {
				return false;
			}
			var index = -1;
			while (++index < searchLength) {
				if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
					return false;
				}
			}
			return true;
		};
		Object.defineProperty(String.prototype, 'startsWith', {
			'value': startsWith,
			'configurable': true,
			'writable': true
		});
	}());
}

/** @license
 * String.prototype.endsWith <https://github.com/mathiasbynens/String.prototype.endsWith>
 * MIT License
 * @author Mathias Bynens
 * @version v0.2.0
 */
if (!String.prototype.endsWith) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var toString = {}.toString;
		var endsWith = function(search) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			if (search && toString.call(search) == '[object RegExp]') {
				throw TypeError();
			}
			var stringLength = string.length;
			var searchString = String(search);
			var searchLength = searchString.length;
			var pos = stringLength;
			if (arguments.length > 1) {
				var position = arguments[1];
				if (position !== undefined) {
					// `ToInteger`
					pos = position ? Number(position) : 0;
					if (pos != pos) { // better `isNaN`
						pos = 0;
					}
				}
			}
			var end = Math.min(Math.max(pos, 0), stringLength);
			var start = end - searchLength;
			if (start < 0) {
				return false;
			}
			var index = -1;
			while (++index < searchLength) {
				if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
					return false;
				}
			}
			return true;
		};
		Object.defineProperty(String.prototype, 'endsWith', {
			'value': endsWith,
			'configurable': true,
			'writable': true
		});
	}());
}

/** @license
 * String.prototype.includes <https://github.com/mathiasbynens/String.prototype.includes>
 * MIT License
 * @author Mathias Bynens
 * @version v1.0.0
 */
if (!String.prototype.includes) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var toString = {}.toString;
		var indexOf = ''.indexOf;
		var includes = function(search) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			if (search && toString.call(search) == '[object RegExp]') {
				throw TypeError();
			}
			var stringLength = string.length;
			var searchString = String(search);
			var searchLength = searchString.length;
			var position = arguments.length > 1 ? arguments[1] : undefined;
			// `ToInteger`
			var pos = position ? Number(position) : 0;
			if (pos != pos) { // better `isNaN`
				pos = 0;
			}
			var start = Math.min(Math.max(pos, 0), stringLength);
			// Avoid the `indexOf` call if no match is possible
			if (searchLength + start > stringLength) {
				return false;
			}
			return indexOf.call(string, searchString, pos) != -1;
		};
		Object.defineProperty(String.prototype, 'includes', {
			'value': includes,
			'configurable': true,
			'writable': true
		});
	}());
}

/** @license
 * String.prototype.repeat <https://github.com/mathiasbynens/String.prototype.repeat>
 * MIT License
 * @author Mathias Bynens
 * @version v0.2.0
 */
if (!String.prototype.repeat) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var repeat = function(count) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			// `ToInteger`
			var n = count ? Number(count) : 0;
			if (n != n) { // better `isNaN`
				n = 0;
			}
			// Account for out-of-bounds indices
			if (n < 0 || n == Infinity) {
				throw RangeError();
			}
			var result = '';
			while (n) {
				if (n % 2 == 1) {
					result += string;
				}
				if (n > 1) {
					string += string;
				}
				n >>= 1;
			}
			return result;
		};
		Object.defineProperty(String.prototype, 'repeat', {
			'value': repeat,
			'configurable': true,
			'writable': true
		});
	}());
}

/** @license
 * String.prototype.padStart <https://github.com/uxitten/polyfill>
 * MIT License
 * @author Behnam Mohammadi
 * @version v1.0.1
 */
if (!String.prototype.padStart) {
	String.prototype.padStart = function padStart(targetLength, padString) {
		targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
		padString = String((typeof padString !== 'undefined' ? padString : ' '));
		if (this.length > targetLength) {
			return String(this);
		}
		else {
			targetLength = targetLength - this.length;
			if (targetLength > padString.length) {
				padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
			}
			return padString.slice(0, targetLength) + String(this);
		}
	};
}

/** @license
 * String.prototype.padEnd <https://github.com/uxitten/polyfill>
 * MIT License
 * @author Behnam Mohammadi
 * @version v1.0.1
 */
if (!String.prototype.padEnd) {
	String.prototype.padEnd = function padEnd(targetLength, padString) {
		targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
		padString = String((typeof padString !== 'undefined' ? padString : ' '));
		if (this.length > targetLength) {
			return String(this);
		}
		else {
			targetLength = targetLength - this.length;
			if (targetLength > padString.length) {
				padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
			}
			return String(this) + padString.slice(0, targetLength);
		}
	};
}
/**
 * Code copied from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			target = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							target[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return target;
		},
		writable: true,
		configurable: true
	});
}
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*
 * IMPORTANT NOTICE
 * With 1.54, ui5loader.js and its new features are not yet a public API.
 * The loader must only be used via the well-known and documented UI5 APIs
 * such as sap.ui.define, sap.ui.require, etc.
 * Any direct usage of ui5loader.js or its features is not supported and
 * might break in future releases.
 */

/*global sap:true, console, document, Promise, XMLHttpRequest */

(function(__global) {
	"use strict";

	/*
	 * Helper function that removes any query and/or hash parts from the given URL.
	 *
	 * @param {string} href URL to remove query and hash from
	 * @returns {string}
	 */
	function pathOnly(href) {
		var p = href.search(/[?#]/);
		return p < 0 ? href : href.slice(0, p);
	}

	/*
	 * Helper function that returns the document base URL without search parameters and hash.
	 *
	 * @returns {string}
	 */
	function docBase() {
		return pathOnly(document.baseURI);
	}

	/**
	 * Resolve a given URL, either against the base URL of the current document or against a given base URL.
	 *
	 * If no base URL is given, the URL will be resolved relative to the baseURI of the current document.
	 * If a base URL is given, that base will first be resolved relative to the document's baseURI,
	 * then the URL will be resolved relative to the resolved base.
	 *
	 * @param {string} sURI Relative or absolute URL that should be resolved
	 * @param {string} [sBase=document.baseURI] Base URL relative to which the URL should be resolved
	 * @returns {string} Resolved URL
	 */
	var resolveURL = (function(_URL) {

		// feature check: URI support
		// - can URL be used as a constructor (fails in IE 11)?
		// - does toString() return the expected URL string (fails in PhantomJS 2.1)?
		try {
			if ( !/localhost/.test(new _URL('index.html', 'http://localhost:8080/')) ) {
				_URL = null;
			}
		} catch (e) {
			_URL = null;
		}

		if ( _URL ) {
			return function(sURI, sBase) {
				// For a spec see https://url.spec.whatwg.org/
				// For browser support see https://developer.mozilla.org/en/docs/Web/API/URL
				return new _URL(sURI, sBase ? new _URL(sBase, docBase()) : docBase()).toString();
			};
		}

		// fallback for IE11 and PhantomJS: use a shadow document with <base> and <a>nchor tag
		var doc = document.implementation.createHTMLDocument("Dummy doc for resolveURI");
		var base = doc.createElement('base');
		base.href = docBase();
		doc.head.appendChild(base);
		var anchor = doc.createElement("A");
		doc.body.appendChild(anchor);

		return function (sURI, sBase) {
			base.href = docBase();
			if ( sBase != null ) {
				// first resolve sBase relative to location
				anchor.href = sBase;
				// then use it as base
				base.href = anchor.href;
			}
			anchor.href = sURI;
			// console.log("(" + sURI + "," + sBase + ") => (" + base.href + "," + anchor.href + ")");
			return anchor.href;
		};

	}(__global.URL || __global.webkitURL));

	// ---- helpers -------------------------------------------------------------------------------

	function noop() {}

	function forEach(obj, callback) {
		Object.keys(obj).forEach(function(key) {
			callback(key, obj[key]);
		});
	}

	// ---- hooks & configuration -----------------------------------------------------------------

	/**
	 * Log functionality.
	 *
	 * Can be set to an object with the methods shown below (subset of sap/base/Log).
	 * Logging methods never must fail. Should they ever throw errors, then the internal state
	 * of the loader will be broken.
	 *
	 * By default, all methods are implemented as NOOPs.
	 *
	 * @type {{debug:function(),info:function(),warning:function(),error:function(),isLoggable:function():boolean}}
	 * @private
	 */
	var log = {
		debug: noop,
		info: noop,
		warning: noop,
		error: noop,
		isLoggable: noop
	}; // Null Object pattern: dummy logger which is used as long as no logger is injected

	/**
	 * Basic assert functionality.
	 *
	 * Can be set to a function that gets a value (the expression t be asserted) as first
	 * parameter and a message as second parameter. When the expression coerces to false,
	 * the assertion is violated and the message should be emitted (logged, thrown, whatever).
	 *
	 * By default, this is implemented as a NOOP.
	 * @type {function(any,string)}
	 * @private
	 */
	var assert = noop; // Null Object pattern: dummy assert which is used as long as no assert is injected

	/**
	 * Callback for performance measurement.
	 *
	 * When set, it must be an object with methods <code>start</code> and <code>end</code>.
	 * @type {{start:function(string,any),end:function(string)}}
	 * @private
	 */
	var measure;

	/**
	 * Source code transformation hook.
	 *
	 * To be used by code coverage, only supported in sync mode.
	 * @private
	 */
	var translate;

	/*
	 * Activates strictest possible compliance with AMD spec
	 * - no multiple executions of the same module
	 * - at most one anonymous module definition per file, zero for adhoc definitions
	 */
	var strictModuleDefinitions = true;

	/**
	 * Whether asynchronous loading can be used at all.
	 * When activated, require will load asynchronously, else synchronously.
	 * @type {boolean}
	 * @private
	 */
	var bGlobalAsyncMode = false;


	/**
	 * Whether ui5loader currently exposes its AMD implementation as global properties
	 * <code>define</code> and <code>require</code>. Defaults to <code>false</code>.
	 * @type {boolean}
	 * @private
	 */
	var bExposeAsAMDLoader = false;

	/**
	 * How the loader should react to calls of sync APIs or when global names are accessed:
	 * 0: tolerate
	 * 1: warn
	 * 2: reject
	 * @type {int}
	 * @private
	 */
	var syncCallBehavior = 0;

	/**
	 * Default base URL for modules, used when no other configuration is provided.
	 * In case the base url is removed via <code>registerResourcePath("", null)</code>
	 * it will be reset to this URL instead.
	 * @const
	 * @type {string}
	 * @private
	 */
	var DEFAULT_BASE_URL = "./";

	/**
	 * Temporarily saved reference to the original value of the global define variable.
	 *
	 * @type {any}
	 * @private
	 */
	var vOriginalDefine;

	/**
	 * Temporarily saved reference to the original value of the global require variable.
	 *
	 * @type {any}
	 * @private
	 */
	var vOriginalRequire;


	/**
	 * A map of URL prefixes keyed by the corresponding module name prefix.
	 *
	 * Note that the empty prefix ('') will always match and thus serves as a fallback.
	 * @type {Object.<string,{url:string,absoluteUrl:string}>}
	 * @see jQuery.sap.registerModulePath
	 * @private
	 */
	var mUrlPrefixes = Object.create(null);
	mUrlPrefixes[''] = {
		url: DEFAULT_BASE_URL,
		absoluteUrl: resolveURL(DEFAULT_BASE_URL, document.baseURI)
	};

	/**
	 * Mapping of module IDs.
	 *
	 * Each entry is a map of its own, keyed by the module ID prefix for which it should be
	 * applied. Each contained map maps module ID prefixes to module ID prefixes.
	 *
	 * All module ID prefixes must not have extensions.
	 * @type {Object.<string,Object.<string,string>>}
	 * @private
	 */
	var mMaps = Object.create(null),

	/**
	 * Information about third party modules, keyed by the module's resource name (including extension '.js').
	 *
	 * Each module shim object can have the following properties:
	 * <ul>
	 * <li><i>boolean</i>: [amd=false] Whether the module uses an AMD loader if present. If set to <code>true</code>,
	 *     UI5 will disable an AMD loader while loading such a module to force the module to expose its content
	 *     via global names.</li>
	 * <li><i>string[]|string</i>: [exports=undefined] Global name (or names) that are exported by the module.
	 *     If one ore multiple names are defined, the first one will be read from the global object and will be
	 *     used as value of the module. Each name can be a dot separated hierarchical name (will be resolved with
	 *     <code>getGlobalProperty</code>)</li>
	 * <li><i>string[]</i>: [deps=undefined] List of modules that the module depends on. The modules will be loaded
	 *     first before loading the module itself. Note that the stored dependencies also include the extension '.js'
	 *     for easier evaluation, but <code>config({shim:...})</code> expects them without the extension for
	 *     compatibility with the AMD-JS specification.</li>
	 * </ul>
	 *
	 * @see config method
	 * @type {Object.<string,{amd:boolean,exports:(string|string[]),deps:string[]}>}
	 * @private
	 */
		mShims = Object.create(null),

	/**
	 * Dependency Cache information.
	 * Maps the name of a module to a list of its known dependencies.
	 * @type {Object.<string,string[]>}
	 * @private
	 */
		mDepCache = Object.create(null),

	/**
	 * Whether the loader should try to load debug sources.
	 * @type {boolean}
	 * @private
	 */
		bDebugSources = false,

	/**
	 * Indicates partial or total debug mode.
	 *
	 * Can be set to a function which checks whether preloads should be ignored for the given module.
	 * If undefined, all preloads will be used.
	 * @type {function(string):boolean|undefined}
	 * @private
	 */
		fnIgnorePreload;


	// ---- internal state ------------------------------------------------------------------------

	/**
	 * Map of modules that have been loaded or required so far, keyed by their name.
	 *
	 * @type {Object<string,Module>}
	 * @private
	 */
	var mModules = Object.create(null),

	/**
	 * Whether (sap.ui.)define calls must be executed synchronously in the current context.
	 *
	 * The initial value is <code>null</code>. During the execution of a module loading operation
	 * ((sap.ui.)require or (sap.ui.)define etc.), it is set to true or false depending on the
	 * legacy synchronicity behavior of the operation.
	 *
	 * Problem: when AMD modules are loaded with hard coded script tags and when some later inline
	 * script expects the module export synchronously, then the (sap.ui.)define must be executed
	 * synchronously.
	 * Most prominent example: unit tests that include QUnitUtils as a script tag and use qutils
	 * in one of their inline scripts.
	 * @type {boolean}
	 * @private
	 */
		bForceSyncDefines = null,

	/**
	 * Stack of modules that are currently being executed in case of synchronous processing.
	 *
	 * Allows to identify the executing module (e.g. when resolving dependencies or in case of
	 * in case of bundles like sap-ui-core).
	 *
	 * @type {Array.<{name:string,used:boolean}>}
	 * @private
	 */
		_execStack = [ ],

	/**
	 * A prefix that will be added to module loading log statements and which reflects the nesting of module executions.
	 * @type {string}
	 * @private
	 */
		sLogPrefix = "",

	/**
	 * Counter used to give anonymous modules a unique module ID.
	 * @type {int}
	 * @private
	 */
		iAnonymousModuleCount = 0,

	/**
	 * IE only: max size a script should have when executing it with execScript, otherwise fallback to eval.
	 * @type {int}
	 * @const
	 * @private
	 */
		MAX_EXEC_SCRIPT_LENGTH = 512 * 1024;


	// ---- Names and Paths -----------------------------------------------------------------------

	/**
	 * Name conversion function that converts a name in unified resource name syntax to a name in UI5 module name syntax.
	 * If the name cannot be converted (e.g. doesn't end with '.js'), then <code>undefined</code> is returned.
	 *
	 * @param {string} sName Name in unified resource name syntax
	 * @returns {string|undefined} Name in UI5 (legacy) module name syntax (dot separated)
	 *   or <code>undefined</code> when the name can't be converted
	 * @private
	 */
	function urnToUI5(sName) {
		// UI5 module name syntax is only defined for JS resources
		if ( !/\.js$/.test(sName) ) {
			return undefined;
		}

		sName = sName.slice(0, -3);
		if ( /^jquery\.sap\./.test(sName) ) {
			return sName; // do nothing
		}
		return sName.replace(/\//g, ".");
	}

	function urnToIDAndType(sResourceName) {
		var basenamePos = sResourceName.lastIndexOf('/'),
			dotPos = sResourceName.lastIndexOf('.');
		if ( dotPos > basenamePos ) {
			return {
				id: sResourceName.slice(0, dotPos),
				type: sResourceName.slice(dotPos)
			};
		}
		return {
			id: sResourceName,
			type: ''
		};
	}

	var rJSSubTypes = /(\.controller|\.fragment|\.view|\.designtime|\.support)?.js$/;

	function urnToBaseIDAndSubType(sResourceName) {
		var m = rJSSubTypes.exec(sResourceName);
		if ( m ) {
			return {
				baseID: sResourceName.slice(0, m.index),
				subType: m[0]
			};
		}
	}

	var rDotSegmentAnywhere = /(?:^|\/)\.+(?=\/|$)/;
	var rDotSegment = /^\.*$/;

	/**
	 * Normalizes a resource name by resolving any relative name segments.
	 *
	 * A segment consisting of a single dot <code>./</code>, when used at the beginning of a name refers
	 * to the containing package of the <code>sBaseName</code>. When used inside a name, it is ignored.
	 *
	 * A segment consisting of two dots <code>../</code> refers to the parent package. It can be used
	 * anywhere in a name, but the resolved name prefix up to that point must not be empty.
	 *
	 * Example: A name <code>../common/validation.js</code> defined in <code>sap/myapp/controller/mycontroller.controller.js</code>
	 * will resolve to <code>sap/myapp/common/validation.js</code>.
	 *
	 * When <code>sBaseName</code> is <code>null</code> (e.g. for a <code>sap.ui.require</code> call),
	 * the resource name must not start with a relative name segment or an error will be thrown.
	 *
	 * @param {string} sResourceName Name to resolve
	 * @param {string|null} sBaseName Name of a reference module relative to which the name will be resolved
	 * @returns {string} Resolved name
	 * @throws {Error} When a relative name should be resolved but not basename is given;
	 *   or when upward navigation (../) is requested on the root level
	 *   or when a name segment consists of 3 or more dots only
	 * @private
	 */
	function normalize(sResourceName, sBaseName) {

		var p = sResourceName.search(rDotSegmentAnywhere),
			aSegments,
			sSegment,
			i,j,l;

		// check whether the name needs to be resolved at all - if not, just return the sModuleName as it is.
		if ( p < 0 ) {
			return sResourceName;
		}

		// if the name starts with a relative segment then there must be a base name (a global sap.ui.require doesn't support relative names)
		if ( p === 0 ) {
			if ( sBaseName == null ) {
				throw new Error("relative name not supported ('" + sResourceName + "'");
			}
			// prefix module name with the parent package
			sResourceName = sBaseName.slice(0, sBaseName.lastIndexOf('/') + 1) + sResourceName;
		}

		aSegments = sResourceName.split('/');

		// process path segments
		for (i = 0, j = 0, l = aSegments.length; i < l; i++) {

			sSegment = aSegments[i];

			if ( rDotSegment.test(sSegment) ) {
				if (sSegment === '.' || sSegment === '') {
					// ignore '.' as it's just a pointer to current package. ignore '' as it results from double slashes (ignored by browsers as well)
					continue;
				} else if (sSegment === '..') {
					// move to parent directory
					if ( j === 0 ) {
						throw new Error("Can't navigate to parent of root ('" + sResourceName + "')");
					}
					j--;
				} else {
					throw new Error("Illegal path segment '" + sSegment + "' ('" + sResourceName + "')");
				}
			} else {
				aSegments[j++] = sSegment;
			}

		}

		aSegments.length = j;

		return aSegments.join('/');
	}

	/**
	 * Adds a resource path to the resources map.
	 *
	 * @param {string} sResourceNamePrefix prefix is used as map key
	 * @param {string} sUrlPrefix path to the resource
	 */
	function registerResourcePath(sResourceNamePrefix, sUrlPrefix) {
		sResourceNamePrefix = String(sResourceNamePrefix || "");

		if ( sUrlPrefix == null ) {

			// remove a registered URL prefix, if it wasn't for the empty resource name prefix
			if ( sResourceNamePrefix ) {
				if ( mUrlPrefixes[sResourceNamePrefix] ) {
					delete mUrlPrefixes[sResourceNamePrefix];
					log.info("registerResourcePath ('" + sResourceNamePrefix + "') (registration removed)");
				}
				return;
			}

			// otherwise restore the default
			sUrlPrefix = DEFAULT_BASE_URL;
			log.info("registerResourcePath ('" + sResourceNamePrefix + "') (default registration restored)");

		}

		// cast to string and remove query parameters and/or hash
		sUrlPrefix = pathOnly(String(sUrlPrefix));

		// ensure that the prefix ends with a '/'
		if ( sUrlPrefix.slice(-1) !== '/' ) {
			sUrlPrefix += '/';
		}

		mUrlPrefixes[sResourceNamePrefix] = {
			url: sUrlPrefix,
			// calculate absolute URL, only to be used by 'guessResourceName'
			absoluteUrl: resolveURL(sUrlPrefix)
		};
	}

	/**
	 * Retrieves path to a given resource by finding the longest matching prefix for the resource name
	 *
	 * @param {string} sResourceName name of the resource stored in the resources map
	 * @param {string} sSuffix url suffix
	 *
	 * @returns {string} resource path
	 */
	function getResourcePath(sResourceName, sSuffix) {

		var sNamePrefix = sResourceName,
			p = sResourceName.length,
			sPath;

		// search for a registered name prefix, starting with the full name and successively removing one segment
		while ( p > 0 && !mUrlPrefixes[sNamePrefix] ) {
			p = sNamePrefix.lastIndexOf('/');
			// Note: an empty segment at p = 0 (leading slash) will be ignored
			sNamePrefix = p > 0 ? sNamePrefix.slice(0, p) : '';
		}

		assert((p > 0 || sNamePrefix === '') && mUrlPrefixes[sNamePrefix], "there always must be a mapping");

		sPath = mUrlPrefixes[sNamePrefix].url + sResourceName.slice(p + 1); // also skips a leading slash!

		//remove trailing slash
		if ( sPath.slice(-1) === '/' ) {
			sPath = sPath.slice(0, -1);
		}
		return sPath + (sSuffix || '');

	}

	/**
	 * Returns the reporting mode for synchronous calls
	 *
	 * @returns {int} sync call behavior
	 */
	function getSyncCallBehavior() {
		return syncCallBehavior;
	}

	function guessResourceName(sURL) {
		var sNamePrefix,
			sUrlPrefix,
			sResourceName;

		// Make sure to have an absolute URL without query parameters or hash
		// to check against absolute prefix URLs
		sURL = pathOnly(resolveURL(sURL));

		for (sNamePrefix in mUrlPrefixes) {

			// Note: configured URL prefixes are guaranteed to end with a '/'
			// But to support the legacy scenario promoted by the application tools ( "registerModulePath('Application','Application')" )
			// the prefix check here has to be done without the slash
			sUrlPrefix = mUrlPrefixes[sNamePrefix].absoluteUrl.slice(0, -1);

			if ( sURL.indexOf(sUrlPrefix) === 0 ) {

				// calc resource name
				sResourceName = sNamePrefix + sURL.slice(sUrlPrefix.length);
				// remove a leading '/' (occurs if name prefix is empty and if match was a full segment match
				if ( sResourceName.charAt(0) === '/' ) {
					sResourceName = sResourceName.slice(1);
				}

				if ( mModules[sResourceName] && mModules[sResourceName].data ) {
					return sResourceName;
				}
			}
		}
	}

	/**
	 * Find the most specific map config that matches the given context resource
	 * @param {string} sContext Resource name to be used as context
	 * @returns {Object<string,string>|undefined} Most specific map or <code>undefined</code>
	 */
	function findMapForContext(sContext) {
		var p, mMap;
		if ( sContext != null ) {
			// maps are defined on module IDs, reduce URN to module ID
			sContext = urnToIDAndType(sContext).id;
			p = sContext.length;
			mMap = mMaps[sContext];
			while ( p > 0 && mMap == null ) {
				p = sContext.lastIndexOf('/');
				if ( p > 0 ) { // Note: an empty segment at p = 0 (leading slash) will be ignored
					sContext = sContext.slice(0, p);
					mMap = mMaps[sContext];
				}
			}
		}
		// if none is found, fallback to '*' map
		return mMap || mMaps['*'];
	}

	function getMappedName(sResourceName, sRequestingResourceName) {

		var mMap = findMapForContext(sRequestingResourceName),
			sPrefix, p;

		// resolve relative names
		sResourceName = normalize(sResourceName, sRequestingResourceName);

		// if there's a map, search for the most specific matching entry
		if ( mMap != null ) {
			// start with the full ID and successively remove one segment
			sPrefix = urnToIDAndType(sResourceName).id;
			p = sPrefix.length;
			while ( p > 0 && mMap[sPrefix] == null ) {
				p = sPrefix.lastIndexOf('/');
				// Note: an empty segment at p = 0 (leading slash) will be ignored
				sPrefix = p > 0 ? sPrefix.slice(0, p) : '';
			}

			if ( p > 0 ) {
				if ( log.isLoggable() ) {
					log.debug('module ID ' + sResourceName + " mapped to " + mMap[sPrefix] + sResourceName.slice(p));
				}
				return mMap[sPrefix] + sResourceName.slice(p); // also skips a leading slash!
			}
		}

		return sResourceName;
	}

	function getGlobalObject(oObject, aNames, l, bCreate) {
		for (var i = 0; oObject && i < l; i++) {
			if (!oObject[aNames[i]] && bCreate ) {
				oObject[aNames[i]] = {};
			}
			oObject = oObject[aNames[i]];
		}
		return oObject;
	}

	function getGlobalProperty(sName) {
		var aNames = sName ? sName.split(".") : [];

		if ( syncCallBehavior && aNames.length > 1 ) {
			log.error("[nosync] getGlobalProperty called to retrieve global name '" + sName + "'");
		}

		return getGlobalObject(__global, aNames, aNames.length);
	}

	function setGlobalProperty(sName, vValue) {
		var aNames = sName ? sName.split(".") : [],
			oObject;
		if ( aNames.length > 0 ) {
			oObject = getGlobalObject(__global, aNames, aNames.length - 1, true);
			oObject[aNames[aNames.length - 1]] = vValue;
		}
	}

	// ---- Modules -------------------------------------------------------------------------------

	/**
	 * Module neither has been required nor preloaded nor declared, but someone asked for it.
	 */
	var INITIAL = 0,

	/**
	 * Module has been preloaded, but not required or declared.
	 */
		PRELOADED = -1,

	/**
	 * Module has been declared.
	 */
		LOADING = 1,

	/**
	 * Module has been loaded, but not yet executed.
	 */
		LOADED = 2,

	/**
	 * Module is currently being executed
	 */
		EXECUTING = 3,

	/**
	 * Module has been loaded and executed without errors.
	 */
		READY = 4,

	/**
	 * Module either could not be loaded or execution threw an error
	 */
		FAILED = 5,

	/**
	 * Special content value used internally until the content of a module has been determined
	 */
		NOT_YET_DETERMINED = {};

	/**
	 * A module/resource as managed by the module system.
	 *
	 * Each module is an object with the following properties
	 * <ul>
	 * <li>{int} state one of the module states defined in this function</li>
	 * <li>{string} url URL where the module has been loaded from</li>
	 * <li>{any} data temp. raw content of the module (between loaded and ready or when preloaded)</li>
	 * <li>{string} group the bundle with which a resource was loaded or null</li>
	 * <li>{string} error an error description for state <code>FAILED</code></li>
	 * <li>{any} content the content of the module as exported via define()<(li>
	 * </ul>
	 *
	 * @param {string} name Name of the module, including extension
	 */
	function Module(name) {
		this.name = name;
		this.state = INITIAL;
		/*
		 * Whether processing of the module is complete.
		 * This is very similar to, but not the same as state >= READY because declareModule() sets state=READY very early.
		 * That state transition is 'legacy' from the library-all files; it needs to checked whether it can be removed.
		 */
		this.settled = false;
		this.url =
		this._deferred =
		this.data =
		this.group =
		this.error =
		this.pending = null;
		this.content = NOT_YET_DETERMINED;
	}

	Module.prototype.deferred = function() {
		if ( this._deferred == null ) {
			var deferred = this._deferred = {};
			deferred.promise = new Promise(function(resolve,reject) {
				deferred.resolve = resolve;
				deferred.reject = reject;
			});
			// avoid 'Uncaught (in promise)' log entries
			deferred.promise.catch(noop);
		}
		return this._deferred;
	};

	Module.prototype.api = function() {
		if ( this._api == null ) {
			this._exports = {};
			this._api = {
				id: this.name.slice(0,-3),
				exports: this._exports,
				url: this.url,
				config: noop
			};
		}
		return this._api;
	};

	/**
	 * Sets the module state to READY and either determines the value or sets
	 * it from the given parameter.
	 * @param {any} value Module value
	 */
	Module.prototype.ready = function(value) {
		// should throw, but some tests and apps would fail
		assert(!this.settled, "Module " + this.name + " is already settled");
		this.state = READY;
		this.settled = true;
		if ( arguments.length > 0 ) {
			// check arguments.length to allow a value of undefined
			this.content = value;
		}
		this.deferred().resolve(this.value());
		if ( this.aliases ) {
			value = this.value();
			this.aliases.forEach(function(alias) {
				Module.get(alias).ready(value);
			});
		}
	};

	Module.prototype.fail = function(err) {
		// should throw, but some tests and apps would fail
		assert(!this.settled, "Module " + this.name + " is already settled");
		this.settled = true;
		if ( this.state !== FAILED ) {
			this.state = FAILED;
			this.error = err;
			this.deferred().reject(err);
			if ( this.aliases ) {
				this.aliases.forEach(function(alias) {
					Module.get(alias).fail(err);
				});
			}
		}
	};

	Module.prototype.addPending = function(sDependency) {
		(this.pending || (this.pending = [])).push(sDependency);
	};

	Module.prototype.addAlias = function(sAliasName) {
		(this.aliases || (this.aliases = [])).push(sAliasName);
		// add this module as pending dependency to the original
		Module.get(sAliasName).addPending(this.name);
	};

	Module.prototype.preload = function(url, data, bundle) {
		if ( this.state === INITIAL && !(fnIgnorePreload && fnIgnorePreload(this.name)) ) {
			this.state = PRELOADED;
			this.url = url;
			this.data = data;
			this.group = bundle;
		}
		return this;
	};

	/**
	 * Determines the value of this module.
	 *
	 * If the module hasn't been loaded or executed yet, <code>undefined</code> will be returned.
	 *
	 * @returns {any} Export of the module or <code>undefined</code>
	 * @private
	 */
	Module.prototype.value = function() {

		if ( this.state === READY ) {
			if ( this.content === NOT_YET_DETERMINED ) {
				// Determine the module value lazily.
				// For AMD modules this has already been done on execution of the factory function.
				// For other modules that are required synchronously, it has been done after execution.
				// For the few remaining scenarios (like global scripts), it is done here
				var oShim = mShims[this.name],
					sExport = oShim && (Array.isArray(oShim.exports) ? oShim.exports[0] : oShim.exports);
				// best guess for thirdparty modules or legacy modules that don't use sap.ui.define
				this.content = getGlobalProperty( sExport || urnToUI5(this.name) );
			}
			return this.content;
		}

		return undefined;
	};

	/**
	 * Checks whether this module depends on the given module.
	 *
	 * When a module definition (define) is executed, the requested dependencies are added
	 * as 'pending' to the Module instance. This function checks if the oDependantModule is
	 * reachable from this module when following the pending dependency information.
	 *
	 * Note: when module aliases are introduced (all module definitions in a file use an ID that differs
	 * from the request module ID), then the alias module is also added as a "pending" dependency.
	 *
	 * @param {Module} oDependantModule Module which has a dependency to <code>oModule</code>
	 * @returns {boolean} Whether this module depends on the given one.
	 * @private
	 */
	Module.prototype.dependsOn = function(oDependantModule) {
		var dependant = oDependantModule.name,
			visited = Object.create(null);

		// log.debug("checking for a cycle between", this.name, "and", dependant);
		function visit(mod) {
			if ( !visited[mod] ) {
				// log.debug("  ", mod);
				visited[mod] = true;
				var pending = mModules[mod] && mModules[mod].pending;
				return Array.isArray(pending) &&
					(pending.indexOf(dependant) >= 0 || pending.some(visit));
			}
			return false;
		}

		return this.name === dependant || visit(this.name);
	};

	/**
	 * Find or create a module by its unified resource name.
	 *
	 * If the module doesn't exist yet, a new one is created in state INITIAL.
	 *
	 * @param {string} sModuleName Name of the module in URN syntax
	 * @returns {Module} Module with that name, newly created if it didn't exist yet
	 * @static
	 */
	Module.get = function(sModuleName) {
		return mModules[sModuleName] || (mModules[sModuleName] = new Module(sModuleName));
	};

	// --------------------------------------------------------------------------------------------

	function ensureStacktrace(oError) {
		if (!oError.stack) {
			try {
				throw oError;
			} catch (ex) {
				return ex;
			}
		}
		return oError;
	}

	function makeNestedError(msg, cause) {
		var oError = new Error(msg + ": " + cause.message);
		oError.cause = cause;
		oError.loadError = cause.loadError;
		ensureStacktrace(oError);
		ensureStacktrace(cause);
		// concat the error stack for better traceability of loading issues
		// (ignore for PhantomJS since Error.stack is readonly property!)
		if ( oError.stack && cause.stack ) {
			try {
				oError.stack = oError.stack + "\nCaused by: " + cause.stack;
			} catch (err) {
				// ignore
			}
		}
		// @evo-todo
		// for non Chrome browsers we log the caused by stack manually in the console
		// if (__global.console && !Device.browser.chrome) {
		// 	/*eslint-disable no-console */
		// 	console.error(oError.message + "\nCaused by: " + oCausedByStack);
		// 	/*eslint-enable no-console */
		// }
		return oError;
	}

	function declareModule(sModuleName) {
		var oModule;

		// sModuleName must be a unified resource name of type .js
		assert(/\.js$/.test(sModuleName), "must be a Javascript module");

		oModule = Module.get(sModuleName);

		if ( oModule.state > INITIAL ) {
			return oModule;
		}

		if ( log.isLoggable() ) {
			log.debug(sLogPrefix + "declare module '" + sModuleName + "'");
		}

		// avoid cycles
		oModule.state = READY;

		return oModule;
	}

	/**
	 * Define an already loaded module synchronously.
	 * Finds or creates a module by its unified resource name and resolves it with the given value.
	 *
	 * @param {string} sResourceName Name of the module in URN syntax
	 * @param {any} vValue Content of the module
	 */
	function defineModuleSync(sResourceName, vValue) {
		Module.get(sResourceName).ready(vValue);
	}

	/**
	 * Queue of modules for which sap.ui.define has been called (in async mode), but which have not been executed yet.
	 * When loading modules via script tag, only the onload handler knows the relationship between executed sap.ui.define calls and
	 * module name. It then resolves the pending modules in the queue. Only one entry can get the name of the module
	 * if there are more entries, then this is an error
	 */
	var queue = new function ModuleDefinitionQueue() {
		var aQueue = [],
			iRun = 0,
			vTimer;

		this.push = function(name, deps, factory, _export) {
			if ( log.isLoggable() ) {
				log.debug("pushing define from " + (document.currentScript && document.currentScript.src) );
			}
			aQueue.push({
				name: name,
				deps: deps,
				factory: factory,
				_export: _export,
				guess: document.currentScript && document.currentScript.getAttribute('data-sap-ui-module')
			});

			// trigger queue processing via a timer in case the currently executing script is not managed by the loader
			if ( !vTimer ) {
				vTimer = setTimeout(this.process.bind(this, null));
			}
		};

		this.clear = function() {
			aQueue = [];
			if ( vTimer ) {
				clearTimeout(vTimer);
				vTimer = null;
			}
		};

		/**
		 * Process the queue of module definitions, assuming that the original request was for
		 * <code>oRequestedModule</code>. If there is an unnamed module definition, it is assumed to be
		 * the one for the requested module.
		 *
		 * When called via timer, <code>oRequestedModule</code> will be undefined.
		 *
		 * @param {Module} [oRequestedModule] Module for which the current script was loaded.
		 */
		this.process = function(oRequestedModule) {
			var bLoggable = log.isLoggable(),
				iCurrentRun = iRun++,
				aQueueCopy = aQueue,
				sModuleName = null;

			// clear the queue and timer early, we've already taken a copy of the queue
			this.clear();


			if ( oRequestedModule ) {

				// if a module execution error was detected, stop processing the queue
				if ( oRequestedModule.execError ) {
					if ( bLoggable ) {
						log.debug("module execution error detected, ignoring queued define calls (" + aQueueCopy.length + ")");
					}
					oRequestedModule.fail(oRequestedModule.execError);
					return;
				}

			}

			/*
			 * Name of the requested module, null when unknown or already consumed.
			 *
			 *  - when no module request is known (e.g. script was embedded in the page as an unmanaged script tag),
			 *    then no name is known and unnamed module definitions will be reported as an error
			 *  - multiple unnamed module definitions also are reported as an error
			 *  - when the name of a named module definition matches the name of requested module, the name is 'consumed'.
			 *    Any later unnamed module definition will be reported as an error, too
			 */
			sModuleName = oRequestedModule && oRequestedModule.name;

			// check whether there's a module definition for the requested module
			aQueueCopy.forEach(function(oEntry) {
				if ( oEntry.name == null ) {
					if ( sModuleName != null ) {
						oEntry.name = sModuleName;
						sModuleName = null;
					} else {
						// multiple modules have been queued, but only one module can inherit the name from the require call
						if ( strictModuleDefinitions ) {
							var oError = new Error(
								"Modules that use an anonymous define() call must be loaded with a require() call; " +
								"they must not be executed via script tag or nested into other modules. ");
							if ( oRequestedModule ) {
								oRequestedModule.fail(oError);
							} else {
								throw oError;
							}
						}
						// give anonymous modules a unique pseudo ID
						oEntry.name = '~anonymous~' + (++iAnonymousModuleCount) + '.js';
						log.error(
							"Modules that use an anonymous define() call must be loaded with a require() call; " +
							"they must not be executed via script tag or nested into other modules. " +
							"All other usages will fail in future releases or when standard AMD loaders are used. " +
							"Now using substitute name " + oEntry.name);
					}
				} else if ( oRequestedModule && oEntry.name === oRequestedModule.name ) {
					if ( sModuleName == null && !strictModuleDefinitions ) {
						// if 'strictModuleDefinitions' is active, double execution will be reported anyhow
						log.error(
							"Duplicate module definition: both, an unnamed module and a module with the expected name exist." +
							"This use case will fail in future releases or when standard AMD loaders are used. ");
					}
					sModuleName = null;
				}
			});

			// if not, assign an alias if there's at least one queued module definition
			if ( sModuleName && aQueueCopy.length > 0 ) {
				if ( bLoggable ) {
					log.debug(
						"No queued module definition matches the ID of the request. " +
						"Now assuming that the first definition '" + aQueueCopy[0].name + "' is an alias of '" + sModuleName + "'");
				}
				Module.get(aQueueCopy[0].name).addAlias(sModuleName);
				sModuleName = null;
			}

			if ( bLoggable ) {
				log.debug("processing define queue " + iCurrentRun + (oRequestedModule ? " for " + oRequestedModule.name : "") + " with " + aQueueCopy.map(function(entry) { return entry.name; }));
			}
			aQueueCopy.forEach(function(oEntry) {
				// start to resolve the dependencies
				executeModuleDefinition(oEntry.name, oEntry.deps, oEntry.factory, oEntry._export, /* bAsync = */ true);
				if ( bLoggable ) {
					log.debug("define called for " + oEntry.name);
				}
			});

			if ( sModuleName != null && !oRequestedModule.settled ) {
				// module name still not consumed, might be a non-UI5 module (e.g. in 'global' format)
				if ( bLoggable ) {
					log.debug("no queued module definition for the requested module found, assume the module to be ready");
				}
				oRequestedModule.data = undefined; // allow GC
				oRequestedModule.ready(); // no export known, has to be retrieved via global name
			}

			if ( bLoggable ) {
				log.debug("processing define queue done " + iCurrentRun);
			}
		};
	}();

	/**
	 * Loads the source for the given module with a sync XHR.
	 * @param {Module} oModule Module to load the source for
	 * @throws {Error} When loading failed for some reason.
	 */
	function loadSyncXHR(oModule) {
		var xhr = new XMLHttpRequest();

		function enrichXHRError(error) {
			error = error || ensureStacktrace(new Error(xhr.status + " - " + xhr.statusText));
			error.status = xhr.status;
			error.statusText = xhr.statusText;
			error.loadError = true;
			return error;
		}

		xhr.addEventListener('load', function(e) {
			// File protocol (file://) always has status code 0
			if ( xhr.status === 200 || xhr.status === 0 ) {
				oModule.state = LOADED;
				oModule.data = xhr.responseText;
			} else {
				oModule.error = enrichXHRError();
			}
		});
		// Note: according to whatwg spec, error event doesn't fire for sync send(), instead an error is thrown
		// we register a handler, in case a browser doesn't follow the spec
		xhr.addEventListener('error', function(e) {
			oModule.error = enrichXHRError();
		});
		xhr.open('GET', oModule.url, false);
		try {
			xhr.send();
		} catch (error) {
			oModule.error = enrichXHRError(error);
		}
	}

	/**
	 * Global event handler to detect script execution errors.
	 * Only works for browsers that support <code>document.currentScript</code>.
	 * @private
	 */
	if ( 'currentScript' in document ) {
		window.addEventListener('error', function onUncaughtError(errorEvent) {
			var sModuleName = document.currentScript && document.currentScript.getAttribute('data-sap-ui-module');
			var oModule = sModuleName && Module.get(sModuleName);
			if ( oModule && oModule.execError == null ) {
				// if a currently executing module can be identified, attach the error to it and suppress reporting
				if ( log.isLoggable() ) {
					log.debug("unhandled exception occurred while executing " + sModuleName + ": " + errorEvent.message);
				}
				oModule.execError = errorEvent.error || {
					name: 'Error',
					message: errorEvent.message
				};
				return false;
			}
		});
	}

	function loadScript(oModule, sAlternativeURL) {

		var oScript;

		function onload(e) {
			if ( log.isLoggable() ) {
				log.debug("Javascript resource loaded: " + oModule.name);
			}
			oScript.removeEventListener('load', onload);
			oScript.removeEventListener('error', onerror);
			queue.process(oModule);
		}

		function onerror(e) {
			oScript.removeEventListener('load', onload);
			oScript.removeEventListener('error', onerror);
			if (sAlternativeURL) {
				log.warning("retry loading Javascript resource: " + oModule.name);
				if (oScript && oScript.parentNode) {
					oScript.parentNode.removeChild(oScript);
				}
				oModule.url = sAlternativeURL;
				loadScript(oModule, /* sAlternativeURL= */ null);
				return;
			}

			log.error("failed to load Javascript resource: " + oModule.name);
			oModule.fail(
				ensureStacktrace(new Error("failed to load '" + oModule.name +  "' from " + oModule.url + ": script load error")));
		}

		oScript = document.createElement('SCRIPT');
		// Accessing the 'src' property of the script in this strange way prevents Safari 12 (or WebKit) from
		// wrongly optimizing access. SF12 seems to check at optimization time whether there's a setter for the
		// property and optimize accordingly. When a setter is defined or changed at a later point in time (e.g.
		// by the AppCacheBuster), then the optimization seems not to be updated and the new setter is ignored
		// BCP 1970035485
		oScript["s" + "rc"] = oModule.url;
		//oScript.src = oModule.url;
		oScript.setAttribute("data-sap-ui-module", oModule.name);
		if ( sAlternativeURL !== undefined ) {
			oScript.addEventListener('load', onload);
			oScript.addEventListener('error', onerror);
		}
		document.head.appendChild(oScript);

	}

	function preloadDependencies(sModuleName) {
		var knownDependencies = mDepCache[sModuleName];
		if ( Array.isArray(knownDependencies) ) {
			log.debug("preload dependencies for " + sModuleName + ": " + knownDependencies);
			knownDependencies.forEach(function(dep) {
				dep = getMappedName(dep, sModuleName);
				if ( /\.js$/.test(dep) ) {
					requireModule(null, dep, /* always async */ true);
				} // else: TODO handle non-JS resources, e.g. link rel=prefetch
			});
		}
	}

	/**
	 * Loads the given module if needed and returns the module export or a promise on it.
	 *
	 * If loading is still ongoing for the requested module and if there is a cycle detected between
	 * the requesting module and the module to be loaded, then <code>undefined</code> (or a promise on
	 * <code>undefined</code>) will be returned as intermediate module export to resolve the cycle.
	 *
	 * @param {Module} oRequestingModule The module in whose context the new module has to be loaded;
	 *           this is needed to detect cycles
	 * @param {string} sModuleName Name of the module to be loaded, in URN form and with '.js' extension
	 * @param {boolean} bAsync Whether the operation can be executed asynchronously
	 * @param {boolean} bSkipShimDeps Whether shim dependencies should be ignored
	 * @returns {any|Promise} Returns the module export in sync mode or a promise on it in async mode
	 * @throws {Error} When loading failed in sync mode
	 *
	 * @private
	 */
	function requireModule(oRequestingModule, sModuleName, bAsync, bSkipShimDeps) {

		var bLoggable = log.isLoggable(),
			oSplitName = urnToBaseIDAndSubType(sModuleName),
			oShim = mShims[sModuleName],
			oModule, aExtensions, i, sMsg, bExecutedNow;

		// only for robustness, should not be possible by design (all callers append '.js')
		if ( !oSplitName ) {
			throw new Error("can only require Javascript module, not " + sModuleName);
		}

		// Module names should not start with a "/"
		if (sModuleName[0] == "/") {
			log.error("Module names that start with a slash should not be used, as they are reserved for future use.");
		}

		oModule = Module.get(sModuleName);

		// when there's a shim with dependencies for the module
		// resolve them first before requiring the module again with bSkipShimDeps = true
		if ( oShim && oShim.deps && !bSkipShimDeps ) {
			if ( bLoggable ) {
				log.debug("require dependencies of raw module " + sModuleName);
			}
			return requireAll(oModule, oShim.deps, function() {
				return requireModule(oRequestingModule, sModuleName, bAsync, /* bSkipShimDeps = */ true);
			}, function(oErr) {
				oModule.fail(oErr);
				if ( bAsync ) {
					return;
				}
				throw oErr;
			}, bAsync);
		}

		if ( bLoggable ) {
			log.debug(sLogPrefix + "require '" + sModuleName + "' of type '" + oSplitName.subType + "'");
		}

		// check if module has been loaded already
		if ( oModule.state !== INITIAL ) {
			if ( oModule.state === PRELOADED ) {
				oModule.state = LOADED;
				oModule.async = bAsync;
				bExecutedNow = true;
				measure && measure.start(sModuleName, "Require module " + sModuleName + " (preloaded)", ["require"]);
				execModule(sModuleName, bAsync);
				measure && measure.end(sModuleName);
			}

			if ( oModule.state === READY ) {
				if ( bLoggable ) {
					log.debug(sLogPrefix + "module '" + sModuleName + "' has already been loaded (skipped).");
				}
				// Note: this intentionally does not return oModule.promise() as the export might be temporary in case of cycles
				// or it might have changed after repeated module execution
				return bAsync ? Promise.resolve(oModule.value()) : oModule.value();
			} else if ( oModule.state === FAILED ) {
				if ( bAsync ) {
					return oModule.deferred().promise;
				} else {
					throw (bExecutedNow
						? oModule.error
						: makeNestedError("found in negative cache: '" + sModuleName + "' from " + oModule.url, oModule.error));
				}
			} else {
				// currently loading or executing
				if ( bAsync ) {
					// break up cyclic dependencies
					if ( oRequestingModule && oModule.dependsOn(oRequestingModule) ) {
						if ( log.isLoggable() ) {
							log.debug("cycle detected between '" + oRequestingModule.name + "' and '" + sModuleName + "', returning undefined for '" + sModuleName + "'");
						}
						// Note: this must be a separate promise as the fulfillment is not the final one
						return Promise.resolve(undefined);
					}
					return oModule.deferred().promise;
				}
				if ( !bAsync && !oModule.async ) {
					// sync pending, return undefined
					if ( log.isLoggable() ) {
						log.debug("cycle detected between '" + (oRequestingModule ? oRequestingModule.name : "unknown") + "' and '" + sModuleName + "', returning undefined for '" + sModuleName + "'");
					}
					return undefined;
				}
				// async pending, load sync again
				log.warning("Sync request triggered for '" + sModuleName + "' while async request was already pending." +
					" Loading a module twice might cause issues and should be avoided by fully migrating to async APIs.");
			}
		}

		measure && measure.start(sModuleName, "Require module " + sModuleName, ["require"]);

		// set marker for loading modules (to break cycles)
		oModule.state = LOADING;
		oModule.async = bAsync;

		// if debug is enabled, try to load debug module first
		aExtensions = bDebugSources ? ["-dbg", ""] : [""];
		if ( !bAsync ) {

			for (i = 0; i < aExtensions.length && oModule.state !== LOADED; i++) {
				// create module URL for the current extension
				oModule.url = getResourcePath(oSplitName.baseID, aExtensions[i] + oSplitName.subType);
				if ( bLoggable ) {
					log.debug(sLogPrefix + "loading " + (aExtensions[i] ? aExtensions[i] + " version of " : "") + "'" + sModuleName + "' from '" + oModule.url + "'");
				}

				if ( syncCallBehavior ) {
					sMsg = "[nosync] loading module '" + oModule.url + "'";
					if ( syncCallBehavior === 1 ) {
						log.error(sMsg);
					} else {
						throw new Error(sMsg);
					}
				}

				// call notification hook
				ui5Require.load({ completeLoad:noop, async: false }, oModule.url, oSplitName.baseID);

				loadSyncXHR(oModule);
			}

			if ( oModule.state === LOADING ) {
				// transition to FAILED
				oModule.fail(
					makeNestedError("failed to load '" + sModuleName +  "' from " + oModule.url, oModule.error));
			} else if ( oModule.state === LOADED ) {
				// execute module __after__ loading it, this reduces the required stack space!
				execModule(sModuleName, bAsync);
			}

			measure && measure.end(sModuleName);

			if ( oModule.state !== READY ) {
				// loading or executing failed for some reason, load again as script for better error reporting
				// (but without further eventing)
				if ( fnIgnorePreload ) {
					loadScript(oModule);
				}
				throw oModule.error;
			}

			return oModule.value();

		} else {

			oModule.url = getResourcePath(oSplitName.baseID, aExtensions[0] + oSplitName.subType);
			// in debug mode, fall back to the non-dbg source, otherwise try the same source again (for SSO re-connect)
			var sAltUrl = bDebugSources ? getResourcePath(oSplitName.baseID, aExtensions[1] + oSplitName.subType) : oModule.url;
			// call notification hook only once
			ui5Require.load({ completeLoad:noop, async: true }, sAltUrl, oSplitName.baseID);
			loadScript(oModule, /* sAlternativeURL= */ sAltUrl);

			// process dep cache info
			preloadDependencies(sModuleName);

			return oModule.deferred().promise;
		}
	}

	// sModuleName must be a normalized resource name of type .js
	function execModule(sModuleName, bAsync) {

		var oModule = mModules[sModuleName],
			oShim = mShims[sModuleName],
			bLoggable = log.isLoggable(),
			sOldPrefix, sScript, vAMD, oMatch, bOldForceSyncDefines;

		if ( oModule && oModule.state === LOADED && typeof oModule.data !== "undefined" ) {

			// check whether the module is known to use an existing AMD loader, remember the AMD flag
			vAMD = (oShim === true || (oShim && oShim.amd)) && typeof __global.define === "function" && __global.define.amd;
			bOldForceSyncDefines = bForceSyncDefines;

			try {

				if ( vAMD ) {
					// temp. remove the AMD Flag from the loader
					delete __global.define.amd;
				}
				bForceSyncDefines = !bAsync;

				if ( bLoggable ) {
					log.debug(sLogPrefix + "executing '" + sModuleName + "'");
					sOldPrefix = sLogPrefix;
					sLogPrefix = sLogPrefix + ": ";
				}

				// execute the script in the __global context
				oModule.state = EXECUTING;
				_execStack.push({
					name: sModuleName,
					used: false
				});
				if ( typeof oModule.data === "function" ) {
					oModule.data.call(__global);
				} else if ( Array.isArray(oModule.data) ) {
					ui5Define.apply(null, oModule.data);
				} else {

					sScript = oModule.data;

					// sourceURL: Firebug, Chrome, Safari and IE11 debugging help, appending the string seems to cost ZERO performance
					// Note: IE11 supports sourceURL even when running in IE9 or IE10 mode
					// Note: make URL absolute so Chrome displays the file tree correctly
					// Note: do not append if there is already a sourceURL / sourceMappingURL
					// Note: Safari fails, if sourceURL is the same as an existing XHR URL
					// Note: Chrome ignores debug files when the same URL has already been load via sourcemap of the bootstrap file (sap-ui-core)
					// Note: sourcemap annotations URLs in eval'ed sources are resolved relative to the page, not relative to the source
					if (sScript ) {
						oMatch = /\/\/[#@] source(Mapping)?URL=(.*)$/.exec(sScript);
						if ( oMatch && oMatch[1] && /^[^/]+\.js\.map$/.test(oMatch[2]) ) {
							// found a sourcemap annotation with a typical UI5 generated relative URL
							sScript = sScript.slice(0, oMatch.index) + oMatch[0].slice(0, -oMatch[2].length) + resolveURL(oMatch[2], oModule.url);
						}
						// @evo-todo use only sourceMappingURL, sourceURL or both?
						if ( !oMatch || oMatch[1] ) {
							// write sourceURL if no annotation was there or when it was a sourceMappingURL
							sScript += "\n//# sourceURL=" + resolveURL(oModule.url) + "?eval";
						}
					}

					// framework internal hook to intercept the loaded script and modify
					// it before executing the script - e.g. useful for client side coverage
					if (typeof translate === "function") {
						sScript = translate(sScript, sModuleName);
					}

					if (__global.execScript && (!oModule.data || oModule.data.length < MAX_EXEC_SCRIPT_LENGTH) ) {
						try {
							oModule.data && __global.execScript(sScript); // execScript fails if data is empty
						} catch (e) {
							_execStack.pop();
							// eval again with different approach - should fail with a more informative exception
							/* eslint-disable no-eval */
							eval(oModule.data);
							/* eslint-enable no-eval */
							throw e; // rethrow err in case globalEval succeeded unexpectedly
						}
					} else {
						__global.eval(sScript);
					}
				}
				_execStack.pop();
				queue.process(oModule);

				if ( bLoggable ) {
					sLogPrefix = sOldPrefix;
					log.debug(sLogPrefix + "finished executing '" + sModuleName + "'");
				}

			} catch (err) {
				if ( bLoggable ) {
					sLogPrefix = sOldPrefix;
				}
				oModule.data = undefined;
				oModule.fail(err);
			} finally {

				// restore AMD flag
				if ( vAMD ) {
					__global.define.amd = vAMD;
				}
				bForceSyncDefines = bOldForceSyncDefines;
			}
		}
	}

	function requireAll(oRequestingModule, aDependencies, fnCallback, fnErrCallback, bAsync) {

		var sBaseName, aModules = [],
			bLoggable = log.isLoggable(),
			i, sDepModName, oError, oPromise;

		try {
			// calculate the base name for relative module names
			if ( oRequestingModule instanceof Module ) {
				sBaseName = oRequestingModule.name;
			} else {
				sBaseName = oRequestingModule;
				oRequestingModule = null;
			}
			aDependencies = aDependencies.slice();
			for (i = 0; i < aDependencies.length; i++) {
				aDependencies[i] = getMappedName(aDependencies[i] + '.js', sBaseName);
			}
			if ( oRequestingModule ) {
				// remember outgoing dependencies to be able to detect cycles, but ignore pseudo-dependencies
				aDependencies.forEach(function(dep) {
					if ( !/^(require|exports|module)\.js$/.test(dep) ) {
						oRequestingModule.addPending(dep);
					}
				});
			}

			for (i = 0; i < aDependencies.length; i++) {
				sDepModName = aDependencies[i];
				if ( bLoggable ) {
					log.debug(sLogPrefix + "require '" + sDepModName + "'");
				}
				if ( oRequestingModule ) {
					switch ( sDepModName ) {
					case 'require.js':
						// the injected local require should behave like the Standard require (2nd argument = true)
						aModules[i] = createContextualRequire(sBaseName, true);
						break;
					case 'module.js':
						aModules[i] = oRequestingModule.api();
						break;
					case 'exports.js':
						oRequestingModule.api();
						aModules[i] = oRequestingModule._exports;
						break;
					default:
						break;
					}
				}
				if ( !aModules[i] ) {
					aModules[i] = requireModule(oRequestingModule, sDepModName, bAsync);
				}
				if ( bLoggable ) {
					log.debug(sLogPrefix + "require '" + sDepModName + "': done.");
				}
			}

		} catch (err) {
			oError = err;
		}

		if ( bAsync ) {
			oPromise = oError ? Promise.reject(oError) : Promise.all(aModules);
			return oPromise.then(fnCallback, fnErrCallback);
		} else {
			if ( oError ) {
				fnErrCallback(oError);
			} else {
				return fnCallback(aModules);
			}
		}
	}

	function executeModuleDefinition(sResourceName, aDependencies, vFactory, bExport, bAsync) {
		var bLoggable = log.isLoggable();
		sResourceName = normalize(sResourceName);

		if ( bLoggable ) {
			log.debug("define(" + sResourceName + ", " + "['" + aDependencies.join("','") + "']" + ")");
		}

		var oModule = declareModule(sResourceName);

		var repeatedExecutionReported = false;

		function shouldSkipExecution() {
			if ( oModule.settled ) {
				// avoid double execution of the module, e.g. when async/sync conflict occurred before queue processing
				if ( oModule.state >= READY && bAsync && oModule.async === false ) {
					log.warning("Repeated module execution skipped after async/sync conflict for " + oModule.name);
					return true;
				}

				// when an inline module definition is executed repeatedly, this is reported but not prevented
				// Standard AMD loaders don't support this scenario, it needs to be fixed on caller side
				if ( strictModuleDefinitions && bAsync ) {
					log.warning("Module '" + oModule.name + "' has been defined more than once. " +
							"All but the first definition will be ignored, don't try to define the same module again.");
					return true;
				}

				if ( !repeatedExecutionReported ) {
					log.error(
						"Module '" + oModule.name + "' is executed more than once. " +
						"This is an unsupported scenario and will fail in future versions of UI5 or " +
						"when a standard AMD loader is used. Don't define the same module again.");
					repeatedExecutionReported = true;
				}
			}
		}

		if ( shouldSkipExecution() ) {
			return;
		}

		// avoid early evaluation of the module value
		oModule.content = undefined;

		// Note: dependencies will be resolved and converted from RJS to URN inside requireAll
		requireAll(oModule, aDependencies, function(aModules) {

			// avoid double execution of the module, e.g. when async/sync conflict occurred while waiting for dependencies
			if ( shouldSkipExecution() ) {
				return;
			}

			// factory
			if ( bLoggable ) {
				log.debug("define(" + sResourceName + "): calling factory " + typeof vFactory);
			}

			if ( bExport && syncCallBehavior !== 2 ) {
				// ensure parent namespace
				var aPackages = sResourceName.split('/');
				if ( aPackages.length > 1 ) {
					getGlobalObject(__global, aPackages, aPackages.length - 1, true);
				}
			}

			if ( typeof vFactory === 'function' ) {
				// from https://github.com/amdjs/amdjs-api/blob/master/AMD.md
				// "If the factory function returns a value (an object, function, or any value that coerces to true),
				//  then that value should be assigned as the exported value for the module."
				try {
					var exports = vFactory.apply(__global, aModules);
					if ( oModule._api && oModule._api.exports !== undefined && oModule._api.exports !== oModule._exports ) {
						exports = oModule._api.exports;
					} else if ( exports === undefined && oModule._exports ) {
						exports = oModule._exports;
					}
					oModule.content = exports;
				} catch (error) {
					oModule.fail(error);
					if ( bAsync ) {
						return;
					}
					throw error;
				}
			} else {
				oModule.content = vFactory;
			}

			// HACK: global export
			if ( bExport && syncCallBehavior !== 2 ) {
				if ( oModule.content == null ) {
					log.error("Module '" + sResourceName + "' returned no content, but should export to global?");
				} else {
					if ( bLoggable ) {
						log.debug("exporting content of '" + sResourceName + "': as global object");
					}
					// convert module name to UI5 module name syntax (might fail!)
					var sModuleName = urnToUI5(sResourceName);
					setGlobalProperty(sModuleName, oModule.content);
				}
			}

			oModule.ready();

		}, function(oErr) {
			// @evo-todo wrap error with current module?
			oModule.fail(oErr);
			if ( !bAsync ) {
				throw oErr;
			}
		}, /* bAsync = */ bAsync);

	}

	function ui5Define(sModuleName, aDependencies, vFactory, bExport) {
		var sResourceName,
			oCurrentExecInfo;

		// optional id
		if ( typeof sModuleName === 'string' ) {
			sResourceName = sModuleName + '.js';
		} else {
			// shift parameters
			bExport = vFactory;
			vFactory = aDependencies;
			aDependencies = sModuleName;
			sResourceName = null;
		}

		// optional array of dependencies
		if ( !Array.isArray(aDependencies) ) {
			// shift parameters
			bExport = vFactory;
			vFactory = aDependencies;
			if ( typeof vFactory === 'function' && vFactory.length > 0 ) {
				aDependencies = ['require', 'exports', 'module'].slice(0, vFactory.length);
			} else {
				aDependencies = [];
			}
		}

		if ( bForceSyncDefines === false || (bForceSyncDefines == null && bGlobalAsyncMode) ) {
			queue.push(sResourceName, aDependencies, vFactory, bExport);
			if ( sResourceName != null ) {
				var oModule = Module.get(sResourceName);
				if ( oModule.state === INITIAL ) {
					oModule.state = EXECUTING;
					oModule.async = true;
				}
			}
			return;
		}

		// immediate, synchronous execution
		oCurrentExecInfo = _execStack.length > 0 ? _execStack[_execStack.length - 1] : null;
		if ( !sResourceName ) {

			if ( oCurrentExecInfo && !oCurrentExecInfo.used ) {
				sResourceName = oCurrentExecInfo.name;
				oCurrentExecInfo.used = true;
			} else {
				// give anonymous modules a unique pseudo ID
				sResourceName = '~anonymous~' + (++iAnonymousModuleCount) + '.js';
				if ( oCurrentExecInfo ) {
					sResourceName = oCurrentExecInfo.name.slice(0, oCurrentExecInfo.name.lastIndexOf('/') + 1) + sResourceName;
				}
				log.error(
					"Modules that use an anonymous define() call must be loaded with a require() call; " +
					"they must not be executed via script tag or nested into other modules. " +
					"All other usages will fail in future releases or when standard AMD loaders are used " +
					"or when ui5loader runs in async mode. Now using substitute name " + sResourceName);
			}
		} else if ( oCurrentExecInfo && !oCurrentExecInfo.used && sResourceName !== oCurrentExecInfo.name ) {
			log.debug("module names don't match: requested: " + sModuleName + ", defined: ", oCurrentExecInfo.name);
			Module.get(oCurrentExecInfo.name).addAlias(sModuleName);
		}
		executeModuleDefinition(sResourceName, aDependencies, vFactory, bExport, /* bAsync = */ false);

	}

	/**
	 * The amdDefine() function is closer to the AMD spec, as opposed to sap.ui.define.
	 * It's later assigned as the global define() if the loader is running in amd=true
	 * mode (has to be configured explicitly).
	 */
	function amdDefine(sModuleName, aDependencies, vFactory) {
		var oArgs = arguments;
		var bExportIsSet = typeof oArgs[oArgs.length - 1] === "boolean";

		// bExport parameter is proprietary and should not be used for an AMD compliant define()
		if (bExportIsSet) {
			oArgs = Array.prototype.slice.call(oArgs, 0, oArgs.length - 1);
		}

		ui5Define.apply(this, oArgs);
	}
	amdDefine.amd = {}; // identify as AMD-spec compliant loader


	/**
	 * Create a require() function which acts in the context of the given resource.
	 *
	 * @param {string|null} sContextName Name of the context resource (module) in URN syntax, incl. extension
	 * @param {boolean} bAMDCompliance If set to true, the behavior of the require() function is closer to the AMD specification.
	 * @returns {function} Require function.
	 */
	function createContextualRequire(sContextName, bAMDCompliance) {
		var fnRequire = function(vDependencies, fnCallback, fnErrCallback) {
			var sModuleName;

			assert(typeof vDependencies === 'string' || Array.isArray(vDependencies), "dependency param either must be a single string or an array of strings");
			assert(fnCallback == null || typeof fnCallback === 'function', "callback must be a function or null/undefined");
			assert(fnErrCallback == null || typeof fnErrCallback === 'function', "error callback must be a function or null/undefined");

			// Probing for existing module
			if ( typeof vDependencies === 'string' ) {
				sModuleName = getMappedName(vDependencies + '.js', sContextName);
				var oModule = Module.get(sModuleName);

				// check the modules internal state
				// everything from PRELOADED to LOADED (incl. FAILED) is considered erroneous
				if (bAMDCompliance && oModule.state !== EXECUTING && oModule.state !== READY) {
					throw new Error(
						"Module '" + sModuleName + "' has not been loaded yet. " +
						"Use require(['" + sModuleName + "']) to load it."
					);
				}

				// Module is in state READY or EXECUTING; or require() was called from sap.ui.require().
				// A modules value might be undefined (no return statement) even though the state is READY.
				return oModule.value();
			}

			requireAll(sContextName, vDependencies, function(aModules) {
				if ( typeof fnCallback === 'function' ) {
					if ( bGlobalAsyncMode ) {
						fnCallback.apply(__global, aModules);
					} else {
						// enforce asynchronous execution of callback even in sync mode
						setTimeout(function() {
							fnCallback.apply(__global, aModules);
						}, 0);
					}
				}
			}, function(oErr) {
				if ( typeof fnErrCallback === 'function' ) {
					if ( bGlobalAsyncMode ) {
						fnErrCallback.call(__global, oErr);
					} else {
						setTimeout(function() {
							fnErrCallback.call(__global, oErr);
						}, 0);
					}
				} else {
					throw oErr;
				}
			}, /* bAsync = */ bGlobalAsyncMode);

			// return undefined;
		};
		fnRequire.toUrl = function(sName) {
			var sMappedName = ensureTrailingSlash(getMappedName(sName, sContextName), sName);
			return toUrl(sMappedName);
		};
		return fnRequire;
	}

	function ensureTrailingSlash(sName, sInput) {
		//restore trailing slash
		if (sInput.slice(-1) === "/" && sName.slice(-1) !== "/") {
			return sName + "/";
		}
		return sName;
	}

	function toUrl(sName) {
		if (sName.indexOf("/") === 0) {
			throw new Error("The provided argument '" + sName + "' may not start with a slash");
		}
		return ensureTrailingSlash(getResourcePath(sName), sName);
	}

	/*
	 * UI5 version of require (sap.ui.require)
	 */
	var ui5Require = createContextualRequire(null, false);

	/*
	 * AMD version of require (window.require)
	 *
	 * Difference between require (sap.ui.require) and amdRequire (window.require):
	 * - require("my/module"), returns undefined if the module was not loaded yet
	 * - amdRequire("my/module"), throws an error if the module was not loaded yet
	 */
	var amdRequire = createContextualRequire(null, true);

	function requireSync(sModuleName) {
		sModuleName = getMappedName(sModuleName + '.js');
		return requireModule(null, sModuleName, /* bAsync = */ false);
	}

	function predefine(sModuleName, aDependencies, vFactory, bExport) {
		if ( typeof sModuleName !== 'string' ) {
			throw new Error("predefine requires a module name");
		}
		sModuleName = normalize(sModuleName);
		Module.get(sModuleName + '.js').preload("<unknown>/" + sModuleName, [sModuleName, aDependencies, vFactory, bExport], null);
	}

	function preload(modules, group, url) {
		group = group || null;
		url = url || "<unknown>";
		for ( var name in modules ) {
			name = normalize(name);
			Module.get(name).preload(url + "/" + name, modules[name], group);
		}
	}

	/**
	 * Dumps information about the current set of modules and their state.
	 *
	 * @param {int} [iThreshold=-1] Earliest module state for which odules should be reported
	 * @private
	 */
	function dumpInternals(iThreshold) {

		var states = [PRELOADED, INITIAL, LOADED, READY, FAILED, EXECUTING, LOADING];
		var stateNames = {};
		stateNames[PRELOADED] = 'PRELOADED';
		stateNames[INITIAL] = 'INITIAL';
		stateNames[LOADING] = 'LOADING';
		stateNames[LOADED] = 'LOADED';
		stateNames[EXECUTING] = 'EXECUTING';
		stateNames[READY] = 'READY';
		stateNames[FAILED] = 'FAILED';

		if ( iThreshold == null ) {
			iThreshold = PRELOADED;
		}

		/*eslint-disable no-console */
		var info = log.isLoggable('INFO') ? log.info.bind(log) : console.info.bind(console);
		/*eslint-enable no-console */

		var aModuleNames = Object.keys(mModules).sort();
		states.forEach(function(state) {
			if ( state  < iThreshold ) {
				return;
			}
			var count = 0;
			info(stateNames[state] + ":");
			aModuleNames.forEach(function(sModule, idx) {
				var oModule = mModules[sModule];
				if ( oModule.state === state ) {
					var addtlInfo;
					if ( oModule.state === LOADING ) {
						var pending = oModule.pending && oModule.pending.reduce(function(acc, dep) {
							var oDepModule = Module.get(dep);
							if ( oDepModule.state !== READY ) {
								acc.push( dep + "(" + stateNames[oDepModule.state] + ")");
							}
							return acc;
						}, []);
						if ( pending && pending.length > 0 ) {
							addtlInfo = "waiting for " + pending.join(", ");
						}
					} else if ( oModule.state === FAILED ) {
						addtlInfo = (oModule.error.name || "Error") + ": " + oModule.error.message;
					}
					info("  " + (idx + 1) + " " + sModule + (addtlInfo ? " (" + addtlInfo + ")" : ""));
					count++;
				}
			});
			if ( count === 0 ) {
				info("  none");
			}
		});

	}

	/**
	 * Returns a flat copy of the current set of URL prefixes.
	 *
	 * @private
	 */
	function getUrlPrefixes() {
		var mUrlPrefixesCopy = Object.create(null);
		forEach(mUrlPrefixes, function(sNamePrefix, oUrlInfo) {
			mUrlPrefixesCopy[sNamePrefix] = oUrlInfo.url;
		});
		return mUrlPrefixesCopy;
	}

	/**
	 * Removes a set of resources from the resource cache.
	 *
	 * @param {string} sName unified resource name of a resource or the name of a preload group to be removed
	 * @param {boolean} [bPreloadGroup=true] whether the name specifies a preload group, defaults to true
	 * @param {boolean} [bUnloadAll] Whether all matching resources should be unloaded, even if they have been executed already.
	 * @param {boolean} [bDeleteExports] Whether exports (global variables) should be destroyed as well. Will be done for UI5 module names only.
	 * @experimental Since 1.16.3 API might change completely, apps must not develop against it.
	 * @private
	 */
	function unloadResources(sName, bPreloadGroup, bUnloadAll, bDeleteExports) {
		var aModules = [],
			sURN, oModule;

		if ( bPreloadGroup == null ) {
			bPreloadGroup = true;
		}

		if ( bPreloadGroup ) {
			// collect modules that belong to the given group
			for ( sURN in mModules ) {
				oModule = mModules[sURN];
				if ( oModule && oModule.group === sName ) {
					aModules.push(sURN);
				}
			}

		} else {
			// single module
			if ( mModules[sName] ) {
				aModules.push(sName);
			}
		}

		aModules.forEach(function(sURN) {
			var oModule = mModules[sURN];
			if ( oModule && bDeleteExports && sURN.match(/\.js$/) ) {
				// @evo-todo move to compat layer?
				setGlobalProperty(urnToUI5(sURN), undefined);
			}
			if ( oModule && (bUnloadAll || oModule.state === PRELOADED) ) {
			  delete mModules[sURN];
			}
		});

	}

	function getModuleContent(name, url) {
		if ( name ) {
			name = getMappedName(name);
		} else {
			name = guessResourceName(url);
		}
		var oModule = name && mModules[name];
		if ( oModule ) {
			oModule.state = LOADED;
			return oModule.data;
		} else {
			return undefined;
		}
	}

	/**
	 * Returns an info about all known resources keyed by their URN.
	 *
	 * If the URN can be converted to a UI5 module name, then the value in the map
	 * will be that name. Otherwise it will be null or undefined.
	 *
	 * @return {Object.<string,string>} Map of all module names keyed by their resource name
	 * @see isDeclared
	 * @private
	 */
	function getAllModules() {
		var mSnapshot = Object.create(null);
		forEach(mModules, function(sURN, oModule) {
			mSnapshot[sURN] = {
				state: oModule.state,
				ui5: urnToUI5(sURN)
			};
		});
		return mSnapshot;
	}

	function loadJSResourceAsync(sResource, bIgnoreErrors) {
		sResource = getMappedName(sResource);
		var promise = requireModule(null, sResource, /* bAsync = */ true);
		return bIgnoreErrors ? promise.catch(noop) : promise;
	}

	// ---- config --------------------------------------------------------------------------------

	var mUI5ConfigHandlers = {
		baseUrl: function(url) {
			registerResourcePath("", url);
		},
		paths: registerResourcePath, // has length 2
		shim: function(module, shim) {
			if ( Array.isArray(shim) ) {
				shim = { deps : shim };
			}
			mShims[module + '.js'] = shim;
		},
		amd: function(bValue) {
			bValue = !!bValue;
			if ( bExposeAsAMDLoader !== bValue ) {
				bExposeAsAMDLoader = bValue;
				if (bValue) {
					vOriginalDefine = __global.define;
					vOriginalRequire = __global.require;
					__global.define = amdDefine;
					__global.require = amdRequire;

					// Enable async loading behaviour implicitly when switching to amd mode
					bGlobalAsyncMode = true;
				} else {
					__global.define = vOriginalDefine;
					__global.require = vOriginalRequire;
					// NOTE: Do not set async mode back to false when amd mode gets deactivated
				}
			}
		},
		async: function(async) {
			if (bGlobalAsyncMode && !async) {
				throw new Error("Changing the ui5loader config from async to sync is not supported. Only a change from sync to async is allowed.");
			}
			bGlobalAsyncMode = !!async;
		},
		debugSources: function(debug) {
			bDebugSources = !!debug;
		},
		depCache: function(module, deps) {
			mDepCache[module + '.js'] = deps.map(function(dep) { return dep + '.js'; });
		},
		depCacheUI5: function(module, deps) {
			mDepCache[module] = deps;
		},
		ignoreBundledResources: function(filter) {
			if ( filter == null || typeof filter === 'function' ) {
				fnIgnorePreload = filter;
			}
		},
		map: function(context, map) {
			// @evo-todo ignore empty context, empty prefix?
			if ( map == null ) {
				delete mMaps[context];
			} else if ( typeof map === 'string' ) {
				// SystemJS style config
				mMaps['*'][context] = map;
			} else {
				mMaps[context] = mMaps[context] || Object.create(null);
				forEach(map, function(alias, name) {
					mMaps[context][alias] = name;
				});
			}
		},
		reportSyncCalls: function(report) {
			if ( report === 0 || report === 1 || report === 2 ) {
				syncCallBehavior = report;
			}
		},
		noConflict: function(bValue) {
			log.warning("Config option 'noConflict' has been deprecated, use option 'amd' instead, if still needed.");
			mUI5ConfigHandlers.amd(!bValue);
		}
	};

	/**
	 * Config handlers used when amd mode is enabled.
	 * References only methods defined in the AMD spec.
	 */
	var mAMDConfigHandlers = {
		baseUrl: mUI5ConfigHandlers.baseUrl,
		paths: function (module, url) {
			registerResourcePath(module, resolveURL(url, getResourcePath("") + "/"));
		},
		map: mUI5ConfigHandlers.map,
		shim: mUI5ConfigHandlers.shim
	};

	/**
	 * Executes all available handlers which are defined in the config object
	 *
	 * @param {object} oCfg config to handle
	 * @param {map} mHandlers all available handlers
	 */
	function handleConfigObject(oCfg, mHandlers) {

		function processConfig(key, value) {
			var handler = mHandlers[key];
			if ( typeof handler === 'function' ) {
				if ( handler.length === 1) {
					handler(value);
				} else if ( value != null ) {
					forEach(value, handler);
				}
			} else {
				log.warning("configuration option " + key + " not supported (ignored)");
			}
		}

		// Make sure the 'baseUrl' handler is called first as
		// other handlers (e.g. paths) depend on it
		if (oCfg.baseUrl) {
			processConfig("baseUrl", oCfg.baseUrl);
		}

		forEach(oCfg, function(key, value) {
			// Ignore "baseUrl" here as it will be handled above
			if (key !== "baseUrl") {
				processConfig(key, value);
			}
		});
	}

	function ui5Config(cfg) {
		if ( cfg === undefined ) {
			return {
				amd: bExposeAsAMDLoader,
				async: bGlobalAsyncMode,
				noConflict: !bExposeAsAMDLoader // TODO needed?
			};
		}
		handleConfigObject(cfg, mUI5ConfigHandlers);
	}

	function amdConfig(cfg) {
		if ( cfg === undefined ) {
			return undefined;
		}
		handleConfigObject(cfg, mAMDConfigHandlers);
	}

	// expose preload function as property of sap.ui.require
	ui5Require.preload = preload;

	// @evo-todo really use this hook for loading. But how to differentiate between sync and async?
	// for now, it is only a notification hook to attach load tests
	ui5Require.load = function(context, url, id) {
	};

	var privateAPI = {
		amdDefine: amdDefine,
		amdRequire: amdRequire,
		config: ui5Config,
		declareModule: function(sResourceName) {
			/* void */ declareModule( normalize(sResourceName) );
		},
		defineModuleSync: defineModuleSync,
		dump: dumpInternals,
		getAllModules: getAllModules,
		getModuleContent: getModuleContent,
		getModuleState: function(sResourceName) {
			return mModules[sResourceName] ? mModules[sResourceName].state : INITIAL;
		},
		getResourcePath: getResourcePath,
		getSyncCallBehavior: getSyncCallBehavior,
		getUrlPrefixes: getUrlPrefixes,
		loadJSResourceAsync: loadJSResourceAsync,
		resolveURL: resolveURL,
		toUrl: toUrl,
		unloadResources: unloadResources
	};
	Object.defineProperties(privateAPI, {
		logger: {
			get: function() {
				return log;
			},
			set: function(v) {
				log = v;
			}
		},
		measure: {
			get: function() {
				return measure;
			},
			set: function(v) {
				measure = v;
			}
		},
		assert: {
			get: function() {
				return assert;
			},
			set: function(v) {
				assert = v;
			}
		},
		translate: {
			get: function() {
				return translate;
			},
			set: function(v) {
				translate = v;
			}
		}
	});

	// establish APIs in the sap.ui namespace

	__global.sap = __global.sap || {};
	sap.ui = sap.ui || {};

	/**
	 * Provides access to UI5 loader configuration.
	 *
	 * The configuration is used by {@link sap.ui.require} and {@link sap.ui.define}.
	 *
	 * @public
	 * @namespace
	 */
	sap.ui.loader = {

		/**
		 * Sets the configuration for the UI5 loader. The configuration can be updated multiple times.
		 * Later changes do not impact modules that have been loaded before.
		 *
		 * If no parameter is given, a partial copy of UI5 loader configuration in use is returned.
		 *
		 * The configuration options are aligned with the "Common Config" draft of the AMD spec
		 * (https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md).
		 *
		 * The following code shows an example of what a UI5 loader configuration might look like:
		 * <pre>
		 *
		 *   sap.ui.loader.config({
		 *
		 *     // location from where to load all modules by default
		 *     baseUrl: '../../resources/',
		 *
		 *     paths: {
		 *       // load modules whose ID equals to or starts with 'my/module' from example.com
		 *       'my/module': 'https://example.com/resources/my/module'
		 *     },
		 *
		 *     map: {
		 *       // if any module requires 'sinon', load module 'sap/ui/thirdparty/sinon-4'
		 *       '*': {
		 *         'sinon': 'sap/ui/thirdparty/sinon-4'
		 *       },
		 *       // but if a module whose ID equals to or starts with 'app' requires 'sinon'
		 *       // then load a legacy version instead
		 *       "app": {
		 *         'sinon': 'sap/ui/legacy/sinon'
		 *       }
		 *     },
		 *
		 *     // activate real async loading and module definitions
		 *     async: true,
		 *
		 *     // provide dependency and export metadata for non-UI5 modules
		 *     shim: {
		 *       'sap/ui/thirdparty/blanket': {
		 *         amd: true,
		 *         exports: 'blanket'
		 *       }
		 *     }
		 *
		 *   });
		 *
		 * </pre>
		 *
		 * @param {object|undefined} [cfg]
		 *   The provided configuration gets merged with the UI5 loader configuration in use.
		 *   If <code>cfg</code> is omitted or <code>undefined</code>, a copy of the current configuration
		 *   gets returned, containing at least the properties <code>amd</code> and <code>async</code>.
		 *
		 * @param {string} [cfg.baseUrl='./']
		 *   Default location to load modules from. If none of the configured <code>paths</code> prefixes
		 *   matches a module ID, the module will be loaded from the concatenation of the <code>baseUrl</code>
		 *   and the module ID.
		 *
		 *   If the <code>baseUrl</code> itself is a relative URL, it is evaluated relative to <code>document.baseURI</code>.
		 *
		 * @param {Object.<string, string>} [cfg.paths]
		 *   A map of resource locations keyed by a corresponding module ID prefix.
		 *   When a module is to be loaded, the longest key in <code>paths</code> is searched that is a
		 *   prefix of the module ID. The module will be loaded from the concatenation of the corresponding
		 *   value in <code>paths</code> and the remainder of the module ID (after the prefix). If no entry
		 *   in <code>paths</code> matches, then the module will be loaded from the <code>baseUrl</code>.
		 *
		 *   The prefixes (keys) must not contain relative segments (./ or ../), a trailing slash will be
		 *   removed, and only full name segment matches are considered a match (prefix 'sap/m' does not
		 *   match a module ID 'sap/main').
		 *
		 *   <b>Note</b>: In contrast to the "Common Config" of the AMD spec, the paths (values in the map)
		 *   are interpreted relative to <code>document.baseURI</code>, not relative to <code>cfg.baseUrl</code>.
		 *
		 * @param {Object.<string, Object.<string, string>>} [cfg.map]
		 *   A map of maps that defines how to map module IDs to other module IDs (inner maps)
		 *   in the context of a specific set of modules (keys of outer map).
		 *
		 *   Each key of the outer map represents a module ID prefix that describes the context for which
		 *   its value (inner map) has to be used. The special key <code>*</code> describes the default
		 *   context which applies for any module. Only the most specific matching context will be taken
		 *   into account.
		 *
		 *   Each inner map maps a module ID or module ID prefix to another module ID or module ID prefix.
		 *   Again, only the most specific match is taken into account and only one mapping is evaluated
		 *   (the evaluation of the mappings is not done recursively).
		 *
		 *   Matches are always complete matches, a prefix 'a/b/c' does not match the module ID 'a/b/com'.
		 *
		 * @param {Object.<string, {amd: boolean, deps: string[], exports: (string|string[])}>} [cfg.shim]
		 *   Defines additional metadata for modules for which the normal behavior of the AMD APIs is
		 *   not sufficient.
		 *
		 *   A typical example are scripts that don't use <code>define</code> or <code>sap.ui.define</code>,
		 *   but export to a global name. With the <code>exports</code> property, one or more export
		 *   names can be specified, and the loader can retrieve the exported value after executing the
		 *   corresponding module. If such a module has dependencies, they can be specified in the
		 *   <code>deps</code> array and are loaded and executed before executing the module.
		 *
		 *   The <code>amd</code> flag of a shim is a ui5loader-specific extension of the standard AMD shims.
		 *   If set, the ui5loader hides a currently active AMD loader before executing the module
		 *   and restores it afterwards. Otherwise, it might miss the export of third party modules that
		 *   check for an AMD loader and register with it instead of exporting to a global name. A future
		 *   version of the ui5loader might ignore this flag when it acts as an AMD loader by itself.
		 *
		 *   <b>Note:</b> The ui5loader does not support the <code>init</code> option described by the
		 *   "Common Config" section of the AMD spec.
		 *
		 * @param {boolean} [cfg.async=false]
		 *   When set to true, <code>sap.ui.require</code> loads modules asynchronously via script tags and
		 *   <code>sap.ui.define</code> executes asynchronously. To enable this feature, it is recommended to
		 *   set the attribute <code>data-sap-ui-async="true"</code> on the application bootstrap tag.
		 *
		 *   <b>Note:</b> Switching back from async to sync is not supported and trying to do so will throw
		 *   an <code>Error</code>
		 *
		 * @param {boolean} [cfg.amd=false]
		 *   When set to true, the ui5loader will overwrite the global properties <code>define</code>
		 *   and <code>require</code> with its own implementations. Any previously active AMD loader will
		 *   be remembered internally and can be restored by setting <code>amd</code> to false again.
		 *
		 *   <b>Note:</b> Switching to the <code>amd</code> mode, the ui5loader will set <code>async</code>
		 *   to true implicitly for activating asynchronous loading. Once the loading behaviour has been
		 *   defined to be asynchronous, it can not be changed to synchronous behaviour again, also not
		 *   via setting <code>amd</code> to false.
		 *
		 * @returns {object|undefined} UI5 loader configuration in use.
		 * @throws {Error} When trying to switch back from async mode to sync mode.
		 * @public
		 * @since 1.56.0
		 * @function
		 */
		config: ui5Config,

		/**
		 * Internal API of the UI5 loader.
		 *
		 * Must not be used by code outside sap.ui.core.
		 * @private
		 */
		_: privateAPI
	};

	/**
	 * Sets the configuration of the ui5loader. The configuration can be updated multiple times.
	 * Later changes do not impact modules that have been loaded before.
	 *
	 * Setting the <code>amd</code> option of the sap.ui.loader.config to <code>true</code> is a
	 * prerequisite to use the <code>require.config</code> function
	 * (see {@link sap.ui.loader.config sap.ui.loader.config option amd}).
	 *
	 * The ui5loader acts more AMD compliant in relation to resolution of paths defined as
	 * part of the <code>paths</code> configuration option.
	 *
	 * @param {object} cfg The provided configuration gets merged with the UI5 loader configuration in use.
	 *
	 * @param {string} [cfg.baseUrl='./']
	 *   Default location to load modules from. If none of the configured <code>paths</code> prefixes
	 *   matches a module ID, the module will be loaded from the concatenation of the <code>baseUrl</code>
	 *   and the module ID.
	 *
	 *   If the <code>baseUrl</code> itself is a relative URL, it is evaluated relative to <code>document.baseURI</code>.
	 *
	 * @param {object} [cfg.paths]
	 *   A map of resource locations keyed by a corresponding module ID prefix.
	 *   When a module is to be loaded, the longest key in <code>paths</code> is searched that is a
	 *   prefix of the module ID. The module will be loaded from the concatenation of the corresponding
	 *   value in <code>paths</code> and the remainder of the module ID (after the prefix). If no entry
	 *   in <code>paths</code> matches, then the module will be loaded from the <code>baseUrl</code>.
	 *
	 *   The prefixes (keys) must not contain relative segments (./ or ../), a trailing slash will be
	 *   removed, and only full name segment matches are considered a match (prefix 'sap/m' does not
	 *   match a module ID 'sap/main').
	 *
	 *   <b>Note</b>: In contrast to the {@link sap.ui.loader.config sap.ui.loader.config option paths},
	 *   the paths (values in the map) are interpreted relative to <code>cfg.baseUrl</code>,
	 *   not relative to <code>document.baseURI</code>. The behaviour is exactly as described in the "Common Config" draft
	 *   of the AMD spec (https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md).
	 *
	 * @param {Object.<string, Object.<string, string>>} [cfg.map]
	 *   A map of maps that defines how to map module IDs to other module IDs (inner maps)
	 *   in the context of a specific set of modules (keys of outer map).
	 *
	 *   Each key of the outer map represents a module ID prefix that describes the context for which
	 *   its value (inner map) has to be used. The special key <code>*</code> describes the default
	 *   context which applies for any module. Only the most specific matching context will be taken
	 *   into account.
	 *
	 *   Each inner map maps a module ID or module ID prefix to another module ID or module ID prefix.
	 *   Again, only the most specific match is taken into account and only one mapping is evaluated
	 *   (the evaluation of the mappings is not done recursively).
	 *
	 *   Matches are always complete matches, a prefix 'a/b/c' does not match the module ID 'a/b/com'.
	 *
	 * @param {Object.<string, {deps: string[], exports: (string|string[])}>} [cfg.shim]
	 *   Defines additional metadata for modules for which the normal behavior of the AMD APIs is
	 *   not sufficient.
	 *
	 *   A typical example are scripts that don't use <code>define</code> or <code>sap.ui.define</code>,
	 *   but export to a global name. With the <code>exports</code> property, one or more export
	 *   names can be specified, and the loader can retrieve the exported value after executing the
	 *   corresponding module. If such a module has dependencies, they can be specified in the
	 *   <code>deps</code> array and are loaded and executed before executing the module.
	 *
	 *   <b>Note:</b> The ui5loader does not support the <code>init</code> option described by the
	 *   "Common Config" section of the AMD spec.
	 *
	 * @returns {undefined}
	 * @public
	 * @name require_config
	 * @function
	 */
	amdRequire.config = amdConfig;

	/**
	 * Defines a JavaScript module with its ID, its dependencies and a module export value or factory.
	 *
	 * The typical and only suggested usage of this method is to have one single, top level call to
	 * <code>sap.ui.define</code> in one JavaScript resource (file). When a module is requested by its
	 * module ID for the first time, the corresponding resource is determined from the ID and the current
	 * {@link sap.ui.loader.config configuration}. The resource will be loaded and executed
	 * which in turn will execute the top level <code>sap.ui.define</code> call.
	 *
	 * If the module ID was omitted from that call, it will be substituted by the ID that was used to
	 * request the module. As a preparation step, the dependencies as well as their transitive dependencies,
	 * will be loaded. Then, the module value (its export) will be determined: if a static value (object, literal)
	 * was given as <code>vFactory</code>, that value will be the module value. If a function was given, that
	 * function will be called (providing the module exports of the declared dependencies as parameters
	 * to the function) and its return value will be used as module export value. The framework internally
	 * associates the resulting value with the module ID and provides it to the original requester of the module.
	 * Whenever the module is requested again, the same export value will be returned (modules are executed only once).
	 *
	 * <i>Example:</i><br>
	 * The following example defines a module, but doesn't hard code the module ID.
	 * If stored in a file 'sap/mylib/SomeClass.js', it can be requested with the ID 'sap/mylib/SomeClass'.
	 * <pre>
	 *   sap.ui.define(['./Helper', 'sap/m/Bar'], function(Helper,Bar) {
	 *
	 *     // create a new class
	 *     var SomeClass = function() {};
	 *
	 *     // add methods to its prototype
	 *     SomeClass.prototype.foo = function() {
	 *
	 *         // use a function from the dependency 'Helper' in the same package (e.g. 'sap/mylib/Helper' )
	 *         var mSettings = Helper.foo();
	 *
	 *         // create and return an sap.m.Bar (using its local name 'Bar')
	 *         return new Bar(mSettings);
	 *
	 *     }
	 *
	 *     // return the class as module value
	 *     return SomeClass;
	 *
	 *   });
	 * </pre>
	 *
	 * In another module or in an application HTML page, the {@link sap.ui.require} API can be used
	 * to load the sap/mylib/Something module and to work with it:
	 *
	 * <pre>
	 * sap.ui.require(['sap/mylib/Something'], function(Something) {
	 *
	 *   // instantiate a Something and call foo() on it
	 *   new Something().foo();
	 *
	 * });
	 * </pre>
	 *
	 *
	 * <h3>Module Name Syntax</h3>
	 *
	 * <code>sap.ui.define</code> uses a simplified variant of the {@link jQuery.sap.getResourcePath
	 * unified resource name} syntax for the module's own name as well as for its dependencies.
	 * The only difference to that syntax is, that for <code>sap.ui.define</code> and
	 * <code>sap.ui.require</code>, the extension (which always would be '.js') has to be omitted.
	 * Both methods always add this extension internally.
	 *
	 * As a convenience, the name of a dependency can start with the segment './' which will be
	 * replaced by the name of the package that contains the currently defined module (relative name).
	 *
	 * It is best practice to omit the name of the defined module (first parameter) and to use
	 * relative names for the dependencies whenever possible. This reduces the necessary configuration,
	 * simplifies renaming of packages and allows to map them to a different namespace.
	 *
	 *
	 * <h3>Dependency to Modules</h3>
	 *
	 * If a dependencies array is given, each entry represents the name of another module that
	 * the currently defined module depends on. All dependency modules are loaded before the export
	 * of the currently defined module is determined. The module export of each dependency module
	 * will be provided as a parameter to a factory function, the order of the parameters will match
	 * the order of the modules in the dependencies array.
	 *
	 * <b>Note:</b> The order in which the dependency modules are <i>executed</i> is <b>not</b>
	 * defined by the order in the dependencies array! The execution order is affected by dependencies
	 * <i>between</i> the dependency modules as well as by their current state (whether a module
	 * already has been loaded or not). Neither module implementations nor dependents that require
	 * a module set must make any assumption about the execution order (other than expressed by
	 * their dependencies).
	 *
	 * <b>Note:</b> A static module export (a literal provided to <code>sap.ui.define</code>) cannot
	 * depend on the module exports of the dependency modules as it has to be calculated before
	 * the dependencies are resolved. As an alternative, modules can define a factory function,
	 * calculate a static export value in that function, potentially based on the dependencies, and
	 * return the result as module export value. The same approach must be taken when the module
	 * export is supposed to be a function.
	 *
	 *
	 * <h3>Asynchronous Contract</h3>
	 *
	 * <code>sap.ui.define</code> is designed to support real Asynchronous Module Definitions (AMD)
	 * in future, although it internally still might use synchronous module loading, depending on
	 * configuration and context. However, callers of <code>sap.ui.define</code> must never rely on
	 * any synchronous behavior that they might observe in a specific test scenario.
	 *
	 * For example, callers of <code>sap.ui.define</code> must not use the module export value
	 * immediately after invoking <code>sap.ui.define</code>:
	 *
	 * <pre>
	 *   // COUNTER EXAMPLE HOW __NOT__ TO DO IT
	 *
	 *   // define a class Something as AMD module
	 *   sap.ui.define('Something', [], function() {
	 *     var Something = function() {};
	 *     return Something;
	 *   });
	 *
	 *   // DON'T DO THAT!
	 *   // accessing the class _synchronously_ after sap.ui.define was called
	 *   new Something();
	 *
	 * </pre>
	 *
	 * Applications that need to ensure synchronous module definition or synchronous loading of dependencies
	 * <b>MUST</b> use the deprecated legacy APIs {@link jQuery.sap.declare} and {@link jQuery.sap.require}.
	 *
	 *
	 * <h3>(No) Global References</h3>
	 *
	 * To be in line with AMD best practices, modules defined with <code>sap.ui.define</code>
	 * should not make any use of global variables if those variables are also available as module
	 * exports. Instead, they should add dependencies to those modules and use the corresponding parameter
	 * of the factory function to access the module exports.
	 *
	 * As the current programming model and the documentation of UI5 heavily rely on global names,
	 * there will be a transition phase where UI5 enables AMD modules and local references to module
	 * exports in parallel to the old global names. The fourth parameter of <code>sap.ui.define</code>
	 * has been added to support that transition phase. When this parameter is set to true, the framework
	 * provides two additional features
	 *
	 * <ol>
	 * <li>Before the factory function is called, the existence of the global parent namespace for
	 *     the current module is ensured</li>
	 * <li>The module export returned by the module's factory function will be automatically exported
	 *     under the global name which is derived from the ID of the module</li>
	 * </ol>
	 *
	 * The parameter lets the framework know whether any of those two operations is needed or not.
	 * In future versions of UI5, a central configuration option is planned to suppress those 'exports'.
	 *
	 *
	 * <h3>Third Party Modules</h3>
	 * Although third party modules don't use UI5 APIs, they still can be listed as dependencies in
	 * a <code>sap.ui.define</code> call. They will be requested and executed like UI5 modules, but to
	 * make their exports available, so called <em>shims</em> have to be defined.
	 *
	 * Note that UI5 temporarily deactivates an existing AMD loader while it executes third party modules
	 * known to support AMD. This sounds contradictorily at a first glance as UI5 wants to support AMD,
	 * but for now it is necessary to fully support UI5 applications that rely on global names for such modules.
	 *
	 * For third-party modules that UI5 delivers (e.g. those in namespace <code>sap/ui/thirdparty/</code>),
	 * the necessary shims are defined by UI5 itself by executing the private module <code>ui5loader-autoconfig.js</code>
	 * during bootstrap.
	 *
	 * Example:
	 * <pre>
	 *   // module 'Something' wants to use third party library 'URI.js'
	 *   // It is packaged by UI5 as non-UI5-module 'sap/ui/thirdparty/URI'
	 *   // the following shim helps UI5 to correctly load URI.js and to retrieve the module's export value
	 *   // Apps don't have to define that shim, it is already applied by ui5loader-autconfig.js
	 *   sap.ui.loader.config({
	 *     shim: {
	 *       'sap/ui/thirdparty/URI': {
	 *          amd: true, // URI.js reacts on an AMD loader, this flag lets UI5 temp. disable such loaders
	 *          exports: 'URI' // name of the global variable under which URI.js exports its module value
	 *       }
	 *     }
	 *   });
	 *
	 *   // now the module can be retrieved like other modules
	 *   sap.ui.define('Something', ['sap/ui/thirdparty/URI'], function(URIModuleValue) {
	 *
	 *     new URIModuleValue(...); // same as the global 'URI' name: new URI(...)
	 *
	 *     ...
	 *   });
	 * </pre>
	 *
	 *
	 * <h3>Differences to Standard AMD</h3>
	 *
	 * The current implementation of <code>sap.ui.define</code> differs from the AMD specification
	 * (https://github.com/amdjs/amdjs-api) or from concrete AMD loaders like <code>requireJS</code>
	 * in several aspects:
	 * <ul>
	 * <li>The name <code>sap.ui.define</code> is different from the plain <code>define</code>.
	 * This has two reasons: first, it avoids the impression that <code>sap.ui.define</code> is
	 * an exact implementation of an AMD loader. And second, it allows the coexistence of an AMD
	 * loader (e.g. requireJS) and <code>sap.ui.define</code> in one application as long as UI5 or
	 * applications using UI5 are not fully prepared to run with an AMD loader.
	 * Note that the difference of the API names also implies that the UI5 loader can't be used
	 * to load 'real' AMD modules as they expect methods <code>define</code> and <code>require</code>
	 * to be available. Modules that use Unified Module Definition (UMD) syntax, can be loaded,
	 * but only when no AMD loader is present or when they expose their export also to the global
	 * namespace, even when an AMD loader is present (as e.g. jQuery does) or when a shim is
	 * defined for them using the <code>amd:true</code> flag (see example above)</li>
	 * <li>Depending on configuration and the current context, <code>sap.ui.define</code> loads
	 * the dependencies of a module either synchronously using a sync XHR call + eval or asynchronously
	 * via script tags. The sync loading is basically a tribute to the synchronous history of UI5.
	 * There's no way for a module developer to enforce synchronous loading of the dependencies and
	 * on the long run, sync loading will be faded out.
	 * Applications that need to ensure synchronous loading of dependencies <b>MUST</b> use the
	 * deprecated legacy APIs like {@link jQuery.sap.require}.</li>
	 * <li><code>sap.ui.define</code> does not support plugins to use other file types, formats or
	 * protocols. It is not planned to support this in future</li>
	 * <li><code>sap.ui.define</code> does not support absolute URLs as module names (dependencies)
	 * nor does it allow module names that start with a slash. To refer to a module at an absolute
	 * URL, a resource root can be registered that points to that URL (or to a prefix of it).</li>
	 * <li><code>sap.ui.define</code> does <b>not</b> support the 'sugar' of requireJS where CommonJS
	 * style dependency declarations using <code>sap.ui.require("something")</code> are automagically
	 * converted into <code>sap.ui.define</code> dependencies before executing the factory function.</li>
	 * </ul>
	 *
	 *
	 * <h3>Limitations, Design Considerations</h3>
	 * <ul>
	 * <li><b>Limitation</b>: as dependency management is not supported for Non-UI5 modules, the only way
	 *     to ensure proper execution order for such modules currently is to rely on the order in the
	 *     dependency array. Obviously, this only works as long as <code>sap.ui.define</code> uses
	 *     synchronous loading. It will be enhanced when asynchronous loading is implemented.</li>
	 * <li>It was discussed to enforce asynchronous execution of the module factory function (e.g. with a
	 *     timeout of 0). But this would have invalidated the current migration scenario where a
	 *     sync <code>jQuery.sap.require</code> call can load a <code>sap.ui.define</code>'ed module.
	 *     If the module definition would not execute synchronously, the synchronous contract of the
	 *     require call would be broken (default behavior in existing UI5 applications)</li>
	 * <li>A single file must not contain multiple calls to <code>sap.ui.define</code>. Multiple calls
	 *     currently are only supported in the so called 'preload' files that the UI5 merge tooling produces.
	 *     The exact details of how this works might be changed in future implementations and are not
	 *     part of the API contract</li>
	 * </ul>
	 * @param {string} [sModuleName] ID of the module in simplified resource name syntax.
	 *        When omitted, the loader determines the ID from the request.
	 * @param {string[]} [aDependencies] List of dependencies of the module
	 * @param {function|any} vFactory The module export value or a function that calculates that value
	 * @param {boolean} [bExport] Whether an export to global names is required - should be used by SAP-owned code only
	 * @since 1.27.0
	 * @public
	 * @see https://github.com/amdjs/amdjs-api
	 * @function
	 */
	sap.ui.define = ui5Define;

	/**
	 * @private
	 * @function
	 */
	sap.ui.predefine = predefine;

	/**
	 * Resolves one or more module dependencies.
	 *
	 * <h3>Synchronous Retrieval of a Single Module Export Value (Probing)</h3>
	 *
	 * When called with a single string, that string is assumed to be the ID of an already loaded
	 * module and the export of that module is returned. If the module has not been loaded yet,
	 * or if it is a Non-UI5 module (e.g. third-party module) without a shim, <code>undefined</code>
	 * is returned.
	 *
	 * This signature variant allows synchronous access to module exports without initiating module loading.
	 *
	 * Sample:
	 * <pre>
	 *   var JSONModel = sap.ui.require("sap/ui/model/json/JSONModel");
	 * </pre>
	 *
	 * For modules that are known to be UI5 modules, this signature variant can be used to check whether
	 * the module has been loaded.
	 *
	 *
	 * <h3>Asynchronous Loading of Multiple Modules</h3>
	 *
	 * If an array of strings is given and (optionally) a callback function, then the strings
	 * are interpreted as module IDs and the corresponding modules (and their transitive
	 * dependencies) are loaded. Then the callback function will be called asynchronously.
	 * The module exports of the specified modules will be provided as parameters to the callback
	 * function in the same order in which they appeared in the dependencies array.
	 *
	 * The return value for the asynchronous use case is <code>undefined</code>.
	 *
	 * <pre>
	 *   sap.ui.require(['sap/ui/model/json/JSONModel', 'sap/ui/core/UIComponent'], function(JSONModel,UIComponent) {
	 *
	 *     var MyComponent = UIComponent.extend('MyComponent', {
	 *       ...
	 *     });
	 *     ...
	 *
	 *   });
	 * </pre>
	 *
	 * This method uses the same variation of the {@link jQuery.sap.getResourcePath unified resource name}
	 * syntax that {@link sap.ui.define} uses: module names are specified without the implicit extension '.js'.
	 * Relative module names are not supported.
	 *
	 * @param {string|string[]} vDependencies Dependency (dependencies) to resolve
	 * @param {function} [fnCallback] Callback function to execute after resolving an array of dependencies
	 * @param {function} [fnErrback] Callback function to execute if an error was detected while loading the
	 *                      dependencies or executing the factory function. Note that due to browser limitations
	 *                      not all errors will be reported via this callback. In general, module loading is
	 *                      designed for the non-error case. Error handling is not complete.
	 * @returns {any|undefined} A single module export value (sync probing variant) or undefined (async loading variant)
	 * @public
	 * @function
	 */
	sap.ui.require = ui5Require;

	/**
	 * Calculates a URL from the provided resource name.
	 *
	 * The calculation takes any configured ID mappings or resource paths into account
	 * (see {@link sap.ui.loader.config config options map and paths}. It also supports relative
	 * segments such as <code>./</code> and <code>../</code> within the path, but not at its beginning.
	 * If relative navigation would cross the root namespace (e.g. <code>sap.ui.require.toUrl("../")</code>)
	 * or when the resource name starts with a slash or with a relative segment, an error is thrown.
	 *
	 * <b>Note:</b> <code>toUrl</code> does not resolve the returned URL; whether it is an absolute
	 * URL or a relative URL depends on the configured <code>baseUrl</code> and <code>paths</code>.
	 *
	 * @example
	 *   sap.ui.loader.config({
	 *     baseUrl: "/home"
	 *   });
	 *
	 *   sap.ui.require.toUrl("app/data")              === "/home/app/data"
	 *   sap.ui.require.toUrl("app/data.json")         === "/home/app/data.json"
	 *   sap.ui.require.toUrl("app/data/")             === "/home/app/data/"
	 *   sap.ui.require.toUrl("app/.config")           === "/home/app/.config"
	 *   sap.ui.require.toUrl("app/test/../data.json") === "/home/data.json"
	 *   sap.ui.require.toUrl("app/test/./data.json")  === "/home/test/data.json"
	 *   sap.ui.require.toUrl("app/../../data")        throws Error because root namespace is left
	 *   sap.ui.require.toUrl("/app")                  throws Error because first character is a slash
	 *
	 * @param {string} sName Name of a resource e.g. <code>'app/data.json'</code>
	 * @returns {string} Path to the resource, e.g. <code>'/home/app/data.json'</code>
	 * @see https://github.com/amdjs/amdjs-api/wiki/require#requiretourlstring-
	 * @throws {Error} If the input name is absolute (starts with a slash character <code>'/'</code>),
	 *   starts with a relative segment or if resolving relative segments would cross the root
	 *   namespace
	 * @public
	 * @name sap.ui.require.toUrl
	 * @function
	 */

	/**
	 * Load a single module synchronously and return its module value.
	 *
	 * Basically, this method is a combination of {@link jQuery.sap.require} and {@link sap.ui.require}.
	 * Its main purpose is to simplify the migration of modules to AMD style in those cases where some dependencies
	 * have to be loaded late (lazy) and synchronously.
	 *
	 * The method accepts a single module name in the same syntax that {@link sap.ui.define} and {@link sap.ui.require}
	 * already use (a simplified variation of the {@link jQuery.sap.getResourcePath unified resource name}:
	 * slash separated names without the implicit extension '.js'). As for <code>sap.ui.require</code>,
	 * relative names (using <code>./</code> or <code>../</code>) are not supported.
	 * If not loaded yet, the named module will be loaded synchronously and the export value of the module will be returned.
	 * While a module is executing, a value of <code>undefined</code> will be returned in case it is required again during
	 * that period of time (e.g. in case of cyclic dependencies).
	 *
	 * <b>Note:</b> Applications are strongly encouraged to use this method only when synchronous loading is unavoidable.
	 * Any code that uses this method won't benefit from future performance improvements that require asynchronous
	 * module loading (e.g. HTTP/2). And such code never can comply with stronger content security policies (CSPs)
	 * that forbid 'eval'.
	 *
	 * @param {string} sModuleName Module name in requireJS syntax
	 * @returns {any} value of the loaded module or undefined
	 * @private
	 * @function
	 */
	sap.ui.requireSync = requireSync;

}(window));
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*
 * IMPORTANT: This is a private module, its API must not be used and is subject to change.
 * Code other than the OpenUI5 libraries must not introduce dependencies to this module.
 */
(function() {

	/*
	 * This module tries to detect a bootstrap script tag in the current page and
	 * to derive the path for 'resources/' from it. For that purpose it checks for a
	 * hard coded set of well-known bootstrap script names:
	 *  - sap-ui-custom(-suffix)?.js
	 *  - sap-ui-core(-suffix)?.js
	 *  - jquery.sap.global.js
	 *  - ui5loader-autoconfig.js
	 */

	/*global console, document, ES6Promise, jQuery, sap, window */
	"use strict";

	var ui5loader = window.sap && window.sap.ui && window.sap.ui.loader,
		oCfg = window['sap-ui-config'] || {},
		sBaseUrl, bNojQuery,
		aScripts, rBootScripts, i,
		oBootstrapScript, sBootstrapUrl, bExposeAsAMDLoader = false;

	function findBaseUrl(oScript, rUrlPattern) {
		var sUrl = oScript && oScript.getAttribute("src"),
			oMatch = rUrlPattern.exec(sUrl);
		if ( oMatch ) {
			sBaseUrl = oMatch[1] || "";
			oBootstrapScript = oScript;
			sBootstrapUrl = sUrl;
			bNojQuery = /sap-ui-core-nojQuery\.js(?:[?#]|$)/.test(sUrl);
			return true;
		}
	}

	function ensureSlash(path) {
		return path && path[path.length - 1] !== '/' ? path + '/' : path;
	}

	if (ui5loader == null) {
		throw new Error("ui5loader-autoconfig.js: ui5loader is needed, but could not be found");
	}

	// Prefer script tags which have the sap-ui-bootstrap ID
	// This prevents issues when multiple script tags point to files named
	// "sap-ui-core.js", for example when using the cache buster for UI5 resources
	if ( !findBaseUrl(document.querySelector('SCRIPT[src][id=sap-ui-bootstrap]'), /^((?:[^?#]*\/)?resources\/)/ ) ) {

		// only when there's no such script tag, check all script tags
		rBootScripts = /^([^?#]*\/)?(?:sap-ui-(?:core|custom|boot|merged)(?:-[^?#/]*)?|jquery.sap.global|ui5loader(?:-autoconfig)?)\.js(?:[?#]|$)/;
		aScripts = document.scripts;
		for ( i = 0; i < aScripts.length; i++ ) {
			if ( findBaseUrl(aScripts[i], rBootScripts) ) {
				break;
			}
		}
	}

	// configuration via window['sap-ui-config'] always overrides an auto detected base URL
	if ( typeof oCfg === 'object'
		 && typeof oCfg.resourceRoots === 'object'
		 && typeof oCfg.resourceRoots[''] === 'string' ) {
		sBaseUrl = oCfg.resourceRoots[''];
	}

	if (sBaseUrl == null) {
		throw new Error("ui5loader-autoconfig.js: could not determine base URL. No known script tag and no configuration found!");
	}

	/**
	 * Determine whether a bootstrap reboot URL is set to reboot UI5 from a different URL
	 */
	(function() {
		var sRebootUrl;
		try { // Necessary for FF when Cookies are disabled
			sRebootUrl = window.localStorage.getItem("sap-ui-reboot-URL");
		} catch (e) { /* no warning, as this will happen on every startup, depending on browser settings */ }

		/*
		* Determine whether sap-bootstrap-debug is set, run debugger statement
		* to allow early debugging in browsers with broken dev tools
		*/
		if (/sap-bootstrap-debug=(true|x|X)/.test(location.search)) {
			/*eslint-disable no-debugger */
			debugger;
			/*eslint-enable no-debugger */
		}

		if (sRebootUrl) {
			var sDebugRebootPath = ensureSlash(sBaseUrl) + 'sap/ui/core/support/debugReboot.js';

			// This won't work in case this script is loaded async (e.g. dynamic script tag)
			document.write("<script src=\"" + sDebugRebootPath + "\"></script>");

			var oRestart = new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: " + sRebootUrl);
			oRestart.name = "Restart";
			throw oRestart;
		}

	})();

	/**
	 * Determine whether to use debug sources depending on URL parameter, local storage
	 * and script tag attribute.
	 * If full debug mode is required, restart with a debug version of the bootstrap.
	 */
	(function() {
		// check URI param
		var mUrlMatch = /(?:^|\?|&)sap-ui-debug=([^&]*)(?:&|$)/.exec(window.location.search),
			vDebugInfo = mUrlMatch && decodeURIComponent(mUrlMatch[1]);

		// check local storage
		try {
			vDebugInfo = vDebugInfo || window.localStorage.getItem("sap-ui-debug");
		} catch (e) {
			// access to localStorage might be disallowed
		}

		// check bootstrapScript attribute
		vDebugInfo = vDebugInfo || (oBootstrapScript && oBootstrapScript.getAttribute("data-sap-ui-debug"));

		// normalize vDebugInfo; afterwards, it either is a boolean or a string not representing a boolean
		if ( typeof vDebugInfo === 'string' ) {
			if ( /^(?:false|true|x|X)$/.test(vDebugInfo) ) {
				vDebugInfo = vDebugInfo !== 'false';
			}
		} else {
			vDebugInfo = !!vDebugInfo;
		}

		// if bootstrap URL explicitly refers to a debug source, generally use debug sources
		if ( /-dbg\.js([?#]|$)/.test(sBootstrapUrl) ) {
			window['sap-ui-loaddbg'] = true;
			vDebugInfo = vDebugInfo || true;
		}

		// export resulting debug mode under legacy property
		window["sap-ui-debug"] = vDebugInfo;

		if ( window["sap-ui-optimized"] && vDebugInfo ) {
			// if current sources are optimized and any debug sources should be used, enable the "-dbg" suffix
			window['sap-ui-loaddbg'] = true;
			// if debug sources should be used in general, restart with debug URL (if not disabled, e.g. by test runner)
			if ( vDebugInfo === true && !window["sap-ui-debug-no-reboot"] ) {
				var sDebugUrl;
				if ( sBootstrapUrl != null ) {
					sDebugUrl = sBootstrapUrl.replace(/\/(?:sap-ui-cachebuster\/)?([^\/]+)\.js/, "/$1-dbg.js");
				} else {
					// when no boot script could be identified, we can't derive the name of the
					// debug boot script from it, so fall back to a default debug boot script
					sDebugUrl = ensureSlash(sBaseUrl) + 'sap-ui-core.js';
				}
				// revert changes to global names
				ui5loader.config({
					amd:false
				});
				window["sap-ui-optimized"] = false;

				if (ui5loader.config().async) {
					var script = document.createElement("script");
					script.src = sDebugUrl;
					document.head.appendChild(script);
				} else {
					document.write("<script src=\"" + sDebugUrl + "\"></script>");
				}

				var oRestart = new Error("This is not a real error. Aborting UI5 bootstrap and restarting from: " + sDebugUrl);
				oRestart.name = "Restart";
				throw oRestart;
			}
		}

		function makeRegExp(sGlobPattern) {
			if (!/\/\*\*\/$/.test(sGlobPattern)) {
				sGlobPattern = sGlobPattern.replace(/\/$/, '/**/');
			}
			return sGlobPattern.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g, function(sMatch) {
				switch (sMatch) {
					case '**/': return '(?:[^/]+/)*';
					case '*': return '[^/]*';
					default: return '\\' + sMatch;
				}
			});
		}

		var fnIgnorePreload;

		if (typeof vDebugInfo === 'string') {
			var sPattern = "^(?:" + vDebugInfo.split(/,/).map(makeRegExp).join("|") + ")",
				rFilter = new RegExp(sPattern);

			fnIgnorePreload = function(sModuleName) {
				return rFilter.test(sModuleName);
			};

			ui5loader._.logger.debug("Modules that should be excluded from preload: '" + sPattern + "'");

		} else if (vDebugInfo === true) {

			fnIgnorePreload = function() {
				return true;
			};

			ui5loader._.logger.debug("All modules should be excluded from preload");

		}

		ui5loader.config({
			debugSources: !!window['sap-ui-loaddbg'],
			ignoreBundledResources: fnIgnorePreload
		});

	})();

	function _getOption(name, defaultValue, pattern) {
		// check for an URL parameter ...
		var match = window.location.search.match(new RegExp("(?:^\\??|&)sap-ui-" + name + "=([^&]*)(?:&|$)"));
		if ( match && (pattern == null || pattern.test(match[1])) ) {
			return match[1];
		}
		// ... or an attribute of the bootstrap tag
		var attrValue = oBootstrapScript && oBootstrapScript.getAttribute("data-sap-ui-" + name.toLowerCase());
		if ( attrValue != null && (pattern == null || pattern.test(attrValue)) ) {
			return attrValue;
		}
		// ... or an entry in the global config object
		if ( Object.prototype.hasOwnProperty.call(oCfg, name) && (pattern == null || pattern.test(oCfg[name])) ) {
			return oCfg[name];
		}
		// compat fallback
		if ( name.slice(0,3) !== "xx-" ) {
			return _getOption("xx-" + name, defaultValue, pattern);
		}
		// if no valid config value is found, fall back to a system default value
		return defaultValue;
	}

	function _getBooleanOption(name, defaultValue) {
		return /^(?:true|x|X)$/.test( _getOption(name, defaultValue, /^(?:true|x|X|false)$/) );
	}

	if ( _getBooleanOption("async", false) ) {
		ui5loader.config({
			async: true
		});
	}

	// support legacy switch 'noLoaderConflict', but 'amdLoader' has higher precedence
	var bExposeAsAMDLoader = _getBooleanOption("amd", !_getBooleanOption("noLoaderConflict", true));

	ui5loader.config({
		baseUrl: sBaseUrl,

		amd: bExposeAsAMDLoader,

		map: {
			"*": {
				'blanket': 'sap/ui/thirdparty/blanket',
				'crossroads': 'sap/ui/thirdparty/crossroads',
				'd3': 'sap/ui/thirdparty/d3',
				'handlebars': 'sap/ui/thirdparty/handlebars',
				'hasher': 'sap/ui/thirdparty/hasher',
				'IPv6': 'sap/ui/thirdparty/IPv6',
				'jquery': 'sap/ui/thirdparty/jquery',
				'jszip': 'sap/ui/thirdparty/jszip',
				'less': 'sap/ui/thirdparty/less',
				'OData': 'sap/ui/thirdparty/datajs',
				'punycode': 'sap/ui/thirdparty/punycode',
				'SecondLevelDomains': 'sap/ui/thirdparty/SecondLevelDomains',
				'sinon': 'sap/ui/thirdparty/sinon',
				'signals': 'sap/ui/thirdparty/signals',
				'URI': 'sap/ui/thirdparty/URI',
				'URITemplate': 'sap/ui/thirdparty/URITemplate',
				'esprima': 'sap/ui/documentation/sdk/thirdparty/esprima'
			}
		},

		shim: {
			'sap/ui/thirdparty/bignumber': {
				amd: true,
				exports: 'BigNumber'
			},
			'sap/ui/thirdparty/blanket': {
				amd: true,
				exports: 'blanket' // '_blanket', 'esprima', 'falafel', 'inBrowser', 'parseAndModify'
			},
			'sap/ui/thirdparty/caja-html-sanitizer': {
				amd: false,
				exports: 'html' // 'html_sanitizer', 'html4'
			},
			'sap/ui/thirdparty/crossroads': {
				amd: true,
				exports: 'crossroads',
				deps: ['sap/ui/thirdparty/signals']
			},
			'sap/ui/thirdparty/d3': {
				amd: true,
				exports: 'd3'
			},
			'sap/ui/thirdparty/datajs': {
				amd: true,
				exports: 'OData' // 'datajs'
			},
			'sap/ui/thirdparty/es6-promise': {
				amd: true,
				exports: 'ES6Promise'
			},
			'sap/ui/thirdparty/flexie': {
				amd: false,
				exports: 'Flexie'
			},
			'sap/ui/thirdparty/handlebars': {
				amd: true,
				exports: 'Handlebars'
			},
			'sap/ui/thirdparty/hasher': {
				amd: true,
				exports: 'hasher',
				deps: ['sap/ui/thirdparty/signals']
			},
			'sap/ui/thirdparty/IPv6': {
				amd: true,
				exports: 'IPv6'
			},
			'sap/ui/thirdparty/iscroll-lite': {
				amd: false,
				exports: 'iScroll'
			},
			'sap/ui/thirdparty/iscroll': {
				amd: false,
				exports: 'iScroll'
			},
			'sap/ui/thirdparty/jquery': {
				amd: true,
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-datepicker': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-core'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-draggable': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-droppable': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-mouse', 'sap/ui/thirdparty/jqueryui/jquery-ui-draggable'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-effect': {
				deps: ['sap/ui/thirdparty/jquery'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-mouse': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-core', 'sap/ui/thirdparty/jqueryui/jquery-ui-widget'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-position': {
				deps: ['sap/ui/thirdparty/jquery'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-resizable': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-selectable': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-sortable': {
				deps: ['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jqueryui/jquery-ui-widget': {
				deps: ['sap/ui/thirdparty/jquery'],
				exports: 'jQuery'
			},
			'sap/ui/thirdparty/jquery-mobile-custom': {
				amd: true,
				deps: ['sap/ui/thirdparty/jquery', 'sap/ui/Device'],
				exports: 'jQuery.mobile'
			},
			'sap/ui/thirdparty/jszip': {
				amd: true,
				exports: 'JSZip'
			},
			'sap/ui/thirdparty/less': {
				amd: true,
				exports: 'less'
			},
			'sap/ui/thirdparty/mobify-carousel': {
				amd: false,
				exports: 'Mobify' // or Mobify.UI.Carousel?
			},
			'sap/ui/thirdparty/qunit-2': {
				amd: false,
				exports: 'QUnit'
			},
			'sap/ui/thirdparty/punycode': {
				amd: true,
				exports: 'punycode'
			},
			'sap/ui/thirdparty/RequestRecorder': {
				amd: true,
				exports: 'RequestRecorder',
				deps: ['sap/ui/thirdparty/URI', 'sap/ui/thirdparty/sinon']
			},
			'sap/ui/thirdparty/require': {
				exports: 'define' // 'require', 'requirejs'
			},
			'sap/ui/thirdparty/SecondLevelDomains': {
				amd: true,
				exports: 'SecondLevelDomains'
			},
			'sap/ui/thirdparty/signals': {
				amd: true,
				exports: 'signals'
			},
			'sap/ui/thirdparty/sinon': {
				amd: true,
				exports: 'sinon'
			},
			'sap/ui/thirdparty/sinon-4': {
				amd: true,
				exports: 'sinon'
			},
			'sap/ui/thirdparty/sinon-server': {
				amd: true,
				exports: 'sinon' // really sinon! sinon-server is a subset of server and uses the same global for export
			},
			'sap/ui/thirdparty/unorm': {
				amd: false,
				exports: 'UNorm'
			},
			'sap/ui/thirdparty/unormdata': {
				exports: 'UNorm', // really 'UNorm'! module extends UNorm
				deps: ['sap/ui/thirdparty/unorm']
			},
			'sap/ui/thirdparty/URI': {
				amd: true,
				exports: 'URI'
			},
			'sap/ui/thirdparty/URITemplate': {
				amd: true,
				exports: 'URITemplate',
				deps: ['sap/ui/thirdparty/URI']
			},
			'sap/ui/thirdparty/vkbeautify': {
				amd: false,
				exports: 'vkbeautify'
			},
			'sap/ui/thirdparty/zyngascroll': {
				amd: false,
				exports: 'Scroller' // 'requestAnimationFrame', 'cancelRequestAnimationFrame', 'core'
			},
			'sap/ui/demokit/js/esprima': {
				amd: true,
				exports: 'esprima'
			},
			'sap/ui/documentation/sdk/thirdparty/esprima': {
				amd: true,
				exports: 'esprima'
			},
			'sap/viz/libs/canvg': {
				amd: true,
				deps: ['sap/viz/libs/rgbcolor']
			},
			'sap/viz/libs/rgbcolor': {
				amd: true
			},
			'sap/viz/libs/sap-viz': {
				amd: true,
				deps: ['sap/ui/thirdparty/jquery', 'sap/ui/thirdparty/d3', 'sap/viz/libs/canvg']
			},
			'sap/viz/libs/sap-viz-info-charts': {
				amd: true,
				deps: ['sap/viz/libs/sap-viz-info-framework']
			},
			'sap/viz/libs/sap-viz-info-framework': {
				amd: true,
				deps: ['sap/ui/thirdparty/jquery', 'sap/ui/thirdparty/d3']
			},
			'sap/viz/ui5/container/libs/sap-viz-controls-vizcontainer': {
				amd: true,
				deps: ['sap/viz/libs/sap-viz', 'sap/viz/ui5/container/libs/common/libs/rgbcolor/rgbcolor_static']
			},
			'sap/viz/ui5/controls/libs/sap-viz-vizframe': {
				amd: true,
				deps: ['sap/viz/libs/sap-viz-info-charts']
			},
			'sap/viz/ui5/controls/libs/sap-viz-vizservices': {
				amd: true,
				deps: ['sap/viz/libs/sap-viz-info-charts']
			}
		}
	});

	var defineModuleSync = ui5loader._.defineModuleSync;
	defineModuleSync('sap/ui/thirdparty/baseuri.js', null);
	if ( typeof ES6Promise !== 'undefined' ) {
		defineModuleSync('sap/ui/thirdparty/es6-promise.js', ES6Promise);
	}
	defineModuleSync('sap/ui/thirdparty/es6-object-assign.js', null);
	defineModuleSync('sap/ui/thirdparty/es6-string-methods.js', null);

	defineModuleSync('ui5loader.js', null);
	defineModuleSync('ui5loader-autoconfig.js', null);

	if (bNojQuery && typeof jQuery === 'function') {
		// when we're executed in the context of the sap-ui-core-noJQuery file,
		// we try to detect an existing jQuery / jQuery position plugin and register them as modules
		defineModuleSync('sap/ui/thirdparty/jquery.js', jQuery);
		if (jQuery.ui && jQuery.ui.position) {
			defineModuleSync('sap/ui/thirdparty/jqueryui/jquery-ui-position.js', jQuery);
		}
	}

	var sMainModule = oBootstrapScript && oBootstrapScript.getAttribute('data-sap-ui-main');
	if ( sMainModule ) {
		sap.ui.require(sMainModule.trim().split(/\s*,\s*/));
	}

}());
sap.ui.requireSync("sap/ui/core/Core");
// as this module contains the Core, we ensure that the Core has been booted
sap.ui.getCore().boot && sap.ui.getCore().boot();
