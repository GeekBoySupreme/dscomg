module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "3JgR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"hero":"hero__3QVjs"};

/***/ }),

/***/ "E7XR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__("KM04");

var _MaterialComponent = _interopRequireDefault(__webpack_require__("lhA9"));

var _Icon = _interopRequireDefault(__webpack_require__("MeGi"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return _extends.apply(this, arguments);
}

/**
 * @prop dense = false
 * @prop two-line = false
 * @prop interactive = false
 */

var List = function (_MaterialComponent$de) {
  _inherits(List, _MaterialComponent$de);

  function List() {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, _MaterialComponent$de.call(this));

    _this.componentName = 'list';
    _this._mdcProps = ['dense', 'two-line', 'avatar-list'];
    return _this;
  }

  List.prototype.materialDom = function materialDom(props) {
    if (props.interactive) {
      return (0, _preact.h)("nav", _extends({
        ref: this.setControlRef
      }, props), props.children);
    }

    return (0, _preact.h)("ul", _extends({}, props, {
      ref: this.setControlRef
    }), props.children);
  };

  return List;
}(_MaterialComponent.default);

var ListItem = function (_MaterialComponent$de2) {
  _inherits(ListItem, _MaterialComponent$de2);

  function ListItem() {
    _classCallCheck(this, ListItem);

    var _this2 = _possibleConstructorReturn(this, _MaterialComponent$de2.call(this));

    _this2.componentName = 'list-item';
    return _this2;
  }

  ListItem.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("li", _extends({
      role: "option"
    }, props, {
      ref: this.setControlRef
    }), props.children);
  };

  return ListItem;
}(_MaterialComponent.default);

var LinkItem = function (_MaterialComponent$de3) {
  _inherits(LinkItem, _MaterialComponent$de3);

  function LinkItem() {
    _classCallCheck(this, LinkItem);

    var _this3 = _possibleConstructorReturn(this, _MaterialComponent$de3.call(this));

    _this3.componentName = 'list-item';
    return _this3;
  }

  LinkItem.prototype.componentDidMount = function componentDidMount() {
    _MaterialComponent$de3.prototype.attachRipple.call(this);
  };

  LinkItem.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("a", _extends({
      role: "option"
    }, props, {
      ref: this.setControlRef
    }), props.children);
  };

  return LinkItem;
}(_MaterialComponent.default);

var ListItemGraphic = function (_MaterialComponent$de4) {
  _inherits(ListItemGraphic, _MaterialComponent$de4);

  function ListItemGraphic() {
    _classCallCheck(this, ListItemGraphic);

    var _this4 = _possibleConstructorReturn(this, _MaterialComponent$de4.call(this));

    _this4.componentName = 'list-item__graphic';
    return _this4;
  }

  ListItemGraphic.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("span", _extends({}, props, {
      ref: this.setControlRef,
      role: "presentation"
    }), (0, _preact.h)(_Icon.default, {
      "aria-hidden": "true"
    }, props.children));
  };

  return ListItemGraphic;
}(_MaterialComponent.default);

var ListItemMeta = function (_ListItemGraphic) {
  _inherits(ListItemMeta, _ListItemGraphic);

  function ListItemMeta() {
    _classCallCheck(this, ListItemMeta);

    var _this5 = _possibleConstructorReturn(this, _ListItemGraphic.call(this));

    _this5.componentName = 'list-item__meta';
    return _this5;
  }

  return ListItemMeta;
}(ListItemGraphic);

var ListDivider = function (_MaterialComponent$de5) {
  _inherits(ListDivider, _MaterialComponent$de5);

  function ListDivider() {
    _classCallCheck(this, ListDivider);

    var _this6 = _possibleConstructorReturn(this, _MaterialComponent$de5.call(this));

    _this6.componentName = 'list-divider';
    _this6._mdcProps = ['inset'];
    return _this6;
  }

  ListDivider.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("li", _extends({
      role: "separator"
    }, props, {
      ref: this.setControlRef
    }));
  };

  return ListDivider;
}(_MaterialComponent.default);

var ListTextContainer = function (_MaterialComponent$de6) {
  _inherits(ListTextContainer, _MaterialComponent$de6);

  function ListTextContainer() {
    _classCallCheck(this, ListTextContainer);

    var _this7 = _possibleConstructorReturn(this, _MaterialComponent$de6.call(this));

    _this7.componentName = 'list-item__text';
    return _this7;
  }

  ListTextContainer.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("span", _extends({}, props, {
      ref: this.setControlRef
    }), props.children);
  };

  return ListTextContainer;
}(_MaterialComponent.default);

var ListPrimaryText = function (_ListTextContainer) {
  _inherits(ListPrimaryText, _ListTextContainer);

  function ListPrimaryText() {
    _classCallCheck(this, ListPrimaryText);

    var _this8 = _possibleConstructorReturn(this, _ListTextContainer.call(this));

    _this8.componentName = 'list-item__text__primary';
    return _this8;
  }

  return ListPrimaryText;
}(ListTextContainer);

var ListSecondaryText = function (_ListTextContainer2) {
  _inherits(ListSecondaryText, _ListTextContainer2);

  function ListSecondaryText() {
    _classCallCheck(this, ListSecondaryText);

    var _this9 = _possibleConstructorReturn(this, _ListTextContainer2.call(this));

    _this9.componentName = 'list-item__secondary-text';
    return _this9;
  }

  return ListSecondaryText;
}(ListTextContainer);

var ListGroup = function (_MaterialComponent$de7) {
  _inherits(ListGroup, _MaterialComponent$de7);

  function ListGroup() {
    _classCallCheck(this, ListGroup);

    var _this10 = _possibleConstructorReturn(this, _MaterialComponent$de7.call(this));

    _this10.componentName = 'list-group';
    return _this10;
  }

  return ListGroup;
}(_MaterialComponent.default);

var ListGroupHeader = function (_MaterialComponent$de8) {
  _inherits(ListGroupHeader, _MaterialComponent$de8);

  function ListGroupHeader() {
    _classCallCheck(this, ListGroupHeader);

    var _this11 = _possibleConstructorReturn(this, _MaterialComponent$de8.call(this));

    _this11.componentName = 'list-group__subheader';
    return _this11;
  }

  ListGroupHeader.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("h3", _extends({}, props, {
      ref: this.setControlRef
    }), props.children);
  };

  return ListGroupHeader;
}(_MaterialComponent.default);

List.Item = ListItem;
List.LinkItem = LinkItem;
List.ItemGraphic = ListItemGraphic;
List.ItemMeta = ListItemMeta;
List.Divider = ListDivider;
List.TextContainer = ListTextContainer;
List.PrimaryText = ListPrimaryText;
List.SecondaryText = ListSecondaryText;
List.Group = ListGroup;
List.GroupHeader = ListGroupHeader;
var _default = List;
exports.default = _default;

/***/ }),

/***/ "EQDb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__("uJAj");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
 * @template F
 */

var MDCComponent = function () {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  MDCComponent.attachTo = function attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
  };

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.prototype.initialize = function initialize() /* ...args */{}
  // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.


  /**
   * @return {!F} foundation
   */
  ;

  MDCComponent.prototype.getDefaultFoundation = function getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.listen = function listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.unlisten = function unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  MDCComponent.prototype.emit = function emit(evtType, evtData) {
    var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (MDCComponent);

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Drawer/index.js
var Drawer = __webpack_require__("ynRT");
var Drawer_default = /*#__PURE__*/__webpack_require__.n(Drawer);

// EXTERNAL MODULE: ../node_modules/preact-material-components/IconToggle/index.js
var IconToggle = __webpack_require__("MlBl");
var IconToggle_default = /*#__PURE__*/__webpack_require__.n(IconToggle);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Toolbar/index.js
var Toolbar = __webpack_require__("uOgf");
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Toolbar/style.css
var Toolbar_style = __webpack_require__("LbTS");
var Toolbar_style_default = /*#__PURE__*/__webpack_require__.n(Toolbar_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Drawer/style.css
var Drawer_style = __webpack_require__("RYBc");
var Drawer_style_default = /*#__PURE__*/__webpack_require__.n(Drawer_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/List/style.css
var List_style = __webpack_require__("u+vq");
var List_style_default = /*#__PURE__*/__webpack_require__.n(List_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/IconToggle/style.css
var IconToggle_style = __webpack_require__("pp9p");
var IconToggle_style_default = /*#__PURE__*/__webpack_require__.n(IconToggle_style);

// EXTERNAL MODULE: ./components/navbar/style.css
var navbar_style = __webpack_require__("XUTr");
var navbar_style_default = /*#__PURE__*/__webpack_require__.n(navbar_style);

// CONCATENATED MODULE: ./components/navbar/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var _ref = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 46 33', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])(
		'g',
		{ id: 'nav-io-phase-01', fill: 'none', 'fill-rule': 'evenodd', transform: 'translate(-62 -17)' },
		Object(preact_min["h"])(
			'g',
			{ id: 'ic-io-logo-indigo', transform: 'translate(62 17)', fill: '#536DFE' },
			Object(preact_min["h"])(
				'g',
				{ id: 'io-logo' },
				Object(preact_min["h"])('polygon', { id: 'Fill-1', points: '0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344' }),
				Object(preact_min["h"])('polygon', { id: 'Fill-2', points: '20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688' }),
				Object(preact_min["h"])('path', { d: 'M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298', id: 'Fill-3' })
			)
		)
	)
);

var _ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'July 14, 2018'
);

var _ref3 = Object(preact_min["h"])(
	'p',
	null,
	'Sunway University',
	Object(preact_min["h"])('br', null),
	'Bandar Sunway, Selangor'
);

var _ref4 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('g', { id: 'ui_x5F_spec_x5F_header_copy_5', display: 'inline' }),
	Object(preact_min["h"])('path', { display: 'inline', d: 'M10,19v-5h4v5c0,0.55,0.45,1,1,1h3c0.55,0,1-0.45,1-1v-7h1.7c0.46,0,0.68-0.57,0.33-0.87L12.67,3.6 c-0.38-0.34-0.96-0.34-1.34,0l-8.36,7.53C2.63,11.43,2.84,12,3.3,12H5v7c0,0.55,0.45,1,1,1h3C9.55,20,10,19.55,10,19z' })
);

var _ref5 = Object(preact_min["h"])(
	'span',
	null,
	'Home'
);

var _ref6 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])(
		'g',
		null,
		Object(preact_min["h"])('path', { d: 'M19,3h-1V2c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1H8V2c0-0.55-0.45-1-1-1h0C6.45,1,6,1.45,6,2v1H5 C3.89,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M18,19H6c-0.55,0-1-0.45-1-1V8h14v10 C19,18.55,18.55,19,18,19z M8,10h3c0.55,0,1,0.45,1,1v3c0,0.55-0.45,1-1,1H8c-0.55,0-1-0.45-1-1v-3C7,10.45,7.45,10,8,10z' })
	)
);

var _ref7 = Object(preact_min["h"])(
	'span',
	null,
	'Schedule'
);

var _ref8 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])(
		'g',
		null,
		Object(preact_min["h"])('path', { d: 'M19,2H5C3.89,2,3,2.9,3,4v14c0,1.1,0.9,2,2,2h4l2.29,2.29c0.39,0.39,1.02,0.39,1.41,0L15,20h4c1.1,0,2-0.9,2-2V4 C21,2.9,20.1,2,19,2z M12,5.3c1.49,0,2.7,1.21,2.7,2.7s-1.21,2.7-2.7,2.7S9.3,9.49,9.3,8S10.51,5.3,12,5.3z M18,16H6v-0.9 c0-2,4-3.1,6-3.1s6,1.1,6,3.1V16z' })
	)
);

var _ref9 = Object(preact_min["h"])(
	'span',
	null,
	'Attending'
);

var _ref10 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])(
		'g',
		null,
		Object(preact_min["h"])('path', { d: 'M20,12c0-0.76,0.43-1.42,1.06-1.76C21.66,9.91,22,9.23,22,8.54V6c0-1.1-0.9-2-2-2H4C2.9,4,2.01,4.89,2.01,5.99l0,2.55 c0,0.69,0.33,1.37,0.94,1.69C3.58,10.58,4,11.24,4,12c0,0.76-0.43,1.43-1.06,1.76C2.34,14.09,2,14.77,2,15.46l0,2.25 C2,19.1,2.9,20,4,20h16c1.1,0,2-0.9,2-2v-2.54c0-0.69-0.34-1.37-0.94-1.7C20.43,13.42,20,12.76,20,12z M14.5,16.1L12,14.5 l-2.5,1.61C9.12,16.35,8.63,16,8.75,15.56l0.75-2.88L7.2,10.8c-0.35-0.29-0.17-0.86,0.29-0.89l2.96-0.17l1.08-2.75 c0.17-0.42,0.77-0.42,0.93,0l1.08,2.76l2.96,0.17c0.45,0.03,0.64,0.6,0.29,0.89l-2.3,1.88l0.76,2.86 C15.37,16,14.88,16.35,14.5,16.1z' })
	)
);

var _ref11 = Object(preact_min["h"])(
	'span',
	null,
	'Registration'
);

var navbar_NavBar = function (_Component) {
	_inherits(NavBar, _Component);

	function NavBar() {
		var _temp, _this, _ret;

		_classCallCheck(this, NavBar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.openDrawer = function () {
			return _this.drawer.MDComponent.open = true;
		}, _this.drawerRef = function (drawer) {
			return _this.drawer = drawer;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	NavBar.prototype.closeDrawer = function closeDrawer() {
		this.drawer.MDComponent.open = false;
	};

	NavBar.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'div',
				{ 'class': navbar_style_default.a.toolbar },
				Object(preact_min["h"])(
					Toolbar_default.a,
					{ className: 'toolbar' },
					Object(preact_min["h"])(
						Toolbar_default.a.Row,
						null,
						Object(preact_min["h"])(
							Toolbar_default.a.Section,
							{ 'align-start': true },
							Object(preact_min["h"])(
								Toolbar_default.a.Icon,
								{ 'class': navbar_style_default.a.icon, menu: true, onClick: this.openDrawer },
								'menu'
							)
						)
					)
				)
			),
			Object(preact_min["h"])(
				Drawer_default.a.TemporaryDrawer,
				{ ref: this.drawerRef },
				Object(preact_min["h"])(
					Drawer_default.a.DrawerContent,
					null,
					Object(preact_min["h"])(
						'div',
						{ 'class': navbar_style_default.a.drawer_toolbar },
						_ref,
						_ref2,
						_ref3
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': navbar_style_default.a.drawer_nav },
						Object(preact_min["h"])(
							'a',
							{ href: '/', onClick: this.closeDrawer },
							'Home'
						),
						Object(preact_min["h"])(
							'a',
							{ href: '/schedule', onClick: this.closeDrawer },
							'Schedule'
						),
						Object(preact_min["h"])(
							'a',
							{ href: '/attending', onClick: this.closeDrawer },
							'Attending'
						),
						Object(preact_min["h"])(
							'a',
							{ href: '/register', onClick: this.closeDrawer },
							'Registration'
						),
						Object(preact_min["h"])(
							'a',
							{ href: '/communityguidelines', onClick: this.closeDrawer },
							'Community Guideline'
						)
					)
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': navbar_style_default.a.navbar },
				Object(preact_min["h"])(
					'div',
					{ 'class': navbar_style_default.a.hamburger },
					Object(preact_min["h"])(
						IconToggle_default.a,
						{ 'class': navbar_style_default.a.icon, role: 'button', tabindex: '0', onClick: this.openDrawer },
						'menu'
					)
				),
				Object(preact_min["h"])(
					'nav',
					null,
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: navbar_style_default.a.active, 'class': navbar_style_default.a.nav_item, href: '/' },
						_ref4,
						_ref5
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: navbar_style_default.a.active, 'class': navbar_style_default.a.nav_item, href: '/schedule' },
						_ref6,
						_ref7
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: navbar_style_default.a.active, 'class': navbar_style_default.a.nav_item, href: '/attending' },
						_ref8,
						_ref9
					),
					Object(preact_min["h"])(
						match["Link"],
						{ activeClassName: navbar_style_default.a.active, 'class': navbar_style_default.a.nav_item, href: '/register' },
						_ref10,
						_ref11
					)
				)
			)
		);
	};

	return NavBar;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var home__ref = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 46 33', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])(
		'g',
		{ id: 'nav-io-phase-01', fill: 'none', 'fill-rule': 'evenodd', transform: 'translate(-62 -17)' },
		Object(preact_min["h"])(
			'g',
			{ id: 'ic-io-logo-indigo', transform: 'translate(62 17)', fill: '#536DFE' },
			Object(preact_min["h"])(
				'g',
				{ id: 'io-logo' },
				Object(preact_min["h"])('polygon', { id: 'Fill-1', points: '0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344' }),
				Object(preact_min["h"])('polygon', { id: 'Fill-2', points: '20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688' }),
				Object(preact_min["h"])('path', { d: 'M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298', id: 'Fill-3' })
			)
		)
	)
);

var home__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Google I/O Extended 2018 brings out the best Google technologies all the way from Mountain View to Kuala Lumpur.'
);

var home__ref3 = Object(preact_min["h"])(
	'h3',
	null,
	'Partners'
);

var home__ref4 = Object(preact_min["h"])(
	'h4',
	null,
	'General sponsor'
);

var home__ref5 = Object(preact_min["h"])('img', { src: 'https://firebasestorage.googleapis.com/v0/b/hoverboard-firebase.appspot.com/o/images%2Flogos%2Fgoogle.svg?alt=media&token=3e7c88fe-2e6f-459a-b9dc-c84dd3358d9a' });

var home__ref6 = Object(preact_min["h"])(
	'h4',
	null,
	'Dummy Platinum sponsors'
);

var home__ref7 = Object(preact_min["h"])('img', { src: 'https://dfua17.firebaseapp.com/images/logos/n_ix.svg' });

var home__ref8 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/dataart.svg?alt=media&token=17bf36ef-4f21-44d5-8e6c-8a588d5b50de' });

var home__ref9 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/softserve.svg' });

var home__ref10 = Object(preact_min["h"])(
	'h4',
	null,
	'Dummy General sponsor'
);

var home__ref11 = Object(preact_min["h"])('img', { src: 'https://dfua17.firebaseapp.com/images/logos/itvdn.svg' });

var _ref12 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/dataart.svg?alt=media&token=17bf36ef-4f21-44d5-8e6c-8a588d5b50de' });

var _ref13 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/twilio.svg' });

var _ref14 = Object(preact_min["h"])('img', { src: 'https://dfua16.firebaseapp.com/images/logos/jetbrains.svg' });

var _ref15 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/softserve.svg' });

var _ref16 = Object(preact_min["h"])('img', { src: 'https://firebasestorage.googleapis.com/v0/b/hoverboard-firebase.appspot.com/o/images%2Flogos%2Fgoogle.svg?alt=media&token=3e7c88fe-2e6f-459a-b9dc-c84dd3358d9a' });

var _ref17 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/ruckus.svg?alt=media&token=24202cb1-c2de-49f9-b0b2-c2c14bd1006e' });

var _ref18 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/symphony-solutions.svg?alt=media&token=95796fce-fcb8-433f-ab72-5ac47c95199c' });

var _ref19 = Object(preact_min["h"])('img', { src: 'https://dfua17.firebaseapp.com/images/logos/n_ix.svg' });

var _ref20 = Object(preact_min["h"])('img', { src: 'https://dfua17.firebaseapp.com/images/logos/techmagic.svg' });

var _ref21 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/twilio.svg' });

var _ref22 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/symphony-solutions.svg?alt=media&token=95796fce-fcb8-433f-ab72-5ac47c95199c' });

var _ref23 = Object(preact_min["h"])('img', { src: 'https://storage.googleapis.com/dfua17.appspot.com/images/logos/softserve.svg' });

var _ref24 = Object(preact_min["h"])('img', { src: 'https://events.gdgkl.org/ioxkl17/images/gdgkl.svg' });

var _ref25 = Object(preact_min["h"])(
	'a',
	{ href: 'https://events.gdgkl.org/ioxkl17/', target: '_blank', rel: 'noopener noreferrer' },
	'I/O Extended \'17 Kuala Lumpur'
);

var _ref26 = Object(preact_min["h"])(
	'a',
	{ href: '/communityguidelines' },
	'Community Guideline'
);

var home_Home = function (_Component) {
	home__inherits(Home, _Component);

	function Home() {
		home__classCallCheck(this, Home);

		return home__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Home.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'div',
				{ className: [home_style_default.a.hero, 'hero'].join(' ') },
				home__ref,
				home__ref2
			),
			Object(preact_min["h"])('div', { className: [home_style_default.a.belt, 'belt'].join(' '), style: 'background-image: url(assets/io18_keynote.jpg)' }),
			Object(preact_min["h"])(
				'div',
				{ 'class': home_style_default.a.partners },
				home__ref3,
				Object(preact_min["h"])(
					'div',
					{ 'class': home_style_default.a.partner },
					home__ref4,
					Object(preact_min["h"])(
						'div',
						{ 'class': home_style_default.a.sponsor },
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							home__ref5
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': home_style_default.a.partner },
					home__ref6,
					Object(preact_min["h"])(
						'div',
						{ 'class': home_style_default.a.sponsor },
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							home__ref7
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							home__ref8
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							home__ref9
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': home_style_default.a.partner },
					home__ref10,
					Object(preact_min["h"])(
						'div',
						{ 'class': home_style_default.a.sponsor },
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							home__ref11
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref12
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref13
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref14
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref15
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref16
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref17
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref18
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref19
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref20
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref21
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref22
						),
						Object(preact_min["h"])(
							'a',
							{ href: '', 'class': home_style_default.a.item },
							_ref23
						)
					)
				)
			),
			Object(preact_min["h"])(
				'footer',
				null,
				Object(preact_min["h"])(
					'div',
					{ 'class': home_style_default.a.footer_logo },
					_ref24
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': home_style_default.a.footer_links },
					Object(preact_min["h"])(
						'div',
						{ 'class': home_style_default.a.footer_link },
						_ref25,
						_ref26
					)
				)
			)
		);
	};

	return Home;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/attending/style.css
var attending_style = __webpack_require__("yH7v");
var attending_style_default = /*#__PURE__*/__webpack_require__.n(attending_style);

// CONCATENATED MODULE: ./routes/attending/index.js


function attending__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function attending__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function attending__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var attending__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'hero' },
	Object(preact_min["h"])(
		'svg',
		{ viewBox: '0 0 46 33', xmlns: 'http://www.w3.org/2000/svg' },
		Object(preact_min["h"])(
			'g',
			{ id: 'nav-io-phase-01', fill: 'none', 'fill-rule': 'evenodd', transform: 'translate(-62 -17)' },
			Object(preact_min["h"])(
				'g',
				{ id: 'ic-io-logo-indigo', transform: 'translate(62 17)', fill: '#536DFE' },
				Object(preact_min["h"])(
					'g',
					{ id: 'io-logo' },
					Object(preact_min["h"])('polygon', { id: 'Fill-1', points: '0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344' }),
					Object(preact_min["h"])('polygon', { id: 'Fill-2', points: '20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688' }),
					Object(preact_min["h"])('path', { d: 'M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298', id: 'Fill-3' })
				)
			)
		)
	),
	Object(preact_min["h"])(
		'h2',
		null,
		'Attending'
	),
	Object(preact_min["h"])(
		'p',
		null,
		'Join us at Sunway University as we celebrate product and platform innovations at Google.'
	)
);

var attending__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Plan ahead, expect traffic delays, be patient, and consider carpooling.'
);

var attending__ref3 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'b',
		null,
		'Get transportation directions: '
	)
);

var attending__ref4 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: '' },
		'Google Maps'
	)
);

var attending__ref5 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: '' },
		'Waze'
	)
);

var attending__ref6 = Object(preact_min["h"])(
	'p',
	null,
	'Public transportation to the area is accessible via:'
);

var attending__ref7 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: '' },
		'BRT Sunway Line'
	)
);

var attending__ref8 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'b',
		null,
		'Grab'
	)
);

var attending__ref9 = Object(preact_min["h"])(
	'p',
	null,
	'Download the Grab app from ',
	Object(preact_min["h"])(
		'a',
		{ href: '' },
		'Google Play'
	),
	' or the ',
	Object(preact_min["h"])(
		'a',
		{ href: '' },
		'App Store'
	),
	'.'
);

var attending_Attending = function (_Component) {
	attending__inherits(Attending, _Component);

	function Attending() {
		attending__classCallCheck(this, Attending);

		return attending__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Attending.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			attending__ref,
			Object(preact_min["h"])('div', { className: [attending_style_default.a.belt, 'belt'].join(' '), style: 'background-image: url(assets/sunway_auditorium.jpg)' }),
			Object(preact_min["h"])(
				'div',
				{ 'class': attending_style_default.a.attending },
				Object(preact_min["h"])(
					'div',
					{ 'class': attending_style_default.a.attending_item },
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_title },
						'Getting to Sunway University'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_content },
						attending__ref2,
						attending__ref3,
						Object(preact_min["h"])(
							'div',
							{ 'class': attending_style_default.a.attending_list },
							attending__ref4,
							attending__ref5
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': attending_style_default.a.attending_item },
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_title },
						'Public Transportation'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_content },
						attending__ref6,
						Object(preact_min["h"])(
							'div',
							{ 'class': attending_style_default.a.attending_list },
							attending__ref7
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': attending_style_default.a.attending_item },
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_title },
						'Ridesharing'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_content },
						attending__ref8,
						attending__ref9
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': attending_style_default.a.attending_item },
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_title },
						'Parking'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': attending_style_default.a.attending_content },
						'Stay tuned over the coming weeks for more information about parking.'
					)
				)
			)
		);
	};

	return Attending;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/register/style.css
var register_style = __webpack_require__("3JgR");
var register_style_default = /*#__PURE__*/__webpack_require__.n(register_style);

// CONCATENATED MODULE: ./routes/register/index.js


function register__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function register__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function register__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var register__ref = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 46 33', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])(
		'g',
		{ id: 'nav-io-phase-01', fill: 'none', 'fill-rule': 'evenodd', transform: 'translate(-62 -17)' },
		Object(preact_min["h"])(
			'g',
			{ id: 'ic-io-logo-indigo', transform: 'translate(62 17)', fill: '#536DFE' },
			Object(preact_min["h"])(
				'g',
				{ id: 'io-logo' },
				Object(preact_min["h"])('polygon', { id: 'Fill-1', points: '0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344' }),
				Object(preact_min["h"])('polygon', { id: 'Fill-2', points: '20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688' }),
				Object(preact_min["h"])('path', { d: 'M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298', id: 'Fill-3' })
			)
		)
	)
);

var register__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Registration is: ',
	Object(preact_min["h"])('br', null),
	Object(preact_min["h"])(
		'span',
		null,
		'Opening soon'
	)
);

var register_Register = function (_Component) {
	register__inherits(Register, _Component);

	function Register() {
		register__classCallCheck(this, Register);

		return register__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Register.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'div',
				{ className: [register_style_default.a.hero, 'hero'].join(' ') },
				register__ref,
				register__ref2
			)
		);
	};

	return Register;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/schedule/style.css
var schedule_style = __webpack_require__("s3tW");
var schedule_style_default = /*#__PURE__*/__webpack_require__.n(schedule_style);

// CONCATENATED MODULE: ./routes/schedule/index.js


function schedule__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function schedule__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function schedule__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var schedule__ref = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 46 33', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])(
		'g',
		{ id: 'nav-io-phase-01', fill: 'none', 'fill-rule': 'evenodd', transform: 'translate(-62 -17)' },
		Object(preact_min["h"])(
			'g',
			{ id: 'ic-io-logo-indigo', transform: 'translate(62 17)', fill: '#536DFE' },
			Object(preact_min["h"])(
				'g',
				{ id: 'io-logo' },
				Object(preact_min["h"])('polygon', { id: 'Fill-1', points: '0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344' }),
				Object(preact_min["h"])('polygon', { id: 'Fill-2', points: '20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688' }),
				Object(preact_min["h"])('path', { d: 'M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298', id: 'Fill-3' })
			)
		)
	)
);

var schedule__ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Schedule'
);

var schedule__ref3 = Object(preact_min["h"])(
	'p',
	null,
	'This is just a preview! More events will be added frequently, so make sure to check back often.'
);

var schedule__ref4 = Object(preact_min["h"])(
	'span',
	null,
	'AM'
);

var schedule__ref5 = Object(preact_min["h"])(
	'span',
	null,
	'AM'
);

var schedule__ref6 = Object(preact_min["h"])(
	'span',
	null,
	'PM'
);

var schedule__ref7 = Object(preact_min["h"])(
	'span',
	null,
	'PM'
);

var schedule_Schedule = function (_Component) {
	schedule__inherits(Schedule, _Component);

	function Schedule() {
		schedule__classCallCheck(this, Schedule);

		return schedule__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Schedule.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'div',
				{ className: [schedule_style_default.a.hero, 'hero'].join(' ') },
				schedule__ref,
				schedule__ref2,
				schedule__ref3
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': schedule_style_default.a.schedule },
				Object(preact_min["h"])(
					'div',
					{ 'class': schedule_style_default.a.schedule_section },
					Object(preact_min["h"])(
						'div',
						{ 'class': schedule_style_default.a.schedule_content },
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_time },
							'9',
							schedule__ref4
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_events },
							Object(preact_min["h"])(
								'div',
								{ 'class': schedule_style_default.a.schedule_event },
								Object(preact_min["h"])(
									'div',
									{ 'class': schedule_style_default.a.schedule_event_details },
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_title },
										'Registration'
									),
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_meta },
										Object(preact_min["h"])(
											'div',
											{ 'class': schedule_style_default.a.schedule_event_description },
											'1 hour'
										)
									)
								)
							)
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': schedule_style_default.a.schedule_section },
					Object(preact_min["h"])(
						'div',
						{ 'class': schedule_style_default.a.schedule_content },
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_time },
							'9:45',
							schedule__ref5
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_events },
							Object(preact_min["h"])(
								'div',
								{ 'class': schedule_style_default.a.schedule_event },
								Object(preact_min["h"])(
									'div',
									{ 'class': schedule_style_default.a.schedule_event_details },
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_title },
										'Keynote'
									),
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_meta },
										Object(preact_min["h"])(
											'div',
											{ 'class': schedule_style_default.a.schedule_event_description },
											'45 mins'
										)
									)
								)
							)
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': schedule_style_default.a.schedule_section },
					Object(preact_min["h"])(
						'div',
						{ 'class': schedule_style_default.a.schedule_content },
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_time },
							'12:30',
							schedule__ref6
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_events },
							Object(preact_min["h"])(
								'div',
								{ 'class': schedule_style_default.a.schedule_event },
								Object(preact_min["h"])(
									'div',
									{ 'class': schedule_style_default.a.schedule_event_details },
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_title },
										'Lunch'
									),
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_meta },
										Object(preact_min["h"])(
											'div',
											{ 'class': schedule_style_default.a.schedule_event_description },
											'1 hour'
										)
									)
								)
							)
						)
					)
				),
				Object(preact_min["h"])(
					'div',
					{ 'class': schedule_style_default.a.schedule_section },
					Object(preact_min["h"])(
						'div',
						{ 'class': schedule_style_default.a.schedule_content },
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_time },
							'5:30',
							schedule__ref7
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': schedule_style_default.a.schedule_events },
							Object(preact_min["h"])(
								'div',
								{ 'class': schedule_style_default.a.schedule_event },
								Object(preact_min["h"])(
									'div',
									{ 'class': schedule_style_default.a.schedule_event_details },
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_title },
										'Photo Session & Closing'
									),
									Object(preact_min["h"])(
										'div',
										{ 'class': schedule_style_default.a.schedule_event_meta },
										Object(preact_min["h"])(
											'div',
											{ 'class': schedule_style_default.a.schedule_event_description },
											'15 mins'
										)
									)
								)
							)
						)
					)
				)
			)
		);
	};

	return Schedule;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/communityguidelines/style.css
var communityguidelines_style = __webpack_require__("Pt3o");
var communityguidelines_style_default = /*#__PURE__*/__webpack_require__.n(communityguidelines_style);

// CONCATENATED MODULE: ./routes/communityguidelines/index.js


function communityguidelines__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function communityguidelines__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function communityguidelines__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var communityguidelines__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'hero' },
	Object(preact_min["h"])(
		'svg',
		{ viewBox: '0 0 46 33', xmlns: 'http://www.w3.org/2000/svg' },
		Object(preact_min["h"])(
			'g',
			{ id: 'nav-io-phase-01', fill: 'none', 'fill-rule': 'evenodd', transform: 'translate(-62 -17)' },
			Object(preact_min["h"])(
				'g',
				{ id: 'ic-io-logo-indigo', transform: 'translate(62 17)', fill: '#536DFE' },
				Object(preact_min["h"])(
					'g',
					{ id: 'io-logo' },
					Object(preact_min["h"])('polygon', { id: 'Fill-1', points: '0 27.6131665 11.6101901 27.6131665 11.6101901 4.41459344 0 4.41459344' }),
					Object(preact_min["h"])('polygon', { id: 'Fill-2', points: '20.1618317 2.15798668e-05 12.9722085 32.3443582 14.7781521 32.7494123 21.9677754 0.405075688' }),
					Object(preact_min["h"])('path', { d: 'M33.2533553,3.45297298 C26.3665842,3.45297298 20.7835806,9.06222787 20.7835806,15.9813807 C20.7835806,22.9009651 26.3665842,28.5100042 33.2533553,28.5100042 C40.140556,28.5100042 45.7233447,22.9009651 45.7233447,15.9813807 C45.7233447,9.06222787 40.140556,3.45297298 33.2533553,3.45297298', id: 'Fill-3' })
				)
			)
		)
	),
	Object(preact_min["h"])(
		'h2',
		null,
		'Community Guidelines'
	)
);

var communityguidelines__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Google Developer Group Kuala Lumpur (GDGKL) and Google is dedicated to providing a harassment-free and inclusive event experience for everyone regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category. We do not tolerate harassment of event participants in any form. Google takes violations of our policy seriously and will respond appropriately.'
);

var communityguidelines__ref3 = Object(preact_min["h"])(
	'p',
	null,
	'All participants of Google-supported events must abide by the following policy:'
);

var communityguidelines__ref4 = Object(preact_min["h"])(
	'h4',
	null,
	'Be excellent to each other.'
);

var communityguidelines__ref5 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'span',
		null,
		'Treat everyone with respect. Participate while acknowledging that everyone deserves to be here \u2014 and each of us has the right to enjoy our experience without fear of harassment, discrimination, or condescension, whether blatant or via micro-aggressions. Jokes shouldn\u2019t demean others. Consider what you are saying and how it would feel if it were said to or about you.'
	)
);

var communityguidelines__ref6 = Object(preact_min["h"])(
	'h4',
	null,
	'Speak up if you see or hear something.'
);

var communityguidelines__ref7 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'span',
		null,
		'Harassment is not tolerated, and you are empowered to politely engage when you or others are disrespected. The person making you feel uncomfortable may not be aware of what they are doing, and politely bringing their behavior to their attention is encouraged.'
	)
);

var communityguidelines__ref8 = Object(preact_min["h"])(
	'h4',
	null,
	'Practice saying "Yes and" to each other.'
);

var communityguidelines__ref9 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'span',
		null,
		'It\u2019s a theatre improv technique to build on each other\u2019s ideas. We all benefit when we create together.'
	)
);

var communityguidelines__ref10 = Object(preact_min["h"])(
	'h4',
	null,
	'We have a ZERO TOLERANCE POLICY for harassment of any kind, including but not limited to:'
);

var communityguidelines__ref11 = Object(preact_min["h"])(
	'ul',
	null,
	Object(preact_min["h"])(
		'li',
		null,
		'Stalking/following'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Deliberate intimidation'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Harassing photography or recording'
	),
	Object(preact_min["h"])(
		'li',
		null,
		Object(preact_min["h"])(
			'span',
			null,
			'Sustained disruption of talks or other events'
		)
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Offensive verbal language'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Verbal language that reinforces social structures of domination'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Sexual imagery and language in public spaces'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Inappropriate physical contact'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Unwelcome sexual or physical attention'
	)
);

var communityguidelines__ref12 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'span',
		null,
		'In relation to, but not limited to:'
	)
);

var communityguidelines__ref13 = Object(preact_min["h"])(
	'ul',
	null,
	Object(preact_min["h"])(
		'li',
		null,
		'Neurodiversity'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Race'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Color'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'National origin'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Gender identity'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Gender expression'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Sexual orientation'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Age'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Body size'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Disabilities'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Appearance'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Religion'
	),
	Object(preact_min["h"])(
		'li',
		null,
		'Pregnancy'
	)
);

var communityguidelines__ref14 = Object(preact_min["h"])('br', null);

var communityguidelines__ref15 = Object(preact_min["h"])(
	'p',
	null,
	'Participants asked to stop any harassing behavior are expected to comply immediately. Our zero tolerance policy means that we will look into and review every allegation of violation of our Event Community Guidelines and Anti-Harassment Policy and respond appropriately. We empower and encourage you to report any behavior that makes you or others feel uncomfortable by finding a GDGKL organizer or volunteer or by emailing henry@gdg.my.'
);

var communityguidelines__ref16 = Object(preact_min["h"])('br', null);

var communityguidelines__ref17 = Object(preact_min["h"])(
	'p',
	null,
	'Event staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing discomfort or harassment to feel safe for the duration of the event. We value your attendance.'
);

var communityguidelines__ref18 = Object(preact_min["h"])('br', null);

var communityguidelines__ref19 = Object(preact_min["h"])(
	'p',
	null,
	'This policy extends to talks, forums, workshops, codelabs, social media, parties, hallway conversations, all attendees, partners, sponsors, volunteers, event staff, etc. You catch our drift. GDGKL reserves the right to refuse admittance to, or remove any person from, any GDGKL hosted event (including future GDGKL events) at any time in its sole discretion. This includes, but is not limited to, attendees behaving in a disorderly manner or failing to comply with this policy, and the terms and conditions herein. If a participant engages in harassing or uncomfortable behavior, the conference organizers may take any action they deem appropriate, including warning or expelling the offender from the conference with no refund.'
);

var communityguidelines_Register = function (_Component) {
	communityguidelines__inherits(Register, _Component);

	function Register() {
		communityguidelines__classCallCheck(this, Register);

		return communityguidelines__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Register.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			communityguidelines__ref,
			Object(preact_min["h"])(
				'div',
				{ 'class': communityguidelines_style_default.a.container },
				communityguidelines__ref2,
				communityguidelines__ref3,
				communityguidelines__ref4,
				communityguidelines__ref5,
				communityguidelines__ref6,
				communityguidelines__ref7,
				communityguidelines__ref8,
				communityguidelines__ref9,
				communityguidelines__ref10,
				communityguidelines__ref11,
				communityguidelines__ref12,
				communityguidelines__ref13,
				communityguidelines__ref14,
				communityguidelines__ref15,
				communityguidelines__ref16,
				communityguidelines__ref17,
				communityguidelines__ref18,
				communityguidelines__ref19
			)
		);
	};

	return Register;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

var app__ref = Object(preact_min["h"])(navbar_NavBar, null);

var app__ref2 = Object(preact_min["h"])(home_Home, { path: '/' });

var app__ref3 = Object(preact_min["h"])(attending_Attending, { path: '/attending/' });

var app__ref4 = Object(preact_min["h"])(register_Register, { path: '/register/' });

var app__ref5 = Object(preact_min["h"])(schedule_Schedule, { path: '/schedule/' });

var app__ref6 = Object(preact_min["h"])(communityguidelines_Register, { path: '/communityguidelines/' });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref,
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				app__ref2,
				app__ref3,
				app__ref4,
				app__ref5,
				app__ref6
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "LbTS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "MeGi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__("KM04");

var _MaterialComponent = _interopRequireDefault(__webpack_require__("lhA9"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return _extends.apply(this, arguments);
}

/**
 * @prop disabled = false
 */

var Icon = function (_MaterialComponent$de) {
  _inherits(Icon, _MaterialComponent$de);

  function Icon() {
    _classCallCheck(this, Icon);

    var _this = _possibleConstructorReturn(this, _MaterialComponent$de.call(this));

    _this.componentName = 'icon';
    return _this;
  }

  Icon.prototype.materialDom = function materialDom(props) {
    var classes = ['material-icons']; // CardActionIcon sends className

    props.className && classes.push(props.className);
    return (0, _preact.h)("i", _extends({}, props, {
      className: classes.join(' ')
    }), props.children);
  };

  return Icon;
}(_MaterialComponent.default);

exports.default = Icon;

/***/ }),

/***/ "MlBl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__("KM04");

var _iconToggle = __webpack_require__("xprb");

var _MaterialComponent = _interopRequireDefault(__webpack_require__("lhA9"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return _extends.apply(this, arguments);
}

/**
 * @prop disabled = false
 */

var IconToggle = function (_MaterialComponent$de) {
  _inherits(IconToggle, _MaterialComponent$de);

  function IconToggle() {
    _classCallCheck(this, IconToggle);

    var _this = _possibleConstructorReturn(this, _MaterialComponent$de.call(this));

    _this.componentName = 'icon-toggle';
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  IconToggle.prototype._onChange = function _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  IconToggle.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = new _iconToggle.MDCIconToggle(this.control);
    this.MDComponent.listen('MDCIconToggle:change', this._onChange);
  };

  IconToggle.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten('MDCIconToggle:change', this._onChange);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  IconToggle.prototype.materialDom = function materialDom(props) {
    if (props['data-toggle-on']) props['data-toggle-on'] = JSON.stringify(props['data-toggle-on']);
    if (props['data-toggle-off']) props['data-toggle-off'] = JSON.stringify(props['data-toggle-off']);
    return (0, _preact.h)("i", _extends({}, props, {
      className: "material-icons",
      ref: this.setControlRef
    }), props.children);
  };

  return IconToggle;
}(_MaterialComponent.default);

exports.default = IconToggle;

/***/ }),

/***/ "Pt3o":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"container__13Iwl"};

/***/ }),

/***/ "RYBc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "VqTd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ../node_modules/@material/drawer/slidable/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
// EXTERNAL MODULE: ../node_modules/@material/base/index.js
var base = __webpack_require__("dSNL");

// CONCATENATED MODULE: ../node_modules/@material/drawer/slidable/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var MDCSlidableDrawerFoundation = function (_MDCFoundation) {
  _inherits(MDCSlidableDrawerFoundation, _MDCFoundation);

  _createClass(MDCSlidableDrawerFoundation, null, [{
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        hasClass: function hasClass() /* className: string */{},
        hasNecessaryDom: function hasNecessaryDom() {
          return (/* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        setTranslateX: function setTranslateX() /* value: number | null */{},
        getFocusableElements: function getFocusableElements() /* NodeList */{},
        saveElementTabState: function saveElementTabState() /* el: Element */{},
        restoreElementTabState: function restoreElementTabState() /* el: Element */{},
        makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
        notifyOpen: function notifyOpen() {},
        notifyClose: function notifyClose() {},
        isRtl: function isRtl() {
          return (/* boolean */false
          );
        },
        getDrawerWidth: function getDrawerWidth() {
          return (/* number */0
          );
        }
      };
    }
  }]);

  function MDCSlidableDrawerFoundation(adapter, rootCssClass, animatingCssClass, openCssClass) {
    _classCallCheck(this, MDCSlidableDrawerFoundation);

    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCSlidableDrawerFoundation.defaultAdapter, adapter)));

    _this.rootCssClass_ = rootCssClass;
    _this.animatingCssClass_ = animatingCssClass;
    _this.openCssClass_ = openCssClass;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd_(evt);
    };

    _this.inert_ = false;

    _this.componentTouchStartHandler_ = function (evt) {
      return _this.handleTouchStart_(evt);
    };
    _this.componentTouchMoveHandler_ = function (evt) {
      return _this.handleTouchMove_(evt);
    };
    _this.componentTouchEndHandler_ = function (evt) {
      return _this.handleTouchEnd_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.close();
      }
    };
    return _this;
  }

  MDCSlidableDrawerFoundation.prototype.init = function init() {
    var ROOT = this.rootCssClass_;
    var OPEN = this.openCssClass_;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(ROOT + ' class required in root element.');
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    } else {
      this.detabinate_();
      this.isOpen_ = false;
    }

    this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
  };

  MDCSlidableDrawerFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
  };

  MDCSlidableDrawerFoundation.prototype.open = function open() {
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.addClass(this.openCssClass_);
    this.retabinate_();
    // Debounce multiple calls
    if (!this.isOpen_) {
      this.adapter_.notifyOpen();
    }
    this.isOpen_ = true;
  };

  MDCSlidableDrawerFoundation.prototype.close = function close() {
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.removeClass(this.openCssClass_);
    this.detabinate_();
    // Debounce multiple calls
    if (this.isOpen_) {
      this.adapter_.notifyClose();
    }
    this.isOpen_ = false;
  };

  MDCSlidableDrawerFoundation.prototype.isOpen = function isOpen() {
    return this.isOpen_;
  };

  /**
   *  Render all children of the drawer inert when it's closed.
   */


  MDCSlidableDrawerFoundation.prototype.detabinate_ = function detabinate_() {
    if (this.inert_) {
      return;
    }

    var elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (var i = 0; i < elements.length; i++) {
        this.adapter_.saveElementTabState(elements[i]);
        this.adapter_.makeElementUntabbable(elements[i]);
      }
    }

    this.inert_ = true;
  };

  /**
   *  Make all children of the drawer tabbable again when it's open.
   */


  MDCSlidableDrawerFoundation.prototype.retabinate_ = function retabinate_() {
    if (!this.inert_) {
      return;
    }

    var elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (var i = 0; i < elements.length; i++) {
        this.adapter_.restoreElementTabState(elements[i]);
      }
    }

    this.inert_ = false;
  };

  MDCSlidableDrawerFoundation.prototype.handleTouchStart_ = function handleTouchStart_(evt) {
    if (!this.adapter_.hasClass(this.openCssClass_)) {
      return;
    }
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.direction_ = this.adapter_.isRtl() ? -1 : 1;
    this.drawerWidth_ = this.adapter_.getDrawerWidth();
    this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    this.currentX_ = this.startX_;

    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
  };

  MDCSlidableDrawerFoundation.prototype.handleTouchMove_ = function handleTouchMove_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
  };

  MDCSlidableDrawerFoundation.prototype.handleTouchEnd_ = function handleTouchEnd_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.prepareForTouchEnd_();

    // Did the user close the drawer by more than 50%?
    if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
      this.close();
    } else {
      // Triggering an open here means we'll get a nice animation back to the fully open state.
      this.open();
    }
  };

  MDCSlidableDrawerFoundation.prototype.prepareForTouchEnd_ = function prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateX(null);
  };

  MDCSlidableDrawerFoundation.prototype.updateDrawer_ = function updateDrawer_() {
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
    this.adapter_.setTranslateX(this.newPosition_);
  };

  MDCSlidableDrawerFoundation.prototype.isRootTransitioningEventTarget_ = function isRootTransitioningEventTarget_() {
    // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
    // if the event target is the root event target currently transitioning.
    return false;
  };

  MDCSlidableDrawerFoundation.prototype.handleTransitionEnd_ = function handleTransitionEnd_(evt) {
    if (this.isRootTransitioningEventTarget_(evt.target)) {
      this.adapter_.removeClass(this.animatingCssClass_);
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
    }
  };

  _createClass(MDCSlidableDrawerFoundation, [{
    key: 'newPosition_',
    get: function get() {
      var newPos = null;

      if (this.direction_ === 1) {
        newPos = Math.min(0, this.currentX_ - this.startX_);
      } else {
        newPos = Math.max(0, this.currentX_ - this.startX_);
      }

      return newPos;
    }
  }]);

  return MDCSlidableDrawerFoundation;
}(base["b" /* MDCFoundation */]);
// CONCATENATED MODULE: ../node_modules/@material/drawer/slidable/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return FOCUSABLE_ELEMENTS; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return MDCSlidableDrawerFoundation; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/***/ }),

/***/ "WvoH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/index.js
var base = __webpack_require__("dSNL");

// EXTERNAL MODULE: ../node_modules/@material/drawer/slidable/index.js + 2 modules
var slidable = __webpack_require__("VqTd");

// CONCATENATED MODULE: ../node_modules/@material/drawer/temporary/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var cssClasses = {
  ROOT: 'mdc-drawer--temporary',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock'
};

var strings = {
  DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
  OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
  FOCUSABLE_ELEMENTS: slidable["a" /* FOCUSABLE_ELEMENTS */],
  OPEN_EVENT: 'MDCTemporaryDrawer:open',
  CLOSE_EVENT: 'MDCTemporaryDrawer:close'
};
// CONCATENATED MODULE: ../node_modules/@material/drawer/temporary/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var foundation_MDCTemporaryDrawerFoundation = function (_MDCSlidableDrawerFou) {
  _inherits(MDCTemporaryDrawerFoundation, _MDCSlidableDrawerFou);

  _createClass(MDCTemporaryDrawerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return _extends(slidable["b" /* MDCSlidableDrawerFoundation */].defaultAdapter, {
        addBodyClass: function addBodyClass() /* className: string */{},
        removeBodyClass: function removeBodyClass() /* className: string */{},
        isDrawer: function isDrawer() {
          return false;
        },
        updateCssVariable: function updateCssVariable() /* value: string */{},
        eventTargetHasClass: function eventTargetHasClass() {
          return (/* target: EventTarget, className: string */ /* boolean */false
          );
        }
      });
    }
  }]);

  function MDCTemporaryDrawerFoundation(adapter) {
    _classCallCheck(this, MDCTemporaryDrawerFoundation);

    var _this = _possibleConstructorReturn(this, _MDCSlidableDrawerFou.call(this, _extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN));

    _this.componentClickHandler_ = function (evt) {
      if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.ROOT)) {
        _this.close(true);
      }
    };
    return _this;
  }

  MDCTemporaryDrawerFoundation.prototype.init = function init() {
    _MDCSlidableDrawerFou.prototype.init.call(this);

    // Make browser aware of custom property being used in this element.
    // Workaround for certain types of hard-to-reproduce heisenbugs.
    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  };

  MDCTemporaryDrawerFoundation.prototype.destroy = function destroy() {
    _MDCSlidableDrawerFou.prototype.destroy.call(this);

    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.enableScroll_();
  };

  MDCTemporaryDrawerFoundation.prototype.open = function open() {
    this.disableScroll_();
    // Make sure custom property values are cleared before starting.
    this.adapter_.updateCssVariable('');

    _MDCSlidableDrawerFou.prototype.open.call(this);
  };

  MDCTemporaryDrawerFoundation.prototype.close = function close() {
    // Make sure custom property values are cleared before making any changes.
    this.adapter_.updateCssVariable('');

    _MDCSlidableDrawerFou.prototype.close.call(this);
  };

  MDCTemporaryDrawerFoundation.prototype.prepareForTouchEnd_ = function prepareForTouchEnd_() {
    _MDCSlidableDrawerFou.prototype.prepareForTouchEnd_.call(this);

    this.adapter_.updateCssVariable('');
  };

  MDCTemporaryDrawerFoundation.prototype.updateDrawer_ = function updateDrawer_() {
    _MDCSlidableDrawerFou.prototype.updateDrawer_.call(this);

    var newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  };

  MDCTemporaryDrawerFoundation.prototype.isRootTransitioningEventTarget_ = function isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  };

  MDCTemporaryDrawerFoundation.prototype.handleTransitionEnd_ = function handleTransitionEnd_(evt) {
    _MDCSlidableDrawerFou.prototype.handleTransitionEnd_.call(this, evt);
    if (!this.isOpen_) {
      this.enableScroll_();
    }
  };

  MDCTemporaryDrawerFoundation.prototype.disableScroll_ = function disableScroll_() {
    this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
  };

  MDCTemporaryDrawerFoundation.prototype.enableScroll_ = function enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
  };

  return MDCTemporaryDrawerFoundation;
}(slidable["b" /* MDCSlidableDrawerFoundation */]);


// EXTERNAL MODULE: ../node_modules/@material/drawer/util.js
var util = __webpack_require__("rQFk");

// CONCATENATED MODULE: ../node_modules/@material/drawer/temporary/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTemporaryDrawer", function() { return temporary_MDCTemporaryDrawer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCTemporaryDrawerFoundation", function() { return foundation_MDCTemporaryDrawerFoundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "util", function() { return util; });
var temporary__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function temporary__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function temporary__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function temporary__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var temporary_MDCTemporaryDrawer = function (_MDCComponent) {
  temporary__inherits(MDCTemporaryDrawer, _MDCComponent);

  function MDCTemporaryDrawer() {
    temporary__classCallCheck(this, MDCTemporaryDrawer);

    return temporary__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCTemporaryDrawer.attachTo = function attachTo(root) {
    return new MDCTemporaryDrawer(root);
  };

  MDCTemporaryDrawer.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    var _MDCTemporaryDrawerFo = foundation_MDCTemporaryDrawerFoundation.strings,
        FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
        OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


    return new foundation_MDCTemporaryDrawerFoundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      eventTargetHasClass: function eventTargetHasClass(target, className) {
        return target.classList.contains(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this2.drawer);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this2.root_.addEventListener(util["remapEvent"](evt), handler, util["applyPassive"]());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this2.root_.removeEventListener(util["remapEvent"](evt), handler, util["applyPassive"]());
      },
      registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.addEventListener(util["remapEvent"](evt), handler);
      },
      deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.removeEventListener(util["remapEvent"](evt), handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        return _this2.drawer.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        return _this2.drawer.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      getDrawerWidth: function getDrawerWidth() {
        return _this2.drawer.offsetWidth;
      },
      setTranslateX: function setTranslateX(value) {
        return _this2.drawer.style.setProperty(util["getTransformPropertyName"](), value === null ? null : 'translateX(' + value + 'px)');
      },
      updateCssVariable: function updateCssVariable(value) {
        if (util["supportsCssCustomProperties"]()) {
          _this2.root_.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: function getFocusableElements() {
        return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
      },
      saveElementTabState: function saveElementTabState(el) {
        return util["saveElementTabState"](el);
      },
      restoreElementTabState: function restoreElementTabState(el) {
        return util["restoreElementTabState"](el);
      },
      makeElementUntabbable: function makeElementUntabbable(el) {
        return el.setAttribute('tabindex', -1);
      },
      notifyOpen: function notifyOpen() {
        return _this2.emit(foundation_MDCTemporaryDrawerFoundation.strings.OPEN_EVENT);
      },
      notifyClose: function notifyClose() {
        return _this2.emit(foundation_MDCTemporaryDrawerFoundation.strings.CLOSE_EVENT);
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
      },
      isDrawer: function isDrawer(el) {
        return el === _this2.drawer;
      }
    });
  };

  temporary__createClass(MDCTemporaryDrawer, [{
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }

    /* Return the drawer element inside the component. */

  }, {
    key: 'drawer',
    get: function get() {
      return this.root_.querySelector(foundation_MDCTemporaryDrawerFoundation.strings.DRAWER_SELECTOR);
    }
  }]);

  return MDCTemporaryDrawer;
}(base["a" /* MDCComponent */]);

/***/ }),

/***/ "XUTr":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"toolbar":"toolbar__3mfc2","icon":"icon__35sZo","drawer_toolbar":"drawer_toolbar__1VrbX","drawer_nav":"drawer_nav__K2TXA","navbar":"navbar__2X9cA","hamburger":"hamburger__309eM","nav_item":"nav_item__3KeIu","active":"active__2hWDy"};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"hero":"hero__1Z8cY","partners":"partners__JqXZZ","sponsor":"sponsor__2Xiqv","item":"item__3r_cP","footer_logo":"footer_logo__2RiLO","footer_link":"footer_link__3x2KJ"};

/***/ }),

/***/ "dSNL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__("uJAj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__("EQDb");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__foundation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__component__["a"]; });
/**
 * @license
 * Copyright 2016 Google Inc.
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






/***/ }),

/***/ "jhiW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/index.js
var base = __webpack_require__("dSNL");

// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 4 modules
var _material_ripple = __webpack_require__("vkNc");

// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/toolbar/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
};

var strings = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  ICON_SELECTOR: '.mdc-toolbar__icon',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change'
};

var numbers = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600
};
// CONCATENATED MODULE: ../node_modules/@material/toolbar/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var foundation_MDCToolbarFoundation = function (_MDCFoundation) {
  _inherits(MDCToolbarFoundation, _MDCFoundation);

  _createClass(MDCToolbarFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        hasClass: function hasClass() {
          return (/* className: string */ /* boolean */false
          );
        },
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
        deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        getViewportWidth: function getViewportWidth() {
          return (/* number */0
          );
        },
        getViewportScrollY: function getViewportScrollY() {
          return (/* number */0
          );
        },
        getOffsetHeight: function getOffsetHeight() {
          return (/* number */0
          );
        },
        getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
          return (/* number */0
          );
        },
        notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
        setStyle: function setStyle() /* property: string, value: string */{},
        setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
        setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
        setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
      };
    }
  }]);

  function MDCToolbarFoundation(adapter) {
    _classCallCheck(this, MDCToolbarFoundation);

    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCToolbarFoundation.defaultAdapter, adapter)));

    _this.resizeHandler_ = function () {
      return _this.checkRowHeight_();
    };
    _this.scrollHandler_ = function () {
      return _this.updateToolbarStyles_();
    };
    _this.checkRowHeightFrame_ = 0;
    _this.scrollFrame_ = 0;
    _this.executedLastChange_ = false;

    _this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0, // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
      maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
      scrollThreshold: 0
    };
    // Toolbar fixed behavior
    // If toolbar is fixed
    _this.fixed_ = false;
    // If fixed is targeted only at the last row
    _this.fixedLastrow_ = false;
    // Toolbar flexible behavior
    // If the first row is flexible
    _this.hasFlexibleRow_ = false;
    // If use the default behavior
    _this.useFlexDefaultBehavior_ = false;
    return _this;
  }

  MDCToolbarFoundation.prototype.init = function init() {
    this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
    this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
    this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
    if (this.hasFlexibleRow_) {
      this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
    }
    this.initKeyRatio_();
    this.setKeyHeights_();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  };

  MDCToolbarFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  };

  MDCToolbarFoundation.prototype.updateAdjustElementStyles = function updateAdjustElementStyles() {
    if (this.fixed_) {
      this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
    }
  };

  MDCToolbarFoundation.prototype.getFlexibleExpansionRatio_ = function getFlexibleExpansionRatio_(scrollTop) {
    // To prevent division by zero when there is no flexibleExpansionHeight
    var delta = 0.0001;
    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
  };

  MDCToolbarFoundation.prototype.checkRowHeight_ = function checkRowHeight_() {
    var _this2 = this;

    cancelAnimationFrame(this.checkRowHeightFrame_);
    this.checkRowHeightFrame_ = requestAnimationFrame(function () {
      return _this2.setKeyHeights_();
    });
  };

  MDCToolbarFoundation.prototype.setKeyHeights_ = function setKeyHeights_() {
    var newToolbarRowHeight = this.getRowHeight_();
    if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
      this.calculations_.toolbarRowHeight = newToolbarRowHeight;
      this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
      this.updateAdjustElementStyles();
      this.updateToolbarStyles_();
    }
  };

  MDCToolbarFoundation.prototype.updateToolbarStyles_ = function updateToolbarStyles_() {
    var _this3 = this;

    cancelAnimationFrame(this.scrollFrame_);
    this.scrollFrame_ = requestAnimationFrame(function () {
      var scrollTop = _this3.adapter_.getViewportScrollY();
      var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

      if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
        return;
      }

      var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

      _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
      if (_this3.fixedLastrow_) {
        _this3.updateToolbarFixedState_(scrollTop);
      }
      if (_this3.hasFlexibleRow_) {
        _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
      }
      _this3.executedLastChange_ = hasScrolledOutOfThreshold;
      _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
    });
  };

  MDCToolbarFoundation.prototype.scrolledOutOfThreshold_ = function scrolledOutOfThreshold_(scrollTop) {
    return scrollTop > this.calculations_.scrollThreshold;
  };

  MDCToolbarFoundation.prototype.initKeyRatio_ = function initKeyRatio_() {
    var toolbarRowHeight = this.getRowHeight_();
    var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
    this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
    this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
  };

  MDCToolbarFoundation.prototype.getRowHeight_ = function getRowHeight_() {
    var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
    return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
  };

  MDCToolbarFoundation.prototype.updateToolbarFlexibleState_ = function updateToolbarFlexibleState_(flexibleExpansionRatio) {
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    if (flexibleExpansionRatio === 1) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    } else if (flexibleExpansionRatio === 0) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    }
  };

  MDCToolbarFoundation.prototype.updateToolbarFixedState_ = function updateToolbarFixedState_(scrollTop) {
    var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
    this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

    if (translateDistance === this.calculations_.maxTranslateYDistance) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    } else {
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    }
  };

  MDCToolbarFoundation.prototype.updateFlexibleRowElementStyles_ = function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
    if (this.fixed_) {
      var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
      this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
    }
    if (this.useFlexDefaultBehavior_) {
      this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
    }
  };

  MDCToolbarFoundation.prototype.updateElementStylesDefaultBehavior_ = function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
    var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
    var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
    var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

    this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
  };

  return MDCToolbarFoundation;
}(foundation["a" /* default */]);


// CONCATENATED MODULE: ../node_modules/@material/toolbar/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCToolbar", function() { return toolbar_MDCToolbar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCToolbarFoundation", function() { return foundation_MDCToolbarFoundation; });
var toolbar__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function toolbar__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toolbar__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function toolbar__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var toolbar_MDCToolbar = function (_MDCComponent) {
  toolbar__inherits(MDCToolbar, _MDCComponent);

  function MDCToolbar() {
    toolbar__classCallCheck(this, MDCToolbar);

    return toolbar__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCToolbar.attachTo = function attachTo(root) {
    return new MDCToolbar(root);
  };

  MDCToolbar.prototype.initialize = function initialize() {
    this.ripples_ = [].map.call(this.root_.querySelectorAll(foundation_MDCToolbarFoundation.strings.ICON_SELECTOR), function (icon) {
      var ripple = _material_ripple["a" /* MDCRipple */].attachTo(icon);
      ripple.unbounded = true;
      return ripple;
    });
  };

  MDCToolbar.prototype.destroy = function destroy() {
    this.ripples_.forEach(function (ripple) {
      ripple.destroy();
    });
    _MDCComponent.prototype.destroy.call(this);
  };

  MDCToolbar.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new foundation_MDCToolbarFoundation({
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      registerScrollHandler: function registerScrollHandler(handler) {
        return window.addEventListener('scroll', handler);
      },
      deregisterScrollHandler: function deregisterScrollHandler(handler) {
        return window.removeEventListener('scroll', handler);
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      getViewportWidth: function getViewportWidth() {
        return window.innerWidth;
      },
      getViewportScrollY: function getViewportScrollY() {
        return window.pageYOffset;
      },
      getOffsetHeight: function getOffsetHeight() {
        return _this2.root_.offsetHeight;
      },
      getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
        return _this2.firstRowElement_.offsetHeight;
      },
      notifyChange: function notifyChange(evtData) {
        return _this2.emit(foundation_MDCToolbarFoundation.strings.CHANGE_EVENT, evtData);
      },
      setStyle: function setStyle(property, value) {
        return _this2.root_.style.setProperty(property, value);
      },
      setStyleForTitleElement: function setStyleForTitleElement(property, value) {
        return _this2.titleElement_.style.setProperty(property, value);
      },
      setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
        return _this2.firstRowElement_.style.setProperty(property, value);
      },
      setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
        if (_this2.fixedAdjustElement) {
          _this2.fixedAdjustElement.style.setProperty(property, value);
        }
      }
    });
  };

  toolbar__createClass(MDCToolbar, [{
    key: 'firstRowElement_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
    }
  }, {
    key: 'titleElement_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCToolbarFoundation.strings.TITLE_SELECTOR);
    }
  }, {
    key: 'fixedAdjustElement',
    set: function set(fixedAdjustElement) {
      this.fixedAdjustElement_ = fixedAdjustElement;
      this.foundation_.updateAdjustElementStyles();
    },
    get: function get() {
      return this.fixedAdjustElement_;
    }
  }]);

  return MDCToolbar;
}(base["a" /* MDCComponent */]);

/***/ }),

/***/ "lhA9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MaterialComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_ripple__ = __webpack_require__("vkNc");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

var MaterialComponent = function (_Component) {
  _inherits(MaterialComponent, _Component);

  function MaterialComponent() {
    _classCallCheck(this, MaterialComponent);

    // Attributes inside this array will be check for boolean value true
    // and will be converted to mdc classes
    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this._mdcProps = [];
    // This will again be used to add apt classname to the component
    _this.componentName = '';
    // The final class name given to the dom
    _this.classText = '';
    // Shared setter for the root element ref
    _this.setControlRef = function (control) {
      _this.control = control;
    };
    return _this;
  }

  MaterialComponent.prototype.attachRipple = function attachRipple() {
    if (this.props.ripple && this.control) {
      __WEBPACK_IMPORTED_MODULE_1__material_ripple__["a" /* MDCRipple */].attachTo(this.control);
    }
  };
  // Build the className based on component names and mdc props


  MaterialComponent.prototype.buildClassName = function buildClassName() {
    // Class name based on component name
    this.classText = 'mdc-' + this.componentName;

    // Loop over mdcProps to turn them into classNames
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey)) {
        var prop = this.props[propKey];
        if (typeof prop === 'boolean' && prop) {
          if (this._mdcProps.indexOf(propKey) !== -1) {
            this.classText += ' mdc-' + this.componentName + '--' + propKey;
          }
        }
      }
    }
  };

  MaterialComponent.prototype.getClassName = function getClassName(element) {
    if (!element) {
      return '';
    }
    var attrs = element.attributes = element.attributes || {};
    var classText = this.classText;
    if (attrs.class) {
      classText += ' ' + attrs.class;
    }
    if (attrs.className && attrs.className !== attrs.class) {
      classText += ' ' + attrs.className;
    }
    return classText;
  };

  // Components must implement this method for their specific DOM structure


  MaterialComponent.prototype.materialDom = function materialDom(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('div', _extends({}, props), props.children);
  };

  MaterialComponent.prototype.render = function render() {
    this.buildClassName();
    // Fetch a VNode
    var componentProps = this.props;
    var userDefinedClasses = componentProps.className || componentProps.class || '';
    // We delete class props and add them later in the final
    // step so every component does not need to handle user specified classes.
    if (componentProps['class']) delete componentProps['class'];
    if (componentProps['className']) delete componentProps['className'];

    var element = this.materialDom(componentProps);
    element.attributes = element.attributes || {};

    element.attributes.className = (userDefinedClasses + ' ' + this.getClassName(element)).split(' ').filter(function (value, index, self) {
      return self.indexOf(value) === index && value !== '';
    }) // Unique + exclude empty class names
    .join(' ');
    // Clean this shit of proxy attributes
    this._mdcProps.forEach(function (prop) {
      delete element.attributes[prop];
    });
    return element;
  };

  return MaterialComponent;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "pp9p":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rQFk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["remapEvent"] = remapEvent;
/* harmony export (immutable) */ __webpack_exports__["getTransformPropertyName"] = getTransformPropertyName;
/* harmony export (immutable) */ __webpack_exports__["supportsCssCustomProperties"] = supportsCssCustomProperties;
/* harmony export (immutable) */ __webpack_exports__["applyPassive"] = applyPassive;
/* harmony export (immutable) */ __webpack_exports__["saveElementTabState"] = saveElementTabState;
/* harmony export (immutable) */ __webpack_exports__["restoreElementTabState"] = restoreElementTabState;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TAB_DATA = 'data-mdc-tabindex';
var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

var storedTransformPropertyName_ = void 0;
var supportsPassive_ = void 0;

// Remap touch events to pointer events, if the browser doesn't support touch events.
function remapEvent(eventName) {
  var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
      case 'touchstart':
        return 'pointerdown';
      case 'touchmove':
        return 'pointermove';
      case 'touchend':
        return 'pointerup';
      default:
        return eventName;
    }
  }

  return eventName;
}

// Choose the correct transform property to use on the current browser.
function getTransformPropertyName() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

// Determine whether the current browser supports CSS properties.
function supportsCssCustomProperties() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

// Save the tab state for an element.
function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

// Restore the tab state for an element, if it was saved.
function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
  }
}

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "s3tW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"schedule":"schedule__1aVD5","schedule_section":"schedule_section__1I6vX","schedule_content":"schedule_content__3CLwc","schedule_time":"schedule_time__1IwNg","schedule_events":"schedule_events__L8lEN","schedule_event":"schedule_event__3QDLd","schedule_event_title":"schedule_event_title__3w2jA","schedule_event_meta":"schedule_event_meta__10biI","schedule_event_description":"schedule_event_description__3imRx"};

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u+vq":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "uJAj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  MDCFoundation.prototype.init = function init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/* harmony default export */ __webpack_exports__["a"] = (MDCFoundation);

/***/ }),

/***/ "uOgf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__("KM04");

var _MaterialComponent = _interopRequireDefault(__webpack_require__("lhA9"));

var _toolbar = __webpack_require__("jhiW");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return _extends.apply(this, arguments);
}

/**
 * @prop fixed = false
 * @prop fixed-lastrow-only = false
 * @prop waterfall = false
 * @prop flexible = false
 * @prop flexible-default-behavior = false
 */

var Toolbar = function (_MaterialComponent$de) {
  _inherits(Toolbar, _MaterialComponent$de);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, _MaterialComponent$de.call(this));

    _this.componentName = 'toolbar';
    _this._mdcProps = ['fixed', 'fixed-lastrow-only', 'waterfall', 'flexible', 'flexible-default-behavior'];
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  Toolbar.prototype._onChange = function _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  Toolbar.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = new _toolbar.MDCToolbar(this.control);
    this.MDComponent.listen('MDCToolbar:change', this._onChange);
  };

  Toolbar.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten('MDCToolbar:change', this._onChange);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  Toolbar.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("header", _extends({
      ref: this.setControlRef
    }, props), props.children);
  };

  return Toolbar;
}(_MaterialComponent.default);

var ToolbarRow = function (_MaterialComponent$de2) {
  _inherits(ToolbarRow, _MaterialComponent$de2);

  function ToolbarRow() {
    _classCallCheck(this, ToolbarRow);

    var _this2 = _possibleConstructorReturn(this, _MaterialComponent$de2.call(this));

    _this2.componentName = 'toolbar__row';
    return _this2;
  }

  return ToolbarRow;
}(_MaterialComponent.default);
/**
 * @prop align-end = false
 * @prop align-start = false
 * @prop shrink-to-fit = false
 */

var ToolbarSection = function (_MaterialComponent$de3) {
  _inherits(ToolbarSection, _MaterialComponent$de3);

  function ToolbarSection() {
    _classCallCheck(this, ToolbarSection);

    var _this3 = _possibleConstructorReturn(this, _MaterialComponent$de3.call(this));

    _this3.componentName = 'toolbar__section';
    _this3._mdcProps = ['align-start', 'align-end', 'shrink-to-fit'];
    return _this3;
  }

  ToolbarSection.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("section", props, props.children);
  };

  return ToolbarSection;
}(_MaterialComponent.default);
/**
 * @prop menu = false
 */

var ToolbarIcon = function (_MaterialComponent$de4) {
  _inherits(ToolbarIcon, _MaterialComponent$de4);

  function ToolbarIcon(props) {
    _classCallCheck(this, ToolbarIcon);

    var _this4 = _possibleConstructorReturn(this, _MaterialComponent$de4.call(this));

    _this4.componentName = 'toolbar__icon';

    if (props.menu) {
      _this4.componentName = 'toolbar__menu-icon';
    }
    return _this4;
  }

  ToolbarIcon.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("a", _extends({
      className: "material-icons"
    }, props), props.children || 'menu');
  };

  return ToolbarIcon;
}(_MaterialComponent.default);
/**
 * @prop title = ''
 */

var ToolbarTitle = function (_MaterialComponent$de5) {
  _inherits(ToolbarTitle, _MaterialComponent$de5);

  function ToolbarTitle() {
    _classCallCheck(this, ToolbarTitle);

    var _this5 = _possibleConstructorReturn(this, _MaterialComponent$de5.call(this));

    _this5.componentName = 'toolbar__title';
    return _this5;
  }

  ToolbarTitle.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("span", props, props.children);
  };

  return ToolbarTitle;
}(_MaterialComponent.default);

Toolbar.Section = ToolbarSection;
Toolbar.Icon = ToolbarIcon;
Toolbar.Title = ToolbarTitle;
Toolbar.Row = ToolbarRow;
var _default = Toolbar;
exports.default = _default;

/***/ }),

/***/ "vkNc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var util_namespaceObject = {};
__webpack_require__.d(util_namespaceObject, "supportsCssVariables", function() { return supportsCssVariables; });
__webpack_require__.d(util_namespaceObject, "applyPassive", function() { return applyPassive; });
__webpack_require__.d(util_namespaceObject, "getMatchesProperty", function() { return getMatchesProperty; });
__webpack_require__.d(util_namespaceObject, "getNormalizedEventCoords", function() { return getNormalizedEventCoords; });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// CONCATENATED MODULE: ../node_modules/@material/ripple/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    _classCallCheck(this, MDCRippleAdapter);
  }

  /** @return {boolean} */
  MDCRippleAdapter.prototype.browserSupportsCssVars = function browserSupportsCssVars() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isUnbounded = function isUnbounded() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceActive = function isSurfaceActive() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceDisabled = function isSurfaceDisabled() {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.removeClass = function removeClass(className) {};

  /** @param {!EventTarget} target */


  MDCRippleAdapter.prototype.containsEventTarget = function containsEventTarget(target) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerDocumentInteractionHandler = function registerDocumentInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterDocumentInteractionHandler = function deregisterDocumentInteractionHandler(evtType, handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  MDCRippleAdapter.prototype.updateCssVariable = function updateCssVariable(varName, value) {};

  /** @return {!ClientRect} */


  MDCRippleAdapter.prototype.computeBoundingRect = function computeBoundingRect() {};

  /** @return {{x: number, y: number}} */


  MDCRippleAdapter.prototype.getWindowPageOffset = function getWindowPageOffset() {};

  return MDCRippleAdapter;
}();

/* harmony default export */ var adapter = (MDCRippleAdapter);
// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/ripple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
};


// CONCATENATED MODULE: ../node_modules/@material/ripple/util.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
var supportsCssVariables_ = void 0;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var supportsCssVariables = supportsCssVariables_;
  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }
  return supportsCssVariables;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}


// CONCATENATED MODULE: ../node_modules/@material/ripple/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @typedef {{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
var ActivationStateType = void 0;

/**
 * @typedef {{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
var ListenerInfoType = void 0;

/**
 * @typedef {{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
var ListenersType = void 0;

/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }}
 */
var PointType = void 0;

// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
var activatedTargets = [];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var foundation_MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  _createClass(MDCRippleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    foundation__classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    /** @private {function(!Event)} */
    _this.deactivateHandler_ = function (e) {
      return _this.deactivate_(e);
    };

    /** @private {function(?Event=)} */
    _this.focusHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {function(?Event=)} */
    _this.blurHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    _this.previousActivationEvent_ = null;
    return _this;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  MDCRippleFoundation.prototype.isSupported_ = function isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  };

  /**
   * @return {!ActivationStateType}
   */


  MDCRippleFoundation.prototype.defaultActivationState_ = function defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false
    };
  };

  MDCRippleFoundation.prototype.init = function init() {
    var _this2 = this;

    if (!this.isSupported_()) {
      return;
    }
    this.registerRootHandlers_();

    var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$.ROOT,
        UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

    requestAnimationFrame(function () {
      _this2.adapter_.addClass(ROOT);
      if (_this2.adapter_.isUnbounded()) {
        _this2.adapter_.addClass(UNBOUNDED);
        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
        _this2.layoutInternal_();
      }
    });
  };

  MDCRippleFoundation.prototype.destroy = function destroy() {
    var _this3 = this;

    if (!this.isSupported_()) {
      return;
    }

    if (this.activationTimer_) {
      clearTimeout(this.activationTimer_);
      this.activationTimer_ = 0;
      var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

      this.adapter_.removeClass(FG_ACTIVATION);
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();

    var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$2.ROOT,
        UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

    requestAnimationFrame(function () {
      _this3.adapter_.removeClass(ROOT);
      _this3.adapter_.removeClass(UNBOUNDED);
      _this3.removeCssVars_();
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function registerRootHandlers_() {
    var _this4 = this;

    ACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
    });
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.registerResizeHandler(this.resizeHandler_);
    }
  };

  /**
   * @param {!Event} e
   * @private
   */


  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function registerDeactivationHandlers_(e) {
    var _this5 = this;

    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
      });
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function deregisterRootHandlers_() {
    var _this6 = this;

    ACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function deregisterDeactivationHandlers_() {
    var _this7 = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
      _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.removeCssVars_ = function removeCssVars_() {
    var _this8 = this;

    var strings = MDCRippleFoundation.strings;

    Object.keys(strings).forEach(function (k) {
      if (k.indexOf('VAR_') === 0) {
        _this8.adapter_.updateCssVariable(strings[k], null);
      }
    });
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.activate_ = function activate_(e) {
    var _this9 = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

    var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this9.adapter_.containsEventTarget(target);
    });
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push( /** @type {!EventTarget} */e.target);
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          _this9.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this9.activationState_ = _this9.defaultActivationState_();
      }
    });
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.checkElementMadeActive_ = function checkElementMadeActive_(e) {
    return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function activate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.activate_(event);
  };

  /** @private */


  MDCRippleFoundation.prototype.animateActivation_ = function animateActivation_() {
    var _this10 = this;

    var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
    var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
        FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


    this.layoutInternal_();

    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
          startPoint = _getFgTranslationCoor.startPoint,
          endPoint = _getFgTranslationCoor.endPoint;

      translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
      translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this10.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function getFgTranslationCoordinates_() {
    var _activationState_ = this.activationState_,
        activationEvent = _activationState_.activationEvent,
        wasActivatedByPointer = _activationState_.wasActivatedByPointer;


    var startPoint = void 0;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
      /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };

    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };

    return { startPoint: startPoint, endPoint: endPoint };
  };

  /** @private */


  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function runDeactivationUXLogicIfReady_() {
    var _this11 = this;

    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _activationState_2 = this.activationState_,
        hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
        isActivated = _activationState_2.isActivated;

    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this11.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function rmBoundedActivationClasses_() {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function resetActivationState_() {
    var _this12 = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(function () {
      return _this12.previousActivationEvent_ = null;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  /**
   * @param {?Event} e
   * @private
   */


  MDCRippleFoundation.prototype.deactivate_ = function deactivate_(e) {
    var _this13 = this;

    var activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    var state = /** @type {!ActivationStateType} */_extends({}, activationState);

    if (activationState.isProgrammatic) {
      var evtObject = null;
      requestAnimationFrame(function () {
        return _this13.animateDeactivation_(evtObject, state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this13.activationState_.hasDeactivationUXRun = true;
        _this13.animateDeactivation_(e, state);
        _this13.resetActivationState_();
      });
    }
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.deactivate = function deactivate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.deactivate_(event);
  };

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  MDCRippleFoundation.prototype.animateDeactivation_ = function animateDeactivation_(e, _ref) {
    var wasActivatedByPointer = _ref.wasActivatedByPointer,
        wasElementMadeActive = _ref.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layout = function layout() {
    var _this14 = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function () {
      _this14.layoutInternal_();
      _this14.layoutFrame_ = 0;
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.layoutInternal_ = function layoutInternal_() {
    var _this15 = this;

    this.frame_ = this.adapter_.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width);

    // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.
    var getBoundedRadius = function getBoundedRadius() {
      var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;

    this.updateLayoutCssVars_();
  };

  /** @private */


  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function updateLayoutCssVars_() {
    var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
        VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
        VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
        VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };

      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
    }
  };

  /** @param {boolean} unbounded */


  MDCRippleFoundation.prototype.setUnbounded = function setUnbounded(unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  return MDCRippleFoundation;
}(foundation["a" /* default */]);

/* harmony default export */ var ripple_foundation = (foundation_MDCRippleFoundation);
// CONCATENATED MODULE: ../node_modules/@material/ripple/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ripple_MDCRipple; });
/* unused harmony export RippleCapableSurface */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return ripple_foundation; });
/* unused concated harmony import util */
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, false, function() { return util_namespaceObject; });
var ripple__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function ripple__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ripple__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ripple__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

var ripple_MDCRipple = function (_MDCComponent) {
  ripple__inherits(MDCRipple, _MDCComponent);

  /** @param {...?} args */
  function MDCRipple() {
    ripple__classCallCheck(this, MDCRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {boolean} */
    var _this = ripple__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.disabled = false;

    /** @private {boolean} */
    _this.unbounded_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  MDCRipple.attachTo = function attachTo(root) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isUnbounded = _ref.isUnbounded,
        isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

    var ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */isUnbounded;
    }
    return ripple;
  };

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  MDCRipple.createAdapter = function createAdapter(instance) {
    var MATCHES = getMatchesProperty(HTMLElement.prototype);

    return {
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      isUnbounded: function isUnbounded() {
        return instance.unbounded;
      },
      isSurfaceActive: function isSurfaceActive() {
        return instance.root_[MATCHES](':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return instance.disabled;
      },
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      containsEventTarget: function containsEventTarget(target) {
        return instance.root_.contains(target);
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, applyPassive());
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      }
    };
  };

  /** @return {boolean} */


  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */
  MDCRipple.prototype.setUnbounded_ = function setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  };

  MDCRipple.prototype.activate = function activate() {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function layout() {
    this.foundation_.layout();
  };

  /** @return {!MDCRippleFoundation} */


  MDCRipple.prototype.getDefaultFoundation = function getDefaultFoundation() {
    return new ripple_foundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  };

  ripple__createClass(MDCRipple, [{
    key: 'unbounded',
    get: function get() {
      return this.unbounded_;
    }

    /** @param {boolean} unbounded */
    ,
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    }
  }]);

  return MDCRipple;
}(component["a" /* default */]);

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


var RippleCapableSurface = function RippleCapableSurface() {
  ripple__classCallCheck(this, RippleCapableSurface);
};

/** @protected {!Element} */


RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;



/***/ }),

/***/ "xWvN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/index.js
var base = __webpack_require__("dSNL");

// EXTERNAL MODULE: ../node_modules/@material/drawer/slidable/index.js + 2 modules
var slidable = __webpack_require__("VqTd");

// CONCATENATED MODULE: ../node_modules/@material/drawer/persistent/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var cssClasses = {
  ROOT: 'mdc-drawer--persistent',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating'
};

var strings = {
  DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
  FOCUSABLE_ELEMENTS: slidable["a" /* FOCUSABLE_ELEMENTS */],
  OPEN_EVENT: 'MDCPersistentDrawer:open',
  CLOSE_EVENT: 'MDCPersistentDrawer:close'
};
// CONCATENATED MODULE: ../node_modules/@material/drawer/persistent/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var foundation_MDCPersistentDrawerFoundation = function (_MDCSlidableDrawerFou) {
  _inherits(MDCPersistentDrawerFoundation, _MDCSlidableDrawerFou);

  _createClass(MDCPersistentDrawerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return _extends(slidable["b" /* MDCSlidableDrawerFoundation */].defaultAdapter, {
        isDrawer: function isDrawer() {
          return false;
        }
      });
    }
  }]);

  function MDCPersistentDrawerFoundation(adapter) {
    _classCallCheck(this, MDCPersistentDrawerFoundation);

    return _possibleConstructorReturn(this, _MDCSlidableDrawerFou.call(this, _extends(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN));
  }

  MDCPersistentDrawerFoundation.prototype.isRootTransitioningEventTarget_ = function isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  };

  return MDCPersistentDrawerFoundation;
}(slidable["b" /* MDCSlidableDrawerFoundation */]);


// EXTERNAL MODULE: ../node_modules/@material/drawer/util.js
var util = __webpack_require__("rQFk");

// CONCATENATED MODULE: ../node_modules/@material/drawer/persistent/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCPersistentDrawer", function() { return persistent_MDCPersistentDrawer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCPersistentDrawerFoundation", function() { return foundation_MDCPersistentDrawerFoundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "util", function() { return util; });
var persistent__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function persistent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function persistent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function persistent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var persistent_MDCPersistentDrawer = function (_MDCComponent) {
  persistent__inherits(MDCPersistentDrawer, _MDCComponent);

  function MDCPersistentDrawer() {
    persistent__classCallCheck(this, MDCPersistentDrawer);

    return persistent__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCPersistentDrawer.attachTo = function attachTo(root) {
    return new MDCPersistentDrawer(root);
  };

  MDCPersistentDrawer.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    var FOCUSABLE_ELEMENTS = foundation_MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS;


    return new foundation_MDCPersistentDrawerFoundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this2.drawer);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this2.root_.addEventListener(util["remapEvent"](evt), handler, util["applyPassive"]());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this2.root_.removeEventListener(util["remapEvent"](evt), handler, util["applyPassive"]());
      },
      registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.addEventListener(util["remapEvent"](evt), handler);
      },
      deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.removeEventListener(util["remapEvent"](evt), handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        return _this2.root_.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        return _this2.root_.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      getDrawerWidth: function getDrawerWidth() {
        return _this2.drawer.offsetWidth;
      },
      setTranslateX: function setTranslateX(value) {
        return _this2.drawer.style.setProperty(util["getTransformPropertyName"](), value === null ? null : 'translateX(' + value + 'px)');
      },
      getFocusableElements: function getFocusableElements() {
        return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
      },
      saveElementTabState: function saveElementTabState(el) {
        return util["saveElementTabState"](el);
      },
      restoreElementTabState: function restoreElementTabState(el) {
        return util["restoreElementTabState"](el);
      },
      makeElementUntabbable: function makeElementUntabbable(el) {
        return el.setAttribute('tabindex', -1);
      },
      notifyOpen: function notifyOpen() {
        return _this2.emit(foundation_MDCPersistentDrawerFoundation.strings.OPEN_EVENT);
      },
      notifyClose: function notifyClose() {
        return _this2.emit(foundation_MDCPersistentDrawerFoundation.strings.CLOSE_EVENT);
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
      },
      isDrawer: function isDrawer(el) {
        return el === _this2.drawer;
      }
    });
  };

  persistent__createClass(MDCPersistentDrawer, [{
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }

    // Return the drawer element inside the component.

  }, {
    key: 'drawer',
    get: function get() {
      return this.root_.querySelector(foundation_MDCPersistentDrawerFoundation.strings.DRAWER_SELECTOR);
    }
  }]);

  return MDCPersistentDrawer;
}(base["a" /* MDCComponent */]);

/***/ }),

/***/ "xprb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/@material/base/component.js
var component = __webpack_require__("EQDb");

// EXTERNAL MODULE: ../node_modules/@material/base/foundation.js
var base_foundation = __webpack_require__("uJAj");

// CONCATENATED MODULE: ../node_modules/@material/icon-toggle/adapter.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Icon Toggle. Provides an interface for managing
 * - classes
 * - dom
 * - inner text
 * - event handlers
 * - event dispatch
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */

var MDCIconToggleAdapter = function () {
  function MDCIconToggleAdapter() {
    _classCallCheck(this, MDCIconToggleAdapter);
  }

  /** @param {string} className */
  MDCIconToggleAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCIconToggleAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * @param {string} type
   * @param {!EventListener} handler
   */


  MDCIconToggleAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(type, handler) {};

  /**
   * @param {string} type
   * @param {!EventListener} handler
   */


  MDCIconToggleAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(type, handler) {};

  /** @param {string} text */


  MDCIconToggleAdapter.prototype.setText = function setText(text) {};

  /** @return {number} */


  MDCIconToggleAdapter.prototype.getTabIndex = function getTabIndex() {};

  /** @param {number} tabIndex */


  MDCIconToggleAdapter.prototype.setTabIndex = function setTabIndex(tabIndex) {};

  /**
   * @param {string} name
   * @return {string}
   */


  MDCIconToggleAdapter.prototype.getAttr = function getAttr(name) {};

  /**
   * @param {string} name
   * @param {string} value
   */


  MDCIconToggleAdapter.prototype.setAttr = function setAttr(name, value) {};

  /** @param {string} name */


  MDCIconToggleAdapter.prototype.rmAttr = function rmAttr(name) {};

  /** @param {!IconToggleEvent} evtData */


  MDCIconToggleAdapter.prototype.notifyChange = function notifyChange(evtData) {};

  return MDCIconToggleAdapter;
}();

/**
 * @typedef {{
 *   isOn: boolean,
 * }}
 */


var IconToggleEvent = void 0;


// CONCATENATED MODULE: ../node_modules/@material/icon-toggle/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var cssClasses = {
  ROOT: 'mdc-icon-toggle',
  DISABLED: 'mdc-icon-toggle--disabled'
};

/** @enum {string} */
var strings = {
  DATA_TOGGLE_ON: 'data-toggle-on',
  DATA_TOGGLE_OFF: 'data-toggle-off',
  ARIA_PRESSED: 'aria-pressed',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_LABEL: 'aria-label',
  CHANGE_EVENT: 'MDCIconToggle:change'
};


// CONCATENATED MODULE: ../node_modules/@material/icon-toggle/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/* eslint-disable no-unused-vars */



/**
 * @extends {MDCFoundation<!MDCIconToggleAdapter>}
 */

var foundation_MDCIconToggleFoundation = function (_MDCFoundation) {
  _inherits(MDCIconToggleFoundation, _MDCFoundation);

  _createClass(MDCIconToggleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
        setText: function setText() /* text: string */{},
        getTabIndex: function getTabIndex() {
          return (/* number */0
          );
        },
        setTabIndex: function setTabIndex() /* tabIndex: number */{},
        getAttr: function getAttr() {
          return (/* name: string */ /* string */''
          );
        },
        setAttr: function setAttr() /* name: string, value: string */{},
        rmAttr: function rmAttr() /* name: string */{},
        notifyChange: function notifyChange() /* evtData: IconToggleEvent */{}
      };
    }
  }]);

  function MDCIconToggleFoundation(adapter) {
    foundation__classCallCheck(this, MDCIconToggleFoundation);

    /** @private {boolean} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCIconToggleFoundation.defaultAdapter, adapter)));

    _this.on_ = false;

    /** @private {boolean} */
    _this.disabled_ = false;

    /** @private {number} */
    _this.savedTabIndex_ = -1;

    /** @private {?IconToggleState} */
    _this.toggleOnData_ = null;

    /** @private {?IconToggleState} */
    _this.toggleOffData_ = null;

    _this.clickHandler_ = /** @private {!EventListener} */function () {
      return _this.toggleFromEvt_();
    };

    /** @private {boolean} */
    _this.isHandlingKeydown_ = false;

    _this.keydownHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
      if (isSpace(evt)) {
        _this.isHandlingKeydown_ = true;
        return evt.preventDefault();
      }
    };

    _this.keyupHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
      if (isSpace(evt)) {
        _this.isHandlingKeydown_ = false;
        _this.toggleFromEvt_();
      }
    };
    return _this;
  }

  MDCIconToggleFoundation.prototype.init = function init() {
    this.refreshToggleData();
    this.savedTabIndex_ = this.adapter_.getTabIndex();
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
  };

  MDCIconToggleFoundation.prototype.refreshToggleData = function refreshToggleData() {
    var _MDCIconToggleFoundat = MDCIconToggleFoundation.strings,
        DATA_TOGGLE_ON = _MDCIconToggleFoundat.DATA_TOGGLE_ON,
        DATA_TOGGLE_OFF = _MDCIconToggleFoundat.DATA_TOGGLE_OFF;

    this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
    this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
  };

  MDCIconToggleFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
  };

  /** @private */


  MDCIconToggleFoundation.prototype.toggleFromEvt_ = function toggleFromEvt_() {
    this.toggle();
    var isOn = this.on_;

    this.adapter_.notifyChange( /** @type {!IconToggleEvent} */{ isOn: isOn });
  };

  /** @return {boolean} */


  MDCIconToggleFoundation.prototype.isOn = function isOn() {
    return this.on_;
  };

  /** @param {boolean=} isOn */


  MDCIconToggleFoundation.prototype.toggle = function toggle() {
    var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.on_;

    this.on_ = isOn;

    var _MDCIconToggleFoundat2 = MDCIconToggleFoundation.strings,
        ARIA_LABEL = _MDCIconToggleFoundat2.ARIA_LABEL,
        ARIA_PRESSED = _MDCIconToggleFoundat2.ARIA_PRESSED;


    if (this.on_) {
      this.adapter_.setAttr(ARIA_PRESSED, 'true');
    } else {
      this.adapter_.setAttr(ARIA_PRESSED, 'false');
    }

    var _ref = this.on_ ? this.toggleOffData_ : this.toggleOnData_,
        classToRemove = _ref.cssClass;

    if (classToRemove) {
      this.adapter_.removeClass(classToRemove);
    }

    var _ref2 = this.on_ ? this.toggleOnData_ : this.toggleOffData_,
        content = _ref2.content,
        label = _ref2.label,
        cssClass = _ref2.cssClass;

    if (cssClass) {
      this.adapter_.addClass(cssClass);
    }
    if (content) {
      this.adapter_.setText(content);
    }
    if (label) {
      this.adapter_.setAttr(ARIA_LABEL, label);
    }
  };

  /**
   * @param {string} dataAttr
   * @return {!IconToggleState}
   */


  MDCIconToggleFoundation.prototype.parseJsonDataAttr_ = function parseJsonDataAttr_(dataAttr) {
    var val = this.adapter_.getAttr(dataAttr);
    if (!val) {
      return {};
    }
    return (/** @type {!IconToggleState} */JSON.parse(val)
    );
  };

  /** @return {boolean} */


  MDCIconToggleFoundation.prototype.isDisabled = function isDisabled() {
    return this.disabled_;
  };

  /** @param {boolean} isDisabled */


  MDCIconToggleFoundation.prototype.setDisabled = function setDisabled(isDisabled) {
    this.disabled_ = isDisabled;

    var DISABLED = MDCIconToggleFoundation.cssClasses.DISABLED;
    var ARIA_DISABLED = MDCIconToggleFoundation.strings.ARIA_DISABLED;


    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setTabIndex(-1);
      this.adapter_.setAttr(ARIA_DISABLED, 'true');
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.setTabIndex(this.savedTabIndex_);
      this.adapter_.rmAttr(ARIA_DISABLED);
      this.adapter_.removeClass(DISABLED);
    }
  };

  /** @return {boolean} */


  MDCIconToggleFoundation.prototype.isKeyboardActivated = function isKeyboardActivated() {
    return this.isHandlingKeydown_;
  };

  return MDCIconToggleFoundation;
}(base_foundation["a" /* default */]);

/**
 * @typedef {{
 *   key: string,
 *   keyCode: number
 * }}
 */


var KeyboardKey = void 0;

/**
 * @param {!KeyboardKey} keyboardKey
 * @return {boolean}
 */
function isSpace(keyboardKey) {
  return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
}

/** @record */

var IconToggleState = function IconToggleState() {
  foundation__classCallCheck(this, IconToggleState);
};

/**
 * The aria-label value of the icon toggle, or undefined if there is no aria-label.
 * @export {string|undefined}
 */


IconToggleState.prototype.label;

/**
 * The text for the icon toggle, or undefined if there is no text.
 * @export {string|undefined}
 */
IconToggleState.prototype.content;

/**
 * The CSS class to add to the icon toggle, or undefined if there is no CSS class.
 * @export {string|undefined}
 */
IconToggleState.prototype.cssClass;

/* harmony default export */ var icon_toggle_foundation = (foundation_MDCIconToggleFoundation);
// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 4 modules
var ripple = __webpack_require__("vkNc");

// CONCATENATED MODULE: ../node_modules/@material/icon-toggle/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCIconToggle", function() { return icon_toggle_MDCIconToggle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCIconToggleFoundation", function() { return icon_toggle_foundation; });
var icon_toggle__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var icon_toggle__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function icon_toggle__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icon_toggle__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function icon_toggle__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCComponent<!MDCIconToggleFoundation>}
 */

var icon_toggle_MDCIconToggle = function (_MDCComponent) {
  icon_toggle__inherits(MDCIconToggle, _MDCComponent);

  MDCIconToggle.attachTo = function attachTo(root) {
    return new MDCIconToggle(root);
  };

  function MDCIconToggle() {
    icon_toggle__classCallCheck(this, MDCIconToggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {!MDCRipple} */
    var _this = icon_toggle__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.ripple_ = _this.initRipple_();
    return _this;
  }

  /** @return {!Element} */


  /**
   * @return {!MDCRipple}
   * @private
   */
  MDCIconToggle.prototype.initRipple_ = function initRipple_() {
    var _this2 = this;

    var adapter = icon_toggle__extends(ripple["a" /* MDCRipple */].createAdapter(this), {
      isUnbounded: function isUnbounded() {
        return true;
      },
      isSurfaceActive: function isSurfaceActive() {
        return _this2.foundation_.isKeyboardActivated();
      }
    });
    var foundation = new ripple["b" /* MDCRippleFoundation */](adapter);
    return new ripple["a" /* MDCRipple */](this.root_, foundation);
  };

  MDCIconToggle.prototype.destroy = function destroy() {
    this.ripple_.destroy();
    _MDCComponent.prototype.destroy.call(this);
  };

  /** @return {!MDCIconToggleFoundation} */


  MDCIconToggle.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this3 = this;

    return new icon_toggle_foundation({
      addClass: function addClass(className) {
        return _this3.iconEl_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this3.iconEl_.classList.remove(className);
      },
      registerInteractionHandler: function registerInteractionHandler(type, handler) {
        return _this3.root_.addEventListener(type, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
        return _this3.root_.removeEventListener(type, handler);
      },
      setText: function setText(text) {
        return _this3.iconEl_.textContent = text;
      },
      getTabIndex: function getTabIndex() {
        return (/* number */_this3.root_.tabIndex
        );
      },
      setTabIndex: function setTabIndex(tabIndex) {
        return _this3.root_.tabIndex = tabIndex;
      },
      getAttr: function getAttr(name, value) {
        return _this3.root_.getAttribute(name, value);
      },
      setAttr: function setAttr(name, value) {
        return _this3.root_.setAttribute(name, value);
      },
      rmAttr: function rmAttr(name) {
        return _this3.root_.removeAttribute(name);
      },
      notifyChange: function notifyChange(evtData) {
        return _this3.emit(icon_toggle_foundation.strings.CHANGE_EVENT, evtData);
      }
    });
  };

  MDCIconToggle.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.on = this.root_.getAttribute(icon_toggle_foundation.strings.ARIA_PRESSED) === 'true';
    this.disabled = this.root_.getAttribute(icon_toggle_foundation.strings.ARIA_DISABLED) === 'true';
  };

  /** @return {!MDCRipple} */


  MDCIconToggle.prototype.refreshToggleData = function refreshToggleData() {
    this.foundation_.refreshToggleData();
  };

  icon_toggle__createClass(MDCIconToggle, [{
    key: 'iconEl_',
    get: function get() {
      var sel = this.root_.dataset['iconInnerSelector'];

      return sel ?
      /** @type {!Element} */this.root_.querySelector(sel) : this.root_;
    }
  }, {
    key: 'ripple',
    get: function get() {
      return this.ripple_;
    }

    /** @return {boolean} */

  }, {
    key: 'on',
    get: function get() {
      return this.foundation_.isOn();
    }

    /** @param {boolean} isOn */
    ,
    set: function set(isOn) {
      this.foundation_.toggle(isOn);
    }

    /** @return {boolean} */

  }, {
    key: 'disabled',
    get: function get() {
      return this.foundation_.isDisabled();
    }

    /** @param {boolean} isDisabled */
    ,
    set: function set(isDisabled) {
      this.foundation_.setDisabled(isDisabled);
    }
  }]);

  return MDCIconToggle;
}(component["a" /* default */]);



/***/ }),

/***/ "yH7v":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"attending":"attending__1Vw7x","attending_item":"attending_item__Av8wp","attending_title":"attending_title__1uepx","attending_content":"attending_content__11-BM","attending_list":"attending_list__FmHPF"};

/***/ }),

/***/ "ynRT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = __webpack_require__("KM04");

var _MaterialComponent = _interopRequireDefault(__webpack_require__("lhA9"));

var _temporary = __webpack_require__("WvoH");

var _persistent = __webpack_require__("xWvN");

var _List = _interopRequireDefault(__webpack_require__("E7XR"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };return _extends.apply(this, arguments);
}

/**
 * Default props for drawers
 */
var defaultProps = {
  open: false
};

var TemporaryDrawer = function (_MaterialComponent$de) {
  _inherits(TemporaryDrawer, _MaterialComponent$de);

  function TemporaryDrawer() {
    _classCallCheck(this, TemporaryDrawer);

    var _this = _possibleConstructorReturn(this, _MaterialComponent$de.call(this));

    _this.componentName = 'drawer--temporary';
    _this._open = _this._open.bind(_this);
    _this._close = _this._close.bind(_this);
    return _this;
  }

  TemporaryDrawer.prototype._open = function _open(e) {
    if (this.props.onOpen) {
      this.props.onOpen(e);
    }
  };

  TemporaryDrawer.prototype._close = function _close(e) {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
  };

  TemporaryDrawer.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = _temporary.MDCTemporaryDrawer.attachTo(this.control);
    this.MDComponent.listen('MDCTemporaryDrawer:open', this._open);
    this.MDComponent.listen('MDCTemporaryDrawer:close', this._close);
    toggleDrawer(defaultProps, this.props, this.MDComponent);
  };

  TemporaryDrawer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten('MDCTemporaryDrawer:close', this._close);
    this.MDComponent.unlisten('MDCTemporaryDrawer:open', this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  TemporaryDrawer.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    toggleDrawer(this.props, nextProps, this.MDComponent);
  };

  TemporaryDrawer.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("aside", _extends({
      className: "mdc-typography mdc-drawer",
      ref: this.setControlRef
    }, props), (0, _preact.h)("nav", {
      className: "mdc-drawer__drawer"
    }, props.children));
  };

  return TemporaryDrawer;
}(_MaterialComponent.default);
/**
 * @prop spacer = false
 */

var PermanentDrawer = function (_MaterialComponent$de2) {
  _inherits(PermanentDrawer, _MaterialComponent$de2);

  function PermanentDrawer() {
    _classCallCheck(this, PermanentDrawer);

    var _this2 = _possibleConstructorReturn(this, _MaterialComponent$de2.call(this));

    _this2.componentName = 'drawer--permanent';
    return _this2;
  }

  PermanentDrawer.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("nav", _extends({
      className: "mdc-typography mdc-drawer"
    }, props), props.spacer && (0, _preact.h)("div", {
      className: "mdc-drawer__toolbar-spacer"
    }), (0, _preact.h)("div", {
      className: "mdc-drawer__content"
    }, (0, _preact.h)("nav", {
      className: "mdc-list"
    }, props.children)));
  };

  return PermanentDrawer;
}(_MaterialComponent.default);

var PersistentDrawer = function (_MaterialComponent$de3) {
  _inherits(PersistentDrawer, _MaterialComponent$de3);

  function PersistentDrawer() {
    _classCallCheck(this, PersistentDrawer);

    var _this3 = _possibleConstructorReturn(this, _MaterialComponent$de3.call(this));

    _this3.componentName = 'drawer--persistent';
    _this3._open = _this3._open.bind(_this3);
    _this3._close = _this3._close.bind(_this3);
    return _this3;
  }

  PersistentDrawer.prototype._open = function _open(e) {
    if (this.props.onOpen) {
      this.props.onOpen(e);
    }
  };

  PersistentDrawer.prototype._close = function _close(e) {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
  };

  PersistentDrawer.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = _persistent.MDCPersistentDrawer.attachTo(this.control);
    this.MDComponent.listen('MDCPersistentDrawer:open', this._open);
    this.MDComponent.listen('MDCPersistentDrawer:close', this._close);
    toggleDrawer(defaultProps, this.props, this.MDComponent);
  };

  PersistentDrawer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten('MDCPersistentDrawer:close', this._close);
    this.MDComponent.unlisten('MDCPersistentDrawer:open', this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  PersistentDrawer.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    toggleDrawer(this.props, nextProps, this.MDComponent);
  };

  PersistentDrawer.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("aside", _extends({
      className: "mdc-typography mdc-drawer",
      ref: this.setControlRef
    }, props), (0, _preact.h)("nav", {
      className: "mdc-drawer__drawer"
    }, props.children));
  };

  return PersistentDrawer;
}(_MaterialComponent.default);

var DrawerHeader = function (_MaterialComponent$de4) {
  _inherits(DrawerHeader, _MaterialComponent$de4);

  function DrawerHeader() {
    _classCallCheck(this, DrawerHeader);

    var _this4 = _possibleConstructorReturn(this, _MaterialComponent$de4.call(this));

    _this4.componentName = 'drawer__header';
    return _this4;
  }

  DrawerHeader.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("header", _extends({
      ref: this.setControlRef
    }, props), (0, _preact.h)("div", {
      className: "mdc-drawer__header-content"
    }, props.children));
  };

  return DrawerHeader;
}(_MaterialComponent.default);

var DrawerContent = function (_MaterialComponent$de5) {
  _inherits(DrawerContent, _MaterialComponent$de5);

  function DrawerContent() {
    _classCallCheck(this, DrawerContent);

    var _this5 = _possibleConstructorReturn(this, _MaterialComponent$de5.call(this));

    _this5.componentName = 'drawer__content';
    return _this5;
  }

  DrawerContent.prototype.materialDom = function materialDom(props) {
    return (0, _preact.h)("nav", _extends({
      className: "mdc-list",
      ref: this.setControlRef
    }, props), props.children);
  };

  return DrawerContent;
}(_MaterialComponent.default);
/**
 * @prop selected = false
 */

var DrawerItem = function (_List$default$LinkIte) {
  _inherits(DrawerItem, _List$default$LinkIte);

  function DrawerItem() {
    _classCallCheck(this, DrawerItem);

    return _possibleConstructorReturn(this, _List$default$LinkIte.call(this));
  }

  DrawerItem.prototype.materialDom = function materialDom(props) {
    var returnedNode = _List$default$LinkIte.prototype.materialDom.call(this, props);
    /* Logic to add selected class */

    if (props.selected) {
      returnedNode.attributes['className'] = 'mdc-list-item--activated';
    }

    return returnedNode;
  };

  return DrawerItem;
}(_List.default.LinkItem);
/**
 * Function to add declarative opening/closing to drawer
 */

function toggleDrawer(oldprops, newprops, drawer) {
  if ('open' in oldprops && 'open' in newprops && oldprops.open !== newprops.open) {
    drawer.open = newprops.open;
  }
}

var Drawer = {};
Drawer.DrawerItem = DrawerItem;
Drawer.TemporaryDrawer = TemporaryDrawer;
Drawer.DrawerHeader = DrawerHeader;
Drawer.DrawerContent = DrawerContent;
Drawer.PermanentDrawer = PermanentDrawer;
Drawer.PersistentDrawer = PersistentDrawer;
var _default = Drawer;
exports.default = _default;

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map