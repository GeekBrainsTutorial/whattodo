angular.module("WhatToDoApp").controller("TaskPublicCtrl", ['$scope', '$meteor', '$state', '$stateParams', 'conditions',
    function ($scope, $meteor, $state, $stateParams, conditions) {

        $scope.tasks =
            $scope.$meteorCollection(Task, false)
                .subscribe("task", conditions.task.byOrgId($stateParams.orgId));
    }
]);