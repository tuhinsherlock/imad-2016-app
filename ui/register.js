
var register = document.getElementById('register_btn');

function loginuser(unamev, passv){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  register.value = 'Logged in!';
                  window.location.href = '/browse';
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

    console.log('logging in unamev='+unamev+' passv='+passv);
    request.open('POST', '/login');

        request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: unamev, password: passv}));
}


register.onclick = function () {
    // Create a request object
    var request = new XMLHttpRequest();


    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var name = document.getElementById('name');
    var email = document.getElementById('email');
  

    var unamev = username.value;
    var passv = password.value;
    var namev = name.value;
    var emailv = email.value;
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              register.value = 'Registered!';
              loginuser(unamev, passv);
          } else {
              alert('Could not register the user');
              register.value = 'Register';
          }
      }
    };
    
    // Make the request

    if(unamev.length===0){
      username.placeholder= "Username is required";
      username.className += " formInvalid";
    }
    if(passv.length===0){
      password.placeholder="Password is required";
      password.className += " formInvalid";
    }
    if(namev.length===0){
      name.placeholder= "Name is required";
      name.className += " formInvalid";
    }
    if(emailv.length===0){
      email.placeholder= "Email is required";
      email.className += " formInvalid";
    }

    if(unamev && passv && namev && emailv)
    {
      request.open('POST', '/create-user');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({username: unamev, password: passv, name:namev, email:emailv}));  
      register.value = 'Registering...';
  }

};