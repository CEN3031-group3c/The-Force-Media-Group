'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope, $state, toaster, Auth, storeService) {
    $scope.addedItems = [];
    $scope.isAdmin = Auth.isAdmin();
    $scope.showAddItemDialog = false;
    $scope.editingItem = false;
    $scope.tmpItem = undefined;

    $scope.newStoreItem = {
      Name: undefined,
      Picture: "https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc",
      Price: undefined,
      Description: undefined
    };

    $scope.$watch('newStoreItem.Picture', function(value) {
      if(value) {
        $scope.newStoreItem.Picture = $scope.newStoreItem.Picture.replace("open", "uc");
      }
    });

    if($scope.isAdmin)
      $('.ng-modal-dialog').css({"height":"85%"});

    storeService.getAllStoreItems().success(function(data) {
      $scope.items = data;
    });

    $scope.seeItem = function(index) {
      //shallow copy selected item
      $scope.selectedItem = $.extend( {}, $scope.items[index]);
      console.log($scope.selectedItem);
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.selectedItem = undefined;
      $scope.showDialog = false;
    };

    $scope.addToCart= function(newItem){
      if(Auth.isLoggedIn()) {
        var found = false;

        $scope.addedItems.forEach(function (oldItem) {
          if (oldItem._id === newItem._id) {
            found = true;
          }
        });
        if (found) {
          toaster.pop('error', 'This item is already in your cart.', 'Go to your cart to remove the item or to change the quantity desired.');
        } else {
          toaster.pop('success', 'Added ' + newItem.Name + ' to the cart!');
          newItem.Quantity = 1;
          $scope.addedItems.push(newItem);
        }
      } else {
        toaster.pop("error", "You must log in to add items to your cart.");
      }
    };

    $scope.addStoreItem = function() {
      $scope.showAddItemDialog = true;
    };

    $scope.closeAddStoreItem = function() {
      $scope.showAddItemDialog = false;
    };

    $scope.saveStoreItem = function() {
      console.log($scope.newStoreItem);
      storeService.createStoreItem($scope.newStoreItem).success(function(data) {
        $scope.newStoreItem = {
          Name: undefined,
          Picture: 'https://drive.google.com/uc?id=0B-viYPCddrMLN29HdEFObjNhRXc',
          Price: undefined,
          Description: undefined
        };

        toaster.pop('success', 'New Item Added!');

        $scope.closeAddStoreItem();
        storeService.getAllStoreItems().success(function(data) {
          $scope.items = data;
        });
      });
    };

    $scope.editItem = function() {
      $scope.tmpItem = $.extend( {}, $scope.selectedItem );
      $scope.editingItem = true;
    };

    $scope.saveEdit = function() {
      $scope.selectedItem = $scope.tmpItem;
      storeService.updateItem($scope.tmpItem).success(function(data) {
        storeService.getAllStoreItems().success(function(data) {
          $scope.items = data;
          $scope.editingItem = false;
        });

      });
    };

    $scope.undoEdit = function() {
      $scope.editingItem = false;
      $scope.tmpItem = undefined;
    };

    $scope.deleteStoreItem = function() {
      storeService.deleteItem($scope.selectedItem).success(function() {
        storeService.getAllStoreItems().success(function(data) {
          $scope.items = data;
          $scope.closeDialog();
        });
      });
    };


  });
