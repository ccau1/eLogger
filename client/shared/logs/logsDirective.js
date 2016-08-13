'use strict';

angular.module(Constants.Module).directive('logs', ['user', 'utils', 'dayLogs', '$timeout', '$mdDialog', function (user, utils, dayLogs, $timeout, $mdDialog) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'dayLog': '=ngModel',
			'date': '='
		},
		templateUrl: 'client/shared/logs/logsView.ng.html',
		controller: function ($scope) {

		},
		link: function ($scope, element, attrs) {
			$scope.fab = {
				isOpen: false,
				tooltipVisible: false
			};

			$scope.$watch('fab.isOpen', function(isOpen) {
				if (isOpen) {
					$timeout(function() {
						if ($scope.fab.isOpen) // ensure its still open
							$scope.fab.tooltipVisible = isOpen;
					}, 600);
				} else {
					$scope.fab.tooltipVisible = isOpen;
				}
			});

			$scope.toggleListMenu = function(ev) {
				var ele = $(ev.target).closest('md-list-item');
				ele.siblings().removeClass('is-menu-open').animate({ marginLeft: 0 });
				if (ele.hasClass('is-menu-open')) {
					ele.removeClass('is-menu-open');
					ele.animate({ marginLeft: 0 });
				} else {
					ele.addClass('is-menu-open');
					var hiddenMenuWidth = $('.hidden-menu', ele).outerWidth();
					ele.animate({ marginLeft: hiddenMenuWidth });
				}
			}

			$scope.editTravelLog = function(ev, travelLog) {

			}

			$scope.deleteTravelLog = function(ev, travelLog) {
				var confirm = $mdDialog.confirm()
						.title('Are you sure you want to delete this log entry?')
						.textContent('This action cannot be undone.')
						.ariaLabel('Delete Log Entry')
						.targetEvent(ev)
						.ok('Delete')
						.cancel('Cancel');
				$mdDialog.show(confirm).then(function() {
					var removeIndex = $scope.dayLog.travelLog.indexOf(travelLog);
					$scope.dayLog.travelLog.splice(removeIndex, 1);
					Meteor.call('updateDayLog', $scope.dayLog, function(err) { });
				}, function() {

				});
			}

			$scope.addTravelLog = function(ev, type) {
				$scope.fab.isOpen = $scope.fab.tooltipVisible = false;
				utils.dialog(ev, 'client/components/logs/logStatusSelectView.ng.html', 'LogStatusSelectController', {
					title: 'Set Status',
					lastStatus: $scope.dayLog.lastStatus,
					type: type
				}).then(function (result) {
					var travelLog = result.obj;
					Meteor.call('addDayLogTravelLog', $scope.dayLog._id, travelLog, function(err) {
						if (!err) {
							if (result.obj.status) {
								utils.toast('Status Changed to: ' + result.obj.status, utils.TOAST_TYPE.SUCCESS);
							} else {
								utils.toast('Note Added', utils.TOAST_TYPE.SUCCESS);
							}
						} else {
							utils.toast('Status Change error: ' + err.reason, utils.TOAST_TYPE.FAIL);
						}
					})
				}, function () {

				});;
			}

			$scope.getTimeSpan = dayLogs.getTimeSpan;
		}
	}
}]);