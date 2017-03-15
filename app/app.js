'use strict';
var app = angular.module('bookList', ['ngRoute','ui.bootstrap']).filter('titleCase', function() {
    return function(input) {
      input = input || '';
      input = input.replace(/[^a-zA-Z ]/g, "");
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });
app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
        templateUrl: '_book.html',
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


app.service('BookService', function($http) {
    var myData = null;

    var promise = $http.get('http://localhost:8080/getAllBooks').success(function (data) {
      var booksLen = data.length;
      //convert date from string to Date
      for(var i=0; i < booksLen; i++) {
         data[i].date = new Date(data[i].date);
      }
      myData = data;
    });

    return {
      promise:promise,
      getAllBooks: function () {
          return myData;
      }
    };
});

app.controller('bookCtrl', function ($scope, $modal, $log, BookService) {
  $scope.books = BookService.getAllBooks();

   $scope.editBook = function(book){
      

      var modalInstance = $modal.open({
                templateUrl: 'modal-form.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {
                    bookInfo: function () {
                        return book;
                    },
                    editForm: function () {
                        return $scope.editForm;
                    }
                }
            });

      modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
                console.log($scope.selected);
            });
  }

   $scope.deleteBook = function(book){
      bootbox.confirm({
         title: 'Delete Book',
         message: "Are you sure you want to delete this book?",
         callback: function (result) {
            if(result){
               var index = $scope.books.indexOf(book);
               $scope.$apply(function(){
                  $scope.books.splice(index, 1);
               });
            }
         }
      });
      
   }
});
app.controller('ModalInstanceCtrl', ['bookInfo', 'editForm', '$scope' ,'$modalInstance',function (bookInfo, editForm, $scope, $modalInstance) {
    $scope.form = {};
    $scope.book = bookInfo;
    $scope.submit = function () {
        if ($scope.form.editForm.$valid) {
            console.log('user form is in scope');
            $modalInstance.close('closed');
        } else {
            console.log('user form is not in scope');
        }
    };

    $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
    };
}]);


