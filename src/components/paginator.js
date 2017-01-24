(function () {
    angular
        .module('theoryofnekomata.paginator.components')
        .component('tmtknPaginator', {
            controller: 'PaginatorCtrl',
            template: '<div data-ng-transclude></div>',
            transclude: true
        });
})();
