angular.module(Constants.Module).controller('DocumentController', ['$scope', '$reactive', 'utils', '$stateParams', function($scope, $reactive, utils, $stateParams) {
    $reactive(this).attach($scope);

    $scope.subscribe('documentById', function() {
        return [$stateParams.id];
    });

    $scope.helpers({
        document: function() {
            return Documents.findOne({ _id: $stateParams.id });
        }
    });

    $scope.submitForm = function() {

    }
}]);