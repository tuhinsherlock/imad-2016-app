var query = window.location.search;
var review_id = query.split('=')[1];
console.log(review_id);

var movie_name = document.getElementById('movie_name');
var poster = document.getElementById('poster');
var year = document.getElementById('year_of_release');
var desc = document.getElementById('description');
var username= document.getElementById('username');
var date = document.getElementById('date');
var review = document.getElementById('review');
var director=document.getElementById('director');
var cast=document.getElementById('cast');

var response;

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
	if(request.readyState === XMLHttpRequest.DONE){
		console.log('DONE '+request.status);
		if(request.status===200){
			console.log('Received ----> '+this.responseText);
			response = JSON.parse(this.responseText);
			movie_name.innerHTML = response["moviename"];
			poster.src = response["posterpath"];
			year.innerHTML = response["release"];
			cast.innerHTML=response["cast"];
			director.innerHTML=response["director"];
			username.innerHTML = response["username"];
			date.innerHTML = response["date"];
			review.innerHTML = response["review"];	
			movie_name_title.innerHTML = response["moviename"];
		}
		else
		console.log("Error");
	}
};
console.log('Review.js Review id: ' +review_id);
request.open('GET','/get-review-details?id='+review_id);
request.send('{}');

