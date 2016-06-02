Meteor.publish("eldTypes", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.companyId };

    return EldTypes.find(filter);
});

Meteor.publish("eldTypeById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.companyId, _id: id };

    return EldTypes.find(filter);
});

Meteor.publish("eldTypeByType", function (type) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.companyId, type: type };

    return EldTypes.find(filter);
});