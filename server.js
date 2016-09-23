var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var films = {
title: 'Batmans Fav Films',
heading: 'BATMANS FAVOURITE FILMS',
location : 'Wayne Mansion, Gotham City',
content: `
<p> 
            <ul>
                <li> The Shawshank Redemption</li>
                <li> Forrest Gump</li>
                <li> The Godfather trilogy</li>
                <li> The Batman trilogy</li>
                <li> Memento</li>
                <li> The Prestige</li>
                <li> Fight Club</li>
                <li> Se7en</li>
            
            </ul>
            </p>
'};

var






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/films', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'films.html'));
})

app.get('/serials', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'serials.html'));
})

app.get('/article-three', function (req, res) {
  res.send("Article Three requested and will be served here");
})


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/Batman.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Batman.gif'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
