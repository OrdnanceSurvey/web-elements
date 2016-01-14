angular
    .module('demo-app', ['osElements'])
    .controller('AppController', function() {
        this.doSomething = function() {
            console.log('do something from TS');
        };
    });

angular.element().ready(function() {
    angular.bootstrap(angular.element(document.body), ['demo-app']);
});