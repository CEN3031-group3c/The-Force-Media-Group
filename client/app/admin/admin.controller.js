'use strict';

angular.module('fmgApp.admin')
  .controller('AdminController', function ($scope, toaster, colorService, signUpService) {

    $scope.themeColors = [];
    $scope.customColors = [];
    $scope.dialogVisible = false;

    $scope.sendText = function(textBody) {
      if (textBody) {
        signUpService.sendTextToGroup(textBody).success(function() {
          $scope.dialogVisible = false;
          toaster.pop('success', 'Text message sent!');
        });
      }
    };

    colorService.getAllColors()
      .then(function(response) {
        $scope.themeColors = response.data;
        $scope.customColors = response.data;
        console.log(response.data);
      }).catch(function(err) {
          console.log(err);
      });

    $scope.saveCustomColorTheme = function() {
      console.log('save button clicked');
      console.log($scope.customColors);

      $scope.customColors.forEach(function(item) {
        colorService.updateColor(item)
          .then(function(response) {
            console.log(response.data);
            colorService.getAllColors()
              .then(function(response) {
                $scope.themeColors = response.data;
                $scope.customColors = response.data;
                var colors = response.data;

                $('.deepSeaBackground').css({'background-color': colors[0].colorCode});
                $('.deepSeaColor').css({'color': colors[0].colorCode});

                $('.skyBlueBackground').css({'background-color': colors[1].colorCode});
                $('.skyBlueColor').css({'color': colors[1].colorCode});

                $('.crestBackground').css({'background-color': colors[2].colorCode});
                $('.crestColor').css({'color': colors[2].colorCode});

                $('.sadDayBackground').css({'background-color': colors[3].colorCode});
                $('.sadDayColor').css({'color': colors[3].colorCode});

                $('.cloudyBackground').css({'background-color': colors[4].colorCode});
                $('.cloudyColor').css({'color': colors[4].colorCode});

                console.log(response.data);
              }).catch(function(err) {
                  console.log(err);
              });

          }).catch(function(err) {
            console.log(err);
          });
      });

    };

    $scope.delete = function() {
      $scope.user.$remove();
      $scope.users.splice($scope.users.indexOf($scope.user), 1);
    };

    $scope.createColor = function() {

      var hexCode = $scope.color.text;

      if (hexCode === '') {
        toaster.pop('error','Please enter text.');
        return;
      }

      var colorToCreate = {
        hexCode: hexCode
      };

      colorService.createColor(colorToCreate)
        .then(function (response) {
          var color = response.data;
          toaster.pop('success','Color submitted');
          $scope.color.text = '';
          console.log(color);
          $scope.themeColors.push(color);
        }).catch(function(err){
          console.log(err);
        });
    };

    $scope.showDialog = function() {
      $scope.dialogVisible = true;
    };

    $scope.hideDialog = function() {
      $scope.dialogVisible = false;
    };



  });
