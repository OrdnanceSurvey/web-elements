/// <reference path="../../../typings/main.d.ts" />

export interface IOsButton {
    colour: string;
    variation: string;
    disabled: boolean;
}

export class OsButton implements IOsButton {
    static $inject = ['$element'];

    colour;
    variation; // text|solid|outline|super
    disabled;

    constructor($element:ng.IRootElementService) {

        $element.on('click', e => {
            if ($element.attr('disabled') === 'disabled') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });

        var mdButton = $element.children('md-button');

        if (this.colour) {
            mdButton.addClass('md-' + this.colour);
        }

        // add the correct variation style
        switch (this.variation) {
            case 'solid':
                mdButton.addClass('md-raised');
                break;
            case 'outline':
                mdButton.addClass('md-os-outline');
                break;
            case 'super':
                mdButton.addClass('md-raised');
                mdButton.addClass('md-os-super');
                break;
            case 'text':
            default:
                // default to a flat button
                break;
        }

        // set disabled attribute immediately, to avoid FOUC
        if (this.disabled) {
            mdButton.attr('disabled', 'disabled');
        }
    }

}

angular
    .module('osElements')
    .component('osButton', {
        bindings: {
            disabled: '=ngDisabled',
            colour: '@',
            variation: '@'
        },
        controller: OsButton,
        controllerAs: 'osButton',
        transclude: true,
        template: `
            <md-button ng-disabled="osButton.disabled"><ng-transclude></ng-transclude></md-button>
        `
    });
