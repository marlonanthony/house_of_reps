import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
  getChatroom,
  acceptChatroomInvite,
  deleteChatroom,
  addMembers
} from '../../actions/chatroomActions'
import { getCurrentProfile, leaveChatroom } from '../../actions/profileActions'
import SearchReps from '../../pages/create_chatroom/SearchReps'
import BackButton from '../UI/buttons/back-btn/BackButton'
import Dms from './dms/Dms'

function Chatroom({
  getChatroom,
  acceptChatroomInvite,
  chatroom,
  profile,
  deleteChatroom,
  getCurrentProfile,
  leaveChatroom,
  addMembers,
  ...props
}) {
  const [errors, setErrors] = useState(''),
    [accepted, setAccepted] = useState(false),
    [showForm, setShowForm] = useState(false),
    [inviteMore, setInviteMore] = useState([]),
    [makeMod, setMakeMod] = useState(false)

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

  const mods =
    chatroom.chatroom &&
    chatroom.chatroom.moderators &&
    chatroom.chatroom.moderators.filter(me => me.id === props.auth.user.id)[0]

  if (errors) return <Redirect to="/dashboard" />

  return (
    <div>
      <BackButton />
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
      <ul style={{ listStyle: 'none', padding: 10 }}>
        Admin
        <li style={{ paddingLeft: 10, fontSize: 14 }}>
          {admin && '@' + admin.handle}
        </li>
      </ul>

      <ul style={{ listStyle: 'none', padding: 10 }}>
        Mods
        {chatroom.chatroom &&
          chatroom.chatroom.moderators &&
          chatroom.chatroom.moderators.map(person => (
            <li style={{ paddingLeft: 10, fontSize: 14 }} key={person._id}>
              {person && '@' + person.handle}
            </li>
          ))}
      </ul>
      <ul style={{ listStyle: 'none', padding: 10 }}>
        Members
        {members &&
          members.map(member => (
            <li style={{ paddingLeft: 10, fontSize: 14 }} key={member._id}>
              @{member.handle}
            </li>
          ))}
      </ul>
      <ul style={{ listStyle: 'none', padding: 10 }}>
        Invited
        {invites &&
          invites.map(person => (
            <li style={{ paddingLeft: 10, fontSize: 14 }} key={person._id}>
              @{person.handle}
            </li>
          ))}
      </ul>
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
      {((admin && admin.id) === props.auth.user.id || (mods && member)) && (
        <button onClick={() => setShowForm(val => !val)}>Edit chatroom</button>
      )}
      {showForm && (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              const noDups = inviteMore.filter(
                (person, index, arr) =>
                  index === arr.findIndex(t => t.id === person.id)
              )
              addMembers(chatroom.chatroom._id, noDups)
            }}
          >
            <SearchReps
              profiles={props.profiled.profiles}
              setInvites={setInviteMore}
              placeholder="Invite Members"
            />

            {inviteMore && (
              <ul>
                {inviteMore.map(m => (
                  <li
                    key={m.id}
                    onClick={() =>
                      setInviteMore(prev => [
                        ...prev,
                        {
                          id: m.id,
                          name: m.name,
                          handle: m.handle
                        }
                      ])
                    }
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            )}
            <button>Submit</button>
          </form>
        </div>
      )}
      <Dms chatroomId={_id} user={props.auth.user} />
    </div>
  )
}

Chatroom.propTypes = {
  chatroom: PropTypes.object.isRequired,
  profiled: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getChatroom: PropTypes.func.isRequired,
  acceptChatroomInvite: PropTypes.func.isRequired,
  deleteChatroom: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  leaveChatroom: PropTypes.func.isRequired,
  addMembers: PropTypes.func.isRequired
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
    leaveChatroom,
    addMembers
  }
)(withRouter(Chatroom))
