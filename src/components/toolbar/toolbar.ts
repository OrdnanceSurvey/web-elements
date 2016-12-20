import * as angular from 'angular';

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
    template: 'templates/toolbarAction.html'
  })
  .component('osToolbarSeparator', {
    transclude: false,
    template: 'templates/toolbarActionSeparator.html'
  })
  .component('osToolbar', {
    bindings: {
      direction: '@osDirection'
    },
    controller: OsToolbar,
    controllerAs: 'osToolbar',
    transclude: true,
    template: 'templates/toolbar.html'
  });
