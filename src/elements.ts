/// <reference path="../typings/main.d.ts" />

angular.module('osElements', ['ngMaterial', 'rx']).config(function($mdThemingProvider, $mdIconProvider) {
    this.$inject = ['$mdThemingProvider', '$mdIconProvider'];

    // theme
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

    // icons
    $mdIconProvider.defaultFontSet('material-icons')
});

export {OsButton} from './components/button/button.component';
export {OsSelect} from './components/select/select';
export {OsTabs} from './components/tabs/tabs';
export {OsTab} from './components/tabs/tab';
export {OsPopover} from './components/popup/popup';
export {OsModal} from './components/modal/modal';
export {OsAutocomplete} from './components/autocomplete/autocomplete';
export {PolygonTool} from './components/map-controls/drawing-tools';
export {MaxSize, ProjectionServiceProvider, PointerServiceProvider} from './components/map/map';
export {OsToolbar} from './components/toolbar/toolbar';
export {OsSlider} from './components/slider/slider';
export {OsHeader} from './components/header/header';
export {OsSearch} from './components/search/search';
export {OsZoombar} from './components/zoombar/zoombar';
