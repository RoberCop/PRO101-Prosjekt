//MAKE SIGNUP MODAL APPEAR/DISAPPEAR

// Get modal elements
var signupModal = document.getElementById('signup-modal');
var signedUp = document.getElementById('signed-up-modal')
var signUpForm = document.getElementById('signup-form');
var descModal = document.getElementById("reasons-modal");

//Get open modal button
var modalBtn = document.getElementById('signup-btn');
var descModalBtn = document.getElementById('why-btn');

// Get close button
var closeBtn = document.getElementById('close-modal');
var closeBtn2 = document.getElementById('close-modal2');
var closeBtn3 = document.getElementById('close-modal3');

//Listen for open click
modalBtn.addEventListener('click', openModal);
descModalBtn.addEventListener('click', openModal3);

//Listen for close click
closeBtn.addEventListener('click', closeModal);
closeBtn2.addEventListener('click', closeModal2);
closeBtn3.addEventListener('click', closeModal3);

//Close window click
window.addEventListener('click', outsideClick);

//Function to open modal
function openModal() {
    signupModal.style.display = 'flex';
}

function openModal3() {
    descModal.style.display = 'flex';
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

function closeModal3() {
    descModal.style.display = 'none';
}

//Function for window click close
function outsideClick(e) {
    if (e.target == signupModal || e.target == signedUp || e.target == descModal) {
        signupModal.style.display = 'none';
        signedUp.style.display = 'none';
        descModal.style.display = 'none';
        signUpForm.reset();
        removeMessage();
    }
}



