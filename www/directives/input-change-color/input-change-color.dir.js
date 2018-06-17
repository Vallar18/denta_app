;(function () {
    angular.module('directives.inputChangeColor', [])
        .directive('inputChangeColor', inputChangeColor);

    inputChangeColor.$inject = [];

    function inputChangeColor() {
        return {
            restrict: 'A',
            scope: {
                inputModel: '=ngModel'
            },
            controller: 'InputChangeColorCtrl',
            link: function (scope, element, attrs) {
                let prev;
                scope.$watch('inputModel',function(newVal,oldVal){
                    if(attrs.inputChangeColor.length && scope.inputModel){
                        if((''+scope.inputModel).length > 0){
                            prev = element[0].style.color;
                            element[0].style.color = attrs.inputChangeColor;
                        } else if(!scope.inputModel || (''+scope.inputModel).length === 0){
                            element[0].style.color = prev;
                        }
                    }
                });
            }
        };
    }
})();
