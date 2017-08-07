var request = require('request');
var express = require('express'),
    app     = express(),
    server = require('http').createServer(app);
var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/wines'

mongoose.connect(connectionString);

request('http://api.forkprofit.today/', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

