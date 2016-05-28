angular.module(Constants.Module).controller('SidebarLeftController', ['$scope', '$state', function ($scope, $state) {
    $scope.$on('$includeContentLoaded', function () {
        //Layout.initSidebar(); // init sidebar
    });

    $scope.menuSections = [
        {
            header: '',
            items: [
                {
                    title: 'Admin',
                    subtitle: '',
                    desc: 'Management Center',
                    onClick: function() {
                        $state.go('admin');
                    }
                },
                {
                    title: 'Create',
                    subtitle: '',
                    desc: 'Plan your own project now!',
                    onClick: function() {
                        $state.go('projectCreate');
                    }
                },
                {
                    title: 'Browse',
                    subtitle: '',
                    desc: 'Search for available projects',
                    onClick: function() {
                        $state.go('projectSearch');
                    }
                },
                {
                    title: 'My Projects',
                    subtitle: '',
                    desc: 'Currently developing projects',
                    onClick: function() {
                        $state.go('projects');
                    }
                },
                {
                    title: 'Account',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('settings');
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