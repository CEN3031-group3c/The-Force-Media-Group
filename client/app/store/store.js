'use strict';

angular.module('fmgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store',
        templateUrl: 'app/store/store.html',
        controller: 'StoreCtrl'
      });
  });
