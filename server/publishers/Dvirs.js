Meteor.publish("dvirs", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = {};
    filter = lodash.extend(filter, filterByRole());

    return DVIRs.find(filter, { sort: { timestamp: -1 }});
});

Meteor.publish("dvirById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { _id: id };

    filter = lodash.extend(filter, filterByRole());

    return DVIRs.find(filter);
});

Meteor.publish("dvirsByDate", function (date) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    //var dayStart = moment(date).startOf('day').valueOf();
    //var dayEnd = moment(date).startOf('day').add(1, 'days').valueOf();
    //var filter = { timestamp: { $gte: dayStart, $lte: dayEnd } };
    var filter = { forDate: moment(date).startOf('day').valueOf() };

    filter = lodash.extend(filter, filterByRole());
    var result = DVIRs.find(filter, { sort: { timestamp: -1 }});

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