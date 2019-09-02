import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = ({ profile }) => (
  <div className='dashboard_profile_actions'>
    <Link to="/edit-profile">
      <i className='fab fa-black-tie'/>
      <span>Edit Profile</span>
    </Link>
    <Link to="/add-venue">
      <i className="fas fa-clipboard" />
      <span>Add Media</span>
    </Link>
    { profile.user._id === "5bad9df3f3dd61183a0fec96" && (
      <Link to="/add-djpool">
        <i className="fas fa-swimming-pool" /> 
        <span>Add DJ Pool</span>
      </Link>
    )}
    { profile.user._id === "5bad9df3f3dd61183a0fec96" && (
      <Link to="/add-store">
        <i className='fas fa-store' /> 
        <span>Add Store</span>
      </Link>
    )}
    { profile.user._id === "5bad9df3f3dd61183a0fec96" && (
      <Link to="/add-perk">
        <i className='fas fa-gift' /> 
        <span>Add Perk</span>
      </Link>
    )}
    { profile.user._id === "5bad9df3f3dd61183a0fec96" && (
      <Link to="/add-brand">
        <i className='far fa-building' /> 
        <span>Add Brand</span>
      </Link>
    )}
  </div>
)

export default ProfileActions