Meteor.publish("currentCompany", function (location) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { _id: usr.profile.companyId };

    return Companies.find(filter);
});