angular.module(Constants.Module).directive('menu', ['$mdMedia', '$state', '$mdSidenav', function ($mdMedia, $state, $mdSidenav) {
    return {
        restrict: 'E', // E = element, A = attribute, C = class, M = comment
        scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'menuSections': '=ngModel',
            'showDivider': '='
        },
        transclude: true,
        replace: true,
        templateUrl: 'core/client/shared/menus/menuView.ng.html',
        controller: function ($scope) {

        },
        compile: function(element, attrs) {
            return {
                pre: function($scope, elem, attrs) {

                }
            }
        },
        link: function ($scope, element, attrs) {


            //$scope.state = $state;
            //$scope.$mdMedia = $mdMedia;

        }
    }
}]);
