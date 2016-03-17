describe("osZoombar | ", function() {
  var controller, elementMock;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function($controller){
    elementMock = { elementMock: true};

    controller = $controller('OsZoombarController', { $element: elementMock}, {ngModel: 4, zoomMin: 0, zoomMax: 7});
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

  it("should zoom out", function() {
    expect(controller.ngModel).toEqual(4);
    controller.zoomOut();
    expect(controller.ngModel).toEqual(3);
  });

  it("should limit zoom out level", function() {
    expect(controller.ngModel).toEqual(4);
    controller.zoomOut();
    controller.zoomOut();
    controller.zoomOut();
    controller.zoomOut();
    controller.zoomOut();
    expect(controller.ngModel).toEqual(0);
  });

  it("should zoom in", function() {
    expect(controller.ngModel).toEqual(4);
    controller.zoomIn();
    expect(controller.ngModel).toEqual(5);
  });

  it("should limit zoom out level", function() {
    expect(controller.ngModel).toEqual(4);
    controller.zoomIn();
    controller.zoomIn();
    controller.zoomIn();
    controller.zoomIn();
    controller.zoomIn();
    expect(controller.ngModel).toEqual(7);
  });

});
