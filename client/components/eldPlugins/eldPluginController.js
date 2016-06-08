angular.module(Constants.Module).controller('EldPluginController', ['$scope', '$reactive', 'user', '$stateParams', 'utils', '$state', function($scope, $reactive, s_user, $stateParams, utils, $state) {
    $reactive(this).attach($scope);


    $scope.eldAdaptorKey = $stateParams.type;
    $scope.eldAdaptor = ELD_Adaptor[$stateParams.type];

    $scope.subscribe('eldPluginByType', function() {
        return [$scope.eldAdaptorKey];
    });

    $scope.helpers({
        eldPlugin: function() {
            return EldPlugins.findOne({ type: $scope.eldAdaptorKey });
        }
    });

    $scope.remove = function() {
        Meteor.call('deleteEldPlugin', $scope.eldPlugin._id, function(err) {
            if (!err) {
                utils.toast('ELD Plugin Removed', utils.TOAST_TYPE.SUCCESS);
                $state.go('admin.eldPlugins');
            } else {
                utils.toast('ELD Plugin Remove Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    };

    $scope.submitForm = function(form) {
        $scope.eldPlugin.type = $stateParams.type;
        console.log('submitForm', $scope.eldPlugin);
        Meteor.call('addEldPlugin', $scope.eldPlugin, function(err) {
            if (!err) {
                utils.toast('ELD Plugin Added', utils.TOAST_TYPE.SUCCESS);
                $state.go('admin.eldPlugins');
            } else {
                utils.toast('ELD Plugin Add Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    };

    $scope.$watch('eldPlugin', function(newVal, oldVal) {
        if (!newVal) {
            $scope.eldPlugin = {
                type: $stateParams.type,
                data: {}
            };
        }
        if (oldVal != undefined && newVal != undefined && newVal != oldVal && newVal._id && oldVal._id && $scope.eldPluginForm.$valid) {
            Meteor.call('updateEldPlugin', $scope.eldPlugin, function(err) {
                if (!err) {
                    //utils.toast('Vehicle Updated', utils.TOAST_TYPE.SUCCESS);
                } else {
                    utils.toast('ELD Plugin Update Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                }
            });
        }
    }, true);
}]);