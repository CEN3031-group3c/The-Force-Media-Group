'use strict';

angular.module('fmgApp')
  .service('colorService', function ($http) {
    // AngularJS will instantiate a singleton by calling 'new' on this function

    var baseUrl = '/api/themeColors';

    var methods = {
      getAllColors: function() {
        return $http.get(baseUrl);
      },
      createColor: function(color) {
        return $http.post(baseUrl, color);
      },
      updateColor: function(color) {
        return $http.put(baseUrl + '/' + color._id, color);
      }
    };

    return methods;

  });
