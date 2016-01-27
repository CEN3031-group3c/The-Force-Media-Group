'use strict';
var LoginController = (function () {
    function LoginController(Auth, $location) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.Auth = Auth;
        this.$location = $location;
    }
    LoginController.prototype.login = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.$valid) {
            this.Auth.login({
                email: this.user.email,
                password: this.user.password
            })
                .then(function () {
                _this.$location.path('/');
            })
                .catch(function (err) {
                _this.errors.other = err.message;
            });
        }
    };
    return LoginController;
})();
angular.module('forceMediaGroupApp')
    .controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map