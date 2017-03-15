var app = angular.module('myMod');

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
  for (var i = 0; i < 10; i++) {
    markers.push(createRandomMarker(i, $scope.map.bounds))
  }
  $scope.randomMarkers = markers;
});
