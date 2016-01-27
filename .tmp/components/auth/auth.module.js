'use strict';
angular.module('forceMediaGroupApp.auth', [
    'forceMediaGroupApp.constants',
    'forceMediaGroupApp.util',
    'ngCookies',
    'ngRoute'
])
    .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map