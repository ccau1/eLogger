angular.module(Constants.Module).controller('EldTypesController', ['$scope', '$reactive', 'user', '$state', function($scope, $reactive, s_user, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('eldTypes');

    s_user.onReady(function() {
        $scope.helpers({
            eldTypes: function() {
                return EldTypes.find();
            }
        });
    });

    $scope.$watch('eldTypes', function(newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.inDbTypes = lodash.map($scope.eldTypes, function(et) { return et.type; });
        }
    }, true);

    $scope.getAdaptors = function(isInDB) {
        return lodash.find(ELD_Adaptor, function(o, k) {
            return isInDB ? $scope.inDbTypes.indexOf(k) > -1 : $scope.inDbTypes.indexOf(k) == -1;
        });
    };

    $scope.select = function(obj) {
        $state.go('admin.eldType', { type: obj.name.replace(' ', '-') });
    }
}]);