import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteAccount } from '../../actions/profileActions'
import PropTypes from 'prop-types'

import ProfileActions from './ProfileActions'
import Venues from './Venues'
import PromoContent from './PromoContent'
import { getChatroom } from '../../actions/chatroomActions'

const DashboardContent = ({
  profile,
  loading,
  user,
  deleteAccount,
  getChatroom,
  ...props
}) => {
  let dashboardContent

  if (loading) dashboardContent = null
  else if (Object.keys(profile).length) {
    dashboardContent = (
      <div style={{ textAlign: 'center' }}>
        <div className="handle_actions_container">
          <Link to={`/profile/${profile.handle}`}>@{profile.handle}</Link>
          <ProfileActions user={user} />
        </div>
        <h3>Chatrooms</h3>
        <div
          className="dashboard_member_invite_container"
          style={{
            // remove and place in above className css file
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
          }}
        >
          <div>
            Member
            <li
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              {profile.chatroomMemberships.map(cr => (
                <ol
                  style={{
                    border: '.3px solid var(--secondary-color)',
                    width: 200,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  key={cr._id}
                  onClick={() => getChatroom(cr.id, props.history)}
                >
                  {cr.name}
                </ol>
              ))}
            </li>
          </div>
          <div>
            Invites
            <li
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              {profile.chatroomInvites.map(ci => (
                <ol
                  style={{
                    border: '.3px solid var(--secondary-color)',
                    width: 200,
                    padding: 10,
                    cursor: 'pointer'
                  }}
                  key={ci._id}
                  onClick={() => getChatroom(ci.id, props.history)}
                >
                  {ci.name}
                </ol>
              ))}
            </li>
          </div>
        </div>
        <PromoContent user={user} profile={profile} />
        <Venues venues={profile.venues} />
        <button
          onClick={deleteAccount}
          id="dashboard-delete-btn"
          title="delete profile"
        >
          Delete My Account
        </button>
      </div>
    )
  } else {
    dashboardContent = (
      <div className="dashboard_no_profile">
        <p>{user.name}</p>
        <p>You have not yet set up a profile, please add some info</p>
        <Link to="/create-profile">Create Profile</Link>
      </div>
    )
  }

  return <div id="dashboard">{dashboardContent}</div>
}

DashboardContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object,
  getChatroom: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteAccount, getChatroom }
)(withRouter(DashboardContent))
