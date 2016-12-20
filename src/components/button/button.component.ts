import * as angular from 'angular';
import 'material-design-lite';

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
  loading;

  private mdButton;

  constructor(private $element: ng.IRootElementService, private $window: IWindowService) {

    this.mdButton = $element.children('.md-button');

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
    if (this.disabled || this.loading) {
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
      this.$window.componentHandler.upgradeElement(this.mdButton[0]);
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
      type: '@',
      loading: '<'
    },
    controller: OsButton,
    controllerAs: 'osButton',
    transclude: true,
    template: `
            <md-button ng-disabled="osButton.disabled || osButton.loading" 
                       md-no-ink type="{{osButton.type}}" class="mdl-button mdl-js-button mdl-js-ripple-effect" 
                       ng-class="{loading: osButton.loading, 'md-hue-900': osButton.loading}" layout="row">
              <ng-transclude></ng-transclude>
              <div class="loader" ng-if="osButton.loading">
                <svg class="circular" viewBox="25 25 50 50">
                  <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>
                </svg>
              </div>
            </md-button>
        `
  });
