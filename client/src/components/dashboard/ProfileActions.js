import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div>
      <Link to="/edit-profile" className="">
        <i className="fas fa-user-circle"></i> Edit Profile</Link>
      <Link to="/add-venue" className="">
        <i className="fab fa-black-tie"></i>
        Add Venue</Link>
    </div>
  )
}

export default ProfileActions