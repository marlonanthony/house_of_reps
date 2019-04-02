import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <React.Fragment>
      <Link to="/edit-profile" 
        style={{
          margin: '0 10px', 
          textDecoration: 'none',
          color: 'rgb(55, 131, 194)'
        }}>
        <i className='fab fa-black-tie'/><span style={{color: 'rgba(200,200,200,0.6)', padding: '0 5px'}}>Edit Profile</span>
      </Link>
      <Link to="/add-venue" style={{ margin: '0 10px', textDecoration: 'none', color: 'rgb(55, 131, 194)' }}>
        <i className="fas fa-clipboard" />
        <span style={{color: 'rgba(200,200,200,0.6)', padding: '0 5px'}}>Add Media</span>
      </Link>
    </React.Fragment>
  )
}

export default ProfileActions