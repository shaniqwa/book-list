'use strict';
angular.module('bookList')
.service('BookService',['$http', function($http) {
    var myData = null;

    var promise = $http.get('/data/data.json').then(function (data) {
      var books = data.data;

      var booksLen = books.length;

      //convert date from string to Date
      for(var i=0; i < booksLen; i++) {
         books[i].date = new Date(books[i].date);
      }
      myData = books;
    });

    return {
      promise:promise,
      getAllBooks: function () {
          return myData;
      }
    };
}]);