Meteor.publish("vehicles", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.company };

    return Vehicles.find(filter);
});