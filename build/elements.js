(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	angular.module('osElements', ['ngMaterial']);
	var button_component_1 = __webpack_require__(6);
	exports.OsButton = button_component_1.OsButton;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var OsButton = (function () {
	    function OsButton($element) {
	        $element.on('click', function (e) {
	            if ($element.attr('disabled') === 'disabled') {
	                e.preventDefault();
	                e.stopImmediatePropagation();
	            }
	        });
	        var mdButton = $element.children('md-button');
	        if (this.colour) {
	            mdButton.addClass('md-' + this.colour);
	        }
	        if (this.variation) {
	            mdButton.addClass('md-' + this.variation);
	        }
	        if (this.disabled) {
	            mdButton.attr('disabled', 'disabled');
	        }
	    }
	    OsButton.prototype.getColour = function (type) {
	        switch (type) {
	            case 'primary':
	                return 'mdl-button--colored';
	                break;
	            case 'accent':
	                return 'mdl-button--accent';
	                break;
	            default:
	                return 'mdl-button--colored';
	        }
	    };
	    OsButton.$inject = ['$element'];
	    return OsButton;
	})();
	exports.OsButton = OsButton;
	angular
	    .module('osElements')
	    .component('osButton', {
	    bindings: {
	        disabled: '=ngDisabled',
	        colour: '@',
	        variation: '@'
	    },
	    controller: OsButton,
	    controllerAs: 'osButton',
	    transclude: true,
	    template: "\n            <md-button ng-disabled=\"osButton.disabled\"><ng-transclude></ng-transclude></md-button>\n        "
	});


/***/ }
/******/ ])
});
;