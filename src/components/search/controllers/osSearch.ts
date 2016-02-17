/// <reference path="../../../../typings/main.d.ts" />

export interface IOsSearchProvider {
  id: string;
  title: string;
  columnWidth: Number;
  fn: Function;
  transformResponse: Function;
  onSelect: Function;
}

export interface IOsSearch {
  placeholder: string;
  searchText: string;
  searchResults: Object;
  searchHidden: boolean;
  clear(): void;
  search(): void;
  resultsAvailable(): boolean;
  hideSearch(): void;
  selectResult(result: any, cb: Function): void;
  searchProviders: IOsSearchProvider[];
}

export class OsSearch implements IOsSearch {
  static $inject = ['$scope', '$element', 'rx', 'observeOnScope', '$timeout', '$http'];

  placeholder: string;
  searchText: string = '';
  searchProviders: IOsSearchProvider[];
  searchResults: Object = {}
  searchHidden: boolean = false;
  internalSearchProviders: any;

  constructor(private $scope: ng.IScope,
              private $element: ng.IRootElementService,
              private rx: any,
              private observeOnScope: any,
              private $timeout: ng.ITimeoutService,
              private $http: ng.IHttpService
  ) {


    this.internalSearchProviders = this.searchProviders.reduce(function (providerHashMap, provider) {
      providerHashMap[provider.id] = provider;
      return providerHashMap;
    }, {});

    // turn search provider JSON into an rx.Observable, with a URL including the search term
    var observableWithAJAXConfig = function observableWithAJAXConfig(provider, term) {
      var config = {
        params: angular.copy(provider.params),
        data: angular.copy(provider.data),
        dataType: provider.dataType,
        url: provider.url,
        method: provider.method
      };

      // inject search term into params and data
      for (var k in config.params) {
        config.params[k] = config.params[k].replace('%s', term);
      }
      for (k in config.data) {
        config.data[k] = config.data[k].replace('%s', term);
      }

      return rx.Observable.fromPromise($http(config));
    };

    var observableFromFn = function observableFromFn(fn, term) {
      //return rx.Observable.fromCallback(fn)(term);

      return rx.Observable.create(function(observer) {
        try {
          observer.onNext(fn.call(this, term));
          observer.onCompleted();
        } catch (e) {
          console.error( e);
          observer.onError(e);
        }
      });
    };

    var createProviderObservable = function createProviderObservable(provider, term) {
      // check if provider is 'function' type
      if (provider.hasOwnProperty('fn')) {
        return observableFromFn(provider.fn, term);
      } else { // else assume provider is 'AJAX' type
        return observableWithAJAXConfig(provider, term);
      }
    };
    //

    var throttledInput = observeOnScope($scope, 'osSearch.searchText').debounce(200).map(function (e) {
      return e.newValue;
    }).distinctUntilChanged(); // ignore duplicate searches if value didn't change since last search


    // fire off requests to providers based on throttled search term
    throttledInput.filter( (term) => {
      // reset the search results for each provider whenever input changes
      this.searchProviders.forEach((provider) => {
        this.searchResults[provider.id] = this.searchResults[provider.id] || {};
        this.searchResults[provider.id].providerId = provider.id; // need to save the id because orderObjectBy changes Object into an Array
        this.searchResults[provider.id].title = provider.title;
        this.searchResults[provider.id].width = provider.columnWidth;
        this.searchResults[provider.id].results = [];
      });

      // only search on 3+ characters
      return term && term.length && term.length > 2;
    }).subscribe((term) => {

      var observables = this.searchProviders.map(function(provider) {
      //  $timeout(function() {
      //    $scope.searchResults[provider.id].inProgress = true;
      //    $scope.searchResults[provider.id].results = [];
      //    $scope.searchResults[provider.id].error = undefined;
      //    $scope.searchResults[provider.id].received = Infinity;
      //  });
      //
        var providerObservable = createProviderObservable(provider, term);
        providerObservable.providerId = provider.id;
        providerObservable.term = term;
        providerObservable.sent = new Date();
        providerObservable.config = provider;

        return providerObservable;
      });


      observables.forEach((providerObservable) => {
        providerObservable.subscribe((response) => {
          //
          this.$timeout(() => {
            // call tranformResponse function if provided
            if (providerObservable.config.transformResponse) {
              response = providerObservable.config.transformResponse.call(this,response);
            }

            // check that response is for the current search term
            if (this.searchText === providerObservable.term) {
              this.searchResults[providerObservable.providerId].inProgress = false;
              this.searchResults[providerObservable.providerId].results = response.results;
              this.searchResults[providerObservable.providerId].error = "";
              this.searchResults[providerObservable.providerId].sent = providerObservable.sent;
              this.searchResults[providerObservable.providerId].received = new Date();


              if (!$scope.$$phase) {
                $scope.$digest();
              }
            } else {
              // don't update the UI if the response is from a different search
            }

          });
          //

        }, (error) => {
          this.searchResults[providerObservable.providerId].inProgress = false;
          this.searchResults[providerObservable.providerId].results = [];
          this.searchResults[providerObservable.providerId].error = error.data.error || error.data; // TODO check this logic with a real server error
          this.searchResults[providerObservable.providerId].received = Infinity; // needs to be Infinity so that we can sort errors to the right
          this.searchResults[providerObservable.providerId].sent = providerObservable.sent; // TODO check this is available
        });
      });
    });

    /*
    angular.element('html').on('click', function(event) {
      var el = $(event.target);
      if (!(el.closest('.osel-search').length || el.closest('.osel-search-results').length)) {
        $timeout(function() {
          $scope.searchHidden = true;
        });
      }
    });*/

  }

  clear() {
   this.searchText = '';
  }

  search() {

  }

  resultsAvailable() : boolean {
    return this.searchProviders.filter((provider) => {
      var sr = this.searchResults[provider.id];
      return sr.inProgress || sr.error || sr.results.length > 0;
    }).length > 0;
  }


  // hide the search results
  hideSearch() {
    this.searchHidden = true;
  }

  // call onSelect function if provided.  Pass the hideSearch handler so the function may call it
  selectResult(result, cb) {
    if (cb) {
      cb.call(null, result, this.hideSearch);
    }
  }

  // TODO: implement below navigation

  // set focus to a specific search result.  Need to pass the providerId of the result so we can locate it in the DOM
  focusResult(result, providerId) {
/*    var index = $scope.searchResults[providerId].results.indexOf(result);
    var searchResultDOM = elem.find('div[data-provider-id=\'' + providerId + '\'] .osel-search-result[data-search-result-index=\'' + index + '\']');
    searchResultDOM[0].focus();*/
  }

  // sets focus to the search input box, and puts cursor to the end of text
  focusSearchInput() {
/*    var input = elem.find('input.osel-search');
    input[0].focus();

    // use the selection properties
    if (input[0].selectionStart) {
      $timeout(function() {
        input[0].selectionStart = input[0].selectionEnd = input[0].value.length;
      });
    } else {
      // otherwise try this hack
      $timeout(function() {
        input.val(input.val());
      });
    }*/
  }

  // keydown handler from the search input box
  keyFromInput($event) {
    /*
    if ($event.keyCode === 40) {
      var orderedResults = $filter('orderObjectBy')($scope.searchResults, 'received').filter(function(e) {
        return !e.error && !e.inProgress && e.results.length > 0;
      });
      try {
        focusResult(orderedResults[0].results[0], orderedResults[0].providerId);
      } catch (e) {}
    }*/
  }

  // helper function to find neighbouring search result of a given result
  // takes into account top/bottom and left/right (doesn't exceed length of list)
  getNeighbour(searchResultElement, xOffset, yOffset) {
/*    // make the ordered array, as is displayed to the user
    var orderedResults = $filter('orderObjectBy')($scope.searchResults, 'received').filter(function(e) {
      return !e.error && !e.inProgress && e.results.length > 0;
    });

    // create another array of only the provider IDs
    var orderedProviderIds = orderedResults.map(function(column) {
      return column.providerId;
    });

    var currentProviderId = $(searchResultElement).attr('data-provider-id');
    var currentProviderIndex = orderedProviderIds.indexOf(currentProviderId);

    var neighbourProviderId = orderedProviderIds[currentProviderIndex + xOffset]; // add the offset to go left or right
    if (currentProviderIndex + xOffset < 0) {
      neighbourProviderId = orderedProviderIds[0];
    } else if (currentProviderIndex + xOffset > orderedResults.length - 1) {
      neighbourProviderId = orderedProviderIds[orderedResults.length - 1];
    } else if (orderedResults[neighbourProviderId] && (orderedResults[neighbourProviderId].inProgress || orderedResults[neighbourProviderId].error)) {
      neighbourProviderId = currentProviderId;
    }

    var currentResultIndex = $window.parseInt($(searchResultElement).attr('data-search-result-index'));
    var neighbourResultIndex = currentResultIndex + yOffset;
    if (currentResultIndex + yOffset < 0) {
      neighbourResultIndex = 0;
    } else if (currentResultIndex + yOffset > $scope.searchResults[neighbourProviderId].results.length - 1) {
      neighbourResultIndex = $scope.searchResults[neighbourProviderId].results.length - 1;
    }

    return {
      result: $scope.searchResults[neighbourProviderId].results[neighbourResultIndex],
      providerId: neighbourProviderId
    };*/
  }

  // move up/down/left/right from current focused search result
  // also listen for enter/esc to select result or hide search results
  keyFromSearchResult($event, result, providerId, onSelect) {
/*    var neighbour;

    if ($event.keyCode === 37) { // left
      neighbour = getNeighbour($window.document.activeElement, -1, 0);
      focusResult(neighbour.result, neighbour.providerId);

    } else if ($event.keyCode === 39) { // right
      neighbour = getNeighbour($window.document.activeElement, 1, 0);
      focusResult(neighbour.result, neighbour.providerId);

    } else if ($event.keyCode === 40) { // down
      neighbour = getNeighbour($window.document.activeElement, 0, 1);
      focusResult(neighbour.result, neighbour.providerId);

    } else if ($event.keyCode === 38) { // up
      if ($scope.searchResults[providerId].results.indexOf(result) === 0) {
        focusSearchInput();
      } else {
        neighbour = getNeighbour($window.document.activeElement, 0, -1);
        focusResult(neighbour.result, neighbour.providerId);
      }
    } else if ($event.keyCode === 13) { // enter
      $scope.selectResult(result, onSelect);
    } else if ($event.keyCode === 27) { // escape
      $scope.searchHidden = true;
    }

    return neighbour;*/
  }
  //

}

