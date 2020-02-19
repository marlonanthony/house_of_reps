import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

import useForm from '../common/hooks/useForm'
import SubmitButton from '../UI/buttons/submit-btn/SubmitButton'
import Input from '../common/inputs/Input'
import Spinner from '../common/Spinner'

const Verify = props => {
  const [isVerified, setIsVerified] = useState(false),
    [loading, setLoading] = useState(false),
    [errors, setErrors] = useState(''),
    [values, setValues] = useForm({ email: '', password: '' })

  useEffect(() => {
    const { search } = props.location
    let userData = { token: search.slice(7) }
    setLoading(true)
    axios
      .post('/api/users/confirm', userData)
      .then(res => {
        if (res.data.isVerified) {
          setIsVerified(true)
        }
      })
      .then(setLoading(false))
      .catch(err => setErrors(err.response.data))
  }, [isVerified, setIsVerified])

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = async e => {
    e.preventDefault()
    const userData = {
      email: values.email,
      password: values.password
    }
    try {
      await axios.post('/api/users/reconfirm-email', userData)
      props.history.push('/checkemail')
    } catch (err) {
      setErrors(err.response.data)
    }
  }
  if (loading) return <Spinner />

  return isVerified ? (
    <div style={{ textAlign: 'center', color: 'var(--secondary-color)' }}>
      <h1>Congrats You're Verified!!!!</h1>
      <Link to="/login">Log In</Link>
    </div>
  ) : (
    <div className="login-content">
      <h2>Token expired</h2>
      <p>Enter your email and password</p>
      <form onSubmit={onSubmit}>
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
        <SubmitButton text="Resend" />
      </form>
    </div>
  )
}

Verify.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(Verify)
