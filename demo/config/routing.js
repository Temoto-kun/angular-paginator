(function () {
    angular
        .module('demo')
        .config(function routingConfig($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('front', {
                    url: '/front',
                    views: {
                        header: {
                            controller: 'HeaderCtrl',
                            templateUrl: 'views/states/header.html'
                        },
                        content: {
                            controller: 'FrontCtrl',
                            controllerAs: 'frontCtrl',
                            templateUrl: 'views/states/front.html'
                        },
                        footer: {
                            controller: 'FooterCtrl',
                            templateUrl: 'views/states/footer.html'
                        }
                    }
                })
                .state('contact', {
                    url: '/contact',
                    views: {
                        content: {
                            controller: 'ContactCtrl',
                            templateUrl: 'views/states/contact.html'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/front');
        });
})();
