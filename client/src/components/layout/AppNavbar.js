import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

import './AppNavbar.css'


class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onLogoutClick = e => {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser() 
  }

  render() {
    const { isAuthenticated, user } = this.props.auth 
    
    const authLinks = (
      <NavItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link style={{ color: '#007bff', paddingRight: '20px' }} className='nav-link' to='/feed'>Post</Link>
        <Link style={{ textDecoration: 'none', paddingRight: '20px' }} to='/djs'>DJs</Link>
        <Link style={{ color: '#007bff', paddingRight: '20px' }} className='nav-link' to='/dashboard'>DashBoard</Link>
        <Link onClick={this.onLogoutClick} style={{ textDecoration: 'none' }} to='#'>
          <img 
            src={user.avatar} 
            alt={user.name} 
            className='rounded-circle'
            style={{ width: '25px', marginRight: '5px' }}
            title='You must have a Gravatar connected to your email to display and image' 
          />
          Logout 
        </Link>
      </NavItem>
    )
    const guestLinks = (
      <NavItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link className='nav-link' style={{ textDecoration: 'none', color: '#007bff', paddingRight: '20px' }} to='/login'>Login</Link>
        <Link className='nav-link' style={{ textDecoration: 'none', color: '#007bff'}} to='/register'>Sign Up</Link>
      </NavItem>
    )

    return (
        <Navbar color='dark' dark expand='xl'>
          <Container>
            <NavbarBrand><Link style={{ textDecoration: 'none' }} to='/'>House of Reps</Link></NavbarBrand>
              {/* <Link to='/djs' style={{ textDecoration: 'none' }}>DJs</Link> */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                { isAuthenticated ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
    )
  }
}

AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth 
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(AppNavbar) 