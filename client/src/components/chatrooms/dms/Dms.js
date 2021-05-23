import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { withRouter } from 'react-router-dom'

import './Dms.css'

const socket = io(
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://fathomless-escarpment-28544.herokuapp.com'
)

function Dms({ chatroomName, chatroomId, user, setToggleDrawer, ...props }) {
  const [message, setMessage] = useState(''),
    [dms, setDms] = useState([]),
    [errors, setErrors] = useState({}),
    ref = useRef(),
    scrollHeight = ref.current && ref.current.scrollHeight
  
  useEffect(() => {
    if (scrollHeight) window.scrollTo(0, scrollHeight)
  }, [scrollHeight])

  useEffect(() => {
    const chatroom = `group-chat-${chatroomId}`
    axios.get('/api/messages/' + props.match.params.id)
      .then(res => setDms(res.data))
      .catch(err => console.log(err))
    socket.on(chatroom, (data) => {
      setDms(prev => [...prev, data])
    })
    return () => { socket.off(chatroom) }
  }, [props.match.params.id, chatroomId])

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
    .then(() => {})
    .catch(err => setErrors(err.response.data))
    setMessage('')
  }

  return (
    <section className='chat-group-section'>
      <div id="group-chat-header">
        <img
          className="group-chat-reps-icon"
          src={require('../../../img/hor-icon.jpg')}
          alt="HORs logo"
          title='side drawer'
          onClick={() => setToggleDrawer(prev => !prev)}
        />
        <small id="group-chat-name">{chatroomName}</small>
      </div>
      <div className='chat-group-messages' ref={ref}>
        { dms.length ? dms.map((m, i, arr) => (
          <div className='group-chat-output' key={i}>
            {((arr[i-1] && arr[i-1].user && arr[i-1].user.id) !== (m.user && m.user.id) ||
              (arr[i-1] && arr[i-1].user && arr[i-1].user._id) !== (m.user && m.user._id)
            )
              ? <img 
                    src={m.user.avatar}
                    className='chat-group-avatar'
                    alt={m.user.handle}
                    title={m.user.handle}
                    onClick={() => props.history.push(`/profile/${m.user.handle}`)}
                />
              : null
            }
            <p className='chat-group-text'>{m.message}</p>
          </div>
        )):null}
      </div>
      <form onSubmit={onSubmit} className='group-chat-form'>
        <input 
          onChange={e => setMessage(e.target.value)} 
          type="text" 
          placeholder="Message"
          value={message}
          // onKeyPress={() => socket.emit('typing', handle)}
        />
        {errors && errors.message && <small>{errors.message}</small>}
      </form>
    </section>
  )
}

export default withRouter(Dms)