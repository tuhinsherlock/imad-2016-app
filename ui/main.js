var username = document.getElementById('username');
var password = document.getElementById('password');

var wls = window.location.search.toString().slice(1);
console.log('wls='+wls);


function loadLoginForm () {
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  console.log(this.responseText);
                  var response = JSON.parse(this.responseText);
                  submit.value = 'Success!';
                  window.location.href = response.prevurl;
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
   //hello    
        // Make the request
        var unamev = username.value;
        var passv = password.value;
        //console.log(username);
        //console.log(password);
        request.open('POST', '/login');
        request.setRequestHeader('Content-Type', 'application/json');
        var data = JSON.stringify({username: unamev, password: passv, prev: wls});
        console.log(data)
        request.send(data);  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    
    register.onclick = function() {
        window.location.href = "/register";
    };
    

}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    window.location.href = "/browse";   
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();
