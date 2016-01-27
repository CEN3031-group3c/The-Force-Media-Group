'use strict';
var NavbarController = (function () {
    function NavbarController($location, Auth) {
        this.menu = [{
                'title': 'Home',
                'link': '/'
            }];
        this.isCollapsed = true;
        this.$location = $location;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
    }
    NavbarController.prototype.isActive = function (route) {
        return route === this.$location.path();
    };
    return NavbarController;
})();
angular.module('forceMediaGroupApp')
    .controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map