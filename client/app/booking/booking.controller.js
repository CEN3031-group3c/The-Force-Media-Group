'use strict';

angular.module('fmgApp')
  .controller('bookingForm', ['$scope', '$http', function($scope, $http) {
     function resetForm() {
        $scope.propName = '';
        $scope.phoneNum = '';
        $scope.email = '';
        $scope.eventDate = '';
        $scope.eventType = '';
        $scope.descript = '';
     }

    $scope.submit = function() {
      if ( $scope.bookingForm.propName && $scope.bookingForm.phoneNum && $scope.bookingForm.email && $scope.bookingForm.eventDate && $scope.bookingForm.eventType && $scope.bookingForm.descript ) {
          // $http.post('/someUrl', data, config).then(successCallback, errorCallback);
          $http.post('/api/bookingForm', $scope.bookingForm).then( function(data) {
              console.log('SUCCESS');
              resetForm();
              // May want to redirect somewhere after success, or take the received data back, and display it somehow?
            }, function(err) { console.log(err); }
          );
      }
    };
  }]);
