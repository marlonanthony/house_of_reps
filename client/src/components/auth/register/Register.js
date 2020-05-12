import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { registerUser } from '../../../actions/authActions'
import Input from '../../common/inputs/Input'
import useForm from '../../common/hooks/useForm'
import DropZoneContainer from '../../UI/dropzone/DropZoneContainer'
import SubmitButton from '../../UI/buttons/submit-btn/SubmitButton'
import { handleImageUpload } from '../../../utils/handle_image_upload/handleImageUpload'
import './Register.css'

const Register = ({ auth, registerUser, ...props }) => {
  const [values, setValues] = useForm({
    name: '',
    email: '',
    handle: '',
    password: '',
    password2: '',
    code: ''
  })

  const [avatar, setAvatar] = useState(''),
    [errors, setErrors] = useState({}),
    [uploadedFile, setUploadedFile] = useState({}),
    [uploadedFileCloudinaryUrl, setUploadedFileCloudinaryUrl] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/dashboard')
    }
    setErrors(props.errors)
  }, [auth.isAuthenticated, props.errors])

  const onSubmitHandler = e => {
    e.preventDefault()
    const newUser = {
      name: values.name,
      email: values.email,
      handle: values.handle,
      avatar,
      password: values.password,
      password2: values.password2,
      code: values.code
    }
    registerUser(newUser, props.history)
  }

  const onImageDrop = files => {
    setUploadedFile(files[0])
    handleImageUpload(files[0], setUploadedFileCloudinaryUrl, setAvatar)
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <div id="register-content">
        <DropZoneContainer
          onImageDrop={onImageDrop}
          uploadedFile={uploadedFile}
          uploadedFileCloudinaryUrl={uploadedFileCloudinaryUrl}
        />
        <form onSubmit={onSubmitHandler}>
          <Input
            type="text"
            name="name"
            value={values.name}
            placeholder="Name"
            onChange={setValues}
            error={errors.name}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={setValues}
            error={errors.email}
          />
          <Input
            type="text"
            name="handle"
            placeholder="handle"
            value={values.handle}
            onChange={setValues}
            error={errors.handle}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={setValues}
            error={errors.password}
          />
          <Input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={values.password2}
            onChange={setValues}
            error={errors.password2}
          />
          <Input
            type="password"
            name="code"
            placeholder="Enter Secret Code"
            value={values.code}
            onChange={setValues}
            error={errors.code}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(Register)
