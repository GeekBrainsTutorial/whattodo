angular.module("WhatToDoApp").controller("OrganizationPublicCtrl", ['$scope', '$meteor', '$state', 'conditions',
    function ($scope, $meteor, $state, conditions) {

        $scope.organizations =
            $scope.$meteorCollection(Organization, false)
                .subscribe("organization", conditions.organization.isPublic);
    }
]);