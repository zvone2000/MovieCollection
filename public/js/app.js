

// Declare app level module
angular.module('MovCollApp', ['ngRoute']).
  config(/*['$routeProvider', '$locationProvider', */function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'partials/list',
        controller: IndexCtrl
      }).
      when('/addMovie', {
        templateUrl: 'partials/addMovie',
        controller: AddMovieCtrl
      }).
      when('/readMovie/:id', {
        templateUrl: 'partials/readMovie',
        controller: ReadMovieCtrl
      }).
      when('/editMovie/:id', {
        templateUrl: 'partials/editMovie',
        controller: EditMovieCtrl
      }).
      when('/deleteMovie/:id', {
        templateUrl: 'partials/deleteMovie',
        controller: DeleteMovieCtrl
      }).
      when('/auth/google', {
		redirectTo: '/auth/google'
      }).
      when('/logout', {
		redirectTo: '/logout'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }/*]*/);
