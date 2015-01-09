var test = require('unit.js');
var logic = require('../client/js/logic.js');


var getDirection = logic.getDirection;

var coordinate1 = [2,2];
test.assert.equal(getDirection(coordinate1,[1,2]),1);
test.assert.equal(getDirection(coordinate1,[1,3]),2);
test.assert.equal(getDirection(coordinate1,[2,3]),3);
test.assert.equal(getDirection(coordinate1,[3,3]),4);
test.assert.equal(getDirection(coordinate1,[3,2]),5);
test.assert.equal(getDirection(coordinate1,[3,1]),6);
test.assert.equal(getDirection(coordinate1,[2,1]),7);
test.assert.equal(getDirection(coordinate1,[1,1]),8);
test.assert.equal(getDirection(coordinate1,[2,2]),0);
test.assert.equal(getDirection(coordinate1,[5,5]),0);
test.assert.equal(getDirection(coordinate1,[-1,-1]),0);


var thirdNumberPosition = logic.thirdNumberPosition;


test.assert.deepEqual(thirdNumberPosition(coordinate1,1),[0,2]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,2),[0,4]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,3),[2,4]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,4),[4,4]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,5),[4,2]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,6),[4,0]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,7),[2,0]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,8),[0,0]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,0),[-1,-1]);
test.assert.deepEqual(thirdNumberPosition(coordinate1,15),[-1,-1]);

var numbersMakeTarget = logic.numbersMakeTarget;

var list1 = [5,4,8];
test.assert(numbersMakeTarget(list1,28));
test.assert(numbersMakeTarget(list1,12));
test.assert(!numbersMakeTarget(list1,9));
test.assert(!numbersMakeTarget(list1,-7));
test.assert(!numbersMakeTarget(list1,17));
test.assert(!numbersMakeTarget(list1,1));

var list2 = [9,3,4];
test.assert(numbersMakeTarget(list2,31));
test.assert(numbersMakeTarget(list2,23));
test.assert(numbersMakeTarget(list2,7));
test.assert(numbersMakeTarget(list2,-1));
test.assert(!numbersMakeTarget(list2,17));
test.assert(!numbersMakeTarget(list2,1));