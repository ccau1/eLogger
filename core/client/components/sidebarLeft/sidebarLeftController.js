angular.module(Constants.Module).controller('SidebarLeftController', ['$scope', '$state', '$mdSidenav', 'user', 'utils', function ($scope, $state, $mdSidenav, s_user, utils) {
    $scope.$on('$includeContentLoaded', function () {
        //Layout.initSidebar(); // init sidebar
    });

    $scope.$watch(function() { return s_user.currentUser; }, function(newVal) {
        if (newVal) {
            $scope.userProfile = s_user.currentUser.profile;
        }
    }, true);

    $scope.c = Constants;

    $scope.isCurrentUserInRole = s_user.isCurrentUserInRole;


    //$scope.$watch('userProfile.onDuty', function(newVal, oldVal) {
    //
    //});
    $scope.onDutyChange = function(isOnDuty) {
        if (s_user.currentUser) {
            s_user.currentUser.profile.onDuty = isOnDuty;
            Meteor.call('updateUserProfile', s_user.currentUser, function (err) {
                if (!err) {
                    if (isOnDuty) {
                        utils.toast('Your logging will start now', utils.TOAST_TYPE.SUCCESS);
                    } else {
                        utils.toast('Great Work! Another job well done!', utils.TOAST_TYPE.SUCCESS);
                    }
                } else {
                    utils.toast('Update Duty Status Error: ' + err.message, utils.TOAST_TYPE.FAIL);
                }
            });
        }
    };



    $scope.menuSections = [
        {
            header: '',
            items: [
                {
                    title: 'Admin',
                    subtitle: '',
                    desc: 'Management Center',
                    ngIf: function() {
                        return s_user.currentUser && s_user.currentUser.roles.default.indexOf(Constants.Role.ADMIN) != -1;
                    },
                    onClick: function() {
                        $state.go('admin');
                        $mdSidenav('left').close();
                    }
                },
                {
                    title: 'Logs',
                    subtitle: '',
                    desc: '',
                    ngIf: function() {
                        return s_user.currentUser && s_user.currentUser.roles.default.indexOf(Constants.Role.DRIVER) != -1;
                    },
                    onClick: function() {
                        $state.go('logs');
                        $mdSidenav('left').close();
                    }
                },
                {
                    title: 'Documents',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('documents');
                        $mdSidenav('left').close();
                    }
                },
                {
                    title: 'DVIRs',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('dvirs');
                        $mdSidenav('left').close();
                    }
                },
                {
                    title: 'Account',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('settings');
                        $mdSidenav('left').close();
                    }
                },

            ]
        }
    ];

    $scope.logout = function() {
        Accounts.logout();
        $state.go('login');
    }
}]);