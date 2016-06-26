angular.module(Constants.Module).controller('LogController', ['$scope', '$reactive', '$stateParams', 'utils', 'dayLogs', function($scope, $reactive, $stateParams, utils, dayLogs) {
    $reactive(this).attach($scope);

    $scope.subscribe('dayLogByDate', function() {
        return [$stateParams.date];
    });

    $scope.helpers({
        dayLog: function() {
            var today = moment($stateParams.date).startOf('day').valueOf();
            var dLog = DayLogs.findOne({ date: today });
            return dLog;
        }
    });

    $scope.changeStatus = function(ev) {
        utils.dialog(ev, 'client/components/logs/logStatusSelectView.ng.html', 'DialogFormController', {
            title: 'Set Status',
            lastStatus: $scope.dayLog.lastStatus
        }).then(function (result) {
            //console.log('result', result);
            //$scope.dayLog.lastStatus = result.obj;
            //$scope.dayLog.travelLog.push({ start: moment().valueOf(), status: result.obj });
            Meteor.call('addDayLogTravelLog', $scope.dayLog._id, result.obj, dayLogs.quarterTime(moment(), Constants.Round.FLOOR).valueOf(), function(err) {
                if (!err) {
                    utils.toast('Status Changed to: ' + result.obj, utils.TOAST_TYPE.SUCCESS);
                } else {
                    utils.toast('Status Change error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                }
            })
        }, function () {

        });;
    }

    $scope.getTimeSpan = function(tl) {
        var curTime = moment();

        var index = lodash.findIndex($scope.dayLog.travelLog, tl);
        if (index != $scope.dayLog.travelLog.length - 1) {
            // not last, do diff of start and next start
            var diff = moment.utc(moment($scope.dayLog.travelLog[index + 1].start) - tl.start + 1000);
            return dayLogs.displayTime(diff);
        } else {
            // last one, just do diff of start and cur time
            if (moment().isAfter(moment($stateParams.date).add(1, 'days'))) {
                // daylog is before today, give diff of start to end of day
                var diff = moment.utc(dayLogs.quarterTime(moment($stateParams.date).add(1, 'days'), Constants.Round.CEIL) - tl.start + 1000);
                return dayLogs.displayTime(diff);
            } else {
                // daylog is today, give diff of start to cur time
                var diff = moment.utc(dayLogs.quarterTime(moment(), Constants.Round.CEIL).valueOf() - tl.start + 1000);
                return dayLogs.displayTime(diff);
            }
        }
    }
}]);