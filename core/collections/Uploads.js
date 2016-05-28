var fileStore = new FS.Store.FileSystem("fileStore", {
    path: "uploads"
});

Uploads = new FS.Collection("uploads", {
    stores: [
        //fileStore,
        new FS.Store.GridFS("original"),
        //new FS.Store.GridFS("thumbnail", {
        //    transformWrite: function(fileObj, readStream, writeStream) {
        //        console.log('filename', fileObj.name(), fileObj);
        //        gm(readStream, fileObj.name()).resize('32', '32', '!').stream().pipe(writeStream);
        //    }
        //})
    ],
    filter: {
        allow: {
            //contentTypes: ['image/*']
        }
    }
});

if (Meteor.isServer) {
    Uploads.allow({
        insert: function (userId) {
            return (userId ? true : false);
        },
        remove: function (userId) {
            return (userId ? true : false);
        },
        download: function () {
            return true;
        },
        update: function (userId) {
            return (userId ? true : false);
        }
    });

    Meteor.publish('uploads', function() {
        return Uploads.find({});
    });
}