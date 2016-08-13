angular.module(Constants.Module).controller('DvirDefectSelectController', ['$scope', '$reactive', '$mdDialog', 'data', function($scope, $reactive, $mdDialog, data) {
    $reactive(this).attach($scope);

    $scope.availableDefects = lodash.values(Constants.AvailableDefect);

    $scope.defects = [];

    $scope.$watch(function() { return data.defects }, function(newVal, oldVal) {
        if (newVal) {
            var index = -1;

            _.each(newVal, function(o) {
                index = $scope.availableDefects.indexOf(o.name);
                console.log('each', index, o);
                if (index != -1) {
                    o.selected = true;
                    $scope.defects[index] = o;
                }
            });
        }
    });

    $scope.stopProp = function (ev) {
        ev.stopPropagation();
    }

    $scope.save = function() {
        var filteredList = lodash.filter($scope.defects, { selected: true });
        console.log('defects', filteredList);
        $mdDialog.hide({type: 'update', obj: filteredList });
    };

    $scope.cancel = function () {
        $mdDialog.hide();
    };
}]);