var button = document.getElementById('search');
var search_box = document.getElementById('movie_name');
var livesearch = document.getElementById('livesearch');

search_box.onkeyup = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			console.log('DONE '+request.status);
			if(request.status===200){
				console.log('Received ----> '+this.responseText);
				response = JSON.parse(this.responseText);
				var results = '<ul>';
				for (var i = 0; i < response.length; i++) {
					results += '<li>';
					results += '<img src="'+response[i].poster_path+'">';
					results += response[i].movie_name+ '<a href="/write-review?movie_id='+response[i].id+'">';
					results += ' select </a> </li>';
				}
				results += '</ul>';
				livesearch.innerHTML = results;
			}
			else
			console.log("Error");
		}
	};
	var search_term = search_box.value;
	console.log('Search term: ' + search_term);
	request.open('GET','/get-search-results?term='+search_term);
	request.send('{}');
}
