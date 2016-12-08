var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/favorites', function(req, res) {
  var filePath ='./data.json';
  var data =[];
  if(fs.existsSync(filePath)) {
    data = fs.readFileSync(filePath);
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/my-favorites', function(req, res) {
  res.sendFile(__dirname + '/public/my-favorites.html');
});

app.post('/favorites', function(req, res) {
  if(!req.body.imdbID || !req.body.Title) {
    res.send([]);
    return;
  }
  var body =req.body;
  var filePath ='./data.json';
  var data ="[]";
    if(fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath);
    }
  data = JSON.parse(data);

  var i;
  for(i =0; i<data.length; i++) {
    if(data[i].imdbID ===body.imdbID) {
      res.send([]);
      return;
    }
  }
  data.push(body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen((process.env.PORT || 3000), function() {
  console.log("derping on port 3000");
});