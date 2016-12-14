(function () {
    angular
        .module('demo.controllers')
        .controller('DemoCtrl', function DemoCtrl() {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.popupVisible = true;
            };
        });
})();
