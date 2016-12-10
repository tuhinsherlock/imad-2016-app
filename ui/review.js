
var htmltitle = document.getElementById('review_title')
var movie_name = document.getElementById('movie_name');
var poster = document.getElementById('poster');
var year = document.getElementById('year_of_release');
var desc = document.getElementById('description');
var username= document.getElementById('username');
var date = document.getElementById('date');
var review = document.getElementById('review');
var director=document.getElementById('director');
var cast=document.getElementById('cast');

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
qp = getqueryparams();
var reviewid = qp['id'];
console.log(reviewid);

var response;

function loadstuff(uname){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			console.log('DONE '+request.status);
			if(request.status===200){
				console.log('Received ----> '+this.responseText);
				response = JSON.parse(this.responseText);
				movie_name.innerHTML = '<a href="/movie?id='+response.movieid+'">'+response["moviename"]+'</a>';
				poster.src = response["posterpath"];
				year.innerHTML = response["release"];
				cast.innerHTML=response["cast"];
				director.innerHTML=response["director"];
				username.innerHTML = '<a href="/users/'+response["username"]+'">'+response["username"]+'</a>';
				date.innerHTML = response["date"];
				review.innerHTML = response["review"];

				htmltitle.innerHTML = response.username+' on '+response.moviename+' | CineHub';

				if(uname==response.username)
					writerevbutton.value = 'Write another review';
				
				writerevbutton.onclick = function(){
					console.log('Setting Link');
					if(uname)
						window.location.href = '/write-review?movieid='+response.movieid;
					else
						window.location.href = '/loginpage?wr='+response.movieid;
				};
			}
			else
				console.log("Error");
		}
	};
	console.log('Review.js Review id: ' +reviewid);
	request.open('GET','/get-review-details?id='+reviewid);
	request.send('{}');
}

var userlink = document.getElementById('userlink');
var tabbar_username = document.getElementById('tabbar_username');
var logout = document.getElementById('logout');

console.log('ready');
function loadLogin () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {

            if (request.status === 200) {
            	userlink.href = '/users/'+this.responseText;
            	tabbar_username.innerHTML = this.responseText;
            	logout.innerHTML = '<li> <a href="/logout">LOGOUT</a></li>';
            	loadstuff(this.responseText);
            } else {
                userlink.href = '/loginpage?rv='+reviewid;
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
                loadstuff('');
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();