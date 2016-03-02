/// <reference path="../../../typings/main.d.ts" />


export interface IOsTab {
  ngLink: string;
  click(): void|boolean;
}

export class OsTab implements IOsTab {
    static $inject = ['$element', '$transclude', '$router'];

    ngLink: string;

    constructor(private $element: ng.IRootElementService, private $transclude: ng.ITranscludeFunction, private $router: any) {
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
            ngLink: '@?',
            ngClick: '&'
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
