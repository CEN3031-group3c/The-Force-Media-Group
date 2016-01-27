'use strict';

angular.module('forceMediaGroupApp', [
  'forceMediaGroupApp.auth',
  'forceMediaGroupApp.admin',
  'forceMediaGroupApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
