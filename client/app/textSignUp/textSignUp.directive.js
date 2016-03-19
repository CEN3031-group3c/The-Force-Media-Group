'use strict';

angular.module('fmgApp')
  .directive('textSignUp', function (SignUp, toaster) {
    return {
      templateUrl: 'app/textSignUp/textSignUp.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        scope.createContact = function() {
          scope.$broadcast('startLoading');

          SignUp.createContact(scope.phoneNumber).success(function (data) {
            scope.$broadcast('stopLoading');

            if (!data.Response.Errors) {
              SignUp.sendConfirmationMessage(scope.phoneNumber).success(function () {
                toaster.pop('success', 'Congratulations!', 'You have been subscribed. You should receive a confirmation text message shortly.');
              });
            }
            else if (data.Response.Errors[0] === 'PhoneNumber: This phone number is already in your contacts list.') {
              toaster.pop('error', 'Oops', 'You have already subscribed to receive text updates from Jarmone.');
            }


          }).then(function () {
            scope.phoneNumber = undefined;
          });

        }
      }
    }
  });
