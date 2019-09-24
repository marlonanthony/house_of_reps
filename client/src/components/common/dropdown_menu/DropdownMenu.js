import React, { Component } from 'react'
import ReactDOM from 'react-dom' 
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'

import { logoutUser } from '../../../actions/authActions'
import { getCurrentProfile, clearCurrentProfile } from '../../../actions/profileActions'
import isEmpty from '../../../validation/is-empty'

import './DropdownMenu.css'

class DropdownMenu extends Component {

  state = { displayMenu: false }

  componentDidMount() {
    if(!this.props.auth.isAuthenticated) this.props.getCurrentProfile() 
    document.addEventListener('click', this.onOutsideClick, true) 
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, true) 
  }

  onOutsideClick = (e) => {
    const domNode = ReactDOM.findDOMNode(this) 
    if(!domNode || !domNode.contains(e.target)) {
      this.setState({ displayMenu: false })
    }
  }
  
  toggleClick = () => {
    this.setState(prevState => ({ displayMenu: !prevState.displayMenu }))
  }

  onLogoutClick = e => {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser() 
  }

  render() {
    const { isAuthenticated, user } = this.props.auth 
    const { profile } = this.props.profile
    
    if(isEmpty(profile)) return null
  
    const authLinks = (
      <>
        {/* <Link to="/djs">DJs</Link> */}
        <Link to={`/profile/${profile.handle}`}>Profile</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="#" onClick={this.onLogoutClick}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img 
              src={user.avatar}
              alt={user.name} 
              style={{ width: '25px', height: '22px', marginRight: '5px' }}
            />
            Logout 
          </div>
        </Link>
       
      </>
    )

    const guestLinks = (
      <div>
        <Link to="/login">Sign In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    )


    return (
      <div>
        <div className="dropdown" onClick={this.toggleClick}>
          <div className='dropdown_hover'>
            <div className="btn-line"></div>
            <div className="btn-line"></div>
            <div className="btn-line"></div>
          </div>
          { this.state.displayMenu ? (
            <div className='dropdown_menu'>
              { isAuthenticated ? authLinks : guestLinks }
            </div>
          ) : null }
        </div>
      </div>
    )
  }
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


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, getCurrentProfile })(withRouter(DropdownMenu))