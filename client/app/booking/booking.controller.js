'use strict';

angular.module('fmgApp')
  .controller('BookingCtrl', ['$scope', '$http', function($scope, $http) {
     function resetForm() {
        $scope.propName = '';
        $scope.phoneNum = '';
        $scope.email = '';
        $scope.eventDate = '';
        $scope.eventType = '';
        $scope.descript = '';
     }

    $scope.submit = function() {
      if ( $scope.BookingCtrl.propName && $scope.BookingCtrl.phoneNum && $scope.BookingCtrl.email && $scope.BookingCtrl.eventDate && $scope.BookingCtrl.eventType && $scope.BookingCtrl.descript ) {
          // $http.post('/someUrl', data, config).then(successCallback, errorCallback);
          $http.post('/api/BookingCtrl', $scope.BookingCtrl).then( function(data) {
              console.log('SUCCESS');
              resetForm();
              // May want to redirect somewhere after success, or take the received data back, and display it somehow?
            }, function(err) { console.log(err); }
          );
      }
    };
  }]);
