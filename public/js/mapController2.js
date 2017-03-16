var app = angular.module('privyMod');

app.controller('mapController', function($scope, privyService, $http) {

$scope.test = "test";

  function initMap() {

        var Detroit = {lat: 42.3360077, lng: -83.0508025};

        var map = new google.maps.Map(document.getElementById('map'), {
          center: Detroit,
          zoom: 15
        });


        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: Detroit,
          radius: 500,
          type: ['store']
        }, callback);
    //  }

      function callback(results, status) {
        console.log(results);
        $scope.resultsDisplay = results;
        console.log($scope.resultsDisplay);
        console.log($scope.resultsDisplay[0].name);


        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: "img/tp1.png",
          animation: google.maps.Animation.DROP

        });

        $scope.placeObj = place;


        google.maps.event.addListener(marker, 'click', function() {
          console.log(place.place_id);
          infowindow.setContent('<a href="#/addreview">Add Review</a>' + '<br>'+ place.name + '<br>' + place.formatted_address + '<br>' + place.formatted_phone_number + '<br>' + place.rating);
          infowindow.open(map, this);
          var service = new google.maps.places.PlacesService(map);
          service.getDetails({
            placeId: place.place_id
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              console.log(place);
            }
          });
        });

      }
}
      initMap();




//   $scope.map = { center: {latitude: 42.3360077, longitude: -83.0508025}, zoom: 8,};
//
//   $scope.options = {
//     scrollwheel: false};
//
// $scope.test = "TEST EXPRESSION";
// // console.log($scope.gPlace);
//
//
// function initMap(){
// var detroit = {latitude: 42.3360077, longitude: -83.0508025};
// // var service = new google.maps.places.PlacesService($scope.map);
//
// $scope.gPlace.nearbySearch({
//   location: detroit,
//   radius: 500,
//   type: ['store']
// }, callback);
//
// // function callback(results, status) {
// //   if (status === google.maps.places.PlacesServiceStatus.OK) {
// //     for (var i = 0; i < 10; i++) {
// //       createMarker(results[i]);
// //     }
// //   }
// // };
//
// // function createMarker(place) {
// //   var placeLoc = place.geometry.location;
// //   var marker = new google.maps.Marker({
// //     map: $scope.map,
// //     position: place.geometry.location,
// //     animation: google.maps.Animation.DROP,
// //     icon: "img/tp1.png"
// //   });
// // }
//
//   //console.log(place);
//   //console.log(place.name);
//
//   // will not work with the angular gmaps plugin
//   // $scope.service = new google.maps.places.PlacesService($scope.map);
//
//   var createRandomMarker = function(i, bounds, idKey) {
//
//     if (idKey == null) {
//       idKey = "id";
//     }
//
//     var latitude = 42.3360077 + (Math.random() * 1);
//     var longitude = -83.0508025 + (Math.random() * 1);
//     var ret = {
//       latitude: latitude,
//       longitude: longitude,
//       title: 'm' + i,
//       icon: "img/tp1.png"
//     };
//
//     ret[idKey] = i;
//     return ret;
//   };
//
//   var markers = [];
//
//   for (var i = 0; i < 10; i++) {
//     markers.push(createRandomMarker(i, $scope.map.bounds))
//   }
//
//   $scope.randomMarkers = markers;
//
// }
//
// initMap();
//   uiGmapGoogleMapApi.then(function(maps) {
//
//
//     });

});
