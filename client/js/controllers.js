mathGameApp.controller('boardControl', function($rootScope, $scope, mathGameFactory) {
	$scope.numbers = [[1,2,3],[4,5,6],[7,8,9]];
	$scope.numberOfRows = [0,1,2];
	$scope.targets = [5,26,65];
	$scope.targetIndex = 0;
	$scope.targetNumber = $scope.targets[0];
	$scope.selectedNumbers = [];
	$scope.selectedPosition = [];

	$scope.numberClicked = function(row,column,number) {
		var currentLength = $scope.selectedNumbers.length;
		
		if (currentLength == 0) {
			// No numbers are currently selected, so just make this number the first
			// and make its position the selected position
			$scope.selectedNumbers.push(number);
			$scope.selectedPosition = [row,column];
		} else if (currentLength == 1) {
			// ##########################################################################
			var directionToNewSquare = mathGameFactory.getDirection($scope.selectedPosition,[row,column]);
			// ##########################################################################


			// Look at the position selected. If it is adjacent,
			// we can now figure out what three numbers are used.
			if (directionToNewSquare > 0) {
				// Get the third number in the proper direction
				// ##########################################################################
				var thirdNumberPos = mathGameFactory.thirdNumberFromPositionInDirection($scope.selectedPosition,directionToNewSquare);
				var yGood = thirdNumberPos[1] >= 0 && thirdNumberPos[1] < $scope.numbers.length;
				var xGood = thirdNumberPos[0] >= 0 && thirdNumberPos[0] < $scope.numbers[0].length;
				// ##########################################################################

				
				if (yGood && xGood) {
					// If we can get three numbers...
					// Determine what these are and see if they can
					// make the target number
					var thirdNumber = $scope.numbers[thirdNumberPos[0]][thirdNumberPos[1]];
					$scope.selectedNumbers.push(number);
					$scope.selectedNumbers.push(thirdNumber);

					// ##########################################################################
					var solution = mathGameFactory.numbersMakeTarget($scope.selectedNumbers,$scope.targetNumber);
					// ##########################################################################

					if (solution) {
						$scope.targetIndex++;
						$scope.targetNumber = $scope.targets[$scope.targetIndex];
					} else {
						// Indicate wrong answer
					}

					$scope.selectedNumbers = [];
					$scope.selectedPosition = [];

				} else {
					// If we don't get three numbers, reset everything.
					$scope.selectedNumbers = [];
					$scope.selectedPosition = [];
				}
				

				
			} else {
				// If the square is not adjacent to the previous, set
				// this as the first square and number
				$scope.selectedNumbers = [number];
				$scope.selectedPosition = [row,column];
			}

			

			
			
		} else {
			alert("Something went wrong...length is not good: " + length);		}
	};

});
