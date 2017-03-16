var app = angular.module('privyMod');

app.controller('mapController', function($scope, privyService, $http, $location) {



  function initMap() {

    $scope.url = $location.path();
    console.log($scope.url);

// Initialize to DETROIT (lat/lng)
        var Detroit = {lat: 42.3360077, lng: -83.0508025};

        var map = new google.maps.Map(document.getElementById('map'), {
          center: Detroit,
          zoom: 15
        });


        infowindow = new google.maps.InfoWindow();

//Call places service with nearbySearch using following parameters

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
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

//Loop for Google Places Markers
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 1; i < 15 ; i++) {
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
      console.log($scope.placeObj.name);
    //  $scope.nameList.push($scope.placeObj.name);
      $scope.testArray = [1,2,3,4,5];
      $scope.$apply();


        google.maps.event.addListener(marker, 'click', function() {
          console.log(place.place_id);
          infowindow.setContent("INFO FROM DATABASE"+ "<br>" + "<a href=''>" + place.name + "</a>" + '<br>' + place.vicinity + '<br>' + place.formatted_phone_number + '<br>' + place.rating + '<br>');
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


console.log($scope.placeObj);
console.log($scope.place);
console.log($scope.nameList);
console.log($scope.testArray);


      initMap();


console.log($scope.nameList);
// console.log($scope.nameList[3]);

// console.log($scope.testArray);



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
