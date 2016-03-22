'use strict';

angular.module('fmgApp', [
  'fmgApp.auth',
  'fmgApp.admin',
  'fmgApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.mask',
  'toaster',
  'ngModal'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
