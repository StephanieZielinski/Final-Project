var app = angular.module('privyMod', ['ngRoute']);

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
    controller: 'allReviewController',
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
