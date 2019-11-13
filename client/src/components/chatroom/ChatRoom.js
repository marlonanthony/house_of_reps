import React, { useState, useEffect } from 'react'
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
      setFeedback(data + ' is typing a message')
    })
    socket.on('new-connection', data => {
      localStorage.setItem('count', data)
      setCount(JSON.parse(localStorage.getItem('count')))
    })
    socket.on('lost-connection', data => {
      localStorage.setItem('count', data)
      setCount(JSON.parse(localStorage.getItem('count')))
    })

    return () => {
      socket.off('chat')
      socket.off('typing')
      socket.off('new-connection')
      socket.off('lost-connection')
    }
  }, [setOutput, setFeedback, setCount])

  return (
    <div className="chatroom">
      <div id="chat-window">
        <small id="chatroom_count">
          {count} {count === 1 ? 'person' : 'people'} online
        </small>
        <div id="output">
          {output.map((val, i) => (
            <p key={i}>{val}</p>
          ))}
        </div>
        <small id="feedback">{feedback}</small>
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
