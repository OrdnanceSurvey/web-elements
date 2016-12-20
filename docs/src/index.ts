import * as angular from 'angular';
import {DocsModule} from './docs/docs.component';

console.log('docs site uses angular version: ', angular.version.full);

export const APP_NAME = 'osel';

/*
  GET the json file to configure the docs site. Then define a service containing that JSON
 */
function loadAppConfig() {
  const initInjector = angular.injector(['ng']);
  const $http = initInjector.get('$http') as ng.IHttpService;
  const $log = initInjector.get('$log') as ng.ILogService;

  $log.debug('Starting the OS Elements Documentation site');
  return $http.get('./docs.json').then(function(response) {
    console.log('set config', response.data, APP_NAME, '$oselComponents');
    angular
      .module(APP_NAME)
      .constant('$oselComponents', response.data);
  }, function(errorResponse) {
    $log.error('App Bootstrap :: Failed to load app.config.json. The application cannot start.');
  });
}

/*
  handle the bootstrapping (angular side) of starting our app.  Only runs bootstrap after document ready event has fired
 */
function bootstrapApplication() {
  angular.element(document).ready(function() {
    angular.bootstrap(document, [APP_NAME], { strictDi: true});
  });
}

// define our top level application module
angular
  .module(APP_NAME, [DocsModule.name, 'osElements'])
  .config(['$locationProvider', '$mdThemingProvider', ($locationProvider, $mdThemingProvider) => {
    $locationProvider.html5Mode(false);
    $mdThemingProvider.setDefaultTheme('os');
  }]);

// app is defined, so load its' config then bootstrap it to start the whole thing
loadAppConfig().then(bootstrapApplication);
