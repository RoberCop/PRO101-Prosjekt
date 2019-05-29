//MAKE SIGNUP MODAL APPEAR/DISAPPEAR

// Get modal elements
var signupModal = document.getElementById('signup-modal');
var signedUp = document.getElementById('signed-up-modal')
var signUpForm = document.getElementById('signup-form')
//Get open modal button
var modalBtn = document.getElementById('signup-btn');

// Get close button
var closeBtn = document.getElementById('close-modal');
var closeBtn2 = document.getElementById('close-modal2');

//Listen for open click
modalBtn.addEventListener('click', openModal);

//Listen for close click
closeBtn.addEventListener('click', closeModal);
closeBtn2.addEventListener('click', closeModal2);
//Close window click
window.addEventListener('click', outsideClick);

//Function to open modal
function openModal() {
    signupModal.style.display = 'flex';
}

//Function to close modal
function closeModal() {
    signupModal.style.display = 'none';
    signUpForm.reset();
    removeMessage();

}
function closeModal2() {
    signedUp.style.display = 'none';

}

//Function for window click close
function outsideClick(e) {
    if (e.target == signupModal || e.target == signedUp) {
        signupModal.style.display = 'none';
        signedUp.style.display = 'none';
        signUpForm.reset();
        removeMessage();
    }
}



