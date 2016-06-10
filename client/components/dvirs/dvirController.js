angular.module(Constants.Module).controller('DVIRController', ['$scope', '$reactive', 'user', '$stateParams', 'utils', '$state', function($scope, $reactive, s_user, $stateParams, utils, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('vehicleById', function() {
        return [$stateParams.id];
    });

    $scope.helpers({
        vehicle: function() {
            return Vehicles.findOne({ _id: $stateParams.id });
        }
    });

    $scope.eldAdaptors = [];
    lodash.each(ELD_Adaptor, function(v,k) {
        $scope.eldAdaptors.push({ name: v.name, val: k });
    });

    $scope.$watch('vehicle.eld.type', function(newVal, oldVal) {
        if (newVal) {
            $scope.eldAdaptor = ELD_Adaptor[newVal];
        }
    });

    $scope.submitForm = function(form) {
        console.log('form', form);
        Meteor.call('addVehicle', $scope.vehicle, function(err) {
            if (!err) {
                utils.toast('Vehicle Added', utils.TOAST_TYPE.SUCCESS);
                $state.go('admin.vehicles');
            } else {
                utils.toast('Vehicle Add Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    };

    $scope.$watch('vehicle', function(newVal, oldVal) {
        if (newVal && newVal.eld && !newVal.eld.useCustomGlobal) $scope.vehicle.eld.useCustomGlobal = false;
        if (oldVal != undefined && newVal._id && oldVal._id && newVal != oldVal && $scope.vehicleForm.$valid) {
            Meteor.call('updateVehicle', $scope.vehicle, function(err) {
                if (!err) {
                    //utils.toast('Vehicle Updated', utils.TOAST_TYPE.SUCCESS);
                } else {
                    utils.toast('Vehicle Update Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                }
            });
        }
    }, true);
}]);