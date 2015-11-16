angular.module("WhatToDoApp").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider

        .state('public', {
            url: '/public',
            templateUrl: 'client/templates/public.ng.html'
        });

    $urlRouterProvider.otherwise("/public");
});