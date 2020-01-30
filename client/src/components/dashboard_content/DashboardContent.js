import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProfileActions from './ProfileActions'
import Venues from './venues/Venues'
import PromoContent from './PromoContent'
import ChatroomSection from './chatroom_section/ChatroomSection'
import DeleteProfileBtn from './delete_profile_btn/DeleteProfileBtn'

const DashboardContent = ({ profile, loading, user }) => {
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
        <ChatroomSection profile={profile} />
        <PromoContent user={user} profile={profile} />
        <Venues venues={profile.venues} />
        <DeleteProfileBtn />
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
  profile: PropTypes.object
}

export default DashboardContent
