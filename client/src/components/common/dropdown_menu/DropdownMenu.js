import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from '../../../actions/authActions'
import {
  getCurrentProfile,
  clearCurrentProfile
} from '../../../actions/profileActions'
import isEmpty from '../../../validation/is-empty'
import './DropdownMenu.css'

const DropdownMenu = ({
  logoutUser,
  clearCurrentProfile,
  getCurrentProfile,
  auth,
  ...props
}) => {
  const [displayMenu, setDisplayMenu] = useState(false),
    ref = useRef()

  useEffect(() => {
    if (!auth.isAuthenticated) getCurrentProfile()
    document.addEventListener('click', onOutsideClick, true)
    return () => {
      document.removeEventListener('click', onOutsideClick, true)
    }
  }, [])

  const onOutsideClick = e => {
    const domNode = ReactDOM.findDOMNode(ref.current)
    if (!domNode || !domNode.contains(e.target)) {
      setDisplayMenu(false)
    }
  }

  const onLogoutClick = e => {
    e.preventDefault()
    clearCurrentProfile()
    logoutUser()
  }

  const { isAuthenticated, user } = auth
  const { profile } = props.profile

  if (isEmpty(profile)) return null

  const authLinks = (
    <div>
      {/* <Link to="/djs">DJs</Link> */}
      <Link to={`/profile/${profile.handle}`}>Profile</Link>
      <Link to="/feed">Feed</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="#" onClick={onLogoutClick}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', height: '22px', marginRight: '5px' }}
          />
          Logout
        </div>
      </Link>
    </div>
  )

  const guestLinks = (
    <div>
      <Link to="/login">Sign In</Link>
      <Link to="/register">Sign Up</Link>
    </div>
  )

  return (
    <div ref={ref}>
      <div className="dropdown" onClick={() => setDisplayMenu(prev => !prev)}>
        <div className="dropdown_hover">
          <div className="btn-line"></div>
          <div className="btn-line"></div>
          <div className="btn-line"></div>
        </div>
        {displayMenu && (
          <div className="dropdown_menu">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        )}
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile,
    getCurrentProfile
  }
)(withRouter(DropdownMenu))
