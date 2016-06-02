angular.module(Constants.Module).controller('EldTypeController', ['$scope', '$reactive', 'user', '$stateParams', 'utils', '$state', function($scope, $reactive, s_user, $stateParams, utils, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('eldTypeByType', function() {
        return [$stateParams.type];
    });

    $scope.helpers({
        eldType: function() {
            return EldTypes.findOne({ _id: $stateParams.type });
        }
    });


    var eldAdaptor = ELD_Adaptor[$stateParams];

    console.log('eld fields', eldAdaptor.dataFields);

    $scope.submitForm = function(form) {
        console.log('form', form);
        Meteor.call('addEldType', $scope.vehicle, function(err) {
            if (!err) {
                utils.toast('ELD Plugin Added', utils.TOAST_TYPE.SUCCESS);
                $state.go('admin.eldTypes');
            } else {
                utils.toast('ELD Plugin Add Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    };

    $scope.$watch('eldType', function(newVal, oldVal) {
        if (oldVal != undefined && newVal._id && oldVal._id && newVal != oldVal && $scope.vehicleForm.$valid) {
            Meteor.call('updateEldType', $scope.eldType, function(err) {
                if (!err) {
                    //utils.toast('Vehicle Updated', utils.TOAST_TYPE.SUCCESS);
                } else {
                    utils.toast('ELD Plugin Update Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                }
            });
        }
    }, true);
}]);