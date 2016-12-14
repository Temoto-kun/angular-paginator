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
