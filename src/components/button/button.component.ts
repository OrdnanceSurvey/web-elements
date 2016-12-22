import * as angular from 'angular';
import 'material-design-lite';

export class ButtonComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;
  bindings: any;
  transclude: boolean;

  constructor() {
    this.controller = ButtonCtrl;
    this.templateUrl = 'button.component.html';
    this.bindings = {
      disabled: '=?ngDisabled',
      colour: '@',
      variation: '@',
      type: '@',
      loading: '<?'
    };
    this.transclude = true;
  }
}

export interface IButtonCtrlBindings {
  disabled?: boolean;
  colour?: string;
  variation?: 'solid'|'outline'|'super'|'icon'|'text';
  type?: string;
  loading?: boolean;
}

export interface IButtonCtrl extends IButtonCtrlBindings {
  $postLink();
  assignEvents();
  makeClass(): string;
}

export class ButtonCtrl implements IButtonCtrl {

  // component bindings
  disabled: boolean;
  colour: string;
  variation: 'solid'|'outline'|'super'|'icon'|'text';
  type: string;
  loading: boolean;

  private mdButton: JQuery;

  constructor(private $element: ng.IRootElementService, private $window: ng.IWindowService) {
    'ngInject';
    this.mdButton = $element.find('.md-button');

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
    let classes = [];
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
      this.$window['componentHandler'].upgradeElement(this.mdButton[0]);
    }
  }

}

export let ButtonModule = angular
  .module('osElements')
  .component('osButton', new ButtonComponent());
