angular.module("WhatToDoApp").controller("OrganizationCreateCtrl", ['$scope', '$meteor', '$state', '$stateParams',
    function ($scope, $meteor, $state, $stateParams) {

        /**
         * Organization object
         * @type {{name: null, slogan: null, users: []}}
         */
        $scope.organization = {
            orgId: null,
            name: null,
            slogan: null,
            is_public: true,
            users: []
        };

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
         * Create the organizations
         */
        $scope.create = function () {
            $scope.organization.users = $scope.organization.users.map(function (c, index) {
                return {
                    _id: c._id,
                    name: c.name,
                    email: c.email
                };
            });
            $meteor.call("Organization.create",
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