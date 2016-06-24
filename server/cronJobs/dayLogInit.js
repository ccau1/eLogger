SyncedCron.add({
    name: 'dayLogInit',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.recur().on(0).hour();
    },
    job: function() {
        var users = Meteor.users.find({ 'roles.default': Constants.Role.DRIVER });
        var todayStamp = moment().valueOf();
        lodash.each(users, function(v,k) {
            var lastDayLog = DayLogs.findOne({ date: { $lt: todayStamp } }, { sort: { date: -1 } });
            var status = lastDayLog ? lastDayLog.lastStatus : Constants.Log.Status.OFF;

            DayLogs.insert({ date: todayStamp, travelLog: [{ start: datestamp, status: status }], lastStatus: status, userId: v._id, companyId: v.profile.companyId });
        })

    }
});
