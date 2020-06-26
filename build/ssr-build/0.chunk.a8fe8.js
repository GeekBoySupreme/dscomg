exports.ids = [0];
exports.modules = {

/***/ "JTUh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@firebase/app/dist/index.esm.js
var index_esm = __webpack_require__("VxYX");

// EXTERNAL MODULE: ../node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("vCxL");

// EXTERNAL MODULE: ../node_modules/@firebase/util/dist/index.esm.js
var dist_index_esm = __webpack_require__("8Kxm");

// CONCATENATED MODULE: ../node_modules/@firebase/installations/node_modules/idb/lib/idb.mjs
function toArray(arr) {
  return Array.prototype.slice.call(arr);
}

function promisifyRequest(request) {
  return new Promise(function(resolve, reject) {
    request.onsuccess = function() {
      resolve(request.result);
    };

    request.onerror = function() {
      reject(request.error);
    };
  });
}

function promisifyRequestCall(obj, method, args) {
  var request;
  var p = new Promise(function(resolve, reject) {
    request = obj[method].apply(obj, args);
    promisifyRequest(request).then(resolve, reject);
  });

  p.request = request;
  return p;
}

function promisifyCursorRequestCall(obj, method, args) {
  var p = promisifyRequestCall(obj, method, args);
  return p.then(function(value) {
    if (!value) return;
    return new Cursor(value, p.request);
  });
}

function proxyProperties(ProxyClass, targetProp, properties) {
  properties.forEach(function(prop) {
    Object.defineProperty(ProxyClass.prototype, prop, {
      get: function() {
        return this[targetProp][prop];
      },
      set: function(val) {
        this[targetProp][prop] = val;
      }
    });
  });
}

function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
  properties.forEach(function(prop) {
    if (!(prop in Constructor.prototype)) return;
    ProxyClass.prototype[prop] = function() {
      return promisifyRequestCall(this[targetProp], prop, arguments);
    };
  });
}

function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
  properties.forEach(function(prop) {
    if (!(prop in Constructor.prototype)) return;
    ProxyClass.prototype[prop] = function() {
      return this[targetProp][prop].apply(this[targetProp], arguments);
    };
  });
}

function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
  properties.forEach(function(prop) {
    if (!(prop in Constructor.prototype)) return;
    ProxyClass.prototype[prop] = function() {
      return promisifyCursorRequestCall(this[targetProp], prop, arguments);
    };
  });
}

function Index(index) {
  this._index = index;
}

proxyProperties(Index, '_index', [
  'name',
  'keyPath',
  'multiEntry',
  'unique'
]);

proxyRequestMethods(Index, '_index', IDBIndex, [
  'get',
  'getKey',
  'getAll',
  'getAllKeys',
  'count'
]);

proxyCursorRequestMethods(Index, '_index', IDBIndex, [
  'openCursor',
  'openKeyCursor'
]);

function Cursor(cursor, request) {
  this._cursor = cursor;
  this._request = request;
}

proxyProperties(Cursor, '_cursor', [
  'direction',
  'key',
  'primaryKey',
  'value'
]);

proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
  'update',
  'delete'
]);

// proxy 'next' methods
['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
  if (!(methodName in IDBCursor.prototype)) return;
  Cursor.prototype[methodName] = function() {
    var cursor = this;
    var args = arguments;
    return Promise.resolve().then(function() {
      cursor._cursor[methodName].apply(cursor._cursor, args);
      return promisifyRequest(cursor._request).then(function(value) {
        if (!value) return;
        return new Cursor(value, cursor._request);
      });
    });
  };
});

function ObjectStore(store) {
  this._store = store;
}

ObjectStore.prototype.createIndex = function() {
  return new Index(this._store.createIndex.apply(this._store, arguments));
};

ObjectStore.prototype.index = function() {
  return new Index(this._store.index.apply(this._store, arguments));
};

proxyProperties(ObjectStore, '_store', [
  'name',
  'keyPath',
  'indexNames',
  'autoIncrement'
]);

proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
  'put',
  'add',
  'delete',
  'clear',
  'get',
  'getAll',
  'getKey',
  'getAllKeys',
  'count'
]);

proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
  'openCursor',
  'openKeyCursor'
]);

proxyMethods(ObjectStore, '_store', IDBObjectStore, [
  'deleteIndex'
]);

function Transaction(idbTransaction) {
  this._tx = idbTransaction;
  this.complete = new Promise(function(resolve, reject) {
    idbTransaction.oncomplete = function() {
      resolve();
    };
    idbTransaction.onerror = function() {
      reject(idbTransaction.error);
    };
    idbTransaction.onabort = function() {
      reject(idbTransaction.error);
    };
  });
}

Transaction.prototype.objectStore = function() {
  return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
};

proxyProperties(Transaction, '_tx', [
  'objectStoreNames',
  'mode'
]);

proxyMethods(Transaction, '_tx', IDBTransaction, [
  'abort'
]);

function UpgradeDB(db, oldVersion, transaction) {
  this._db = db;
  this.oldVersion = oldVersion;
  this.transaction = new Transaction(transaction);
}

UpgradeDB.prototype.createObjectStore = function() {
  return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
};

proxyProperties(UpgradeDB, '_db', [
  'name',
  'version',
  'objectStoreNames'
]);

proxyMethods(UpgradeDB, '_db', IDBDatabase, [
  'deleteObjectStore',
  'close'
]);

function DB(db) {
  this._db = db;
}

DB.prototype.transaction = function() {
  return new Transaction(this._db.transaction.apply(this._db, arguments));
};

proxyProperties(DB, '_db', [
  'name',
  'version',
  'objectStoreNames'
]);

proxyMethods(DB, '_db', IDBDatabase, [
  'close'
]);

// Add cursor iterators
// TODO: remove this once browsers do the right thing with promises
['openCursor', 'openKeyCursor'].forEach(function(funcName) {
  [ObjectStore, Index].forEach(function(Constructor) {
    // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
    if (!(funcName in Constructor.prototype)) return;

    Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
      var args = toArray(arguments);
      var callback = args[args.length - 1];
      var nativeObject = this._store || this._index;
      var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
      request.onsuccess = function() {
        callback(request.result);
      };
    };
  });
});

// polyfill getAll
[Index, ObjectStore].forEach(function(Constructor) {
  if (Constructor.prototype.getAll) return;
  Constructor.prototype.getAll = function(query, count) {
    var instance = this;
    var items = [];

    return new Promise(function(resolve) {
      instance.iterateCursor(query, function(cursor) {
        if (!cursor) {
          resolve(items);
          return;
        }
        items.push(cursor.value);

        if (count !== undefined && items.length == count) {
          resolve(items);
          return;
        }
        cursor.continue();
      });
    });
  };
});

function openDb(name, version, upgradeCallback) {
  var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
  var request = p.request;

  if (request) {
    request.onupgradeneeded = function(event) {
      if (upgradeCallback) {
        upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
      }
    };
  }

  return p.then(function(db) {
    return new DB(db);
  });
}

function deleteDb(name) {
  return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
}

// CONCATENATED MODULE: ../node_modules/@firebase/installations/dist/index.esm.js





var version = "0.2.7";

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PENDING_TIMEOUT_MS = 10000;
var PACKAGE_VERSION = "w:" + version;
var INTERNAL_AUTH_VERSION = 'FIS_v2';
var INSTALLATIONS_API_URL = 'https://firebaseinstallations.googleapis.com/v1';
var TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1000; // One hour
var SERVICE = 'installations';
var SERVICE_NAME = 'Installations';

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm__a;
var ERROR_DESCRIPTION_MAP = (index_esm__a = {}, index_esm__a["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration values.', index_esm__a["create-installation-failed" /* CREATE_INSTALLATION_FAILED */] = 'Could not register Firebase Installation.', index_esm__a["generate-token-failed" /* GENERATE_TOKEN_FAILED */] = 'Could not generate Auth Token.', index_esm__a["not-registered" /* NOT_REGISTERED */] = 'Firebase Installation is not registered.', index_esm__a["installation-not-found" /* INSTALLATION_NOT_FOUND */] = 'Firebase Installation not found.', index_esm__a["request-failed" /* REQUEST_FAILED */] = '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"', index_esm__a["app-offline" /* APP_OFFLINE */] = 'Could not process request. Application offline.', index_esm__a["delete-pending-registration" /* DELETE_PENDING_REGISTRATION */] = "Can't delete installation while there is a pending registration request.", index_esm__a);
var ERROR_FACTORY = new dist_index_esm["c" /* ErrorFactory */](SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
/** Returns true if error is a FirebaseError that is based on an error from the server. */
function isServerError(error) {
    return error instanceof dist_index_esm["d" /* FirebaseError */] && error.code.includes("request-failed" /* REQUEST_FAILED */);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function extractAppConfig(app) {
    if (!app || !app.options) {
        throw ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */);
    }
    var appName = app.name;
    var _a = app.options,
        projectId = _a.projectId,
        apiKey = _a.apiKey,
        appId = _a.appId;
    if (!appName || !projectId || !apiKey || !appId) {
        throw ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */);
    }
    return { appName: appName, projectId: projectId, apiKey: apiKey, appId: appId };
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getInstallationsEndpoint(_a) {
    var projectId = _a.projectId;
    return INSTALLATIONS_API_URL + "/projects/" + projectId + "/installations";
}
function extractAuthTokenInfoFromResponse(response) {
    return {
        token: response.token,
        requestStatus: 2 /* COMPLETED */
        , expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
        creationTime: Date.now()
    };
}
function getErrorFromResponse(requestName, response) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var responseJson, errorData;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, response.json()];
                case 1:
                    responseJson = _a.sent();
                    errorData = responseJson.error;
                    return [2 /*return*/, ERROR_FACTORY.create("request-failed" /* REQUEST_FAILED */, {
                        requestName: requestName,
                        serverCode: errorData.code,
                        serverMessage: errorData.message,
                        serverStatus: errorData.status
                    })];
            }
        });
    });
}
function getHeaders(_a) {
    var apiKey = _a.apiKey;
    return new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-goog-api-key': apiKey
    });
}
function getHeadersWithAuth(appConfig, _a) {
    var refreshToken = _a.refreshToken;
    var headers = getHeaders(appConfig);
    headers.append('Authorization', getAuthorizationHeader(refreshToken));
    return headers;
}
/**
 * Calls the passed in fetch wrapper and returns the response.
 * If the returned response has a status of 5xx, re-runs the function once and
 * returns the response.
 */
function retryIfServerError(fn) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var result;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, fn()];
                case 1:
                    result = _a.sent();
                    if (result.status >= 500 && result.status < 600) {
                        // Internal Server Error. Retry request.
                        return [2 /*return*/, fn()];
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
    // This works because the server will never respond with fractions of a second.
    return Number(responseExpiresIn.replace('s', '000'));
}
function getAuthorizationHeader(refreshToken) {
    return INTERNAL_AUTH_VERSION + " " + refreshToken;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createInstallation(appConfig, _a) {
    var fid = _a.fid;
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var endpoint, headers, body, request, response, responseValue, registeredInstallationEntry;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    endpoint = getInstallationsEndpoint(appConfig);
                    headers = getHeaders(appConfig);
                    body = {
                        fid: fid,
                        authVersion: INTERNAL_AUTH_VERSION,
                        appId: appConfig.appId,
                        sdkVersion: PACKAGE_VERSION
                    };
                    request = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    return [4 /*yield*/, retryIfServerError(function () {
                        return fetch(endpoint, request);
                    })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseValue = _b.sent();
                    registeredInstallationEntry = {
                        fid: responseValue.fid || fid,
                        registrationStatus: 2 /* COMPLETED */
                        , refreshToken: responseValue.refreshToken,
                        authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
                    };
                    return [2 /*return*/, registeredInstallationEntry];
                case 3:
                    return [4 /*yield*/, getErrorFromResponse('Create Installation', response)];
                case 4:
                    throw _b.sent();
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Returns a promise that resolves after given time passes. */
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function bufferToBase64UrlSafe(array) {
    var b64 = btoa(String.fromCharCode.apply(String, Object(tslib_es6["f" /* __spread */])(array)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
var INVALID_FID = '';
/**
 * Generates a new FID using random values from Web Crypto API.
 * Returns an empty string if FID generation fails for any reason.
 */
function generateFid() {
    try {
        // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
        // bytes. our implementation generates a 17 byte array instead.
        var fidByteArray = new Uint8Array(17);
        var crypto_1 = self.crypto || self.msCrypto;
        crypto_1.getRandomValues(fidByteArray);
        // Replace the first 4 random bits with the constant FID header of 0b0111.
        fidByteArray[0] = 112 + fidByteArray[0] % 16;
        var fid = encode(fidByteArray);
        return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
    } catch (_a) {
        // FID generation errored
        return INVALID_FID;
    }
}
/** Converts a FID Uint8Array to a base64 string representation. */
function encode(fidByteArray) {
    var b64String = bufferToBase64UrlSafe(fidByteArray);
    // Remove the 23rd character that was added because of the extra 4 bits at the
    // end of our 17 byte array, and the '=' padding.
    return b64String.substr(0, 22);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DATABASE_NAME = 'firebase-installations-database';
var DATABASE_VERSION = 1;
var OBJECT_STORE_NAME = 'firebase-installations-store';
var dbPromise = null;
function getDbPromise() {
    if (!dbPromise) {
        dbPromise = openDb(DATABASE_NAME, DATABASE_VERSION, function (upgradeDB) {
            // We don't use 'break' in this switch statement, the fall-through
            // behavior is what we want, because if there are multiple versions between
            // the old version and the current version, we want ALL the migrations
            // that correspond to those versions to run, not only the last one.
            // eslint-disable-next-line default-case
            switch (upgradeDB.oldVersion) {
                case 0:
                    upgradeDB.createObjectStore(OBJECT_STORE_NAME);
            }
        });
    }
    return dbPromise;
}
/** Assigns or overwrites the record for the given key with the given value. */
function set(appConfig, value) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var key, db, tx;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).put(value, key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/, value];
            }
        });
    });
}
/** Removes record(s) from the objectStore that match the given key. */
function remove(appConfig) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var key, db, tx;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).delete(key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Atomically updates a record with the result of updateFn, which gets
 * called with the current value. If newValue is undefined, the record is
 * deleted instead.
 * @return Updated value
 */
function update(appConfig, updateFn) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var key, db, tx, store, oldValue, newValue;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    store = tx.objectStore(OBJECT_STORE_NAME);
                    return [4 /*yield*/, store.get(key)];
                case 2:
                    oldValue = _a.sent();
                    newValue = updateFn(oldValue);
                    if (newValue === oldValue) {
                        return [2 /*return*/, newValue];
                    }
                    if (!(newValue === undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, store.delete(key)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    return [4 /*yield*/, store.put(newValue, key)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    return [4 /*yield*/, tx.complete];
                case 7:
                    _a.sent();
                    return [2 /*return*/, newValue];
            }
        });
    });
}
function getKey(appConfig) {
    return appConfig.appName + "!" + appConfig.appId;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates and returns the InstallationEntry from the database.
 * Also triggers a registration request if it is necessary and possible.
 */
function getInstallationEntry(appConfig) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var registrationPromise, installationEntry, _a;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    return [4 /*yield*/, update(appConfig, function (oldEntry) {
                        var installationEntry = updateOrCreateInstallationEntry(oldEntry);
                        var entryWithPromise = triggerRegistrationIfNecessary(appConfig, installationEntry);
                        registrationPromise = entryWithPromise.registrationPromise;
                        return entryWithPromise.installationEntry;
                    })];
                case 1:
                    installationEntry = _b.sent();
                    if (!(installationEntry.fid === INVALID_FID)) return [3 /*break*/, 3];
                    _a = {};
                    return [4 /*yield*/, registrationPromise];
                case 2:
                    // FID generation failed. Waiting for the FID from the server.
                    return [2 /*return*/, (_a.installationEntry = _b.sent(), _a)];
                case 3:
                    return [2 /*return*/, {
                        installationEntry: installationEntry,
                        registrationPromise: registrationPromise
                    }];
            }
        });
    });
}
function updateOrCreateInstallationEntry(oldEntry) {
    var entry = oldEntry || {
        fid: generateFid(),
        registrationStatus: 0 /* NOT_STARTED */
    };
    if (hasInstallationRequestTimedOut(entry)) {
        return {
            fid: entry.fid,
            registrationStatus: 0 /* NOT_STARTED */
        };
    }
    return entry;
}
/**
 * If the Firebase Installation is not registered yet, this will trigger the registration
 * and return an InProgressInstallationEntry.
 */
function triggerRegistrationIfNecessary(appConfig, installationEntry) {
    if (installationEntry.registrationStatus === 0 /* NOT_STARTED */) {
            if (!navigator.onLine) {
                // Registration required but app is offline.
                var registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */));
                return {
                    installationEntry: installationEntry,
                    registrationPromise: registrationPromiseWithError
                };
            }
            // Try registering. Change status to IN_PROGRESS.
            var inProgressEntry = {
                fid: installationEntry.fid,
                registrationStatus: 1 /* IN_PROGRESS */
                , registrationTime: Date.now()
            };
            var registrationPromise = registerInstallation(appConfig, inProgressEntry);
            return { installationEntry: inProgressEntry, registrationPromise: registrationPromise };
        } else if (installationEntry.registrationStatus === 1 /* IN_PROGRESS */) {
            return {
                installationEntry: installationEntry,
                registrationPromise: waitUntilFidRegistration(appConfig)
            };
        } else {
        return { installationEntry: installationEntry };
    }
}
/** This will be executed only once for each new Firebase Installation. */
function registerInstallation(appConfig, installationEntry) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var registeredInstallationEntry, e_1;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2,, 7]);
                    return [4 /*yield*/, createInstallation(appConfig, installationEntry)];
                case 1:
                    registeredInstallationEntry = _a.sent();
                    return [2 /*return*/, set(appConfig, registeredInstallationEntry)];
                case 2:
                    e_1 = _a.sent();
                    if (!(isServerError(e_1) && e_1.serverCode === 409)) return [3 /*break*/, 4];
                    // Server returned a "FID can not be used" error.
                    // Generate a new ID next time.
                    return [4 /*yield*/, remove(appConfig)];
                case 3:
                    // Server returned a "FID can not be used" error.
                    // Generate a new ID next time.
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    // Registration failed. Set FID as not registered.
                    return [4 /*yield*/, set(appConfig, {
                        fid: installationEntry.fid,
                        registrationStatus: 0 /* NOT_STARTED */
                    })];
                case 5:
                    // Registration failed. Set FID as not registered.
                    _a.sent();
                    _a.label = 6;
                case 6:
                    throw e_1;
                case 7:
                    return [2 /*return*/];
            }
        });
    });
}
/** Call if FID registration is pending. */
function waitUntilFidRegistration(appConfig) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var entry;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, updateInstallationRequest(appConfig)];
                case 1:
                    entry = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(entry.registrationStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                    // createInstallation request still in progress.
                    return [4 /*yield*/, sleep(100)];
                case 3:
                    // createInstallation request still in progress.
                    _a.sent();
                    return [4 /*yield*/, updateInstallationRequest(appConfig)];
                case 4:
                    entry = _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    if (entry.registrationStatus === 0 /* NOT_STARTED */) {
                            throw ERROR_FACTORY.create("create-installation-failed" /* CREATE_INSTALLATION_FAILED */);
                        }
                    return [2 /*return*/, entry];
            }
        });
    });
}
/**
 * Called only if there is a CreateInstallation request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * CreateInstallation request.
 *
 * Returns the updated InstallationEntry.
 */
function updateInstallationRequest(appConfig) {
    return update(appConfig, function (oldEntry) {
        if (!oldEntry) {
            throw ERROR_FACTORY.create("installation-not-found" /* INSTALLATION_NOT_FOUND */);
        }
        if (hasInstallationRequestTimedOut(oldEntry)) {
            return {
                fid: oldEntry.fid,
                registrationStatus: 0 /* NOT_STARTED */
            };
        }
        return oldEntry;
    });
}
function hasInstallationRequestTimedOut(installationEntry) {
    return installationEntry.registrationStatus === 1 /* IN_PROGRESS */ && installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now();
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function generateAuthToken(appConfig, installationEntry) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var endpoint, headers, body, request, response, responseValue, completedAuthToken;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
                    headers = getHeadersWithAuth(appConfig, installationEntry);
                    body = {
                        installation: {
                            sdkVersion: PACKAGE_VERSION
                        }
                    };
                    request = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    return [4 /*yield*/, retryIfServerError(function () {
                        return fetch(endpoint, request);
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseValue = _a.sent();
                    completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
                    return [2 /*return*/, completedAuthToken];
                case 3:
                    return [4 /*yield*/, getErrorFromResponse('Generate Auth Token', response)];
                case 4:
                    throw _a.sent();
            }
        });
    });
}
function getGenerateAuthTokenEndpoint(appConfig, _a) {
    var fid = _a.fid;
    return getInstallationsEndpoint(appConfig) + "/" + fid + "/authTokens:generate";
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a valid authentication token for the installation. Generates a new
 * token if one doesn't exist, is expired or about to expire.
 *
 * Should only be called if the Firebase Installation is registered.
 */
function refreshAuthToken(appConfig) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var tokenPromise, entry, authToken, _a;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    return [4 /*yield*/, update(appConfig, function (oldEntry) {
                        if (!isEntryRegistered(oldEntry)) {
                            throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
                        }
                        var oldAuthToken = oldEntry.authToken;
                        if (isAuthTokenValid(oldAuthToken)) {
                            // There is a valid token in the DB.
                            return oldEntry;
                        } else if (oldAuthToken.requestStatus === 1 /* IN_PROGRESS */) {
                                // There already is a token request in progress.
                                tokenPromise = waitUntilAuthTokenRequest(appConfig);
                                return oldEntry;
                            } else {
                            // No token or token expired.
                            if (!navigator.onLine) {
                                throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
                            }
                            var inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
                            tokenPromise = fetchAuthTokenFromServer(appConfig, inProgressEntry);
                            return inProgressEntry;
                        }
                    })];
                case 1:
                    entry = _b.sent();
                    if (!tokenPromise) return [3 /*break*/, 3];
                    return [4 /*yield*/, tokenPromise];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = entry.authToken;
                    _b.label = 4;
                case 4:
                    authToken = _a;
                    return [2 /*return*/, authToken.token];
            }
        });
    });
}
/**
 * Call only if FID is registered and Auth Token request is in progress.
 */
function waitUntilAuthTokenRequest(appConfig) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var entry, authToken;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, updateAuthTokenRequest(appConfig)];
                case 1:
                    entry = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(entry.authToken.requestStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                    // generateAuthToken still in progress.
                    return [4 /*yield*/, sleep(100)];
                case 3:
                    // generateAuthToken still in progress.
                    _a.sent();
                    return [4 /*yield*/, updateAuthTokenRequest(appConfig)];
                case 4:
                    entry = _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    authToken = entry.authToken;
                    if (authToken.requestStatus === 0 /* NOT_STARTED */) {
                            throw ERROR_FACTORY.create("generate-token-failed" /* GENERATE_TOKEN_FAILED */);
                        } else {
                        return [2 /*return*/, authToken];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Called only if there is a GenerateAuthToken request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * GenerateAuthToken request.
 *
 * Returns the updated InstallationEntry.
 */
function updateAuthTokenRequest(appConfig) {
    return update(appConfig, function (oldEntry) {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
        }
        var oldAuthToken = oldEntry.authToken;
        if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
            return Object(tslib_es6["a" /* __assign */])({}, oldEntry, { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
        }
        return oldEntry;
    });
}
function fetchAuthTokenFromServer(appConfig, installationEntry) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var authToken, updatedInstallationEntry, e_1, updatedInstallationEntry;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3,, 8]);
                    return [4 /*yield*/, generateAuthToken(appConfig, installationEntry)];
                case 1:
                    authToken = _a.sent();
                    updatedInstallationEntry = Object(tslib_es6["a" /* __assign */])({}, installationEntry, { authToken: authToken });
                    return [4 /*yield*/, set(appConfig, updatedInstallationEntry)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, authToken];
                case 3:
                    e_1 = _a.sent();
                    if (!(isServerError(e_1) && (e_1.serverCode === 401 || e_1.serverCode === 404))) return [3 /*break*/, 5];
                    // Server returned a "FID not found" or a "Invalid authentication" error.
                    // Generate a new ID next time.
                    return [4 /*yield*/, remove(appConfig)];
                case 4:
                    // Server returned a "FID not found" or a "Invalid authentication" error.
                    // Generate a new ID next time.
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    updatedInstallationEntry = Object(tslib_es6["a" /* __assign */])({}, installationEntry, { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
                    return [4 /*yield*/, set(appConfig, updatedInstallationEntry)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    throw e_1;
                case 8:
                    return [2 /*return*/];
            }
        });
    });
}
function isEntryRegistered(installationEntry) {
    return installationEntry !== undefined && installationEntry.registrationStatus === 2 /* COMPLETED */;
}
function isAuthTokenValid(authToken) {
    return authToken.requestStatus === 2 /* COMPLETED */ && !isAuthTokenExpired(authToken);
}
function isAuthTokenExpired(authToken) {
    var now = Date.now();
    return now < authToken.creationTime || authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER;
}
/** Returns an updated InstallationEntry with an InProgressAuthToken. */
function makeAuthTokenRequestInProgressEntry(oldEntry) {
    var inProgressAuthToken = {
        requestStatus: 1 /* IN_PROGRESS */
        , requestTime: Date.now()
    };
    return Object(tslib_es6["a" /* __assign */])({}, oldEntry, { authToken: inProgressAuthToken });
}
function hasAuthTokenRequestTimedOut(authToken) {
    return authToken.requestStatus === 1 /* IN_PROGRESS */ && authToken.requestTime + PENDING_TIMEOUT_MS < Date.now();
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getId(app) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var appConfig, _a, installationEntry, registrationPromise;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, getInstallationEntry(appConfig)];
                case 1:
                    _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                    if (registrationPromise) {
                        // Suppress registration errors as they are not a problem for getId.
                        registrationPromise.catch(function () {});
                    }
                    if (installationEntry.registrationStatus === 2 /* COMPLETED */) {
                            // If the installation is already registered, update the authentication
                            // token if needed. Suppress errors as they are not relevant to getId.
                            refreshAuthToken(appConfig).catch(function () {});
                        }
                    return [2 /*return*/, installationEntry.fid];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getToken(app) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var appConfig;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, completeInstallationRegistration(appConfig)];
                case 1:
                    _a.sent();
                    // At this point we either have a Registered Installation in the DB, or we've
                    // already thrown an error.
                    return [2 /*return*/, refreshAuthToken(appConfig)];
            }
        });
    });
}
function completeInstallationRegistration(appConfig) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var _a, installationEntry, registrationPromise;
        return Object(tslib_es6["d" /* __generator */])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    return [4 /*yield*/, getInstallationEntry(appConfig)];
                case 1:
                    _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                    if (!registrationPromise) return [3 /*break*/, 3];
                    // A createInstallation request is in progress. Wait until it finishes.
                    return [4 /*yield*/, registrationPromise];
                case 2:
                    // A createInstallation request is in progress. Wait until it finishes.
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    if (installationEntry.registrationStatus !== 2 /* COMPLETED */) {
                            // Installation ID can't be registered.
                            throw ERROR_FACTORY.create("create-installation-failed" /* CREATE_INSTALLATION_FAILED */);
                        }
                    _b.label = 4;
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function deleteInstallation(appConfig, installationEntry) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var endpoint, headers, request, response;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = getDeleteEndpoint(appConfig, installationEntry);
                    headers = getHeadersWithAuth(appConfig, installationEntry);
                    request = {
                        method: 'DELETE',
                        headers: headers
                    };
                    return [4 /*yield*/, retryIfServerError(function () {
                        return fetch(endpoint, request);
                    })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, getErrorFromResponse('Delete Installation', response)];
                case 2:
                    throw _a.sent();
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function getDeleteEndpoint(appConfig, _a) {
    var fid = _a.fid;
    return getInstallationsEndpoint(appConfig) + "/" + fid;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function deleteInstallation$1(app) {
    return Object(tslib_es6["b" /* __awaiter */])(this, void 0, void 0, function () {
        var appConfig, entry;
        return Object(tslib_es6["d" /* __generator */])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, update(appConfig, function (oldEntry) {
                        if (oldEntry && oldEntry.registrationStatus === 0 /* NOT_STARTED */) {
                                // Delete the unregistered entry without sending a deleteInstallation request.
                                return undefined;
                            }
                        return oldEntry;
                    })];
                case 1:
                    entry = _a.sent();
                    if (!entry) return [3 /*break*/, 6];
                    if (!(entry.registrationStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 2];
                    // Can't delete while trying to register.
                    throw ERROR_FACTORY.create("delete-pending-registration" /* DELETE_PENDING_REGISTRATION */);
                case 2:
                    if (!(entry.registrationStatus === 2 /* COMPLETED */)) return [3 /*break*/, 6];
                    if (!!navigator.onLine) return [3 /*break*/, 3];
                    throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
                case 3:
                    return [4 /*yield*/, deleteInstallation(appConfig, entry)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, remove(appConfig)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerInstallations(instance) {
    var installationsName = 'installations';
    var factoryMethod = function factoryMethod(app) {
        // Throws if app isn't configured properly.
        extractAppConfig(app);
        return {
            app: app,
            getId: function getId() {
                return _getId(app);
            },
            getToken: function getToken() {
                return _getToken(app);
            },
            delete: function _delete() {
                return deleteInstallation$1(app);
            }
        };
    };
    instance.INTERNAL.registerService(installationsName, factoryMethod);
}
registerInstallations(index_esm["a" /* default */]);


//# sourceMappingURL=index.esm.js.map
// EXTERNAL MODULE: ../node_modules/@firebase/logger/dist/index.esm.js
var logger_dist_index_esm = __webpack_require__("TUpU");

// CONCATENATED MODULE: ../node_modules/@firebase/performance/dist/index.esm.js






var index_esm_version = "0.2.19";

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SDK_VERSION = index_esm_version;
/** The prefix for start User Timing marks used for creating Traces. */
var TRACE_START_MARK_PREFIX = 'FB-PERF-TRACE-START';
/** The prefix for stop User Timing marks used for creating Traces. */
var TRACE_STOP_MARK_PREFIX = 'FB-PERF-TRACE-STOP';
/** The prefix for User Timing measure used for creating Traces. */
var TRACE_MEASURE_PREFIX = 'FB-PERF-TRACE-MEASURE';
/** The prefix for out of the box page load Trace name. */
var OOB_TRACE_PAGE_LOAD_PREFIX = '_wt_';
var FIRST_PAINT_COUNTER_NAME = '_fp';
var FIRST_CONTENTFUL_PAINT_COUNTER_NAME = '_fcp';
var FIRST_INPUT_DELAY_COUNTER_NAME = '_fid';
var CONFIG_LOCAL_STORAGE_KEY = '@firebase/performance/config';
var CONFIG_EXPIRY_LOCAL_STORAGE_KEY = '@firebase/performance/configexpire';
var index_esm_SERVICE = 'performance';
var index_esm_SERVICE_NAME = 'Performance';

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var dist_index_esm__a;
var index_esm_ERROR_DESCRIPTION_MAP = (dist_index_esm__a = {}, dist_index_esm__a["trace started" /* TRACE_STARTED_BEFORE */] = 'Trace {$traceName} was started before.', dist_index_esm__a["trace stopped" /* TRACE_STOPPED_BEFORE */] = 'Trace {$traceName} is not running.', dist_index_esm__a["no window" /* NO_WINDOW */] = 'Window is not available.', dist_index_esm__a["no app id" /* NO_APP_ID */] = 'App id is not available.', dist_index_esm__a["no project id" /* NO_PROJECT_ID */] = 'Project id is not available.', dist_index_esm__a["no api key" /* NO_API_KEY */] = 'Api key is not available.', dist_index_esm__a["invalid cc log" /* INVALID_CC_LOG */] = 'Attempted to queue invalid cc event', dist_index_esm__a["FB not default" /* FB_NOT_DEFAULT */] = 'Performance can only start when Firebase app instance is the default one.', dist_index_esm__a["RC response not ok" /* RC_NOT_OK */] = 'RC response is not ok', dist_index_esm__a["invalid attribute name" /* INVALID_ATTRIBUTE_NAME */] = 'Attribute name {$attributeName} is invalid.', dist_index_esm__a["invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */] = 'Attribute value {$attributeValue} is invalid.', dist_index_esm__a["invalide custom metric name" /* INVALID_CUSTOM_METRIC_NAME */] = 'Custom metric name {$customMetricName} is invalid', dist_index_esm__a);
var index_esm_ERROR_FACTORY = new dist_index_esm["c" /* ErrorFactory */](index_esm_SERVICE, index_esm_SERVICE_NAME, index_esm_ERROR_DESCRIPTION_MAP);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var apiInstance;
var windowInstance;
/**
 * This class holds a reference to various browser related objects injected by set methods.
 */
var Api = /** @class */function () {
    function Api(window) {
        if (!window) {
            throw index_esm_ERROR_FACTORY.create("no window" /* NO_WINDOW */);
        }
        this.performance = window.performance;
        this.PerformanceObserver = window.PerformanceObserver;
        this.windowLocation = window.location;
        this.navigator = window.navigator;
        this.document = window.document;
        if (this.navigator && this.navigator.cookieEnabled) {
            // If user blocks cookies on the browser, accessing localStorage will throw an exception.
            this.localStorage = window.localStorage;
        }
        if (window.perfMetrics && window.perfMetrics.onFirstInputDelay) {
            this.onFirstInputDelay = window.perfMetrics.onFirstInputDelay;
        }
    }
    Api.prototype.getUrl = function () {
        // Do not capture the string query part of url.
        return this.windowLocation.href.split('?')[0];
    };
    Api.prototype.mark = function (name) {
        if (!this.performance || !this.performance.mark) {
            return;
        }
        this.performance.mark(name);
    };
    Api.prototype.measure = function (measureName, mark1, mark2) {
        if (!this.performance || !this.performance.measure) {
            return;
        }
        this.performance.measure(measureName, mark1, mark2);
    };
    Api.prototype.getEntriesByType = function (type) {
        if (!this.performance || !this.performance.getEntriesByType) {
            return [];
        }
        return this.performance.getEntriesByType(type);
    };
    Api.prototype.getEntriesByName = function (name) {
        if (!this.performance || !this.performance.getEntriesByName) {
            return [];
        }
        return this.performance.getEntriesByName(name);
    };
    Api.prototype.getTimeOrigin = function () {
        // Polyfill the time origin with performance.timing.navigationStart.
        return this.performance && (this.performance.timeOrigin || this.performance.timing.navigationStart);
    };
    Api.prototype.requiredApisAvailable = function () {
        if (fetch && Promise && this.navigator && this.navigator.cookieEnabled) {
            return true;
        }
        return false;
    };
    Api.prototype.setupObserver = function (entryType, callback) {
        if (!this.PerformanceObserver) {
            return;
        }
        var observer = new this.PerformanceObserver(function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                // `entry` is a PerformanceEntry instance.
                callback(entry);
            }
        });
        // Start observing the entry types you care about.
        observer.observe({ entryTypes: [entryType] });
    };
    Api.getInstance = function () {
        if (apiInstance === undefined) {
            apiInstance = new Api(windowInstance);
        }
        return apiInstance;
    };
    return Api;
}();
function setupApi(window) {
    windowInstance = window;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var settingsServiceInstance;
var SettingsService = /** @class */function () {
    function SettingsService() {
        // The variable which controls logging of automatic traces and HTTP/S network monitoring.
        this.instrumentationEnabled = true;
        // The variable which controls logging of custom traces.
        this.dataCollectionEnabled = true;
        // Configuration flags set through remote config.
        this.loggingEnabled = false;
        // Sampling rate between 0 and 1.
        this.tracesSamplingRate = 1;
        this.networkRequestsSamplingRate = 1;
        // Address of logging service.
        this.logEndPointUrl = 'https://firebaselogging.googleapis.com/v0cc/log?format=json_proto';
        this.logSource = 462;
        // Flags which control per session logging of traces and network requests.
        this.logTraceAfterSampling = false;
        this.logNetworkAfterSampling = false;
        // TTL of config retrieved from remote config in hours.
        this.configTimeToLive = 12;
    }
    SettingsService.prototype.getAppId = function () {
        var appId = this.firebaseAppInstance && this.firebaseAppInstance.options && this.firebaseAppInstance.options.appId;
        if (!appId) {
            throw index_esm_ERROR_FACTORY.create("no app id" /* NO_APP_ID */);
        }
        return appId;
    };
    SettingsService.prototype.getProjectId = function () {
        var projectId = this.firebaseAppInstance && this.firebaseAppInstance.options && this.firebaseAppInstance.options.projectId;
        if (!projectId) {
            throw index_esm_ERROR_FACTORY.create("no project id" /* NO_PROJECT_ID */);
        }
        return projectId;
    };
    SettingsService.prototype.getApiKey = function () {
        var apiKey = this.firebaseAppInstance && this.firebaseAppInstance.options && this.firebaseAppInstance.options.apiKey;
        if (!apiKey) {
            throw index_esm_ERROR_FACTORY.create("no api key" /* NO_API_KEY */);
        }
        return apiKey;
    };
    SettingsService.getInstance = function () {
        if (settingsServiceInstance === undefined) {
            settingsServiceInstance = new SettingsService();
        }
        return settingsServiceInstance;
    };
    return SettingsService;
}();

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var iid;
function getIidPromise() {
    var iidPromise = SettingsService.getInstance().firebaseAppInstance.installations().getId();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    iidPromise.then(function (iidVal) {
        iid = iidVal;
    });
    return iidPromise;
}
// This method should be used after the iid is retrieved by getIidPromise method.
function getIid() {
    return iid;
}
function getAuthTokenPromise() {
    var authTokenPromise = SettingsService.getInstance().firebaseAppInstance.installations().getToken();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    authTokenPromise.then(function (authTokenVal) {});
    return authTokenPromise;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VisibilityState;
(function (VisibilityState) {
    VisibilityState[VisibilityState["UNKNOWN"] = 0] = "UNKNOWN";
    VisibilityState[VisibilityState["VISIBLE"] = 1] = "VISIBLE";
    VisibilityState[VisibilityState["HIDDEN"] = 2] = "HIDDEN";
    VisibilityState[VisibilityState["PRERENDER"] = 3] = "PRERENDER";
    VisibilityState[VisibilityState["UNLOADED"] = 4] = "UNLOADED";
})(VisibilityState || (VisibilityState = {}));
var RESERVED_ATTRIBUTE_PREFIXES = ['firebase_', 'google_', 'ga_'];
var ATTRIBUTE_FORMAT_REGEX = new RegExp('^[a-zA-Z]\\w*$');
var MAX_ATTRIBUTE_NAME_LENGTH = 40;
var MAX_ATTRIBUTE_VALUE_LENGTH = 100;
function getServiceWorkerStatus() {
    var navigator = Api.getInstance().navigator;
    if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
            return 2 /* CONTROLLED */;
        } else {
                return 3 /* UNCONTROLLED */;
            }
    } else {
            return 1 /* UNSUPPORTED */;
        }
}
function getVisibilityState() {
    var document = Api.getInstance().document;
    var visibilityState = document.visibilityState;
    switch (visibilityState) {
        case 'visible':
            return VisibilityState.VISIBLE;
        case 'hidden':
            return VisibilityState.HIDDEN;
        case 'prerender':
            return VisibilityState.PRERENDER;
        default:
            return VisibilityState.UNKNOWN;
    }
}
function getEffectiveConnectionType() {
    var navigator = Api.getInstance().navigator;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var navigatorConnection = navigator.connection;
    var effectiveType = navigatorConnection && navigatorConnection.effectiveType;
    switch (effectiveType) {
        case 'slow-2g':
            return 1 /* CONNECTION_SLOW_2G */;
        case '2g':
            return 2 /* CONNECTION_2G */;
        case '3g':
            return 3 /* CONNECTION_3G */;
        case '4g':
            return 4 /* CONNECTION_4G */;
        default:
            return 0 /* UNKNOWN */;
    }
}
function isValidCustomAttributeName(name) {
    if (name.length === 0 || name.length > MAX_ATTRIBUTE_NAME_LENGTH) {
        return false;
    }
    var matchesReservedPrefix = RESERVED_ATTRIBUTE_PREFIXES.some(function (prefix) {
        return name.startsWith(prefix);
    });
    return !matchesReservedPrefix && !!name.match(ATTRIBUTE_FORMAT_REGEX);
}
function isValidCustomAttributeValue(value) {
    return value.length !== 0 && value.length <= MAX_ATTRIBUTE_VALUE_LENGTH;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var consoleLogger = new logger_dist_index_esm["b" /* Logger */](index_esm_SERVICE_NAME);
consoleLogger.logLevel = logger_dist_index_esm["a" /* LogLevel */].INFO;

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var REMOTE_CONFIG_SDK_VERSION = '0.0.1';
// These values will be used if the remote config object is successfully
// retrieved, but the template does not have these fields.
var SECONDARY_CONFIGS = {
    loggingEnabled: true
};
var FIS_AUTH_PREFIX = 'FIREBASE_INSTALLATIONS_AUTH';
function getConfig(iid) {
    var config = getStoredConfig();
    if (config) {
        processConfig(config);
        return Promise.resolve();
    }
    return getRemoteConfig(iid).then(function (config) {
        return processConfig(config);
    }).then(function (config) {
        return storeConfig(config);
    },
    /** Do nothing for error, use defaults set in settings service. */function () {});
}
function getStoredConfig() {
    var localStorage = Api.getInstance().localStorage;
    var expiryString = localStorage.getItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY);
    if (!expiryString || !configValid(expiryString)) {
        return;
    }
    var configStringified = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
    if (!configStringified) {
        return;
    }
    try {
        var configResponse = JSON.parse(configStringified);
        return configResponse;
    } catch (_a) {
        return;
    }
}
function storeConfig(config) {
    if (!config) {
        return;
    }
    var localStorage = Api.getInstance().localStorage;
    localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
    localStorage.setItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY, String(Date.now() + SettingsService.getInstance().configTimeToLive * 60 * 60 * 1000));
}
var COULD_NOT_GET_CONFIG_MSG = 'Could not fetch config, will use default configs';
function getRemoteConfig(iid) {
    // Perf needs auth token only to retrieve remote config.
    return getAuthTokenPromise().then(function (authToken) {
        var projectId = SettingsService.getInstance().getProjectId();
        var configEndPoint = "https://firebaseremoteconfig.googleapis.com/v1/projects/" + projectId + "/namespaces/fireperf:fetch?key=" + SettingsService.getInstance().getApiKey();
        var request = new Request(configEndPoint, {
            method: 'POST',
            headers: {
                Authorization: FIS_AUTH_PREFIX + " " + authToken
            },
            /* eslint-disable camelcase */
            body: JSON.stringify({
                app_instance_id: iid,
                app_instance_id_token: authToken,
                app_id: SettingsService.getInstance().getAppId(),
                app_version: SDK_VERSION,
                sdk_version: REMOTE_CONFIG_SDK_VERSION
            })
            /* eslint-enable camelcase */
        });
        return fetch(request).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            // In case response is not ok. This will be caught by catch.
            throw index_esm_ERROR_FACTORY.create("RC response not ok" /* RC_NOT_OK */);
        });
    }).catch(function () {
        consoleLogger.info(COULD_NOT_GET_CONFIG_MSG);
        return undefined;
    });
}
/**
 * Processes config coming either from calling RC or from local storage.
 * This method only runs if call is successful or config in storage
 * is valie.
 */
function processConfig(config) {
    if (!config) {
        return config;
    }
    var settingsServiceInstance = SettingsService.getInstance();
    var entries = config.entries || {};
    if (entries.fpr_enabled !== undefined) {
        // TODO: Change the assignment of loggingEnabled once the received type is known.
        settingsServiceInstance.loggingEnabled = String(entries.fpr_enabled) === 'true';
    } else {
        // Config retrieved successfully, but there is no fpr_enabled in template.
        // Use secondary configs value.
        settingsServiceInstance.loggingEnabled = SECONDARY_CONFIGS.loggingEnabled;
    }
    if (entries.fpr_log_source) {
        settingsServiceInstance.logSource = Number(entries.fpr_log_source);
    }
    if (entries.fpr_log_endpoint_url) {
        settingsServiceInstance.logEndPointUrl = entries.fpr_log_endpoint_url;
    }
    if (entries.fpr_vc_network_request_sampling_rate !== undefined) {
        settingsServiceInstance.networkRequestsSamplingRate = Number(entries.fpr_vc_network_request_sampling_rate);
    }
    if (entries.fpr_vc_trace_sampling_rate !== undefined) {
        settingsServiceInstance.tracesSamplingRate = Number(entries.fpr_vc_trace_sampling_rate);
    }
    // Set the per session trace and network logging flags.
    settingsServiceInstance.logTraceAfterSampling = shouldLogAfterSampling(settingsServiceInstance.tracesSamplingRate);
    settingsServiceInstance.logNetworkAfterSampling = shouldLogAfterSampling(settingsServiceInstance.networkRequestsSamplingRate);
    return config;
}
function configValid(expiry) {
    return Number(expiry) > Date.now();
}
function shouldLogAfterSampling(samplingRate) {
    return Math.random() <= samplingRate;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var initializationStatus = 1 /* notInitialized */;
var initializationPromise;
function getInitializationPromise() {
    initializationStatus = 2 /* initializationPending */;
    initializationPromise = initializationPromise || initializePerf();
    return initializationPromise;
}
function isPerfInitialized() {
    return initializationStatus === 3 /* initialized */;
}
function initializePerf() {
    return getDocumentReadyComplete().then(function () {
        return getIidPromise();
    }).then(function (iid) {
        return getConfig(iid);
    }).then(function () {
        return changeInitializationStatus();
    }, function () {
        return changeInitializationStatus();
    });
}
/**
 * Returns a promise which resolves whenever the document readystate is complete or
 * immediately if it is called after page load complete.
 */
function getDocumentReadyComplete() {
    var document = Api.getInstance().document;
    return new Promise(function (resolve) {
        if (document && document.readyState !== 'complete') {
            var handler_1 = function handler_1() {
                if (document.readyState === 'complete') {
                    document.removeEventListener('readystatechange', handler_1);
                    resolve();
                }
            };
            document.addEventListener('readystatechange', handler_1);
        } else {
            resolve();
        }
    });
}
function changeInitializationStatus() {
    initializationStatus = 3 /* initialized */;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_SEND_INTERVAL_MS = 10 * 1000;
var INITIAL_SEND_TIME_DELAY_MS = 5.5 * 1000;
// If end point does not work, the call will be tried for these many times.
var DEFAULT_REMAINING_TRIES = 3;
var remainingTries = DEFAULT_REMAINING_TRIES;
/* eslint-enable camelcase */
var queue = [];
function processQueue(timeOffset) {
    setTimeout(function () {
        // If there is no remainingTries left, stop retrying.
        if (remainingTries === 0) {
            return;
        }
        // If there are no events to process, wait for DEFAULT_SEND_INTERVAL_MS and try again.
        if (!queue.length) {
            return processQueue(DEFAULT_SEND_INTERVAL_MS);
        }
        // Capture a snapshot of the queue and empty the "official queue".
        var staged = queue.slice();
        queue = [];
        /* eslint-disable camelcase */
        // We will pass the JSON serialized event to the backend.
        var log_event = staged.map(function (evt) {
            return {
                source_extension_json: evt.message,
                event_time_ms: String(evt.eventTime)
            };
        });
        var data = {
            request_time_ms: String(Date.now()),
            client_info: {
                client_type: 1,
                js_client_info: {}
            },
            log_source: SettingsService.getInstance().logSource,
            log_event: log_event
        };
        /* eslint-enable camelcase */
        fetch(SettingsService.getInstance().logEndPointUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function (res) {
            if (!res.ok) {
                consoleLogger.info('Call to Firebase backend failed.');
            }
            return res.json();
        }).then(function (res) {
            var wait = Number(res.next_request_wait_millis);
            // Find the next call wait time from the response.
            var requestOffset = isNaN(wait) ? DEFAULT_SEND_INTERVAL_MS : Math.max(DEFAULT_SEND_INTERVAL_MS, wait);
            remainingTries = DEFAULT_REMAINING_TRIES;
            // Schedule the next process.
            processQueue(requestOffset);
        }).catch(function () {
            /**
             * If the request fails for some reason, add the events that were attempted
             * back to the primary queue to retry later.
             */
            queue = staged.concat(queue);
            remainingTries--;
            consoleLogger.info("Tries left: " + remainingTries + ".");
            processQueue(DEFAULT_SEND_INTERVAL_MS);
        });
    }, timeOffset);
}
processQueue(INITIAL_SEND_TIME_DELAY_MS);
function addToQueue(evt) {
    if (!evt.eventTime || !evt.message) {
        throw index_esm_ERROR_FACTORY.create("invalid cc log" /* INVALID_CC_LOG */);
    }
    // Add the new event to the queue.
    queue = queue.concat([evt]);
}
/** Log handler for cc service to send the performance logs to the server. */
function ccHandler(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
serializer) {
    // The underscores for loggerInstance and level parameters are added to avoid the
    // noUnusedParameters related error.
    return function (_loggerInstance, _level) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var message = serializer.apply(void 0, args);
        addToQueue({
            message: message,
            eventTime: Date.now()
        });
    };
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-enble camelcase */
var logger;
// This method is not called before initialization.
function getLogger() {
    if (logger) {
        return logger;
    }
    var ccLogger = ccHandler(serializer);
    logger = new logger_dist_index_esm["b" /* Logger */]('@firebase/performance/cc');
    logger.logHandler = ccLogger;
    return logger;
}
function logTrace(trace) {
    var settingsService = SettingsService.getInstance();
    // Do not log if trace is auto generated and instrumentation is disabled.
    if (!settingsService.instrumentationEnabled && trace.isAuto) {
        return;
    }
    // Do not log if trace is custom and data collection is disabled.
    if (!settingsService.dataCollectionEnabled && !trace.isAuto) {
        return;
    }
    // Do not log if required apis are not available.
    if (!Api.getInstance().requiredApisAvailable()) {
        return;
    }
    // Only log the page load auto traces if page is visible.
    if (trace.isAuto && getVisibilityState() !== VisibilityState.VISIBLE) {
        return;
    }
    if (!settingsService.loggingEnabled || !settingsService.logTraceAfterSampling) {
        return;
    }
    if (isPerfInitialized()) {
        sendTraceLog(trace);
    } else {
        // Custom traces can be used before the initialization but logging
        // should wait until after.
        getInitializationPromise().then(function () {
            return sendTraceLog(trace);
        }, function () {
            return sendTraceLog(trace);
        });
    }
}
function sendTraceLog(trace) {
    if (getIid()) {
        setTimeout(function () {
            return getLogger().log(trace, 1 /* Trace */);
        }, 0);
    }
}
function logNetworkRequest(networkRequest) {
    var settingsService = SettingsService.getInstance();
    // Do not log network requests if instrumentation is disabled.
    if (!settingsService.instrumentationEnabled) {
        return;
    }
    // Do not log the js sdk's call to cc service to avoid unnecessary cycle.
    if (networkRequest.url === settingsService.logEndPointUrl.split('?')[0]) {
        return;
    }
    if (!settingsService.loggingEnabled || !settingsService.logNetworkAfterSampling) {
        return;
    }
    setTimeout(function () {
        return getLogger().log(networkRequest, 0 /* NetworkRequest */);
    }, 0);
}
function serializer(resource, resourceType) {
    if (resourceType === 0 /* NetworkRequest */) {
            return serializeNetworkRequest(resource);
        }
    return serializeTrace(resource);
}
function serializeNetworkRequest(networkRequest) {
    var networkRequestMetric = {
        url: networkRequest.url,
        http_method: networkRequest.httpMethod || 0,
        http_response_code: 200,
        response_payload_bytes: networkRequest.responsePayloadBytes,
        client_start_time_us: networkRequest.startTimeUs,
        time_to_response_initiated_us: networkRequest.timeToResponseInitiatedUs,
        time_to_response_completed_us: networkRequest.timeToResponseCompletedUs
    };
    var perfMetric = {
        application_info: getApplicationInfo(),
        network_request_metric: networkRequestMetric
    };
    return JSON.stringify(perfMetric);
}
function serializeTrace(trace) {
    var traceMetric = {
        name: trace.name,
        is_auto: trace.isAuto,
        client_start_time_us: trace.startTimeUs,
        duration_us: trace.durationUs
    };
    if (Object.keys(trace.counters).length !== 0) {
        traceMetric.counters = convertToKeyValueArray(trace.counters);
    }
    var customAttributes = trace.getAttributes();
    if (Object.keys(customAttributes).length !== 0) {
        traceMetric.custom_attributes = convertToKeyValueArray(customAttributes);
    }
    var perfMetric = {
        application_info: getApplicationInfo(),
        trace_metric: traceMetric
    };
    return JSON.stringify(perfMetric);
}
function getApplicationInfo() {
    return {
        google_app_id: SettingsService.getInstance().getAppId(),
        app_instance_id: getIid(),
        web_app_info: {
            sdk_version: SDK_VERSION,
            page_url: Api.getInstance().getUrl(),
            service_worker_status: getServiceWorkerStatus(),
            visibility_state: getVisibilityState(),
            effective_connection_type: getEffectiveConnectionType()
        },
        application_process_state: 0
    };
}
function convertToKeyValueArray(obj) {
    var keys = Object.keys(obj);
    return keys.map(function (key) {
        return { key: key, value: obj[key] };
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MAX_METRIC_NAME_LENGTH = 100;
var RESERVED_AUTO_PREFIX = '_';
var oobMetrics = [FIRST_PAINT_COUNTER_NAME, FIRST_CONTENTFUL_PAINT_COUNTER_NAME, FIRST_INPUT_DELAY_COUNTER_NAME];
/**
 * Returns true if the metric is custom and does not start with reserved prefix, or if
 * the metric is one of out of the box page load trace metrics.
 */
function isValidMetricName(name, traceName) {
    if (name.length === 0 || name.length > MAX_METRIC_NAME_LENGTH) {
        return false;
    }
    return traceName && traceName.startsWith(OOB_TRACE_PAGE_LOAD_PREFIX) && oobMetrics.indexOf(name) > -1 || !name.startsWith(RESERVED_AUTO_PREFIX);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm_Trace = /** @class */function () {
    /**
     * @param name The name of the trace.
     * @param isAuto If the trace is auto-instrumented.
     * @param traceMeasureName The name of the measure marker in user timing specification. This field
     * is only set when the trace is built for logging when the user directly uses the user timing
     * api (performance.mark and performance.measure).
     */
    function Trace(name, isAuto, traceMeasureName) {
        if (isAuto === void 0) {
            isAuto = false;
        }
        this.name = name;
        this.isAuto = isAuto;
        this.state = 1 /* UNINITIALIZED */;
        this.customAttributes = {};
        this.counters = {};
        this.api = Api.getInstance();
        this.randomId = Math.floor(Math.random() * 1000000);
        if (!this.isAuto) {
            this.traceStartMark = TRACE_START_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
            this.traceStopMark = TRACE_STOP_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
            this.traceMeasure = traceMeasureName || TRACE_MEASURE_PREFIX + "-" + this.randomId + "-" + this.name;
            if (traceMeasureName) {
                // For the case of direct user timing traces, no start stop will happen. The measure object
                // is already available.
                this.calculateTraceMetrics();
            }
        }
    }
    /**
     * Starts a trace. The measurement of the duration starts at this point.
     */
    Trace.prototype.start = function () {
        if (this.state !== 1 /* UNINITIALIZED */) {
                throw index_esm_ERROR_FACTORY.create("trace started" /* TRACE_STARTED_BEFORE */, {
                    traceName: this.name
                });
            }
        this.api.mark(this.traceStartMark);
        this.state = 2 /* RUNNING */;
    };
    /**
     * Stops the trace. The measurement of the duration of the trace stops at this point and trace
     * is logged.
     */
    Trace.prototype.stop = function () {
        if (this.state !== 2 /* RUNNING */) {
                throw index_esm_ERROR_FACTORY.create("trace stopped" /* TRACE_STOPPED_BEFORE */, {
                    traceName: this.name
                });
            }
        this.state = 3 /* TERMINATED */;
        this.api.mark(this.traceStopMark);
        this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark);
        this.calculateTraceMetrics();
        logTrace(this);
    };
    /**
     * Records a trace with predetermined values. If this method is used a trace is created and logged
     * directly. No need to use start and stop methods.
     * @param startTime Trace start time since epoch in millisec
     * @param duration The duraction of the trace in millisec
     * @param options An object which can optionally hold maps of custom metrics and custom attributes
     */
    Trace.prototype.record = function (startTime, duration, options) {
        this.durationUs = Math.floor(duration * 1000);
        this.startTimeUs = Math.floor(startTime * 1000);
        if (options && options.attributes) {
            this.customAttributes = Object(tslib_es6["a" /* __assign */])({}, options.attributes);
        }
        if (options && options.metrics) {
            for (var _i = 0, _a = Object.keys(options.metrics); _i < _a.length; _i++) {
                var metric = _a[_i];
                if (!isNaN(Number(options.metrics[metric]))) {
                    this.counters[metric] = Number(Math.floor(options.metrics[metric]));
                }
            }
        }
        logTrace(this);
    };
    /**
     * Increments a custom metric by a certain number or 1 if number not specified. Will create a new
     * custom metric if one with the given name does not exist.
     * @param counter Name of the custom metric
     * @param num Increment by value
     */
    Trace.prototype.incrementMetric = function (counter, num) {
        if (num === void 0) {
            num = 1;
        }
        if (this.counters[counter] === undefined) {
            this.putMetric(counter, 0);
        }
        this.counters[counter] += num;
    };
    /**
     * Sets a custom metric to a specified value. Will create a new custom metric if one with the
     * given name does not exist.
     * @param counter Name of the custom metric
     * @param num Set custom metric to this value
     */
    Trace.prototype.putMetric = function (counter, num) {
        if (isValidMetricName(counter, this.name)) {
            this.counters[counter] = num;
        } else {
            throw index_esm_ERROR_FACTORY.create("invalide custom metric name" /* INVALID_CUSTOM_METRIC_NAME */, {
                customMetricName: counter
            });
        }
    };
    /**
     * Returns the value of the custom metric by that name. If a custom metric with that name does
     * not exist will return zero.
     * @param counter
     */
    Trace.prototype.getMetric = function (counter) {
        return this.counters[counter] || 0;
    };
    /**
     * Sets a custom attribute of a trace to a certain value.
     * @param attr
     * @param value
     */
    Trace.prototype.putAttribute = function (attr, value) {
        var isValidName = isValidCustomAttributeName(attr);
        var isValidValue = isValidCustomAttributeValue(value);
        if (isValidName && isValidValue) {
            this.customAttributes[attr] = value;
            return;
        }
        // Throw appropriate error when the attribute name or value is invalid.
        if (!isValidName) {
            throw index_esm_ERROR_FACTORY.create("invalid attribute name" /* INVALID_ATTRIBUTE_NAME */, {
                attributeName: attr
            });
        }
        if (!isValidValue) {
            throw index_esm_ERROR_FACTORY.create("invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */, {
                attributeValue: value
            });
        }
    };
    /**
     * Retrieves the value a custom attribute of a trace is set to.
     * @param attr
     */
    Trace.prototype.getAttribute = function (attr) {
        return this.customAttributes[attr];
    };
    Trace.prototype.removeAttribute = function (attr) {
        if (this.customAttributes[attr] === undefined) {
            return;
        }
        delete this.customAttributes[attr];
    };
    Trace.prototype.getAttributes = function () {
        return Object(tslib_es6["a" /* __assign */])({}, this.customAttributes);
    };
    Trace.prototype.setStartTime = function (startTime) {
        this.startTimeUs = startTime;
    };
    Trace.prototype.setDuration = function (duration) {
        this.durationUs = duration;
    };
    /**
     * Calculates and assigns the duration and start time of the trace using the measure performance
     * entry.
     */
    Trace.prototype.calculateTraceMetrics = function () {
        var perfMeasureEntries = this.api.getEntriesByName(this.traceMeasure);
        var perfMeasureEntry = perfMeasureEntries && perfMeasureEntries[0];
        if (perfMeasureEntry) {
            this.durationUs = Math.floor(perfMeasureEntry.duration * 1000);
            this.startTimeUs = Math.floor((perfMeasureEntry.startTime + this.api.getTimeOrigin()) * 1000);
        }
    };
    /**
     * @param navigationTimings A single element array which contains the navigationTIming object of
     * the page load
     * @param paintTimings A array which contains paintTiming object of the page load
     * @param firstInputDelay First input delay in millisec
     */
    Trace.createOobTrace = function (navigationTimings, paintTimings, firstInputDelay) {
        var route = Api.getInstance().getUrl();
        if (!route) {
            return;
        }
        var trace = new Trace(OOB_TRACE_PAGE_LOAD_PREFIX + route, true);
        var timeOriginUs = Math.floor(Api.getInstance().getTimeOrigin() * 1000);
        trace.setStartTime(timeOriginUs);
        // navigationTimings includes only one element.
        if (navigationTimings && navigationTimings[0]) {
            trace.setDuration(Math.floor(navigationTimings[0].duration * 1000));
            trace.putMetric('domInteractive', Math.floor(navigationTimings[0].domInteractive * 1000));
            trace.putMetric('domContentLoadedEventEnd', Math.floor(navigationTimings[0].domContentLoadedEventEnd * 1000));
            trace.putMetric('loadEventEnd', Math.floor(navigationTimings[0].loadEventEnd * 1000));
        }
        var FIRST_PAINT = 'first-paint';
        var FIRST_CONTENTFUL_PAINT = 'first-contentful-paint';
        if (paintTimings) {
            var firstPaint = paintTimings.find(function (paintObject) {
                return paintObject.name === FIRST_PAINT;
            });
            if (firstPaint && firstPaint.startTime) {
                trace.putMetric(FIRST_PAINT_COUNTER_NAME, Math.floor(firstPaint.startTime * 1000));
            }
            var firstContentfulPaint = paintTimings.find(function (paintObject) {
                return paintObject.name === FIRST_CONTENTFUL_PAINT;
            });
            if (firstContentfulPaint && firstContentfulPaint.startTime) {
                trace.putMetric(FIRST_CONTENTFUL_PAINT_COUNTER_NAME, Math.floor(firstContentfulPaint.startTime * 1000));
            }
            if (firstInputDelay) {
                trace.putMetric(FIRST_INPUT_DELAY_COUNTER_NAME, Math.floor(firstInputDelay * 1000));
            }
        }
        logTrace(trace);
    };
    Trace.createUserTimingTrace = function (measureName) {
        var trace = new Trace(measureName, false, measureName);
        logTrace(trace);
    };
    return Trace;
}();

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createNetworkRequestEntry(entry) {
    var performanceEntry = entry;
    if (!performanceEntry || performanceEntry.responseStart === undefined) {
        return;
    }
    var timeOrigin = Api.getInstance().getTimeOrigin();
    var startTimeUs = Math.floor((performanceEntry.startTime + timeOrigin) * 1000);
    var timeToResponseInitiatedUs = performanceEntry.responseStart ? Math.floor((performanceEntry.responseStart - performanceEntry.startTime) * 1000) : undefined;
    var timeToResponseCompletedUs = Math.floor((performanceEntry.responseEnd - performanceEntry.startTime) * 1000);
    // Remove the query params from logged network request url.
    var url = performanceEntry.name && performanceEntry.name.split('?')[0];
    var networkRequest = {
        url: url,
        responsePayloadBytes: performanceEntry.transferSize,
        startTimeUs: startTimeUs,
        timeToResponseInitiatedUs: timeToResponseInitiatedUs,
        timeToResponseCompletedUs: timeToResponseCompletedUs
    };
    logNetworkRequest(networkRequest);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FID_WAIT_TIME_MS = 5000;
function setupOobResources() {
    // Do not initialize unless iid is available.
    if (!getIid()) {
        return;
    }
    // The load event might not have fired yet, and that means performance navigation timing
    // object has a duration of 0. The setup should run after all current tasks in js queue.
    setTimeout(function () {
        return setupOobTraces();
    }, 0);
    setTimeout(function () {
        return setupNetworkRequests();
    }, 0);
    setTimeout(function () {
        return setupUserTimingTraces();
    }, 0);
}
function setupNetworkRequests() {
    var api = Api.getInstance();
    var resources = api.getEntriesByType('resource');
    for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
        var resource = resources_1[_i];
        createNetworkRequestEntry(resource);
    }
    api.setupObserver('resource', createNetworkRequestEntry);
}
function setupOobTraces() {
    var api = Api.getInstance();
    var navigationTimings = api.getEntriesByType('navigation');
    var paintTimings = api.getEntriesByType('paint');
    // If First Input Desly polyfill is added to the page, report the fid value.
    // https://github.com/GoogleChromeLabs/first-input-delay
    if (api.onFirstInputDelay) {
        // If the fid call back is not called for certain time, continue without it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var timeoutId_1 = setTimeout(function () {
            index_esm_Trace.createOobTrace(navigationTimings, paintTimings);
            timeoutId_1 = undefined;
        }, FID_WAIT_TIME_MS);
        api.onFirstInputDelay(function (fid) {
            if (timeoutId_1) {
                clearTimeout(timeoutId_1);
                index_esm_Trace.createOobTrace(navigationTimings, paintTimings, fid);
            }
        });
    } else {
        index_esm_Trace.createOobTrace(navigationTimings, paintTimings);
    }
}
function setupUserTimingTraces() {
    var api = Api.getInstance();
    // Run through the measure performance entries collected up to this point.
    var measures = api.getEntriesByType('measure');
    for (var _i = 0, measures_1 = measures; _i < measures_1.length; _i++) {
        var measure = measures_1[_i];
        createUserTimingTrace(measure);
    }
    // Setup an observer to capture the measures from this point on.
    api.setupObserver('measure', createUserTimingTrace);
}
function createUserTimingTrace(measure) {
    var measureName = measure.name;
    // Do not create a trace, if the user timing marks and measures are created by the sdk itself.
    if (measureName.substring(0, TRACE_MEASURE_PREFIX.length) === TRACE_MEASURE_PREFIX) {
        return;
    }
    index_esm_Trace.createUserTimingTrace(measureName);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PerformanceController = /** @class */function () {
    function PerformanceController(app) {
        this.app = app;
        if (Api.getInstance().requiredApisAvailable()) {
            getInitializationPromise().then(setupOobResources, setupOobResources);
        } else {
            consoleLogger.info('Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.');
        }
    }
    PerformanceController.prototype.trace = function (name) {
        return new index_esm_Trace(name);
    };
    Object.defineProperty(PerformanceController.prototype, "instrumentationEnabled", {
        get: function get() {
            return SettingsService.getInstance().instrumentationEnabled;
        },
        set: function set(val) {
            SettingsService.getInstance().instrumentationEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerformanceController.prototype, "dataCollectionEnabled", {
        get: function get() {
            return SettingsService.getInstance().dataCollectionEnabled;
        },
        set: function set(val) {
            SettingsService.getInstance().dataCollectionEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    return PerformanceController;
}();

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
function registerPerformance(instance) {
    var factoryMethod = function factoryMethod(app) {
        if (app.name !== DEFAULT_ENTRY_NAME) {
            throw index_esm_ERROR_FACTORY.create("FB not default" /* FB_NOT_DEFAULT */);
        }
        if (typeof window === 'undefined') {
            throw index_esm_ERROR_FACTORY.create("no window" /* NO_WINDOW */);
        }
        setupApi(window);
        SettingsService.getInstance().firebaseAppInstance = app;
        return new PerformanceController(app);
    };
    // Register performance with firebase-app.
    var namespaceExports = {};
    instance.INTERNAL.registerService('performance', factoryMethod, namespaceExports);
}
registerPerformance(index_esm["a" /* default */]);


//# sourceMappingURL=index.esm.js.map
// CONCATENATED MODULE: ../node_modules/firebase/performance/dist/index.esm.js

//# sourceMappingURL=index.esm.js.map

/***/ })

};;
//# sourceMappingURL=0.chunk.a8fe8.js.map