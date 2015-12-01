angular.module("WhatToDoApp").controller("OrganizationCtrl", ['$scope', '$meteor', '$state', 'conditions',
    function ($scope, $meteor, $state, conditions) {

        /**
         * Current user in view
         * @type {any}
         */
        $scope.currentUser = Meteor.user();

        /**
         * Check current user update organization
         * @param item
         * @returns {boolean}
         */
        $scope.allowUpdate = function (item)
        {
            if(item.creator._id == Meteor.userId())
                return true;

            for (var index in item.admins)
            {
                if (item.admins[index]._id == Meteor.userId())
                    return true;
            }
            return false;
        };

        /**
         * Check current user delete organization
         * @param item
         * @returns {boolean}
         */
        $scope.allowDelete = function (item)
        {
            return item.creator._id == Meteor.userId();
        };

        /**
         * Users organization
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organizations = $meteor.collection(Organization)
            .subscribe('organization', conditions.organization.imMember);

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