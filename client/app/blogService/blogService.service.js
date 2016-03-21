'use strict';

angular.module('fmgApp')
  .service('blogService', function ($http) {
      var baseUrl = "api/blogs";

      var methods = {
        getAllPosts: function() {
            return $http.get(baseUrl);
        },
        createPost: function(blogpost) {
            return $http.post(baseurl, blogpost);
        },
        deletePost: function(blogpost) {
            return $http.delete(baseurl + '/' + blogpost._id);
        },
        editPost: function(blogpost) {
            return $http.put(baseurl + '/' + blogpost._id, blogpost);
        }
      };

      return methods;
  });
