import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import CreateProfileTextFieldGroup from '../common/create-profile-inputs/CreateProfileTextFieldGroup'
import CreateProfileTextAreaFieldGroup from '../common/create-profile-inputs/CreateProfileTextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { createProfile } from '../../actions/profileActions'
import './CreateProfile.css'

class CreateProfile extends Component {
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
    errors: {} 
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
    
    const profileData = {
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
        <div id='social-inputs'>
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
      <div className='create-profile'>
        <h1 style={{ textAlign: 'center', paddingTop: '60px', color: '#aaa' }}>Create Your Profile</h1>
        <p style={{ textAlign: 'center', color: '#888' }}>Let's get some information to make your profile stand out</p>
        <div className='createprofilecontainer'>
          <form onSubmit={ this.onSubmit }>
            <CreateProfileTextFieldGroup 
              placeholder='* Profile Username'
              name='handle'
              value={ this.state.handle } 
              onChange={ this.onChange } 
              error={ errors.handle } 
              info='A unique username for your profile URL.'
            />
            <CreateProfileTextFieldGroup 
              placeholder='A man has no name'
              name='stageName'
              value={ this.state.stageName }
              onChange={ this.onChange }
              error={ errors.stageName }
              info="What's your stage name?"
            />
            <CreateProfileTextFieldGroup 
              placeholder='Company'
              name='company'
              value={ this.state.company } 
              onChange={ this.onChange } 
              error={ errors.company } 
              info="Company you're with."
            />
            <CreateProfileTextFieldGroup 
              placeholder='Website'
              name='website'
              value={ this.state.website } 
              onChange={ this.onChange } 
              error={ errors.website } 
              info='Website domain'
            />
            <CreateProfileTextFieldGroup 
              placeholder='Location'
              name='location'
              value={ this.state.location } 
              onChange={ this.onChange } 
              error={ errors.location } 
              info='Where are you from?'
            />
            <SelectListGroup 
              name='style'
              value={ this.state.style }
              onChange={ this.onChange }
              error={ errors.style }
              options={options}
              info='What style best defines you?'
            />
              <CreateProfileTextAreaFieldGroup 
                placeholder='Short Bio'
                name='bio'
                value={ this.state.bio } 
                onChange={ this.onChange } 
                error={ errors.bio } 
                info='Tell us a little bit about yourself' 
              />
            <div className='add-social-links-button'>
              <button type='button' onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }))
              }} id="create-profile-social-btn">Add Social Network Links</button>
              <span className=''>Optional</span>
            </div>
            { socialInputs }
            <input type="submit" value="Submit" id='create-profile-submit-button' />
          </form>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))