(function () {
    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', function PaginatorCtrl(
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
        });
})();
