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
        label: 'Id'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.value) return new Date();
        },
        label: 'Created At'
    },
    owner: {
        type: String,
        label: 'Owner'
    },
    company: {
        type: String,
        label: 'Company'
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
        var usr = Meteor.users.findOne({ _id: this.userId });
        obj.owner = this.userId;
        obj.company = usr.profile.company;
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