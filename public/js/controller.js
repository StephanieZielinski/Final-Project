var app = angular.module('myMod');

app.controller('myController', function($scope, privyService) {

  listService.getReviews().then(function(){
    $scope.reviewList = listService.updateReviews();
  });

  $scope.submitToReviews = function(item){
      console.log(item);
      listService.addReview(item).then(function(){
        $scope.reviewList = listService.updateReviews();
      });
  };

  // app.controller('NewTableCtrl', function($scope) {
  //
  //  $scope.table = { fields: [] };
  //
  //  $scope.addFormField = function() {
  //    $scope.table.fields.push('');
  //  }
  //
  //  $scope.submitTable = function() {
  //    console.log($scope.table);
  //  }
  //
  // });

});
