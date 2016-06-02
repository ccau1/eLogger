EldTypes = new Mongo.Collection('eldTypes');

EldTypes.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.EldTypes = new SimpleSchema({
    _id: {
        type: String,
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
        label: 'Credential'
    }
});

EldTypes.attachSchema(Schemas.EldType);



Meteor.methods({
    addEldType: function(obj, callback) {
        EldTypes.insert(obj, callback);
    },
    updateEldType: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        EldTypes.update({_id: id}, {$set: obj}, callback);
    },
    deleteEldType: function(id) {
        EldTypes.remove(id);
    }
})