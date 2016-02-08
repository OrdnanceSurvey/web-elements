/// <reference path="../../../typings/main.d.ts" />

export { OsToolbar } from './controllers/osToolbar';
import { OsToolbar } from './controllers/osToolbar';

angular
  .module('osElements')
  .component('osToolbarAction', {
    bindings: {
      icon: '@osIcon',
      text: '@osText',
      action: '=',
      active: '=osActive'
    },
    controllerAs: 'osToolbarAction',
    transclude: true,
    template: require('./templates/toolbarAction.jade')
  })
  .component('osToolbarSeparator', {
    transclude: false,
    template: require('./templates/toolbarActionSeparator.jade')
  })
  .component('osToolbar', {
    bindings: {
      direction: '@osDirection'
    },
    controller: OsToolbar,
    controllerAs: 'osToolbar',
    transclude: true,
    template: require('./templates/toolbar.jade')
  });
