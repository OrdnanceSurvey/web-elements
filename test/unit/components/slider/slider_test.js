describe("osSlider | ", function() {
  var controller, scopeMock, elementSpy, rootScope, compile;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function($componentController, $rootScope, $compile) {
    rootScope = $rootScope;
    compile = $compile;

    elementSpy = jasmine.createSpyObj('elementSpy', ['addClass', 'removeClass']);
    scopeMock = $rootScope.$new();
    scopeMock.scopeMock = true;
    spyOn(scopeMock, '$watch');
    controller = $componentController('osSlider', { $element: elementSpy, $scope: scopeMock }, {opened: false, position: 'top left'});
  }));

  it("should execute constructor", function() {
    expect(controller).toBeNonEmptyObject();
  });

  it("should inject dependencies", function() {
    expect(controller.$scope).toEqual(scopeMock);
    expect(controller.$element).toEqual(elementSpy);
  });

  it("should setup bindings", function() {
    expect(controller.opened).toBeFalsy();
    expect(controller.position).toEqual('top left');
  });

  it('should watch visibility', function () {
    expect(scopeMock.$watch).toHaveBeenCalled()
  });

  it('should toggle visibility', function () {
    spyOn(controller, 'setVisibility');
    expect(controller.opened).toBeFalsy();
    // show
    controller.toggle();
    expect(controller.opened).toBeTruthy();
    expect(controller.setVisibility).toHaveBeenCalled();
    controller.setVisibility.calls.reset();
    // hide
    controller.toggle();
    expect(controller.opened).toBeFalsy();
    expect(controller.setVisibility).toHaveBeenCalled();
    controller.setVisibility.calls.reset();
    // show
    controller.toggle();
    expect(controller.opened).toBeTruthy();
    expect(controller.setVisibility).toHaveBeenCalled();
    controller.setVisibility.calls.reset();
  });

  it('should set visibility', function () {
    elementSpy.addClass.calls.reset();
    elementSpy.removeClass.calls.reset();
    controller.toggle();
    expect(elementSpy.addClass).toHaveBeenCalledWith('os-slider-opened');
    expect(elementSpy.removeClass).not.toHaveBeenCalled();
    elementSpy.addClass.calls.reset();
    elementSpy.removeClass.calls.reset();
    controller.toggle();
    expect(elementSpy.removeClass).toHaveBeenCalledWith('os-slider-opened');
    expect(elementSpy.addClass).not.toHaveBeenCalled();
  });

  it('should know if it is visible', function () {
    expect(controller.opened).toBeFalsy();
    expect(controller.isOpened()).toBeFalsy();
    controller.toggle();
    expect(controller.opened).toBeTruthy();
    expect(controller.isOpened()).toBeTruthy();
    controller.toggle();
    expect(controller.opened).toBeFalsy();
    expect(controller.isOpened()).toBeFalsy();
  });

  it('should set icon', function () {
    expect(controller.iconName()).toBe('keyboard_arrow_right');
    controller.toggle();
    expect(controller.iconName()).toBe('keyboard_arrow_left');
  });

});
