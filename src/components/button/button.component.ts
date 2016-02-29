/// <reference path="../../../typings/main.d.ts" />

export interface IOsButton {
  colour: string;
  variation: string;
  disabled: boolean;
  makeClass;
}

export class OsButton implements IOsButton {
  static $inject = ['$element'];

  colour;
  variation; // text|solid|outline|super
  disabled;
  makeClass;

  constructor($element:ng.IRootElementService) {

    $element.on('click', e => {
      if ($element.attr('disabled') === 'disabled') {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    var mdButton = $element.children('md-button');

    this.makeClass = () => {
      var classes = [];
      switch (this.variation) {
        case 'solid':
          classes.push('md-raised');
          break;
        case 'outline':
          classes.push('md-os-outline');
          break;
        case 'super':
          classes.push('md-raised');
          classes.push('md-os-super');
          break;
        case 'icon':
          classes.push('md-os-icon');
          break;
        case 'text':
        default:
          break;
      }

      if (this.colour) {
        classes.push('md-' + this.colour);
      }

      return classes.join(' ');
    };

    // assign classes immediately to avoid FOUC
    mdButton.addClass(this.makeClass());

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
