angular.module(Constants.Module).controller('ResetPasswordController', ['$scope', function($scope) {
    this.credentials = {
        email: '',
        password: ''
    };

    $scope.error = '';


    this.login = function () {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password, function (err) {
            //console.log.log('login error', err);
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