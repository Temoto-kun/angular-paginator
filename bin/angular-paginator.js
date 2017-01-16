(function () {
    angular.module('theoryofnekomata.paginator.services', []);

    angular.module('theoryofnekomata.paginator.controllers', [
        'theoryofnekomata.paginator.services'
    ]);

    angular.module('theoryofnekomata.paginator.components', [
        'theoryofnekomata.paginator.controllers'
    ]);

    angular.module('theoryofnekomata.paginator', [
        'theoryofnekomata.paginator.components'
    ]);
})();

(function () {
    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', ["$element", function PaginatorCtrl(
            $element
        ) {
            "ngInject";

            var $component = $('<div>');

            this.$onInit = function () {
                var $parent = $element.parent();

                $component.paginate();

                $component.find('.watch').append($element);
                $parent.append($component);
            };
        }]);
})();

(function () {
    angular
        .module('theoryofnekomata.paginator.components')
        .component('tmtknPaginator', {
            controller: 'PaginatorCtrl',
            template: '<div class="paginator-component" data-ng-transclude></div>',
            transclude: true
        });
})();

//# sourceMappingURL=angular-paginator.js.map
