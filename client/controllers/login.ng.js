angular.module("WhatToDoApp").controller("LoginCtrl", ['$meteor', '$state',
    function ($meteor, $state) {
        var vm = this;

        vm.credentials = {
            email: '',
            password: ''
        };

        /**
         * The email pattern for validation
         * @type {RegExp}
         */
        vm.emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        vm.error = '';

        vm.login = function () {
            $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
                function () {
                    $state.go('public');
                },
                function (err) {
                    vm.error = 'Login error - ' + err;
                }
            );
        };
    }
]);