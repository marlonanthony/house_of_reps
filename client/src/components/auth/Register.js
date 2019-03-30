import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

import { registerUser } from '../../actions/authActions'
import RegisterTextFieldGroup from '../common/register-inputs/RegisterTextFieldGroup'
import './Register.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class Register extends Component {
  state = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password2: '',
    errors: {},
    avatar: '',
    uploadedFileCloudinaryUrl: '',
    uploadedFile: ''
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard') // Change this to '/profile'
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = e => {
    e.preventDefault()
    const { name, email, handle, avatar, password, password2 } = this.state
    const newUser = {
      name,
      email,
      handle,
      avatar,
      password,
      password2
    }
    this.props.registerUser(newUser, this.props.history) 
  }

  onImageDrop = files => {
    this.setState({ uploadedFile: files[0]})
    this.handleImageUpload(files[0])
  }

  handleImageUpload = file => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file) 
    
    upload.end((err, response) => {
      if(err) console.log(err) 
      if(response.body.secure_url !== '') {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url })
        this.setState({ avatar: response.body.secure_url })
      }
    })
  }

  render() {
    const { errors } = this.state  

    return (
      <div className="register-container">
        <h2 style={{ textAlign: 'center', color: '#bdc7c1', marginTop: '50px' }}>Sign Up</h2>
        <p style={{ textAlign: 'center', color: '#7e8889' }}>Create your account</p>
        <div id='register-content'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{  }} className='FileUpload'>
              <Dropzone 
                className='dropzone'
                multiple={ false }
                accept='image/*'
                onDrop={ this.onImageDrop }>
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
            </div>
            <div>
              { this.state.uploadedFileCloudinaryUrl === '' ? null : 
              <div>
                <div>
                  <img 
                    src={ this.state.uploadedFileCloudinaryUrl } 
                    style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                    alt={ this.state.uploadedFile.name } />
                </div>
              </div>
              }
            </div>
          </div>
          <form id='register-form' onSubmit={ this.onSubmitHandler }>
            <RegisterTextFieldGroup
              type="text"
              name='name'
              value={ this.state.name }
              placeholder='Name'
              onChange={ this.onChangeHandler }
              error={ errors.name }
            />
            <RegisterTextFieldGroup
              type="email"
              name='email'
              placeholder='Email'
              value={ this.state.email }
              onChange={ this.onChangeHandler }
              error={ errors.email }
            />
            <RegisterTextFieldGroup
              type="handle"
              name='handle'
              placeholder='handle'
              value={ this.state.handle }
              onChange={ this.onChangeHandler }
              error={ errors.handle }
            />
            <RegisterTextFieldGroup
              type="password"
              name='password'
              placeholder='Password'
              value={ this.state.password }
              onChange={ this.onChangeHandler }
              error={ errors.password }
            />
            <RegisterTextFieldGroup
              type="password"
              name='password2'
              placeholder='Confirm Password'
              value={ this.state.password2 }
              onChange={ this.onChangeHandler }
              error={ errors.password2 }
            />
            <div className='register-button-container'>
              <input type="submit" id='register-button' title='submit' />
            </div>
          </form>
        </div>
      </div>
    )
  }
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register))