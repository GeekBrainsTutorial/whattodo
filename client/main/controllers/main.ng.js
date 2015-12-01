angular.module('WhatToDoApp').controller('AppController', function($scope, $meteor, $mdDialog, $mdSidenav) {

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.showLogin = function(ev) {
        $mdDialog.show({
            controller: "LoginCtrl",
            templateUrl: 'client/main/views/dialogs/login.ng.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        });
    };

});