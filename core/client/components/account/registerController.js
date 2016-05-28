angular.module(Constants.Module).controller('RegisterController', ['$scope', '$state', function($scope, $state) {

    $scope.credentials = {
        email: '',
        password: '',
        confirmPassword: '',
        profile: {
            company: ''
        }
    };

    $scope.error = '';

    $scope.roles = [];

    $scope.register = function() {
        Meteor.call('addUser', $scope.credentials, $scope.roles, function(err) {
            if (err) {
                $scope.error = err.reason;
            } else {
                Meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password, function (err) {
                    $state.go('home');
                });
            }
        });
    };
}]);