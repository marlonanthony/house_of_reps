import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  getChatroom,
  acceptChatroomInvite,
  deleteChatroom
} from '../../actions/chatroomActions'
import { getCurrentProfile, leaveChatroom } from '../../actions/profileActions'
import SearchReps from '../../pages/add-promos/create_chatroom/SearchReps'

function Chatroom({
  getChatroom,
  acceptChatroomInvite,
  chatroom,
  profile,
  deleteChatroom,
  getCurrentProfile,
  leaveChatroom,
  ...props
}) {
  const [errors, setErrors] = useState(''),
    [accepted, setAccepted] = useState(false),
    [showForm, setShowForm] = useState(false),
    [inviteMore, setInviteMore] = useState([])

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

  const member =
    chatroom.chatroom &&
    chatroom.chatroom.members &&
    chatroom.chatroom.members.filter(me => me.id === props.auth.user.id)[0]

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
            <ol key={person._id}>{person && '@' + person.handle}</ol>
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
      {member && member.id !== chatroom.chatroom.admin.id && (
        <button
          onClick={() => leaveChatroom(chatroom.chatroom._id, props.history)}
        >
          Leave Chatroom
        </button>
      )}
      {(admin && admin.id) === props.auth.user.id && (
        <button
          onClick={() => {
            console.log(chatroom.chatroom._id)
            setShowForm(val => !val)
          }}
        >
          Edit chatroom
        </button>
      )}
      {showForm && (
        <div>
          <SearchReps
            profiles={props.profiled.profiles}
            setInvites={setInviteMore}
            placeholder="Invite Members"
          />
        </div>
      )}
      {inviteMore &&
        inviteMore.map(m => (
          <div key={m._id} style={{ display: 'flex', alignItems: 'center' }}>
            <p>{m.handle}</p>
            <input type="checkbox" />
          </div>
        ))}
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
  {
    getChatroom,
    acceptChatroomInvite,
    deleteChatroom,
    getCurrentProfile,
    leaveChatroom
  }
)(withRouter(Chatroom))
