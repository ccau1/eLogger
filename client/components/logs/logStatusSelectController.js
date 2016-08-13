angular.module(Constants.Module).controller('LogStatusSelectController', ['$scope', 'user', 'utils', '$mdDialog', 'data', 'dayLogs', function($scope, s_user, utils, $mdDialog, data, dayLogs) {
    $scope.travelLog = {
        start: undefined,
        end: undefined, // for insert past status
        status: '',
        location: '',
        note: ''
    };
    $scope.type = data.type;
    $scope.lastStatus = data.lastStatus;
    $scope.curDate = new Date();

    $scope.timepickerSettings = {
        start: {
            default: function(){
                var date = new Date();
                return date;
            }
        }
    };

    switch (data.type) {
        case 'currentStatus':
            $scope.title = 'Change Duty Status';

            break;
        case 'status':
            $scope.title = 'Insert Duty Status';
            break;
        case 'remark':
            $scope.title = 'Add Remark';
            break;
    }

    $scope.setStatus = function(status) {

        $scope.travelLog.status = status;
    };

    $scope.save = function() {
        if ($scope.type != 'remark') {
            $scope.travelLog.start = dayLogs.quarterTime(moment(), Constants.Round.FLOOR).valueOf();
        }
        $mdDialog.hide({type: 'update', obj: $scope.travelLog });
    };


    $scope.statuses = _.map(Constants.Log.Status, function(v,k) {
        return { name: v, key: k };
    });

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);