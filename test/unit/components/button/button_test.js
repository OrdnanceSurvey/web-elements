describe("osButton | ", function () {
  var controller;
  var elementSpy;
  var windowSpy;
  var rootScope;
  var compile;
  var componentController;
  var window;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function ($componentController, $rootScope, $compile, $window) {
    rootScope = $rootScope;
    compile = $compile;
    componentController = $componentController;
    window = $window;


    var component = createComponent({colour: 'accent', variation: 'solid'});
    elementSpy = component.elementSpy;
    windowSpy = component.windowSpy;

    controller = component.controller;
  }));

  // helper to create an osButton component
  function createComponent(bindings, windowSpy) {
    var mdButtonSpy = createMdButtonSpy();
    var elementSpy = createElementSpy(mdButtonSpy);
    var windowSpy = windowSpy || createWindowSpy();
    var scope = rootScope.$new();

    var locals = {
      $element: elementSpy,
      $window: windowSpy,
      $scope: scope
    };
    var controller = componentController('osButton', locals, bindings);

    return {
      mdButtonSpy: mdButtonSpy,
      elementSpy: elementSpy,
      windowSpy: windowSpy,
      scope: scope,
      controller: controller
    }
  }

  function createElementSpy(mdButtonSpy) {
    return {
      on: jasmine.createSpy('elementOnSpy'),
      children: function () {
        return mdButtonSpy;
      },
      attr: jasmine.createSpy('elemtnAttrSpy')
    }
  }

  function createMdButtonSpy() {
    return jasmine.createSpyObj('mdButtonSpy', ['addClass', 'attr']);
  }

  function createWindowSpy() {
    return {
      componentHandler: {
        upgradeElements: jasmine.createSpy('upgradeElementsSpy')
      }
    };
  }

  it("should execute constructor", function () {
    expect(controller).toBeNonEmptyObject();
  });

  it("should inject dependencies", function () {
    expect(controller.$element).toEqual(elementSpy);
    expect(controller.$window).toEqual(windowSpy);
  });

  it("should setup bindings", function () {
    expect(controller.colour).toEqual('accent');
    expect(controller.variation).toEqual('solid');
  });

  it("should set disabled attribute", function () {
    var component = createComponent({disabled: true});
    expect(component.mdButtonSpy.attr).toHaveBeenCalled();

    component = createComponent({disabled: false});
    expect(component.mdButtonSpy.attr).not.toHaveBeenCalled();

    var component = createComponent({loading: true});
    expect(component.mdButtonSpy.attr).toHaveBeenCalled();

    component = createComponent({loading: false});
    expect(component.mdButtonSpy.attr).not.toHaveBeenCalled();
  });

  it("should initialize MDL on element", function () {
    var component = createComponent({colour: 'accent', variation: 'solid'});

    expect(component.windowSpy.componentHandler.upgradeElements).not.toHaveBeenCalled();
    component.controller.$postLink();
    expect(component.windowSpy.componentHandler.upgradeElements).toHaveBeenCalledTimes(1);
  });

  it("should not initialize MDL on element if componentHandler not available", function () {
    var component = createComponent({colour: 'accent', variation: 'solid'}, {});

    expect(component.windowSpy.componentHandler).not.toBeDefined();
    component.controller.$postLink();
    expect(component.windowSpy.componentHandler).not.toBeDefined();
  });

  it("should set on click event", function () {
    var component = createComponent({colour: 'accent', variation: 'solid'});
    expect(component.elementSpy.on).toHaveBeenCalledTimes(1);
    expect(component.elementSpy.on).toHaveBeenCalledWith('click', jasmine.any(Function));
  });

  it('should create classlist properly from variation', function () {
    var variations = [
      {name: 'solid', matches: [/md-raised/]},
      {name: 'outline', matches: [/md-os-outline/]},
      {name: 'super', matches: [/md-raised/, /md-os-super/]},
      {name: 'icon', matches: [/md-os-icon/]},
      {name: 'text', matches: []}
    ];

    variations.forEach(function (variation) {
      var component = createComponent({variation: variation.name});

      variation.matches.forEach(function(match) {
        expect(component.mdButtonSpy.addClass).toHaveBeenCalledWith(jasmine.stringMatching(match));
      });
    });
  });

  it('should stop click propagation when disabled', function() {
    var scope = rootScope.$new();
    scope.isDisabled = true;
    var element = angular.element("<os-button ng-disabled='isDisabled'></os-button>");
    var dom = compile(element)(scope);
    scope.$digest();

    var event = {
      type: 'click',
      preventDefault: jasmine.createSpy('preventDefaultSpy'),
      stopImmediatePropagation: jasmine.createSpy('stopImmediatePropagationSpy')
    };

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopImmediatePropagation).not.toHaveBeenCalled();
    dom.triggerHandler(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopImmediatePropagation).toHaveBeenCalledTimes(1);

  });

  it('should not stop propagation if disabled', function() {
    var scope = rootScope.$new();
    scope.isDisabled = false;
    var element = angular.element("<os-button ng-disabled='isDisabled'></os-button>");
    var dom = compile(element)(scope);
    scope.$digest();

    var event = {
      type: 'click',
      preventDefault: jasmine.createSpy('preventDefaultSpy'),
      stopImmediatePropagation: jasmine.createSpy('stopImmediatePropagationSpy')
    };

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopImmediatePropagation).not.toHaveBeenCalled();
    dom.triggerHandler(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopImmediatePropagation).not.toHaveBeenCalled();


  });

});
