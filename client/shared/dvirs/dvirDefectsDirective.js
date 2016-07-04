'use strict';

angular.module(Constants.Module).directive('dvirDefects', ['user', 'utils', 'dayLogs', '$reactive', function (user, utils, dayLogs, $reactive) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
			'dvirDefects': '=',
			'type': '=',
			'multiple': '='
		},
		templateUrl: 'client/shared/dvirs/dvirDefectsView.ng.html',
		controller: function ($scope) {
			$reactive(this).attach($scope);


		},
		link: function ($scope, element, attrs) {
			$scope.setDefects = function(ev) {
				utils.dialog(ev, 'client/components/dvirs/dvirDefectSelectView.ng.html', 'DvirDefectSelectController');
			}
		}
	}
}]);