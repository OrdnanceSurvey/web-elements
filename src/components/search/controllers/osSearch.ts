import * as angular from 'angular';
import 'rx-angular';

export interface IOsSearchProvider {
  id: string;
  title: string;
  columnWidth: number;
  fn: Function;
  transformResponse: Function;
  onSelect: Function;
  minLength: number;
}

export interface IOsSearch {
  placeholder: string;
  searchText: string;
  searchResults: Object;
  searchHidden: boolean;
  clear(): void;
  close(): void;
  resultsAvailable(): boolean;
  hideSearch(): void;
  selectResult(result: any, cb: Function): void;
  searchProviders: IOsSearchProvider[];
}

interface IDocument extends ng.IDocumentService {
  querySelector(string);
}

// TODO: implement arrow navigation between search results
export class OsSearch implements IOsSearch {
  static $inject = ['$scope', '$element', 'rx', 'observeOnScope', '$timeout', '$http', '$document'];

  placeholder: string;
  searchText: string = '';
  searchProviders: IOsSearchProvider[];
  searchResults: Object = {};
  searchHidden: boolean = false;
  searcherHidden: boolean;
  internalSearchProviders: any;

  constructor(private $scope: ng.IScope,
              private $element: ng.IRootElementService,
              private rx: any,
              private observeOnScope: any,
              private $timeout: ng.ITimeoutService,
              private $http: ng.IHttpService,
              private $document: IDocument
  ) {
    this.configProviders();
    this.init();

    this.$scope.$on('osHeader.openSearch', () => {
      this.open();
    });
  }

  // turn search provider JSON into an rx.Observable, with a URL including the search term
  private observableWithAJAXConfig(provider, term) {
    let config = {
      params: angular.copy(provider.params),
      data: angular.copy(provider.data),
      dataType: provider.dataType,
      url: provider.url,
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

  private observableFromFn(fn, term) {
    return this.rx.Observable.fromPromise(fn(term));
  }

  private createProviderObservable(provider, term) {
    if (provider.hasOwnProperty('fn')) {
      return this.observableFromFn(provider.fn, term);
    } else { // else assume provider is 'AJAX' type
      return this.observableWithAJAXConfig(provider, term);
    }
  }

  configProviders() {
    this.internalSearchProviders = this.searchProviders.reduce(function (providerHashMap, provider) {
      providerHashMap[provider.id] = provider;
      return providerHashMap;
    }, {});
  }

  init() {
    let throttledInput = this.observeOnScope(this.$scope, 'osSearch.searchText').debounce(200).map(function (e) {
      return e.newValue;
    }).distinctUntilChanged(); // ignore duplicate searches if value didn't change since last search

    // fire off requests to providers based on throttled search term
    throttledInput.filter( (term: string) => {
      // reset the search results for each provider whenever input changes
      this.searchProviders.forEach((provider) => {
        this.searchResults[provider.id] = this.searchResults[provider.id] || {};
        this.searchResults[provider.id].providerId = provider.id; // need to save the id because orderObjectBy changes Object into an Array
        this.searchResults[provider.id].title = provider.title;
        this.searchResults[provider.id].width = provider.columnWidth;
        this.searchResults[provider.id].results = [];
      });

      return term.toLowerCase() && term.length;
    }).subscribe(this.subscribe);
  }

  subscribe = (term) => {
    // check if term is exceeding min length for searchProvider
    let filtered = this.searchProviders.filter((element) => {
      return element.minLength <= term.length ;
    });

    let observables = filtered.map((provider) => {
      let providerObservable = this.createProviderObservable(provider, term);
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
          // call transform Response function if provided
          if (providerObservable.config.transformResponse) {
            response = providerObservable.config.transformResponse.call(this,response);
          }

          // check that response is for the current search term
          if (this.searchText === providerObservable.term) {
            this.searchResults[providerObservable.providerId].inProgress = false;
            this.searchResults[providerObservable.providerId].results = response.results;
            this.searchResults[providerObservable.providerId].error = '';
            this.searchResults[providerObservable.providerId].sent = providerObservable.sent;
            this.searchResults[providerObservable.providerId].received = new Date();


            if (!this.$scope.$$phase) {
              this.$scope.$digest();
            }
          }
        });


      }, (error) => {
        this.searchResults[providerObservable.providerId].inProgress = false;
        this.searchResults[providerObservable.providerId].results = [];
        this.searchResults[providerObservable.providerId].error = error.data.error || error.data;
        this.searchResults[providerObservable.providerId].received = Infinity; // Infinity so that we can sort errors to the right
        this.searchResults[providerObservable.providerId].sent = providerObservable.sent; // TODO check this is available
      });
    });
  }

  clear() {
   this.searchText = '';
  }

  open() {
    this.searcherHidden = false;
    this.bindEvents();
  }

  close() {
    this.searcherHidden = true;
    this.unBindEvents();
  }

  handleClick = (event) => {
    // skip click on os search
    if (this.closestByClass(event.target, 'os-header-searchContainer')) {
      return false;
    }

    if (!this.closestByClass(event.target, 'os-search')
      && !this.closestByClass(event.target, 'os-search-container')
    ) {
      this.hideSearch();
    }
  }

  closestByClass(el, className) {
    while (! (el.classList.contains(className))) {
      el = el.parentNode;

      if (!el || !el.classList) {
        return null;
      }
    }

    return el;
  }

  bindEvents() {
    angular.element(this.$document.querySelector('html')).on('click', this.handleClick);
  }

  unBindEvents() {
    angular.element(this.$document.querySelector('html')).off('click', this.handleClick);
  }

  resultsAvailable() : boolean {
    return this.searchProviders.filter((provider) => {
      var sr = this.searchResults[provider.id];
      return sr && (sr.inProgress || sr.error || sr.results.length > 0);
    }).length > 0;
  }


  // hide the search results
  hideSearch() {
    this.searchHidden = true;
    this.close();
  }

  // call onSelect function if provided.  Pass the hideSearch handler so the function may call it
  selectResult(result, cb) {
    if (cb) {
      cb.call(null, result, this.hideSearch.bind(this));
    }
  }

}

