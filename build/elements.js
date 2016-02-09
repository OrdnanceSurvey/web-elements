(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("openlayers"), require("proj4"));
	else if(typeof define === 'function' && define.amd)
		define(["openlayers", "proj4"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("openlayers"), require("proj4")) : factory(root["ol"], root["proj4"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_23__) {
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

	angular.module('osElements', ['ngMaterial']).config(function ($mdThemingProvider, $mdIconProvider) {
	    this.$inject = ['$mdThemingProvider', '$mdIconProvider'];
	    $mdThemingProvider.definePalette('solutions-blue', $mdThemingProvider.extendPalette('indigo', {
	        '500': '0099CE'
	    }));
	    $mdThemingProvider.definePalette('creative-green', $mdThemingProvider.extendPalette('green', {
	        'A200': 'AECC53'
	    }));
	    $mdThemingProvider.definePalette('rubine-red', $mdThemingProvider.extendPalette('red', {
	        '500': 'D40058'
	    }));
	    $mdThemingProvider.theme('os').primaryPalette('solutions-blue').accentPalette('creative-green').warnPalette('rubine-red');
	    $mdThemingProvider.setDefaultTheme('os');
	    $mdIconProvider.defaultFontSet('material-icons');
	});
	var button_component_1 = __webpack_require__(6);
	exports.OsButton = button_component_1.OsButton;
	var select_1 = __webpack_require__(7);
	exports.OsSelect = select_1.OsSelect;
	var tabs_1 = __webpack_require__(8);
	exports.OsTabs = tabs_1.OsTabs;
	var tab_1 = __webpack_require__(9);
	exports.OsTab = tab_1.OsTab;
	var popup_1 = __webpack_require__(10);
	exports.OsPopover = popup_1.OsPopover;
	var modal_1 = __webpack_require__(12);
	exports.OsModal = modal_1.OsModal;
	var autocomplete_1 = __webpack_require__(15);
	exports.OsAutocomplete = autocomplete_1.OsAutocomplete;
	var drawing_tools_1 = __webpack_require__(16);
	exports.PolygonTool = drawing_tools_1.PolygonTool;
	var map_1 = __webpack_require__(20);
	exports.MaxSize = map_1.MaxSize;
	var toolbar_1 = __webpack_require__(24);
	exports.OsToolbar = toolbar_1.OsToolbar;
	var slider_1 = __webpack_require__(29);
	exports.OsSlider = slider_1.OsSlider;
	var header_1 = __webpack_require__(32);
	exports.OsHeader = header_1.OsHeader;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var OsButton = (function () {
	    function OsButton($element) {
	        var _this = this;
	        $element.on('click', function (e) {
	            if ($element.attr('disabled') === 'disabled') {
	                e.preventDefault();
	                e.stopImmediatePropagation();
	            }
	        });
	        var mdButton = $element.children('md-button');
	        this.makeClass = function () {
	            var classes = [];
	            switch (_this.variation) {
	                case 'solid':
	                    classes.push('md-raised');
	                    break;
	                case 'outline':
	                    classes.push('md-os-outline');
	                    break;
	                case 'super':
	                    classes.push('md-raised');
	                    classes.push('md-os-super');
	                    break;
	                case 'text':
	                default:
	                    break;
	            }
	            if (_this.colour) {
	                classes.push('md-' + _this.colour);
	            }
	            return classes.join(' ');
	        };
	        mdButton.addClass(this.makeClass());
	        if (this.disabled) {
	            mdButton.attr('disabled', 'disabled');
	        }
	    }
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	var OsSelect = (function () {
	    function OsSelect($element) {
	        console.log('OsSelect constructor');
	    }
	    OsSelect.$inject = ['$element'];
	    return OsSelect;
	})();
	exports.OsSelect = OsSelect;
	angular
	    .module('osElements')
	    .component('osSelect', {
	    bindings: {
	        disabled: '=ngDisabled',
	        ngModel: '=',
	        osItems: '=',
	        placeholder: '@'
	    },
	    controller: OsSelect,
	    controllerAs: 'osSelect',
	    transclude: false,
	    template: "\n            <md-select ng-disabled=\"osSelect.disabled\" ng-model=\"osSelect.ngModel\" placeholder=\"{{ osSelect.placeholder }}\">\n                <md-option ng-value=\"option\" ng-repeat=\"option in osSelect.osItems\">{{ option }}</md-option>\n            </md-select>\n        "
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	var OsTabs = (function () {
	    function OsTabs($element, $transclude) {
	        this.$transclude = $transclude;
	        this.mdDynamicHeight = true;
	    }
	    OsTabs.$inject = ['$element', '$transclude'];
	    return OsTabs;
	})();
	exports.OsTabs = OsTabs;
	angular
	    .module('osElements')
	    .directive('osTabsTransclude', function () {
	    return {
	        require: '^osTabs',
	        link: function ($scope, $element, $attrs, fieldCtrl) {
	            fieldCtrl.$transclude(function (clone) {
	                $element.empty();
	                $element.append(clone);
	            });
	        }
	    };
	})
	    .component('osTabs', {
	    bindings: {
	        mdDynamicHeight: '=',
	    },
	    controller: OsTabs,
	    controllerAs: 'osTabs',
	    transclude: true,
	    template: "\n           <md-tabs md-dynamic-height=\"{{ osTabs.mdDynamicHeight }}\">\n                <div os-tabs-transclude></div>\n           </md-tabs>\n        "
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	var OsTab = (function () {
	    function OsTab($element, $transclude) {
	        this.$osTabTransclude = $transclude;
	    }
	    OsTab.$inject = ['$element', '$transclude'];
	    return OsTab;
	})();
	exports.OsTab = OsTab;
	angular
	    .module('osElements')
	    .directive('osTabTransclude', function () {
	    return {
	        require: '^osTabs',
	        link: function ($scope, $element, $attrs, fieldCtrl) {
	            $scope.osTab.$osTabTransclude(function (clone) {
	                $element.empty();
	                $element.append(clone);
	            });
	        }
	    };
	})
	    .component('osTab', {
	    bindings: {
	        label: '@',
	        disabled: '='
	    },
	    controller: OsTab,
	    controllerAs: 'osTab',
	    transclude: true,
	    template: "\n           <md-tab label=\"{{osTab.label}}\" disabled=\"{{ osTabs.disabled }}\">\n                {{ osTabs.disabled | json }}\n                <div os-tab-transclude=\"\"></div>\n           </md-tab>\n        "
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var OsPopover = (function () {
	    function OsPopover($element, $transclude, $mdUtil, $window) {
	        this.$element = $element;
	        this.$transclude = $transclude;
	        this.$mdUtil = $mdUtil;
	        this.visible = false;
	        this.tooltipParent = angular.element(document.body);
	        this.postLink();
	        this.tooltipParent.append($element);
	    }
	    OsPopover.prototype.postLink = function () {
	        this.parent = this.$mdUtil.getParentWithPointerEvents(this.$element);
	        if (this.autoshow) {
	            this.parent.on('focus mouseenter touchstart', this.enterHandler.bind(this));
	        }
	    };
	    OsPopover.prototype.setParent = function (element) {
	        this.parent = angular.element(element);
	        if (this.autoshow) {
	            this.parent.on('focus mouseenter touchstart', this.enterHandler.bind(this));
	        }
	    };
	    OsPopover.prototype.enterHandler = function () {
	        this.show();
	    };
	    OsPopover.prototype.toggleVisibility = function (visible) {
	        this.visible = visible;
	        this.visible ? this.show() : this.hide();
	    };
	    OsPopover.prototype.show = function () {
	        this.visible = true;
	        this.$element.css('display', 'block');
	        this.positionTooltip();
	    };
	    OsPopover.prototype.hide = function () {
	        this.visible = false;
	        this.$element.css('display', 'none');
	    };
	    OsPopover.prototype.updatePosition = function (pos) {
	        this.$element.css({
	            left: pos.left + 'px',
	            top: pos.top + 'px'
	        });
	    };
	    OsPopover.prototype.getPosition = function (dir) {
	        return dir === 'left'
	            ? {
	                left: this.parentRect.left - this.tipRect.width - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE,
	                top: this.parentRect.top + this.parentRect.height / 2 - this.tipRect.height / 2
	            }
	            : dir === 'right'
	                ? {
	                    left: this.parentRect.left + this.parentRect.width + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE,
	                    top: this.parentRect.top + this.parentRect.height / 2 - this.tipRect.height / 2
	                }
	                : dir === 'top'
	                    ? {
	                        left: this.parentRect.left + this.parentRect.width / 2 - this.tipRect.width / 2,
	                        top: this.parentRect.top - this.tipRect.height - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE
	                    }
	                    : {
	                        left: this.parentRect.left + this.parentRect.width / 2 - this.tipRect.width / 2,
	                        top: this.parentRect.top + this.parentRect.height + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE
	                    };
	    };
	    OsPopover.prototype.fitInParent = function (pos) {
	        var newPosition = { left: pos.left, top: pos.top };
	        newPosition.left = Math.max(newPosition.left, OsPopover.TOOLTIP_WINDOW_EDGE_SPACE);
	        if (document.documentElement.clientWidth < newPosition.left + this.tipRect.width + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE) {
	            newPosition.left = document.documentElement.clientWidth - this.tipRect.width - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE;
	        }
	        newPosition.top = Math.max(newPosition.top, OsPopover.TOOLTIP_WINDOW_EDGE_SPACE);
	        if (document.documentElement.clientHeight < newPosition.top + this.tipRect.height + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE) {
	            newPosition.top = document.documentElement.clientHeight - this.tipRect.height - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE;
	        }
	        return newPosition;
	    };
	    OsPopover.prototype.positionTooltip = function () {
	        this.tipRect = this.$mdUtil.offsetRect(this.$element, this.parent);
	        this.parentRect = this.$mdUtil.offsetRect(this.parent, this.tooltipParent);
	        var newPosition = this.getPosition(this.osDirection);
	        var offsetParent = this.$element.prop('offsetParent');
	        if (this.osDirection) {
	            newPosition = this.fitInParent(newPosition);
	        }
	        else if (offsetParent && newPosition.top > offsetParent.scrollHeight - this.tipRect.height - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE) {
	            newPosition = this.fitInParent(this.getPosition('top'));
	        }
	        this.updatePosition(newPosition);
	    };
	    OsPopover.prototype.isWide = function () {
	        return this.type === 'wide';
	    };
	    OsPopover.$inject = ['$element', '$transclude', '$mdUtil', '$window'];
	    OsPopover.TOOLTIP_WINDOW_EDGE_SPACE = 8;
	    return OsPopover;
	})();
	exports.OsPopover = OsPopover;
	var PopupManager = (function () {
	    function PopupManager() {
	        this.popups = {};
	    }
	    PopupManager.prototype.$get = function () {
	        var _this = this;
	        return {
	            popup: function (id) {
	                return _this.popups[id] || {};
	            },
	            register: function (id, ctrl) {
	                _this.popups[id] = ctrl;
	            },
	            deregister: function (id) {
	                _this.popups[id] = null;
	                delete _this.popups[id];
	            }
	        };
	    };
	    return PopupManager;
	})();
	angular
	    .module('osElements')
	    .directive('osPopoverBackground', function () {
	    return {
	        restrict: 'A',
	        scope: {
	            osPopoverBackground: '='
	        },
	        link: function (scope, element, attr) {
	            scope.$watch('osPopoverBackground', function (image) {
	                if (!image) {
	                    return;
	                }
	                element.css({
	                    'background-image': 'url(' + image + ')',
	                    'background-size': 'cover'
	                });
	            });
	        }
	    };
	})
	    .provider("$osPopupManager", PopupManager)
	    .factory('$osPopover', ['$osPopupManager', '$rootScope', '$compile', function ($osPopupManager, $rootScope, $compile) {
	        var _this = this;
	        return {
	            create: function (options) {
	                var scope = $rootScope.$new();
	                angular.extend(scope, options.scope);
	                var comp = _this.compilePopup(options, scope);
	                angular.element(document.body).append(angular.element(comp));
	                scope.$apply();
	                var ctrl = _this.getPopupByHandle(scope.$id);
	                ctrl.setParent(options.parent);
	                return scope.$id;
	            },
	            prepareTemplates: function (options) {
	                return '<os-popover class="os-popover" os-direction="' + (options.direction || 'top') + '"> \
	          <os-popover-title>' + (options.title || '') + '</os-popover-title> \
	          <os-popover-subtitle>' + (options.subtitle || '') + '</os-popover-subtitle> \
	          <os-popover-description>' + (options.description || '') + '</os-popover-description> \
	          <os-popover-actions>' + (options.actions || '') + '</os-popover-actions> \
	          <os-popover-main-image>' + (options.mainImage || '') + '</os-popover-main-image> \
	          <os-popover-left-image>' + (options.leftImage || '') + '</os-popover-left-image> \
	          <os-popover-background-image>' + (options.backgroundImage || '') + '</os-popover-background-image> \
	          <os-popover-actions>' + (options.actions || '') + '</os-popover-actions> \
	          </os-popover>';
	            },
	            compilePopup: function (options, scope) {
	                var templates = _this.prepareTemplates(options);
	                return $compile(templates)(scope);
	            },
	            getPopupByHandle: function (handle) {
	                return $osPopupManager.popup(handle);
	            },
	            show: function (handle) {
	                var elem = _this.getPopupByHandle(handle);
	                elem.toggleVisibility(true);
	            },
	            hide: function (handle) {
	                var elem = _this.getPopupByHandle(handle);
	                elem.toggleVisibility(false);
	            },
	        };
	    }])
	    .directive('osPopover', ['$osPopupManager', function ($osPopupManager) {
	        return {
	            scope: {
	                osDirection: '@?',
	                width: '@?osWidth',
	                height: '@?osHeight',
	                autoshow: '=?osAutoshow',
	                type: '@?osType',
	                visible: '=?osVisible',
	            },
	            controller: OsPopover,
	            controllerAs: 'osPopover',
	            bindToController: true,
	            transclude: true,
	            template: __webpack_require__(11),
	            link: function (scope, element, attr, ctrl) {
	                ctrl.title = element.find('os-popover-title').text();
	                ctrl.subTitle = element.find('os-popover-subtitle').text();
	                ctrl.mainImage = element.find('os-popover-main-image').text();
	                ctrl.leftImage = element.find('os-popover-left-image').text();
	                ctrl.backgroundImage = element.find('os-popover-background-image').text();
	                ctrl.description = element.find('os-popover-description').text();
	                ctrl.actions = element.find('os-popover-actions').detach();
	                angular.element(element[0].getElementsByClassName('transclude-content')[0]).remove();
	                angular.element(element[0].getElementsByClassName('os-popover-content')).append(ctrl.actions);
	                scope.$watch('osPopover.visible', function (visible) {
	                    ctrl.toggleVisibility(visible);
	                });
	                scope.$on("$destroy", function () {
	                    $osPopupManager.deregister(scope.$parent.$id);
	                });
	                $osPopupManager.register(scope.$parent.$id, ctrl);
	            }
	        };
	    }]);


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div ng-transclude=\"ng-transclude\" class=\"transclude-content\"></div><md-icon ng-click=\"osPopover.hide()\" class=\"os-popover-closeIcon\">clear</md-icon><div layout=\"row\" os-popover-background=\"osPopover.backgroundImage\" ng-class=\"{'m-os-popover-wide': osPopover.isWide()}\" ng-style=\"{width: osPopover.width, height: osPopover.height, 'max-width': osPopover.width, 'max-height': osPopover.height}\" class=\"os-popover-container\"><div flex=\"flex\" ng-if=\"osPopover.leftImage\" class=\"os-popover-leftImage\"><img ng-src=\"{{ osPopover.leftImage }}\" width=\"142\" height=\"234\"/></div><div flex=\"flex\"><img ng-if=\"osPopover.mainImage\" ng-src=\"{{ osPopover.mainImage }}\"/><div flex=\"flex\" ng-if=\"osPopover.title || osPopover.subTitle || osPopover.description || osPopover.actions\" class=\"os-popover-content\"><h1 ng-if=\"osPopover.title\" class=\"os-popover-header\">{{ osPopover.title }}</h1><h2 ng-if=\"osPopover.subTitle\" class=\"os-popover-subheader\">{{ osPopover.subTitle }}</h2><p ng-if=\"osPopover.description\" class=\"os-popover-description\">{{ osPopover.description }}</p></div></div></div>"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var osModal_1 = __webpack_require__(13);
	exports.OsModal = osModal_1.OsModal;
	var osModal_2 = __webpack_require__(13);
	angular
	    .module('osElements')
	    .provider('$OsModal', osModal_2.OsModal);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var OsModalService = (function () {
	    function OsModalService($mdDialog, $mdMedia) {
	        this.$mdDialog = $mdDialog;
	        this.$mdMedia = $mdMedia;
	    }
	    OsModalService.prototype.getDefaultOptions = function (options) {
	        return {
	            title: options.title || '',
	            textContent: options.textContent || '',
	            template: __webpack_require__(14),
	            ok: options.ok || 'OK',
	            cancel: options.cancel || 'Cancel',
	            fullscreen: this.isFullScreen()
	        };
	    };
	    OsModalService.prototype.alert = function (options, display) {
	        if (display === void 0) { display = true; }
	        var params = this.getDefaultOptions(options);
	        var modal = this.$mdDialog.alert(params);
	        return display ? this.$mdDialog.show(modal) : modal;
	    };
	    OsModalService.prototype.confirm = function (options, display) {
	        if (display === void 0) { display = true; }
	        var params = this.getDefaultOptions(options);
	        var modal = this.$mdDialog.confirm(params);
	        return display ? this.$mdDialog.show(modal) : modal;
	    };
	    OsModalService.prototype.html = function (options, display) {
	        if (display === void 0) { display = true; }
	        var params = this.getDefaultOptions(options);
	        if (options.controller) {
	            params.controller = options.controller;
	        }
	        if (options.templateUrl) {
	            params.templateUrl = options.templateUrl;
	        }
	        else if (options.template) {
	            params.template = options.template;
	        }
	        return this.$mdDialog.show(params);
	    };
	    OsModalService.prototype.show = function (dialog) {
	        return this.$mdDialog.show(dialog);
	    };
	    OsModalService.prototype.isFullScreen = function () {
	        return true;
	    };
	    return OsModalService;
	})();
	exports.OsModalService = OsModalService;
	var OsModal = (function () {
	    function OsModal() {
	        this.$get = ['$mdDialog', '$mdMedia', function ($mdDialog, $mdMedia) {
	                return new OsModalService($mdDialog, $mdMedia);
	            }];
	    }
	    return OsModal;
	})();
	exports.OsModal = OsModal;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<md-dialog md-theme=\"{{ dialog.theme }}\" aria-label=\"{{ dialog.ariaLabel }}\" ng-class=\"dialog.css\">\n  <md-dialog-content class=\"md-dialog-content\" role=\"document\" tabIndex=\"-1\" layout-align=\"center\">\n    <h2 class=\"md-title\">{{ dialog.title}}</h2>\n\n    <div ng-if=\"::dialog.mdHtmlContent\" class=\"md-dialog-content-body\" ng-bind-html=\"::dialog.mdHtmlContent\"></div>\n    <div ng-if=\"::!dialog.mdHtmlContent\" class=\"md-dialog-content-body\"><p class=\"os-modal-content-text\">{{::dialog.mdTextContent}}</p></div>\n  </md-dialog-content>\n\n  <md-dialog-actions layout=\"column\">\n\n    <os-button ng-click=\"dialog.hide()\" colour=\"primary\" variation=\"solid\" md-autofocus=\"dialog.$type!='confirm'\">{{ dialog.ok }}</os-button>\n\n    <os-button ng-if=\"dialog.$type == 'confirm'\" ng-click=\"dialog.abort()\" colour=\"primary\" variation=\"text\">{{ dialog.cancel }}</os-button>\n\n  </md-dialog-actions>\n\n</md-dialog>\n";

/***/ },
/* 15 */
/***/ function(module, exports) {

	var OsAutocomplete = (function () {
	    function OsAutocomplete($scope, $element) {
	        this.$scope = $scope;
	        this.$element = $element;
	        this.scope = $scope;
	        this.parent = $scope.$parent;
	    }
	    OsAutocomplete.prototype.fetchResults = function () {
	        return this.parent.$eval(this.itemNames);
	    };
	    OsAutocomplete.$inject = ['$scope', '$element'];
	    return OsAutocomplete;
	})();
	exports.OsAutocomplete = OsAutocomplete;
	angular
	    .module('osElements')
	    .directive('osSyncScope', function ($compile) {
	    return {
	        restrict: 'AE',
	        compile: compile,
	        terminal: true,
	        transclude: 'element'
	    };
	    function compile(tElement, tAttr, transclude) {
	        return function postLink(scope, element, attr) {
	            var ctrl = scope.osAutocomplete;
	            var newScope = ctrl.parent.$new();
	            transclude(newScope, function (clone) {
	                element.after(clone);
	            });
	            connectScopes();
	            function connectScopes() {
	                var scopeDigesting = false;
	                var newScopeDigesting = false;
	                scope.$watch(function () {
	                    if (newScopeDigesting || scopeDigesting) {
	                        return;
	                    }
	                    scopeDigesting = true;
	                    scope.$$postDigest(function () {
	                        if (!newScopeDigesting) {
	                            newScope.$digest();
	                        }
	                        scopeDigesting = newScopeDigesting = false;
	                    });
	                });
	                newScope.$watch(function () {
	                    newScopeDigesting = true;
	                });
	            }
	        };
	    }
	})
	    .directive('osAutocomplete', function () {
	    return {
	        scope: {
	            placeholder: '@',
	            disabled: '=?ngDisabled',
	            minLength: '=?',
	            noCache: '=?',
	            selectedItem: '=?',
	            itemNames: '@osItems',
	            searchText: '=?osSearchText'
	        },
	        controller: OsAutocomplete,
	        controllerAs: 'osAutocomplete',
	        bindToController: true,
	        template: function (element, attr) {
	            var notFound = element.find('os-autocomplete-no-found').detach();
	            var result = element.find('os-autocomplete-item-template').detach();
	            return '\
	        <md-autocomplete \
	        ng-disabled="osAutocomplete.disabled" \
	        md-no-cache="osAutocomplete.noCache" \
	        md-selected-item="osAutocomplete.selectedItem" \
	        \
	        md-search-text="osAutocomplete.searchText" \
	        \
	        md-items="item in osAutocomplete.fetchResults(osAutocomplete.searchText)" \
	        md-item-text="' + attr.osItemText + '" \
	        md-min-length="osAutocomplete.minLength" \
	        placeholder="{{ osAutocomplete.placeholder }}"> \
	        \
	        <md-item-template>' + result.html() + '</md-item-template>  \
	        \
	        <md-not-found><os-sync-scope>' + notFound.html() + '</os-sync-scope></md-not-found>  \
	        </md-autocomplete>';
	        },
	        link: function (scope, element, attr, ctrl) {
	        }
	    };
	});
	;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var polygon_directive_1 = __webpack_require__(17);
	var polygon_directive_2 = __webpack_require__(17);
	exports.PolygonTool = polygon_directive_2.PolygonTool;
	angular
	    .module('osElements')
	    .directive('osMapControlPolygon', polygon_directive_1.PolygonTool.Factory());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var polygon_controller_1 = __webpack_require__(18);
	var PolygonTool = (function () {
	    function PolygonTool($timeout, $window, olData) {
	        this.restrict = 'E';
	        this.require = '^openlayers';
	        this.template = "<os-button variation=\"outline\" colour=\"primary\" ng-click=\"ctrl.toggle()\">Polygon</os-button>";
	        this.scope = {};
	        this.bindToController = {
	            featureLayer: '=osFeatureLayer'
	        };
	        this.controllerAs = 'ctrl';
	        this.controller = polygon_controller_1.PolygonToolController;
	        PolygonTool.prototype.link = function (scope, iElement, iAttrs, olCtrl) {
	            function PolygonTool_OL() {
	                ol.control.Control.call(this, {
	                    element: iElement[0]
	                });
	            }
	            olData.getMap().then(function (map) {
	                ol.inherits(PolygonTool_OL, ol.control.Control);
	                map.addControl(new PolygonTool_OL());
	            });
	        };
	    }
	    PolygonTool.prototype.BasicControl = function (element) {
	        return ol.control.Control.call(this, {
	            element: element
	        });
	    };
	    ;
	    PolygonTool.Factory = function () {
	        var directive = function ($timeout, $window, olData) {
	            return new PolygonTool($timeout, $window, olData);
	        };
	        directive['$inject'] = ['$timeout', '$window', 'olData'];
	        return directive;
	    };
	    return PolygonTool;
	})();
	exports.PolygonTool = PolygonTool;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var ol = __webpack_require__(19);
	var PolygonToolController = (function () {
	    function PolygonToolController($scope, $timeout, olData) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.transparentStyle = new ol.style.Style({
	            fill: new ol.style.Fill({
	                color: 'rgba(0,0,0, 0.0)'
	            }),
	            stroke: new ol.style.Stroke({
	                color: 'rgba(0,0,0, 0.0)',
	                width: 3
	            }),
	            image: new ol.style.Circle({
	                radius: 7,
	                fill: new ol.style.Fill({
	                    color: 'rgba(0,0,0, 0.0)'
	                }),
	                stroke: new ol.style.Stroke({
	                    color: 'rgba(0,0,0, 0.0)',
	                    width: 3
	                })
	            })
	        });
	        this.features = new ol.Collection();
	        this.featureSource = new ol.source.Vector({ features: this.features });
	        this.featureOverlay = new ol.layer.Vector({
	            source: this.featureSource,
	            style: this.transparentStyle,
	            updateWhileAnimating: true,
	            updateWhileInteracting: true
	        });
	        olData.getMap().then(function (map) {
	            _this.map = map;
	        });
	    }
	    PolygonToolController.prototype.toggle = function () {
	        if (this.interaction && this.interaction.getActive()) {
	            this.deactivate();
	        }
	        else {
	            this.enable();
	        }
	    };
	    PolygonToolController.prototype.enable = function () {
	        var _this = this;
	        this.featureOverlay.setMap(this.map);
	        var draw = new ol.interaction.Draw({
	            features: this.features,
	            type: 'Polygon',
	            style: this.transparentStyle
	        });
	        draw.on('drawend', function () {
	            _this.$timeout(function () {
	                _this.deactivate();
	            });
	            _this.$scope.$apply(function () {
	                _this.featureLayer.style.image.circle.fill.color = 'rgba(0,0,0,0)';
	                _this.featureLayer.style.image.circle.stroke.color = 'rgba(0,0,0,0)';
	            });
	        });
	        draw.on('drawstart', function (drawEvent) {
	            drawEvent.feature.getGeometry().on('change', function (geometry) {
	                _this.$scope.$apply(function () {
	                    _this.featureLayer.style.image.circle.fill.color = '#D40058';
	                    _this.featureLayer.style.image.circle.stroke.color = '#FFFFFF';
	                });
	                var coords = geometry.currentTarget.getCoordinates();
	                _this.$scope.$apply(function () {
	                    _this.featureLayer.source.geojson.object.features[0].geometry.geometries[0].coordinates = coords;
	                    _this.featureLayer.source.geojson.object.features[0].geometry.geometries[1].coordinates = coords[0];
	                });
	            });
	        });
	        this.interaction = draw;
	        this.map.addInteraction(draw);
	    };
	    PolygonToolController.prototype.removeColour = function (layer) {
	        layer = layer || {};
	        layer.style = layer.style || {};
	        layer.style.image = layer.style.image || {};
	        layer.style.image.circle.fill = layer.style.image.circle.fill || {};
	        layer.style.image.circle.stroke = layer.style.image.circle.stroke || {};
	        layer.style.image.circle.fill.color = 'rgba(0,0,0,0)';
	        layer.style.image.circle.stroke.color = 'rgba(0,0,0,0)';
	    };
	    PolygonToolController.prototype.addColour = function (layer) {
	        layer = layer || {};
	        layer.style = layer.style || {};
	        layer.style.image = layer.style.image || {};
	        layer.style.image.circle.fill = layer.style.image.circle.fill || {};
	        layer.style.image.circle.stroke = layer.style.image.circle.stroke || {};
	        layer.style.image.circle.fill.color = '#D40058';
	        layer.style.image.circle.stroke.color = '#FFFFFF';
	    };
	    PolygonToolController.prototype.deactivate = function () {
	        this.map.removeInteraction(this.interaction);
	        this.interaction = null;
	        this.featureOverlay.setMap(null);
	    };
	    PolygonToolController.prototype.isActive = function () {
	        return this.interaction && this.interaction.getActive();
	    };
	    PolygonToolController.prototype.getOpenlayersLayer = function (map, layerName) {
	        return map.getLayers().getArray().filter(function (layer) {
	            var layerProps = layer.getProperties();
	            return layerProps.name === layerName;
	        })[0];
	    };
	    PolygonToolController.$inject = ['$scope', '$timeout', 'olData'];
	    return PolygonToolController;
	})();
	exports.PolygonToolController = PolygonToolController;


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var max_size_directive_1 = __webpack_require__(21);
	var max_size_directive_2 = __webpack_require__(21);
	exports.MaxSize = max_size_directive_2.MaxSize;
	var projection_service_1 = __webpack_require__(22);
	var projection_service_2 = __webpack_require__(22);
	exports.ProjectionServiceProvider = projection_service_2.ProjectionServiceProvider;
	angular
	    .module('osElements')
	    .constant('ol', __webpack_require__(19))
	    .constant('proj4', __webpack_require__(23))
	    .run(['$window', function ($window) {
	        $window.proj4 = __webpack_require__(23);
	    }])
	    .directive('osMaxSize', max_size_directive_1.MaxSize.Factory())
	    .provider('osProjectionService', projection_service_1.ProjectionServiceProvider);


/***/ },
/* 21 */
/***/ function(module, exports) {

	var MaxSize = (function () {
	    function MaxSize($timeout, $window) {
	        this.restrict = 'A';
	        this.require = 'openlayers';
	        MaxSize.prototype.link = function (scope, iElement, iAttrs, olCtrl) {
	            var resize = function () {
	                iElement.css('height', '0px');
	                iElement.css('height', iElement.parent()[0].getBoundingClientRect().height + 'px');
	                olCtrl.getOpenlayersScope().getMap().then(function (map) {
	                    map.updateSize();
	                });
	            };
	            $timeout(resize);
	            $window.addEventListener('resize', resize);
	        };
	    }
	    MaxSize.Factory = function () {
	        var directive = function ($timeout, $window) {
	            return new MaxSize($timeout, $window);
	        };
	        directive['$inject'] = ['$timeout', '$window'];
	        return directive;
	    };
	    return MaxSize;
	})();
	exports.MaxSize = MaxSize;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var ol = __webpack_require__(19);
	var ProjectionService = (function () {
	    function ProjectionService(ol, proj4) {
	        this.ol = ol;
	        this.proj4 = proj4;
	        this['EPSG:27700'] = this.createEPSG27700();
	    }
	    ProjectionService.prototype.createEPSG27700 = function () {
	        this.proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.999601 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894 +datum=OSGB36 +units=m +no_defs");
	        function returnSameCoords(coord) {
	            return [coord[0], coord[1]];
	        }
	        this.ol.proj.addCoordinateTransforms('EPSG:27700', 'EPSG:27700', returnSameCoords, returnSameCoords);
	        return new ol.proj.Projection({
	            code: 'EPSG:27700',
	            extent: [-238375.0, 0, 700000, 1300000],
	            units: 'm'
	        });
	    };
	    return ProjectionService;
	})();
	exports.ProjectionService = ProjectionService;
	var ProjectionServiceProvider = (function () {
	    function ProjectionServiceProvider() {
	        this.$get = ['ol', 'proj4', function (ol, proj4) {
	                return new ProjectionService(ol, proj4);
	            }];
	    }
	    return ProjectionServiceProvider;
	})();
	exports.ProjectionServiceProvider = ProjectionServiceProvider;


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var osToolbar_1 = __webpack_require__(25);
	exports.OsToolbar = osToolbar_1.OsToolbar;
	var osToolbar_2 = __webpack_require__(25);
	angular
	    .module('osElements')
	    .component('osToolbarAction', {
	    bindings: {
	        icon: '@osIcon',
	        text: '@osText',
	        action: '=',
	        active: '=osActive'
	    },
	    controllerAs: 'osToolbarAction',
	    transclude: true,
	    template: __webpack_require__(26)
	})
	    .component('osToolbarSeparator', {
	    transclude: false,
	    template: __webpack_require__(27)
	})
	    .component('osToolbar', {
	    bindings: {
	        direction: '@osDirection'
	    },
	    controller: osToolbar_2.OsToolbar,
	    controllerAs: 'osToolbar',
	    transclude: true,
	    template: __webpack_require__(28)
	});


/***/ },
/* 25 */
/***/ function(module, exports) {

	var OsToolbar = (function () {
	    function OsToolbar($element) {
	        this.$element = $element;
	    }
	    OsToolbar.prototype.getOrientation = function () {
	        return this.direction == 'vertical' ? 'column' : 'row';
	    };
	    OsToolbar.prototype.isVertical = function () {
	        return this.direction == 'vertical';
	    };
	    OsToolbar.$inject = ['$element'];
	    return OsToolbar;
	})();
	exports.OsToolbar = OsToolbar;


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<a><md-icon class=\"os-toolbar-actionIcon\">{{ osToolbarAction.icon }}</md-icon><span class=\"os-toolbar-actionText\"> {{ osToolbarAction.text }}</span></a>"

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"os-toolbar-separator\"></div>"

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div ng-class=\"{'os-map-toolbar--vertical': osToolbar.isVertical()}\" flex=\"flex\" layout=\"{{ osToolbar.getOrientation() }}\" layout-align=\"start stretch\" ng-transclude=\"ng-transclude\" class=\"os-map-toolbar\"></div>"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var osSlider_1 = __webpack_require__(30);
	exports.OsSlider = osSlider_1.OsSlider;
	var osSlider_2 = __webpack_require__(30);
	angular
	    .module('osElements')
	    .component('osSlider', {
	    bindings: {
	        position: '@osPosition'
	    },
	    controller: osSlider_2.OsSlider,
	    controllerAs: 'osSlider',
	    transclude: true,
	    template: __webpack_require__(31)
	});


/***/ },
/* 30 */
/***/ function(module, exports) {

	var OsSlider = (function () {
	    function OsSlider($element) {
	        this.$element = $element;
	        this.opened = false;
	    }
	    OsSlider.prototype.toggle = function () {
	        this.opened = !this.opened;
	    };
	    OsSlider.prototype.isOpened = function () {
	        return this.opened;
	    };
	    OsSlider.prototype.iconName = function () {
	        return this.opened ? 'keyboard_arrow_right' : 'keyboard_arrow_left';
	    };
	    OsSlider.$inject = ['$element'];
	    return OsSlider;
	})();
	exports.OsSlider = OsSlider;


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div layout=\"row\" ng-class=\"{'os-slider-opened': osSlider.isOpened()}\" class=\"os-slider\"><div ng-transclude=\"ng-transclude\" class=\"os-slider-content\"></div><div class=\"os-slider-button\"><a ng-click=\"osSlider.toggle()\"><md-icon>{{ osSlider.iconName() }}</md-icon></a></div></div>"

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var osHeader_1 = __webpack_require__(33);
	exports.OsHeader = osHeader_1.OsHeader;
	var osHeader_2 = __webpack_require__(33);
	angular
	    .module('osElements')
	    .component('osHeader', {
	    bindings: {
	        title: '@osTitle'
	    },
	    controller: osHeader_2.OsHeader,
	    controllerAs: 'osHeader',
	    transclude: true,
	    template: __webpack_require__(34)
	});


/***/ },
/* 33 */
/***/ function(module, exports) {

	var OsHeader = (function () {
	    function OsHeader($element) {
	        this.$element = $element;
	    }
	    OsHeader.$inject = ['$element'];
	    return OsHeader;
	})();
	exports.OsHeader = OsHeader;


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div layout=\"row\" layout-align=\"center strech\" class=\"os-header\"><!--a.os-header-menuIcon(flex=\"3\")md-icon menu\n--><span flex=\"65\">{{ osHeader.title }}</span><div flex=\"30\" class=\"os-header-search\"><span class=\"os-header-searchText\">Search for a location, postcode</span><a class=\"os-header-searchIcon\"><md-icon>search</md-icon></a></div><!--a(flex=\"2\")md-icon more_vert--></div>"

/***/ }
/******/ ])
});
;