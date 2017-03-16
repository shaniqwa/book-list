'use strict';
angular.module('bookList')
.service('BookService',['$http', function($http) {
    var myData = null;

    var promise = $http.get('/data/data.json').then(function (data) {
      var books = data.data;
      myData = books;
    });

    return {
      promise:promise,
      getAllBooks: function () {
          return myData;
      }
    };
}]);