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
          <Link
            to={`/profile/${profile.handle}`}
            style={{
              color: 'var(--reps-blue)'
            }}
          >
            @{profile.handle}
          </Link>
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
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 10
              }}
            >
              {profile.chatroomMemberships &&
                profile.chatroomMemberships.map(cr => (
                  <li
                    style={{
                      // border: '.3px solid var(--secondary-color)',
                      width: 200,
                      padding: 10,
                      cursor: 'pointer',
                      color: 'var(--secondary-color)'
                    }}
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
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 10
              }}
            >
              {profile.chatroomInvites.map(ci => (
                <li
                  style={{
                    // border: '.3px solid var(--secondary-color)',
                    width: 200,
                    padding: 10,
                    cursor: 'pointer',
                    color: 'var(--secondary-color)'
                  }}
                  key={ci._id}
                  onClick={() => getChatroom(ci.id, props.history)}
                >
                  {ci.name}
                </li>
              ))}
            </ul>
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
