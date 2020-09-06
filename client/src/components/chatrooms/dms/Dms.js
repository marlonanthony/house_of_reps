import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import './Dms.css'

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
      console.log(data)
      setDms(prev => [...prev, data])
    })

    return () => {
      socket.off(chatroom)
    }
  }, [chatroomId])

  const onSubmit = e => {
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
  }
  console.log(dms)
  return (
    <section>
        <h2>Chat</h2>
        <div className='chat-group-messages'>
          { dms.map((m, i, arr) => (
            <div key={i}>
              {((arr[i-1] && arr[i-1].user && arr[i-1].user.id) !== (m.user && m.user.id) ||
                (arr[i-1] && arr[i-1].user && arr[i-1].user._id) !== (m.user && m.user._id)
              )
                ? <img 
                      src={m.user && m.user.avatar}
                      className='chat-group-avatar'
                  />
                : null
              }
              <p className='chatroom_text'>{m.message}</p>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit}>
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
      </section>
  )
}