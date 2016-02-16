/// <reference path="../../../typings/main.d.ts" />

export { OsSearch } from './controllers/osSearch';
import { OsSearch } from './controllers/osSearch';

angular
  .module('osElements')
  .directive('osSearch', ['observeOnScope', 'rx', function (observeOnScope, rx) {
    return {
      scope: {
        placeholder: '@',
        disabled: '=?ngDisabled',
        minLength: '=?',
        selectedItem: '=?',
        itemNames: '@osItems',
        searchText: '=?osSearchText',
        searchProviders: '=osSearchProviders'
      },
      controller: OsSearch,
      controllerAs: 'osSearch',
      bindToController: true,
      template: require('./templates/search.jade'),
      link: function ($scope, element, attr, ctrl:OsSearch) {

      }
    }
  }]);
;
