angular.module(Constants.Module).controller('SignatureFormController', ['$scope', 'user', 'utils', '$mdDialog', 'data', function($scope, s_user, utils, $mdDialog, data) {
    $scope.title = data.title;

    $scope.save = function() {
        $mdDialog.hide({type: 'update', obj: $scope.pad.toDataURL() });
    };
    $scope.cancel = function () {
        $mdDialog.hide();
    };
    // use of fromDataURL
// http://jsfiddle.net/szimek/baL7r8xd/
    $scope.signatureLoaded = function(ele, attr, pad) {
        $scope.pad = pad;
        $scope.pad.fromDataURL(data.signature);
        console.log('pad', $scope.pad);
    }
}]);