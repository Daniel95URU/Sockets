const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  const name = prompt('Nombre: ')
  appendMessage('Conectado')
  socket.emit('usuarioNuevo', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`Tu: ${message}`)
    socket.emit('enviarMensaje', roomName, message)
    messageInput.value = ''
  })
}

socket.on('crearRoom', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'Unirse'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('mensaje', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('usuarioConectado', name => {
  appendMessage(`${name} se unió`)
})

socket.on('usuarioSale', name => {
  appendMessage(`${name} salió`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}