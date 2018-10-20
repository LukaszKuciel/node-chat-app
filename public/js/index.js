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
    let formatedTime = moment(msg.createdAt).format('h:mm a');
    let message = _Create('li');
    message.innerText = `${msg.from} ${formatedTime}: ${msg.text}`;
    _('#messages').appendChild(message);
})

socket.on('newLocationMessage', function(msg){
    let formatedTime = moment(msg.createdAt).format('h:mm a');
    let message = _Create('li');
    let a = _Create('a');
    a.href = msg.url;
    a.target = '_blank';
    a.innerText = 'My current location';
    message.innerText = `${msg.from} ${formatedTime}: `;
    message.appendChild(a);
    _('#messages').appendChild(message);
})


_("#message-form").onsubmit = function(event){
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: _('[name="message-text"]').value
    }, function(){
        _('[name="message-text"]').value = "";
    });
};

_('#send-location').onclick = function(event){
    event.preventDefault();

    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    _('#send-location').disabled = true;
    _('#send-location').innerHTML = '<div id="wave"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
    navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            _('#send-location').disabled = false;
            _('#send-location').innerHTML = `<i class="fa fa-map-marker-alt"></i>`;
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