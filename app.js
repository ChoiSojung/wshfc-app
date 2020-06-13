require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const logger = require('morgan');
require('./app_api/models/db');
require('./app_api/config/passport');

// import api route
const apiRouter = require('./app_api/routes/index');

// express app
const app = express();

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
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// use api routes
app.use('/api', apiRouter);
app.get('/(\/register)|/(\/about)|(\/project\/[a-z0-9]{24})/', function(req, res){
    res.sendFile(path.join(__dirname, 'app_public','build', 'index.html'));
});

// error handlers
// catch unauthorised errors
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
