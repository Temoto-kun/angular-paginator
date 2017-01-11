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
    var debounce = null,
        lock = false,
        debounceDelay = 250;

    angular
        .module('theoryofnekomata.paginator.controllers')
        .controller('PaginatorCtrl', ["$element", "$scope", "PaginatorSettingsService", function PaginatorCtrl(
            $element,
            $scope,
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
                //var observer = new MutationObserver(update);
                //
                //observer.observe($header[0], { childList: true, attributes: true, characterData: true, subtree: true });
                //observer.observe($content[0], { childList: true, attributes: true, characterData: true, subtree: true });
                //observer.observe($footer[0], { childList: true, attributes: true, characterData: true, subtree: true });

                $element.addClass('paginator-wrapper');

                $component.on('paginator.modelchangestart', function () {
                    $scope.$emit('paginator.modelchangestart');
                });

                $component.on('paginator.modelchangeend', function () {
                    $scope.$emit('paginator.modelchangeend');
                });

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
        }]);
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
                    '</div>' +
                    '<div class="paginator-loader" data-ng-transclude="loader"></div>'
                );
            },
            transclude: {
                headers: '?tmtknPageHeaders',
                content: 'tmtknPaginatorContent',
                footers: '?tmtknPageFooters',
                loader: '?tmtknPaginatorLoader'
            },
            controller: 'PaginatorCtrl'
        });
})();

//# sourceMappingURL=angular-paginator.js.map
