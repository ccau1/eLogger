'use strict';

angular.module(Constants.Module).directive('numberOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var numberOnly = function(inputValue) {
                if(inputValue == undefined) inputValue = '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            }
            modelCtrl.$parsers.push(numberOnly);
            numberOnly(scope[attrs.ngModel]);  // capitalize initial value
        }
    };
});