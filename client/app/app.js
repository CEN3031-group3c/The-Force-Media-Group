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
  'ngModal',
  'ngMaterial',
  'ngMdIcons',
  'ui.utils.masks'
])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
      .dark();
  });
