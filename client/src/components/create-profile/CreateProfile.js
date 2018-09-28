import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { createProfile } from '../../actions/profileActions'

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    bio: '',
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
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
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
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={ this.onSubmit }>
                <TextFieldGroup 
                  placeholder='* Profile Handle'
                  name='handle'
                  value={ this.state.handle } 
                  onChange={ this.onChange } 
                  error={ errors.handle } 
                  info='A unique handle for your profile URL. Your full name, company name, nickname, etc.'
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
                  info='Tell us a little bit about yourself' 
                />
                <div className="mb-3">
                  <button type='button' onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                  }} className="btn btn-light">Add Social Network Links</button>
                  <span className='text-muted'>Optional</span>
                </div>
                { socialInputs }
                <input type="submit" value="submit" className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))