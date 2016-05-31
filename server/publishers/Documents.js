Meteor.publish("documents", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = {};
    lodash.extend(filter, filterByRole());

    return Documents.find(filter);
});

Meteor.publish("documentById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { _id: id };

    lodash.extend(filter, filterByRole());

    return Documents.find(filter);
});

function filterByRole() {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = {};
    if (Roles.userIsInRole(this.userId, 'admin')) {
        filter.company = usr.profile.company;
    } else if (Roles.userIsInRole(this.userId, 'driver')) {
        filter.company = usr.profile.company;
        filter.owner = usr._id;
    }

    return filter;
}