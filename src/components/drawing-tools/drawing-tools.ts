/// <reference path="../../../typings/main.d.ts" />

import * as ol from "openlayers";
import {PolygonTool} from "./polygon.directive";
export {PolygonTool} from "./polygon.directive";

angular
  .module('osElements')
  .directive('osMapControlPolygon', PolygonTool.Factory());
