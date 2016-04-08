var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/question.js');

/* Add question. */
router.post('/', function(req, res, next) {
	console.log(JSON.stringify(req.body));
	var question = {
		title: req.body.title,
		courseId: req.body.courseId,
		contentId: req.body.contentId,
		topicId: req.body.topicId,
		prompt: req.body.prompt,
		answer: req.body.answer,
		alt: [req.body.alt1, req.body.alt2, req.body.alt3],
	};
	Question.findOneAndUpdate(
		{title: question.title},
		question,
		{upsert: true, new: true},
		function (err) {
			if (err) {
				return console.log(err);
			} else {
				console.log('question saved');
			}
		}
	);

    res.redirect('/questions/list	');
	
});

module.exports = router;
