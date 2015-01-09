(function() {
	'use strict';
	var logic = {};

	logic.getDirection = function(coordinate1,coordinate2) {
		var x1 = coordinate1[1];
		var y1 = coordinate1[0];
		var x2 = coordinate2[1];
		var y2 = coordinate2[0];

		if (x1 == x2) {
			if (y2 == y1 - 1) {
				// North
				return 1;
			} else if (y2 == y1 + 1) {
				// South
				return 5;
			} else {
				// Not neighbors
				return 0;
			}
		} else if (x2 == x1 + 1) {
			// Some kind of east
			if (y2 == y1 - 1) {
				// Northeast
				return 2;
			} else if (y2 == y1) {
				// East
				return 3;
			} else if (y2 == y1 + 1) {
				// Southeast
				return 4;
			} else {
				return 0;
			}
		} else if (x2 == x1 - 1) {
			// Some kind of west
			if (y2 == y1 - 1) {
				// Northwest
				return 8;
			} else if (y2 == y1) {
				// West
				return 7;
			} else if (y2 == y1 + 1) {
				// Southwest
				return 6;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	};

	logic.thirdNumberPosition = function(coordinate,direction) {
		// How much we have to change the coordinate by
		var dx = 0;
		var dy = 0;
		switch(direction) {
			case 1:
				dy = -1;
				break;
			case 2:
				dx = 1;
				dy = -1;
				break;
			case 3:
				dx = 1;
				break;
			case 4:
				dx = 1;
				dy = 1;
				break;
			case 5:
				dy = 1;
				break;
			case 6:
				dy = 1;
				dx = -1;
				break;
			case 7:
				dx = -1;
				break;
			case 8:
				dx = -1;
				dy = -1;
				break;
			default:
				return [-1,-1];
		}

		var newX = coordinate[0] + 2*dy;
		var newY = coordinate[1] + 2*dx;
		return [newX, newY];
	};

	logic.numbersMakeTarget = function(numberList,targetNumber) {
		var n1 = numberList[0];
		var n2 = numberList[1];
		var n3 = numberList[2];

		if (n1 * n2 + n3 == targetNumber) {
			return true;
		} else if (n1 * n2 - n3 == targetNumber) {
			return true;
		} else if (n1 % n2 !== 0) {
			// If we can't use exact division, then the answer is false
			return false;
		} else if (n1 / n2 + n3 == targetNumber) {
			return true;
		} else if (n1 / n2 - n3 == targetNumber) {
			return true;
		} else {
			return false;
		}
	};
	module.exports = logic;
}());