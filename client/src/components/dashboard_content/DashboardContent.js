import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import HandleAndActions from './handle_and_actions/HandleAndActions'
import Venues from './venues/Venues'
import PromoContent from './PromoContent'
import ChatroomSection from './chatroom_section/ChatroomSection'
import DeleteProfileBtn from './delete_profile_btn/DeleteProfileBtn'

const DashboardContent = ({ profile, user }) => {
  if (Object.keys(profile).length) {
    return (
      <section id="dashboard">
        <div id="dashboard-container">
          <HandleAndActions profile={profile} user={user} />
          <ChatroomSection profile={profile} />
          <PromoContent user={user} profile={profile} />
          <Venues venues={profile.venues} />
          <DeleteProfileBtn />
        </div>
      </section>
    )
  } else {
    return (
      <section id="dashboard">
        <div className="dashboard_no_profile">
          <p>{user.name}</p>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to="/create-profile">Create Profile</Link>
        </div>
      </section>
    )
  }
}

DashboardContent.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object
}

export default DashboardContent
