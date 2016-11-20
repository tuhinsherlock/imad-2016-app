var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var location = data.location;
    var content = data.content;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.themoviedb.org",
  "port": null,
  "path": "/3/search/movie?language=en-US&api_key=9c6f4edf8b2c52678bf8e0885ff611d9",
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

app.get('/:articleName', function (req, res) {
var articleName = req.params.articleName;
  res.send(createTemplate(stuff[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/Batman.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Batman.gif'));
});

app.get('/ui/shawshank.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'shawshank.jpg'));
});

app.get('/ui/batlogo.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'batlogo.gif'));
});

app.get('/ui/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css'));
});

app.get('/ui/Sherlock.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Sherlock.jpg'));
});

app.get('/ui/FightClub.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'FightClub.jpg'));
});

app.get('/ui/Harry.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Harry.jpg'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
