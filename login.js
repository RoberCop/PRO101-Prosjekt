//VALIDATE SIGNUP
var username = document.getElementById('signin-name').value;
var password = document.getElementById('signin-password').value;
var signinBtn = document.getElementById('signin-btn')
var signupSubmit = document.getElementById('submit-signup');
var signupName = document.getElementById('signup-name');
var password1 = document.getElementById('signup-password');
var password2 = document.getElementById('signup-repeat');
var noMatch = document.getElementById('no-match');



signinBtn.addEventListener('click', checkLogIn);
signupSubmit.addEventListener('click', checkInput);



function checkInput() {

    removeMessage();

    if (signupName.value.length == 0) {
        signupName.focus();
        signupName.className = 'wrong-input';
        signupName.nextElementSibling.innerHTML = 'This field is required'
        return false;
    }

    if (password1.value.length == 0) {
        password1.focus();
        password1.className = 'wrong-input';
        password1.nextElementSibling.innerHTML = 'This field is required'
        return false;
    }

    if (password2.value.length == 0) {
        password2.focus();
        password2.className = 'wrong-input';
        password2.nextElementSibling.innerHTML = 'This field is required'
        return false;
    }
    if (password2.value !== password1.value) {
        password2.focus();
        password1.className = 'wrong-input';
        password2.className = 'wrong-input';
        password2.nextElementSibling.innerHTML = 'The passwords does not match'
        return false;
    }
    storeUser();
    signupModal.style.display = 'none';
    signedUp.style.display = 'flex';
    return true;


}

function storeUser() {
    users.push({
        username: signupName.value,
        password: password2.value


    });
    console.log("pushed");
}




function removeMessage() {
    var errorInput = document.querySelectorAll('.wrong-input');
    [].forEach.call(errorInput, function (el) {
        el.className = 'text-input';
    });

    var errorPara = document.querySelectorAll('.error');
    [].forEach.call(errorPara, function (el) {
        el.innerHTML = ""
    });
}


//CHECK LOGIN CREDENTIALS
function checkLogIn() {
    for (let i = 0; i < users.length; i++) {

        if (username == users[i].username) {
            if (password == users[i].password) {
                console.log('success');
            }
            else {
                console.log('fail');
            }

        }
        else {
            console.log('wrong')

        }
    }

    return;
}









