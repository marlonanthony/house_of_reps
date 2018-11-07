import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div style={{ padding: '10px' }}>
      <Link to="/edit-profile" 
        style={{
          margin: '0 10px', 
          textDecoration: 'none',
          color: 'rgb(55, 131, 194)'
        }}>
        <i className='fab fa-black-tie'/> Edit Profile
      </Link>
      <Link to="/add-venue" style={{ margin: '0 10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
        <i className="fas fa-clipboard" /> Add Event
      </Link>
    </div>
  )
}

export default ProfileActions