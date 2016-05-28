angular.module(Constants.Module).directive('headToolbar', ['$mdMedia', '$state', '$mdSidenav', function ($mdMedia, $state, $mdSidenav) {
    return {
        restrict: 'E', // E = element, A = attribute, C = class, M = comment
        scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'mdScrollShrink': '=?'
        },
        transclude: true,
        replace: true,
        templateUrl: 'core/client/shared/toolbars/headToolbarView.ng.html',
        controller: function ($scope) {

        },
        compile: function(element, attrs) {
            return {
                pre: function($scope, elem, attrs) {
                    $scope.state = $state;
                    $scope.$mdMedia = $mdMedia;
                    if ($scope.mdScrollShrink) {
                        elem.prop('md-scroll-shrink', true);
                    }

                    $scope.toggleMainMenu = function() {
                        $mdSidenav('left').toggle();
                    }
                }
            }
        },
        link: function ($scope, element, attrs) {


            //$scope.state = $state;
            //$scope.$mdMedia = $mdMedia;

        }
    }
}]);
