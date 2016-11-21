var express = require('express');
var morgan = require('morgan');
var path = require('path');
var http = require("https");

var app = express();
app.use(morgan('combined'));

var api_key = "9c6f4edf8b2c52678bf8e0885ff611d9";

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function getSearchRequestOptions(movie_name){
    var options = {
      "method": "GET",
      "hostname": "api.themoviedb.org",
      "port": null,
      "path": "/3/search/movie?query="+movie_name+"&language=en-US&api_key="+api_key,
      "headers": {}
    };
    return options;
}

function getMovieDetailsOptions(movie_id){
    var options = {
      "method": "GET",
      "hostname": "api.themoviedb.org",
      "port": null,
      "path": "/3/movie/"+movie_id+"?api_key="+api_key,
      "headers": {}
    };
    return options;
}

app.get('/search-movie', function(req, res){
	var name = req.query.movie_name;
	name = name.replace(/ /g, "%20");
	console.log("search-movie name = "+name);

    var req1 = http.request(getSearchRequestOptions(name), function(res1){
    
        var chunks = [];
        
        res1.on("data", function(chunk){
          chunks.push(chunk);
        });
        
        res1.on("end", function(){
            var body = Buffer.concat(chunks);
	    body = JSON.parse(body);
            console.log(body.toString());
          
            if(res1.statusCode==200){
                var movie_id = body["results"][0]["id"];
                console.log("search result id = "+movie_id);
                res.redirect("/write-review?movie_id="+movie_id);
           }
            else{
                console.log("ERROR status "+res1.statusCode);
                res.send("ERROR status "+res1.statusCode);
            }
        });
    });

    req1.write("{}");
    req1.end();
});

app.get('/write-review', function(req, res){
    var id = req.query.movie_id;
    id = 6352;
    console.log("write-review id="+id);
    
    var req1 = http.request(getMovieDetailsOptions(id), function(res1){
        var chunks = [];
        
        res1.on("data", function(chunk){
            chunks.push(chunk);
        });
        
        res1.on("end", function(){
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            
            if(res1.statusCode==200){
                res.send("Send an HTML template with filled movie details");
            }
            else{
                console.log("ERROR status "+res1.statusCode);
                res.send("ERROR status "+res1.statusCode);
            }
        });
    });
    req1.write("{}");
    req1.end();
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
  console.log("IMAD course app listening on port "+port);
});
