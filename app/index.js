angular.module('phonebookManager', ['ngRoute', 'phonebookControllers'])
    .config(function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'app/components/phonebook/views/index.html',
            controller: 'indexCtrl'
        })
        .when('/info/:id', {
            templateUrl: 'app/components/phonebook/views/details.html',
            controller: 'detailsCtrl'
        })
        .when('/create', {
            templateUrl: 'app/components/phonebook/views/create.html',
            controller: 'createCtrl'
        })
        .when('/update/:id', {
            templateUrl: 'app/components/phonebook/views/update.html',
            controller: 'updateCtrl'
        })
        .when('/delete/:id', {
            templateUrl: 'app/components/phonebook/views/delete.html',
            controller: 'deleteCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        });
    });



