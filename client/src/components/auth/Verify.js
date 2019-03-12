import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Verify extends Component {
  state = {
    token: 123456,
    email: 'mad1083@yahoo.com',
    isVerified: false
  }

  componentDidMount() {
    if(this.props.location.search.includes(this.state.email) && this.props.location.search.includes(this.state.token)) {
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
