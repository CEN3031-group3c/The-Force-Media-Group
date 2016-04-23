'use strict';

angular.module('fmgApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });

// jarmone needs to get the sharable link from the image and then change "open" to "uc"
