import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getChatroom } from '../../../actions/chatroomActions'
import './ChatroomSection.css'

function ChatroomSection({ getChatroom, profile, ...props }) {
  return (
    <div>
      <h3>Chatrooms</h3>
      <div className="dashboard_member_invite_container">
        <div>
          Member
          <ul className="db-cr-section-ul">
            {profile.chatroomMemberships &&
              profile.chatroomMemberships.map(cr => (
                <li
                  className="db-cr-section-li"
                  key={cr._id}
                  onClick={() => getChatroom(cr.id, props.history)}
                >
                  {cr.name}
                </li>
              ))}
          </ul>
        </div>
        <div>
          Invites
          <ul className="db-cr-section-ul">
            {profile.chatroomInvites.map(ci => (
              <li
                className="db-cr-section-li"
                key={ci._id}
                onClick={() => getChatroom(ci.id, props.history)}
              >
                {ci.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

ChatroomSection.propTypes = {
  getChatroom: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(
  null,
  { getChatroom }
)(withRouter(ChatroomSection))
