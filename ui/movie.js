
var htmltitle = document.getElementById('movie_title')
var moviename = document.getElementById('movie_name');
var poster = document.getElementById('poster');
var year = document.getElementById('year_of_release');
var desc = document.getElementById('description');
var director=document.getElementById('director');
var cast=document.getElementById('cast');

var rec_list = document.getElementById('list_reviews');

var writerevbutton = document.getElementById('writerevbutton');


function getqueryparams(){
	var q = {}, piece;
	var wlh = window.location.href.toString();
	var pairs = wlh.slice(wlh.indexOf('?')+1).split('&');
	for(var i=0; i<pairs.length; i++){
		pair = pairs[i].split('=');
		q[pair[0]] = pair[1];
	}
	return q;
}
var qp = getqueryparams();
var movieid = qp['id'];

var response;
function loadstuff(uname){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			console.log('DONE '+request.status);
			if(request.status===200){
				console.log('Received ----> '+this.responseText);
				response = JSON.parse(this.responseText);

				htmltitle.innerHTML = response.name+' | CineHub';

				moviename.innerHTML = response["name"];
				poster.src = response["posterpath"];
				year.innerHTML = response["release"];
				cast.innerHTML=response["cast"];
				director.innerHTML=response["director"];
				desc.innerHTML = response.overview;

				var revs = response.reviews;
				var results = '';
				for(var i=0; i<revs.length; i++){
					results += '<li><a href="/review?id='+revs[i].reviewid+'">';
					results += '<div class="col-sm-11">';
					results += revs[i].username+' wrote a review on '+revs[i].date.split('T')[0]+'</div></a></li>';
				}
				rec_list.innerHTML = results;
				
				writerevbutton.onclick = function(){
					console.log('Setting Link');
					if(uname)
						window.location.href = '/write-review?movieid='+movieid;
					else
						window.location.href = '/loginpage?m='+movieid;
				};
			}
			else
				console.log("Error");
		}
	};
	console.log('movie.js movieid: ' +movieid);
	request.open('GET','/get-reviews-by-movie?movieid='+movieid);
	request.send('{}');
}

var userlink = document.getElementById('userlink');
var tabbar_username = document.getElementById('tabbar_username');

console.log('ready');
function loadLogin () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {

            if (request.status === 200) {
            	userlink.href = '/users/'+this.responseText;
            	tabbar_username.innerHTML = this.responseText;
            	loadstuff(this.responseText);
            } else {
                userlink.href = '/loginpage?m='+movieid;
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
                loadstuff('');
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();