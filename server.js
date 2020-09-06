const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  path = require('path'),
  socketIO = require('socket.io'),
  sslRedirect = require('heroku-ssl-redirect')

const app = express(),
  port = process.env.PORT || 5000,
  server = app.listen(port, () => 
    console.log(`Server running on ${port}`)),
  io = socketIO(server),
  users = require('./routes/api/users'),
  profile = require('./routes/api/profile'),
  posts = require('./routes/api/posts'),
  chatrooms = require('./routes/api/chatrooms'),
  promos = require('./routes/api/promos'),
  messages = require('./routes/api/messages'),
  db = require('./config/keys').mongoURI

app.use(sslRedirect())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./config/passport')(passport)
require('./services/sockets/sockets')(io)
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)
app.use('/api/chat', chatrooms)
app.use('/api/promos', promos)
app.use('/api/messages', messages)

mongoose.connect(db, { 
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}