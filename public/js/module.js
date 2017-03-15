var app = angular.module('myMod', ['ngRoute']);

// app.config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyDDSY7PloqKzlS8KIOrwnbmq2bnhuti1L8',
//       //  v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization,places'
//
//     });
// })



app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            $scope.gPlace = new google.maps.places.PlacesService($scope.map);

            google.maps.event.addListener($scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

//myApp.factory('myService', function() {});

function MyCtrl($scope) {
    $scope.gPlace;
}






app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/addreview', {
     controller:'myController',
     templateUrl: 'views/addreview.html'
  })
  .when('/locationreview', {
    controller:'myController',
    templateUrl: 'views/locationreview.html'
  })
  .when('/results', {
    controller: 'myController',
    templateUrl: 'views/results.html'
  })
  .when('/select', {
    controller:'mapController',
    templateUrl: 'views/select.html'
  })
  .when('/thankyou', {
    controller: 'myController',
    templateUrl: 'views/thankyou.html'
  });

  $locationProvider.hashPrefix('');
});
