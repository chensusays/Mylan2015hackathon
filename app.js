var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var imprint = require('./routes/imprint');
var report = require('./routes/report');
var views = require('./routes/views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pillbox', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});


var app = express();
//parsing bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/imprint', imprint);
app.use('/report', report);
app.use('/views', views);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({"status":"request invalid"});
});

module.exports = app;
