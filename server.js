var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('https');

var pgdbconfig = {
    user: 'tuhinsherlock',
    database: 'tuhinsherlock',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-tuhinsherlock-17607'
};

var pool = new Pool(pgdbconfig);

console.log("Connected to DB");

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

var tmdbconfig;

app.use(bodyParser.json());

var api_key = '9c6f4edf8b2c52678bf8e0885ff611d9';

var tmdbconfigreq = http.request({
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": "/3/tmdbconfiguration?api_key="+api_key,
    "headers": {} }, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    body = JSON.parse(body);
    tmdbconfig = body;
    console.log('tmdbconfig ---> '+JSON.stringify(body));
  });
});

tmdbconfigreq.write("{}");
tmdbconfigreq.end();

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

app.post('/submit-review', function(req,res) {
  console.log(req.body);
  var body = req.body;
  var reviewcon = body.reviewcon;
  console.log(reviewcon);
});



app.get('/get-movie-details', function(req, res){

    var id = req.query.movie_id;

    console.log("get-movie-details id="+id);
    
    var req1 = http.request(getMovieDetailsOptions(id), function(res1){
        var chunks = [];
        
        res1.on("data", function(chunk){
            chunks.push(chunk);
        });
        
        res1.on("end", function(){
            var body = Buffer.concat(chunks);
            body = JSON.parse(body);
            console.log(JSON.stringify(body));
            
            if(res1.statusCode==200){
                var movie_details = {
                    movie_name : body.title,
                    poster_path : tmdbconfig['images']['base_url']+tmdbconfig['images']['poster_sizes'][0]+body.poster_path,
                    release_date : body.release_date,
                    overview : body.overview
                }
                console.log('Returning ----> '+JSON.stringify(movie_details));
                res.send(JSON.stringify(movie_details));
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

function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'hello-darkness-my-old-friend');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});

app.get('/browse', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'browse.html'));
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/write-review', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'write-review.html'));
});

app.get('/write-review.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'write-review.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/Batman.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Batman.gif'));
});


app.get('/ui/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log("IMAD course app listening on port "+port);
});
