import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

import './DropdownMenu.css'

class DropdownMenu extends Component {

  state = {
    displayMenu: false 
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

    const authLinks = (
      <div>
        <Link to="/djs">DJs</Link>
        <Link to="/feed">Post</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="#" onClick={this.onLogoutClick}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          className='rounded-circle'
          style={{ width: '25px', marginRight: '5px' }}
          title='You must have a Gravatar connected to your email to display and image' 
        />
          Logout 
        </Link>
      </div>
    )

    const guestLinks = (
      <div>
        <Link to="/login">Log In</Link>
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth 
})


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(DropdownMenu)