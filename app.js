var request = require('request');
var cron = require('cron');
var path = require('path');
var express = require('express'),
    app     = express(),
    server = require('http').createServer(app);

require('./db.js');

app.use(express.static(path.join(__dirname, 'public')));

var Coin = require('./coin.js');

var cronJob = cron.job("*/5 * * * *", function(){
    request('http://api.forkprofit.today/', function (error, response, body) {
	console.log( body); // Print the HTML for the Google homepage.
	var response = JSON.parse(body);
	var bch = new Coin(response["BCH"]);
	bch.name = "BCH";
	bch.save();
	var btc = new Coin(response["BTC"]);
	btc.name = "BTC";
	btc.save();    	
    });
}); 

app.get('/entries', function(request, response){
  //return all the entries
  var res = {};
  Coin.find({name: "BCH"},function(err, bchs){
    res["BCH"] = bchs;
    Coin.find({name: "BTC"},function(err, btcs){
        res["BTC"] = btcs;
        response.json(res);
    })
  });
});

server.listen(3100, function(){
  console.log("listening on port 3000");
})

cronJob.start();

