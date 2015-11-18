angular.module("WhatToDoApp").controller("OrganizationCtrl", ['$scope', '$meteor', '$state',
    function ($scope, $meteor, $state) {

        /**
         * Users organization
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organizations = $meteor.collection(Organization)
            .subscribe('organization');

        /**
         * Search user by query filter
         * @param $query
         * @returns {any}
         */
        $scope.searchUser = function ($query) {
            return $meteor.call("searchByQuery", $query, $scope.organization.users).then(
                function (data) {
                    return data;
                },
                function (err) {
                    console.log('failed', err);
                }
            );
        };

        /**
         * Organization object
         * @type {{name: null, slogan: null, users: []}}
         */
        $scope.organization = {
            name: null,
            slogan: null,
            users: []
        };

        $scope.create = function () {

        };
    }
]);