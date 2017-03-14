var app = angular.module('myMod');

app.controller('myController', function($scope, privyService, $http) {

  privyService.getReviews().then(function(){
    $scope.reviewList = privyService.updateReviews();
  });

  $scope.submitToReviews = function(review){
      // console.log(review);
      privyService.addReview(review).then(function(){
        $scope.reviewList = privyService.updateReviews();
<<<<<<< HEAD
      });
    };

=======
    });
  };
>>>>>>> 4e520a9ceb15bb042ddab0cf07a3b8cd21a8d014
});
