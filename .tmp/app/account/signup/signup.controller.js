'use strict';
var SignupController = (function () {
    function SignupController(Auth, $location) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.Auth = Auth;
        this.$location = $location;
    }
    SignupController.prototype.register = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.$valid) {
            this.Auth.createUser({
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            })
                .then(function () {
                _this.$location.path('/');
            })
                .catch(function (err) {
                err = err.data;
                _this.errors = {};
                angular.forEach(err.errors, function (error, field) {
                    form[field].$setValidity('mongoose', false);
                    _this.errors[field] = error.message;
                });
            });
        }
    };
    return SignupController;
})();
angular.module('forceMediaGroupApp')
    .controller('SignupController', SignupController);
//# sourceMappingURL=signup.controller.js.map