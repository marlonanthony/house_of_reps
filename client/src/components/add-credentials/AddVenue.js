import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import request from 'superagent' 

import { addVenue } from '../../actions/profileActions'
import Input from '../common/inputs/Input'
import TextArea from '../common/textarea/TextArea'
import './AddVenue.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class AddVenue extends Component {
  state = {
    location: '',
    date: '',
    description: '',
    errors: {},
    title: '',
    video: '',
    image: '',
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

  onPaste = e => {
    let clipboardData = e.clipboardData || window.clipboardData
    let urlData = `${''+clipboardData.getData('Text')}`
    let parsedUrl = urlData.slice(7, -10)
    parsedUrl = parsedUrl.includes('soundcloud') ? parsedUrl = parsedUrl.match(/src.*/g).toString().slice(5, -1) 
      : parsedUrl.includes('youtube' || 'youtu.be') ? parsedUrl = parsedUrl.match(/http(.*?)[\s]/g).toString().slice(0, -2)
      :  null
    this.setState({ video: parsedUrl })
  }

  onSubmit = e => {
    e.preventDefault()
    
    const venueData = {
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      title: this.state.title,
      video: this.state.video,
      image: this.state.image,
    
    }

    this.props.addVenue(venueData, this.props.history)
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
      <div className='add-venue'>
        <i onClick={this.props.history.goBack} id='addvenue-back-button' className='fas fa-arrow-alt-circle-left' alt='back-button' />
        <h1 style={{ textAlign: 'center', color: '#ccc', paddingTop: '70px' }}>Add Highlight</h1>
        <div className='djpools_input_wrapper'>
          <form onSubmit={ this.onSubmit }>
            <Input 
              placeholder='Title'
              name='title'
              value={ this.state.title }
              onChange={ this.onChange }
              error={ errors.title }
            />
            <Input 
              name='video'
              type='text'
              value={ this.state.video }
              // onChange={ this.onChange }
              onPaste={ this.onPaste }
              error={ errors.video }
              placeholder='Paste embed code'
            />
            <TextArea 
              placeholder='Quick description'
              name='description'
              value={ this.state.description }
              onChange={ this.onChange }
              error={ errors.description }
            />
            <div className='venue-submit-btn-containing-div'>
              <input type="submit" value='Submit' id='add-djpools-submit-button' title='submit' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

AddVenue.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addVenue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addVenue })(withRouter(AddVenue))