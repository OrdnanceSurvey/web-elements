import * as angular from 'angular';

export { OsHeader } from './controllers/osHeader';
import { OsHeader } from './controllers/osHeader';

angular
  .module('osElements')
  .component('osHeader', {
    bindings: {
      title: '@osTitle',
      useSearch: '=?osUseSearch'
    },
    controller: OsHeader,
    controllerAs: 'osHeader',
    transclude: true,
    template: 'templates/header.html'
  });
