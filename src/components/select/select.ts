/// <reference path="../../../typings/main.d.ts" />

export class OsSelect {
  static $inject = ['$attrs'];

  constructor(private $attrs:ng.IAttributes) {

  }

  hasCloseExpression()  {
    return this.$attrs['osClear'];
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
            <md-select ng-disabled="osSelect.disabled" ng-model="osSelect.ngModel" aria-label="{{osSelect.ngModel[osSelect.displayField]}}" placeholder="{{ osSelect.placeholder }}">
                <md-option ng-value="option" ng-disabled="option.disabled" ng-repeat="option in osSelect.osItems">{{ option[osSelect.displayField] }}</md-option>
            </md-select>
            <os-button ng-if="osSelect.ngModel && osSelect.hasCloseExpression()" class="osSelect__cancel" ng-click="osSelect.clear({object: osSelect.ngModel})" variation="icon"><i class="material-icons">close</i></os-button>
        `
  });
