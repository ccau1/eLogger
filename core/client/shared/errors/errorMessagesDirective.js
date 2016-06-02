angular.module(Constants.Module).directive('errorMessages', ['$mdMedia', '$state', '$mdSidenav', function ($mdMedia, $state, $mdSidenav) {
    return {
        restrict: 'E', // E = element, A = attribute, C = class, M = comment
        scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'field': '=ngModel'
        },
        transclude: true,
        templateUrl: 'core/client/shared/errors/errorMessagesView.ng.html',
        controller: function ($scope) {

        },
        link: function ($scope, element, attrs) {

        }
    }
}]);
