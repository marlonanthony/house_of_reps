import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getChatroom } from '../../actions/chatroomActions'

function Chatroom({ getChatroom, chatroom, ...props }) {
  useEffect(() => {
    getChatroom(props.match.params.id, props.history)
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
      <li>
        {members && members.map((member, i) => <ol key={i}>{member.name}</ol>)}
      </li>
      <li>
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
  chatroom: state.chatroom
})

export default connect(
  mapStateToProps,
  { getChatroom }
)(withRouter(Chatroom))
