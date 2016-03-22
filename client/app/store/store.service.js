/**
 * Created by Gavin on 3/16/16.
 */

angular.module('fmgApp').service('StoreService', ['$http',
  function($http) {
    var baseUrl = '/api/storeItems/';

    var methods = {
      createStoreItem: function(StoreItem) {
        return $http.post(baseUrl, StoreItem);
      },
      getAllStoreItems: function() {
        return $http.get(baseUrl);
      }
    };

    return methods;
  }
]);
