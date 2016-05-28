'use strict';

angular.module(Constants.Module).controller('AccountSettingsController', ['$scope', '$log', '$reactive', '$state', function ($scope, $log, $reactive, $state) {
    $scope.$on('$viewContentLoaded', function () {

    });

    var reactiveContext = $reactive(this).attach($scope);
    var me = this;

    $scope.views = [
        { view: 'userInfo', text: 'User Information' },
        { view: 'account', text: 'Account' },
        { view: 'theme', text: 'Theme' }
    ];

    $scope.setView = function(view) {
        $scope.curView = view;
        $state.go('accountSettings.' + view.view);
    }
}]);