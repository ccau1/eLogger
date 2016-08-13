angular.module(Constants.Module).controller('DvirFormController', ['$scope', '$reactive', '$mdDialog', 'data', function($scope, $reactive, $mdDialog, data) {
    $reactive(this).attach($scope);

    $scope.dvir = {
        vehicle: {
            componentId: '',
            defects: []
        },
        trailer: {
            componentIds: [],
            defects: []
        }
    }

    console.log('data', data);

    if (data) {
        if (data.dvir) {
            $scope.dvir = data.dvir;
        }
        if (data.page) {
            switch (data.page) {
                case 'general':
                    $scope.selectedTab = 0;
                    break;
                case 'vehicle':
                    $scope.selectedTab = 1;
                    break;
                case 'sign':
                    $scope.selectedTab = 2;
                    break;
            }
        }
    }

    $scope.$watch('dvir.defectsCorrected', function(newVal, oldVal) {
        if (newVal != oldVal) {
            if ($scope.dvir.defectsCorrected && $scope.dvir.defectsNeedNotCorrect) {
                $scope.dvir.defectsNeedNotCorrect = false;
            }
        }
    });

    $scope.$watch('dvir.defectsNeedNotCorrect', function(newVal, oldVal) {
        if (newVal != oldVal) {
            if ($scope.dvir.defectsCorrected && $scope.dvir.defectsNeedNotCorrect) {
                $scope.dvir.defectsCorrected = false;
            }
        }
    });

    $scope.save = function(dvir) {
        $scope.dvir.timestamp = moment().valueOf();
        $scope.dvir_generalForm.$setSubmitted();
        $scope.dvir_vehicleForm.$setSubmitted();
        $scope.dvir_signForm.$setSubmitted();
        console.log('DVIR', dvir);

        console.log('forms', $scope.dvir_generalForm, $scope.dvir_vehicleForm, $scope.dvir_signForm);
        var isValid = true;
        if ($scope.dvir_generalForm.$invalid) {
            $scope.selectedTab = 0;
            isValid = false;
        } else if ($scope.dvir_vehicleForm.$invalid) {
            $scope.selectedTab = 1;
            isValid = false;
        } else if ($scope.dvir_signForm.$invalid) {
            $scope.selectedTab = 2;
            isValid = false;
        } else {
            // valid
            console.log('this is saving!!', dvir);
            $mdDialog.hide({type: 'update', obj: $scope.dvir });
        }
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]);