angular.module("WhatToDoApp").controller("OrganizationDetailCtrl", ['$scope', '$meteor', '$state', '$stateParams',
    function ($scope, $meteor, $state, $stateParams) {

        /**
         * Users organization
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organization = $meteor.object(Organization, $stateParams.orgId)
            .subscribe('organization');
    }
]);