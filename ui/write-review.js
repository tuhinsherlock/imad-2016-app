
var movie_name = document.getElementById('movie_name');
var poster = document.getElementById('poster');
var year = document.getElementById('year_of_release');
var desc = document.getElementById('description');
var cast = document.getElementById('cast');
var dir = document.getElementById('director');



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
var movieid = qp['movieid'];
console.log(movieid);

var response;

var request1 = new XMLHttpRequest();
request1.onreadystatechange = function(){
	if(request1.readyState === XMLHttpRequest.DONE){
		console.log('DONE '+request1.status);
		if(request1.status===200){
			console.log('Received ----> '+this.responseText);
			var response = JSON.parse(this.responseText);
			movie_name.innerHTML = response["name"];
			poster.src = response["posterpath"];
			year.innerHTML = response["release"];
			desc.innerHTML = response["overview"];
			cast.innerHTML=response["cast"];
			dir.innerHTML = response["director"];
		}
		else
		console.log("Error");
	}
};

request1.open('GET','/get-movie-details?movieid='+movieid);
request1.send('{}');


var submit = document.getElementById('submit_btn');
submit.onclick = function(){
	
	var request = new XMLHttpRequest();


	request.onreadystatechange = function(){

		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				response = JSON.parse(this.responseText);
				console.log('Review Submitted');
				window.location.href=response.redirect;
			}
		}
	};

	var review = document.getElementById('review').value;
	console.log('POST ---> '+review);
	request.open('POST','/submit-review',true);
	request.setRequestHeader('Content-Type', 'application/json');
	var reviewObj = {
						reviewcon: review,
	 				 	movieid: movieid
	 				};
	request.send(JSON.stringify(reviewObj));



};

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
            } else {
                userlink.href = '/loginpage?wr='+movieid;
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
