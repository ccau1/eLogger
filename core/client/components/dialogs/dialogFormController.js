'use strict';

angular.module(Constants.Module).controller('DialogFormController', ['$rootScope', '$scope', '$compile', '$mdDialog', 'data', '$log', function ($rootScope, $scope, $compile, $mdDialog, data, $log) {
    $scope.formObj = data.formObj;
    $scope.type = data.type;
    $scope.data = data;
    $scope.title = data.title;
    $scope.ngDisabled = data.ngDisabled;
    $scope.hideSubmitBtn = data.hideSubmitBtn;
    $scope.liveUpdate = data.liveUpdate;

    // TODO:: need below code to be in $on method above, but that method is not being called
    setTimeout(function() {
        if (data.formTag) {
            //console.log.log('formTag 1', angular.element(document.getElementById('dialogFormContainer')));
            angular.element(document.getElementById('dialogFormContainer')).append($compile('<' + data.formTag + ' ng-model="formObj" on-submit="onSubmit(type, obj)"></' + data.formTag + '>')($scope));
        }
    }, 200);

    if (!$scope.title && $scope.formObj) {
        if ($scope.formObj._id) {
            $scope.title = "Edit " + data.type;
        } else {
            $scope.title = "Add " + data.type;
        }
    }

    $scope.onSubmit = function (type, obj) {
        $mdDialog.hide({type: type, obj: obj });
    }


	$scope.cancel = function () {
		$mdDialog.cancel();
	};
}]);