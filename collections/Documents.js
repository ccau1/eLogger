Documents = new Mongo.Collection('documents');

Documents.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.Document = new SimpleSchema({
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
    owner: {
        type: String,
        label: 'Owner',
        autoValue: function() {
            if (!this.value) return Meteor.userId();
        },
    },
    title: {
        type: String,
        label: 'Title'
    },
    desc: {
        type: String,
        label: 'Description'
    },
    file: {
        type: Schemas.File,
        label: 'File'
    }
});

Documents.attachSchema(Schemas.Document);



Meteor.methods({
    addDocument: function(obj, callback) {
        Documents.insert(obj, callback);
    },
    updateDocument: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        Documents.update({_id: id}, {$set: obj}, callback);
    },
    deleteDocument: function(id) {
        Documents.remove(id);
    }
})