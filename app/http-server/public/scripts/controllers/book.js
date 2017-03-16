'use strict';
angular.module('bookList')
.controller('bookCtrl', [ '$scope', '$modal', '$log', 'BookService',function ($scope, $modal, $log, BookService) {
  $scope.books = BookService.getAllBooks();
   $scope.editBook = function(book){
      var modalInstance = $modal.open({
                templateUrl: '../../views/modal-form.html',
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
}]);