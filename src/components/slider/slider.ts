/// <reference path="../../../typings/main.d.ts" />

export { OsSlider } from './controllers/osSlider';
import { OsSlider } from './controllers/osSlider';

angular
  .module('osElements')
  .component('osSlider', {
    bindings: {
      position: '@osPosition'
    },
    controller: OsSlider,
    controllerAs: 'osSlider',
    transclude: true,
    template: require('./templates/slider.jade')
  });
