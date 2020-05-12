import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { updateUserInfo } from '../../../actions/authActions'
import Input from '../../common/inputs/Input'
import useForm from '../../common/hooks/useForm'
import SubmitButton from '../../UI/buttons/submit-btn/SubmitButton'
import BackButton from '../../UI/buttons/back-btn/BackButton'
import './EditAccount.css'

function EditAccount({ updateUserInfo, history, ...props }) {
  const [values, setValues] = useForm({
    password: '',
    new_password: '',
    confirm_new_password: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = e => {
    e.preventDefault()
    const userData = {
      password: values.password,
      new_password: values.new_password,
      confirm_new_password: values.confirm_new_password
    }
    let res = window.confirm(
      `Are you sure you want to change your password to ${userData.new_password}?`
    )
    if (res) updateUserInfo(userData, history)
  }

  return (
    <section id="edit-account">
      <div className="createprofilecontainer">
        <BackButton />
        <h2>Edit Password</h2>
        <form onSubmit={onSubmit}>
          <Input
            type="password"
            name="password"
            placeholder="Current Password"
            value={values.password}
            onChange={setValues}
            error={errors.password}
          />
          <Input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={values.new_password}
            onChange={setValues}
            error={errors.new_password}
          />
          <Input
            type="password"
            name="confirm_new_password"
            placeholder="Confirm New Password"
            value={values.confirm_new_password}
            onChange={setValues}
            error={errors.confirm_new_password}
          />
          <SubmitButton />
        </form>
      </div>
    </section>
  )
}

EditAccount.propTypes = {
  updateUserInfo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { updateUserInfo }
)(withRouter(EditAccount))
