angular.module(Constants.Module).controller('LogStatusSelectController', ['$scope', 'user', 'utils', '$mdDialog', 'data', function($scope, s_user, utils, $mdDialog, data) {
    $scope.statusObj = {};
    $scope.setStatus = function(status) {

        $scope.statusObj.status = status;
    };

    $scope.save = function() {
        $mdDialog.hide({type: 'update', obj: $scope.statusObj });
    };


    $scope.statuses = _.map(Constants.Log.Status, function(v,k) {
        return { name: v, key: k };
    });

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);