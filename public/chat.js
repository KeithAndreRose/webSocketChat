// Socket handshake
let socket = io()

let message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  feedback = document.getElementById('feedback'),
  output = document.getElementById('output');

// Emit Event
btn.addEventListener('click',()=>{
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
})

message.addEventListener('keypress', ()=>{
  socket.emit('typing', handle.value )
})

// Listen for event
socket.on('chat',(data)=>{
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
})

socket.on('typing', (data)=>{
  feedback.innerHTML = `<p><em>${data}</em> is typing a message</p>`
})