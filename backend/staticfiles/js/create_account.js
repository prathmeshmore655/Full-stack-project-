

function show_pass(){

    var pass = document.getElementById('password');
    var c_pass = document.getElementById('c_password');

    var checkbox = document.getElementById('checkbox');

    if( checkbox.checked ){

        pass.type = 'text';
        c_pass.type = 'text';

    }
    else{

        pass.type = 'password';
        c_pass.type = 'password';

    }

}


document.getElementById('form').onsubmit = (event) => {

    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var c_password = document.getElementById('c_password').value;
    
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;


    if( c_password !== password ){

        alert("Password and Confirm Password doesn't match");
        return 
    }

    var data = {

        'username' : username ,
        'password' : password ,
        'email' : email

    }


    fetch('create_user' , {

        method : 'POST' , 
        headers : {

            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken    

        },

        body : JSON.stringify(data)
    })
    .then(
        response => response.json()
    )
    .then(
        data => {

            alert(data.message);
            window.location.href = 'login_user';
        }
    )
    .catch(
        error => {

            console.log("Error : " , error);

        }
    )

    
};