var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/question.js');

/* GET questions listing. */
router.get('/list', function(req, res, next) {
	Question.find({}, function (err, questions) {
		var context = {
			questions: questions.map(function(question) {
				return {
					id: question._id,
					title: question.title,
					courseId: question.courseId,
					contentId: question.contentId,
					topicId: question.topicId,
					prompt: question.prompt,
					answer: question.answer,
					alt: question.alt,
					topic: question.topic
				}
			})
		};
		res.render('questions', context);
	});
});

router.get('/:id', function (req, res) {
	var id = req.params.id;
	Question.findById(id, function (err, doc) {
		if (err) {
			return console.error(err);
		}
		res.render('detail', {question: doc});
	});
});

module.exports = router;
