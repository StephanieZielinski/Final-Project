var app = angular.module('myMod');

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/addreview', {
     controller:'myController',
     templateUrl: 'addreview.html'
  })
  .when('/locationreview', {
    controller:'myController',
    templateUrl: 'locationreview.html'
  })
  .when('/results', {
    controller: 'myController',
    templateUrl: 'results.html'
  })
  .when('/select', {
    controller:'myController',
    templateUrl: 'select.html'
  });

  $locationProvider.hashPrefix('');
});
