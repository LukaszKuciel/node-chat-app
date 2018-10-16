let socket = io();
const _All = document.querySelectorAll.bind(document);
const _ = document.querySelector.bind(document);
const _Create = document.createElement.bind(document);
function addListenerMulti(element, eventNames, listener) {
    let events = eventNames.split(' ');
    events.forEach(event => element.addEventListener(event, listener, false));
};
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

socket.on('connect', function(){
    console.log('Connected to server');
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
    
})

socket.on('newMessage', function(msg){
    let message = _Create('li');
    message.innerText = `${msg.from}: ${msg.text}`;
    _('#messages').appendChild(message);
})



_("#message-form").onsubmit = function(event){
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: _('[name="message-text"]').value
    }, function(data){
        console.log('Got it!', data);
    });

    _('[name="message-text"]').value = "";
};