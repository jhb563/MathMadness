(function() {
	'use strict';
	var express = require('express');
	var router = express.Router();
	var mongojs = require('mongojs');
	var db = mongojs('MathMadness', ['testGames']);


	router.get('/', function(req,res) {
		res.render('index.html');
	});

	router.get('/testGame', function(req,res) {
		db.testGames.findOne(function(err,data) {
			res.json(data);
		});
	});

	module.exports = router;

}());
