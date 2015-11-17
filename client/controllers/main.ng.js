angular.module('WhatToDoApp').controller('AppController', function($scope, $meteor, $mdDialog, $mdSidenav) {

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.showLogin = function(ev) {
        $mdDialog.show({
                controller: "LoginCtrl",
                templateUrl: 'client/templates/dialogs/login.ng.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

});