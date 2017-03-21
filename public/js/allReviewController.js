var app = angular.module('privyMod');

app.controller('allReviewController', function($scope, privyService, $http, $routeParams, $location) {


  console.log($routeParams.placeId);

$scope.review = {};
$scope.titleTest = "REVIEW LOCATION TITLE TEST";
//  $scope.review.id = $routeParams.placeId;
  // console.log($scope.review.id);

  var Detroit = {lat: 42.3360077, lng: -83.0508025};

  var map = new google.maps.Map(document.getElementById('allReviewsMap'), {
    center: Detroit,
    zoom: 15,
    scrollwheel: false
  });

  var service = new google.maps.places.PlacesService(map);

  //
  //     service.getDetails({
  //             placeId: $scope.url
  //           }, function(place, status) {
  //             if (status === google.maps.places.PlacesServiceStatus.OK) {
  //               $scope.placeDetails = place;
  //               $scope.$apply();
  //               console.log(place);
  //               // $scope.placeDetails = place;
  //             //  console.log($scope.placeDetails);
  //               var marker = new google.maps.Marker({
  //                 map: map,
  //                 position: place.geometry.location,
  //                 icon: "img/toilet_box1.png",
  //                 animation: google.maps.Animation.DROP
  //               });
  //               google.maps.event.addListener(marker, 'click', function() {
  //                 infowindow.setContent("<a href=''>" + place.name + "</a>" + '<br>' + place.vicinity + '<br>' + 'Rating: ' + place.rating + '<br>' + '<a href="#/locationreview/' + place.place_id +'"' + '>View Reviews </a>' + '&nbsp;' + '<a href="#/addreview/' + place.place_id +'"' + '>Add Review </a>' + '&nbsp;' +  "<a href='https://www.google.com/maps/dir//" + place.vicinity + "''>" + "Directions" + "</a>");
  //
  //                 infowindow.open(map, this);
  //               });
  //             }
  // $scope.latLng = place.geometry.location;
  // console.log($scope.latLng);
  //           });




  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(review){
      review.id = $routeParams.placeId;
      console.log($routeParams.type);

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
