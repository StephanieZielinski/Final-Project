var app = angular.module('myMod', ['ngRoute', 'uiGmapgoogle-maps']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDDSY7PloqKzlS8KIOrwnbmq2bnhuti1L8',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

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
  });

  $locationProvider.hashPrefix('');
});
