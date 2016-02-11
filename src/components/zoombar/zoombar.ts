/// <reference path="../../../typings/main.d.ts" />

export { OsZoombar } from './controllers/osZoombar';
import { OsZoombar } from './controllers/osZoombar';

angular
  .module('osElements')
  .directive('osZoombar', ['$window', function($window) {
    return {
      scope: {
        ngModel: '=',
        zoomMin: '=osZoomMin',
        zoomMax: '=osZoomMax'
      },
      require: 'ngModel',
      controller: OsZoombar,
      controllerAs: 'osZoombar',
      bindToController: true,
      transclude: true,
      template: require('./templates/zoombar.jade'),
      link: function() {
        if ('componentHandler' in $window) {
          // trigger MDL refresh for components
          $window.componentHandler.upgradeAllRegistered()
        }
      }
    }
  }]);
