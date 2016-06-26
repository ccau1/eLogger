angular.module(Constants.Module).factory('dayLogs', ['$rootScope', '$reactive', '$log', function($rootScope, $reactive, $log) {
    $reactive(this).attach($rootScope);



    function displayTime(time) {
        console.log('displayTime', time);
        return (time.get('hour') > 0 ? time.get('hour') + ' hr ' : '') + (time.get('minute') > 0 ? time.get('minute') + ' min ' : '');
    }

    function quarterTime(time, roundType) {
        time.set('second', 0);
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

    return {
        displayTime: displayTime,
        quarterTime: quarterTime
    };
}]);