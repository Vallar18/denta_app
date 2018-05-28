;(function () {
    'use strict';

    angular
        .module('app',
            [
                'factory.request',
                'factory.url',
                'app.core',
                'app.services',
                'app.factory',
                'app.directives',
            ])

        .run(runBlock);

    runBlock.$inject = [];

    function runBlock() {

    }
})();