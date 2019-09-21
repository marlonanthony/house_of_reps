import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import Dropzone from 'react-dropzone' 
import request from 'superagent'

import { addDjpool } from '../../actions/profileActions'
import Input from '../../components/common/inputs/Input'
import './AddDjpool.css' 

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class AddDjpool extends Component {
  state = {
    image: '',
    url: '',
    errors: {},
    uploadedFileCloudinaryUrl: '',
    uploadedFile: ''
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    
    const djpoolData = {
      image: this.state.image,
      url: this.state.url
    }

    this.props.addDjpool(djpoolData, this.props.history)
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
        this.setState({ image: response.body.secure_url })
      }
    })
  }

  render() {
    const { errors } = this.state 
    return (
      <div className=''>
        <i onClick={this.props.history.goBack} id='addvenue-back-button' className='fas fa-arrow-alt-circle-left' alt='back-button' />
        <h2>Add DJ Pool</h2>
        <div className='djpools_input_wrapper'>
          <div className='djpools-dropzone'>
            <div className='FileUpload'>
              <Dropzone 
                className='dropzone' // In UI/dropzone
                multiple={false}
                accept='image/*'
                onDrop={this.onImageDrop}>
                <p>Drag or click here to upload a file.</p>
              </Dropzone>
            </div>
            <div>
              { this.state.uploadedFileCloudinaryUrl === '' ? null : 
                <img 
                  src={this.state.uploadedFileCloudinaryUrl} 
                  style={{ height: '50px', width: '50px' }}
                  alt={this.state.uploadedFile.name} />
              }
            </div>
          </div>
          <form onSubmit={ this.onSubmit }>
            <Input 
              name='url'
              type='text'
              value={ this.state.url }
              onChange={ this.onChange }
              error={ errors.url }
              placeholder='DJ Pool URL'
            />
            <Input 
              name='image'
              type='text'
              value={ this.state.image }
              onChange={ this.onChange }
              error={ errors.image }
              placeholder='Image URL'
            />
            <div className='add-djpool-submit-btn-containing-div'>
              <input type="submit" value='Submit' id='add-djpools-submit-button' title='submit' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

AddDjpool.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addDjpool: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth 
})

export default connect(mapStateToProps, { addDjpool })(withRouter(AddDjpool))