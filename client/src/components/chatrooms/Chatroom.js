import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getChatroom } from '../../actions/chatroomActions'

function Chatroom({ getChatroom, chatroom }) {
  useEffect(() => {
    getChatroom('5dce597fdeff6715620fef80')
  }, [])
  console.log(chatroom.chatroom)
  const { name, members } = chatroom.chatroom
  return (
    <div>
      <h2>{name && name} chatroom</h2>
      <li>
        {members && members.map((member, i) => <ol key={i}>{member}</ol>)}
      </li>
    </div>
  )
}

Chatroom.propTypes = {
  getChatroom: PropTypes.func.isRequired,
  chatroom: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  chatroom: state.chatroom
})

export default connect(
  mapStateToProps,
  { getChatroom }
)(Chatroom)
