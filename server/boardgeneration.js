// Goal:
// Insert an item into the database which has a list of lists representing
// the grid of numbers, and a list of target numbers
//
// Inputs: Size of the grid, range/distribution of possible numbers, difficulty,
//         number of targets
// For now, all distributions will draw uniformly at random from a continuous
// range of numbers. The difficulty will be either 0 or 1, with 0 being easy
// and 1 being hard. Easy draws from the most common targets, hard draws
// from the least common targets. Also target generation currently assumes
// basic operations structure (* or / followed by + or -)

var mongojs = require('mongojs');
var db = mongojs('MathMadness',['gameBoards']);

var randInt = function(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
};

var sortTargetsByNumberOfOccurences = function(dict) {
	var targets = [];
	for (var key in dict) {
		targets.push(key);
	}
	targets.sort(function(key1,key2){return dict[key1] - dict[key2]});
	return targets;
}

// Take three numbers, make all possible combinations for them, and update
// the dictionary to account for them.
var addOccurencesForNumbers = function(n1,n2,n3,targetsDict) {
	var numbersToAdd = [];
	numbersToAdd.push(n1 * n2 + n3);
	numbersToAdd.push(n1 * n2 - n3);
	if (n1 % n2 == 0) {
		numbersToAdd.push(n1 / n2 + n3);
		numbersToAdd.push(n1 / n2 - n3);
	}

	numbersToAdd.push(n3 * n2 + n1);
	numbersToAdd.push(n3 * n2 - n1);
	if (n3 % n2 == 0) {
		numbersToAdd.push(n3 / n2 + n1);
		numbersToAdd.push(n3 / n2 - n1);
	}

	for (number in numbersToAdd) {
		if (number in targetsDict) {
			var current = targetsDict[number];
			targetsDict[number] = current + 1;
		} else {
			targetsDict[number] = 1;
		}
	}
}

// Generate a dictionary mapping possible target numbers to the number of times
// they occur within the grid.
var generateTargetDictForGrid = function(numberGrid) {
	var targetOccurences = {};
	var rows = numberGrid.length;
	var cols = numberGrid.[0].length;
	for (var i = 0; i < rows; ++i) {

		for (var j = 0; j < cols; ++j) {
			var leftEnough = j < cols - 2;
			var highEnough = i < rows - 2;
			var lowEnough = i > 1;
			// Down/Up
			if (highEnough) {
				addOccurencesForNumbers(numberGrid[i][j],numberGrid[i+1][j],numberGrid[i+2][j],targetOccurences);
			}

			// Right/left
			if (leftEnough) {
				addOccurencesForNumbers(numberGrid[i][j],numberGrid[i+1][j],numberGrid[i+2][j],targetOccurences);
			}

			// Up-right/Down-left
			if (lowEnough && leftEnough) {
				addOccurencesForNumbers(numberGrid[i][j],numberGrid[i+1][j],numberGrid[i+2][j],targetOccurences);
			}

			// Down-right/Up-left
			if (highEnough && leftEnough) {
				addOccurencesForNumbers(numberGrid[i][j],numberGrid[i+1][j],numberGrid[i+2][j],targetOccurences);
			}
		}
	}

	return targetOccurences;
}

var generateGame = function(rows,columns,numberList,difficulty,numTargets) {
	var numbers = [];
	var targets = [];
	var numberOfChoices = numberList.length;

	for (var i = 0; i < rows; ++i) {
		var thisRow = [];
		for (var j = 0; j < columns; ++j) {
			var randIndex = randInt(0,numberOfChoices);
			thisRow.push(numberList[randIndex]);
		}

		numbers.push(thisRow);
	}


	var allTargets = generateTargetDictForGrid(numbers);
	var sortedTargets = sortTargetsByNumberOfOccurences(allTargets);

	if (difficulty == 0) {
		for (var i = numberOfChoices - 1; i > numberOfChoices - numTargets; --i) {
			targets.push(sortedTargets[i]);
		}
	} else {
		for (var i = 0; i < numTargets; ++i) {
			targets.push(sortedTargets[i]);
		}
	}
 
 	var finalDBObject = {
 		numbers: numbers,
 		targets: targets
 	};
 	
	db.insert(finalDBObject);
};