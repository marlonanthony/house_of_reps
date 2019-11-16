import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileActions = ({ user }) => (
  <div className="dashboard_profile_actions">
    <Link to="/edit-profile">
      <i className="fab fa-black-tie" />
      <span>Edit Profile</span>
    </Link>
    <Link to="/add-venue">
      <i className="fas fa-clipboard" />
      <span>Add Media</span>
    </Link>
    <Link to="/create-chatroom">
      <i class="far fa-comment-dots"></i>
      <span>Create Chatroom</span>
    </Link>
    {user.isAdmin && (
      <Link to="/add-djpool">
        <i className="fas fa-swimming-pool" />
        <span>Add DJ Pool</span>
      </Link>
    )}
    {user.isAdmin && (
      <Link to="/add-store">
        <i className="fas fa-store" />
        <span>Add Store</span>
      </Link>
    )}
    {user.isAdmin && (
      <Link to="/add-perk">
        <i className="fas fa-gift" />
        <span>Add Perk</span>
      </Link>
    )}
    {user.isAdmin && (
      <Link to="/add-brand">
        <i className="far fa-building" />
        <span>Add Brand</span>
      </Link>
    )}
  </div>
)

ProfileActions.propTypes = {
  user: PropTypes.object.isRequired
}

export default ProfileActions
