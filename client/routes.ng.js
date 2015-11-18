angular.module("WhatToDoApp").run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('public');
        }
    });
});

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
        .state('organization', {
            url: '/organization',
            templateUrl: 'client/templates/organization.ng.html',
            controller: 'OrganizationCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
        })
        .state('create_organization', {
            url: '/create_organization',
            templateUrl: 'client/templates/create_organization.ng.html',
            controller: 'OrganizationCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
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