
var movie_name = document.getElementById('movie_name').value;
var button = document.getElementById('search');
button.onclick = function() {

var request1 = new XMLHttpRequest();

request1.onreadystatechange = function(){

	if(request1.readyState === XMLHttpRequest.DONE){
		console.log('DONE '+request1.status);
		if(request1.status===200){
			console.log("Success")
		}
		else
		console.log("Error");
	}

request1.open('GET','/search-movie?movie_name='+movie_name);
request1.send('{}');

};

}