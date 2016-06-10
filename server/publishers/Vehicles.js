Meteor.publish("vehicles", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr ? usr.profile.companyId : -1 };

    return Vehicles.find(filter);
});

Meteor.publish("vehicleById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr ? usr.profile.companyId : -1, _id: id };

    return Vehicles.find(filter);
});