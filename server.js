var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var stuff= {
'films' : {
title: 'Batmans Fav Films',
heading: 'BATMANS FAVOURITE FILMS',
location : 'Wayne Mansion, Gotham City hello fuck',
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
`
},
'serials' : {
title: 'Batmans Fav Serials',
heading: 'BATMANS FAVOURITE SERIALS',
location : 'Arkham Asylum, Gotham City',
content: `
 <p> 
        <ul>
            <li> Mr. Robot</li>
            <li> Game of Thrones</li>
            <li> Friends</li>
            <li> Seinfeld</li>
            <li> House of Cards</li>
            <li> Narcos</li>
            <li> Sherlock</li>
            <li> Stranger Things</li>
            
        </ul>
        </p>
        `
}
};

function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var location = data.location;
    var content = data.content;
    
var htmlTemplate = `
<html>
    <head>
      <title>${title}</title>
      <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class = "container">
            <div>
                <a href="/"> Home</a>
            </div>
            <div>
                ${location}
            </div>
            <div class = "header">
            <h1> ${heading} </h1>
            </div>
            <div class = "list">
            ${content}
            </div> 
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

var names=[];

app.get('/submit-name/', function(req,res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
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
