var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, function (err, users) {
		var context = {
			users: users.map(function(user) {
				return {
					name: user.name,
					email: user.email,
					role: user.role
				}
			})
		};
		res.render('users', context);
	})
});

module.exports = router;
