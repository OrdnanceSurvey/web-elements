/// <reference path="../../../typings/main.d.ts" />

export class OsSelect {
    static $inject = ['$element'];

    constructor($element: ng.IRootElementService) {
        console.log('OsSelect constructor');
    }
}

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
        template: `
            <md-select ng-disabled="osSelect.disabled" ng-model="osSelect.ngModel" placeholder="{{ osSelect.placeholder }}">
                <md-option ng-value="option" ng-repeat="option in osSelect.osItems">{{ option }}</md-option>
            </md-select>
        `
    });
