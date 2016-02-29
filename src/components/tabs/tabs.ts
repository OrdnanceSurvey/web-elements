/// <reference path="../../../typings/main.d.ts" />

export class OsTabs {
    static $inject = ['$element', '$transclude'];

    $transclude;
    mdDynamicHeight;

    constructor($element: ng.IRootElementService, $transclude: ng.ITranscludeFunction) {
        this.$transclude = $transclude;

        this.mdDynamicHeight = true;
    }
}

angular
    .module('osElements')
    .directive('osTabsTransclude', function() {
        return {
            require: '^osTabs',
            link: function ($scope, $element, $attrs, fieldCtrl:OsTabs) {
                fieldCtrl.$transclude(function (clone) {
                    $element.empty();
                    $element.append(clone);
                });
            }
        }
    })
    .component('osTabs', {
        bindings: {
            mdDynamicHeight: '=?',
            osSelected: '=?'
        },
        controller: OsTabs,
        controllerAs: 'osTabs',
        transclude: true,
        template: `
           <md-tabs md-dynamic-height="{{ osTabs.mdDynamicHeight }}" md-selected="osTabs.osSelected">
                <div os-tabs-transclude></div>
           </md-tabs>
        `
    });
