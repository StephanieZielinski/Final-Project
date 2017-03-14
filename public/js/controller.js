var app = angular.module('myMod');

app.controller('myController', function($scope, privyService) {

  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(item){
      console.log(item);
      privyService.addReview(item).then(function(){
        $scope.reviewList = privyService.updateReviews();
      });
  };


});
