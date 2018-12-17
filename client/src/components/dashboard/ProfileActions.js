import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    // <div style={{ padding: '10px' }}>
    <React.Fragment>
      <Link to="/edit-profile" 
        style={{
          margin: '0 10px', 
          textDecoration: 'none',
          color: 'rgb(55, 131, 194)'
        }}>
        <i className='fab fa-black-tie'/><span style={{color: '#ccc', padding: '0 5px'}}>Edit Profile</span>
      </Link>
      <Link to="/add-venue" style={{ margin: '0 10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
        <i className="fas fa-clipboard" /><span style={{color: '#ccc', padding: '0 5px'}}>Add Event</span>
      </Link>
    </React.Fragment>
    // </div>
  )
}

export default ProfileActions