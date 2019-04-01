import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import axios from 'axios' 
import { withRouter, Link } from 'react-router-dom'

class Verify extends Component {
  state = {
    isVerified: false
  }

  componentDidMount() {
    const { pathname, search } = this.props.location
    let userData = { token: search.slice(7) }
    axios.post('/api/users/confirm', userData).then(res => {
      if(res.data.isVerified){
        this.setState({ isVerified: true })
      }
    }).catch(err => console.log(err))
  }

  render() {
    if(this.state.isVerified){
      return (
        <div style={{textAlign: 'center', color: 'rgb(55,131,194)'}}>
          <h1>Congrats You're Verified!!!!</h1>
          <Link to='/login'>Log In</Link>
        </div>
      )
    } 
    return (
      <div>
        <h1 style={{textAlign: 'center', color: 'rgb(55,131,194)'}}>POOR SAP!!</h1>
      </div>
    )
  }
}

Verify.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors 
})

export default connect(mapStateToProps)(withRouter(Verify))
