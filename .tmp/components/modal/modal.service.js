'use strict';
angular.module('forceMediaGroupApp')
    .factory('Modal', function ($rootScope, $modal) {
    function openModal(scope, modalClass) {
        if (scope === void 0) { scope = {}; }
        if (modalClass === void 0) { modalClass = 'modal-default'; }
        var modalScope = $rootScope.$new();
        angular.extend(modalScope, scope);
        return $modal.open({
            templateUrl: 'components/modal/modal.html',
            windowClass: modalClass,
            scope: modalScope
        });
    }
    return {
        confirm: {
            delete: function (del) {
                if (del === void 0) { del = angular.noop; }
                return function () {
                    var args = Array.prototype.slice.call(arguments), name = args.shift(), deleteModal;
                    deleteModal = openModal({
                        modal: {
                            dismissable: true,
                            title: 'Confirm Delete',
                            html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                            buttons: [{
                                    classes: 'btn-danger',
                                    text: 'Delete',
                                    click: function (e) {
                                        deleteModal.close(e);
                                    }
                                }, {
                                    classes: 'btn-default',
                                    text: 'Cancel',
                                    click: function (e) {
                                        deleteModal.dismiss(e);
                                    }
                                }]
                        }
                    }, 'modal-danger');
                    deleteModal.result.then(function (event) {
                        del.apply(event, args);
                    });
                };
            }
        }
    };
});
//# sourceMappingURL=modal.service.js.map