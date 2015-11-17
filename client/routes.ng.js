angular.module("WhatToDoApp").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider

        .state('public', {
            url: '/public',
            templateUrl: 'client/templates/public.ng.html'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'client/templates/registration.ng.html',
            controller: 'RegisterCtrl'
        })
        .state('logout', {
            url: '/logout',
            resolve: {
                "logout": function($meteor, $state) {
                    return $meteor.logout().then(function(){
                        $state.go('public');
                    }, function(err){
                        console.log('logout error - ', err);
                    });
                }
            }
        });

    $urlRouterProvider.otherwise("/public");
});