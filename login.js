var signinName = document.getElementById('signin-name');
var signinPass = document.getElementById('signin-password');
var signinBtn = document.getElementById('signin-btn')
var signupSubmit = document.getElementById('submit-signup');
var signupName = document.getElementById('signup-username');
var password1 = document.getElementById('signup-password');
var password2 = document.getElementById('signup-repeat');

signinBtn.addEventListener('click', checkValues);
signupSubmit.addEventListener('click', checkInput);
signinName.addEventListener('keyup', enterSignin);
signinPass.addEventListener('keyup', enterSignin);
signupName.addEventListener('keyup', enterSignup);
password1.addEventListener('keyup', enterSignup);
password2.addEventListener('keyup', enterSignup);

//Validate signup
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

//Check login credentials
function checkValues() 
{
    if(signinPass.value.length > 0 && signinPass.value.length >0) 
    {
        checkLogIn();
    }
    else 
    {
        signinPass.nextElementSibling.innerHTML = "Username and password is required";
    }
}

function checkLogIn() 
{
    let username = document.getElementById("signin-name").value;
    let password = document.getElementById("signin-password").value;

    for(let i = 0; i < usersArr.length; i++) 
    {

        if(username == usersArr[i].username)
        {
            if(password == usersArr[i].password)
            {
				redirectToOverview(i);
            }
        } 
    }

	if (username == sessionStorage.getItem("newUsername"))
		if (password == sessionStorage.getItem("newPassword"))
			redirectToOverview(-1);
    
    loginErr();
    return;
}

function redirectToOverview(userIndex)
{
	sessionStorage.setItem("loginIndex", userIndex.toString());
	window.location.assign('nodeTree.html');
}

//Alert login error
function loginErr()
{
    removeMessage();
    signinPass.nextElementSibling.innerHTML = "Wrong username or password"
    signinName.className = 'wrong-input';
    signinPass.className = 'wrong-input';
}

function storeUser() 
{
	sessionStorage.setItem("newUsername", signupName.value);
	sessionStorage.setItem("newPassword", password2.value);
};



//Remove error messages
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

//Enter click to submit
function enterSignin(event) 
{
    if(signinName.value.length > 0 && signinPass.value.length > 0 && event.key === 'Enter') {
        checkLogIn();
    }
}

function enterSignup(event) 
{
    if(event.key === 'Enter') {
        checkInput();
    }
}


