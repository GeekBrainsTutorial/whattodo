angular.module("WhatToDoApp").controller("OrganizationChangeCtrl", ['$scope', '$meteor', '$state', '$stateParams', 'helpers',
    function ($scope, $meteor, $state, $stateParams, helpers) {

        /**
         * Current user in view
         * @type {any}
         */
        $scope.currentUser = Meteor.user();

        /**
         * Search user by query filter
         * @param $query
         * @returns {any}
         */
        $scope.searchUser = function ($query) {
            var exclude = $scope.organization.users.concat($scope.organization.admins);
            exclude.push($scope.organization.creator);

            return helpers.searchUser($query, exclude);
        };

        /**
         * Organization object
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organization = $meteor.object(Organization, $stateParams.orgId, false);
        $scope.$meteorSubscribe('organization');

        /**
         * Check user is creator
         * @returns {boolean}
         */
        $scope.isCreator = function () {
            if($scope.organization.creator)
                return $scope.organization.creator._id == Meteor.userId();
        };

        /**
         * Check user is admin
         * @returns {boolean}
         */
        $scope.isAdmin = function () {
            for (var index in $scope.organization.admins) {
                if($scope.organization.admins[index]._id == Meteor.userId())
                    return true;
            }
        };

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

            $scope.organization.admins = $scope.organization.admins.map(function (c, index) {
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
                $scope.organization.admins,
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