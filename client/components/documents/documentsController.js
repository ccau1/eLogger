angular.module(Constants.Module).controller('DocumentsController', ['$scope', '$reactive', 'utils', '$state', function($scope, $reactive, utils, $state) {
    $reactive(this).attach($scope);

    $scope.subscribe('documents');

    $scope.helpers({
        documents: function() {
            return Documents.find();
        }
    });

    $scope.add = function() {
        $state.go('newDocument');
    }

    $scope.edit = function(ev, item) {
        //$scope.editDoc = item;
        $state.go('document', { id: item._id });
    }

    $scope.remove = function(ev, item) {
        Uploads.remove(item.file.uploadId);
        Meteor.call('deleteDocument', item._id, function(err) {
            if (!err) {
                utils.toast('Document Removed', utils.TOAST_TYPE.SUCCESS);
            } else {
                utils.toast('Document Remove Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
            }
        });
    }
}]);