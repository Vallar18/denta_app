;(function () {
    angular.module('directives.menuCustom', [])
        .directive('menuCustom', menuCustom);

    menuCustom.$inject = ['$document', '$timeout'];

    function menuCustom($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/menu-custom/menu-custom.html',
            scope: {
                items: '=',
                isShow: '=',
                model: '=',
                select: '='
            },
            controller: 'MenuCustomCtrl',
            link: function (scope, element, attrs) {
                if (angular.isDefined(scope.isShow)) {
                    toggleShow(scope.isShow);
                }
                scope.$watch(function () {
                        return scope.isShow
                    },
                    function (now, prev) {
                        toggleShow(now);
                    });

                function addListenerClick() {
                    $document.on('click', function (e) {
                        if (element !== e.target && !element[0].contains(e.target)) {
                            scope.$applyAsync(function () {
                                scope.isShow = false;
                            });
                        }
                    });
                }

                function removeListenerClick() {
                    $document.off('click');
                }

                function toggleShow(isShow) {
                    if (isShow === false) {
                        element.css('display', 'none');
                    } else if (isShow === true) {
                        element.css('display', 'block');
                    }
                    $timeout(function () {
                        if (isShow === true) {
                            addListenerClick();
                        } else if (isShow === false) {
                            removeListenerClick()
                        }
                    }, 250);
                }
            }
        };
    }
})();
