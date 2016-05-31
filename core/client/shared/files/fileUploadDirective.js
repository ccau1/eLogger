'use strict';

angular.module(Constants.Module).directive('fileUpload', ['$compile', 'settings', '$log', '$reactive', '$mdToast', 'fileUpload', function ($compile, settings, $log, $reactive, $mdToast, fileUpload) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'ngModel': '=',
			'multiple': '=',
			'accept': '=',
			'mode': '=',
			'onChange': '&',
			'ngDisabled': '='
		},
		templateUrl: 'core/client/shared/files/fileUploadView.ng.html',
		controller: function ($scope) {
		},
		link: function ($scope, element, attrs) {

			$scope.openFilePicker = function() {
				$log.info('file-upload clicked');
				$('input[type="file"][ngf-select]').trigger('click');
			}
			if (!$scope.ngModel) $scope.ngModel = [];

			$scope.isLoading = false;
			$scope.validate = {size: {max: '20MB', min: '10B'}, height: {max: 12000}, width: {max: 12000}, duration: {max: '5m'}};
			$scope.addImages = function(ev, files) {
				// TODO:: can't get file info of drag & drop file
				if (!$scope.ngModel) $scope.ngModel = [];
				if (files && files.length > 0) {
					$scope.isLoading = true;
					var newFiles = [];
					_.each(files, function(f, i) {
						fileUpload.add(f).then(function(fileObj) {
							//setTimeout(function() {
								$scope.ngModel.push(fileObj);
							newFiles.push(fileObj);
								if (i + 1 == files.length) {
									$scope.isLoading = false;
									$scope.$apply();
									$scope.onChange({ action: 'add', items: newFiles });
								}
							//}, 1000);
						});
					});
				} else {
				}
			};

		}
	}
}]);