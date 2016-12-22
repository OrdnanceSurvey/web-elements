import * as angular from 'angular';
import 'rx-angular';

export class SearchComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;
  bindings: any;

  constructor() {
    this.controller = SearchCtrl;
    this.templateUrl = 'search.component.html';
    this.bindings = {};
  }
}

export interface ISearchResult {
  text: string;
}

export interface ISearchResponse {
  results: ISearchResult[];
}

export interface ISearchProvider<T> {
  id: string;
  title: string;
  transformResponse(response: T) : ISearchResponse;
  onSelect: (selected: ISearchResult, hideSearch: () => void) => void;
}

export interface IUrlSearchProvider<T> extends ISearchProvider<T> {
  method: 'GET'|'POST';
  url: string | ((term: string) => string);
  params?: {[k: string]: any};
  data?: {[k: string]: any};
  dataType?: string;
}

export interface ILambdaSearchProvider<T> extends ISearchProvider<T> {
  fn: (term: string) => T;
}

export type SearchProvider<T> = IUrlSearchProvider<T> & ILambdaSearchProvider<T>;

export interface ISearchOptions {
  placeholder?: string;
  providers: SearchProvider<ISearchResponse>[];
  buffer?: number;
}

export interface ISearchCtrlBindings {
  options: ISearchOptions;
}

export interface ISearchCtrl extends ISearchCtrlBindings {
  searchProviders: {[providerId: string]: SearchProvider<ISearchResponse>};
  searchResults: {[providerId: string]: ISearchResult[]};
  searchHidden: boolean;
  searchInput: string;
}

class SearchCtrl implements ISearchCtrl {

  // component bindings
  options: ISearchOptions;

  // public members
  searchProviders: {[providerId: string]: SearchProvider<ISearchResponse>};
  searchResults: {[providerId: string]: ISearchResult[]};
  searchHidden: boolean;
  searchInput: string;

  private DEFAULT_INPUT_BUFFER = 200; // use this if this.options.buffer is not set

  constructor(private $scope: ng.IScope,
              private rx,
              private observeOnScope: any,
              private $timeout: ng.ITimeoutService,
              private $http: ng.IHttpService) {
    'ngInject';
  }

  $onInit() {
    // ---------- variables setup start -----------
    this.options.placeholder = this.options.hasOwnProperty('placeholder') ? this.options.placeholder : 'Start typing to search';
    this.searchResults = {};

    // turn this.options.providers into a hashmap, with provider.id as the keys
    this.searchProviders = this.options.providers.reduce(function (providerHashMap, provider) {
      providerHashMap[provider.id] = provider;
      return providerHashMap;
    }, {});
    // ---------- variables setup end -----------

    // turn search provider JSON into an rx.Observable, with a URL including the search term

    // create an rx.Observable from the user input changes
    let throttledInput: Rx.Observable<string> = this.observeOnScope(this.$scope, 'ctrl.searchInput')
      .debounce(this.options.buffer || this.DEFAULT_INPUT_BUFFER)
      .map((e) =>  e.newValue).distinctUntilChanged(); // ignore duplicate searches if value didn't change since last search

    // fire off requests to providers based on throttled search term
    throttledInput.filter(function (term) {
      // reset the search results for each provider whenever input changes
      this.options.providers.forEach(function (provider) {
        this.searchResults[provider.id] = this.searchResults[provider.id] || {};
        this.searchResults[provider.id].providerId = provider.id; // need to save the id because orderObjectBy changes Object into an Array
        this.searchResults[provider.id].results = [];
      });

      // only search on 3+ characters
      return term && term.length && term.length > 2;
    }).subscribe(function (term) {

      let observables = this.options.providers.map(function (provider) {
        this.$timeout(function () {
          this.searchResults[provider.id].inProgress = true;
          this.searchResults[provider.id].results = [];
          this.searchResults[provider.id].error = undefined;
          this.searchResults[provider.id].received = Infinity;
        });

        let providerObservable = this.createProviderObservable(provider, term);
        providerObservable.providerId = provider.id;
        providerObservable.term = term;
        providerObservable.sent = new Date();
        providerObservable.config = provider;
        return providerObservable;
      });


      observables.forEach(function (providerObservable) {
        providerObservable.subscribe(function (response) {

          this.$timeout(function () {
            // call tranformResponse function if provided
            if (providerObservable.config.transformResponse) {
              response = providerObservable.config.transformResponse.call(this, response);
            }

            // check that response is for the current search term
            if (this.searchInput === providerObservable.term) {
              this.searchResults[providerObservable.providerId].inProgress = false;
              this.searchResults[providerObservable.providerId].results = response.results;
              this.searchResults[providerObservable.providerId].error = '';
              this.searchResults[providerObservable.providerId].sent = providerObservable.sent;
              this.searchResults[providerObservable.providerId].received = new Date();

              // changes made to scope, so tell angular to digest
              if (!this.$scope.$$phase) {
                this.$scope.$digest();
              }
            } else {
              // don't update the UI if the response is from a different search
            }

          });

        }, function (error) {
          this.searchResults[providerObservable.providerId].inProgress = false;
          this.searchResults[providerObservable.providerId].results = [];
          this.searchResults[providerObservable.providerId].error = error.data ? error.data.error : error.data; // TODO check this logic with a real server error
          this.searchResults[providerObservable.providerId].received = Infinity; // needs to be Infinity so that we can sort errors to the right
          this.searchResults[providerObservable.providerId].sent = providerObservable.sent; // TODO check this is available

        });
      });
    });

    // search results visible when false
    this.searchHidden = false;


    // set focus to a specific search result.  Need to pass the providerId of the result so we can locate it in the DOM
    var focusResult = function focusResult(result, providerId) {
      var index = this.searchResults[providerId].results.indexOf(result);
      var searchResultDOM = elem.find('div[data-provider-id=\'' + providerId + '\'] .osel-search-result[data-search-result-index=\'' + index + '\']');
      searchResultDOM[0].focus();
    };

    // sets focus to the search input box, and puts cursor to the end of text
    var focusSearchInput = function focusSearchInput() {
      var input = elem.find('input.osel-search');
      input[0].focus();

      // use the selection properties
      if (input[0].selectionStart) {
        this.$timeout(function () {
          input[0].selectionStart = input[0].selectionEnd = input[0].value.length;
        });
      } else {
        // otherwise try this hack
        this.$timeout(function () {
          input.val(input.val());
        });
      }
    };

    // keydown handler from the search input box
    $scope.keyFromInput = function keyFromInput($event) {
      if ($event.keyCode === 40) {

        var orderedResults = $filter('orderObjectBy')(this.searchResults, 'received').filter(function (e) {
          return !e.error && !e.inProgress && e.results.length > 0;
        });
        try {
          focusResult(orderedResults[0].results[0], orderedResults[0].providerId);
          $event.preventDefault();
        } catch (e) {
        }
      }
    };

    // helper function to find neighbouring search result of a given result
    // takes into account top/bottom and left/right (doesn't exceed length of list)
    var getNeighbour = function getNeighbour(searchResultElement, xOffset, yOffset) {
      // make the ordered array, as is displayed to the user
      var orderedResults = $filter('orderObjectBy')(this.searchResults, 'received').filter(function (e) {
        return !e.error && !e.inProgress && e.results.length > 0;
      });

      // create another array of only the provider IDs
      var orderedProviderIds = orderedResults.map(function (column) {
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
      } else if (currentResultIndex + yOffset > this.searchResults[neighbourProviderId].results.length - 1) {
        neighbourResultIndex = this.searchResults[neighbourProviderId].results.length - 1;
      }

      return {
        result: this.searchResults[neighbourProviderId].results[neighbourResultIndex],
        providerId: neighbourProviderId
      };
    };


    // move up/down/left/right from current focused search result
    // also listen for enter/esc to select result or hide search results
    $scope.keyFromSearchResult = function keyFromSearchResult($event, result, providerId, onSelect) {

      var neighbour;

      if ($event.keyCode === 37) { // left
        neighbour = getNeighbour($window.document.activeElement, -1, 0);
        focusResult(neighbour.result, neighbour.providerId);
        $event.preventDefault();
      } else if ($event.keyCode === 39) { // right
        neighbour = getNeighbour($window.document.activeElement, 1, 0);
        focusResult(neighbour.result, neighbour.providerId);
        $event.preventDefault();
      } else if ($event.keyCode === 40) { // down
        neighbour = getNeighbour($window.document.activeElement, 0, 1);
        focusResult(neighbour.result, neighbour.providerId);
        $event.preventDefault();
      } else if ($event.keyCode === 38) { // up
        if (this.searchResults[providerId].results.indexOf(result) === 0) {
          focusSearchInput();
        } else {
          neighbour = getNeighbour($window.document.activeElement, 0, -1);
          focusResult(neighbour.result, neighbour.providerId);
        }
        $event.preventDefault();
      } else if ($event.keyCode === 13) { // enter
        $scope.selectResult(result, onSelect);
      } else if ($event.keyCode === 27) { // escape
        $scope.searchHidden = true;
      }

      return neighbour;
    };

    // hide search results if user clicks outdside the searchbox or outside the search results
    angular.element(document.querySelector('html')).on('click', function (event) {
      var el = angular.element(event.target);
      if (el && !(closestByClass(el[0], 'osel-search') || closestByClass(el[0], 'osel-search-results'))) {
        this.$timeout(function () {
          $scope.searchHidden = true;
        });
      }
    });

    function closestByClass(el, className) {
      while (!(el.classList.contains(className))) {
        el = el.parentNode;

        if (!el || !el.classList) {
          return null;
        }
      }

      return el;
    }

  }

  private observableWithAJAXConfig<T>(provider: IUrlSearchProvider<T>, term: string) {
    let url;
    if (provider.url instanceof Function) {
      url = provider.url(term);
    } else {
      url = provider.url;
    }
    let config = {
      params: angular.copy(provider.params),
      data: angular.copy(provider.data),
      dataType: provider.dataType,
      url: url,
      method: provider.method
    };

    // inject search term into params and data
    for (let k in config.params) {
      config.params[k] = config.params[k].replace('%s', term);
    }
    for (let k in config.data) {
      config.data[k] = config.data[k].replace('%s', term);
    }

    return this.rx.Observable.fromPromise(this.$http(config));
  }

  private observableFromFn<T>(provider: ILambdaSearchProvider<T>, term): Rx.Observable<T> {

    return this.rx.Observable.create(function (observer) {
      try {
        let result = provider.fn.call(this, term);

        // if result is a promise, then listen for resolve/reject.  Otherwise, use value immediately
        if (result.then instanceof Function) {
          result.then(function (response) {
            observer.onNext(response);
            observer.onCompleted();
          }).catch(function (response) {
            observer.onError(response);
          });
        } else {
          observer.onNext(result);
          observer.onCompleted();
        }
      } catch (e) {
        observer.onError(e);
      }
    });
  }

  private createProviderObservable<T>(provider: ISearchProvider<T>, term: string) {
    // check if provider is 'function' type
    if (provider.hasOwnProperty('fn')) {
      return this.observableFromFn(provider as ILambdaSearchProvider<T>, term);
    } else { // else assume provider is 'AJAX' type
      return this.observableWithAJAXConfig(provider as IUrlSearchProvider<T>, term);
    }
  }

  /*
   Helper function which returns true when any results are available. Ignores errors and inProgress, or empty results
   */
  resultsAvailable() {
    return this.options.providers.filter(function (provider) {
        var sr = this.searchResults[provider.id];
        return sr.inProgress || sr.error || sr.results.length > 0;

      }).length > 0;
  }

  hideSearch = () => {
    this.searchHidden = true;
  }

  /*
   Call the onSelect function if it exists.
   */
  selectResult(result: ISearchResult, cb: Function) {
    if (cb) {
      cb.call(null, result);
    }
    this.hideSearch();
    this.searchInput = result.text;
  }

}

export let SearchModule = angular
  .module('osElements')
  .component('osSearch', new SearchComponent());
