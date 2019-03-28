import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import Spinner from '../common/Spinner'
import { getCurrentProfile, clearCurrentProfile } from '../../actions/profileActions'

import './DropdownMenu.css'

class DropdownMenu extends Component {

  state = {
    displayMenu: false
  }

  componentDidMount() {
    this.props.getCurrentProfile() 
  }

  onMouseEnter = () => {
    this.setState({ displayMenu: true })
  }

  onMouseLeave = () => {
    this.setState({ displayMenu: false })
  }

  onLogoutClick = e => {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser() 
  }

  render() {
    const { isAuthenticated, user } = this.props.auth 
    const { profile, loading } = this.props.profile
    const { location: { pathname } } = this.props
    
    if(!profile) {
      return null
    }
    // if( profile &&
    //   pathname === '/create-profile' || 
    //   pathname === '/login' || 
    //   pathname === '/register' ||
    //   pathname.includes('/verify')
    // ) {
    //   return null 
    // }
  
    const authLinks = (
      <div>
        {/* <Link to="/djs">DJs</Link> */}
        <Link to={`/profile/${profile.handle}`}>Profile</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="#" onClick={this.onLogoutClick}>
        <img 
          src={user.avatar}
          alt={user.name} 
          style={{ width: '25px', marginRight: '5px' }}
        />
          Logout 
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
      <div className="dropdown" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <button className="dropdown_hover">| | |</button>
        { this.state.displayMenu ? (
           <div className='dropdown_menu'>
             { isAuthenticated ? authLinks : guestLinks }
           </div>
        ) : null }
      </div>
    )
  }
}

DropdownMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, getCurrentProfile })(withRouter(DropdownMenu))