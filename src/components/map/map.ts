/// <reference path="../../../typings/main.d.ts" />

import * as ol from "openlayers";
import {MaxSize} from "./max-size.directive";
export {MaxSize} from "./max-size.directive";

angular
  .module('osElements')
  .directive('osMapMaxSize', MaxSize.Factory());
