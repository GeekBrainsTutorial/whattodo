angular.module("WhatToDoApp").controller("OrganizationCreateCtrl", ['$scope', '$meteor', '$state', '$stateParams', 'helpers',
    function ($scope, $meteor, $state, $stateParams, helpers) {

        /**
         * Organization object
         * @type {{name: null, slogan: null, users: []}}
         */
        $scope.organization = {
            orgId: null,
            name: null,
            slogan: null,
            is_public: true,
            users: [],
            admins: []
        };

        /**
         * Search user by query filter
         * @param $query
         * @returns {any}
         */
        $scope.searchUser = function ($query) {
            var exclude = $scope.organization.users.concat($scope.organization.admins);

            exclude.push({
                _id: Meteor.userId(),
                name: Meteor.user().profile.name,
                surname: Meteor.user().profile.surname
            });

            return helpers.searchUser($query, exclude);
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

            $scope.organization.admins = $scope.organization.admins.map(function (c, index) {
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
                $scope.organization.users,
                $scope.organization.admins
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