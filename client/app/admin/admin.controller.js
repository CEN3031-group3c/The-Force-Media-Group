'use strict';

angular.module('fmgApp.admin')
  .controller('AdminController', function ($scope, toaster, signUpService, pictureService, User) {

    $scope.aboutMeUrl = "";       // string to hold the url for the about me image
    $scope.users = User.query();  // storing users in a list
    $scope.dialogVisible = false; // boolean to show/hide dialog pop-up

    pictureService.getAllPictures().then(function(response) {
      $scope.pictures = response.data;
    });

    // Checking to make sure the text isn't empty and sending that message
    // to subscribed users, hide the dialog pop-up and show user toaster
    // verification
    $scope.sendText = function(textBody) {
      if (textBody) {
        signUpService.sendTextToGroup(textBody).success(function() {
          $scope.dialogVisible = false;
          toaster.pop('success', 'Text message sent!');
        });
      }
    };

    // Making put request to update picture's url and aboutMeUrl scope variable
    //
    // Google Drive Test Images
    // jarmon_fb.jpg –– https://drive.google.com/uc?id=0B-viYPCddrMLLTFramFTdmN5eTA
    // test_1.png    –– https://drive.google.com/uc?id=0B-viYPCddrMLUmF2S3lXRlBGVTg

    $scope.updatePicture = function(adminPictureIndex) {
      //replace part of url for proper image showing
      $scope.pictures[adminPictureIndex].url = $scope.pictures[adminPictureIndex].url.replace('open', 'uc');
      pictureService.updatePicture($scope.pictures[adminPictureIndex]).then(function(response) {
        console.log(response.data);
        toaster.pop('success', 'Image Updated!');
      });
    };

    // Removing a user from the list of users
    $scope.delete = function() {
      $scope.user.$remove();
      $scope.users.splice($scope.users.indexOf($scope.user), 1);
    };

    // Set dialog scope variable to true to show the dialog pop-up
    $scope.showDialog = function() {
      console.log('boom');
      $scope.dialogVisible = true;
    };

    // Set dialog scope variable to false to hide the dialog pop-up
    $scope.hideDialog = function() {
      $scope.dialogVisible = false;
    };

  });
