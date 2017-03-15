var app = angular.module('myMod');

app.controller('myController', function($scope, privyService, $http) {

  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(review){
      console.log(review);
      privyService.addReview(review).then(function(){
        $scope.reviewList = privyService.updateReviews();
      });
    };

});
