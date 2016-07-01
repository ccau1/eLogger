'use strict';

angular.module(Constants.Module).directive('dvirs', ['user', 'utils', 'dayLogs', '$reactive', function (user, utils, dayLogs, $reactive) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
			'date': '='
		},
		templateUrl: 'client/shared/dvirs/dvirsView.ng.html',
		controller: function ($scope) {
			$reactive(this).attach($scope);

			$scope.subscribe('dvirsByDate', function() {
				return [$scope.getReactively('date')];
			});

			$scope.helpers({
				dvirs: function() {
					var dayStart = moment($scope.getReactively('date')).startOf('day').valueOf();
					var dayEnd = moment($scope.getReactively('date')).startOf('day').add(1, 'days').valueOf();
					var filter = { timestamp: { $gte: dayStart, $lte: dayEnd } };

					return DVIRs.find(filter, { sort: { timestamp: -1 }});
				}
			})
		},
		link: function ($scope, element, attrs) {

			$scope.addDVIR = function(ev) {
                utils.dialog(ev, 'client/components/dvirs/dvirFormView.ng.html', 'DvirFormController');
			}
		}
	}
}]);