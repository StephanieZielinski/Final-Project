var app = angular.module('myMod', ['ngRoute']);

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
  .when('/getreviews', {
    controller: 'myController',
    templateUrl: 'views/results.html'
  })
  .when('/select', {
    controller:'myController',
    templateUrl: 'views/select.html'
  });

  $locationProvider.hashPrefix('');
});
