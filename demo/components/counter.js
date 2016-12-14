(function () {
    angular
        .module('demo.components')
        .component('fooCounter', {
            templateUrl: './views/components/counter.html',
            controller: 'CounterCtrl',
            bindings: {
                onChange: '&'
            }
        })
})();
