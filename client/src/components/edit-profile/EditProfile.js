import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import request from 'superagent' 

import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import Input from '../common/inputs/Input'
import TextArea from '../common/textarea/TextArea'
import SelectList from '../common/SelectList'
import SocialLinksInput from '../common/inputs/SocialLinksInput'
import Avatar from './Avatar'
import isEmpty from '../../validation/is-empty'
import './EditProfile.css'

const CLOUDINARY_UPLOAD_PRESET = 'btq6upaq'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbwifrjvy/image/upload'

const EditProfile = ({
  getCurrentProfile,
  createProfile,
  profile,
  auth,
  ...props
}) => {

  const [banner, setBanner] = useState(''),
        [errors, setErrors] = useState({}),
        [avatar, setAvatar] = useState(''),
        [phoneNumber, setPhoneNumber] = useState(''),
        [stageName, setStageName] = useState(''),
        [company, setCompany] = useState(''),
        [website, setWebsite] = useState(''),
        [location, setLocation] = useState(''),
        [bio, setBio] = useState(''),
        [style, setStyle] = useState(''),
        [twitter, setTwitter] = useState(''),
        [instagram, setInstagram] = useState(''),
        [facebook, setFacebook] = useState(''),
        [linkedin, setLinkedin] = useState(''),
        [soundcloud, setSoundcloud] = useState(''),
        [spotify, setSpotify] = useState(''),
        [mixcloud, setMixcloud] = useState(''),
        [youtube, setYoutube]= useState(''),
        [displaySocialInputs, setDisplaySocialInputs] = useState(false),
        [uploadedFileCloudinaryUrl, setUploadedFileCloudinaryUrl] = useState(''),
        [uploadedFile, setUploadedFile] = useState('')

  useEffect(() => {
    if(isEmpty(profile.profile)) getCurrentProfile()
    setErrors(props.errors)
  }, [props.errors])

  useEffect(() => {
    console.log(auth.user)
    if(!isEmpty(profile.profile)) {
      const p = profile.profile
      p.avatar = !isEmpty(auth.user.avatar) ? auth.user.avatar : '' 
      p.banner = !isEmpty(p.banner) ? p.banner : ''
      p.stageName = !isEmpty(p.stageName) ? p.stageName : ''
      p.phoneNumber = !isEmpty(p.phoneNumber) ? p.phoneNumber : ''
      p.company = !isEmpty(p.company) ? p.company : ''
      p.website = !isEmpty(p.website) ? p.website : ''
      p.location = !isEmpty(p.location) ? p.location : ''
      p.bio = !isEmpty(p.bio) ? p.bio : ''
      p.style = !isEmpty(p.style) ? p.style : ''
      p.social = !isEmpty(p.social) ? p.social : {} 
      p.twitter = !isEmpty(p.social.twitter) ? p.social.twitter : ''
      p.instagram = !isEmpty(p.social.instagram) ? p.social.instagram : ''
      p.facebook = !isEmpty(p.social.facebook) ? p.social.facebook : ''
      p.linkedin = !isEmpty(p.social.linkedin) ? p.social.linkedin : ''
      p.soundcloud = !isEmpty(p.social.soundcloud) ? p.social.soundcloud : ''
      p.spotify = !isEmpty(p.social.spotify) ? p.social.spotify : ''
      p.mixcloud = !isEmpty(p.social.mixcloud) ? p.social.mixcloud : ''
      p.youtube = !isEmpty(p.social.youtube) ? p.social.youtube : ''

      setAvatar(p.avatar)
      setBanner(p.banner)
      setStageName(p.stageName)
      setPhoneNumber(p.phoneNumber)
      setCompany(p.company)
      setWebsite(p.website)
      setLocation(p.location)
      setBio(p.bio)
      setStyle(p.style)
      setTwitter(p.twitter)
      setInstagram(p.instagram)
      setFacebook(p.facebook)
      setLinkedin(p.linkedin)
      setSoundcloud(p.soundcloud)
      setSpotify(p.spotify)
      setMixcloud(p.mixcloud)
      setYoutube(p.youtube)
    }
  }, [profile.profile])

  const onSubmit = e => {
    e.preventDefault()
    
    const profileData = {
      avatar,
      banner,
      stageName,
      phoneNumber,
      company,
      website,
      location,
      bio,
      style,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
      soundcloud,
      spotify,
      mixcloud
    }
    createProfile(profileData, props.history)
  }

  const onImageDrop = files => {
    setUploadedFile(files[0])
    handleImageUpload(files[0])
  }

  const handleImageUpload = file => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file) 
    
    upload.end((err, response) => {
      if(err) console.log(err) 
      if(response.body.secure_url !== '') {
        setUploadedFileCloudinaryUrl(response.body.secure_url)
        setAvatar(response.body.secure_url)
      }
    })
  }
  
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
        <SocialLinksInput 
          placeholder='Twitter Profile URL'
          name='twitter'
          icon='fab fa-twitter'
          value={ twitter }
          onChange={e => setTwitter(e.target.value) } 
          error={ errors.twitter } 
        />
        <SocialLinksInput 
          placeholder='Facebook Profile URL'
          name='facebook'
          icon='fab fa-facebook'
          value={ facebook }
          onChange={ e => setFacebook(e.target.value) } 
          error={ errors.facebook } 
        />
        <SocialLinksInput 
          placeholder='Linkedin Profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          value={ linkedin }
          onChange={ e => setLinkedin(e.target.value) } 
          error={ errors.linkedin } 
        />
        <SocialLinksInput 
          placeholder='Instagram Profile URL'
          name='instagram'
          icon='fab fa-instagram'
          value={ instagram }
          onChange={ e => setInstagram(e.target.value) } 
          error={ errors.instagram } 
        />
        <SocialLinksInput 
          placeholder='SoundCloud Profile URL'
          name='soundcloud'
          icon='fab fa-soundcloud'
          value={ soundcloud }
          onChange={ e => setSoundcloud(e.target.value) } 
          error={ errors.soundcloud } 
        />
        <SocialLinksInput 
          placeholder='Spotify Profile URL'
          name='spotify'
          icon='fab fa-spotify'
          value={ spotify }
          onChange={ e => setSpotify(e.target.value) } 
          error={ errors.spotify } 
        />
        <SocialLinksInput 
          placeholder='Mixcloud Profile URL'
          name='mixcloud'
          icon='fab fa-mixcloud'
          value={ mixcloud }
          onChange={ e => setMixcloud(e.target.value) } 
          error={ errors.mixcloud } 
        />
        <SocialLinksInput 
          placeholder='YouTube Profile URL'
          name='youtube'
          icon='fab fa-youtube'
          value={ youtube }
          onChange={ e => setYoutube(e.target.value) } 
          error={ errors.youtube } 
        />
      </div>
    )
  }
  return (
    <div className='edit-profile'>
      <i 
        onClick={props.history.goBack} 
        id='edit-profile-back-button' 
        className='fas fa-arrow-alt-circle-left' 
        alt='back-button' 
      />
      <h2>Edit Profile</h2>
      <div className='djpools_input_wrapper'>
        <Avatar
            onImageDrop={onImageDrop}
            uploadedFile={uploadedFile}
            uploadedFileCloudinaryUrl={uploadedFileCloudinaryUrl}
        />
        <form onSubmit={ onSubmit }>
          <Input 
            placeholder='A man has no name'
            name='stageName'
            value={ stageName }
            onChange={e => setStageName(e.target.value) }
            error={ errors.stageName }
            info="What's your stage name?"
          />
          <Input 
            placeholder='Company'
            name='company'
            value={ company } 
            onChange={ e => setCompany(e.target.value) } 
            error={ errors.company } 
            info="Company you're with."
          />
          <Input 
            placeholder='Website'
            name='website'
            value={ website } 
            onChange={ e => setWebsite(e.target.value) } 
            error={ errors.website } 
            info='Website domain'
          />
          <Input 
            placeholder='Location'
            name='location'
            value={ location } 
            onChange={ e => setLocation(e.target.value) } 
            error={ errors.location } 
            info='Where are you from?'
          />
          <TextArea  
            placeholder='Short Bio'
            name='bio'
            value={ bio } 
            onChange={ e => setBio(e.target.value) } 
            error={ errors.bio } 
            info='Say a little bit about yourself' 
          />
          <SelectList 
            name='style'
            value={ style }
            onChange={ e => setStyle(e.target.value) }
            error={ errors.style }
            options={options}
            info='What style best defines you?'
          />
          <div className='add-social-links-button'>
            <button type='button' onClick={() => {
              setDisplaySocialInputs(p => !p)
            }} id='create-profile-social-btn'>Add Social Network Links</button>
          </div>
          { socialInputs }
          <input type="submit" value="Submit" className='create-profile-submit-button' />
        </form>
      </div>
    </div>
  )
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth 
})

export default connect(mapStateToProps, { 
  createProfile, 
  getCurrentProfile
})(withRouter(EditProfile))