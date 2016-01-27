'use strict';

angular.module('fmgApp.auth', [
  'fmgApp.constants',
  'fmgApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
