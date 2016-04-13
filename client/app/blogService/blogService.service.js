'use strict';

angular.module('fmgApp')
  .service('blogService', function ($http) {
      var baseUrl = 'api/blogs';

      var methods = {
        getAllPosts: function() {
            return $http.get(baseUrl);
        },
        createPost: function(blogpost) {
            return $http.post(baseUrl, blogpost);
        },
        deletePost: function(blogpost) {
            return $http.delete(baseUrl + '/' + blogpost._id);
        },
        editPost: function(blogpost) {
            return $http.put(baseUrl + '/' + blogpost._id, blogpost);
        },
        togglePublished: function(blogpost) {
            blogpost.published = !blogpost.published;
            return $http.put(baseUrl + '/' + blogpost._id, blogpost);
        }
      };

      return methods;
  });
