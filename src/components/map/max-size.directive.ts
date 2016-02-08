/// <reference path="../../../typings/main.d.ts" />

export class MaxSize implements ng.IDirective {
  public link:(scope:ng.IScope, iElement:ng.IAugmentedJQuery, iAttrs:ng.IAttributes, olCtrl:any) => void;
  public restrict ='A';
  public require ='openlayers';

  constructor($timeout:ng.ITimeoutService, $window:ng.IWindowService) {

    MaxSize.prototype.link = (scope:ng.IScope, iElement:ng.IAugmentedJQuery, iAttrs:ng.IAttributes, olCtrl:any) => {
      var resize = function () {
        iElement.css('height', '0px');
        iElement.css('height', iElement.parent()[0].getBoundingClientRect().height + 'px');

        olCtrl.getOpenlayersScope().getMap().then(function (map:ol.Map) {
          map.updateSize();
        });
      };

      $timeout(resize);
      $window.addEventListener('resize', resize);

    };
  }

  public static Factory() {
    var directive = ($timeout:ng.ITimeoutService, $window:ng.IWindowService) => {
      return new MaxSize($timeout, $window);
    };

    directive['$inject'] = ['$timeout', '$window'];

    return directive;
  }
}
