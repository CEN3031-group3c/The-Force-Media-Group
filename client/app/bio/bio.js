'use strict';

angular.module('fmgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bio', {
        url: '/about',
        templateUrl: 'app/bio/bio.html',
        controller: 'BioCtrl'
      });
  });
