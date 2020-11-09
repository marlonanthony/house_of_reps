import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { withRouter } from 'react-router-dom'

import './Speakeasy.css'

const socket = io(
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://fathomless-escarpment-28544.herokuapp.com'
)

function Speakeasy({ handle, avatar, onlineCount, history }) {
  const [message, setMessage] = useState(''),
    [output, setOutput] = useState([]),
    [feedback, setFeedback] = useState(''),
    [count, setCount] = useState(0)
  
  const onSubmit = () => {
    message.length &&
      socket.emit('chat', {
        handle,
        message,
        avatar
      })
    setMessage('')
  }

  useEffect(() => {
    if (count === 0) setCount(onlineCount)

    socket.on('chat', data => {
      if (!data.handle && !data.message) return
      setFeedback('')
      setOutput(o => [...o, {avatar: data.avatar, message: data.message, handle: data.handle}])
    })
    socket.on('typing', data => {
      // TODO:
      // set boolean isTyping and display (...) animation if true
      // instead of displaying what's below
      data.message.length
        ? setFeedback(data.handle + ' is typing a message')
        : setFeedback('')
      setCount(Math.floor(data.count /2))
    })
    socket.on('new-connection', data => {
      localStorage.setItem('count', data)
      setCount(Math.floor(JSON.parse(localStorage.getItem('count'))/2))
    })
    socket.on('lost-connection', data => {
      localStorage.setItem('count', data)
      setCount(Math.floor(JSON.parse(localStorage.getItem('count'))/2))
    })
    
    return () => {
      socket.off('chat')
      socket.off('typing')
      socket.off('new-connection')
      socket.off('lost-connection')
      localStorage.removeItem('count')
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
          {output.map((val, i) => {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={val.avatar} 
                  alt={`${val.handle}'s avatar`}
                  style={{borderRadius: '50%', width: 40, height: 40, cursor: 'pointer'}} 
                  onClick={() => history.push(`/profile/${val.handle}`)}
                />
                <p style={{ padding: 5 }}>
                  {val.message}
                </p>
              </div>
            )
          })}
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

export default withRouter(Speakeasy)