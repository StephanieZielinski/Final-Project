var app = angular.module('privyMod');

app.controller('locationReviewController', function($scope, privyService, $http, $routeParams, $location) {


$scope.reviewList = [];

// $routeParams.placeId;

privyService.locationReviews($routeParams.placeId).then(function(data){
$scope.locationReviewsArray = privyService.updateReviews();
console.log($scope.locationReviewsArray);

});

});
