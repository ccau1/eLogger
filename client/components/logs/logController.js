angular.module(Constants.Module).controller('LogController', ['$scope', '$reactive', '$stateParams', function($scope, $reactive, $stateParams) {
    //$reactive(this).attach($scope);
    //
    //$scope.subscribe('dayLogByDate', function() {
    //    console.log('$stateParams', $stateParams);
    //    return [$stateParams.date];
    //});
    //
    //$scope.helpers({
    //    dayLog: function() {
    //        var today = moment().startOf('day').valueOf();
    //        var dLog = DayLogs.findOne({ date: today });
    //        if (!dLog) {
    //            // add default
    //            Meteor.call('addDayLog', { travelLog: [{ start: today, status: '' }] }, function(err) {
    //
    //            });
    //        }
    //        return dLogs;
    //    }
    //})
}]);