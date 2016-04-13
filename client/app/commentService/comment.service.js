'use strict';

angular.module('fmgApp')
  .service('commentService', function ($http) {
    var baseUrl = '/api/comments/';

    var methods = {
      getAllComments: function(){
        return $http.get(baseUrl);
      },
      createComment: function(comment){
        return $http.post(baseUrl, comment);
    },
        deleteComment: function(comment) {
            return $http.delete(baseUrl + '/' + comment._id);
    }
    };

    return methods;
  });
