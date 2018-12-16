import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import './Register.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class Register extends Component {
  state = {
    name: '',
    email: '',
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser, this.props.history) 
  }

  onImageDrop = files => {
    this.setState({ uploadedFile: files[0]})
    this.handleImageUpload(files[0])
  }

  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file) 
    
    upload.end((err, response) => {
      if(err) console.log(err) 
      if(response.body.secure_url !== '') {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url})
        this.setState({ avatar: response.body.secure_url })
      }
    })
  }

  render() {
    const { errors } = this.state  

    return (
      <div className="register-container">
        <h2 style={{ textAlign: 'center', color: '#bdc7c1' }}>Sign Up</h2>
        <p style={{ textAlign: 'center', color: '#7e8889' }}>Create your account</p>
        <div id='register-content'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <div style={{ display: 'flex', justifyContent: 'center' }} className='FileUpload'>
              <Dropzone 
                style={{ 
                  borderRadius: '2px',
                  fontSize: '15px',
                  textAlign: 'center',
                  width: '50%', 
                  height: 'auto', 
                  padding: '10px',
                  cursor: 'pointer',
                  color: '#aaa',
                  border: 'dashed',
                  borderColor: '#ccc',
                  marginLeft: '-70px',
                  background: 'rgba(0,0,0,0.4)'
                }}
                multiple={false}
                accept='image/*'
                onDrop={this.onImageDrop}>
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
            </div>
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? null : 
              <div>
                <div style={{justifyContent: 'flex-end'}}>
                  <img 
                    src={this.state.uploadedFileCloudinaryUrl} 
                    style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                    alt={this.state.uploadedFile.name} />
                </div>
              </div>
              }
            </div>
          </div>
          <form id='register-form' onSubmit={ this.onSubmitHandler }>
            <TextFieldGroup
              type="text"
              name='name'
              value={ this.state.name }
              placeholder='Name'
              onChange={this.onChangeHandler}
              error={ errors.name }
            />
            <TextFieldGroup
              type="email"
              name='email'
              placeholder='Email'
              value={ this.state.email }
              onChange={this.onChangeHandler}
              error={ errors.email }
            />
            <TextFieldGroup
              type="password"
              name='password'
              placeholder='Password'
              value={ this.state.password }
              onChange={this.onChangeHandler}
              error={ errors.password }
            />
            <TextFieldGroup
              type="password"
              name='password2'
              placeholder='Confirm Password'
              value={ this.state.password2 }
              onChange={this.onChangeHandler}
              error={ errors.password2 }
            />
            <input type="submit" id='register-button' />
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