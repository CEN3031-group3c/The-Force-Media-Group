'use strict';
(function () {
    var AdminController = (function () {
        function AdminController(User) {
            this.users = User.query();
        }
        AdminController.prototype.delete = function (user) {
            user.$remove();
            this.users.splice(this.users.indexOf(user), 1);
        };
        return AdminController;
    })();
    angular.module('forceMediaGroupApp.admin')
        .controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map