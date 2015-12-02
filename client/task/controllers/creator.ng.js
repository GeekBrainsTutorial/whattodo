angular.module("WhatToDoApp").controller("TaskCreatorCtrl", ['$scope', '$meteor', '$state', 'conditions',
    function ($scope, $meteor, $state, conditions) {

        /**
         * Subscribe on the task. Destroy scope - destroy collection
         */
        $scope.$meteorSubscribe('task', conditions.task.imCreator)
            .then(function(subscriptionHandle) {
                $scope.tasks = $meteor.collection(Task);
            });

        /**
         * Remove the task by id
         */
        $scope.remove = function (taskId) {
            $meteor.call("Task.remove", taskId).then(
                function (data) { },
                function (error) {
                    console.log(error);
                }
            );
        };
    }
]);