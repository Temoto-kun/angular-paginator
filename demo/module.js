(function () {
    angular.module('demo.controllers', []);

    angular.module('demo.components', ['demo.controllers', 'theoryofnekomata.paginator']);

    angular.module('demo', ['demo.components', 'ui.router']);
})();
