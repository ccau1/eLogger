Schemas.FileURL = new SimpleSchema({
    original: {
        type: String,
        label: 'Original'
    },
    thumbnail: {
        type: String,
        optional: true,
        label: 'Thumbnail'
    }
});

Schemas.File = new SimpleSchema({
    uploadId: {
        type: String,
        label: 'Upload ID'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.value) return new Date();
        },
        //defaultValue: new Date(),
        label: 'Created At'
    },
    name: {
        type: String,
        label: 'File Name'
    },
    size: {
        type: Number,
        label: 'Size'
    },
    type: {
        type: String,
        label: 'Type'
    },
    urls: {
        type: Schemas.FileURL,
        label: 'Urls'
    },
    //data: {
    //    type: String,
    //    label: 'Data'
    //},
    owner: {
        type: String,
        label: 'Owner'
    }
});