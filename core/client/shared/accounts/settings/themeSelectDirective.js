'use strict';

angular.module(Constants.Module).directive('themeSelect', ['settings', function (settings) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)

		},
		templateUrl: 'core/client/shared/accounts/settings/themeSelectView.ng.html',
		controller: function ($scope) {
			$scope.themes = [];
			_.each(Constants.Theme, function(v,k) {
				$scope.themes.push({ name: k, val: v });
			});
			$scope.selectTheme = function(ev, theme) {
				Meteor.users.update({ _id: Meteor.userId()}, { $set: { 'profile.theme': theme } });
			}
			$scope.settings = settings;
		},
		link: function ($scope, element, attrs, ctrl) {

		}
	}
}]);