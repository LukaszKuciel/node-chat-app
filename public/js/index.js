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

socket.on('newLocationMessage', function(msg){
    let message = _Create('li');
    let a = _Create('a');
    a.href = msg.url;
    a.target = '_blank';
    a.innerText = 'My current location';
    message.innerText = `${msg.from}: `;
    message.appendChild(a);
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

_('#send-location').onclick = function(event){
    event.preventDefault();

    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, function(){
            return alert('Unable to fetch location.');
        },
        {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 0
        }
    )
}