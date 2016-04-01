describe("osHeader | ", function() {
  var controller, scopeMock, elementMock, rootScope, compile;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function($componentController, $rootScope, $compile){
    rootScope = $rootScope;
    compile = $compile;

    scopeMock = $rootScope.$new();
    scopeMock.scopeMock = true;
    elementMock = { elementMock: true};

    controller = $componentController('osHeader', { $scope: scopeMock, $element: elementMock}, {title: 'MockTitle', useSearch: true});
  }));

  it("should execute constructor", function() {
    expect(controller).toBeNonEmptyObject();
  });

  it("should inject dependencies", function() {
    expect(controller.$scope).toEqual(scopeMock);
    expect(controller.$element).toEqual(elementMock);
  });

  it('should emit event when search is being opened', function() {
    scopeMock.$broadcast = jasmine.createSpy('$broadcast');

    controller.openSearch();
    expect(scopeMock.$broadcast).toHaveBeenCalledWith('osHeader.openSearch');
  });

  it('should bind title attribute', function() {
    expect(controller.title).toBe('MockTitle');
  });

  it('should bind use search attribute', function() {
    expect(controller.useSearch).toBeTruthy();
  });

  it('should render html', function() {
    scope = rootScope.$new();
    scope.showSearch = true;
    element = '<os-header os-title="testHeader" os-use-search="showSearch"></os-header>';

    element = compile(element)(scope);
    scope.$digest();
    var dom = element[0];

    expect(angular.element(dom.querySelector('.os-header-title')).text()).toBe('testHeader');
    expect(angular.element(dom.querySelector('.os-header-searchText')).text()).toBe('Search for a location, postcode');
  });

  it('should update use search binding', function() {
    scope = rootScope.$new();
    scope.showSearch = true;
    element = '<os-header os-title="testHeader" os-use-search="showSearch"></os-header>';

    element = compile(element)(scope);
    scope.$digest();
    var dom = element[0];

    expect(angular.element(dom.querySelector('.os-header-searchText')).text()).toBe('Search for a location, postcode');

    scope.showSearch = false;
    scope.$digest();

    expect(angular.element(dom.querySelector('.os-header-searchText'))).toBeEmptyObject()
  });

});
