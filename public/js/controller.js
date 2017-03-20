var app = angular.module('privyMod');

app.controller('privyController', function($scope, privyService, $http, $routeParams, $location) {

$scope.review = {};
$scope.titleTest = "REVIEW LOCATION TITLE";
//  $scope.review.id = $routeParams.placeId;
  // console.log($scope.review.id);

  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(review){
      review.id = $routeParams.placeId;
      // console.log(review);
      privyService.addReview(review).then(function(){
        $scope.reviewList = privyService.updateReviews();
      });
    };




  console.log($routeParams.placeId);
  console.log($routeParams.type);
  // $scope.filter = {
  //   family: $routeParams.family,
  //
  // }

});
