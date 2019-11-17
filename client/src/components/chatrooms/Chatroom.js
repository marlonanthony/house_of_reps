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

  const { name, members, invites } = chatroom.chatroom
  return (
    <div>
      <i
        onClick={props.history.goBack}
        id="addvenue-back-button"
        className="fas fa-arrow-alt-circle-left"
        alt="back-button"
      />
      <h2>{name && name} chatroom</h2>
      <p
        onClick={() =>
          acceptChatroomInvite(props.match.params.id, props.history)
        }
      >
        Accept Invite
      </p>
      <li>
        Members
        {members && members.map((member, i) => <ol key={i}>{member.name}</ol>)}
      </li>
      <li>
        Invited
        {invites && invites.map((person, i) => <ol key={i}>{person.name}</ol>)}
      </li>
    </div>
  )
}

Chatroom.propTypes = {
  getChatroom: PropTypes.func.isRequired,
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
