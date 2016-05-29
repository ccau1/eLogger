Meteor.publish("vehicles", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.company };

    return Vehicles.find(filter);
});

Meteor.publish("vehicleById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.company, _id: id };

    return Vehicles.find(filter);
});