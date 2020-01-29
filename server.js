const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const port = process.env.PORT || 5000
const server = app.listen(port, 
  () => console.log(`Server running on port ${port}`)
)
const io = socketIO(server)
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const chatrooms = require('./routes/api/chatrooms')
const db = require('./config/keys').mongoURI

let count = 0

io.on('connection', socket => {
  io.emit('new-connection', ++count)
  socket.on('disconnect', () => {
    io.emit('lost-connection', --count)
  })
  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })
  socket.on('typing', data => {
    socket.broadcast.emit('typing', {handle: data.handle, count, message: data.message})
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(db, { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)
app.use('/api/chat', chatrooms)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}