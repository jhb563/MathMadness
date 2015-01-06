mathGameApp.controller('boardControl', function($rootScope, $scope, mathGameFactory) {
	$scope.numbers = [[1,2,3],[4,5,6],[7,8,9]];
	$scope.numberOfRows = [0,1,2];
	$scope.selectedNumbers = [];

	$scope.numberClicked = function(row,column,number) {
		var currentLength = $scope.selectedNumbers.length;
		alert($scope.selectedNumbers);
		if (currentLength == 0) {
			$scope.selectedNumbers.push(number);
		} else if (currentLength == 1) {
			$scope.selectedNumbers.push(number);
		} else if (currentLength == 2) {
			$scope.selectedNumbers.push(number);
			// Create a dictionary with the numbers to post
			var postDict = {"numbers" : $scope.selectedNumbers};
			mathGameFactory.checkNumbers(postDict);
			// Reset the chosen numbers
			$scope.selectedNumbers = [];
		} else {
			alert("Something went wrong...length is not good: " + length);		}
	};

});
