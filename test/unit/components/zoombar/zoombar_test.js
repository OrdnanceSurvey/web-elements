describe("osZoombar | ", function() {
  var controller, elementMock, changeFn;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function($controller){
    elementMock = { elementMock: true};

    changeFn = jasmine.createSpy('changeFn');

    controller = $controller('OsZoombarController', { $element: elementMock}, {ngModel: 4, zoomMin: 0, zoomMax: 7, ngChange: changeFn});
  }));

  it("should execute constructor", function() {
    expect(controller).toBeNonEmptyObject();
  });

  it("should inject dependencies", function() {

    expect(controller.$element).toEqual(elementMock);
  });

  it("should setup bindings", function() {
    expect(controller.ngModel).toEqual(4);
    expect(controller.zoomMin).toEqual(0);
    expect(controller.zoomMax).toEqual(7);
  });

  it("should zoom out and fire change function", function() {
    expect(controller.ngModel).toEqual(4);
    expect(changeFn).not.toHaveBeenCalled();
    controller.zoomOut();
    expect(controller.ngModel).toEqual(3);
    expect(changeFn).toHaveBeenCalledWith(3); // changefn should be called with new zoom level
    expect(changeFn.calls.count()).toEqual(1); // only called once
  });

  it("should limit zoom out level", function() {
    expect(controller.ngModel).toEqual(4);
    expect(changeFn).not.toHaveBeenCalled();
    controller.zoomOut();
    controller.zoomOut();
    controller.zoomOut();
    controller.zoomOut();
    controller.zoomOut();
    expect(controller.ngModel).toEqual(0);
    expect(changeFn.calls.count()).toEqual(4); // should only have been called 4 times once min of 0 is reached
  });

  it("should zoom in and fire change function", function() {
    expect(controller.ngModel).toEqual(4);
    expect(changeFn).not.toHaveBeenCalled();
    controller.zoomIn();
    expect(controller.ngModel).toEqual(5);
    expect(changeFn).toHaveBeenCalledWith(5); // changefn should be called with new zoom level
    expect(changeFn.calls.count()).toEqual(1); // only called once
  });

  it("should limit zoom in level", function() {
    expect(controller.ngModel).toEqual(4);
    expect(changeFn).not.toHaveBeenCalled();
    controller.zoomIn();
    controller.zoomIn();
    controller.zoomIn();
    controller.zoomIn();
    controller.zoomIn();
    expect(controller.ngModel).toEqual(7);
    expect(changeFn.calls.count()).toEqual(3); // should only have been called 3 times once max of 7 is reached
  });

});
