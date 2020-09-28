let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  io.emit('Connections', (Object.keys(io.sockets.connected).length))

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  socket.on('Created', (data) => {
    io.emit('Created', (data))
  })

  socket.on('new-message', (data) => {
    socket.broadcast.emit('new-message', (data))
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', (data))
  })

  socket.on('stopTyping', (data) => {
    socket.broadcast.emit('stopTyping', (data))
  })

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', (data))
  })

  socket.on('leaved', (data) => {
    socket.broadcast.emit('leaved', (data))
  })
})
