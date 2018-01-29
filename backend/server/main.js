var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    id: 1,
    text: 'Yo whats up nigga?',
    author: 'Big RanKey'
}]

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('Hello bitches!');
});

io.on('connection', (socket) => {
    console.log("Alguien se ha conectado con socket");

    socket.emit('messages', messages);

    socket.on('join', (author) => {
        console.log(author);
        socket.join(author);
    })

    socket.on('new-message', (data) => {
        data.id = socket.id;
        messages.push(data);

        io.sockets.emit('messages', messages);
    })

    socket.on('personal-message', (data) => {
        console.log(data);
        io.sockets.in(data.to).emit('personal-message-to', data);
    })
})

server.listen(8080, () => {
    console.log("Servidor corriendo en el: 8088");
})