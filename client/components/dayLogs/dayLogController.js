angular.module(Constants.Module).controller('DayLogController', ['$scope', 'user', '$stateParams', '$reactive', function($scope, s_user, $stateParams, $reactive) {
    $reactive(this).attach($scope);

    $scope.date = $stateParams.date;

    $scope.subscribe('dayLogByDate', function() {
        return [$stateParams.date];
    });

    $scope.subscribe('dvirsByDate', function() {
        return [$stateParams.date];
    });

    $scope.signatureChanged = function(sig) {
        $scope.dayLog.signature = sig;
        $scope.save();
    }

    $scope.save = function() {
        Meteor.call('updateDayLog', $scope.dayLog, function(err) { });
    }

    $scope.helpers({
        dayLog: function() {
            var today = moment($stateParams.date).startOf('day').valueOf();
            var dLog = DayLogs.findOne({ date: today });
            return dLog;
        },
        dvirs: function() {
            var dayStart = moment($stateParams.date).startOf('day').valueOf();
            var dayEnd = moment($stateParams.date).startOf('day').add(1, 'days').valueOf();
            var dLog = DVIRs.find({ timestamp: { $gte: dayStart, $lte: dayEnd } });
            return dLog;
        }
    });
}]);