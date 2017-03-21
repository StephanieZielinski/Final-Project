var app = angular.module('privyMod');


app.factory('privyService', function($http) {
  var reviewList = [];

  return {
    updateReviews: updateReviews,
    getReviews: getReviews,
    addReview: addReview,
    locationReviews: locationReviews
  };

  function updateReviews(){
    return reviewList;
  };

  function getReviews() {
    var promise = $http({
      method: 'GET',
      url: '/results'
    }).then(function successCallback(response) {
      //console.log(response);
      reviewList = response.data;
    });
    return promise;
  };

  function locationReviews(id) {
    var promise = $http({
      method: 'GET',
      url: '/locationreview/'+ id
    }).then(function successCallback(response) {
      console.log(response);
      console.log(id);
      reviewList = response.data;
    });
    return promise;
  };

  function addReview(review) {
    var promise = $http({
      method: 'POST',
      url: '/addreview',
      data: review
    }).then(function successCallback(response) {
      console.log(response);
      console.log(review);
      var path = "#/locationreview/review.id";
    });
    return promise;
  };




});
