var app = angular.module('privyMod');

app.controller('privyController', function($scope, privyService, $http, $routeParams) {

  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(review){
      console.log(review);
      privyService.addReview(review).then(function(){
        $scope.reviewList = privyService.updateReviews();
      });
    };

  // $scope.submitId = function(id){
  //   privyService.addId(id).then(function()
  //     $scop
  // }

  console.log($routeParams.placeId);
  console.log($routeParams.type);
  // $scope.filter = {
  //   family: $routeParams.family,
  //
  // }

});
