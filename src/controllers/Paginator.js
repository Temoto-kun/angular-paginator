(function () {
    var debounce = null,
        lock = false,
        debounceDelay = 250;

    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', function PaginatorCtrl(
            $element,
            $scope,
            PaginatorSettingsService
        ) {
            "ngInject";

            var $component = $element.children().eq(0),
                $models = $element.children().eq(1),
                $content = $models.children().eq(1),
                $contentContainer = $('<div>'),
                observer = new MutationObserver(update);

            function extractElements() {
                console.log($content);

                $content
                    .children()
                    .children()
                    .appendTo($contentContainer);

                $models
                    .find('.header, .footer')
                    .appendTo($component.find('.watch'));
            }

            function update() {
                detachObserver();
                extractElements();
                attachObserver();
            }

            function initComponentHtml() {
                $element.addClass('paginator-wrapper');

                $component.paginate();

                $contentContainer
                    .addClass('content')
                    .appendTo($component.find('.watch'));
            }

            function initEvents() {
                var eventNames = 'modelchangestart modelchangeend'.split(' ');

                eventNames
                    .forEach(function (eventName) {
                        var paginatorEventName = 'paginator.' + eventName;

                        $component.on(paginatorEventName, function () {
                            $scope.$emit(paginatorEventName);
                        });
                    });
            }

            function attachObserver() {
                observer.observe($models[0], { childList: true, attributes: true, characterData: true, subtree: true });
            }

            function detachObserver() {
                observer.disconnect();
            }

            this.$onInit = function () {
                initComponentHtml();
                initEvents();
                attachObserver();
            };
        });
})();
