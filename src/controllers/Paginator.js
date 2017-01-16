(function () {
    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', function PaginatorCtrl(
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
        });
})();
