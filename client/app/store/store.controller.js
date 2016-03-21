'use strict';

angular.module('fmgApp')
  .controller('StoreCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.items=[
      {
        Name: 'item1',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'item2',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'item3',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'item4',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      },
      {
        Name: 'item5',
        Picture: '../assets/images/store/Merchandise_Icon.png',
        Price: 19.99,
        Description: 'description'
      }
    ];
  });
