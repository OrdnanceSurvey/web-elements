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
var button_component_1 = require('./components/button/button.component');
exports.OsButton = button_component_1.OsButton;
var select_1 = require('./components/select/select');
exports.OsSelect = select_1.OsSelect;
var tabs_1 = require('./components/tabs/tabs');
exports.OsTabs = tabs_1.OsTabs;
var tab_1 = require('./components/tabs/tab');
exports.OsTab = tab_1.OsTab;
var popup_1 = require('./components/popup/popup');
exports.OsPopover = popup_1.OsPopover;
var modal_1 = require('./components/modal/modal');
exports.OsModal = modal_1.OsModal;
var autocomplete_1 = require('./components/autocomplete/autocomplete');
exports.OsAutocomplete = autocomplete_1.OsAutocomplete;
var drawing_tools_1 = require('./components/map-controls/drawing-tools');
exports.PolygonTool = drawing_tools_1.PolygonTool;
var map_1 = require('./components/map/map');
exports.MaxSize = map_1.MaxSize;
var toolbar_1 = require('./components/toolbar/toolbar');
exports.OsToolbar = toolbar_1.OsToolbar;
var slider_1 = require('./components/slider/slider');
exports.OsSlider = slider_1.OsSlider;
var header_1 = require('./components/header/header');
exports.OsHeader = header_1.OsHeader;
var search_1 = require('./components/search/search');
exports.OsSearch = search_1.OsSearch;
