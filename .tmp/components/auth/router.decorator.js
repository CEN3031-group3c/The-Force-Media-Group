'use strict';
(function () {
    angular.module('forceMediaGroupApp.auth')
        .run(function ($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (!next.authenticate) {
                return;
            }
            if (typeof next.authenticate === 'string') {
                Auth.hasRole(next.authenticate, _.noop).then(function (has) {
                    if (has) {
                        return;
                    }
                    event.preventDefault();
                    return Auth.isLoggedIn(_.noop).then(function (is) {
                        $location.path(is ? '/' : '/login');
                    });
                });
            }
            else {
                Auth.isLoggedIn(_.noop).then(function (is) {
                    if (is) {
                        return;
                    }
                    event.preventDefault();
                    $location.path('/');
                });
            }
        });
    });
})();
//# sourceMappingURL=router.decorator.js.map