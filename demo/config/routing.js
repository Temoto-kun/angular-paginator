(function () {
    angular
        .module('demo')
        .config(function routingConfig($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('front', {
                    url: '/front',
                    controller: 'FrontCtrl',
                    controllerAs: 'frontCtrl',
                    templateUrl: 'views/states/front.html'
                })
                .state('contact', {
                    url: '/contact',
                    controller: 'ContactCtrl',
                    templateUrl: 'views/states/contact.html'
                });

            $urlRouterProvider.otherwise('/front');
        });
})();
