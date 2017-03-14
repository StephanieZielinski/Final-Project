var app = angular.module('myMod');

app.controller('myController', function($scope, privyService $http) {

  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(review){
      console.log(review);
      privyService.addReview(review).then(function(){
        $scope.reviewList = privyService.updateReviews();
      });


  $http({
    method: 'GET',
    url: '/addreview'
    }).then(function successCallback(response){
    $scope.addReview = response.data;
    });

  $http({
    method: 'GET',
    url: '/locationreview'
    }).then(function successCallback(response){
    $scope.locationReview = response.data;
    });

  $http({
    method: 'GET',
    url: '/results'
    }).then(function successCallback(response) {
    $scope.reviewList= response.data;
    });

  $http({
    method: 'GET',
    url: '/select'
    }).then(function successCallback(response){
    // Need to match names selectBathroom or selectType or selectCatag
    $scope.select = response.data;
    });
  };
});
