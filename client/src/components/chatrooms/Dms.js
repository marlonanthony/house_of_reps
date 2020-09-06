import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io(
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://fathomless-escarpment-28544.herokuapp.com'
)

export default function Dms({chatroomId, user, ...props }) {
  const [message, setMessage] = useState(''),
    [dms, setDms] = useState([]),
    [errors, setErrors] = useState({}),
    chatroom = `group-chat-${chatroomId}`

  useEffect(() => {
    axios.get('/api/messages/' + chatroomId)
      .then(res => setDms(res.data))
      .catch(err => console.log(err))

    socket.on(chatroom, (data) => {
      setDms(prev => [...prev, {handle: data.user.handle, message: data.message}])
    })

    return () => {
      socket.off(chatroom)
    }
  }, [chatroomId])

  return (
    <section>
        <h2>Chat</h2>
        <form onSubmit={e => {
          e.preventDefault()
          if (message) setErrors(prev => ({
            ...prev,
            message: null
          }))
          const newMessage = {
            message,
            chatroom: chatroomId
          }
          message.length && socket.emit('group-chat', {
            chatroomId,
            user,
            message
          })
          axios.post('/api/messages', newMessage)
          .catch(err => setErrors(err.response.data))
          setMessage('')
        }}>
          <input 
            onChange={e => setMessage(e.target.value)} 
            type="text" 
            placeholder="Message"
            value={message}
            // onKeyPress={() => socket.emit('typing', handle)}
          />
          {errors && errors.message && <div>{errors.message}</div>}
          <button>Send</button>
        </form>
        <ol>
          { dms.map((m, i) => (
            <li key={i}>@{(m.user && m.user.handle) || m.handle}: {m.message}</li>
          ))}
        </ol>
      </section>
  )
}