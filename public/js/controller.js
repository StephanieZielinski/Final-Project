var app = angular.module('privyMod');

app.controller('privyController', function($scope, privyService, $http, $routeParams, $location) {

$scope.review = {};
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


// STICKY NAV FUNCTION
var stickyNav = document.getElementsByClassName('stickyNav');

  $(window).scroll(function() {
    if( $(this).scrollTop()>352) {
      stickyNav[0].className = "navbar-default-scrolled stickyNav";
    } else {
      stickyNav[0].className = "navbar-default stickyNav";
    }
  });

});
