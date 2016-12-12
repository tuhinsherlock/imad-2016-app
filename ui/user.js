
var htmltitle    = document.getElementById('htmltitle')
var totalreviews = document.getElementById('totalreviews');
var joined       = document.getElementById('joined');
var name1        = document.getElementById('name1');
var username     = document.getElementById('username');
var reviews      = document.getElementById('reviews');
var username2    = document.getElementById('username2');

var wlha = window.location.href.toString().split('/');
var usernameurl = wlha[wlha.length-1];

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
	if(request.readyState === XMLHttpRequest.DONE){
		console.log('DONE '+request.status);

		if(request.status===200){
			console.log('Received ----> '+this.responseText);
			var response = JSON.parse(this.responseText);

			htmltitle.innerHTML    = usernameurl + ' | Cinehub';
			username.innerHTML     = usernameurl;
			username2.innerHTML    = usernameurl;
			name1.innerHTML        = response.name;
			joined.innerHTML       = response.datejoined;
			totalreviews.innerHTML = response.totalreviews;

			var userreviews = response.userreviews;
			var results = ' ';
			for (var i = 0; i < userreviews.length; i++) {
				results += '<li><a href="/review?id='+userreviews[i].contentid+'">';
				results += '<div class="col-sm-1"><img src="'+userreviews[i].logo+'"></div>';
				results += '<div class="col-sm-11">'+userreviews[i].moviename;
				results += '<br> Written on: '+userreviews[i].date;
				results += '</div></a> </li>';
			}
			reviews.innerHTML = results;
		}
		else
			console.log("Error :(");
	}
};

console.log('user.js username: ' +usernameurl);
request.open('GET','/get-user-details?username='+usernameurl);
request.send('{}');

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
                userlink.href = '/loginpage?u='+usernameurl;
                tabbar_username.innerHTML = 'LOG IN or SIGN UP';
            }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();