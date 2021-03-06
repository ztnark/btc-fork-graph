var request = require('request');
var path = require('path');
var express = require('express'),
    app     = express(),
    server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/entries', function(req, res){
  //return all the entries
  request('http://api.forkprofit.today/', function (error, response, body) {  
    var json = JSON.parse(body);
    res.send(json);
  });
});

server.listen(3000, function(){
  console.log("listening on port 3000");
})

