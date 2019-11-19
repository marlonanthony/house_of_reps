import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getChatroom,
  acceptChatroomInvite
} from '../../actions/chatroomActions'

function Chatroom({
  getChatroom,
  acceptChatroomInvite,
  chatroom,
  profile,
  ...props
}) {
  useEffect(() => {
    getChatroom(props.match.params.id)
  }, [])

  const { name, members, invites, admin } = chatroom.chatroom
  const invite =
    profile &&
    profile.profile &&
    profile.profile.chatroomInvites &&
    profile.profile.chatroomInvites.filter(
      me => me.id === chatroom.chatroom._id
    )[0]

  return (
    <div>
      <i
        onClick={props.history.goBack}
        id="addvenue-back-button"
        className="fas fa-arrow-alt-circle-left"
        alt="back-button"
      />
      <h2>{name && name} chatroom</h2>
      {invite && (
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => acceptChatroomInvite(props.match.params.id)}
        >
          Accept Invite
        </button>
      )}
      <li style={{ listStyle: 'none' }}>
        Admin
        <ol>{admin && admin.handle}</ol>
      </li>
      <li style={{ listStyle: 'none' }}>
        Members
        {members && members.map((member, i) => <ol key={i}>{member.name}</ol>)}
      </li>
      <li style={{ listStyle: 'none' }}>
        Invited
        {invites && invites.map((person, i) => <ol key={i}>{person.name}</ol>)}
      </li>
    </div>
  )
}

Chatroom.propTypes = {
  getChatroom: PropTypes.func.isRequired,
  acceptChatroomInvite: PropTypes.func.isRequired,
  chatroom: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  chatroom: state.chatroom,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getChatroom, acceptChatroomInvite }
)(withRouter(Chatroom))
