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
        switch (this.variation) {
            case 'solid':
                mdButton.addClass('md-raised');
                break;
            case 'outline':
                mdButton.addClass('md-os-outline');
                break;
            case 'super':
                mdButton.addClass('md-raised');
                mdButton.addClass('md-os-super');
                break;
            case 'text':
            default:
                break;
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
