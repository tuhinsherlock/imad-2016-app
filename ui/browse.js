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
				var results = ' ';
				for (var i = 0; i < response.length; i++) {
					results += '<li><a href="/write-review?movie_id='+response[i].id+'">';
					results += '<img src="'+response[i].logo+'">';
					results += '&emsp;&emsp;&emsp;'+response[i].movie_name+' ( '+response[i].release_date+' )';
					results += '</a> </li>';
				}
				//results += '</ul>';
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
};
