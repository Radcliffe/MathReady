var express = require('express');
var router = express.Router();
var courses = require('../courses.js');
var contentAreas = require('../content.js');
var topics = require('../topics.js');

router.get('/', function(req, res, next) {
	context = {
		courses: courses,
		contentAreas: contentAreas,
		topics: topics
	};
	res.render('new', context);
});

module.exports = router;
