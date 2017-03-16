'use strict';
angular.module('bookList')
.controller('ModalInstanceCtrl', ['bookInfo', 'editForm', '$scope' ,'$modalInstance',function (bookInfo, editForm, $scope, $modalInstance) {
    $scope.form = {};
    $scope.book = bookInfo;
    $scope.submit = function () {
        if ($scope.form.editForm.$valid) {
            $modalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
    };
}]);