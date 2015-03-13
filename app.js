
/**
 * Module dependencies.
 */

module.exports = function (db) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var expressValidator = require('express-validator');
  var MongoStore = require('connect-mongo')(express);
  var passport = require('./auth');
  var routes = require('./routes');
  var api = require('./routes/api');
  var path = require('path'); 
  var app = express();

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'keyboard cat',
    store: new MongoStore({
      mongoose_connection: db
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(express.methodOverride());
  app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Movie Tracker');
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // Routes
  
  // GET /auth/google
  // Use passport.authenticate() as route middleware to authenticate the
  // request. The first step in Google authentication will involve
  // redirecting the user to google.com. After authorization, Google
  // will redirect the user back to this application at /auth/google/callback
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

  // GET /auth/google/callback
  // Use passport.authenticate() as route middleware to authenticate the
  // request. If authentication fails, the user will be redirected back to the
  // login page. Otherwise, the primary route function function will be called,
  // which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/'); 
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// Simple route middleware to ensure user is authenticated.
  // Use this route middleware on any resource that needs to be protected. If
  // the request is authenticated (typically via a persistent login session),
  // the request will proceed. Otherwise, the user will be redirected to the
  // login page.
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
      res.redirect('/');
  }


  app.get('/', routes.index);
  app.get('/partials/:name', routes.partials);

  // JSON API

  app.get('/api/movies', api.movies);
  app.post('/api/movies', api.addMovie);

  app.get('/api/movie/:id', api.movie);
  app.put('/api/movie/:id', api.editMovie);
  app.delete('/api/movie/:id', api.deleteMovie);

  // redirect all others to the index (HTML5 history)
  //app.get('*', routes.index);

  return app;
}