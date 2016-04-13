'use strict';

angular.module('fmgApp')
  .service('emailService', function ($http) {

    var baseUrl = 'api/emails';
    var methods = {
      sendEmail: function(emailObj){
        return $http.post(baseUrl, emailObj);
      }
    };

    return methods;
   });
