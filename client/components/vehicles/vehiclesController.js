angular.module(Constants.Module).controller('VehiclesController', ['$scope', '$reactive', 'user', '$state', function($scope, $reactive, s_user, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('vehicles');

    s_user.onReady(function() {
        $scope.helpers({
            vehicles: function() {
                return Vehicles.find();
            }
        });
    });

    $scope.selectVehicle = function(vehicle) {
        $state.go('admin.vehicle', { id: vehicle._id });
    }
}]);