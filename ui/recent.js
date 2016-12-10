var rec_list = document.getElementById('list_reviews');

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

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
	if(request.readyState === XMLHttpRequest.DONE){
		console.log('DONE '+request.status);
		if(request.status===200){
			console.log('Received ----> '+this.responseText);
			response = JSON.parse(this.responseText);
			var results = ' ';
			for (var i = 0; i < response.length; i++) {
				results += '<li><a href="/review?id='+response[i].reviewid+'"> <div class="col-sm-1"> <img src = "'+response[i].logo+'"></div>';
				results += '<div class="col-sm-11">';
				results += response[i].username+' wrote a review on '+response[i].moviename;
				results += '<br>on&nbsp;'+response[i].date+'</div></a></li>';
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

            } else {
                userlink.href = '/loginpage?rc=0';
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
               
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();