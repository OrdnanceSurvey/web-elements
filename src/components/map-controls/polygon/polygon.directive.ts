/// <reference path="../../../../typings/main.d.ts" />

import {IPolygonTool, PolygonToolController} from "./polygon.controller";
import IScope = angular.IScope;

export interface IPolygonScope extends ng.IScope {
  ctrl: PolygonToolController;
}


export class PolygonTool implements ng.IDirective {
  public link:(scope:ng.IScope, iElement:ng.IAugmentedJQuery, iAttrs:ng.IAttributes, olCtrl:any) => void;
  public restrict = 'E';
  public require = '^openlayers';
  public template = `<os-button ng-if="!ctrl.noView" variation="outline" colour="primary" ng-click="ctrl.isActive = !ctrl.isActive">Polygon</os-button>`;
  public scope = {};
  public bindToController = {
    featureLayer: '=osFeatureLayer',
    isActive: '=osIsActive',
    noView: '=osNoView'
  };
  public controllerAs = 'ctrl';
  public controller = PolygonToolController;

  constructor(private $timeout:ng.ITimeoutService, private $window:ng.IWindowService, private olData, private ol: any) {

    PolygonTool.prototype.link = (scope: IPolygonScope, iElement:ng.IAugmentedJQuery, iAttrs:ng.IAttributes, olCtrl:any) => {

      scope.$watch('ctrl.isActive', (isActive: boolean) => {
        if (isActive !== scope.ctrl.isToolActive()) {
          scope.ctrl.toggle();
        }
      });

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
    var directive = ($timeout:ng.ITimeoutService, $window:ng.IWindowService, olData, ol: any) => {
      return new PolygonTool($timeout, $window, olData, ol);
    };

    directive['$inject'] = ['$timeout', '$window', 'olData', 'ol'];

    return directive;
  }
}
