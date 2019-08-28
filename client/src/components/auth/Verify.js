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
    const { search } = this.props.location
    let userData = { token: search.slice(7) }
    axios.post('/api/users/confirm', userData)
    .then(res => {
      if(res.data.isVerified){
        this.setState({ isVerified: true })
      }
    }).catch(err => console.log(err))
  }

  render() {
    return this.state.isVerified 
      ? <div style={{textAlign: 'center', color: 'rgb(55,131,194)'}}>
          <h1>Congrats You're Verified!!!!</h1>
          <Link to='/login'>Log In</Link>
        </div>
      : <h2>POOR SAP!!</h2>
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
