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
import Logout from '../../auth/logout/Logout'
import './DropdownMenu.css'

const DropdownMenu = ({
  logoutUser,
  clearCurrentProfile,
  getCurrentProfile,
  auth
}) => {
  const [displayMenu, setDisplayMenu] = useState(false),
    ref = useRef()

  useEffect(() => {
    if (!auth.isAuthenticated) getCurrentProfile()
    document.addEventListener('click', onOutsideClick, true)
    return () => {
      document.removeEventListener('click', onOutsideClick, true)
    }
  }, [auth.isAuthenticated])

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

  const authLinks = (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to={`/profile/${user.handle}`}>Profile</Link>
      <Link to="/feed">Feed</Link>
      <Link to="/djs">Reps</Link>
      <Link to="/" onClick={onLogoutClick}>
        <Logout user={user} />
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
    <div ref={ref} aria-label="Main Menu">
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
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
