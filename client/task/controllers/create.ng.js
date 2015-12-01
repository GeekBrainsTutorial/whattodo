angular.module("WhatToDoApp").controller("TaskCreateCtrl", ['$scope', '$meteor', '$state', '$mdDialog', 'orgId', 'userId',
    function ($scope, $meteor, $state, $mdDialog, orgId, userId) {

        /**
         * Validate date
         * @type {Date}
         */
        $scope.currentDate = new Date();

        /**
         * Task object
         * @type {{description: string, deadline: string}}
         */
        $scope.task = {
            description: "",
            deadline: ""
        };

        /**
         * Create the task
         */
        $scope.create = function () {
            $meteor.call("Task.create",
                orgId,
                userId,
                $scope.task.description,
                $scope.task.deadline
            ).then(
                function (data) {
                    $mdDialog.hide();
                    $state.go('task/creator');
                },
                function (error) {
                    console.log(error);
                }
            );
        };
    }
]);