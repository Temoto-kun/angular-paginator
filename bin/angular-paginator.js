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
                        '<div class="paginator-content" data-ng-transclude="content"></div>' +
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
