angular.module(Constants.Module).controller('DayLogsController', ['$scope', 'user', '$state', '$reactive', function($scope, s_user, $state, $reactive) {
    $reactive(this).attach($scope);

    var startDate, todayDate;
    $scope.daysList = [];
    s_user.onReady(function() {
        startDate = moment(s_user.currentUser.createdAt).startOf('day');
        todayDate = moment().startOf('day');
        var countDate = startDate;
        if ($scope.daysList.length) $scope.daysList.splice(0, $scope.daysList.length);
        while (!countDate.isAfter(todayDate)) {
            $scope.daysList.unshift({ date: lodash.clone(countDate._d) });
            countDate.add(1, 'days');
        }
    });



    $scope.selectDate = function(day) {
        $state.go('dayLog', { date: moment(day.date).format('MM-DD-YYYY') });
    };
}]);