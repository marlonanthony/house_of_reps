import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import axios from 'axios' 
import { withRouter, Link } from 'react-router-dom'

class Verify extends Component {
  state = {
    url: `${this.props.location.search}`,
    isVerified: false
  }

  
  // Get User token from redux
  // compare tokens
  // if isVerified set to true 
  // send user to create profile
  // if isVerified is false deal with possible errors
  // Send user to Sapsburg
  // Match email and username using regex to compare with backend

  componentDidMount() {
    const { pathname, search } = this.props.location
    console.log(search.slice(7))
    let userData = { token: search.slice(7) }
    axios.post('/api/users/confirm', userData).then(res => {
      if(res.data.isVerified){
        this.setState({ isVerified: true })
        console.log(res)
      }
    }).catch(err => console.log(err))
 
    // if(`${pathname}${search}` === this.state.url) {
    //   this.setState({ isVerified: true })
    // }
  }

  render() {
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
