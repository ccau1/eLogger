angular.module(Constants.Module).controller('LogController', ['$scope', '$reactive', '$stateParams', function($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    $scope.subscribe('dayLogByDate', function() {
        console.log('$stateParams', $stateParams);
        return [$stateParams.date];
    });

    $scope.helpers({
        dayLog: function() {
            var today = moment().startOf('day').valueOf();
            var dLog = DayLogs.findOne({ date: today });
            return dLog;
        }
    });

    setInterval(function() {
        console.log('dayLog', $scope.dayLog);
    }, 1000);

    $scope.getTimeSpan = function(tl) {
        var index = lodash.findIndex($scope.dayLog.travelLog, tl);
        if (index != $scope.dayLog.travelLog.length - 1) {
            // not last, do diff of start and next start
            console.log(moment(tl.start).diff(moment($scope.dayLog.travelLog[index + 1].start)));
            return moment(tl.start).diff(moment($scope.dayLog.travelLog[index + 1].start));
        } else {
            // last one, just do diff of start and cur time
            var tmr = moment().startOf('day').add(1, 'days');
            if (moment().isAfter(moment($stateParams.date).add(1, 'days'))) {
                // daylog is before today, give diff of start to end of day
                return moment(tl.start).diff(moment($stateParams.date).add(1, 'days'));
            } else {
                // daylog is today, give diff of start to cur time
                return moment(moment().valueOf() - tl.start).format('HH:mm:ss');
            }
        }
    }
}]);