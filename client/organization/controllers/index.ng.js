angular.module("WhatToDoApp").controller("OrganizationCtrl", ['$scope', '$meteor', '$state',
    function ($scope, $meteor, $state) {

        /**
         * Current user in view
         * @type {any}
         */
        $scope.currentUser = Meteor.user();

        /**
         * Users organization
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organizations = $meteor.collection(Organization)
            .subscribe('organization');

        /**
         * Remove the organization by id
         */
        $scope.remove = function (orgId) {
            $meteor.call("Organization.remove", orgId).then(
                function (data) {
                    $state.go('organization');
                },
                function (error) {
                    console.log(error);
                }
            );
        };
    }
]);