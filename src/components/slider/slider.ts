import * as angular from 'angular';

export { OsSlider } from './controllers/osSlider';
import { OsSlider } from './controllers/osSlider';

angular
  .module('osElements')
  .component('osSlider', {
    bindings: {
      position: '@osPosition',
      opened: '=?osOpened'
    },
    controller: OsSlider,
    controllerAs: 'osSlider',
    transclude: true,
    template: 'templates/slider.html'
  });
