'use strict';

angular.module(Constants.Module).controller('UserInfoSettingsController', ['$scope', '$reactive', function ($scope, $reactive) {
    $scope.$on('$viewContentLoaded', function () {

    });

    var reactiveContext = $reactive(this).attach($scope);
    var me = this;


    $scope.showChangePassword = function() {
        $scope.showChangePasswordView = true;
    }
}]);