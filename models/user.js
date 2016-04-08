var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	authId: String,
	role: String
});

var User = mongoose.model('User', userSchema);

User.find(function(err, users) {
	if (err) return console.error(err);
	if (users.length == 0) {
		new User({
			name: 'David Radcliffe',
			email: 'dradcliffe@gmail.com',
			authId: 'facebook:10153626474987734',
			role: 'admin'
		}).save();
	}
});

module.exports = User;