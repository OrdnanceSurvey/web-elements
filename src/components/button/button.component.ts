/// <reference path="../../../typings/main.d.ts" />

export interface IOsButton {
  colour: string;
  variation: string;
  disabled: boolean;
  $postLink($window);
  assignEvents();
  makeClass();
}

interface IWindowService extends ng.IWindowService {
  componentHandler: { upgradeElement(el: HTMLElement) };
}

export class OsButton implements IOsButton {
  static $inject = ['$element', '$window'];

  colour;
  variation; // text|solid|outline|super
  disabled;

  private mdButton;

  constructor(private $element:ng.IRootElementService, private $window: IWindowService) {

    this.mdButton = $element.children('md-button');

    // assign classes immediately to avoid FOUC
    this.mdButton.addClass(this.makeClass());

    // set disabled attribute immediately, to avoid FOUC
    this.setDisabled();

    this.assignEvents();
  }

  assignEvents() {
    this.$element.on('click', e => {
      if (this.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  }

  setDisabled() {
    if (this.disabled) {
      this.mdButton.attr('disabled', 'disabled');
    }
  }

  makeClass() {
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
  }

  $postLink() {
    if ('componentHandler' in this.$window) {
      // trigger MDL upgrade for button element
      this.$window.componentHandler.upgradeElement(this.$element.children()[0]);
    }
  }

}

angular
  .module('osElements')
  .component('osButton', {
    bindings: {
      disabled: '=ngDisabled',
      colour: '@',
      variation: '@',
      type: '@'
    },
    controller: OsButton,
    controllerAs: 'osButton',
    transclude: true,
    template: `
            <md-button ng-disabled="osButton.disabled" md-no-ink type="{{osButton.type}}" class="mdl-button mdl-js-button mdl-js-ripple-effect"><ng-transclude></ng-transclude></md-button>
        `
  });
