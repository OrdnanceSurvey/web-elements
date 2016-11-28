describe("osModal | ", function() {
  var $osModal, $mdDialog, modal, args;

  beforeEach(angular.mock.module('osElements'));

  beforeEach(inject(function($OsModal, _$mdDialog_) {
    $osModal = $OsModal;
    $mdDialog = _$mdDialog_;
  }));

  beforeEach(function() {
    spyOn($mdDialog, 'show');
    $mdDialog.show.calls.reset();
  });

  it('should show dialog', function() {
    $osModal.show({testDialog: true});
    expect($mdDialog.show).toHaveBeenCalledWith({testDialog: true});
  });

  it('should pass additional option', function() {
    modal = $osModal.html({
      hasBackdrop: 'backDropValue',
      someFancyOption: 'someFancyOption'
    }, false);

    args = $mdDialog.show.calls.argsFor(0);

    expect(args[0].hasBackdrop).toBe('backDropValue');
    expect(args[0].someFancyOption).toBe('someFancyOption');
  });

  describe("Alert |", function() {
    it('should prepare options', function() {
      modal = $osModal.alert({
        title: 'testTitle',
        ok: 'testOk',
        fullscreen: true
      }, false);

      expect(modal._options.$type).toBe('alert');
      expect(modal._options.title).toBe('testTitle');
      expect(modal._options.ok).toBe('testOk');
      // expect(modal._options.theme).toBe('os');
      expect(modal._options.fullscreen).toBeTruthy();
    });

    it('should unset fullscreen option', function() {
      modal = $osModal.alert({
        fullscreen: false
      }, false);

      expect(modal._options.fullscreen).toBeFalsy();
    });

    it('should set textContent option', function() {
      modal = $osModal.alert({
        textContent: 'textContent'
      }, false);

      expect(modal._options.textContent).toBe('textContent');
    });

    it('should set empty textContent option', function() {
      modal = $osModal.alert({}, false);

      expect(modal._options.textContent).toBe('');
    });

    it('should show dialog by default', function() {
      modal = $osModal.alert({});

      expect($mdDialog.show).toHaveBeenCalled()
    });
  });

  describe("Confirm |", function() {
    it('should prepare options', function() {
      modal = $osModal.confirm({
        title: 'testTitle',
        ok: 'testOK',
        cancel: 'testCancel',
        fullscreen: true
      }, false);

      expect(modal._options.$type).toBe('confirm');
      expect(modal._options.ok).toBe('testOK');
      expect(modal._options.cancel).toBe('testCancel');
      // expect(modal._options.theme).toBe('os');
      expect(modal._options.fullscreen).toBeTruthy();
    });

    it('should unset fullscreen option', function() {
      modal = $osModal.confirm({
        fullscreen: false
      }, false);

      expect(modal._options.fullscreen).toBeFalsy();
    });

    it('should set textContent option', function() {
      modal = $osModal.confirm({
        textContent: 'textContent'
      }, false);

      expect(modal._options.textContent).toBe('textContent');
    });

    it('should show dialog by default', function() {
      modal = $osModal.confirm({});

      expect($mdDialog.show).toHaveBeenCalled()
    });
  });

  describe("HTML |", function() {
    it('should prepare options', function() {
      modal = $osModal.html({
        title: 'testTitle',
        ok: 'testOK',
        cancel: 'testCancel',
        fullscreen: true,
        template: '<div>test</div>'
      }, false);

      args = $mdDialog.show.calls.argsFor(0);

      expect(args[0].title).toBe('testTitle');
      expect(args[0].ok).toBe('testOK');
      expect(args[0].cancel).toBe('testCancel');
      expect(args[0].fullscreen).toBe(true);
      expect(args[0].template).toBe('<div>test</div>');
    });

    it('should prepare templateUrl option', function() {
      modal = $osModal.html({
        templateUrl: './test/template.html'
      }, false);

      args = $mdDialog.show.calls.argsFor(0);
      expect(args[0].templateUrl).toBe('./test/template.html');
    });

    it('should bind controller option', function() {
      modal = $osModal.html({
        controller: 'sampleController'
      }, false);

      args = $mdDialog.show.calls.argsFor(0);
      expect(args[0].controller).toBe('sampleController');
    });

  });

});
