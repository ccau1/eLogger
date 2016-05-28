angular.module(Constants.Module).controller('VehiclesController', ['$scope', '$reactive', 'user', function($scope, $reactive, s_user) {
    $reactive(this).attach($scope);

    $scope.subscribe('vehicles');

    s_user.onReady(function() {
        $scope.helpers({
            vehicles: function() {
                return Vehicles.find();
            }
        });
    });
}]);