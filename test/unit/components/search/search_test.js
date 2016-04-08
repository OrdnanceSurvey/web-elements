// TODO: cover RX with unit tests
// TODO: cover $compile tests

describe("osSearch | ", function() {
  var osSearchCtrl, scope, observeOnScopeSpy, documentSpy;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function($controller, $rootScope, $document) {
    scope = $rootScope.$new();
    observeOnScopeSpy = jasmine.createSpyObj('observeOnScopeSpy', ['debounce', 'distinctUntilChanged', 'map', 'filter', 'subscribe']);

    observeOnScopeSpy.debounce.and.callFake(function() { return this;});
    observeOnScopeSpy.distinctUntilChanged.and.callFake(function() { return this;});
    observeOnScopeSpy.map.and.callFake(function() { return this;});
    observeOnScopeSpy.filter.and.callFake(function() { return this;});
    observeOnScopeSpy.subscribe.and.callFake(function() { return this;});

    documentSpy = jasmine.createSpyObj('documentSpy', ['querySelector']);

    osSearchCtrl = $controller('OsSearch', {
      $scope: scope,
      $element: {},
      observeOnScope: function() {
        return observeOnScopeSpy;
      },
      $document: documentSpy
    }, {
      searchProviders: []
    });

  }));

  it('should construct controller', function() {
    expect(osSearchCtrl).toBeNonEmptyObject();
  });

  it('should config search providers', function() {
    osSearchCtrl.searchProviders = [{id: 'one'}, {id: 'one'}, {id: 'two'}];
    osSearchCtrl.configProviders();

    expect(osSearchCtrl.internalSearchProviders).toEqual({'one': {id: 'one'}, 'two': {id: 'two'}});
  });

  it('should clear search results', function() {
    expect(osSearchCtrl.searchText).toEqual('');
    osSearchCtrl.searchText = 'test';
    expect(osSearchCtrl.searchText).toEqual('test');
    osSearchCtrl.clear();
    expect(osSearchCtrl.searchText).toEqual('');
  });

  it('should open search', function() {
    spyOn(osSearchCtrl, 'bindEvents');
    osSearchCtrl.open();
    expect(osSearchCtrl.searcherHidden).toBeFalsy();
    expect(osSearchCtrl.bindEvents).toHaveBeenCalled();
  });

  it('should close search', function() {
    spyOn(osSearchCtrl, 'unBindEvents');
    osSearchCtrl.close();
    expect(osSearchCtrl.searcherHidden).toBeTruthy();
    expect(osSearchCtrl.unBindEvents).toHaveBeenCalled();
  });

  it('should hide search', function() {
    spyOn(osSearchCtrl, 'close');
    osSearchCtrl.hideSearch();
    expect(osSearchCtrl.searchHidden).toBeTruthy();
    expect(osSearchCtrl.close).toHaveBeenCalled();
  });

  describe("events | ", function() {

    it('should handle osHeader.openSearch event', function() {
      spyOn(osSearchCtrl, 'open');
      scope.$broadcast('osHeader.openSearch');
      expect(osSearchCtrl.open).toHaveBeenCalled();
    });

    it('should bind click event', function() {
      var onSpy = jasmine.createSpyObj('onSpy',['on', 'off']);
      spyOn(angular, 'element').and.callFake(function(){
        return onSpy
      });

      osSearchCtrl.bindEvents();
      expect(documentSpy.querySelector).toHaveBeenCalledWith('html');
      expect(onSpy.on).toHaveBeenCalledWith('click', jasmine.any(Function));
    });


    it('should unbind click event', function() {
      var onSpy = jasmine.createSpyObj('onSpy',['on', 'off']);
      spyOn(angular, 'element').and.callFake(function(){
        return onSpy
      });

      osSearchCtrl.unBindEvents();

      expect(documentSpy.querySelector).toHaveBeenCalledWith('html');
      expect(onSpy.off).toHaveBeenCalledWith('click', jasmine.any(Function));
    });
  });

  describe("search results | ", function() {

    it('should check if results are available', function() {
      osSearchCtrl.searchProviders = [{id: 'testSearcher'}];
      osSearchCtrl.searchResults = {
        'testSearcher': {
            'inProgress': false,
            'error': false,
            'results': ['1']
        }
      };

      expect(osSearchCtrl.resultsAvailable()).toBeTruthy();
    });

    it('should check if results are not available', function() {
      osSearchCtrl.searchProviders = [{id: 'testSearcher'}];
      osSearchCtrl.searchResults = [];

      expect(osSearchCtrl.resultsAvailable()).toBeFalsy();

      osSearchCtrl.searchProviders = [];
      osSearchCtrl.searchResults = {
        'testSearcher': {
          'inProgress': false,
          'error': false,
          'results': ['1']
        }
      };
      expect(osSearchCtrl.resultsAvailable()).toBeFalsy();
    });

    it('should check if results are not available', function() {
      osSearchCtrl.searchProviders = [{id: 'testSearcher'}];
      osSearchCtrl.searchResults = {
        'testSearcher': {
          'inProgress': false,
          'error': false,
          'results': []
        }
      };

      expect(osSearchCtrl.resultsAvailable()).toBeFalsy();

      osSearchCtrl.searchResults = {
        'testSearcher': {
          'inProgress': true,
          'error': true,
          'results': []
        }
      };
      expect(osSearchCtrl.resultsAvailable()).toBeTruthy();

      osSearchCtrl.searchResults = {
        'testSearcher': {
          'inProgress': true,
          'error': false,
          'results': ['1']
        }
      };
      expect(osSearchCtrl.resultsAvailable()).toBeTruthy();
    });

    it('should select result', function() {
      var cb = jasmine.createSpyObj('callbackSpy', ['call']);
      osSearchCtrl.selectResult({id: 'mockResult'}, cb);
      expect(cb.call).toHaveBeenCalledWith(null, {id: 'mockResult'}, jasmine.any(Function));
    });

    it('should not select result if callback is not defined', function() {
      var cb = jasmine.createSpyObj('callbackSpy', ['call']);
      osSearchCtrl.selectResult({id: 'mockResult'}, null);
      expect(cb.call).not.toHaveBeenCalled();
    });

  });

});
