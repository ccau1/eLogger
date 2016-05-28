angular.module(Constants.Module).factory('fileUpload', [function() {

    var addFile = function(file) {
        var dfd = $.Deferred();

        function uploadFile(fileObj, dataURI) {
            Uploads.insert(dataURI, function(err, uploadedFile) {
                if (err) dfd.reject(err);
                uploadedFile.on('uploaded', function() {

                    setTimeout(function() {
                        console.log('uploadedFile', uploadedFile, uploadedFile.url());
                        fileObj.uploadId = uploadedFile._id;
                        fileObj.urls.original = uploadedFile.url();
                        fileObj.urls.thumbnail = '';//uploadedFile.url({brokenIsFine: false, store: 'thumbnail'});
                        dfd.resolve(fileObj);
                    }, 1000);
                });
            });
        }

        var fileObj = {
            //data: dataURI,
            name: file.name,
            size: file.size,
            type: file.type,
            urls: {
                original: '',
                thumbnail: ''
            },
            createdAt: new Date(),
            owner: Meteor.userId()
        };

        if (file.blobUrl) {
            uploadFile(fileObj, file.blobUrl);
        } else {
            var reader = new FileReader();

            reader.onload = function (e) {
                var dataURI = e.target.result;

                uploadFile(fileObj, dataURI);

            }

            reader.readAsDataURL(file);
        }


        return dfd.promise();
    }

    return {
        add: addFile
    }
}]);