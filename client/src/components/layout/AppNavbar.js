import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import { Link } from 'react-router-dom'

import './AppNavbar.css'


class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div>
        <Navbar color='dark' dark expand='lg'>
          <Container>
            <NavbarBrand><Link style={{ textDecoration: 'none' }} to='/'>House of Reps</Link></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink><Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></NavLink>
                  <NavLink><Link style={{ textDecoration: 'none' }} to='/register'>Register</Link></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default AppNavbar 