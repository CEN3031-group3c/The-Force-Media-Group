'use strict';
angular.module('forceMediaGroupApp')
    .directive('navbar', function () { return ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
}); });
//# sourceMappingURL=navbar.directive.js.map