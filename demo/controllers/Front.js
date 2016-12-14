(function () {
    angular
        .module('demo.controllers')
        .controller('FrontCtrl', function FrontCtrl() {
            var ctrl = this;

            ctrl.longArrayLength = 100;

            ctrl.changeLongArrayLength = function changeLongArrayLength(length) {
                var i;

                ctrl.longArrayLength = length;
                ctrl.longArray = [];

                for(i = 1; i <= ctrl.longArrayLength; i++) {
                    (function (i) {
                        ctrl.longArray.push(i);
                    })(i);
                }
            };

            ctrl.$onInit = function () {
                ctrl.longArray = [];

                ctrl.changeLongArrayLength(ctrl.longArrayLength);
            };
        });
})();
