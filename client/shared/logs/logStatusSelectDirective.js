'use strict';

angular.module(Constants.Module).directive('logStatusSelect', ['user', 'utils', function (user, utils) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'ngModel': '=',
			'onSubmit': '&'
		},
		templateUrl: 'client/shared/logs/logStatusSelectView.ng.html',
		controller: function ($scope) {

		},
		link: function ($scope, element, attrs) {
			$scope.setStatus = function(status) {
				$scope.ngModel = status;
			};

			$scope.confirmStatus = function() {
				$scope.onSubmit({obj: $scope.ngModel, type: 'update'});
			};


			$scope.statuses = _.map(Constants.Log.Status, function(v,k) {
				return { name: v, key: k };
			});
		}
	}
}]);