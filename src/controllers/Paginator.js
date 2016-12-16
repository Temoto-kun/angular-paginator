(function () {
    var debounce = null,
        lock = false,
        debounceDelay = 0;

    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', function PaginatorCtrl(
            $element,
            $rootScope,
            PaginatorSettingsService
        ) {
            "ngInject";

            var $component = $element.children().eq(0),
                $models = $element.children().eq(1),

                $header = $models.children().eq(0),
                $content = $models.children().eq(1),
                $footer = $models.children().eq(2);

            function updateHeaders() {
                var $headers = $header.find('.header');

                //$headers = $headers.clone(true, true);

                $component.find('.header').remove();
                $component.append($headers.clone(true));
            }

            function updateContent() {
                var $contentWrapper = $('<div>');

                //$contentEl = $contentEl.clone(true, true);

                $contentWrapper.addClass('content').append($content.children());
                $component.find('.content').remove();
                $component.append($contentWrapper);
            }

            function updateFooters() {
                var $footers = $footer.find('.footer');

                //$footers = $footers.clone(true, true);

                $component.find('.footer').remove();
                $component.append($footers.clone(true));
            }

            function clearView() {
                $component.html('');
            }

            function paginateView() {
                var settings = PaginatorSettingsService.getSettings();

                settings.ignore = [
                    '[data-ng-repeat]'
                ];

                $component.paginate(settings);
            }

            function update() {
                lock = true;
                clearView();
                updateHeaders();
                updateContent();
                updateFooters();
                paginateView();
                lock = false;
            }

            function debounceUpdate() {
                if (!!lock) {
                    return;
                }

                if (!!debounce) {
                    clearTimeout(debounce);
                }

                debounce = setTimeout(function () {
                    update();
                }, debounceDelay);
            }

            this.$onInit = function () {
                $header.on('DOMSubtreeModified', function () {
                    debounceUpdate();
                });

                $content.on('DOMSubtreeModified', function () {
                    debounceUpdate();
                });

                $footer.on('DOMSubtreeModified', function () {
                    debounceUpdate();
                });
            };
        });
})();
