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

app.directive('privynav', function(){
  return {
    restrict: 'EA',
    templateUrl: 'partials/navbar.html',
    replace: false
  };
});



app.config(function($routeProvider, $locationProvider){
  $routeProvider

    .otherwise('/landing.html', {
     controller:'privyController',
     templateUrl: 'views/addreview.html'
  })
    .when('/addreview/:placeId', {
     controller:'addReviewController',
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
  .when('/familyFriendly', {
    controller: 'privyController',
    templateUrl: 'views/filters/familyResults.html'
  })
  .when('/genderNeutral', {
    controller: 'privyController',
    templateUrl: 'views/filters/genderNeutral.html'
  })
  .when('/handicap', {
    controller: 'privyController',
    templateUrl: 'views/filters/handicap.html'
  })
  .when('/genderSeparate', {
    controller: 'privyController',
    templateUrl: 'views/filters/genderSeparate.html'
  })
  .when('/fiveStar', {
    controller: 'privyController',
    templateUrl: 'views/filters/fiveStar.html'
  })
  .when('/fourStar', {
    controller: 'privyController',
    templateUrl: 'views/filters/fourStar.html'
  })
  .when('/threeStar', {
    controller: 'privyController',
    templateUrl: 'views/filters/threeStar.html'
  })
  .when('/twoStar', {
    controller: 'privyController',
    templateUrl: 'views/filters/twoStar.html'
  })
  .when('/oneStar', {
    controller: 'privyController',
    templateUrl: 'views/filters/oneStar.html'
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
