'use strict';

angular.module('fmgApp')
  .controller('CartCtrl', function ($scope, toaster, $stateParams) {
    $scope.showDialog = false;
    $scope.currentItem = undefined;
    $scope.items = $stateParams.items;
    $scope.orderTotal = 0;

    $scope.items.forEach(function(item) {
      $scope.orderTotal += item.Price;
    });

    $scope.confirmRemoveItem = function(index) {
      $scope.currentItem = index;
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.currentItem = undefined;
      $scope.showDialog = false;
    };

    $scope.removeItem = function() {
      $scope.items.splice($scope.currentItem, 1);
      toaster.pop("success", "Item removed from cart");

      $scope.orderTotal = 0;
      $scope.items.forEach(function(item) {
        $scope.orderTotal += item.Price;
      });

      $scope.hideDialog();
    };

    $scope.hideDialog = function() {
      $scope.showDialog = false;
    };

    $scope.checkout = function() {
      //send email with dj's email service after he pushes.
    };


  });
