/// <reference path="../../../typings/main.d.ts" />

import * as ol from "openlayers";

import {PolygonTool} from "./polygon/polygon.directive";
export {PolygonTool} from "./polygon/polygon.directive";

angular
  .module('osElements')
  .directive('osMapControlPolygon', PolygonTool.Factory());
