angular.module("WhatToDoApp").controller("LoginCtrl", ['$scope', '$meteor', '$state', '$mdDialog',
    function ($scope, $meteor, $state, $mdDialog) {
        
        /**
         * Entrance data
         * @type {{email: string, password: string}}
         */
        $scope.credentials = {
            email: '',
            password: ''
        };

        /**
         * The email pattern for validation
         * @type {RegExp}
         */
        $scope.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        /**
         * Query send
         * @type {boolean}
         */
        $scope.query = false;

        /**
         * Auth error
         * @type {string}
         */
        $scope.error = false;

        /**
         * Login action
         */
        $scope.login = function () {
            $meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password).then(
                function () {
                    $mdDialog.hide();
                    $state.go('public');
                },
                function (err) {
                    $scope.error = true;
                }
            );
        };

        /**
         * Close dialog
         */
        $scope.close = function () {
            $mdDialog.hide();
        }
    }
]);