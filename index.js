let express = require('express')
let app = express().use(express.static('public'));
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res)=>{
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket)=>{
  console.log(`Socket [${socket.id}] opened`);
  socket.on('chat', (data)=>{
    io.sockets.emit('chat', data)
  })
  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', data)
  })
});

http.listen(4200, function(){
  console.log('🚀 Server launched on port 4200');
});