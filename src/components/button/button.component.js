var OsButton = (function () {
    function OsButton($element) {
        var _this = this;
        $element.on('click', function (e) {
            if ($element.attr('disabled') === 'disabled') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
        var mdButton = $element.children('md-button');
        this.makeClass = function () {
            var classes = [];
            switch (_this.variation) {
                case 'solid':
                    classes.push('md-raised');
                    break;
                case 'outline':
                    classes.push('md-os-outline');
                    break;
                case 'super':
                    classes.push('md-raised');
                    classes.push('md-os-super');
                    break;
                case 'text':
                default:
                    break;
            }
            if (_this.colour) {
                classes.push('md-' + _this.colour);
            }
            return classes.join(' ');
        };
        mdButton.addClass(this.makeClass());
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
