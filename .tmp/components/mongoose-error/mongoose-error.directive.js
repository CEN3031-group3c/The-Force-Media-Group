'use strict';
angular.module('forceMediaGroupApp')
    .directive('mongooseError', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.on('keydown', function () { return ngModel.$setValidity('mongoose', true); });
        }
    };
});
//# sourceMappingURL=mongoose-error.directive.js.map