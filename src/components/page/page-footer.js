(function () {
    angular
        .module('theoryofnekomata.paginator.components.page')
        .component('tmtknPageFooter', {
            template: function () {
                return (
                    '<div class="footer" data-ng-class="{ terminal: $ctrl.isTerminal }"></div>'
                );
            },
            controller: 'FooterCtrl',
            bindings: {
                isTerminal: '<'
            }
        });
})();
