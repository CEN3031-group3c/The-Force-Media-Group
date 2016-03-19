/**
 * Created by Gavin on 2/4/16.
 */
'use strict';

angular.module('fmgApp').factory('SignUp', ['$http',
  function($http) {
    var baseUrl = 'http://localhost:9000/';

    var methods = {
      sendConfirmationMessage: function(phoneNumber) {
        return $http.get(baseUrl + 'api/eztextings/sendConfirmationMessage/' + phoneNumber);
      },

      createContact: function(phoneNumber) {
        return $http.get(baseUrl + 'api/eztextings/createContact/' + phoneNumber);
      },
      sendTextToGroup: function(messageText) {
        return $http.get(baseUrl + 'api/eztextings/sendTextToGroup/' + messageText);
      }

    };

    return methods;
  }
]);
