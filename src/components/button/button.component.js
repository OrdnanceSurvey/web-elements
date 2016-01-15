var OsButton = (function () {
    function OsButton($element) {
        $element.on('click', function (e) {
            if ($element.attr('disabled') === 'disabled') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
        var mdButton = $element.children('md-button');
        if (this.colour) {
            mdButton.addClass('md-' + this.colour);
        }
        if (this.variation) {
            mdButton.addClass('md-' + this.variation);
        }
        if (this.disabled) {
            mdButton.attr('disabled', 'disabled');
        }
    }
    OsButton.$inject = ['$element'];
    return OsButton;
})();
exports.OsButton = OsButton;
angular
    .module('osElements')
    .component('osButton', {
    bindings: {
        disabled: '=ngDisabled',
        colour: '@',
        variation: '@'
    },
    controller: OsButton,
    controllerAs: 'osButton',
    transclude: true,
    template: "\n            <md-button ng-disabled=\"osButton.disabled\"><ng-transclude></ng-transclude></md-button>\n        "
});
