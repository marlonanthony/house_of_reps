import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loginUser } from '../../actions/authActions'
import { getCurrentProfile } from '../../actions/profileActions'
import Input from '../common/inputs/Input'
import useForm from '../common/hooks/useForm'
import './Login.css'

const Login = ({ auth, loginUser, getCurrentProfile, ...props }) => {
  const [values, setValues] = useForm({ email: '', password: '' }),
    [errors, setErrors] = useState({})

  useEffect(() => {
    if (auth.isAuthenticated) {
      getCurrentProfile().then(() => props.history.push('/dashboard'))
    }
    setErrors(props.errors)
  }, [auth.isAuthenticated, props.errors])

  const onSubmitHandler = e => {
    e.preventDefault()
    const userData = {
      email: values.email,
      password: values.password
    }
    loginUser(userData)
  }

  return (
    <div className="login">
      <h2>Log In</h2>
      <div id="login-content">
        <form onSubmit={onSubmitHandler}>
          <Input
            placeholder="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={setValues}
            error={errors.email}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={setValues}
            error={errors.password}
          />
          <div className="login-page-button-container">
            <input type="submit" id="login-page-button" title="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  {
    loginUser,
    getCurrentProfile
  }
)(withRouter(Login))
