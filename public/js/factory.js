var app = angular.module('myMod');


app.factory('privyService', function($http) {
  var reviewList = [];

  return {
    addReview: addReview,
    getReviews: getReviews,
    updateReviews: updateReviews
  };

  function updateReviews(){
    return reviewList;
  };

  function addReview(item) {
    var promise = $http({
      method: 'POST',
      url: '/add-review',
      data: item
    }).then(function successCallback(response) {
      console.log(response);
      reviewList = response.data;
    });
    return promise;
  };

function getReviews() {
  var promise = $http({
    method: 'GET',
    url: '/get-reviews'
  }).then(function successCallback(response) {
    console.log(response);
    reviewList = response.data;
  });
  return promise;
};



});
