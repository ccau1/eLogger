angular.module(Constants.Module).controller('VehiclesController', ['$scope', '$reactive', 'user', function($scope, $reactive, s_user) {
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
            }
        });
    }
}]);