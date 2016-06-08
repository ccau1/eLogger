EldPlugins = new Mongo.Collection('eldPlugins');

EldPlugins.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.EldPlugin = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        label: 'Id'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.value) return new Date();
        },
        label: 'Created At'
    },
    companyId: {
        type: String,
        label: 'Company ID',
        autoValue: function() {
            // TODO:: for some reason _id throws error...but inserts company id properly
            if (!this.value) {
                var usr = Meteor.user();

                return Companies.findOne({ _id: usr.profile.companyId })._id;
            }
        },
    },
    type: {
        type: String,
        label: 'Type'
    },
    data: {
        type: Object,
        optional: true,
        blackbox: true,
        label: 'Data'
    }
});

EldPlugins.attachSchema(Schemas.EldPlugin);



Meteor.methods({
    addEldPlugin: function(obj, callback) {
        EldPlugins.insert(obj, callback);
    },
    updateEldPlugin: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        EldPlugins.update({_id: id}, {$set: obj}, callback);
    },
    deleteEldPlugin: function(id) {
        EldPlugins.remove(id);
    }
})