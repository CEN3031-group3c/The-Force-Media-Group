/**
 * Created by Gavin on 2/4/16.
 */
'use strict';

angular.module('fmgApp').service('signUpService', ['$http',
  function($http) {
    var baseUrl = '/api/eztextings/';

    var methods = {
      sendConfirmationMessage: function(phoneNumber) {
        return $http.get(baseUrl + 'sendConfirmationMessage/' + phoneNumber);
      },

      createContact: function(phoneNumber) {
        return $http.get(baseUrl + 'createContact/' + phoneNumber);
      },
      sendTextToGroup: function(messageText) {
        return $http.get(baseUrl + 'sendTextToGroup/' + messageText);
      }

    };

    return methods;
  }
]);
