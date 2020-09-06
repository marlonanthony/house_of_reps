let count = 0

module.exports = io => {
  io.on('connection', socket => {
    io.emit('new-connection', ++count)
    socket.on('disconnect', () => {
      io.emit('lost-connection', --count)
    })
    socket.on('chat', data => {
      io.sockets.emit('chat', data)
    })
    socket.on('typing', data => {
      socket.broadcast.emit('typing', {
        handle: data.handle, 
        count, 
        message: data.message
      })
    })
    socket.on(`group-chat`, data => {
      io.sockets.emit(`group-chat-${data.chatroomId}`, data)
    })
  })
}