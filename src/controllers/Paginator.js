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
                ],
                isRenderedAgain = false,
                paginator;

            function bindEvents(event) {
                $component.on(event, function (e, d) {

                    //if (event === 'paginator.renderend' && isRenderedAgain) {
                    //    isRenderedAgain = false;
                    //}
                    //
                    //if (event === 'paginator.renderstart' && !isRenderedAgain ||
                    //    event === 'paginator.renderend' && isRenderedAgain) {
                    //    $scope.$emit(event, d);
                    //    return;
                    //}

                    $scope.$emit(event, d);

                    //if (event === 'paginator.renderend' && !isRenderedAgain) {
                    //    paginator.refresh();
                    //    isRenderedAgain = true;
                    //}
                });
            }

            this.$onInit = function () {
                var $parent = $element.parent();

                paginator = $component.paginate({ watch: false });

                $component.find('.watch').append($element);
                $parent.append($component);

                events
                    .forEach(function (eventName) {
                        bindEvents(eventName);
                    });

                $scope.$on('paginator.refresh', function () {
                    paginator.refresh();
                    $component.prop('scrollTop', 0);
                });
            };
        });
})();
