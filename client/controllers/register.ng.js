angular.module("WhatToDoApp").controller("RegisterCtrl", ['$scope', '$meteor', '$state',
    function ($scope, $meteor, $state) {

        /**
         * Register data
         * @type {{email: string, password: string}}
         */
        $scope.user = {
            email: '',
            password: '',
            profile: {
                name: '',
                surname: '',
                sex: ''
            }
        };

        /**
         * The email pattern for validation
         * @type {RegExp}
         */
        $scope.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        /**
         * Register error
         * @type {string}
         */
        $scope.error = false;

        $scope.register = function () {
            $meteor.createUser($scope.user).then(
                function () {
                    $state.go('public');
                },
                function (err) {
                    $scope.error = true;
                }
            );
        };
    }
]);