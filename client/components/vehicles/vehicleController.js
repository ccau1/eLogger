angular.module(Constants.Module).controller('VehicleController', ['$scope', '$reactive', 'user', '$stateParams', function($scope, $reactive, s_user, $stateParams) {
    $reactive(this).attach($scope);

    $scope.subscribe('vehicleById', function() {
        return [$stateParams.id];
    });

    s_user.onReady(function() {
        $scope.helpers({
            vehicle: function() {
                return Vehicles.findOne({ _id: $stateParams.id });
            }
        });
    });

    $scope.update = function() {
        Meteor.call('updateCompany', $scope.company, function(err) {
            if (!err) {
                utils.toast('Company Updated');
            }
        });
    }
}]);