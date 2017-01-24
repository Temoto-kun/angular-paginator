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
        .controller('PaginatorCtrl', ["$element", "$scope", function PaginatorCtrl(
            $element,
            $scope
        ) {
            "ngInject";

            var $component = $('<div>'),
                events = [
                    'paginator.renderstart',
                    'paginator.renderend'
                ];

            function bindEvents(event) {
                $component.on(event, function (e, d) {
                    $scope.$emit(event, d);
                });
            }

            this.$onInit = function () {
                var $parent = $element.parent();

                $component.paginate();

                $component.find('.watch').append($element);
                $parent.append($component);

                events
                    .forEach(function (eventName) {
                        bindEvents(eventName);
                    });
            };
        }]);
})();

(function () {
    angular
        .module('theoryofnekomata.paginator.components')
        .component('tmtknPaginator', {
            controller: 'PaginatorCtrl',
            template: '<div data-ng-transclude></div>',
            transclude: true
        });
})();

//# sourceMappingURL=angular-paginator.js.map
