import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

import './Speakeasy.css'

const socket = io(
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://fathomless-escarpment-28544.herokuapp.com'
)

export default function Speakeasy({ handle, onlineCount }) {
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
    if (count === 0) setCount(onlineCount)

    socket.on('chat', data => {
      if (!data.handle && !data.message) return
      setFeedback('')
      setOutput(o => [...o, data.handle + ': ' + data.message])
    })
    socket.on('typing', data => {
      // TODO:
      // set boolean isTyping and display (...) animation if true
      // instead of displaying what's below
      data.message.length
        ? setFeedback(data.handle + ' is typing a message')
        : setFeedback('')
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

    return () => {
      socket.off('chat')
      socket.off('typing')
      socket.off('new-connection')
      socket.off('lost-connection')
    }
  }, [setCount, setFeedback, setOutput, message, onlineCount])

  return (
    <div className="chatroom">
      <div id="chatroom-header">
        <small id="speakeasy">Speakeasy</small>
        <small id="chatroom_count">
          {count} <i className="fas fa-user-tie chatroom-avatar"></i>
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
          onChange={e => {
            socket.emit('typing', { handle, message: e.target.value })
            setMessage(e.target.value)
          }}
          id="chat_message"
          type="text"
          placeholder="Message"
          value={message}
        />
        <button id="chat_submit_button" onClick={onSubmit}>
          Send
        </button>
      </div>
    </div>
  )
}

Speakeasy.propTypes = {
  handle: PropTypes.string,
  onlineCount: PropTypes.number
}
