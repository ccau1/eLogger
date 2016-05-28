angular.module(Constants.Module).controller('CompanyController', ['$scope', '$reactive', 'user', 'utils', function($scope, $reactive, s_user, utils) {
    $reactive(this).attach($scope);

    $scope.subscribe('currentCompany');

    s_user.onReady(function() {
        $scope.helpers({
            company: function() {
                return Companies.findOne({ _id: s_user.currentUser.profile.company });
            }
        });
    });

    $scope.update = function() {
        Meteor.call('updateCompany', $scope.company, function(err) {
            if (!err) {
                utils.toast('Company Updated');
            } else {
                utils.toast('Company Update Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    }
}]);