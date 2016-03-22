'use strict';

angular.module('fmgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('booking', {
        url: '/booking',
        templateUrl: 'app/booking/booking.html',
        controller: 'BookingCtrl'
      });
  });
