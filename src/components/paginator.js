(function () {
    angular
        .module('theoryofnekomata.paginator.components')
        .component('tmtknPaginator', {
            controller: 'PaginatorCtrl',
            template: '<div class="paginator-component" data-ng-transclude></div>',
            transclude: true
        });
})();
