import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

import './ChatRoom.css'

const socket = io(
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://fathomless-escarpment-28544.herokuapp.com'
)

export default function ChatRoom({ handle }) {
  const [message, setMessage] = useState(''),
    [output, setOutput] = useState([]),
    [feedback, setFeedback] = useState(''),
    [count, setCount] = useState(0)

  const onSubmit = () => {
    socket.emit('chat', {
      handle,
      message
    })
    setMessage('')
  }

  useEffect(() => {
    socket.on('chat', function(data) {
      if (!data.handle && !data.message) return
      setFeedback('')
      setOutput(o => [...o, data.handle + ': ' + data.message])
    })
    socket.on('typing', data => {
      // setFeedback('...')
      // perhaps set a boolean isTyping flag and display '...' animation if true?
      setFeedback(data.handle + ' is typing a message')
      setCount(data.count)
    })
    socket.on('new-connection', data => {
      localStorage.setItem('count', data)
      setCount(JSON.parse(localStorage.getItem('count')))
    })
    socket.on('lost-connection', data => {
      localStorage.setItem('count', data)
      setCount(JSON.parse(localStorage.getItem('count')))
    })
    console.log(count, JSON.parse(localStorage.getItem('count')))
    return () => {
      socket.off('chat')
      socket.off('typing')
      socket.off('new-connection')
      socket.off('lost-connection')
    }
  }, [setCount, setFeedback, setOutput])

  return (
    <div className="chatroom">
      <div id="chatroom-header">
        <small id="speakeasy">Speakeasy</small>
        <small id="chatroom_count">
          {count} <i class="fas fa-user-tie chatroom-avatar"></i>
        </small>
      </div>
      <div id="chat-window">
        <div id="output">
          {output.map((val, i) => (
            <p key={i}>{val}</p>
          ))}
          <small id="feedback">{feedback}</small>
        </div>
      </div>
      <div className="message_and_button_container">
        <input
          onChange={e => setMessage(e.target.value)}
          id="chat_message"
          type="text"
          placeholder="Message"
          onKeyPress={() => socket.emit('typing', handle)}
          value={message}
        />
        <button id="chat_submit_button" onClick={onSubmit}>
          Send
        </button>
      </div>
    </div>
  )
}
