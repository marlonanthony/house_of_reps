import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  getChatroom,
  acceptChatroomInvite,
  deleteChatroom
} from '../../actions/chatroomActions'
import { getCurrentProfile } from '../../actions/profileActions'

function Chatroom({
  getChatroom,
  acceptChatroomInvite,
  chatroom,
  profile,
  deleteChatroom,
  getCurrentProfile,
  ...props
}) {
  const [errors, setErrors] = useState(''),
    [accepted, setAccepted] = useState(false)

  useEffect(() => {
    getChatroom(props.match.params.id)
  }, [])

  useEffect(() => {
    getCurrentProfile()
  }, [])

  useEffect(() => {
    if (chatroom.chatroom.err) {
      setErrors(chatroom.chatroom.err.response.data.error)
    }
  }, [setErrors, chatroom.chatroom.err])

  const { name, members, invites, admin, _id } = chatroom.chatroom

  const invite =
    props.profiled &&
    props.profiled.profile &&
    props.profiled.profile.chatroomInvites &&
    props.profiled.profile.chatroomInvites.filter(
      me => me.id === chatroom.chatroom._id
    )[0]

  if (errors) return <Redirect to="/dashboard" />

  return (
    <div>
      <i
        onClick={props.history.goBack}
        id="addvenue-back-button"
        className="fas fa-arrow-alt-circle-left"
        alt="back-button"
      />
      <h2>{name && name} chatroom</h2>
      {invite && !accepted && (
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setAccepted(true)
            acceptChatroomInvite(props.match.params.id)
          }}
        >
          Accept Invite
        </button>
      )}
      <li style={{ listStyle: 'none' }}>
        Admin
        <ol>{admin && '@' + admin.handle}</ol>
      </li>

      <li style={{ listStyle: 'none' }}>
        Mods
        {chatroom.chatroom &&
          chatroom.chatroom.moderators &&
          chatroom.chatroom.moderators.map(person => (
            <ol>{person && '@' + person.handle}</ol>
          ))}
      </li>
      <li style={{ listStyle: 'none' }}>
        Members
        {members &&
          members.map(member => <ol key={member._id}>@{member.handle}</ol>)}
      </li>
      <li style={{ listStyle: 'none' }}>
        Invited
        {invites &&
          invites.map(person => <ol key={person._id}>@{person.handle}</ol>)}
      </li>
      {(admin && admin.id) === props.auth.user.id && (
        <button onClick={() => deleteChatroom(_id, props.history)}>
          Delete Chatroom
        </button>
      )}
    </div>
  )
}

Chatroom.propTypes = {
  getChatroom: PropTypes.func.isRequired,
  acceptChatroomInvite: PropTypes.func.isRequired,
  deleteChatroom: PropTypes.func.isRequired,
  chatroom: PropTypes.object.isRequired,
  profiled: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  chatroom: state.chatroom,
  profiled: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getChatroom, acceptChatroomInvite, deleteChatroom, getCurrentProfile }
)(withRouter(Chatroom))
