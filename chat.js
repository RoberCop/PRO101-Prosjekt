var openChat = document.getElementById('chat-container');
var chatWindow = document.getElementById('chat-window');
var closeChatBtn = document.getElementById('close-chat');
var sendMsgBtn = document.getElementById('chat-send');
var msgInput = document.getElementById('chat-input');
var chatBody = document.getElementById('chat-body');

//Listen for button clicks or key events
openChat.addEventListener('click', openChatWindow);
closeChatBtn.addEventListener('click', closeChat);
sendMsgBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keyup', enterSend);
chatWindow.addEventListener('keyup', escCloseChat);

//Open chat window
function openChatWindow()
{
    chatWindow.style.display = 'block';
    msgInput.focus();
}

//Close chat window
function closeChat() 
{
    chatWindow.style.display = 'none';
}
//Send the chat message
function sendMessage() 
{ 
    if(msgInput.value.length > 0) 
    {
    var contentDiv = document.createElement('div');
    contentDiv.className = 'chat-msg'; 
    contentDiv.innerHTML = 'You: ' + msgInput.value; 
    chatBody.appendChild(contentDiv);
    msgInput.value ="";
    msgInput.focus();
    }  
}

//Send message with enter key
function enterSend(event) 
{
    if(msgInput.value.length > 0 && event.key === 'Enter') {
        sendMessage();
    }
}

//Close th chat window with escape key
function escCloseChat(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        closeChat();
    }
};
   

