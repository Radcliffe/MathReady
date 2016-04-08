var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.passport) console.log(req.session.passport.user);
  res.render('index', { title: 'Math Ready' });
});

module.exports = router;
