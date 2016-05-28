Companies = new Mongo.Collection('companies');

Companies.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.Company = new SimpleSchema({
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
    name: {
        type: String,
        label: 'Name'
    },
    addr: {
        type: Schemas.Address,
        label: 'Address'
    }
});

Companies.attachSchema(Schemas.Company);



Meteor.methods({
    addCompany: function(obj, callback) {
        obj.owner = this.userId;
        Companies.insert(obj, callback);
    },
    updateCompany: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        Companies.update({_id: id}, {$set: obj}, callback);
    },
    deleteCompany: function(id) {
        Companies.remove(id);
    }
})