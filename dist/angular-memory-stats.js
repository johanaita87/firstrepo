/**
 * angular-memory-stats - Angular Memory Stats displays your app memory activity
 * @version v1.0.0-rc4
 * @author shprink <contact@julienrenaux.fr>
 * @link https://github.com/livingobjects/angular-memory-stats
 * @license MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var MemoryStats, RequestAnimationFrame, module;

	MemoryStats = __webpack_require__(1);

	RequestAnimationFrame = __webpack_require__(2);

	module.exports = module = angular.module('angular-memory-stats', []);

	module.provider('angularMemoryStats', function() {
	  var $get, cornersAvailable, defaultOptions, enable, setCorner, setCss, setPosition, setZIndex;
	  cornersAvailable = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
	  defaultOptions = {
	    isEnabled: true,
	    zIndex: 9999,
	    position: 'fixed',
	    corner: 'bottomRight',
	    css: null
	  };
	  this.isEnabled = defaultOptions.isEnabled;
	  this.zIndex = defaultOptions.zIndex;
	  this.position = defaultOptions.position;
	  this.corner = defaultOptions.corner;
	  this.css = defaultOptions.css;
	  enable = (function(_this) {
	    return function(enable) {
	      if (enable == null) {
	        enable = true;
	      }
	      return _this.isEnabled = enable;
	    };
	  })(this);
	  setZIndex = (function(_this) {
	    return function(zIndex) {
	      if (zIndex) {
	        return _this.zIndex = zIndex;
	      }
	    };
	  })(this);
	  setPosition = (function(_this) {
	    return function(position) {
	      if (position) {
	        return _this.position = position;
	      }
	    };
	  })(this);
	  setCorner = (function(_this) {
	    return function(corner) {
	      if (corner && cornersAvailable.indexOf(corner) > -1) {
	        return _this.corner = corner;
	      }
	    };
	  })(this);
	  setCss = (function(_this) {
	    return function(css) {
	      if (css) {
	        return _this.css = css;
	      }
	    };
	  })(this);
	  $get = (function(_this) {
	    return function() {
	      return {
	        isEnabled: function() {
	          return _this.isEnabled;
	        },
	        getCss: function() {
	          var corner, css;
	          if (_this.css) {
	            return _this.css;
	          }
	          css = {
	            position: _this.position,
	            zIndex: _this.zIndex
	          };
	          corner = _this.corner;
	          if (["topLeft", "topRight", "bottomLeft", "bottomRight"].indexOf(corner) === -1) {
	            corner = defaultOptions.corner;
	          }
	          switch (corner) {
	            case "topLeft":
	              css.top = '5px';
	              css.left = '5px';
	              break;
	            case "topRight":
	              css.top = '5px';
	              css.right = '5px';
	              break;
	            case "bottomLeft":
	              css.bottom = '5px';
	              css.left = '5px';
	              break;
	            case "bottomRight":
	              css.bottom = '5px';
	              css.right = '5px';
	          }
	          return css;
	        }
	      };
	    };
	  })(this);
	  return {
	    enable: enable,
	    setZIndex: setZIndex,
	    setPosition: setPosition,
	    setCorner: setCorner,
	    setCss: setCss,
	    $get: $get
	  };
	});

	module.directive('angularMemoryStats', function() {
	  return {
	    restrict: 'E',
	    scope: false,
	    controller: ["$scope", "$element", "angularMemoryStats", function($scope, $element, angularMemoryStats) {
	      var stats, update;
	      if (!angularMemoryStats.isEnabled()) {
	        return;
	      }
	      stats = new MemoryStats();
	      $element.css(angularMemoryStats.getCss());
	      $element.append(stats.domElement);
	      update = function() {
	        stats.update();
	        return RequestAnimationFrame(update);
	      };
	      return RequestAnimationFrame(update);
	    }]
	  };
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author mrdoob / http://mrdoob.com/
	 * @author jetienne / http://jetienne.com/
	 * @author paulirish / http://paulirish.com/
	 */
	module.exports = function () {

	    var msMin = 100;
	    var msMax = 0;

	    var container = document.createElement('div');
	    container.id = 'stats';
	    container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	    var msDiv = document.createElement('div');
	    msDiv.id = 'ms';
	    msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;';
	    container.appendChild(msDiv);

	    var msText = document.createElement('div');
	    msText.id = 'msText';
	    msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	    msText.innerHTML = 'Memory';
	    msDiv.appendChild(msText);

	    var msGraph = document.createElement('div');
	    msGraph.id = 'msGraph';
	    msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
	    msDiv.appendChild(msGraph);

	    while (msGraph.children.length < 74) {

	        var bar = document.createElement('span');
	        bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
	        msGraph.appendChild(bar);

	    }

	    var updateGraph = function (dom, height, color) {

	        var child = dom.appendChild(dom.firstChild);
	        child.style.height = height + 'px';
	        if (color) child.style.backgroundColor = color;

	    }

	    // polyfill usedJSHeapSize
	    if (window.performance && !performance.memory) {
	        performance.memory = {
	            usedJSHeapSize: 0
	        };
	    }

	    // support of the API?
	    if (performance.memory.totalJSHeapSize === 0) {
	        console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .')
	    }

	    // TODO, add a sanity check to see if values are bucketed.
	    // If so, reminde user to adopt the --enable-precise-memory-info flag.
	    // open -a "/Applications/Google Chrome.app" --args --enable-precise-memory-info

	    var lastTime = Date.now();
	    var lastUsedHeap = performance.memory.usedJSHeapSize;
	    return {
	        domElement: container,

	        update: function () {

	            // refresh only 30time per second
	            if (Date.now() - lastTime < 1000 / 30) return;
	            lastTime = Date.now()

	            var delta = performance.memory.usedJSHeapSize - lastUsedHeap;
	            lastUsedHeap = performance.memory.usedJSHeapSize;
	            var color = delta < 0 ? '#830' : '#131';

	            var ms = performance.memory.usedJSHeapSize;
	            msMin = Math.min(msMin, ms);
	            msMax = Math.max(msMax, ms);
	            msText.textContent = "Mem: " + bytesToSize(ms, 2);

	            var normValue = ms / (30 * 1024 * 1024);
	            var height = Math.min(30, 30 - normValue * 30);
	            updateGraph(msGraph, height, color);

	            function bytesToSize(bytes, nFractDigit) {
	                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	                if (bytes == 0) return 'n/a';
	                nFractDigit = nFractDigit !== undefined ? nFractDigit : 0;
	                var precision = Math.pow(10, nFractDigit);
	                var i = Math.floor(Math.log(bytes) / Math.log(1024));
	                return Math.round(bytes * precision / Math.pow(1024, i)) / precision + ' ' + sizes[i];
	            };
	        }

	    }

	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * requestAnimationFrame version: "0.0.17" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://github.com/cagosta/requestAnimationFrame for details
	 *
	 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 * MIT license
	 *
	 */


	( function( global ) {


	    ( function() {


	        if ( global.requestAnimationFrame ) {

	            return;

	        }

	        if ( global.webkitRequestAnimationFrame ) { // Chrome <= 23, Safari <= 6.1, Blackberry 10

	            global.requestAnimationFrame = global[ 'webkitRequestAnimationFrame' ];
	            global.cancelAnimationFrame = global[ 'webkitCancelAnimationFrame' ] || global[ 'webkitCancelRequestAnimationFrame' ];

	        }

	        // IE <= 9, Android <= 4.3, very old/rare browsers

	        var lastTime = 0;

	        global.requestAnimationFrame = function( callback ) {

	            var currTime = new Date().getTime();

	            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );

	            var id = global.setTimeout( function() {

	                callback( currTime + timeToCall );

	            }, timeToCall );

	            lastTime = currTime + timeToCall;

	            return id; // return the id for cancellation capabilities

	        };

	        global.cancelAnimationFrame = function( id ) {

	            clearTimeout( id );

	        };

	    } )();

	    if ( true ) {

	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

	            return global.requestAnimationFrame;

	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    }

	} )( window );

/***/ }
/******/ ])