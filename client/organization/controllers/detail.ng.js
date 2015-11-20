angular.module("WhatToDoApp").controller("OrganizationDetailCtrl", ['$scope', '$meteor', '$state', '$stateParams',
    function ($scope, $meteor, $state, $stateParams) {

        /**
         * Users organization
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organization = $meteor.collection(Organization, {_id: $stateParams.orgId})
            .subscribe('organization');
    }
]);