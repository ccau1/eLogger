angular.module(Constants.Module).factory('dayLogs', ['$rootScope', '$reactive', '$log', function($rootScope, $reactive, $log) {
    $reactive(this).attach($rootScope);



    function displayTime(time) {
        var daysDiff = time.diff(moment(0), 'days');

        var hrs = time.get('hour') + (daysDiff * 24);
        return (hrs > 0 ? hrs + ' hr ' : '') + (time.get('minute') > 0 ? time.get('minute') + ' min ' : '');
    }

    function quarterTime(time, roundType) {
        time.set('second', 0);
        time.set('millisecond', 0);

        var min = time.get('minute');
        var newMin = 0;

        if (min < 15) {
            newMin = 0;
        } else if (min < 30) {
            newMin = 15;
        } else if (min < 45) {
            newMin = 30;
        } else if (min < 60) {
            newMin = 45;
        }

        if (roundType == Constants.Round.CEIL) {
            newMin += 15;
            if (newMin == 60) newMin = 0;
        }

        return time.set('minute', newMin);
    }

    var getTimeSpan = function(dayLog, tl) {
        var curTime = moment();

        var index = lodash.findIndex(dayLog.travelLog, tl);
        if (index != dayLog.travelLog.length - 1) {
            // not last, do diff of start and next start
            var diff = moment.utc(moment(dayLog.travelLog[index + 1].start) - tl.start + 1000);
            return displayTime(diff);
        } else {
            // last one, just do diff of start and cur time
            if (moment().isAfter(moment(dayLog.date).add(1, 'days'))) {
                var diff = moment.utc(moment(dayLog.date).add(1, 'days').valueOf() - tl.start + 1000);
                // daylog is before today, give diff of start to end of day
                return displayTime(diff);
            } else {
                // daylog is today, give diff of start to cur time
                var diff = moment.utc(quarterTime(moment(), Constants.Round.CEIL).valueOf() - tl.start + 1000);
                return displayTime(diff);
            }
        }
    };

    return {
        displayTime: displayTime,
        quarterTime: quarterTime,
        getTimeSpan: getTimeSpan
    };
}]);