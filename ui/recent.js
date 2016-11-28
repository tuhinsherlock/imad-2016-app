var rec_list = document.getElementById('recent_list');

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
	if(request.readyState === XMLHttpRequest.DONE){
		console.log('DONE '+request.status);
		if(request.status===200){
			console.log('Received ----> '+this.responseText);
			response = JSON.parse(this.responseText);
			var results = ' ';
			for (var i = 0; i < response.length; i++) {
				results += '<li><a href="/review?id='+response[i].reviewid+'">';
				results += response[i].username+' wrote a review on '+response[i].moviename;
				results += '</a> '+response[i].date+'</li>';
			}
			//results += '</ul>';
			rec_list.innerHTML = results;
		}
		else
			console.log("Error!");
	}
};
console.log('Getting recent...');
request.open('GET','/get-recent');
request.send('{}');