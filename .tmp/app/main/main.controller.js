'use strict';
(function () {
    var MainController = (function () {
        function MainController($http) {
            var _this = this;
            this.$http = $http;
            this.awesomeThings = [];
            $http.get('/api/things').then(function (response) {
                _this.awesomeThings = response.data;
            });
        }
        MainController.prototype.addThing = function () {
            if (this.newThing) {
                this.$http.post('/api/things', { name: this.newThing });
                this.newThing = '';
            }
        };
        MainController.prototype.deleteThing = function (thing) {
            this.$http.delete('/api/things/' + thing._id);
        };
        return MainController;
    })();
    angular.module('forceMediaGroupApp')
        .controller('MainController', MainController);
})();
//# sourceMappingURL=main.controller.js.map