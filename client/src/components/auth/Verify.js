import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'

const Verify = props => {
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const { search } = props.location
    let userData = { token: search.slice(7) }
    axios
      .post('/api/users/confirm', userData)
      .then(res => {
        if (res.data.isVerified) {
          setIsVerified(true)
        }
      })
      .catch(err => console.log(err))
  }, [isVerified, setIsVerified])

  return isVerified ? (
    <div style={{ textAlign: 'center', color: 'var(--secondary-color)' }}>
      <h1>Congrats You're Verified!!!!</h1>
      <Link to="/login">Log In</Link>
    </div>
  ) : (
    <h2>POOR SAP!!</h2>
  ) // Make this the resend route
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
