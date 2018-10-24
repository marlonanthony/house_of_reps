import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone' 
import request from 'superagent' 

import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import isEmpty from '../../validation/is-empty'
import './EditProfile.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    stageName: '',
    phoneNumber: '',
    company: '',
    website: '',
    location: '',
    bio: '',
    style: '',
    twitter: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    soundcloud: '',
    spotify: '',
    mixcloud: '',
    youtube: '',
    errors: {},
    avatar: '',
    uploadedFileCloudinaryUrl: '',
    uploadedFile: ''
  }

  componentDidMount() {
    this.props.getCurrentProfile() 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      // If profile field doesnt exist, make empty string
      profile.avatar = !isEmpty(profile.avatar) ? profile.avatar : '' 
      profile.stageName = !isEmpty(profile.stageName) ? profile.stageName : ''
      profile.phoneNumber = !isEmpty(profile.phoneNumber) ? profile.phoneNumber : ''
      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.style = !isEmpty(profile.style) ? profile.style : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {} 
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
      profile.soundcloud = !isEmpty(profile.social.soundcloud) ? profile.social.soundcloud : ''
      profile.spotify = !isEmpty(profile.social.spotify) ? profile.social.spotify : ''
      profile.mixcloud = !isEmpty(profile.social.mixcloud) ? profile.social.mixcloud : ''
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''

      // Set component field state
      this.setState({
        avatar: profile.avatar,
        handle: profile.handle,
        stageName: profile.stageName,
        phoneNumber: profile.phoneNumber,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        bio: profile.bio,
        style: profile.style,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        youtube: profile.youtube,
        soundcloud: profile.soundcloud,
        spotify: profile.spotify,
        mixcloud: profile.mixcloud
      })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    
    const profileData = {
      avatar: this.state.avatar,
      handle: this.state.handle,
      stageName: this.state.stageName,
      phoneNumber: this.state.phoneNumber,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      style: this.state.style,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
      soundcloud: this.state.soundcloud,
      spotify: this.state.spotify,
      mixcloud: this.state.mixcloud
    }

    this.props.createProfile(profileData, this.props.history) 
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
    const { errors, displaySocialInputs } = this.state 

    // Select options for dj style
    const options = [
      { label: "What's Your DJ Style?", value: 0 },
      { label: 'MC', value: 'MC' },
      { label: 'Tour', value: 'Tour' },
      { label: 'Battle', value: 'Battle' },
      { label: 'Hybrid', value: 'Hybrid' },
      { label: 'Novice', value: 'Novice' },
      { label: 'Digger', value: 'Digger' },
      { label: 'Mobile DJ', value: 'Mobile DJ' },
      { label: 'Live Remix', value: 'Live Remix' },
      { label: 'Producer DJ', value: 'Producer DJ' },
      { label: 'Turntablism', value: 'Turntablism' },
      { label: 'Program Guru', value: 'Program Guru' },
      { label: 'Mad Scientist', value: 'Mad Scientist' },
      { label: 'Radio Mixshow', value: 'Radio Mixshow' },
      { label: 'Night Club Mix', value: 'Night Club Mix' },
      { label: 'Video DJ "VDJ"', value: 'Video DJ "VDJ"' },
      { label: 'Bedroom Bandit', value: 'Bedroom Bandit' },
      { label: 'On air Personality', value: 'On air Personality' },
      { label: 'House & Electronic', value: 'House & Electronic' },
      { label: 'Night Club Scratch', value: 'Night Club Scratch' },
      { label: 'Portable Scratcher', value: 'Portable Scratcher' },
      { label: 'Audio Visual Artist', value: 'Audio Visual Artist' },
      { label: 'I Got My Own Swag Bruh', value: 'I Got My Own Swag Bruh' }
    ]

    let socialInputs

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder='Twitter Profile URL'
            name='twitter'
            icon='fab fa-twitter'
            value={ this.state.twitter }
            onChange={ this.onChange } 
            error={ errors.twitter } 
          />
          <InputGroup 
            placeholder='Facebook Profile URL'
            name='facebook'
            icon='fab fa-facebook'
            value={ this.state.facebook }
            onChange={ this.onChange } 
            error={ errors.facebook } 
          />
          <InputGroup 
            placeholder='Linkedin Profile URL'
            name='linkedin'
            icon='fab fa-linkedin'
            value={ this.state.linkedin }
            onChange={ this.onChange } 
            error={ errors.linkedin } 
          />
          <InputGroup 
            placeholder='Instagram Profile URL'
            name='instagram'
            icon='fab fa-instagram'
            value={ this.state.instagram }
            onChange={ this.onChange } 
            error={ errors.instagram } 
          />
          <InputGroup 
            placeholder='SoundCloud Profile URL'
            name='soundcloud'
            icon='fab fa-soundcloud'
            value={ this.state.soundcloud }
            onChange={ this.onChange } 
            error={ errors.soundcloud } 
          />
          <InputGroup 
            placeholder='Spotify Profile URL'
            name='spotify'
            icon='fab fa-spotify'
            value={ this.state.spotify }
            onChange={ this.onChange } 
            error={ errors.spotify } 
          />
          <InputGroup 
            placeholder='Mixcloud Profile URL'
            name='mixcloud'
            icon='fab fa-mixcloud'
            value={ this.state.mixcloud }
            onChange={ this.onChange } 
            error={ errors.mixcloud } 
          />
          <InputGroup 
            placeholder='YouTube Profile URL'
            name='youtube'
            icon='fab fa-youtube'
            value={ this.state.youtube }
            onChange={ this.onChange } 
            error={ errors.youtube } 
          />
        </div>
      )
    }
    return (
      <div className='edit-profile'>
        <h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
        <div className='row'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <div style={{ display: 'flex', justifyContent: 'center' }} className='FileUpload'>
              <Dropzone 
                style={{ 
                  borderRadius: '2px',
                  fontSize: '15px',
                  textAlign: 'center',
                  width: '100%', 
                  height: 'auto', 
                  marginRight: '20px',
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: 'lightblue' }}
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
          <form onSubmit={ this.onSubmit }>
            <TextFieldGroup 
              placeholder='Profile Username'
              name='handle'
              value={ this.state.handle } 
              onChange={ this.onChange } 
              error={ errors.handle } 
              info='A unique username for your profile URL.'
            />
            <TextFieldGroup 
              placeholder='A man has no name'
              name='stageName'
              value={ this.state.stageName }
              onChange={ this.onChange }
              error={ errors.stageName }
              info="What's your stage name?"
            />
            <SelectListGroup 
              name='style'
              value={ this.state.style }
              onChange={ this.onChange }
              error={ errors.style }
              options={options}
              info='What style best defines you?'
            />
            <TextFieldGroup 
              placeholder='Company'
              name='company'
              value={ this.state.company } 
              onChange={ this.onChange } 
              error={ errors.company } 
              info="Company you're with."
            />
            <TextFieldGroup 
              placeholder='Website'
              name='website'
              value={ this.state.website } 
              onChange={ this.onChange } 
              error={ errors.website } 
              info='Website domain'
            />
            <TextFieldGroup 
              placeholder='Location'
              name='location'
              value={ this.state.location } 
              onChange={ this.onChange } 
              error={ errors.location } 
              info='Where are you from?'
            />
            <TextAreaFieldGroup 
              placeholder='Short Bio'
              name='bio'
              value={ this.state.bio } 
              onChange={ this.onChange } 
              error={ errors.bio } 
            />
            <div>
              <button type='button' onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }))
              }} id='edit-profile-social-btn'>Add Social Network Links</button>
              <span style={{ color: '#555', marginLeft: '10px' }}>Optional</span>
            </div>
            { socialInputs }
            <input type="submit" value="Submit" id='edit-profile-submit-btn' />
          </form>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))