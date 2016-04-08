var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
	title: String,
	courseId: String,
	contentId: String,
	topicId: String,
	prompt: String,
	answer: String,
	alt: [String],
});

var Question = mongoose.model('Question', questionSchema);

Question.find(function(err, questions) {
	if (err) return console.error(err);
	if (questions.length) return;
	
	new Question({
		title: 'add-decimals-1',
		prompt: '2.75 + 0.003 + 0.158 =',
		answer: '2.911',
		courseId: '1',
		contentId: '2',
		topicId: '10',
		alt: ['0.436', '2.938', '4.36'],
		topic: 'add-subtract-decimals'
	}).save();

	new Question({
		title: 'multiply-decimals-1',
		prompt: '7.86 × 4.6 =',
		answer: '36.156',
		courseId: '1',
		contentId: '2',
		topicId: '11',
		alt: ['36.216', '351.56', '361.56'],
		topic: 'multiply-decimals'
	}).save();
});

module.exports = Question;