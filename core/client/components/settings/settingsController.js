'use strict';

angular.module(Constants.Module).controller('SettingsController', ['$scope', '$reactive', '$state', 'user', function ($scope, $reactive, $state, s_user) {
    $scope.$on('$viewContentLoaded', function () {

    });

    var reactiveContext = $reactive(this).attach($scope);
    var me = this;
    $scope.$state = $state;

    s_user.onReady(function() {
        $scope.usr = s_user.currentUser;
    });

    $scope.views = [
        { view: 'userInfo', text: 'User Information' },
        { view: 'account', text: 'Account' },
        //{ view: 'theme', text: 'Theme' }
        { view: 'vehicle', text: 'Vehicle' },
    ];

    $scope.setView = function(view) {
        $scope.curView = view;
        $state.go('settings.' + view.view);
    }
}]);