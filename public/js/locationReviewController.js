var app = angular.module('privyMod');

app.controller('locationReviewController', function($scope, privyService, $http, $routeParams, $location) {

$scope.placeDetails = "";
$scope.url = "";
    $scope.reviewList = [];

    var Detroit = {lat: 42.3360077, lng: -83.0508025};

    var map = new google.maps.Map(document.getElementById('locationMap'), {
      center: Detroit,
      zoom: 15,
      scrollwheel: false
    });
    var service = new google.maps.places.PlacesService(map);
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;


    var center;
    function calculateCenter() {
      center = map.getCenter();
    }
    google.maps.event.addDomListener(map, 'idle', function() {
      calculateCenter();
    });
    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
    });

    $scope.url = $location.path().substr(16);
    console.log($scope.url);

    service.getDetails({
            placeId: $scope.url
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              $scope.placeDetails = place;
              $scope.$apply();
              console.log(place);
              // $scope.placeDetails = place;
            //  console.log($scope.placeDetails);
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: "img/toilet_box1.png",
                animation: google.maps.Animation.DROP
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent("<a href=''>" + place.name + "</a>" + '<br>' + place.vicinity + '<br>' + 'Rating: ' + place.rating + '<br>' + '<a href="#/locationreview/' + place.place_id +'"' + '>View Reviews </a>' + '&nbsp;' + '<a href="#/addreview/' + place.place_id +'"' + '>Add Review </a>' + '&nbsp;' +  "<a href='https://www.google.com/maps/dir//" + place.vicinity + "''>" + "Directions" + "</a>");

                infowindow.open(map, this);
              });
            }
$scope.latLng = place.geometry.location;
console.log($scope.latLng);
          });

          function geocodePlaceId(geocoder, map, infowindow) {
        geocoder.geocode({'placeId': $scope.url}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
            //  map.setZoom(11);
              map.setCenter(results[0].geometry.location);
            //  var marker = new google.maps.Marker({
              //  map: map,
              //  position: results[0].geometry.location
            //  });
            //  infowindow.setContent(results[0].formatted_address);
            //  infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

geocodePlaceId(geocoder, map, infowindow);
    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      placeId: $scope.url,
     location: Detroit,
     radius: 500,
      type: ['restaurant,museum']
    }, callback);

//  }


//returns Google Places Data in results
  function callback(results, status) {
    console.log(results);
    $scope.resultsDisplay = results;
    console.log($scope.resultsDisplay);
    console.log($scope.resultsDisplay[0].name);

}

// $scope.url = $location.path().substr(16);
// console.log($scope.url);

    var marker = new google.maps.Marker({
        //  position: {lat: 42.3360077, lng: -83.0508025},
        placeId: $scope.url,
          map: map,
          title: 'Hello World!'
        });

            // marker.setPlace({
            //             placeId: $scope.url
            //             //location: place.geometry.location
            //           });
            //           marker.setVisible(true);

    // $routeParams.placeId;

    privyService.getReviews().then(function(){
      $scope.reviewList = privyService.updateReviews();
    });

    privyService.locationReviews($routeParams.placeId).then(function(data) {
        $scope.locationReviewsArray = privyService.updateReviews();
        console.log($scope.locationReviewsArray);

    });

});
