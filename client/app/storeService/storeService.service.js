'use strict';

angular.module('fmgApp')
  .service('storeService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = '/api/storeItems/';

    var methods = {
      createStoreItem: function(StoreItem) {
        return $http.post(baseUrl, StoreItem);
      },
      getAllStoreItems: function() {
        return $http.get(baseUrl);
      },
      updateItem: function(item) {
        return $http.put(baseUrl + "updateStoreItem/" + item._id, item);
      },
      deleteItem: function(item) {
        return $http.delete(baseUrl + item._id);
      },
      createCharge: function(transactionDetails) {
        return $http.put(baseUrl, transactionDetails);
      },
      validateAddress: function(address) {
        return $http.put(baseUrl + 'validateAddress/', address);
      }
    };

    return methods;
  });
