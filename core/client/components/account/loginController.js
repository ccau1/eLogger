

angular.module(Constants.Module).controller('LoginController', ['$scope', '$state', function($scope, $state) {
    $scope.credentials = {
        email: '',
        password: ''
    };

    $scope.error = '';


    $scope.login = function () {
        $scope.error = '';
        Meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password, function (err) {
            if (err) {
                switch (err.error) {
                    case 403:
                        $scope.error = 'You email or password was incorrect.';
                        break;
                }
            } else {
                $state.go('home');
            }
        });
    };
}]);