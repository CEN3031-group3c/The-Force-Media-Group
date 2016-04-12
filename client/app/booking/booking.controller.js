'use strict';

angular.module('fmgApp')
  .controller('BookingCtrl', ['$scope', '$http', 'emailService', function($scope, $http, emailService) {
     //reset Form to default empty values
     function resetForm() {
        $scope.propName = '';
        $scope.phoneNum = '';
        $scope.email = '';
        $scope.eventDate = '';
        $scope.eventType = '';
        $scope.descript = '';
     }

    //When you submit, pass the following values if they all exist.
    $scope.submit = function() {
      console.log('button!');
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

          //mail object used by transporter which will be sent to Jarmone (currently Gavin's email) so that he can get in touch with the client.
          var emailObj = {
            sendTo: 'mrdjmeyers@ufl.edu',
            subject: 'New Booking Request',
            emailBody: 'Requester Name: ' + $scope.propName + '\nRequester Email: ' + $scope.email + '\nRequester Phone: ' + $scope.phoneNum + '\nEvent Type: ' + $scope.eventType + '\nEvent Description: ' + $scope.descript + '\nEvent Date/Time: ' + $scope.eventDate
          };

          emailService.sendEmail(emailObj).success(function(data) {
            console.log(data);
          });

      }
    };
  }]);
