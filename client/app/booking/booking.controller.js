'use strict';

angular.module('fmgApp')
  .controller('BookingCtrl', ['$scope', '$http', 'emailService', function($scope, $http, emailService) {
     function resetForm() {
        $scope.propName = 'DJ Meyers';
        $scope.phoneNum = '5619510869';
        $scope.email = 'djmeyers@outlook.com';
        $scope.eventDate = '04/15/2016 05:30 PM';
        $scope.eventType = 'Speaking';
        $scope.descript = 'asdfasdf';
     }


    $scope.submit = function() {
      if ( $scope.propName && $scope.phoneNum && $scope.email && $scope.eventDate && $scope.eventType && $scope.descript ) {

          var bookingRequest = {
            propName: $scope.propName,
            phoneNum: $scope.phoneNum,
            email: $scope.email,
            eventDate: $scope.eventDate,
            eventType: $scope.eventType,
            descript: $scope.descript
          };
          console.log(bookingRequest);
          console.log('Calling sendBookingEmail');

          var emailObj = {
            sendTo: "gdscheele@ufl.edu",
            subject: "New Booking Request",
            emailBody: 'Requester Name: ' + $scope.propName + '\nRequester Email: ' + $scope.email + '\nRequester Phone: ' + $scope.phoneNum + '\nEvent Type: ' + $scope.eventType + '\nEvent Description: ' + $scope.descript + '\nEvent Date/Time: ' + $scope.eventDate
          };

          emailService.sendEmail(emailObj).success(function(data) {
            console.log(data);
          })

      }
    };
  }]);
