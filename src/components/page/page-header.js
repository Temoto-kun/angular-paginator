(function () {
    angular
        .module('theoryofnekomata.paginator.components.page')
        .component('tmtknPageHeader', {
            template: function () {
                return (
                    '<div class="header" data-ng-class="{ terminal: $ctrl.isTerminal }"></div>'
                );
            },
            controller: 'HeaderCtrl',
            bindings: {
                isTerminal: '<'
            }
        });
})();
