mathGameApp.factory('mathGameFactory', function($http) {
	var urlBase = '/';
	var _gameService = {};

	_gameService.checkNumbers = function(numbers) {
		return $http.post(urlBase + "checkNumbers",numbers);
	}

	return _gameService;
});
