import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div>
      <Link to="/edit-profile" 
        style={{
          margin: '0 10px', 
          textDecoration: 'none',

        }}>
        <i className=""></i> Edit Profile</Link>
      <Link to="/add-venue" style={{ margin: '0 10px', textDecoration: 'none' }}>
        <i className=""></i>
        Add Venue</Link>
    </div>
  )
}

export default ProfileActions