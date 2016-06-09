(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("openlayers"), require("proj4"));
	else if(typeof define === 'function' && define.amd)
		define(["openlayers", "proj4"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("openlayers"), require("proj4")) : factory(root["ol"], root["proj4"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_26__) {
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
	__webpack_require__(5);
	__webpack_require__(7);
	module.exports = __webpack_require__(44);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function OsElementsConfig($mdThemingProvider, $mdIconProvider) {
	    $mdThemingProvider.definePalette('solutions-blue', $mdThemingProvider.extendPalette('indigo', {
	        '500': '2b97ef'
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
	}
	angular.module('osElements', ['ngMaterial', 'rx']).config(['$mdThemingProvider', '$mdIconProvider', OsElementsConfig]);
	var button_component_1 = __webpack_require__(8);
	exports.OsButton = button_component_1.OsButton;
	var select_1 = __webpack_require__(9);
	exports.OsSelect = select_1.OsSelect;
	var tabs_1 = __webpack_require__(10);
	exports.OsTabs = tabs_1.OsTabs;
	var tab_1 = __webpack_require__(11);
	exports.OsTab = tab_1.OsTab;
	var popup_1 = __webpack_require__(12);
	exports.OsPopover = popup_1.OsPopover;
	var modal_1 = __webpack_require__(14);
	exports.OsModal = modal_1.OsModal;
	var autocomplete_1 = __webpack_require__(17);
	exports.OsAutocomplete = autocomplete_1.OsAutocomplete;
	var drawing_tools_1 = __webpack_require__(18);
	exports.PolygonTool = drawing_tools_1.PolygonTool;
	var map_1 = __webpack_require__(22);
	exports.MaxSize = map_1.MaxSize;
	exports.ProjectionServiceProvider = map_1.ProjectionServiceProvider;
	exports.PointerServiceProvider = map_1.PointerServiceProvider;
	var toolbar_1 = __webpack_require__(27);
	exports.OsToolbar = toolbar_1.OsToolbar;
	var slider_1 = __webpack_require__(32);
	exports.OsSlider = slider_1.OsSlider;
	var header_1 = __webpack_require__(35);
	exports.OsHeader = header_1.OsHeader;
	var search_1 = __webpack_require__(38);
	exports.OsSearch = search_1.OsSearch;
	var zoombar_1 = __webpack_require__(41);
	exports.OsZoombar = zoombar_1.OsZoombar;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var OsButton = (function () {
	    function OsButton($element, $window) {
	        this.$element = $element;
	        this.$window = $window;
	        this.mdButton = $element.children('md-button');
	        this.mdButton.addClass(this.makeClass());
	        this.setDisabled();
	        this.assignEvents();
	    }
	    OsButton.prototype.assignEvents = function () {
	        var _this = this;
	        this.$element.on('click', function (e) {
	            if (_this.disabled) {
	                e.preventDefault();
	                e.stopImmediatePropagation();
	            }
	        });
	    };
	    OsButton.prototype.setDisabled = function () {
	        if (this.disabled) {
	            this.mdButton.attr('disabled', 'disabled');
	        }
	    };
	    OsButton.prototype.makeClass = function () {
	        var classes = [];
	        switch (this.variation) {
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
	            case 'icon':
	                classes.push('md-os-icon');
	                break;
	            case 'text':
	            default:
	                break;
	        }
	        if (this.colour) {
	            classes.push('md-' + this.colour);
	        }
	        return classes.join(' ');
	    };
	    OsButton.prototype.$postLink = function () {
	        if ('componentHandler' in this.$window) {
	            this.$window.componentHandler.upgradeElement(this.$element.children()[0]);
	        }
	    };
	    OsButton.$inject = ['$element', '$window'];
	    return OsButton;
	}());
	exports.OsButton = OsButton;
	angular
	    .module('osElements')
	    .component('osButton', {
	    bindings: {
	        disabled: '=ngDisabled',
	        colour: '@',
	        variation: '@',
	        type: '@'
	    },
	    controller: OsButton,
	    controllerAs: 'osButton',
	    transclude: true,
	    template: "\n            <md-button ng-disabled=\"osButton.disabled\" md-no-ink type=\"{{osButton.type}}\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\"><ng-transclude></ng-transclude></md-button>\n        "
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var OsSelect = (function () {
	    function OsSelect($attrs) {
	        this.$attrs = $attrs;
	    }
	    OsSelect.prototype.hasCloseExpression = function () {
	        return this.$attrs['osClear'];
	    };
	    OsSelect.$inject = ['$attrs'];
	    return OsSelect;
	}());
	exports.OsSelect = OsSelect;
	angular
	    .module('osElements')
	    .component('osSelect', {
	    bindings: {
	        disabled: '=ngDisabled',
	        ngModel: '=',
	        osItems: '=',
	        placeholder: '@',
	        displayField: '@osDisplayField',
	        clear: '&osClear'
	    },
	    controller: OsSelect,
	    controllerAs: 'osSelect',
	    transclude: false,
	    template: "\n            <md-select ng-disabled=\"osSelect.disabled\" ng-model=\"osSelect.ngModel\" aria-label=\"{{osSelect.ngModel[osSelect.displayField]}}\" placeholder=\"{{ osSelect.placeholder }}\">\n                <md-option ng-value=\"option\" ng-disabled=\"option.disabled\" ng-repeat=\"option in osSelect.osItems\">{{ option[osSelect.displayField] }}</md-option>\n            </md-select>\n            <os-button ng-if=\"osSelect.ngModel && osSelect.hasCloseExpression()\" class=\"osSelect__cancel\" ng-click=\"osSelect.clear({object: osSelect.ngModel})\" variation=\"icon\"><i class=\"material-icons\">close</i></os-button>\n        "
	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var OsTabs = (function () {
	    function OsTabs($element, $transclude) {
	        this.$transclude = $transclude;
	        this.mdDynamicHeight = true;
	    }
	    OsTabs.$inject = ['$element', '$transclude'];
	    return OsTabs;
	}());
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
	        mdDynamicHeight: '=?',
	        osSelected: '=?'
	    },
	    controller: OsTabs,
	    controllerAs: 'osTabs',
	    transclude: true,
	    template: "\n           <md-tabs md-dynamic-height=\"{{ osTabs.mdDynamicHeight }}\" md-selected=\"osTabs.osSelected\">\n                <div os-tabs-transclude></div>\n           </md-tabs>\n        "
	});


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var OsTab = (function () {
	    function OsTab($element, $transclude) {
	        this.$element = $element;
	        this.$transclude = $transclude;
	    }
	    OsTab.$inject = ['$element', '$transclude'];
	    return OsTab;
	}());
	exports.OsTab = OsTab;
	angular
	    .module('osElements')
	    .directive('osTabTransclude', function () {
	    return {
	        require: '^osTabs',
	        link: function ($scope, $element, $attrs, fieldCtrl) {
	            $scope.osTab.$transclude(function (clone) {
	                $element.empty();
	                $element.append(clone);
	            });
	        }
	    };
	})
	    .component('osTab', {
	    bindings: {
	        label: '@',
	        disabled: '=',
	        ngClick: '&?'
	    },
	    controller: OsTab,
	    controllerAs: 'osTab',
	    transclude: true,
	    template: "\n           <md-tab label=\"{{osTab.label}}\" ng-disabled=\"osTab.disabled\" ng-click=\"osTab.ngClick()\">\n                <div os-tab-transclude=\"\"></div>\n           </md-tab>\n        "
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var OsPopover = (function () {
	    function OsPopover($element, $transclude, $mdUtil, $scope) {
	        var _this = this;
	        this.$element = $element;
	        this.$transclude = $transclude;
	        this.$mdUtil = $mdUtil;
	        this.visible = false;
	        this.tooltipParent = $element.parent();
	        this.postLink();
	        this.tooltipParent.append($element);
	        $scope.$watch(function () {
	            return _this.$mdUtil.offsetRect($element, _this.tooltipParent);
	        }, function (newVal, oldVal) {
	            _this.positionTooltip();
	        }, true);
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
	        this.$element.css({
	            'margin-top': (-this.tipRect.height - OsPopover.ARROW_HEIGHT) + 'px',
	            'margin-left': (-this.tipRect.width / 2) + 'px'
	        });
	    };
	    OsPopover.prototype.isWide = function () {
	        return this.type === 'wide';
	    };
	    OsPopover.prototype.hasLeftImage = function () {
	        return this.leftImage ? true : false;
	    };
	    OsPopover.$inject = ['$element', '$transclude', '$mdUtil', '$scope'];
	    OsPopover.TOOLTIP_WINDOW_EDGE_SPACE = 8;
	    OsPopover.ARROW_HEIGHT = 20;
	    return OsPopover;
	}());
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
	}());
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
	                leftImage: '=?osLeftImage'
	            },
	            controller: OsPopover,
	            controllerAs: 'osPopover',
	            bindToController: true,
	            transclude: true,
	            template: __webpack_require__(13),
	            link: function (scope, element, attr, ctrl) {
	                ctrl.title = element.find('os-popover-title').detach();
	                ctrl.subtitle = element.find('os-popover-subtitle').detach();
	                ctrl.mainImage = element.find('os-popover-main-image').text();
	                ctrl.backgroundImage = element.find('os-popover-background-image').text();
	                ctrl.description = element.find('os-popover-description').detach();
	                ctrl.actions = element.find('os-popover-actions').detach();
	                angular.element(element[0].getElementsByClassName('placeholder-title')).replaceWith(ctrl.title);
	                angular.element(element[0].getElementsByClassName('placeholder-subtitle')).replaceWith(ctrl.subtitle);
	                if (ctrl.description.length > 0) {
	                    angular.element(element[0].getElementsByClassName('placeholder-description')).replaceWith(ctrl.description);
	                }
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
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div ng-transclude=\"ng-transclude\" class=\"transclude-content\"></div><md-icon ng-click=\"osPopover.hide()\" class=\"os-popover__close-icon\">clear</md-icon><div layout=\"row\" os-popover-background=\"osPopover.backgroundImage\" ng-class=\"{'os-popover--wide': osPopover.isWide(), 'os-popover--left-image': osPopover.hasLeftImage()}\" ng-style=\"{width: osPopover.width, height: osPopover.height, 'max-width': osPopover.width, 'max-height': osPopover.height}\" class=\"os-popover-container\"><div flex=\"flex\" ng-if=\"osPopover.leftImage\" class=\"os-popover-leftImage\"><img ng-src=\"{{ osPopover.leftImage }}\" width=\"142\" height=\"234\"/></div><div flex=\"flex\" layout=\"row\" layout-align=\"start none\"><img ng-if=\"osPopover.mainImage\" ng-src=\"{{ osPopover.mainImage }}\"/><div flex=\"flex\" layout=\"column\" layout-align=\"start stretch\" class=\"os-popover-content\"><h1 class=\"os-popover-title\"><div class=\"placeholder-title\"></div></h1><h2 class=\"os-popover__subtitle\"><div class=\"placeholder-subtitle\"></div></h2><div flex=\"flex\"></div></div></div></div><div class=\"os-popover-arrow\"></div>"

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var osModal_1 = __webpack_require__(15);
	exports.OsModal = osModal_1.OsModal;
	var osModal_2 = __webpack_require__(15);
	angular
	    .module('osElements')
	    .provider('$OsModal', osModal_2.OsModal);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var OsModalService = (function () {
	    function OsModalService($mdDialog, $mdMedia) {
	        this.$mdDialog = $mdDialog;
	        this.$mdMedia = $mdMedia;
	    }
	    OsModalService.prototype.getDefaultOptions = function (options) {
	        options.title = options.hasOwnProperty('title') ? options.title : '';
	        options.textContent = options.hasOwnProperty('textContent') ? options.textContent : '';
	        options.template = options.hasOwnProperty('template') ? options.template : __webpack_require__(16);
	        options.ok = options.hasOwnProperty('ok') ? options.ok : 'OK';
	        options.cancel = options.hasOwnProperty('cancel') ? options.cancel : 'Cancel';
	        options.fullscreen = options.hasOwnProperty('fullscreen') ? options.fullscreen : true;
	        return options;
	    };
	    OsModalService.prototype.prepareModalOptions = function (dialog, options) {
	        angular.forEach(options, function (value, key) {
	            if (angular.isFunction(dialog[key])) {
	                dialog[key](value);
	            }
	        });
	    };
	    OsModalService.prototype.alert = function (options, display) {
	        if (display === void 0) { display = true; }
	        var params = this.getDefaultOptions(options);
	        var modal = this.$mdDialog.alert();
	        this.prepareModalOptions(modal, params);
	        return display ? this.$mdDialog.show(modal) : modal;
	    };
	    OsModalService.prototype.confirm = function (options, display) {
	        if (display === void 0) { display = true; }
	        var params = this.getDefaultOptions(options);
	        var modal = this.$mdDialog.confirm();
	        this.prepareModalOptions(modal, params);
	        return display ? this.$mdDialog.show(modal) : modal;
	    };
	    OsModalService.prototype.html = function (options) {
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
	    return OsModalService;
	}());
	exports.OsModalService = OsModalService;
	var OsModal = (function () {
	    function OsModal() {
	        this.$get = ['$mdDialog', '$mdMedia', function ($mdDialog, $mdMedia) {
	                return new OsModalService($mdDialog, $mdMedia);
	            }];
	    }
	    return OsModal;
	}());
	exports.OsModal = OsModal;


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<md-dialog md-theme=\"{{ dialog.theme }}\" aria-label=\"{{ dialog.ariaLabel }}\" ng-class=\"dialog.css\">\n  <md-dialog-content class=\"md-dialog-content\" role=\"document\" tabIndex=\"-1\" layout-align=\"center\">\n    <h2 class=\"md-title\">{{ dialog.title}}</h2>\n\n    <div ng-if=\"::dialog.mdHtmlContent\" class=\"md-dialog-content-body\" ng-bind-html=\"::dialog.mdHtmlContent\"></div>\n    <div ng-if=\"::!dialog.mdHtmlContent\" class=\"md-dialog-content-body\"><p class=\"os-modal-content-text\">{{::dialog.mdTextContent}}</p></div>\n  </md-dialog-content>\n\n  <md-dialog-actions layout=\"column\">\n\n    <os-button ng-click=\"dialog.hide()\" colour=\"primary\" variation=\"solid\" md-autofocus=\"dialog.$type!='confirm'\">{{ dialog.ok }}</os-button>\n\n    <os-button ng-if=\"dialog.$type == 'confirm'\" ng-click=\"dialog.abort()\" colour=\"primary\" variation=\"text\">{{ dialog.cancel }}</os-button>\n\n  </md-dialog-actions>\n\n</md-dialog>\n";

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
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
	}());
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var polygon_directive_1 = __webpack_require__(19);
	var polygon_directive_2 = __webpack_require__(19);
	exports.PolygonTool = polygon_directive_2.PolygonTool;
	angular
	    .module('osElements')
	    .directive('osMapControlPolygon', polygon_directive_1.PolygonTool.Factory());


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var polygon_controller_1 = __webpack_require__(20);
	var PolygonTool = (function () {
	    function PolygonTool($timeout, $window, olData, ol) {
	        this.$timeout = $timeout;
	        this.$window = $window;
	        this.olData = olData;
	        this.ol = ol;
	        this.restrict = 'E';
	        this.require = '^openlayers';
	        this.template = "<os-button ng-if=\"!ctrl.noView\" variation=\"outline\" colour=\"primary\" ng-click=\"ctrl.isActive = !ctrl.isActive\">Polygon</os-button>";
	        this.scope = {};
	        this.bindToController = {
	            featureLayer: '=osFeatureLayer',
	            isActive: '=osIsActive',
	            noView: '=osNoView'
	        };
	        this.controllerAs = 'ctrl';
	        this.controller = polygon_controller_1.PolygonToolController;
	        PolygonTool.prototype.link = function (scope, iElement, iAttrs, olCtrl) {
	            scope.$watch('ctrl.isActive', function (isActive) {
	                if (isActive !== scope.ctrl.isToolActive()) {
	                    scope.ctrl.toggle();
	                }
	            });
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
	        var directive = function ($timeout, $window, olData, ol) {
	            return new PolygonTool($timeout, $window, olData, ol);
	        };
	        directive['$inject'] = ['$timeout', '$window', 'olData', 'ol'];
	        return directive;
	    };
	    return PolygonTool;
	}());
	exports.PolygonTool = PolygonTool;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ol = __webpack_require__(21);
	var PolygonToolController = (function () {
	    function PolygonToolController($scope, $timeout, olData, rx) {
	        var _this = this;
	        this.olData = olData;
	        this.rx = rx;
	        this.isAddingToPolygon = false;
	        this.myTimer = null;
	        this.lastApplyTime = new Date();
	        this.onPointermove = function (browserEvent) {
	            if (_this.isToolActive()) {
	                _this.addColour(_this.featureLayer);
	                var now = new Date();
	                if (+now - +_this.lastApplyTime > 20) {
	                    clearTimeout(_this.myTimer);
	                    _this.$scope.$apply(function () {
	                        _this.lastApplyTime = new Date();
	                        var source = _this.featureLayer.source;
	                        var coordinates = source.geojson.object.features[0].geometry.geometries[1].coordinates;
	                        coordinates = [browserEvent.coordinate];
	                    });
	                }
	                else {
	                    clearTimeout(_this.myTimer);
	                    _this.myTimer = setTimeout(function () {
	                        _this.$scope.$apply(function () {
	                            _this.lastApplyTime = new Date();
	                            var source = _this.featureLayer.source;
	                            var coordinates = source.geojson.object.features[0].geometry.geometries[1].coordinates;
	                            coordinates = [browserEvent.coordinate];
	                        });
	                    }, +now - +_this.lastApplyTime + 1);
	                }
	            }
	        };
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
	        this.pointermoveObservable = rx.Observable.create(function (observer) {
	        });
	    }
	    PolygonToolController.prototype.toggle = function () {
	        var _this = this;
	        if (this.interaction && this.interaction.getActive()) {
	            this.deactivate();
	        }
	        else {
	            this.olData.getMap().then(function (newMap) {
	                _this.map = newMap;
	                _this.activate();
	            });
	        }
	    };
	    PolygonToolController.prototype.activate = function () {
	        var _this = this;
	        this.removeColour(this.featureLayer);
	        this.featureOverlay.setMap(this.map);
	        var draw = new ol.interaction.Draw({
	            features: this.features,
	            type: 'Polygon',
	            style: this.transparentStyle
	        });
	        this.map.on('pointermove', this.onPointermove);
	        draw.on('drawend', function () {
	            _this.isAddingToPolygon = false;
	            _this.map.on('pointermove', _this.onPointermove);
	            _this.$timeout(function () {
	                _this.deactivate();
	            });
	            _this.$scope.$apply(function () {
	                _this.removeColour(_this.featureLayer);
	            });
	        });
	        draw.on('drawstart', function (drawEvent) {
	            _this.isAddingToPolygon = true;
	            _this.map.un('pointermove', _this.onPointermove);
	            drawEvent.feature.getGeometry().on('change', function (changeEvent) {
	                var coords = changeEvent.target.getCoordinates();
	                _this.addColour(_this.featureLayer);
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
	        this.map.un('pointermove', this.onPointermove);
	        this.isActive = false;
	    };
	    PolygonToolController.prototype.isToolActive = function () {
	        return (this.interaction && this.interaction.getActive()) || false;
	    };
	    PolygonToolController.prototype.getOpenlayersLayer = function (map, layerName) {
	        return map.getLayers().getArray().filter(function (layer) {
	            var layerProps = layer.getProperties();
	            return layerProps.name === layerName;
	        })[0];
	    };
	    PolygonToolController.$inject = ['$scope', '$timeout', 'olData', 'rx'];
	    return PolygonToolController;
	}());
	exports.PolygonToolController = PolygonToolController;


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var max_size_directive_1 = __webpack_require__(23);
	var max_size_directive_2 = __webpack_require__(23);
	exports.MaxSize = max_size_directive_2.MaxSize;
	var projection_service_1 = __webpack_require__(24);
	var projection_service_2 = __webpack_require__(24);
	exports.ProjectionServiceProvider = projection_service_2.ProjectionServiceProvider;
	var pointer_service_1 = __webpack_require__(25);
	var pointer_service_2 = __webpack_require__(25);
	exports.PointerServiceProvider = pointer_service_2.PointerServiceProvider;
	angular
	    .module('osElements')
	    .constant('ol', __webpack_require__(21))
	    .constant('proj4', __webpack_require__(26))
	    .run(['$window', function ($window) {
	        $window.proj4 = __webpack_require__(26);
	    }])
	    .directive('osMaxSize', max_size_directive_1.MaxSize.Factory())
	    .provider('osProjectionService', projection_service_1.ProjectionServiceProvider)
	    .provider('$osPointer', pointer_service_1.PointerServiceProvider);


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
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
	}());
	exports.MaxSize = MaxSize;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ol = __webpack_require__(21);
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
	}());
	exports.ProjectionService = ProjectionService;
	var ProjectionServiceProvider = (function () {
	    function ProjectionServiceProvider() {
	        this.$get = ['ol', 'proj4', function (ol, proj4) {
	                return new ProjectionService(ol, proj4);
	            }];
	    }
	    return ProjectionServiceProvider;
	}());
	exports.ProjectionServiceProvider = ProjectionServiceProvider;


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	var PointerService = (function () {
	    function PointerService($q) {
	        this.$q = $q;
	    }
	    PointerService.prototype.setPointer = function (viewport, type) {
	        var deferred = this.$q.defer();
	        angular.element(viewport)
	            .removeClass('grabbing')
	            .removeClass('grabbable')
	            .removeClass('clickable')
	            .addClass(type);
	        deferred.resolve(type);
	        return deferred.promise;
	    };
	    return PointerService;
	}());
	exports.PointerService = PointerService;
	var PointerServiceProvider = (function () {
	    function PointerServiceProvider() {
	        this.$get = ['$q', function ($q) {
	                return new PointerService($q);
	            }];
	    }
	    return PointerServiceProvider;
	}());
	exports.PointerServiceProvider = PointerServiceProvider;


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var osToolbar_1 = __webpack_require__(28);
	exports.OsToolbar = osToolbar_1.OsToolbar;
	var osToolbar_2 = __webpack_require__(28);
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
	    template: __webpack_require__(29)
	})
	    .component('osToolbarSeparator', {
	    transclude: false,
	    template: __webpack_require__(30)
	})
	    .component('osToolbar', {
	    bindings: {
	        direction: '@osDirection'
	    },
	    controller: osToolbar_2.OsToolbar,
	    controllerAs: 'osToolbar',
	    transclude: true,
	    template: __webpack_require__(31)
	});


/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
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
	}());
	exports.OsToolbar = OsToolbar;


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<a><md-icon class=\"os-toolbar-actionIcon\">{{ osToolbarAction.icon }}</md-icon><span class=\"os-toolbar-actionText\"> {{ osToolbarAction.text }}</span></a>"

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"os-toolbar-separator\"></div>"

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div ng-class=\"{'os-map-toolbar--vertical': osToolbar.isVertical()}\" flex=\"flex\" layout=\"{{ osToolbar.getOrientation() }}\" layout-align=\"start stretch\" ng-transclude=\"ng-transclude\" class=\"os-map-toolbar\"></div>"

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var osSlider_1 = __webpack_require__(33);
	exports.OsSlider = osSlider_1.OsSlider;
	var osSlider_2 = __webpack_require__(33);
	angular
	    .module('osElements')
	    .component('osSlider', {
	    bindings: {
	        position: '@osPosition',
	        opened: '=?osOpened'
	    },
	    controller: osSlider_2.OsSlider,
	    controllerAs: 'osSlider',
	    transclude: true,
	    template: __webpack_require__(34)
	});


/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	var OsSlider = (function () {
	    function OsSlider($element, $scope) {
	        var _this = this;
	        this.$element = $element;
	        this.$scope = $scope;
	        this.setVisibility();
	        $scope.$watch(function () {
	            _this.setVisibility();
	        });
	    }
	    OsSlider.prototype.toggle = function () {
	        this.opened = !this.opened;
	        this.setVisibility();
	    };
	    OsSlider.prototype.setVisibility = function () {
	        if (this.opened) {
	            this.$element.addClass('os-slider-opened');
	        }
	        else {
	            this.$element.removeClass('os-slider-opened');
	        }
	    };
	    OsSlider.prototype.isOpened = function () {
	        return this.opened == true;
	    };
	    OsSlider.prototype.iconName = function () {
	        return this.isOpened() ? 'keyboard_arrow_left' : 'keyboard_arrow_right';
	    };
	    OsSlider.$inject = ['$element', '$scope'];
	    return OsSlider;
	}());
	exports.OsSlider = OsSlider;


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div layout=\"row\" class=\"os-slider\"><div ng-transclude=\"ng-transclude\" class=\"os-slider-content\"></div><div class=\"os-slider-button\"><a ng-click=\"osSlider.toggle()\"><md-icon>{{ osSlider.iconName() }}</md-icon></a></div></div>"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var osHeader_1 = __webpack_require__(36);
	exports.OsHeader = osHeader_1.OsHeader;
	var osHeader_2 = __webpack_require__(36);
	angular
	    .module('osElements')
	    .component('osHeader', {
	    bindings: {
	        title: '@osTitle',
	        useSearch: '=?osUseSearch'
	    },
	    controller: osHeader_2.OsHeader,
	    controllerAs: 'osHeader',
	    transclude: true,
	    template: __webpack_require__(37)
	});


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	var OsHeader = (function () {
	    function OsHeader($element, $scope) {
	        this.$element = $element;
	        this.$scope = $scope;
	    }
	    OsHeader.prototype.openSearch = function () {
	        this.$scope.$broadcast('osHeader.openSearch');
	    };
	    OsHeader.$inject = ['$element', '$scope'];
	    return OsHeader;
	}());
	exports.OsHeader = OsHeader;


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<div layout=\"row\" layout-align=\"left strech\" class=\"os-header\"><!--a.os-header-menuIcon(flex=\"3\")md-icon menu\n--><div flex=\"63%\" class=\"os-header-title\">{{ osHeader.title }}</div><div flex=\"35%\" ng-click=\"osHeader.openSearch()\" ng-if=\"osHeader.useSearch\" class=\"os-header-searchContainer\"><div class=\"os-header-search\"></div><span class=\"os-header-searchText\">Search for a location, postcode</span><a class=\"os-header-searchIcon\"><md-icon>search</md-icon></a></div><!--a(flex=\"2\")md-icon more_vert\n--></div><div ng-transclude=\"ng-transclude\"></div>"

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var osSearch_1 = __webpack_require__(39);
	exports.OsSearch = osSearch_1.OsSearch;
	var osSearch_2 = __webpack_require__(39);
	angular
	    .module('osElements')
	    .controller('OsSearch', osSearch_2.OsSearch)
	    .directive('osSearch', ['observeOnScope', 'rx', function (observeOnScope, rx) {
	        return {
	            scope: {
	                placeholder: '@',
	                disabled: '=?ngDisabled',
	                minLength: '=?',
	                selectedItem: '=?',
	                itemNames: '@osItems',
	                searchText: '=?osSearchText',
	                searchProviders: '=osSearchProviders',
	                searcherHidden: '=?osSearcherHidden'
	            },
	            controller: 'OsSearch',
	            controllerAs: 'osSearch',
	            bindToController: true,
	            template: __webpack_require__(40)
	        };
	    }]);


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	var OsSearch = (function () {
	    function OsSearch($scope, $element, rx, observeOnScope, $timeout, $http, $document) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$element = $element;
	        this.rx = rx;
	        this.observeOnScope = observeOnScope;
	        this.$timeout = $timeout;
	        this.$http = $http;
	        this.$document = $document;
	        this.searchText = '';
	        this.searchResults = {};
	        this.searchHidden = false;
	        this.subscribe = function (term) {
	            var filtered = _this.searchProviders.filter(function (element) {
	                return element.minLength <= term.length;
	            });
	            var observables = filtered.map(function (provider) {
	                var providerObservable = _this.createProviderObservable(provider, term);
	                providerObservable.providerId = provider.id;
	                providerObservable.term = term;
	                providerObservable.sent = new Date();
	                providerObservable.config = provider;
	                return providerObservable;
	            });
	            observables.forEach(function (providerObservable) {
	                providerObservable.subscribe(function (response) {
	                    _this.$timeout(function () {
	                        if (providerObservable.config.transformResponse) {
	                            response = providerObservable.config.transformResponse.call(_this, response);
	                        }
	                        if (_this.searchText === providerObservable.term) {
	                            _this.searchResults[providerObservable.providerId].inProgress = false;
	                            _this.searchResults[providerObservable.providerId].results = response.results;
	                            _this.searchResults[providerObservable.providerId].error = "";
	                            _this.searchResults[providerObservable.providerId].sent = providerObservable.sent;
	                            _this.searchResults[providerObservable.providerId].received = new Date();
	                            if (!_this.$scope.$$phase) {
	                                _this.$scope.$digest();
	                            }
	                        }
	                    });
	                }, function (error) {
	                    _this.searchResults[providerObservable.providerId].inProgress = false;
	                    _this.searchResults[providerObservable.providerId].results = [];
	                    _this.searchResults[providerObservable.providerId].error = error.data.error || error.data;
	                    _this.searchResults[providerObservable.providerId].received = Infinity;
	                    _this.searchResults[providerObservable.providerId].sent = providerObservable.sent;
	                });
	            });
	        };
	        this.handleClick = function (event) {
	            if (_this.closestByClass(event.target, 'os-header-searchContainer'))
	                return false;
	            if (!_this.closestByClass(event.target, 'os-search')
	                && !_this.closestByClass(event.target, 'os-search-container')) {
	                _this.hideSearch();
	            }
	        };
	        this.configProviders();
	        this.init();
	        this.$scope.$on('osHeader.openSearch', function () {
	            _this.open();
	        });
	    }
	    OsSearch.prototype.observableWithAJAXConfig = function (provider, term) {
	        var config = {
	            params: angular.copy(provider.params),
	            data: angular.copy(provider.data),
	            dataType: provider.dataType,
	            url: provider.url,
	            method: provider.method
	        };
	        for (var k in config.params) {
	            config.params[k] = config.params[k].replace('%s', term);
	        }
	        for (var k in config.data) {
	            config.data[k] = config.data[k].replace('%s', term);
	        }
	        return this.rx.Observable.fromPromise(this.$http(config));
	    };
	    ;
	    OsSearch.prototype.observableFromFn = function (fn, term) {
	        return this.rx.Observable.fromPromise(fn(term));
	    };
	    ;
	    OsSearch.prototype.createProviderObservable = function (provider, term) {
	        if (provider.hasOwnProperty('fn')) {
	            return this.observableFromFn(provider.fn, term);
	        }
	        else {
	            return this.observableWithAJAXConfig(provider, term);
	        }
	    };
	    ;
	    OsSearch.prototype.configProviders = function () {
	        this.internalSearchProviders = this.searchProviders.reduce(function (providerHashMap, provider) {
	            providerHashMap[provider.id] = provider;
	            return providerHashMap;
	        }, {});
	    };
	    OsSearch.prototype.init = function () {
	        var _this = this;
	        var throttledInput = this.observeOnScope(this.$scope, 'osSearch.searchText').debounce(200).map(function (e) {
	            return e.newValue;
	        }).distinctUntilChanged();
	        throttledInput.filter(function (term) {
	            _this.searchProviders.forEach(function (provider) {
	                _this.searchResults[provider.id] = _this.searchResults[provider.id] || {};
	                _this.searchResults[provider.id].providerId = provider.id;
	                _this.searchResults[provider.id].title = provider.title;
	                _this.searchResults[provider.id].width = provider.columnWidth;
	                _this.searchResults[provider.id].results = [];
	            });
	            return term.toLowerCase() && term.length;
	        }).subscribe(this.subscribe);
	    };
	    OsSearch.prototype.clear = function () {
	        this.searchText = '';
	    };
	    OsSearch.prototype.open = function () {
	        this.searcherHidden = false;
	        this.bindEvents();
	    };
	    OsSearch.prototype.close = function () {
	        this.searcherHidden = true;
	        this.unBindEvents();
	    };
	    OsSearch.prototype.closestByClass = function (el, className) {
	        while (!(el.classList.contains(className))) {
	            el = el.parentNode;
	            if (!el || !el.classList) {
	                return null;
	            }
	        }
	        return el;
	    };
	    OsSearch.prototype.bindEvents = function () {
	        angular.element(this.$document.querySelector('html')).on('click', this.handleClick);
	    };
	    OsSearch.prototype.unBindEvents = function () {
	        angular.element(this.$document.querySelector('html')).off('click', this.handleClick);
	    };
	    OsSearch.prototype.resultsAvailable = function () {
	        var _this = this;
	        return this.searchProviders.filter(function (provider) {
	            var sr = _this.searchResults[provider.id];
	            return sr && (sr.inProgress || sr.error || sr.results.length > 0);
	        }).length > 0;
	    };
	    OsSearch.prototype.hideSearch = function () {
	        this.searchHidden = true;
	        this.close();
	    };
	    OsSearch.prototype.selectResult = function (result, cb) {
	        if (cb) {
	            cb.call(null, result, this.hideSearch.bind(this));
	        }
	    };
	    OsSearch.$inject = ['$scope', '$element', 'rx', 'observeOnScope', '$timeout', '$http', '$document'];
	    return OsSearch;
	}());
	exports.OsSearch = OsSearch;


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<div ng-if=\"!osSearch.searcherHidden\" class=\"os-search\"><div layout=\"row\" class=\"os-search-head\"><div flex=\"90\" class=\"os-search-headItem\"><input type=\"search\" name=\"{{osSearch.name}}\" autocomplete=\"off\" ng-model=\"osSearch.searchText\" placeholder=\"{{osSearch.placeholder}}\" ng-focus=\"osSearch.searchHidden = false\" ng-keydown=\"osSearch.keyFromInput($event)\" class=\"os-search-query\"/></div><div flex=\"10\" class=\"os-search-headItem os-search__headItem--close\"><button type=\"button\" ng-click=\"osSearch.close()\" class=\"os-search-clear\"><md-icon>clear</md-icon></button></div></div><div layout=\"column\" ng-if=\"osSearch.searchText.length &gt; 0 &amp;&amp; !osSearch.searchHidden &amp;&amp; osSearch.resultsAvailable()\" class=\"os-search-result\"><div layout=\"row\" class=\"os-search-resultHeaders\"><div flex=\"\" ng-repeat=\"(key, column) in osSearch.searchResults\" ng-if=\"column.results.length\" class=\"os-search-resultHeader\">{{ column.title }}</div></div><div layout=\"row\" class=\"os-search-resultItems\"><div layout=\"row\" class=\"os-search-resultItemsContainer\"><div flex=\"\" ng-repeat=\"(key, column) in osSearch.searchResults\" ng-if=\"column.results.length\" class=\"os-search-resultColumn\"><div ng-repeat=\"item in column.results\" class=\"os-search-resultItem\"><div ng-click=\"osSearch.selectResult(item, osSearch.internalSearchProviders[column.providerId].onSelect)\" data-search-result-index=\"{{$index}}\" data-provider-id=\"{{column.providerId}}\" tabindex=\"0\" ng-keydown=\"osSearch.keyFromSearchResult($event, result, column.providerId, searchProviders[column.providerId].onSelect)\" class=\"os-search-resultItemColumn\">{{item.text}}</div></div></div></div></div></div></div>"

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var osZoombar_1 = __webpack_require__(42);
	exports.OsZoombar = osZoombar_1.OsZoombar;
	var osZoombar_2 = __webpack_require__(42);
	angular
	    .module('osElements')
	    .controller('OsZoombarController', osZoombar_2.OsZoombar)
	    .directive('osZoombar', ['$window', function ($window) {
	        return {
	            scope: {
	                ngModel: '=',
	                zoomMin: '=osZoomMin',
	                zoomMax: '=osZoomMax'
	            },
	            require: 'ngModel',
	            controller: 'OsZoombarController',
	            controllerAs: 'osZoombar',
	            bindToController: true,
	            transclude: true,
	            template: __webpack_require__(43),
	            link: function () {
	                if ('componentHandler' in $window) {
	                    $window.componentHandler.upgradeAllRegistered();
	                }
	            }
	        };
	    }]);


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	var OsZoombar = (function () {
	    function OsZoombar($element) {
	        this.$element = $element;
	    }
	    OsZoombar.prototype.zoomIn = function () {
	        this.ngModel = Math.min(++this.ngModel, this.zoomMax);
	    };
	    OsZoombar.prototype.zoomOut = function () {
	        this.ngModel = Math.max(--this.ngModel, this.zoomMin);
	    };
	    OsZoombar.$inject = ['$element'];
	    return OsZoombar;
	}());
	exports.OsZoombar = OsZoombar;


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<div class=\"os-zoombar\"><os-button ng-click=\"osZoombar.zoomIn()\" class=\"os-zoombar-zoomIn\"><md-icon>add</md-icon></os-button><div hide-xs=\"hide-xs\" class=\"os-zoombar-scroll\"><div class=\"os-zoombar-scroll-wrapper\"><input type=\"range\" ng-model=\"osZoombar.ngModel\" min=\"{{ osZoombar.zoomMin }}\" max=\"{{ osZoombar.zoomMax }}\" value=\"{{ osZoombar.ngModel }}\" tabindex=\"-1\" class=\"mdl-slider mdl-js-slider\"/></div></div><os-button ng-click=\"osZoombar.zoomOut()\" class=\"os-zoombar-zoomOut\"><md-icon>remove</md-icon></os-button></div>"

/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * material-design-lite - Material Design Components in CSS, JS and HTML
	 * @version v1.1.3
	 * @license Apache-2.0
	 * @copyright 2015 Google, Inc.
	 * @link https://github.com/google/material-design-lite
	 */
	!function(){"use strict";function e(e,t){if(e){if(t.element_.classList.contains(t.CssClasses_.MDL_JS_RIPPLE_EFFECT)){var s=document.createElement("span");s.classList.add(t.CssClasses_.MDL_RIPPLE_CONTAINER),s.classList.add(t.CssClasses_.MDL_JS_RIPPLE_EFFECT);var i=document.createElement("span");i.classList.add(t.CssClasses_.MDL_RIPPLE),s.appendChild(i),e.appendChild(s)}e.addEventListener("click",function(s){s.preventDefault();var i=e.href.split("#")[1],n=t.element_.querySelector("#"+i);t.resetTabState_(),t.resetPanelState_(),e.classList.add(t.CssClasses_.ACTIVE_CLASS),n.classList.add(t.CssClasses_.ACTIVE_CLASS)})}}function t(e,t,s,i){function n(){var n=e.href.split("#")[1],a=i.content_.querySelector("#"+n);i.resetTabState_(t),i.resetPanelState_(s),e.classList.add(i.CssClasses_.IS_ACTIVE),a.classList.add(i.CssClasses_.IS_ACTIVE)}if(i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)){var a=document.createElement("span");a.classList.add(i.CssClasses_.RIPPLE_CONTAINER),a.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);var l=document.createElement("span");l.classList.add(i.CssClasses_.RIPPLE),a.appendChild(l),e.appendChild(a)}e.addEventListener("click",function(t){"#"===e.getAttribute("href").charAt(0)&&(t.preventDefault(),n())}),e.show=n}var s={upgradeDom:function(e,t){},upgradeElement:function(e,t){},upgradeElements:function(e){},upgradeAllRegistered:function(){},registerUpgradedCallback:function(e,t){},register:function(e){},downgradeElements:function(e){}};s=function(){function e(e,t){for(var s=0;s<h.length;s++)if(h[s].className===e)return"undefined"!=typeof t&&(h[s]=t),h[s];return!1}function t(e){var t=e.getAttribute("data-upgraded");return null===t?[""]:t.split(",")}function s(e,s){var i=t(e);return-1!==i.indexOf(s)}function i(t,s){if("undefined"==typeof t&&"undefined"==typeof s)for(var a=0;a<h.length;a++)i(h[a].className,h[a].cssClass);else{var l=t;if("undefined"==typeof s){var o=e(l);o&&(s=o.cssClass)}for(var r=document.querySelectorAll("."+s),_=0;_<r.length;_++)n(r[_],l)}}function n(i,n){if(!("object"==typeof i&&i instanceof Element))throw new Error("Invalid argument provided to upgrade MDL element.");var a=t(i),l=[];if(n)s(i,n)||l.push(e(n));else{var o=i.classList;h.forEach(function(e){o.contains(e.cssClass)&&-1===l.indexOf(e)&&!s(i,e.className)&&l.push(e)})}for(var r,_=0,d=l.length;d>_;_++){if(r=l[_],!r)throw new Error("Unable to find a registered component for the given class.");a.push(r.className),i.setAttribute("data-upgraded",a.join(","));var C=new r.classConstructor(i);C[p]=r,c.push(C);for(var u=0,E=r.callbacks.length;E>u;u++)r.callbacks[u](i);r.widget&&(i[r.className]=C);var m;"CustomEvent"in window&&"function"==typeof window.CustomEvent?m=new Event("mdl-componentupgraded",{bubbles:!0,cancelable:!1}):(m=document.createEvent("Events"),m.initEvent("mdl-componentupgraded",!0,!0)),i.dispatchEvent(m)}}function a(e){Array.isArray(e)||(e="function"==typeof e.item?Array.prototype.slice.call(e):[e]);for(var t,s=0,i=e.length;i>s;s++)t=e[s],t instanceof HTMLElement&&(n(t),t.children.length>0&&a(t.children))}function l(t){var s="undefined"==typeof t.widget&&"undefined"==typeof t.widget,i=!0;s||(i=t.widget||t.widget);var n={classConstructor:t.constructor||t.constructor,className:t.classAsString||t.classAsString,cssClass:t.cssClass||t.cssClass,widget:i,callbacks:[]};if(h.forEach(function(e){if(e.cssClass===n.cssClass)throw new Error("The provided cssClass has already been registered: "+e.cssClass);if(e.className===n.className)throw new Error("The provided className has already been registered")}),t.constructor.prototype.hasOwnProperty(p))throw new Error("MDL component classes must not have "+p+" defined as a property.");var a=e(t.classAsString,n);a||h.push(n)}function o(t,s){var i=e(t);i&&i.callbacks.push(s)}function r(){for(var e=0;e<h.length;e++)i(h[e].className)}function _(e){if(e){var t=c.indexOf(e);c.splice(t,1);var s=e.element_.getAttribute("data-upgraded").split(","),i=s.indexOf(e[p].classAsString);s.splice(i,1),e.element_.setAttribute("data-upgraded",s.join(","));var n;"CustomEvent"in window&&"function"==typeof window.CustomEvent?n=new Event("mdl-componentdowngraded",{bubbles:!0,cancelable:!1}):(n=document.createEvent("Events"),n.initEvent("mdl-componentdowngraded",!0,!0))}}function d(e){var t=function(e){c.filter(function(t){return t.element_===e}).forEach(_)};if(e instanceof Array||e instanceof NodeList)for(var s=0;s<e.length;s++)t(e[s]);else{if(!(e instanceof Node))throw new Error("Invalid argument provided to downgrade MDL nodes.");t(e)}}var h=[],c=[],p="mdlComponentConfigInternal_";return{upgradeDom:i,upgradeElement:n,upgradeElements:a,upgradeAllRegistered:r,registerUpgradedCallback:o,register:l,downgradeElements:d}}(),s.ComponentConfigPublic,s.ComponentConfig,s.Component,s.upgradeDom=s.upgradeDom,s.upgradeElement=s.upgradeElement,s.upgradeElements=s.upgradeElements,s.upgradeAllRegistered=s.upgradeAllRegistered,s.registerUpgradedCallback=s.registerUpgradedCallback,s.register=s.register,s.downgradeElements=s.downgradeElements,window.componentHandler=s,window.componentHandler=s,window.addEventListener("load",function(){"classList"in document.createElement("div")&&"querySelector"in document&&"addEventListener"in window&&Array.prototype.forEach?(document.documentElement.classList.add("mdl-js"),s.upgradeAllRegistered()):(s.upgradeElement=function(){},s.register=function(){})}),Date.now||(Date.now=function(){return(new Date).getTime()},Date.now=Date.now);for(var i=["webkit","moz"],n=0;n<i.length&&!window.requestAnimationFrame;++n){var a=i[n];window.requestAnimationFrame=window[a+"RequestAnimationFrame"],window.cancelAnimationFrame=window[a+"CancelAnimationFrame"]||window[a+"CancelRequestAnimationFrame"],window.requestAnimationFrame=window.requestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var l=0;window.requestAnimationFrame=function(e){var t=Date.now(),s=Math.max(l+16,t);return setTimeout(function(){e(l=s)},s-t)},window.cancelAnimationFrame=clearTimeout,window.requestAnimationFrame=window.requestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame}var o=function(e){this.element_=e,this.init()};window.MaterialButton=o,o.prototype.Constant_={},o.prototype.CssClasses_={RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-button__ripple-container",RIPPLE:"mdl-ripple"},o.prototype.blurHandler_=function(e){e&&this.element_.blur()},o.prototype.disable=function(){this.element_.disabled=!0},o.prototype.disable=o.prototype.disable,o.prototype.enable=function(){this.element_.disabled=!1},o.prototype.enable=o.prototype.enable,o.prototype.init=function(){if(this.element_){if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleElement_=document.createElement("span"),this.rippleElement_.classList.add(this.CssClasses_.RIPPLE),e.appendChild(this.rippleElement_),this.boundRippleBlurHandler=this.blurHandler_.bind(this),this.rippleElement_.addEventListener("mouseup",this.boundRippleBlurHandler),this.element_.appendChild(e)}this.boundButtonBlurHandler=this.blurHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundButtonBlurHandler),this.element_.addEventListener("mouseleave",this.boundButtonBlurHandler)}},s.register({constructor:o,classAsString:"MaterialButton",cssClass:"mdl-js-button",widget:!0});var r=function(e){this.element_=e,this.init()};window.MaterialCheckbox=r,r.prototype.Constant_={TINY_TIMEOUT:.001},r.prototype.CssClasses_={INPUT:"mdl-checkbox__input",BOX_OUTLINE:"mdl-checkbox__box-outline",FOCUS_HELPER:"mdl-checkbox__focus-helper",TICK_OUTLINE:"mdl-checkbox__tick-outline",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-checkbox__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded"},r.prototype.onChange_=function(e){this.updateClasses_()},r.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},r.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},r.prototype.onMouseUp_=function(e){this.blur_()},r.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},r.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},r.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},r.prototype.checkToggleState=r.prototype.checkToggleState,r.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},r.prototype.checkDisabled=r.prototype.checkDisabled,r.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},r.prototype.disable=r.prototype.disable,r.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},r.prototype.enable=r.prototype.enable,r.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},r.prototype.check=r.prototype.check,r.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},r.prototype.uncheck=r.prototype.uncheck,r.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("span");e.classList.add(this.CssClasses_.BOX_OUTLINE);var t=document.createElement("span");t.classList.add(this.CssClasses_.FOCUS_HELPER);var s=document.createElement("span");if(s.classList.add(this.CssClasses_.TICK_OUTLINE),e.appendChild(s),this.element_.appendChild(t),this.element_.appendChild(e),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementMouseUp),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:r,classAsString:"MaterialCheckbox",cssClass:"mdl-js-checkbox",widget:!0});var _=function(e){this.element_=e,this.init()};window.MaterialIconToggle=_,_.prototype.Constant_={TINY_TIMEOUT:.001},_.prototype.CssClasses_={INPUT:"mdl-icon-toggle__input",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-icon-toggle__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},_.prototype.onChange_=function(e){this.updateClasses_()},_.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},_.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},_.prototype.onMouseUp_=function(e){this.blur_()},_.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},_.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},_.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},_.prototype.checkToggleState=_.prototype.checkToggleState,_.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},_.prototype.checkDisabled=_.prototype.checkDisabled,_.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},_.prototype.disable=_.prototype.disable,_.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},_.prototype.enable=_.prototype.enable,_.prototype.check=function(){this.inputElement_.checked=!0,this.updateClasses_()},_.prototype.check=_.prototype.check,_.prototype.uncheck=function(){this.inputElement_.checked=!1,this.updateClasses_()},_.prototype.uncheck=_.prototype.uncheck,_.prototype.init=function(){if(this.element_){if(this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.boundRippleMouseUp=this.onMouseUp_.bind(this),this.rippleContainerElement_.addEventListener("mouseup",this.boundRippleMouseUp);var e=document.createElement("span");e.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(e),this.element_.appendChild(this.rippleContainerElement_)}this.boundInputOnChange=this.onChange_.bind(this),this.boundInputOnFocus=this.onFocus_.bind(this),this.boundInputOnBlur=this.onBlur_.bind(this),this.boundElementOnMouseUp=this.onMouseUp_.bind(this),this.inputElement_.addEventListener("change",this.boundInputOnChange),this.inputElement_.addEventListener("focus",this.boundInputOnFocus),this.inputElement_.addEventListener("blur",this.boundInputOnBlur),this.element_.addEventListener("mouseup",this.boundElementOnMouseUp),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},s.register({constructor:_,classAsString:"MaterialIconToggle",cssClass:"mdl-js-icon-toggle",widget:!0});var d=function(e){this.element_=e,this.init()};window.MaterialMenu=d,d.prototype.Constant_={TRANSITION_DURATION_SECONDS:.3,TRANSITION_DURATION_FRACTION:.8,CLOSE_TIMEOUT:150},d.prototype.Keycodes_={ENTER:13,ESCAPE:27,SPACE:32,UP_ARROW:38,DOWN_ARROW:40},d.prototype.CssClasses_={CONTAINER:"mdl-menu__container",OUTLINE:"mdl-menu__outline",ITEM:"mdl-menu__item",ITEM_RIPPLE_CONTAINER:"mdl-menu__item-ripple-container",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_UPGRADED:"is-upgraded",IS_VISIBLE:"is-visible",IS_ANIMATING:"is-animating",BOTTOM_LEFT:"mdl-menu--bottom-left",BOTTOM_RIGHT:"mdl-menu--bottom-right",TOP_LEFT:"mdl-menu--top-left",TOP_RIGHT:"mdl-menu--top-right",UNALIGNED:"mdl-menu--unaligned"},d.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_),this.container_=e;var t=document.createElement("div");t.classList.add(this.CssClasses_.OUTLINE),this.outline_=t,e.insertBefore(t,this.element_);var s=this.element_.getAttribute("for")||this.element_.getAttribute("data-mdl-for"),i=null;s&&(i=document.getElementById(s),i&&(this.forElement_=i,i.addEventListener("click",this.handleForClick_.bind(this)),i.addEventListener("keydown",this.handleForKeyboardEvent_.bind(this))));var n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM);this.boundItemKeydown_=this.handleItemKeyboardEvent_.bind(this),this.boundItemClick_=this.handleItemClick_.bind(this);for(var a=0;a<n.length;a++)n[a].addEventListener("click",this.boundItemClick_),n[a].tabIndex="-1",n[a].addEventListener("keydown",this.boundItemKeydown_);if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))for(this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),a=0;a<n.length;a++){var l=n[a],o=document.createElement("span");o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);var r=document.createElement("span");r.classList.add(this.CssClasses_.RIPPLE),o.appendChild(r),l.appendChild(o),l.classList.add(this.CssClasses_.RIPPLE_EFFECT)}this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT),this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)&&this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT),this.element_.classList.contains(this.CssClasses_.TOP_LEFT)&&this.outline_.classList.add(this.CssClasses_.TOP_LEFT),this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)&&this.outline_.classList.add(this.CssClasses_.TOP_RIGHT),this.element_.classList.contains(this.CssClasses_.UNALIGNED)&&this.outline_.classList.add(this.CssClasses_.UNALIGNED),e.classList.add(this.CssClasses_.IS_UPGRADED)}},d.prototype.handleForClick_=function(e){if(this.element_&&this.forElement_){var t=this.forElement_.getBoundingClientRect(),s=this.forElement_.parentElement.getBoundingClientRect();this.element_.classList.contains(this.CssClasses_.UNALIGNED)||(this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?(this.container_.style.right=s.right-t.right+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"):this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.bottom=s.bottom-t.top+"px"):this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(this.container_.style.right=s.right-t.right+"px",this.container_.style.bottom=s.bottom-t.top+"px"):(this.container_.style.left=this.forElement_.offsetLeft+"px",this.container_.style.top=this.forElement_.offsetTop+this.forElement_.offsetHeight+"px"))}this.toggle(e)},d.prototype.handleForKeyboardEvent_=function(e){if(this.element_&&this.container_&&this.forElement_){var t=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");t&&t.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)&&(e.keyCode===this.Keycodes_.UP_ARROW?(e.preventDefault(),t[t.length-1].focus()):e.keyCode===this.Keycodes_.DOWN_ARROW&&(e.preventDefault(),t[0].focus()))}},d.prototype.handleItemKeyboardEvent_=function(e){if(this.element_&&this.container_){var t=this.element_.querySelectorAll("."+this.CssClasses_.ITEM+":not([disabled])");if(t&&t.length>0&&this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)){var s=Array.prototype.slice.call(t).indexOf(e.target);if(e.keyCode===this.Keycodes_.UP_ARROW)e.preventDefault(),s>0?t[s-1].focus():t[t.length-1].focus();else if(e.keyCode===this.Keycodes_.DOWN_ARROW)e.preventDefault(),t.length>s+1?t[s+1].focus():t[0].focus();else if(e.keyCode===this.Keycodes_.SPACE||e.keyCode===this.Keycodes_.ENTER){e.preventDefault();var i=new MouseEvent("mousedown");e.target.dispatchEvent(i),i=new MouseEvent("mouseup"),e.target.dispatchEvent(i),e.target.click()}else e.keyCode===this.Keycodes_.ESCAPE&&(e.preventDefault(),this.hide())}}},d.prototype.handleItemClick_=function(e){e.target.hasAttribute("disabled")?e.stopPropagation():(this.closing_=!0,window.setTimeout(function(e){this.hide(),this.closing_=!1}.bind(this),this.Constant_.CLOSE_TIMEOUT))},d.prototype.applyClip_=function(e,t){this.element_.classList.contains(this.CssClasses_.UNALIGNED)?this.element_.style.clip="":this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)?this.element_.style.clip="rect(0 "+t+"px 0 "+t+"px)":this.element_.classList.contains(this.CssClasses_.TOP_LEFT)?this.element_.style.clip="rect("+e+"px 0 "+e+"px 0)":this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?this.element_.style.clip="rect("+e+"px "+t+"px "+e+"px "+t+"px)":this.element_.style.clip=""},d.prototype.removeAnimationEndListener_=function(e){e.target.classList.remove(d.prototype.CssClasses_.IS_ANIMATING)},d.prototype.addAnimationEndListener_=function(){this.element_.addEventListener("transitionend",this.removeAnimationEndListener_),this.element_.addEventListener("webkitTransitionEnd",this.removeAnimationEndListener_)},d.prototype.show=function(e){if(this.element_&&this.container_&&this.outline_){var t=this.element_.getBoundingClientRect().height,s=this.element_.getBoundingClientRect().width;this.container_.style.width=s+"px",this.container_.style.height=t+"px",this.outline_.style.width=s+"px",this.outline_.style.height=t+"px";for(var i=this.Constant_.TRANSITION_DURATION_SECONDS*this.Constant_.TRANSITION_DURATION_FRACTION,n=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),a=0;a<n.length;a++){var l=null;l=this.element_.classList.contains(this.CssClasses_.TOP_LEFT)||this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)?(t-n[a].offsetTop-n[a].offsetHeight)/t*i+"s":n[a].offsetTop/t*i+"s",n[a].style.transitionDelay=l}this.applyClip_(t,s),window.requestAnimationFrame(function(){this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.element_.style.clip="rect(0 "+s+"px "+t+"px 0)",this.container_.classList.add(this.CssClasses_.IS_VISIBLE)}.bind(this)),this.addAnimationEndListener_();var o=function(t){t===e||this.closing_||t.target.parentNode===this.element_||(document.removeEventListener("click",o),this.hide())}.bind(this);document.addEventListener("click",o)}},d.prototype.show=d.prototype.show,d.prototype.hide=function(){if(this.element_&&this.container_&&this.outline_){for(var e=this.element_.querySelectorAll("."+this.CssClasses_.ITEM),t=0;t<e.length;t++)e[t].style.removeProperty("transition-delay");var s=this.element_.getBoundingClientRect(),i=s.height,n=s.width;this.element_.classList.add(this.CssClasses_.IS_ANIMATING),this.applyClip_(i,n),this.container_.classList.remove(this.CssClasses_.IS_VISIBLE),this.addAnimationEndListener_()}},d.prototype.hide=d.prototype.hide,d.prototype.toggle=function(e){this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)?this.hide():this.show(e)},d.prototype.toggle=d.prototype.toggle,s.register({constructor:d,classAsString:"MaterialMenu",cssClass:"mdl-js-menu",widget:!0});var h=function(e){this.element_=e,this.init()};window.MaterialProgress=h,h.prototype.Constant_={},h.prototype.CssClasses_={INDETERMINATE_CLASS:"mdl-progress__indeterminate"},h.prototype.setProgress=function(e){this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)||(this.progressbar_.style.width=e+"%")},h.prototype.setProgress=h.prototype.setProgress,h.prototype.setBuffer=function(e){this.bufferbar_.style.width=e+"%",this.auxbar_.style.width=100-e+"%"},h.prototype.setBuffer=h.prototype.setBuffer,h.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.className="progressbar bar bar1",this.element_.appendChild(e),this.progressbar_=e,e=document.createElement("div"),e.className="bufferbar bar bar2",this.element_.appendChild(e),this.bufferbar_=e,e=document.createElement("div"),e.className="auxbar bar bar3",this.element_.appendChild(e),this.auxbar_=e,this.progressbar_.style.width="0%",this.bufferbar_.style.width="100%",this.auxbar_.style.width="0%",this.element_.classList.add("is-upgraded")}},s.register({constructor:h,classAsString:"MaterialProgress",cssClass:"mdl-js-progress",widget:!0});var c=function(e){this.element_=e,this.init()};window.MaterialRadio=c,c.prototype.Constant_={TINY_TIMEOUT:.001},c.prototype.CssClasses_={IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked",IS_UPGRADED:"is-upgraded",JS_RADIO:"mdl-js-radio",RADIO_BTN:"mdl-radio__button",RADIO_OUTER_CIRCLE:"mdl-radio__outer-circle",RADIO_INNER_CIRCLE:"mdl-radio__inner-circle",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-radio__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple"},c.prototype.onChange_=function(e){for(var t=document.getElementsByClassName(this.CssClasses_.JS_RADIO),s=0;s<t.length;s++){var i=t[s].querySelector("."+this.CssClasses_.RADIO_BTN);i.getAttribute("name")===this.btnElement_.getAttribute("name")&&t[s].MaterialRadio.updateClasses_()}},c.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},c.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},c.prototype.onMouseup_=function(e){this.blur_()},c.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},c.prototype.blur_=function(){window.setTimeout(function(){this.btnElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},c.prototype.checkDisabled=function(){this.btnElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},c.prototype.checkDisabled=c.prototype.checkDisabled,c.prototype.checkToggleState=function(){this.btnElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},c.prototype.checkToggleState=c.prototype.checkToggleState,c.prototype.disable=function(){this.btnElement_.disabled=!0,this.updateClasses_()},c.prototype.disable=c.prototype.disable,c.prototype.enable=function(){this.btnElement_.disabled=!1,this.updateClasses_()},c.prototype.enable=c.prototype.enable,c.prototype.check=function(){this.btnElement_.checked=!0,this.updateClasses_()},c.prototype.check=c.prototype.check,c.prototype.uncheck=function(){this.btnElement_.checked=!1,this.updateClasses_()},c.prototype.uncheck=c.prototype.uncheck,c.prototype.init=function(){if(this.element_){this.btnElement_=this.element_.querySelector("."+this.CssClasses_.RADIO_BTN),this.boundChangeHandler_=this.onChange_.bind(this),this.boundFocusHandler_=this.onChange_.bind(this),this.boundBlurHandler_=this.onBlur_.bind(this),this.boundMouseUpHandler_=this.onMouseup_.bind(this);var e=document.createElement("span");e.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);var t=document.createElement("span");t.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE),this.element_.appendChild(e),this.element_.appendChild(t);var s;if(this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),s=document.createElement("span"),s.classList.add(this.CssClasses_.RIPPLE_CONTAINER),s.classList.add(this.CssClasses_.RIPPLE_EFFECT),s.classList.add(this.CssClasses_.RIPPLE_CENTER),s.addEventListener("mouseup",this.boundMouseUpHandler_);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),s.appendChild(i),this.element_.appendChild(s)}this.btnElement_.addEventListener("change",this.boundChangeHandler_),this.btnElement_.addEventListener("focus",this.boundFocusHandler_),this.btnElement_.addEventListener("blur",this.boundBlurHandler_),this.element_.addEventListener("mouseup",this.boundMouseUpHandler_),this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:c,classAsString:"MaterialRadio",cssClass:"mdl-js-radio",widget:!0});var p=function(e){this.element_=e,this.isIE_=window.navigator.msPointerEnabled,this.init()};window.MaterialSlider=p,p.prototype.Constant_={},p.prototype.CssClasses_={IE_CONTAINER:"mdl-slider__ie-container",SLIDER_CONTAINER:"mdl-slider__container",BACKGROUND_FLEX:"mdl-slider__background-flex",BACKGROUND_LOWER:"mdl-slider__background-lower",BACKGROUND_UPPER:"mdl-slider__background-upper",IS_LOWEST_VALUE:"is-lowest-value",IS_UPGRADED:"is-upgraded"},p.prototype.onInput_=function(e){this.updateValueStyles_()},p.prototype.onChange_=function(e){this.updateValueStyles_()},p.prototype.onMouseUp_=function(e){e.target.blur()},p.prototype.onContainerMouseDown_=function(e){if(e.target===this.element_.parentElement){e.preventDefault();var t=new MouseEvent("mousedown",{target:e.target,buttons:e.buttons,clientX:e.clientX,clientY:this.element_.getBoundingClientRect().y});this.element_.dispatchEvent(t)}},p.prototype.updateValueStyles_=function(){var e=(this.element_.value-this.element_.min)/(this.element_.max-this.element_.min);0===e?this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE):this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE),this.isIE_||(this.backgroundLower_.style.flex=e,this.backgroundLower_.style.webkitFlex=e,this.backgroundUpper_.style.flex=1-e,this.backgroundUpper_.style.webkitFlex=1-e)},p.prototype.disable=function(){this.element_.disabled=!0},p.prototype.disable=p.prototype.disable,p.prototype.enable=function(){this.element_.disabled=!1},p.prototype.enable=p.prototype.enable,p.prototype.change=function(e){"undefined"!=typeof e&&(this.element_.value=e),this.updateValueStyles_()},p.prototype.change=p.prototype.change,p.prototype.init=function(){if(this.element_){if(this.isIE_){var e=document.createElement("div");e.classList.add(this.CssClasses_.IE_CONTAINER),this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_)}else{var t=document.createElement("div");t.classList.add(this.CssClasses_.SLIDER_CONTAINER),this.element_.parentElement.insertBefore(t,this.element_),this.element_.parentElement.removeChild(this.element_),t.appendChild(this.element_);var s=document.createElement("div");s.classList.add(this.CssClasses_.BACKGROUND_FLEX),t.appendChild(s),this.backgroundLower_=document.createElement("div"),this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER),s.appendChild(this.backgroundLower_),this.backgroundUpper_=document.createElement("div"),this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER),s.appendChild(this.backgroundUpper_)}this.boundInputHandler=this.onInput_.bind(this),this.boundChangeHandler=this.onChange_.bind(this),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.boundContainerMouseDownHandler=this.onContainerMouseDown_.bind(this),this.element_.addEventListener("input",this.boundInputHandler),this.element_.addEventListener("change",this.boundChangeHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.element_.parentElement.addEventListener("mousedown",this.boundContainerMouseDownHandler),this.updateValueStyles_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},s.register({constructor:p,classAsString:"MaterialSlider",cssClass:"mdl-js-slider",widget:!0});var C=function(e){if(this.element_=e,this.textElement_=this.element_.querySelector("."+this.cssClasses_.MESSAGE),this.actionElement_=this.element_.querySelector("."+this.cssClasses_.ACTION),!this.textElement_)throw new Error("There must be a message element for a snackbar.");if(!this.actionElement_)throw new Error("There must be an action element for a snackbar.");this.active=!1,this.actionHandler_=void 0,this.message_=void 0,this.actionText_=void 0,this.queuedNotifications_=[],this.setActionHidden_(!0)};window.MaterialSnackbar=C,C.prototype.Constant_={ANIMATION_LENGTH:250},C.prototype.cssClasses_={SNACKBAR:"mdl-snackbar",MESSAGE:"mdl-snackbar__text",ACTION:"mdl-snackbar__action",ACTIVE:"mdl-snackbar--active"},C.prototype.displaySnackbar_=function(){this.element_.setAttribute("aria-hidden","true"),this.actionHandler_&&(this.actionElement_.textContent=this.actionText_,this.actionElement_.addEventListener("click",this.actionHandler_),
	this.setActionHidden_(!1)),this.textElement_.textContent=this.message_,this.element_.classList.add(this.cssClasses_.ACTIVE),this.element_.setAttribute("aria-hidden","false"),setTimeout(this.cleanup_.bind(this),this.timeout_)},C.prototype.showSnackbar=function(e){if(void 0===e)throw new Error("Please provide a data object with at least a message to display.");if(void 0===e.message)throw new Error("Please provide a message to be displayed.");if(e.actionHandler&&!e.actionText)throw new Error("Please provide action text with the handler.");this.active?this.queuedNotifications_.push(e):(this.active=!0,this.message_=e.message,e.timeout?this.timeout_=e.timeout:this.timeout_=2750,e.actionHandler&&(this.actionHandler_=e.actionHandler),e.actionText&&(this.actionText_=e.actionText),this.displaySnackbar_())},C.prototype.showSnackbar=C.prototype.showSnackbar,C.prototype.checkQueue_=function(){this.queuedNotifications_.length>0&&this.showSnackbar(this.queuedNotifications_.shift())},C.prototype.cleanup_=function(){this.element_.classList.remove(this.cssClasses_.ACTIVE),setTimeout(function(){this.element_.setAttribute("aria-hidden","true"),this.textElement_.textContent="",Boolean(this.actionElement_.getAttribute("aria-hidden"))||(this.setActionHidden_(!0),this.actionElement_.textContent="",this.actionElement_.removeEventListener("click",this.actionHandler_)),this.actionHandler_=void 0,this.message_=void 0,this.actionText_=void 0,this.active=!1,this.checkQueue_()}.bind(this),this.Constant_.ANIMATION_LENGTH)},C.prototype.setActionHidden_=function(e){e?this.actionElement_.setAttribute("aria-hidden","true"):this.actionElement_.removeAttribute("aria-hidden")},s.register({constructor:C,classAsString:"MaterialSnackbar",cssClass:"mdl-js-snackbar",widget:!0});var u=function(e){this.element_=e,this.init()};window.MaterialSpinner=u,u.prototype.Constant_={MDL_SPINNER_LAYER_COUNT:4},u.prototype.CssClasses_={MDL_SPINNER_LAYER:"mdl-spinner__layer",MDL_SPINNER_CIRCLE_CLIPPER:"mdl-spinner__circle-clipper",MDL_SPINNER_CIRCLE:"mdl-spinner__circle",MDL_SPINNER_GAP_PATCH:"mdl-spinner__gap-patch",MDL_SPINNER_LEFT:"mdl-spinner__left",MDL_SPINNER_RIGHT:"mdl-spinner__right"},u.prototype.createLayer=function(e){var t=document.createElement("div");t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER),t.classList.add(this.CssClasses_.MDL_SPINNER_LAYER+"-"+e);var s=document.createElement("div");s.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),s.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);var i=document.createElement("div");i.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);var n=document.createElement("div");n.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER),n.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);for(var a=[s,i,n],l=0;l<a.length;l++){var o=document.createElement("div");o.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE),a[l].appendChild(o)}t.appendChild(s),t.appendChild(i),t.appendChild(n),this.element_.appendChild(t)},u.prototype.createLayer=u.prototype.createLayer,u.prototype.stop=function(){this.element_.classList.remove("is-active")},u.prototype.stop=u.prototype.stop,u.prototype.start=function(){this.element_.classList.add("is-active")},u.prototype.start=u.prototype.start,u.prototype.init=function(){if(this.element_){for(var e=1;e<=this.Constant_.MDL_SPINNER_LAYER_COUNT;e++)this.createLayer(e);this.element_.classList.add("is-upgraded")}},s.register({constructor:u,classAsString:"MaterialSpinner",cssClass:"mdl-js-spinner",widget:!0});var E=function(e){this.element_=e,this.init()};window.MaterialSwitch=E,E.prototype.Constant_={TINY_TIMEOUT:.001},E.prototype.CssClasses_={INPUT:"mdl-switch__input",TRACK:"mdl-switch__track",THUMB:"mdl-switch__thumb",FOCUS_HELPER:"mdl-switch__focus-helper",RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE_CONTAINER:"mdl-switch__ripple-container",RIPPLE_CENTER:"mdl-ripple--center",RIPPLE:"mdl-ripple",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_CHECKED:"is-checked"},E.prototype.onChange_=function(e){this.updateClasses_()},E.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},E.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},E.prototype.onMouseUp_=function(e){this.blur_()},E.prototype.updateClasses_=function(){this.checkDisabled(),this.checkToggleState()},E.prototype.blur_=function(){window.setTimeout(function(){this.inputElement_.blur()}.bind(this),this.Constant_.TINY_TIMEOUT)},E.prototype.checkDisabled=function(){this.inputElement_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},E.prototype.checkDisabled=E.prototype.checkDisabled,E.prototype.checkToggleState=function(){this.inputElement_.checked?this.element_.classList.add(this.CssClasses_.IS_CHECKED):this.element_.classList.remove(this.CssClasses_.IS_CHECKED)},E.prototype.checkToggleState=E.prototype.checkToggleState,E.prototype.disable=function(){this.inputElement_.disabled=!0,this.updateClasses_()},E.prototype.disable=E.prototype.disable,E.prototype.enable=function(){this.inputElement_.disabled=!1,this.updateClasses_()},E.prototype.enable=E.prototype.enable,E.prototype.on=function(){this.inputElement_.checked=!0,this.updateClasses_()},E.prototype.on=E.prototype.on,E.prototype.off=function(){this.inputElement_.checked=!1,this.updateClasses_()},E.prototype.off=E.prototype.off,E.prototype.init=function(){if(this.element_){this.inputElement_=this.element_.querySelector("."+this.CssClasses_.INPUT);var e=document.createElement("div");e.classList.add(this.CssClasses_.TRACK);var t=document.createElement("div");t.classList.add(this.CssClasses_.THUMB);var s=document.createElement("span");if(s.classList.add(this.CssClasses_.FOCUS_HELPER),t.appendChild(s),this.element_.appendChild(e),this.element_.appendChild(t),this.boundMouseUpHandler=this.onMouseUp_.bind(this),this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)){this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS),this.rippleContainerElement_=document.createElement("span"),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT),this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER),this.rippleContainerElement_.addEventListener("mouseup",this.boundMouseUpHandler);var i=document.createElement("span");i.classList.add(this.CssClasses_.RIPPLE),this.rippleContainerElement_.appendChild(i),this.element_.appendChild(this.rippleContainerElement_)}this.boundChangeHandler=this.onChange_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.inputElement_.addEventListener("change",this.boundChangeHandler),this.inputElement_.addEventListener("focus",this.boundFocusHandler),this.inputElement_.addEventListener("blur",this.boundBlurHandler),this.element_.addEventListener("mouseup",this.boundMouseUpHandler),this.updateClasses_(),this.element_.classList.add("is-upgraded")}},s.register({constructor:E,classAsString:"MaterialSwitch",cssClass:"mdl-js-switch",widget:!0});var m=function(e){this.element_=e,this.init()};window.MaterialTabs=m,m.prototype.Constant_={},m.prototype.CssClasses_={TAB_CLASS:"mdl-tabs__tab",PANEL_CLASS:"mdl-tabs__panel",ACTIVE_CLASS:"is-active",UPGRADED_CLASS:"is-upgraded",MDL_JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",MDL_RIPPLE_CONTAINER:"mdl-tabs__ripple-container",MDL_RIPPLE:"mdl-ripple",MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events"},m.prototype.initTabs_=function(){this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)&&this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS),this.tabs_=this.element_.querySelectorAll("."+this.CssClasses_.TAB_CLASS),this.panels_=this.element_.querySelectorAll("."+this.CssClasses_.PANEL_CLASS);for(var t=0;t<this.tabs_.length;t++)new e(this.tabs_[t],this);this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS)},m.prototype.resetTabState_=function(){for(var e=0;e<this.tabs_.length;e++)this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},m.prototype.resetPanelState_=function(){for(var e=0;e<this.panels_.length;e++)this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS)},m.prototype.init=function(){this.element_&&this.initTabs_()},s.register({constructor:m,classAsString:"MaterialTabs",cssClass:"mdl-js-tabs"});var L=function(e){this.element_=e,this.maxRows=this.Constant_.NO_MAX_ROWS,this.init()};window.MaterialTextfield=L,L.prototype.Constant_={NO_MAX_ROWS:-1,MAX_ROWS_ATTRIBUTE:"maxrows"},L.prototype.CssClasses_={LABEL:"mdl-textfield__label",INPUT:"mdl-textfield__input",IS_DIRTY:"is-dirty",IS_FOCUSED:"is-focused",IS_DISABLED:"is-disabled",IS_INVALID:"is-invalid",IS_UPGRADED:"is-upgraded",HAS_PLACEHOLDER:"has-placeholder"},L.prototype.onKeyDown_=function(e){var t=e.target.value.split("\n").length;13===e.keyCode&&t>=this.maxRows&&e.preventDefault()},L.prototype.onFocus_=function(e){this.element_.classList.add(this.CssClasses_.IS_FOCUSED)},L.prototype.onBlur_=function(e){this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},L.prototype.onReset_=function(e){this.updateClasses_()},L.prototype.updateClasses_=function(){this.checkDisabled(),this.checkValidity(),this.checkDirty(),this.checkFocus()},L.prototype.checkDisabled=function(){this.input_.disabled?this.element_.classList.add(this.CssClasses_.IS_DISABLED):this.element_.classList.remove(this.CssClasses_.IS_DISABLED)},L.prototype.checkDisabled=L.prototype.checkDisabled,L.prototype.checkFocus=function(){Boolean(this.element_.querySelector(":focus"))?this.element_.classList.add(this.CssClasses_.IS_FOCUSED):this.element_.classList.remove(this.CssClasses_.IS_FOCUSED)},L.prototype.checkFocus=L.prototype.checkFocus,L.prototype.checkValidity=function(){this.input_.validity&&(this.input_.validity.valid?this.element_.classList.remove(this.CssClasses_.IS_INVALID):this.element_.classList.add(this.CssClasses_.IS_INVALID))},L.prototype.checkValidity=L.prototype.checkValidity,L.prototype.checkDirty=function(){this.input_.value&&this.input_.value.length>0?this.element_.classList.add(this.CssClasses_.IS_DIRTY):this.element_.classList.remove(this.CssClasses_.IS_DIRTY)},L.prototype.checkDirty=L.prototype.checkDirty,L.prototype.disable=function(){this.input_.disabled=!0,this.updateClasses_()},L.prototype.disable=L.prototype.disable,L.prototype.enable=function(){this.input_.disabled=!1,this.updateClasses_()},L.prototype.enable=L.prototype.enable,L.prototype.change=function(e){this.input_.value=e||"",this.updateClasses_()},L.prototype.change=L.prototype.change,L.prototype.init=function(){if(this.element_&&(this.label_=this.element_.querySelector("."+this.CssClasses_.LABEL),this.input_=this.element_.querySelector("."+this.CssClasses_.INPUT),this.input_)){this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)&&(this.maxRows=parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE),10),isNaN(this.maxRows)&&(this.maxRows=this.Constant_.NO_MAX_ROWS)),this.input_.hasAttribute("placeholder")&&this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER),this.boundUpdateClassesHandler=this.updateClasses_.bind(this),this.boundFocusHandler=this.onFocus_.bind(this),this.boundBlurHandler=this.onBlur_.bind(this),this.boundResetHandler=this.onReset_.bind(this),this.input_.addEventListener("input",this.boundUpdateClassesHandler),this.input_.addEventListener("focus",this.boundFocusHandler),this.input_.addEventListener("blur",this.boundBlurHandler),this.input_.addEventListener("reset",this.boundResetHandler),this.maxRows!==this.Constant_.NO_MAX_ROWS&&(this.boundKeyDownHandler=this.onKeyDown_.bind(this),this.input_.addEventListener("keydown",this.boundKeyDownHandler));var e=this.element_.classList.contains(this.CssClasses_.IS_INVALID);this.updateClasses_(),this.element_.classList.add(this.CssClasses_.IS_UPGRADED),e&&this.element_.classList.add(this.CssClasses_.IS_INVALID),this.input_.hasAttribute("autofocus")&&(this.element_.focus(),this.checkFocus())}},s.register({constructor:L,classAsString:"MaterialTextfield",cssClass:"mdl-js-textfield",widget:!0});var I=function(e){this.element_=e,this.init()};window.MaterialTooltip=I,I.prototype.Constant_={},I.prototype.CssClasses_={IS_ACTIVE:"is-active",BOTTOM:"mdl-tooltip--bottom",LEFT:"mdl-tooltip--left",RIGHT:"mdl-tooltip--right",TOP:"mdl-tooltip--top"},I.prototype.handleMouseEnter_=function(e){var t=e.target.getBoundingClientRect(),s=t.left+t.width/2,i=t.top+t.height/2,n=-1*(this.element_.offsetWidth/2),a=-1*(this.element_.offsetHeight/2);this.element_.classList.contains(this.CssClasses_.LEFT)||this.element_.classList.contains(this.CssClasses_.RIGHT)?(s=t.width/2,0>i+a?(this.element_.style.top=0,this.element_.style.marginTop=0):(this.element_.style.top=i+"px",this.element_.style.marginTop=a+"px")):0>s+n?(this.element_.style.left=0,this.element_.style.marginLeft=0):(this.element_.style.left=s+"px",this.element_.style.marginLeft=n+"px"),this.element_.classList.contains(this.CssClasses_.TOP)?this.element_.style.top=t.top-this.element_.offsetHeight-10+"px":this.element_.classList.contains(this.CssClasses_.RIGHT)?this.element_.style.left=t.left+t.width+10+"px":this.element_.classList.contains(this.CssClasses_.LEFT)?this.element_.style.left=t.left-this.element_.offsetWidth-10+"px":this.element_.style.top=t.top+t.height+10+"px",this.element_.classList.add(this.CssClasses_.IS_ACTIVE)},I.prototype.handleMouseLeave_=function(){this.element_.classList.remove(this.CssClasses_.IS_ACTIVE)},I.prototype.init=function(){if(this.element_){var e=this.element_.getAttribute("for");e&&(this.forElement_=document.getElementById(e)),this.forElement_&&(this.forElement_.hasAttribute("tabindex")||this.forElement_.setAttribute("tabindex","0"),this.boundMouseEnterHandler=this.handleMouseEnter_.bind(this),this.boundMouseLeaveHandler=this.handleMouseLeave_.bind(this),this.forElement_.addEventListener("mouseenter",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("touchend",this.boundMouseEnterHandler,!1),this.forElement_.addEventListener("mouseleave",this.boundMouseLeaveHandler,!1),window.addEventListener("touchstart",this.boundMouseLeaveHandler))}},s.register({constructor:I,classAsString:"MaterialTooltip",cssClass:"mdl-tooltip"});var f=function(e){this.element_=e,this.init()};window.MaterialLayout=f,f.prototype.Constant_={MAX_WIDTH:"(max-width: 1024px)",TAB_SCROLL_PIXELS:100,RESIZE_TIMEOUT:100,MENU_ICON:"&#xE5D2;",CHEVRON_LEFT:"chevron_left",CHEVRON_RIGHT:"chevron_right"},f.prototype.Keycodes_={ENTER:13,ESCAPE:27,SPACE:32},f.prototype.Mode_={STANDARD:0,SEAMED:1,WATERFALL:2,SCROLL:3},f.prototype.CssClasses_={CONTAINER:"mdl-layout__container",HEADER:"mdl-layout__header",DRAWER:"mdl-layout__drawer",CONTENT:"mdl-layout__content",DRAWER_BTN:"mdl-layout__drawer-button",ICON:"material-icons",JS_RIPPLE_EFFECT:"mdl-js-ripple-effect",RIPPLE_CONTAINER:"mdl-layout__tab-ripple-container",RIPPLE:"mdl-ripple",RIPPLE_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",HEADER_SEAMED:"mdl-layout__header--seamed",HEADER_WATERFALL:"mdl-layout__header--waterfall",HEADER_SCROLL:"mdl-layout__header--scroll",FIXED_HEADER:"mdl-layout--fixed-header",OBFUSCATOR:"mdl-layout__obfuscator",TAB_BAR:"mdl-layout__tab-bar",TAB_CONTAINER:"mdl-layout__tab-bar-container",TAB:"mdl-layout__tab",TAB_BAR_BUTTON:"mdl-layout__tab-bar-button",TAB_BAR_LEFT_BUTTON:"mdl-layout__tab-bar-left-button",TAB_BAR_RIGHT_BUTTON:"mdl-layout__tab-bar-right-button",PANEL:"mdl-layout__tab-panel",HAS_DRAWER:"has-drawer",HAS_TABS:"has-tabs",HAS_SCROLLING_HEADER:"has-scrolling-header",CASTING_SHADOW:"is-casting-shadow",IS_COMPACT:"is-compact",IS_SMALL_SCREEN:"is-small-screen",IS_DRAWER_OPEN:"is-visible",IS_ACTIVE:"is-active",IS_UPGRADED:"is-upgraded",IS_ANIMATING:"is-animating",ON_LARGE_SCREEN:"mdl-layout--large-screen-only",ON_SMALL_SCREEN:"mdl-layout--small-screen-only"},f.prototype.contentScrollHandler_=function(){if(!this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)){var e=!this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN)||this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);this.content_.scrollTop>0&&!this.header_.classList.contains(this.CssClasses_.IS_COMPACT)?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.header_.classList.add(this.CssClasses_.IS_COMPACT),e&&this.header_.classList.add(this.CssClasses_.IS_ANIMATING)):this.content_.scrollTop<=0&&this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.header_.classList.remove(this.CssClasses_.IS_COMPACT),e&&this.header_.classList.add(this.CssClasses_.IS_ANIMATING))}},f.prototype.keyboardEventHandler_=function(e){e.keyCode===this.Keycodes_.ESCAPE&&this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)&&this.toggleDrawer()},f.prototype.screenSizeHandler_=function(){this.screenSizeMediaQuery_.matches?this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN):(this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN),this.drawer_&&(this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN),this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN)))},f.prototype.drawerToggleHandler_=function(e){if(e&&"keydown"===e.type){if(e.keyCode!==this.Keycodes_.SPACE&&e.keyCode!==this.Keycodes_.ENTER)return;e.preventDefault()}this.toggleDrawer()},f.prototype.headerTransitionEndHandler_=function(){this.header_.classList.remove(this.CssClasses_.IS_ANIMATING)},f.prototype.headerClickHandler_=function(){this.header_.classList.contains(this.CssClasses_.IS_COMPACT)&&(this.header_.classList.remove(this.CssClasses_.IS_COMPACT),this.header_.classList.add(this.CssClasses_.IS_ANIMATING))},f.prototype.resetTabState_=function(e){for(var t=0;t<e.length;t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)},f.prototype.resetPanelState_=function(e){for(var t=0;t<e.length;t++)e[t].classList.remove(this.CssClasses_.IS_ACTIVE)},f.prototype.toggleDrawer=function(){var e=this.element_.querySelector("."+this.CssClasses_.DRAWER_BTN);this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)?(this.drawer_.setAttribute("aria-hidden","false"),e.setAttribute("aria-expanded","true")):(this.drawer_.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false"))},f.prototype.toggleDrawer=f.prototype.toggleDrawer,f.prototype.init=function(){if(this.element_){var e=document.createElement("div");e.classList.add(this.CssClasses_.CONTAINER);var s=this.element_.querySelector(":focus");this.element_.parentElement.insertBefore(e,this.element_),this.element_.parentElement.removeChild(this.element_),e.appendChild(this.element_),s&&s.focus();for(var i=this.element_.childNodes,n=i.length,a=0;n>a;a++){var l=i[a];l.classList&&l.classList.contains(this.CssClasses_.HEADER)&&(this.header_=l),l.classList&&l.classList.contains(this.CssClasses_.DRAWER)&&(this.drawer_=l),l.classList&&l.classList.contains(this.CssClasses_.CONTENT)&&(this.content_=l)}window.addEventListener("pageshow",function(e){e.persisted&&(this.element_.style.overflowY="hidden",requestAnimationFrame(function(){this.element_.style.overflowY=""}.bind(this)))}.bind(this),!1),this.header_&&(this.tabBar_=this.header_.querySelector("."+this.CssClasses_.TAB_BAR));var o=this.Mode_.STANDARD;if(this.header_&&(this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)?o=this.Mode_.SEAMED:this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)?(o=this.Mode_.WATERFALL,this.header_.addEventListener("transitionend",this.headerTransitionEndHandler_.bind(this)),this.header_.addEventListener("click",this.headerClickHandler_.bind(this))):this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL)&&(o=this.Mode_.SCROLL,e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)),o===this.Mode_.STANDARD?(this.header_.classList.add(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)):o===this.Mode_.SEAMED||o===this.Mode_.SCROLL?(this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW),this.tabBar_&&this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)):o===this.Mode_.WATERFALL&&(this.content_.addEventListener("scroll",this.contentScrollHandler_.bind(this)),this.contentScrollHandler_())),this.drawer_){var r=this.element_.querySelector("."+this.CssClasses_.DRAWER_BTN);if(!r){r=document.createElement("div"),r.setAttribute("aria-expanded","false"),r.setAttribute("role","button"),r.setAttribute("tabindex","0"),r.classList.add(this.CssClasses_.DRAWER_BTN);var _=document.createElement("i");_.classList.add(this.CssClasses_.ICON),_.innerHTML=this.Constant_.MENU_ICON,r.appendChild(_)}this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)?r.classList.add(this.CssClasses_.ON_LARGE_SCREEN):this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN)&&r.classList.add(this.CssClasses_.ON_SMALL_SCREEN),r.addEventListener("click",this.drawerToggleHandler_.bind(this)),r.addEventListener("keydown",this.drawerToggleHandler_.bind(this)),this.element_.classList.add(this.CssClasses_.HAS_DRAWER),this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)?this.header_.insertBefore(r,this.header_.firstChild):this.element_.insertBefore(r,this.content_);var d=document.createElement("div");d.classList.add(this.CssClasses_.OBFUSCATOR),this.element_.appendChild(d),d.addEventListener("click",this.drawerToggleHandler_.bind(this)),this.obfuscator_=d,this.drawer_.addEventListener("keydown",this.keyboardEventHandler_.bind(this)),this.drawer_.setAttribute("aria-hidden","true")}if(this.screenSizeMediaQuery_=window.matchMedia(this.Constant_.MAX_WIDTH),this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)),this.screenSizeHandler_(),this.header_&&this.tabBar_){this.element_.classList.add(this.CssClasses_.HAS_TABS);var h=document.createElement("div");h.classList.add(this.CssClasses_.TAB_CONTAINER),this.header_.insertBefore(h,this.tabBar_),this.header_.removeChild(this.tabBar_);var c=document.createElement("div");c.classList.add(this.CssClasses_.TAB_BAR_BUTTON),c.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);var p=document.createElement("i");p.classList.add(this.CssClasses_.ICON),p.textContent=this.Constant_.CHEVRON_LEFT,c.appendChild(p),c.addEventListener("click",function(){this.tabBar_.scrollLeft-=this.Constant_.TAB_SCROLL_PIXELS}.bind(this));var C=document.createElement("div");C.classList.add(this.CssClasses_.TAB_BAR_BUTTON),C.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);var u=document.createElement("i");u.classList.add(this.CssClasses_.ICON),u.textContent=this.Constant_.CHEVRON_RIGHT,C.appendChild(u),C.addEventListener("click",function(){this.tabBar_.scrollLeft+=this.Constant_.TAB_SCROLL_PIXELS}.bind(this)),h.appendChild(c),h.appendChild(this.tabBar_),h.appendChild(C);var E=function(){this.tabBar_.scrollLeft>0?c.classList.add(this.CssClasses_.IS_ACTIVE):c.classList.remove(this.CssClasses_.IS_ACTIVE),this.tabBar_.scrollLeft<this.tabBar_.scrollWidth-this.tabBar_.offsetWidth?C.classList.add(this.CssClasses_.IS_ACTIVE):C.classList.remove(this.CssClasses_.IS_ACTIVE)}.bind(this);this.tabBar_.addEventListener("scroll",E),E();var m=function(){this.resizeTimeoutId_&&clearTimeout(this.resizeTimeoutId_),this.resizeTimeoutId_=setTimeout(function(){E(),this.resizeTimeoutId_=null}.bind(this),this.Constant_.RESIZE_TIMEOUT)}.bind(this);window.addEventListener("resize",m),this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)&&this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);for(var L=this.tabBar_.querySelectorAll("."+this.CssClasses_.TAB),I=this.content_.querySelectorAll("."+this.CssClasses_.PANEL),f=0;f<L.length;f++)new t(L[f],L,I,this)}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}},window.MaterialLayoutTab=t,s.register({constructor:f,classAsString:"MaterialLayout",cssClass:"mdl-js-layout"});var b=function(e){this.element_=e,this.init()};window.MaterialDataTable=b,b.prototype.Constant_={},b.prototype.CssClasses_={DATA_TABLE:"mdl-data-table",SELECTABLE:"mdl-data-table--selectable",SELECT_ELEMENT:"mdl-data-table__select",IS_SELECTED:"is-selected",IS_UPGRADED:"is-upgraded"},b.prototype.selectRow_=function(e,t,s){return t?function(){e.checked?t.classList.add(this.CssClasses_.IS_SELECTED):t.classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):s?function(){var t,i;if(e.checked)for(t=0;t<s.length;t++)i=s[t].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.check(),s[t].classList.add(this.CssClasses_.IS_SELECTED);else for(t=0;t<s.length;t++)i=s[t].querySelector("td").querySelector(".mdl-checkbox"),i.MaterialCheckbox.uncheck(),s[t].classList.remove(this.CssClasses_.IS_SELECTED)}.bind(this):void 0},b.prototype.createCheckbox_=function(e,t){var i=document.createElement("label"),n=["mdl-checkbox","mdl-js-checkbox","mdl-js-ripple-effect",this.CssClasses_.SELECT_ELEMENT];i.className=n.join(" ");var a=document.createElement("input");return a.type="checkbox",a.classList.add("mdl-checkbox__input"),e?(a.checked=e.classList.contains(this.CssClasses_.IS_SELECTED),a.addEventListener("change",this.selectRow_(a,e))):t&&a.addEventListener("change",this.selectRow_(a,null,t)),i.appendChild(a),s.upgradeElement(i,"MaterialCheckbox"),i},b.prototype.init=function(){if(this.element_){var e=this.element_.querySelector("th"),t=Array.prototype.slice.call(this.element_.querySelectorAll("tbody tr")),s=Array.prototype.slice.call(this.element_.querySelectorAll("tfoot tr")),i=t.concat(s);if(this.element_.classList.contains(this.CssClasses_.SELECTABLE)){var n=document.createElement("th"),a=this.createCheckbox_(null,i);n.appendChild(a),e.parentElement.insertBefore(n,e);for(var l=0;l<i.length;l++){var o=i[l].querySelector("td");if(o){var r=document.createElement("td");if("TBODY"===i[l].parentNode.nodeName.toUpperCase()){var _=this.createCheckbox_(i[l]);r.appendChild(_)}i[l].insertBefore(r,o)}}this.element_.classList.add(this.CssClasses_.IS_UPGRADED)}}},s.register({constructor:b,classAsString:"MaterialDataTable",cssClass:"mdl-js-data-table"});var y=function(e){this.element_=e,this.init()};window.MaterialRipple=y,y.prototype.Constant_={INITIAL_SCALE:"scale(0.0001, 0.0001)",INITIAL_SIZE:"1px",INITIAL_OPACITY:"0.4",FINAL_OPACITY:"0",FINAL_SCALE:""},y.prototype.CssClasses_={RIPPLE_CENTER:"mdl-ripple--center",RIPPLE_EFFECT_IGNORE_EVENTS:"mdl-js-ripple-effect--ignore-events",RIPPLE:"mdl-ripple",IS_ANIMATING:"is-animating",IS_VISIBLE:"is-visible"},y.prototype.downHandler_=function(e){if(!this.rippleElement_.style.width&&!this.rippleElement_.style.height){var t=this.element_.getBoundingClientRect();this.boundHeight=t.height,this.boundWidth=t.width,this.rippleSize_=2*Math.sqrt(t.width*t.width+t.height*t.height)+2,this.rippleElement_.style.width=this.rippleSize_+"px",this.rippleElement_.style.height=this.rippleSize_+"px"}if(this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE),"mousedown"===e.type&&this.ignoringMouseDown_)this.ignoringMouseDown_=!1;else{"touchstart"===e.type&&(this.ignoringMouseDown_=!0);var s=this.getFrameCount();if(s>0)return;this.setFrameCount(1);var i,n,a=e.currentTarget.getBoundingClientRect();if(0===e.clientX&&0===e.clientY)i=Math.round(a.width/2),n=Math.round(a.height/2);else{var l=e.clientX?e.clientX:e.touches[0].clientX,o=e.clientY?e.clientY:e.touches[0].clientY;i=Math.round(l-a.left),n=Math.round(o-a.top)}this.setRippleXY(i,n),this.setRippleStyles(!0),window.requestAnimationFrame(this.animFrameHandler.bind(this))}},y.prototype.upHandler_=function(e){e&&2!==e.detail&&window.setTimeout(function(){this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE)}.bind(this),0)},y.prototype.init=function(){if(this.element_){var e=this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)||(this.rippleElement_=this.element_.querySelector("."+this.CssClasses_.RIPPLE),this.frameCount_=0,this.rippleSize_=0,this.x_=0,this.y_=0,this.ignoringMouseDown_=!1,this.boundDownHandler=this.downHandler_.bind(this),this.element_.addEventListener("mousedown",this.boundDownHandler),this.element_.addEventListener("touchstart",this.boundDownHandler),this.boundUpHandler=this.upHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundUpHandler),this.element_.addEventListener("mouseleave",this.boundUpHandler),this.element_.addEventListener("touchend",this.boundUpHandler),this.element_.addEventListener("blur",this.boundUpHandler),this.getFrameCount=function(){return this.frameCount_},this.setFrameCount=function(e){this.frameCount_=e},this.getRippleElement=function(){return this.rippleElement_},this.setRippleXY=function(e,t){this.x_=e,this.y_=t},this.setRippleStyles=function(t){if(null!==this.rippleElement_){var s,i,n,a="translate("+this.x_+"px, "+this.y_+"px)";t?(i=this.Constant_.INITIAL_SCALE,n=this.Constant_.INITIAL_SIZE):(i=this.Constant_.FINAL_SCALE,n=this.rippleSize_+"px",e&&(a="translate("+this.boundWidth/2+"px, "+this.boundHeight/2+"px)")),s="translate(-50%, -50%) "+a+i,this.rippleElement_.style.webkitTransform=s,this.rippleElement_.style.msTransform=s,this.rippleElement_.style.transform=s,t?this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING):this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING)}},this.animFrameHandler=function(){this.frameCount_-- >0?window.requestAnimationFrame(this.animFrameHandler.bind(this)):this.setRippleStyles(!1)})}},s.register({constructor:y,classAsString:"MaterialRipple",cssClass:"mdl-js-ripple-effect",widget:!1})}();
	//# sourceMappingURL=material.min.js.map


/***/ }
/******/ ])
});
;