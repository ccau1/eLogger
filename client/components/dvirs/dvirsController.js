angular.module(Constants.Module).controller('DVIRsController', ['$scope', '$reactive', 'user', '$state', function($scope, $reactive, s_user, $state) {
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
        $state.go('dvirs', { id: vehicle._id });
    }
}]);