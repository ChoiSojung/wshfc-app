require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var logger = require('morgan');
require('./app_api/models/db');
require('./app_api/config/passport');

// import api routes
//var indexRouter = require('./app_server/routes/index');
var apiRouter = require('./app_api/routes/index');

// express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'pug');

// other middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

// initialize passport and add to middleware
app.use(passport.initialize());

// cors
app.use('/api', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// use api routes
app.use('/api', apiRouter);
app.get('/(\/about)|(\/project\/[a-z0-9]{24})/', function(req, res, next){
    res.sendFile(path.join(__dirname, 'app_public','build', 'index.html'));
});

// error handlers
// catch unathorised errors
app.use((err, req, res, next)=>{
    if(err.name === 'UnauthorizedError'){
        res
            .status(401)
            .json({"message": err.name + ": " + err.message});
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export app
module.exports = app;
