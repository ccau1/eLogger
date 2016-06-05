Meteor.publish("eldPlugins", function () {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.companyId };

    return EldPlugins.find(filter);
});

Meteor.publish("eldPluginById", function (id) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.companyId, _id: id };

    return EldPlugins.find(filter);
});

Meteor.publish("eldPluginByType", function (type) {
    var usr = Meteor.users.findOne({ _id: this.userId });
    var filter = { companyId: usr.profile.companyId, type: type };

    return EldPlugins.find(filter);
});