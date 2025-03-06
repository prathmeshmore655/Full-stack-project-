

function show_pass(){

    var checkbox = document.getElementById('checkbox');
    var password = document.getElementById('password');


    if( checkbox.checked ){

        password.type = 'text';

    }
    else{

        password.type = 'password'; 
    }
}


document.getElementById('form').onsubmit = (event) => {
    
    event.preventDefault();

    var username = document.getElementById('username').value ; 
    var password = document.getElementById('password').value ;
    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    data = {

        'username' : username,
        'password' : password
    };

    fetch('login_user' , {

        method : 'POST',
        headers : {
        
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken    
        },

        body : JSON.stringify(data)

    })

    .then (
        response => response.json()
    )
    .then(
        data => {

            alert(data.message);
            window.location.href = 'http://localhost:3000/home';
        }
    )
    .catch(
        error => {

            console.log("Error : " , error)
        }
    )
    
}