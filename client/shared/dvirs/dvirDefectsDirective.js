'use strict';

angular.module(Constants.Module).directive('dvirDefects', ['user', 'utils', 'dayLogs', '$reactive', function (user, utils, dayLogs, $reactive) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
			'defects': '=ngModel'
		},
		templateUrl: 'client/shared/dvirs/dvirDefectsView.ng.html',
		controller: function ($scope) {
			$reactive(this).attach($scope);
		},
		link: function ($scope, element, attrs) {
			console.log($scope.dvirDefects);
			$scope.setDefects = function(ev) {
				if (!$scope.defects) $scope.defects = [];
				utils.dialog(ev, 'client/components/dvirs/dvirDefectSelectView.ng.html', 'DvirDefectSelectController', {
					defects: $scope.defects
				}).then(function(result) {
					if (result.obj) {
						$scope.defects = result.obj;
					}
				}, function() {

				});
			}
		}
	}
}]);