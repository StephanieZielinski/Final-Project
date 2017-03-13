var app = angular.module('myMod');

app.controller('myController', function($scope, privyService) {

  listService.getReviews().then(function(){
    $scope.reviewList = listService.updateReviews();
  });

  $scope.addToReviews = function(item){
      console.log(item);
      listService.addItem(item).then(function(){
        $scope.reviewList = listService.updateReviews();
      });
  };
