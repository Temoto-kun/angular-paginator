(function () {
    angular
        .module('demo.controllers')
        .controller('CounterCtrl', function CounterCtrl() {
            this.$onInit = function () {
                this.cookieCount = 5;
            };

            this.takeAllCookies = function takeAllCookies() {
                this.cookieCount = 0;
                this.onChange({ $count: this.cookieCount });
            };

            this.putCookieInJar = function putCookieInJar() {
                this.cookieCount++;
                this.onChange({ $count: this.cookieCount });
            };
        });
})();
