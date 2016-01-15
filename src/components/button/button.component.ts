/// <reference path="../../../typings/main.d.ts" />

export interface IOsButton {
    colour: string;
    variation: string;
    disabled: boolean;
}

export class OsButton implements IOsButton {
    static $inject = ['$element'];

    colour;
    variation;
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

        if (this.variation) {
            mdButton.addClass('md-' + this.variation);
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
