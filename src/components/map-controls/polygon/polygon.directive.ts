/// <reference path="../../../../typings/main.d.ts" />

import {IPolygonTool, PolygonToolController} from "./polygon.controller";
import IScope = angular.IScope;

export class PolygonTool implements ng.IDirective {
  public link:(scope:ng.IScope, iElement:ng.IAugmentedJQuery, iAttrs:ng.IAttributes, olCtrl:any) => void;
  public restrict = 'E';
  public require = '^openlayers';
  public template = `<os-button variation="outline" colour="primary" ng-click="ctrl.toggle()">Polygon</os-button>`
  public scope = {};
  public bindToController = {
    featureLayer: '=osFeatureLayer'
  };
  public controllerAs = 'ctrl';
  public controller = PolygonToolController;

  constructor($timeout:ng.ITimeoutService, $window:ng.IWindowService, olData) {

    PolygonTool.prototype.link = (scope:ng.IScope, iElement:ng.IAugmentedJQuery, iAttrs:ng.IAttributes, olCtrl:any) => {

      function PolygonTool_OL() {
        ol.control.Control.call(this, {
          element: iElement[0]
        });
      }

      olData.getMap().then(map => {
        ol.inherits(PolygonTool_OL, ol.control.Control);
        map.addControl(new PolygonTool_OL());
      });
    };
  }

  public BasicControl(element) {
    return ol.control.Control.call(this, {
      element: element
    });
  };


  public static Factory() {
    var directive = ($timeout:ng.ITimeoutService, $window:ng.IWindowService, olData) => {
      return new PolygonTool($timeout, $window, olData);
    };

    directive['$inject'] = ['$timeout', '$window', 'olData'];

    return directive;
  }
}
