'use strict';
(function () {
    function authInterceptor($rootScope, $q, $cookies, $location, Util) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
                    config.headers.Authorization = 'Bearer ' + $cookies.get('token');
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    $cookies.remove('token');
                }
                return $q.reject(response);
            }
        };
    }
    angular.module('forceMediaGroupApp.auth')
        .factory('authInterceptor', authInterceptor);
})();
//# sourceMappingURL=interceptor.service.js.map