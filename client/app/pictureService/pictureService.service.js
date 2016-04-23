'use strict';

angular.module('fmgApp')
  .service('pictureService', function ($http) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = "api/adminPictures/";

    // Methods to be used throughout the application for setting, updating, and
    // retrieving images on the site.
    var methods = {
      getPictureByName: function(name) {
        return $http.get(baseUrl).then(function(response) {
          var pictureToReturn;
          response.data.forEach(function(picture) {
            if(picture.name === name) {
              pictureToReturn = picture;
            }
          });

          return Promise.resolve(pictureToReturn);
        });
      },
      getAllPictures: function() {
        return $http.get(baseUrl);
      },
      updatePicture: function(picture) {
        return $http.put(baseUrl + picture._id, picture);
      },
      createPicture: function(picture) {
        return $http.post(baseUrl, picture);
      }
    };

    return methods;

  });
