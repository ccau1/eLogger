angular.module(Constants.Module).controller('ToolbarController', ['$scope', '$state', '$mdMedia', '$mdSidenav', function($scope, $state, $mdMedia, $mdSidenav) {
    $scope.$state = $state;
    $scope.$mdMedia = $mdMedia;

    $scope.toggleMainMenu = function() {
        $mdSidenav('left').toggle();
    }
    //setInterval(function() { console.log($state.current); }, 1000);
}]);