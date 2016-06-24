Meteor.publish("dayLogs", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = {};
    lodash.extend(filter, filterByRole());

    return DayLogs.find(filter, { sort: { date: -1 }});
});

Meteor.publish("dayLogById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { _id: id };

    lodash.extend(filter, filterByRole());

    return DayLogs.find(filter);
});

Meteor.publish("dayLogByDate", function (date) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var datestamp = moment(date).startOf('day').valueOf();
    var filter = { date: datestamp };

    lodash.extend(filter, filterByRole());
    var result = DayLogs.find(filter);
    console.log(result.fetch().length);
    if (result.fetch().length == 0) {
        var lastDayLog = DayLogs.findOne({ date: { $lt: datestamp } }, { sort: { date: -1 } });
        var lastStatus = lastDayLog ? lastDayLog.lastStatus : Constants.Log.Status.OFF;
        // TODO:: should be according to yesterday's status
        DayLogs.insert({ date: datestamp, travelLog: [{ start: datestamp, status: lastStatus }], lastStatus: lastStatus, userId: this.userId });
        result = DayLogs.find(filter);
    }


    return result;
});

function filterByRole() {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = {};
    if (Roles.userIsInRole(this.userId, 'admin')) {
        filter.company = usr.profile.companyId;
    } else if (Roles.userIsInRole(this.userId, 'driver')) {
        filter.company = usr.profile.companyId;
        filter.owner = usr._id;
    }

    return filter;
}