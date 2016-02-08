/// <reference path="../../../typings/main.d.ts" />

import * as ol from "openlayers";
import {MaxSize} from "./max-size.directive";
export {MaxSize} from "./max-size.directive";
import {ProjectionServiceProvider} from "./projection.service";
export {ProjectionServiceProvider} from "./projection.service";

angular
  .module('osElements')
  .constant('ol', require('openlayers'))
  .constant('proj4', require('proj4'))
  .run(['$window', function ($window) {
    $window.proj4 = require('proj4');
  }])
  .directive('osMaxSize', MaxSize.Factory())
  .provider('osProjectionService', ProjectionServiceProvider);
