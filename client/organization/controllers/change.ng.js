angular.module("WhatToDoApp").controller("OrganizationChangeCtrl", ['$scope', '$meteor', '$state', '$stateParams',
    function ($scope, $meteor, $state, $stateParams) {

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
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organization = $meteor.object(Organization, $stateParams.orgId, false);
        $scope.$meteorSubscribe('organization');

        /**
         * Change organization by _id
         */
        $scope.change = function () {
            $scope.organization.users = $scope.organization.users.map(function (c, index) {
                return {
                    _id: c._id,
                    name: c.name,
                    email: c.email
                };
            });
            $meteor.call("Organization.change",
                $scope.organization._id,
                $scope.organization.name,
                $scope.organization.is_public,
                $scope.organization.slogan,
                $scope.organization.users
            ).then(
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