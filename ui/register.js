
var wls = window.location.search.toString().slice(1);
console.log('wls='+wls);

var username = document.getElementById('username');
var password = document.getElementById('password');
var name1 = document.getElementById('name1');
var email = document.getElementById('email');

var register = document.getElementById('register_btn');

function loginuser(unamev, passv){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  console.log(this.responseText);
                  var response = JSON.parse(this.responseText);
                  register.value = 'Logged in!';
                  window.location.href = response.prevurl;
              } else if (request.status === 403) {
                  register.value = 'Error logging in.. try again';
                  window.location.href = '/';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  register.value = 'Register';
              } else {
                  alert('Something went wrong on the server');
                  register.value = 'Register';
              }
          }
    };

    request.open('POST', '/login');
    request.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({username: unamev, password: passv, prev: wls});
    console.log(data)
    request.send(data);
}


register.onclick = function () {
    var request = new XMLHttpRequest();
  
    var unamev = username.value;
    var passv = password.value;
    var namev = name1.value;
    var emailv = email.value;

    console.log('data='+unamev+','+passv+','+namev+','+emailv);
    
    if(!unamev){
      username.placeholder= "Username is required";
      username.className += " formInvalid";
    }
    if(!passv){
      password.placeholder="Password is required";
      password.className += " formInvalid";
    }
    if(!namev){
      name1.placeholder= "Name is required";
      name1.className += " formInvalid";
    }
    if(!emailv){
      email.placeholder= "Email is required";
      email.className += " formInvalid";
    }

    if(unamev && passv && namev && emailv){
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                register.value = 'Registered!';
                loginuser(unamev, passv);
            } else {
                alert('Could not register the user');
                register.value = 'Register';
            }
        }
      };
      request.open('POST', '/create-user');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({username: unamev, password: passv, name:namev, email:emailv}));  
      register.value = 'Registering...';
    }
};