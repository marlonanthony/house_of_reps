import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import './ChatRoom.css'

const socket = io('http://localhost:5000')

export default function ChatRoom() {
  const [message, setMessage] = useState(''),
    [handle, setHandle] = useState(''),
    [output, setOutput] = useState([]),
    [feedback, setFeedback] = useState(''),
    [count, setCount] = useState(0)

  const onSubmit = () => {
    socket.emit('chat', {
      handle,
      message
    })
    setMessage('')
    setHandle('')
  }

  useEffect(() => {
    socket.on('chat', function(data) {
      if (!data.handle && !data.message) return
      setFeedback('')
      setOutput(c => [...c, data.handle + ': ' + data.message])
    })

    socket.on('typing', data => {
      setFeedback(data + ' is typing a message')
    })

    socket.on('new-connection', data => {
      setCount(data)
    })

    socket.on('lost-connection', data => {
      setCount(data)
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
      <small>
        {count} {count === 1 ? 'person' : 'people'} in chat
      </small>
      <div id="chat-window">
        <div id="output">
          {output.map((val, i) => (
            <p key={i}>{val}</p>
          ))}
        </div>
        <div id="feedback">{feedback}</div>
      </div>
      <input
        onChange={e => setHandle(e.target.value)}
        id="handle"
        type="text"
        placeholder="Handle"
        value={handle}
      />
      <input
        onChange={e => setMessage(e.target.value)}
        id="message"
        type="text"
        placeholder="Message"
        onKeyPress={() => socket.emit('typing', handle)}
        value={message}
      />
      <button id="send" onClick={onSubmit}>
        Send
      </button>
    </div>
  )
}
