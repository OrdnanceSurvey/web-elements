/// <reference path="../../../typings/main.d.ts" />


export interface IOsTab {
  ngLink: string;
  click(): void;
}

export class OsTab implements IOsTab {
    static $inject = ['$element', '$transclude'];

    ngLink: string;
    click;

    constructor(private $element: ng.IRootElementService, private $transclude: ng.ITranscludeFunction) {
    }
}

angular
    .module('osElements')
    .directive('osTabTransclude', function() {
        return {
            require: '^osTabs',
            link: function ($scope, $element, $attrs, fieldCtrl:OsTab) {
                $scope.osTab.$transclude(function (clone) {
                    $element.empty();
                    $element.append(clone);
                });
            }
        }
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
        template: `
           <md-tab label="{{osTab.label}}" ng-disabled="osTab.disabled" ng-click="osTab.ngClick()">
                <div os-tab-transclude=""></div>
           </md-tab>
        `
    });
