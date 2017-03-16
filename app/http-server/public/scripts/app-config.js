'use strict';
angular.module('bookList')
.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
        templateUrl: '../views/book.html',
        controller: "bookCtrl",
        resolve: {
            'MyServiceData':function(BookService){
                return BookService.promise;
            }
        }
    });
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);