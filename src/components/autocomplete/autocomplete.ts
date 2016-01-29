/// <reference path="../../../typings/main.d.ts" />

export class OsAutocomplete {
    static $inject = ['$scope', '$element'];

    placeholder: string;
    minLenght: number;
    items: any;
    parent: any;
    scope: any;
    itemNames: string;
    itemText: any;
    searchText: any;

    constructor(public $scope: ng.IScope, private $element: ng.IRootElementService) {
      this.scope      = $scope;
      this.parent     = $scope.$parent;
    }

    fetchResults() {
      return this.parent.$eval(this.itemNames);
    }

}

angular
  .module('osElements')

  .directive('osSyncScope', function ($compile) {
    return {
      restrict: 'AE',
      compile: compile,
      terminal: true,
      transclude: 'element'
    };

    function compile(tElement, tAttr, transclude) {

      return function postLink(scope, element, attr) {
        var ctrl = scope.osAutocomplete;
        var newScope = ctrl.parent.$new();

        transclude(newScope, function(clone) {
          element.after(clone);
        });

        connectScopes();

        function connectScopes() {
          var scopeDigesting = false;
          var newScopeDigesting = false;

          scope.$watch(function() {
            if (newScopeDigesting || scopeDigesting) {
              return;
            }

            scopeDigesting = true;
            scope.$$postDigest(function() {
              if (!newScopeDigesting) {
                newScope.$digest();
              }

              scopeDigesting = newScopeDigesting = false;
            });
          });

          newScope.$watch(function() {
            newScopeDigesting = true;
          });
        }
      };
    }
  })

  .directive('osAutocomplete', function () {
    return {
      scope: {
        placeholder: '@',
        disabled: '=?ngDisabled',
        minLength: '=?',
        noCache: '=?',
        selectedItem: '=?',
        itemNames: '@osItems',
        searchText: '=?osSearchText'
      },
      controller: OsAutocomplete,
      controllerAs: 'osAutocomplete',
      bindToController: true,
      template: function(element, attr) {
        let notFound = element.find('os-autocomplete-no-found').detach();
        let result = element.find('os-autocomplete-item-template').detach();

        return '\
        <md-autocomplete \
        ng-disabled="osAutocomplete.disabled" \
        md-no-cache="osAutocomplete.noCache" \
        md-selected-item="osAutocomplete.selectedItem" \
        \
        md-search-text="osAutocomplete.searchText" \
        \
        md-items="item in osAutocomplete.fetchResults(osAutocomplete.searchText)" \
        md-item-text="'+ attr.osItemText  +'" \
        md-min-length="osAutocomplete.minLength" \
        placeholder="{{ osAutocomplete.placeholder }}"> \
        \
        <md-item-template>'+ result.html() +'</md-item-template>  \
        \
        <md-not-found><os-sync-scope>'+ notFound.html() +'</os-sync-scope></md-not-found>  \
        </md-autocomplete>';
      },
      link: function (scope, element, attr, ctrl:OsAutocomplete) {
        //
      }
    }
  });
;
