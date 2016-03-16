'use strict';

angular.module('fmgApp')
  .service('emailService', function ($http) {

    var baseUrl = "http://localhost:9000/api/";
    var methods = {
      sendBookingEmail: function(propName, phoneNum, email, eventDate, eventType, descript){
        return $http.post(baseUrl + 'bookingForms/' + propName + '/' + phoneNum + '/' + email + '/' + eventDate + '/' + eventType +'/' + descript);
      }
    }
    return methods;
   });
