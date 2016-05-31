angular.module(Constants.Module).controller('VehicleController', ['$scope', '$reactive', 'user', '$stateParams', function($scope, $reactive, s_user, $stateParams) {
    $reactive(this).attach($scope);

    $scope.subscribe('vehicleById', function() {
        return [$stateParams.id];
    });

    $scope.helpers({
        vehicle: function() {
            return Vehicles.findOne({ _id: $stateParams.id });
        }
    });

    $scope.update = function() {
        Meteor.call('updateCompany', $scope.company, function(err) {
            if (!err) {
                utils.toast('Company Updated');
            }
        });
    }

    $scope.submitForm = function() {
        Meteor.call('addVehicle', $scope.vehicle, function(err) {
            if (!err) {
                utils.toast('Vehicle Added', utils.TOAST_TYPE.SUCCESS);
            } else {
                utils.toast('Vehicle Add Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    };

    $scope.$watch('vehicle', function(newVal, oldVal) {
        if (oldVal != undefined && newVal._id && oldVal._id && newVal != oldVal) {
            // update doc
            Meteor.call('updateVehicle', $scope.vehicle, function(err) {
                if (!err) {
                    utils.toast('Vehicle Updated', utils.TOAST_TYPE.SUCCESS);
                } else {
                    utils.toast('Vehicle Update Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                }
            });
        }
    }, true);
}]);