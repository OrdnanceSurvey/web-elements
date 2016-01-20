/// <reference path="../../../typings/main.d.ts" />


export class OsTab {
    static $inject = ['$element', '$transclude'];

    $osTabTransclude;

    constructor($element: ng.IRootElementService, $transclude: ng.ITranscludeFunction) {
        this.$osTabTransclude = $transclude;
    }
}

angular
    .module('osElements')
    .directive('osTabTransclude', function() {
        return {
            require: '^osTabs',
            link: function ($scope, $element, $attrs, fieldCtrl:OsTab) {
                $scope.osTab.$osTabTransclude(function (clone) {
                    $element.empty();
                    $element.append(clone);
                });
            }
        }
    })
    .component('osTab', {
        bindings: {
            label: '@',
            disabled: '='
        },
        controller: OsTab,
        controllerAs: 'osTab',
        transclude: true,
        template: `
           <md-tab label="{{osTab.label}}" disabled="{{ osTabs.disabled }}">
                {{ osTabs.disabled | json }}
                <div os-tab-transclude=""></div>
           </md-tab>
        `
    });
