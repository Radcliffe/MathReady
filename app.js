var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var credentials = require('./credentials.js');
var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var questions = require('./routes/questions.js');
var addquestion = require('./routes/addquestion.js');
var newquestion = require('./routes/newquestion.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connect to database
var mongoose = require('mongoose');
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};
switch(app.get('env')){
  case 'development':
    mongoose.connect(credentials.mongo.development.connectionString, opts);
    break;
  case 'production':
    mongoose.connect(credentials.mongo.production.connectionString, opts);
    break;
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}

// Models
var User = require('./models/user.js');
var Question = require('./models/question.js')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}));

app.use(express.static(path.join(__dirname, 'public')));

function adminOnly(req, res, next) {
  if (req.session.role === 'admin') {
    return next();
  }
  res.redirect(303, '/unauthorized');
}

app.use('/', routes);
app.use('/users', adminOnly, users);
app.use('/questions', questions);
app.use('/addquestion', addquestion);
app.use('/new', newquestion);

// authorization
var auth = require('./lib/auth.js')(app, {
    // baseUrl is optional; it will default to localhost if you omit it;
    // it can be helpful to set this if you're not working on
    // your local machine. For example, if you were using a staging server,
    // you might set the BASE_URL environment variable to
    // https://staging.meadowlark.com
  baseUrl: process.env.BASE_URL,
  providers: credentials.authProviders,
  successRedirect: '/account',
  failureRedirect: '/unauthorized',

});
// auth.init() links in Passport middleware:
auth.init();
// now we can specify our auth routes:
auth.registerRoutes();

app.get('/account', function(req, res) {
  if(!req.user) {
    console.log('No account user');
    return res.redirect(303, '/unauthorized');
  }
  req.session.name = req.user.name;
  req.session.role = req.user.role;
  res.render('account', { username: req.user.name });
});

// we also need an 'unauthorized' page
app.get('/unauthorized', function(req, res) {
  res.status(403).render('unauthorized');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  console.log('Started in development mode');
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
