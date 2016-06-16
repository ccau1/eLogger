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
    var filter = { date: moment(date).startOf('day').valueOf() };

    lodash.extend(filter, filterByRole());

    return DayLogs.find(filter);
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