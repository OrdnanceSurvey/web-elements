/// <reference path="../../../typings/main.d.ts" />

export class OsSelect {
    static $inject = ['$element'];

    constructor($element: ng.IRootElementService) {

    }
}

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
        template: `
            <md-select ng-disabled="osSelect.disabled" ng-model="osSelect.ngModel" placeholder="{{ osSelect.placeholder }}">
                <md-option ng-value="option" ng-disabled="option.disabled" ng-repeat="option in osSelect.osItems">{{ option[osSelect.displayField] }}</md-option>
            </md-select>
            <span ng-if="osSelect.ngModel" class="osSelect__cancel" ng-click="osSelect.clear({object: osSelect.ngModel})"><i class="material-icons">close</i></span>
        `
    });
