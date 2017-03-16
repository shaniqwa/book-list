'use strict';
angular.module('bookList')
.filter('titleCase', function() {
    return function(input) {
      input = input || '';
      input = input.replace(/[^a-zA-Z ]/g, "");
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
});