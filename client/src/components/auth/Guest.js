import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'

const Guest = ({ auth, loginUser, ...props }) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/login')
    }
  }, [auth.isAuthenticated])

  const onSubmitHandler = () => {
    const userData = {
      email: '',
      password: ''
    }
    loginUser(userData)
  }

  return (
    <button className="landing_buttons" onClick={onSubmitHandler}>
      Guest
    </button>
  )
}

Guest.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Guest))
