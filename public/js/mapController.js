var app = angular.module('privyMod');

app.controller('mapController', function($scope, privyService, $http) {

  $scope.map = {
    center: {
      latitude: 42.3360077,
      longitude: -83.0508025
    },
    zoom: 8,
  };

  $scope.options = {
    scrollwheel: false
  };

$scope.test = "TEST EXPRESSION";

var detroit = {lat: 42.355302, lng: -83.065028};

$scope.gPlace.nearbySearch({
  location: detroit,
  radius: 500
  // type: ['store']
}, callback);

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 10; i++) {
      createMarker(results[i]);
    }
  }
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: $scope.map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    icon: "img/tp1.png"
  });

  console.log(place);
  console.log(place.name);

  // will not work with the angular gmaps plugin
  // $scope.service = new google.maps.places.PlacesService($scope.map);

  var createRandomMarker = function(i, bounds, idKey) {

    if (idKey == null) {
      idKey = "id";
    }

    var latitude = 42.3360077 + (Math.random() * 1);
    var longitude = -83.0508025 + (Math.random() * 1);
    var ret = {
      latitude: latitude,
      longitude: longitude,
      title: 'm' + i,
      icon: "img/tp1.png"
    };

    ret[idKey] = i;
    return ret;
  };

  var markers = [];
  // for (var i = 0; i < 10; i++) {
  //   markers.push(createRandomMarker(i, $scope.map.bounds))
  // }
  $scope.randomMarkers = markers;
});
}
