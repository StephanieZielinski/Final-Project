var app = angular.module('privyMod');

app.controller('mapController', function($scope, privyService, $http, $location) {


    function initMap() {

        $scope.distanceMatrix = {};
        $scope.url = $location.path();
        console.log($scope.url);

        //TRY GEOLOCATION SET CENTER TO GEOLOCATION
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infowindow.setPosition($scope.pos);
                infowindow.setContent('Location found.');
                map.setCenter($scope.pos);

                searchNearby();

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infowindow.setPosition($scope.pos);
            infowindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }





        // Initialize to DETROIT (lat/lng)
        var Detroit = {
            lat: 42.3360077,
            lng: -83.0508025
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            center: Detroit,
            zoom: 15,
            scrollwheel: false
        });

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

        infowindow = new google.maps.InfoWindow();




        //Call places service with nearbySearch using following parameters
        function searchNearby() {
            console.log($scope.pos);
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: $scope.pos,
                //radius: 5000,
                openNow: true,
                rankBy: google.maps.places.RankBy.DISTANCE,
                types: ['restaurant']
            }, callback);
            //  }
        };

        //returns Google Places Data in results
        function callback(results, status) {
            console.log(results);
            $scope.resultsDisplay = results;
            console.log($scope.resultsDisplay);
            console.log($scope.resultsDisplay[0].vicinity);




//Loop for Google Places Markers
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 1; i < 10 ; i++) {
            createMarker(results[i]);
          }
        }
        createClosestMarker(results[0]);
      //  for (var i = 1; i < 15 ; i++) {
      //    $scope.distanceResponse.push(getDistance(results[i].vicinity));

            //Loop for Google Places Markers
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 1; i < 10; i++) {
                    createMarker(results[i]);
                }
            }
            createClosestMarker(results[0]);
            //  for (var i = 1; i < 15 ; i++) {
            //    $scope.distanceResponse.push(getDistance(results[i].vicinity));


            //  }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: "img/toilet_box1.png",
                animation: google.maps.Animation.DROP

            });

            //Call Google distance Matrix to calculate distance
            //  $scope.distanceCalc = "";
            $scope.distanceResponse = "";
            var origin = [$scope.pos]
            var destination = [place.geometry.location];
            //console.log($scope.destinationArray);
            $scope.distanceArray = {};
            $scope.distanceResponse = [];
            var service = new google.maps.DistanceMatrixService;

            function getDistance(destinationCoordinates) {
                service.getDistanceMatrix({
                    origins: origin,
                    destinations: destinationCoordinates,
                    travelMode: 'WALKING',
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    avoidHighways: false,
                    avoidTolls: false
                }, function(response, status) {
                    // if (status !== 'OK') {
                    //     alert('Error was: ' + status);
                    // } else {
                        var originList = response.originAddresses;
                        var destinationList = response.destinationAddresses;
                        //      $scope.distanceCalc = response.rows[0].elements[0].distance.text;
                        console.log(response);
                        $scope.distanceMatrix = response;
                        $scope.$apply();

                        console.log($scope.distanceMatrix);

                        return response;

                    // };

                    //return response;

                });
                // return $scope.distanceMatrix;
            }

            // set place details object to scope

<<<<<<< HEAD
//Call Google distance Matrix to calculate distance
//  $scope.distanceCalc = "";
$scope.distanceResponse = "";
        var origin = [$scope.pos]
        var destination = [place.geometry.location];
//console.log($scope.destinationArray);
$scope.distanceArray = {};
$scope.distanceResponse = [];
        var service = new google.maps.DistanceMatrixService;
       function getDistance(destinationCoordinates){
        service.getDistanceMatrix({
          origins: origin,
          destinations: destinationCoordinates,
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          // if (status !== 'OK') {
          //   alert('Error was: ' + status);
          // } else {
           var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
    //      $scope.distanceCalc = response.rows[0].elements[0].distance.text;
console.log(response);
$scope.distanceMatrix = response;
$scope.$apply();

console.log($scope.distanceMatrix);

return response;

            // };

            //return response;

});
// return $scope.distanceMatrix;
}

// set place details object to scope

var destination = [];
for (var j = 0; j < 10;j++){
destination.push($scope.resultsDisplay[j].vicinity);
 $scope.distanceResponse.push(getDistance(destination));
// console.log($scope.distanceResponse);

}

//console.log($scope.distanceResponse);
//console.log($scope.matrixResponse);

  //    console.log($scope.distanceCalc);
      $scope.placeObj = place;
  //    console.log($scope.placeObj.name);
    //  $scope.nameList.push($scope.placeObj.name);
      $scope.$apply();


        google.maps.event.addListener(marker, 'click', function() {
          console.log($scope.distanceMatrix);
          $scope.arrayIndex = $scope.resultsDisplay.indexOf($scope.resultsDisplay.vicinity);
          console.log($scope.resultsDisplay);
          console.log(place);
          infowindow.setContent("<a href='#/locationreview/" + place.place_id + "'>" + place.name + "</a>" + '<br>' + place.vicinity + '<br>' + 'Rating: ' + place.rating + '<br>' + '<a href="#/locationreview/' + place.place_id +'"' + '>View Reviews </a>' + '&nbsp;' + '<a href="#/addreview/' + place.place_id +'"' + '>Add Review </a>' + '&nbsp;' +  "<a href='https://www.google.com/maps/dir//" + place.vicinity + "''>" + "Directions" + "</a>" + "<br>" + $scope.distanceMatrix.rows[0].elements[0].distance.text);
          infowindow.open(map, this);
          var service = new google.maps.places.PlacesService(map);
          service.getDetails({
            placeId: place.place_id
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              console.log(place);

            var destination = [];
            for (var j = 0; j < 10; j++) {
                destination.push($scope.resultsDisplay[j].vicinity);
                $scope.distanceResponse.push(getDistance(destination));
                // console.log($scope.distanceResponse);


            }

            //console.log($scope.distanceResponse);
            //console.log($scope.matrixResponse);

            //    console.log($scope.distanceCalc);
            $scope.placeObj = place;
            //    console.log($scope.placeObj.name);
            //  $scope.nameList.push($scope.placeObj.name);
            $scope.$apply();


            google.maps.event.addListener(marker, 'click', function() {
                console.log($scope.distanceMatrix);
                $scope.arrayIndex = $scope.resultsDisplay.indexOf($scope.resultsDisplay.vicinity);
                console.log($scope.resultsDisplay);
                console.log(place);
                infowindow.setContent("<a href='#/locationreview/" + place.place_id + "'>" + place.name + "</a>" + '<br>' + place.vicinity + '<br>' + 'Rating: ' + place.rating + '<br>' + '<a href="#/locationreview/' + place.place_id + '"' + '>View Reviews </a>' + '&nbsp;' + '<a href="#/addreview/' + place.place_id + '"' + '>Add Review </a>' + '&nbsp;' + "<a href='https://www.google.com/maps/dir//" + place.vicinity + "''>" + "Directions" + "</a>" + "<br>" + $scope.distanceMatrix.rows[0].elements[0].distance.text);
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


        function createClosestMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: "img/flag.png",

                //    icon: "img/tp1.png",
                animation: google.maps.Animation.BOUNCE

            });


            $scope.placeObj = place;
            console.log($scope.placeObj.name);
            //  $scope.nameList.push($scope.placeObj.name);
            $scope.$apply();


            google.maps.event.addListener(marker, 'click', function() {
                console.log(place.place_id);
                infowindow.setContent("<a href='#/locationreview/" + place.place_id + "'>" + place.name + "</a>" + '<br>' + place.vicinity + '<br>' + 'Rating: ' + place.rating + '<br>' + '<a href="#/locationreview/' + place.place_id + '"' + '>View Reviews </a>' + '&nbsp;' + '<a href="#/addreview/' + place.place_id + '"' + '>Add Review </a>' + '&nbsp;' + "<a href='https://www.google.com/maps/dir//" + place.vicinity + "''>" + "Directions" + "</a>");
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

});
