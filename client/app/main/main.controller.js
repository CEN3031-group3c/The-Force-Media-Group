'use strict';

angular.module('fmgApp')
  .controller('MainController', function ($scope, toaster, pictureService) {
    $scope.aboutMeUrl = "";

    pictureService.getPictureByName("aboutMe").then(function(picture) {
      $scope.aboutMeUrl = picture.url;
    });
    
  });
