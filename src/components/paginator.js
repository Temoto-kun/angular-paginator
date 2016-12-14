(function () {
    angular
        .module('theoryofnekomata.paginator.components')
        .component('tmtknPaginator', {
            template: function () {
                return (
                    '<div class="paginator-component"></div>' +
                    '<div class="paginator-model">' +
                        '<div data-ng-transclude="headers"></div>' +
                        '<div data-ng-transclude="content"></div>' +
                        '<div data-ng-transclude="footers"></div>' +
                    '</div>'
                );
            },
            transclude: {
                headers: 'tmtknPageHeaders',
                content: 'tmtknPaginatorContent',
                footers: 'tmtknPageFooters'
            },
            controller: 'PaginatorCtrl'
        });
})();
