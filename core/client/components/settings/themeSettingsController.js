'use strict';

angular.module(Constants.Module).controller('ThemeSettingsController', ['$scope', '$reactive', function ($scope, $reactive) {
    $scope.$on('$viewContentLoaded', function () {

    });

    var reactiveContext = $reactive(this).attach($scope);
    var me = this;
}]);