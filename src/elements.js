angular.module('osElements', ['ngMaterial']).config(function ($mdThemingProvider) {
    this.$inject = ['$mdThemingProvider'];
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
});
var button_component_1 = require('./components/button/button.component');
exports.OsButton = button_component_1.OsButton;
var select_1 = require('./components/select/select');
exports.OsSelect = select_1.OsSelect;
