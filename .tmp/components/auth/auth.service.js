'use strict';
(function () {
    function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
        var safeCb = Util.safeCb;
        var currentUser = {};
        var userRoles = appConfig.userRoles || [];
        if ($cookies.get('token') && $location.path() !== '/logout') {
            currentUser = User.get();
        }
        var Auth = {
            login: function (_a, callback) {
                var email = _a.email, password = _a.password;
                return $http.post('/auth/local', {
                    email: email,
                    password: password
                })
                    .then(function (res) {
                    $cookies.put('token', res.data.token);
                    currentUser = User.get();
                    return currentUser.$promise;
                })
                    .then(function (user) {
                    safeCb(callback)(null, user);
                    return user;
                })
                    .catch(function (err) {
                    Auth.logout();
                    safeCb(callback)(err.data);
                    return $q.reject(err.data);
                });
            },
            logout: function () {
                $cookies.remove('token');
                currentUser = {};
            },
            createUser: function (user, callback) {
                return User.save(user, function (data) {
                    $cookies.put('token', data.token);
                    currentUser = User.get();
                    return safeCb(callback)(null, user);
                }, function (err) {
                    Auth.logout();
                    return safeCb(callback)(err);
                }).$promise;
            },
            changePassword: function (oldPassword, newPassword, callback) {
                return User.changePassword({ id: currentUser._id }, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function () {
                    return safeCb(callback)(null);
                }, function (err) {
                    return safeCb(callback)(err);
                }).$promise;
            },
            getCurrentUser: function (callback) {
                if (arguments.length === 0) {
                    return currentUser;
                }
                var value = (currentUser.hasOwnProperty('$promise')) ?
                    currentUser.$promise : currentUser;
                return $q.when(value)
                    .then(function (user) {
                    safeCb(callback)(user);
                    return user;
                }, function () {
                    safeCb(callback)({});
                    return {};
                });
            },
            isLoggedIn: function (callback) {
                if (arguments.length === 0) {
                    return currentUser.hasOwnProperty('role');
                }
                return Auth.getCurrentUser(null)
                    .then(function (user) {
                    var is = user.hasOwnProperty('role');
                    safeCb(callback)(is);
                    return is;
                });
            },
            hasRole: function (role, callback) {
                var hasRole = function (r, h) {
                    return userRoles.indexOf(r) >= userRoles.indexOf(h);
                };
                if (arguments.length < 2) {
                    return hasRole(currentUser.role, role);
                }
                return Auth.getCurrentUser(null)
                    .then(function (user) {
                    var has = (user.hasOwnProperty('role')) ?
                        hasRole(user.role, role) : false;
                    safeCb(callback)(has);
                    return has;
                });
            },
            isAdmin: function () {
                return Auth.hasRole
                    .apply(Auth, [].concat.apply(['admin'], arguments));
            },
            getToken: function () {
                return $cookies.get('token');
            }
        };
        return Auth;
    }
    angular.module('forceMediaGroupApp.auth')
        .factory('Auth', AuthService);
})();
//# sourceMappingURL=auth.service.js.map