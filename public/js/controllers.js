

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/movies').
    success(function(data, status, headers, config) {
      $scope.movies = data.movies;
    });
}

function ReadMovieCtrl($scope, $http, $routeParams) {
  $http.get('/api/movie/' + $routeParams.id).
    success(function(data) {
      $scope.movie = data.movie;
    });
}

function AddMovieCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitMovie = function () {
    $http.post('/api/movies', $scope.form).
      success(function(data) {
        $location.url('/');
      });
  };
}

function EditMovieCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/movie/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.movie;
    });

  $scope.editMovie = function () {
    $http.put('/api/movie/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readMovie/' + $routeParams.id);
      });
  };
}

function DeleteMovieCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/movie/' + $routeParams.id).
    success(function(data) {
      $scope.movie = data.movie;
    });

  $scope.deleteMovie = function () {
    $http.delete('/api/movie/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
