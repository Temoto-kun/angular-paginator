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
    var PaginatorSettingsService = function PaginatorSettingsService(settings) {
        this.getSettings = function getSettings() {
            return settings;
        };
    };

    angular
        .module('theoryofnekomata.paginator.services')
        .provider('PaginatorSettingsService', function PaginatorSettingsServiceProvider() {
            "ngInject";

            var provider = this;

            provider.settings = {};

            provider.setSettings = function setSettings(settings) {
                provider.settings = settings;
            };

            provider.$get = function PaginatorSettingsServiceFactory() {
                return new PaginatorSettingsService(provider.settings);
            };
        });
})();

(function () {
    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('FooterCtrl', function FooterCtrl() {
            "ngInject";
        });
})();

(function () {
    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('HeaderCtrl', function () {
            "ngInject";
        });

})();

(function () {
    var debounce = null,
        lock = false,
        debounceDelay = 0;

    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', function PaginatorCtrl(
            $element,
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

(function () {
    angular
        .module('theoryofnekomata.paginator.components')
        .component('tmtknPaginator', {
            template: function () {
                return (
                    '<div class="paginator-component"></div>' +
                    '<div class="paginator-model">' +
                        '<div data-ng-transclude="headers"></div>' +
                        '<div data-ng-transclude="content"></div>' +
                        '<div data-ng-transclude="footers"></div>' +
                    '</div>'
                );
            },
            transclude: {
                headers: 'tmtknPageHeaders',
                content: 'tmtknPaginatorContent',
                footers: 'tmtknPageFooters'
            },
            controller: 'PaginatorCtrl'
        });
})();
