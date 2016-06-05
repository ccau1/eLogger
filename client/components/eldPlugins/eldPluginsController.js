angular.module(Constants.Module).controller('EldPluginsController', ['$scope', '$reactive', 'user', '$state', function($scope, $reactive, s_user, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('eldPlugins');

    s_user.onReady(function() {
        $scope.helpers({
            eldPlugins: function() {
                return EldPlugins.find();
            }
        });
    });

    $scope.$watch('eldPlugins', function(newVal, oldVal) {
        $scope.inDbPlugins = lodash.map($scope.eldPlugins, function(et) { return et.type; });
    }, true);

    $scope.getAdaptors = function(isInDB) {
        if (!$scope.inDbPlugins) return [];
        return filtered = lodash.filter(ELD_Adaptor, function(o, k) {
            return isInDB ? $scope.inDbPlugins.indexOf(k) > -1 : $scope.inDbPlugins.indexOf(k) == -1;
        });
    };

    $scope.select = function(obj) {
        var eldAdaptorKey = lodash.findKey(ELD_Adaptor, obj);
        $state.go('admin.eldPlugin', { type: eldAdaptorKey });
    }
}]);