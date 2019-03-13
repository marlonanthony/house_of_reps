import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Verify extends Component {
  state = {
    url: `/verify/${this.props.location.search}`,
    isVerified: false
  }

  
  // Get User token from redux
  // compare tokens
  // if isVerified set to true 
  // send user to create profile
  // if isVerified is false deal with possible errors
  // Send user to Sapsburg

  componentDidMount() {
    const { pathname, search } = this.props.location
    if(`${pathname}${search}` === this.state.url) {
      this.setState({ isVerified: true })
    }
  }

  render() {
    console.log(this.props) 
    if(this.state.isVerified){
      return (
        <div style={{textAlign: 'center', color: 'cyan'}}>
          <h1>Congrats You're Verified!!!!</h1>
          <Link to='/login'>Log In</Link>
        </div>
      )
    } 
    return (
      <div>
        <h1 style={{textAlign: 'center', color: 'cyan'}}>POOR SAP!!</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors 
})

export default connect(mapStateToProps)(withRouter(Verify))
