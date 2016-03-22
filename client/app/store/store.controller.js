'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope, $state, toaster) {
    $scope.addedItems = [];
    $scope.items=[
      {
        Name: 'Item 1',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 2',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 3',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 4',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 5',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'Item 6',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      }
    ];

    $scope.seeItem = function(index) {
      $scope.selectedItem = $scope.items[index];
      $scope.showDialog = true;
    };

    $scope.closeDialog = function() {
      $scope.selectedItem = undefined;
      $scope.showDialog = false;
    };
    
    $scope.addToCart= function(item){
      toaster.pop("success", "Added " + item.Name);
      $scope.addedItems.push(item);
      console.log($scope.addedItems);
    };

  });
