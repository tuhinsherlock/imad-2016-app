var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles= {

'article-one' = {
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
`
},
'article-two' = {
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

app.get('/:articleName', function (req, res) {
var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
})

app.get('/serials', function (req, res) {
  res.send(createTemplate());
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
