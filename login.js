//VALIDATE SIGNUP
var signinName = document.getElementById('signin-name');
var signinPass = document.getElementById('signin-password');
var signinBtn = document.getElementById('signin-btn')
var signupSubmit = document.getElementById('submit-signup');
var signupName = document.getElementById('signup-username');
var password1 = document.getElementById('signup-password');
var password2 = document.getElementById('signup-repeat');

signinBtn.addEventListener('click', checkLogIn);
signupSubmit.addEventListener('click', checkInput);


function checkInput() 
{

    removeMessage();

    if (signupName.value.length == 0) 
    {
        signupName.focus();
        signupName.className = 'wrong-input';
        signupName.nextElementSibling.innerHTML = 'Username is required'
        return false;
    }

    if (password1.value.length == 0) 
    {
        password1.focus();
        password1.className = 'wrong-input';
        password1.nextElementSibling.innerHTML = 'Password is required'
        return false;
    }

    if (password2.value.length == 0) 
    {
        password2.focus();
        password2.className = 'wrong-input';
        password2.nextElementSibling.innerHTML = 'Password is required'
        return false;
    }
    if (password2.value !== password1.value) 
    {
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

//CHECK LOGIN CREDENTIALS
function checkLogIn()
{
    for (let i = 0; i < usersArr.length; i++)
    {
        if (signinName.value == usersArr[i].username)
        {
            console.log("success username")
            if (signinPass.value == usersArr[i].password)
            {
                console.log("success password");
                return;
            }
        }
    }

    loginErr(); 
}

function loginErr()
{
    removeMessage();
    signinPass.nextElementSibling.innerHTML = "Wrong username or password"
    signinName.className = 'wrong-input';
    signinPass.className = 'wrong-input';
    }

function storeUser() 
{
    usersArr.push(
        {
        username: signupName.value,
        password: password2.value
    });
    console.log(usersArr);
};




function removeMessage() 
{
    var errorInput = document.querySelectorAll('.wrong-input');
    [].forEach.call(errorInput, function (el) 
                    {
        el.className = 'text-input';
    });

    var errorPara = document.querySelectorAll('.error');
    [].forEach.call(errorPara, function (el) 
                    {
        el.innerHTML = ""
    });
}



