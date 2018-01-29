var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('messages', (data) => {
    console.log(data);
    render(data);
})

socket.on('personal-message-to', (data) => {
    renderPrivate(data);
})

function render(data) {
    var html = data.map((element, index) => {
        return (`<div>
                    <h6>${element.id}</h6>
                    <strong>${element.author}</strong>:
                    <em>${element.text}</em>
                </div>`);
    }).join(' ');

    document.getElementById('messages').value = html;
}

function renderPrivate(data) {
    var html = `<h6>${data.to}</h6>
                    <strong>${data.author}</strong>:
                    <em>${data.title}</em>
                    <h6>${data.content}</h6>`;

    document.getElementById('private').append(html);
}

function addMessage(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    }

    socket.emit('new-message', payload);
    return false;
}

function privateMessage(e) {
    var payload = {
        to: document.getElementById('toid').value,
        author: document.getElementById('privateUsername').value,
        title: document.getElementById('privateText').value,
        content: document.getElementById('privateContent').value
    }

    socket.emit('personal-message', payload);
    return false;
}

function register(e) {
    var author = document.getElementById('author').value;
    console.log('Author: ', author);
    socket.emit('join', author);
    return false;
}