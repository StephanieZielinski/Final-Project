var app = angular.module('privyMod', ['ngRoute']);

// app.config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyDDSY7PloqKzlS8KIOrwnbmq2bnhuti1L8',
//       //  v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization,places'
//
//     });
// })



// app.directive('googleplace', function() {
//     return {
//         require: 'ngModel',
//         link: function(scope, element, attrs, model) {
//             var options = {
//                 types: [],
//                 componentRestrictions: {}
//             };
//             $scope.gPlace = new google.maps.places.PlacesService($scope.map);
//
//             google.maps.event.addListener($scope.gPlace, 'place_changed', function() {
//                 scope.$apply(function() {
//                     model.$setViewValue(element.val());
//                 });
//             });
//         }
//     };
// });

//myApp.factory('myService', function() {});
//
// function MyCtrl($scope) {
//     $scope.gPlace;
// }






app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/addreview/:placeId', {
     controller:'privyController',
     templateUrl: 'views/addreview.html'
  })
  .when('/locationreview/:placeId', {
    controller:'locationReviewController',
    templateUrl: 'views/locationreview.html'
  })
  .when('/results', {
    controller: 'privyController',
    templateUrl: 'views/results.html'
  })
  .when('/results/:type', {
    controller: 'privyController',
    templateUrl: 'views/results.html'
  })
  .when('/select', {
    controller:'mapController',
    templateUrl: 'views/select.html'
  })
  .when('/thankyou', {
    controller: 'privyController',
    templateUrl: 'views/thankyou.html'
  })
  .when('/', {
    controller: 'privyController',
    templateUrl: 'views/landing.html'
  });

  $locationProvider.hashPrefix('');
});
