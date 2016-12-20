import * as angular from 'angular';
import 'rx';

export { OsSearch } from './controllers/osSearch';
import { OsSearch } from './controllers/osSearch';

angular
  .module('osElements')
  .controller('OsSearch', OsSearch)
  .directive('osSearch', ['observeOnScope', 'rx', function (observeOnScope, rx) {
    return {
      scope: {
        placeholder: '@',
        disabled: '=?ngDisabled',
        minLength: '=?',
        selectedItem: '=?',
        itemNames: '@osItems',
        searchText: '=?osSearchText',
        searchProviders: '=osSearchProviders',
        searcherHidden: '=?osSearcherHidden'
      },
      controller: 'OsSearch',
      controllerAs: 'osSearch',
      bindToController: true,
      template: 'templates/search.html'
    };
  }])
;
