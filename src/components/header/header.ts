/// <reference path="../../../typings/main.d.ts" />

export { OsHeader } from './controllers/osHeader';
import { OsHeader } from './controllers/osHeader';

angular
  .module('osElements')
  .component('osHeader', {
    bindings: {
      title: '@osTitle'
    },
    controller: OsHeader,
    controllerAs: 'osHeader',
    transclude: true,
    template: require('./templates/header.jade')
  });
