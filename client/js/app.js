mathGameApp = angular.module('mathGameApp', ['ngRoute'])
  .config(function($routeProvider) {
	  $routeProvider
	    .when('/', {
		    templateUrl: '/partials/board.html',
	    	    controller: 'boardControl'
	    }).otherwise({
		    redirectTo: '/'
	    });
  });
