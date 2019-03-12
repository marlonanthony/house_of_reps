import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Verify extends Component {
  state = {
    url: '/verify/?email=mad1083@yahoo.com&token=123456',
    isVerified: false
  }

  // Get User url from redux
  // verify the url is correct
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

export default connect(null, {})(withRouter(Verify))
