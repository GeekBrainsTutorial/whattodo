angular.module("WhatToDoApp").controller("TaskExecutorCtrl", ['$scope', '$meteor', '$state', 'conditions',
    function ($scope, $meteor, $state, conditions) {

        /**
         * @type {SubscriptionHandle|any|*}
         */
        $scope.$meteorSubscribe('task', conditions.task.imExecutor)
            .then(function(subscriptionHandle) {
                $scope.executeTask = $meteor.collection(Task);
            });

        /**
         * Toggle is complete status
         */
        $scope.toggleIsComplete = function (taskId) {
            $meteor.call("Task.toggleIsComplete", taskId).then(
                function (data) { },
                function (error) {
                    console.log(error);
                }
            );
        };
    }
]);