(function () {
    angular.module('theoryofnekomata.paginator.services', []);

    angular.module('theoryofnekomata.paginator.controllers', [
        'theoryofnekomata.paginator.services'
    ]);

    angular.module('theoryofnekomata.paginator.components.page', [
        'theoryofnekomata.paginator.controllers'
    ]);

    angular.module('theoryofnekomata.paginator.components', [
        'theoryofnekomata.paginator.controllers',
        'theoryofnekomata.paginator.components.page'
    ]);

    angular.module('theoryofnekomata.paginator', [
        'theoryofnekomata.paginator.components',
        'theoryofnekomata.paginator.components.page'
    ]);
})();
