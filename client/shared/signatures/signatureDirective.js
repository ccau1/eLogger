'use strict';

angular.module(Constants.Module).directive('signature', ['user', 'utils', 'dayLogs', function (user, utils, dayLogs) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'signature': '=ngModel',
			'type': '=',
			'onChange': '&'
		},
		require: 'ngModel',
		templateUrl: 'client/shared/signatures/signatureView.ng.html',
		controller: function ($scope) {

		},
		link: function ($scope, element, attrs, ngModelCtrl) {
			console.log('ngModelCtrl', ngModelCtrl);
			ngModelCtrl.$validators.require = function(modelValue, viewValue) {
				// validation logic here
				console.log('validating signature', attrs, !!$scope.signature);
				return attrs.required ? !!$scope.signature : true;
			}

			$scope.sign = function(ev) {
				utils.dialog(ev, 'client/components/signatures/signatureFormView.ng.html', 'SignatureFormController', { signature: $scope.signature, title: 'Sign ' + lodash.capitalize($scope.type) })
					.then(function(result) {
						console.log('sign form result', result);
						$scope.signature = result.obj;
						$scope.onChange({ signature: $scope.signature });
					}, function() {

					});
			}

			$scope.clear = function(ev) {
				$scope.signature = '';
				$scope.onChange({ signature: $scope.signature });
			}
		}
	}
}]);