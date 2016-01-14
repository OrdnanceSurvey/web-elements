var OsButton = (function () {
    function OsButton($element) {
        $element.on('click', function (e) {
            if ($element.attr('disabled') === 'disabled') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
        var mdButton = $element.children('md-button');
        mdButton
            .addClass('md-' + this.colour)
            .addClass('md-' + this.variation);
    }
    OsButton.prototype.getColour = function (type) {
        switch (type) {
            case 'primary':
                return 'mdl-button--colored';
                break;
            case 'accent':
                return 'mdl-button--accent';
                break;
            default:
                return 'mdl-button--colored';
        }
    };
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
