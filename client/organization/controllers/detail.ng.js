angular.module("WhatToDoApp").controller("OrganizationDetailCtrl", ['$scope', '$meteor', '$state', '$stateParams', '$mdDialog',
    function ($scope, $meteor, $state, $stateParams, $mdDialog) {

        /**
         * Users organization
         * @type {any|SubscriptionHandle|*}
         */
        $scope.organization = $meteor.object(Organization, $stateParams.orgId)
            .subscribe('organization');

        /**
         * Close dialog
         */
        $scope.close = function () {
            $mdDialog.hide();
        };

        /**
         * Create task method
         * @param orgId
         * @param userId
         */
        $scope.createTask = function (orgId, userId) {
            $mdDialog.show({
                controller: "TaskCreateCtrl",
                templateUrl: 'client/task/views/dialogs/create.ng.html',
                parent: angular.element(document.body),
                locals: {
                    orgId: orgId,
                    userId: userId
                },
                clickOutsideToClose: true
            })
        }
    }
]);