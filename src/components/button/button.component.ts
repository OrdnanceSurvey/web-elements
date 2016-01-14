/// <reference path="../../../typings/main.d.ts" />

export interface IOsButton {
    colour: string;
    variation: string;
}

export class OsButton implements IOsButton {
    static $inject = ['$element'];

    colour;
    variation;

    constructor($element:ng.IRootElementService) {

        $element.on('click', e => {
            if ($element.attr('disabled') === 'disabled') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });

        var mdButton = $element.children('md-button');

        mdButton
            .addClass('md-' + this.colour)
            .addClass('md-' + this.variation);
    }

    private getColour(type:string) {
        switch (type) {
            case 'primary':
                return 'mdl-button--colored';
                break;
            case 'accent':
                return 'mdl-button--accent';
                break;
            default:
                return 'mdl-button--colored';
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
