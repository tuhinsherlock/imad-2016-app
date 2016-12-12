
var button     = document.getElementById('search');
var searchbox  = document.getElementById('movie_name');
var livesearch = document.getElementById('livesearch');

var keyups = 0;
searchbox.onkeyup = function(){
	keyups++;
    var searchterm = searchbox.value;
    if(searchterm.length==0){
        livesearch.innerHTML = '';
        return;
    }

	var keyupscopy = keyups;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			console.log('DONE '+request.status);
			if(keyups!=keyupscopy)
				return;
			if(request.status===200){
				console.log('Received ----> '+this.responseText);
				var response = JSON.parse(this.responseText);
				var results = '';
				for (var i = 0; i < response.length; i++) {
					results += '<li><a href="/movie?id='+response[i].id+'">';
					results += '<img src="'+response[i].logo+'">';
					results += '&emsp;&emsp;'+response[i].name+' ( '+response[i].release+' )';
					results += '</a> </li>';
				}
                if(!results)
                    results = '<li>No results found :(</li>';
				livesearch.innerHTML = results;
			}
			else
			 console.log("Error");
		}
	};
	console.log('Search term: ' + searchterm);
	request.open('GET','/get-search-results?term='+searchterm);
	request.send('{}');
};


var tabbar_username = document.getElementById('tabbar_username');
var userlink        = document.getElementById('userlink');
var logout          = document.getElementById('logout');

function loadLogin () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                userlink.href = '/users/'+this.responseText;
                tabbar_username.innerHTML = this.responseText;
                logout.innerHTML = '<li><a href="/logout">LOGOUT</a></li>';
            } else {
                userlink.href = '/loginpage?b=0';
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();