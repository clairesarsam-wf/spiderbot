var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var temporal = require("temporal");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var five = require("johnny-five"),
board = new five.Board();

var led;
var eyes;
var temporalEyes;
var legs;

board.on('ready', function() {
  led = new five.Pin(13);
  eyes = new five.Pin(3);
  legs = new five.Pin(5);

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(require('node-compass')({mode: 'expanded'}));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', routes);
  app.use('/users', users);

  var led;

  app.get('/blink', function(req, res){
    led.strobe();
    res.send('Blinking!');
  });

  app.get('/stopblink', function(req, res){
    led.stop().off();
    res.send('Stop blinking!');
  });

  app.get('/eyeson', function(req, res){
    temporal.loop(100, function(loop) {
      temporalEyes = this;
      eyes[loop.called % 2 === 0 ? "high" : "low"]();
    });
    res.send('Strobe eyes!');
  });

  app.get('/eyesoff', function(req, res){
    temporalEyes.stop();
    eyes.low();
    res.send('Stop eyes!');
  });

  app.get('/forward', function(req, res){
    legs.high();
    res.send('Forward!');
  });

  app.get('/stop', function(req, res){
    legs.low();
    res.send('Stop!');
  });

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
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

});
module.exports = app;
