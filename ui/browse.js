var button = document.getElementById('search');
var search_box = document.getElementById('movie_name');
var livesearch = document.getElementById('livesearch');

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

var keyups = 0;
search_box.onkeyup = function(){
	keyups++;
    var search_term = search_box.value;
    if(search_term.length==0){
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
				response = JSON.parse(this.responseText);
				var results = ' ';
				for (var i = 0; i < response.length; i++) {
					results += '<li><a href="/movie?id='+response[i].id+'">';
					results += '<img src="'+response[i].logo+'">';
					results += '&emsp;&emsp;&emsp;'+response[i].name+' ( '+response[i].release+' )';
					results += '</a> </li>';
				}
				//results += '</ul>';
				livesearch.innerHTML = results;
			}
			else
			console.log("Error");
		}
	};
	console.log('Search term: ' + search_term);
	request.open('GET','/get-search-results?term='+search_term);
	request.send('{}');
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
                userlink.href = '/loginpage?b=0';
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();