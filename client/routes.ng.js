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
            templateUrl: 'client/main/views/public.ng.html'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'client/main/views/registration.ng.html',
            controller: 'RegisterCtrl'
        })
        .state('organization', {
            url: '/organization',
            templateUrl: 'client/organization/views/index.ng.html',
            controller: 'OrganizationCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
        })
        .state('organization/detail', {
            url: '/organization/:orgId',
            templateUrl: 'client/organization/views/detail.ng.html',
            controller: 'OrganizationDetailCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
        })
        .state('organization/create', {
            url: '/create/organization',
            templateUrl: 'client/organization/views/create.ng.html',
            controller: 'OrganizationCreateCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
        })
        .state('organization/change', {
            url: '/change/organization/:orgId',
            templateUrl: 'client/organization/views/change.ng.html',
            controller: 'OrganizationChangeCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
        })
        .state('task/creator', {
            url: '/task/creator',
            templateUrl: 'client/task/views/creator.ng.html',
            controller: 'TaskCreatorCtrl',
            resolve: {
                "currentUser": function($meteor){
                    return $meteor.requireUser();
                }
            }
        })
        .state('task/executor', {
            url: '/task/executor',
            templateUrl: 'client/task/views/executor.ng.html',
            controller: 'TaskExecutorCtrl',
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