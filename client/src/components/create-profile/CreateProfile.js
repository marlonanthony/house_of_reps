import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Input from '../common/inputs/Input'
import TextArea from '../common/textarea/TextArea'
import SelectList from '../common/SelectList'
import SocialLinksInput from '../common/inputs/SocialLinksInput'
import { createProfile } from '../../actions/profileActions'
import SubmitButton from '../UI/icons/submit-btn/SubmitButton'
import './CreateProfile.css'

const CreateProfile = ({ createProfile, auth, ...props }) => {
  const [banner] = useState(''),
    [errors, setErrors] = useState({}),
    [phoneNumber] = useState(''),
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
    [youtube, setYoutube] = useState(''),
    [displaySocialInputs, setDisplaySocialInputs] = useState(false)

  useEffect(() => {
    setErrors(props.errors)
  }, [props.errors])

  const onSubmit = e => {
    e.preventDefault()

    const profileData = {
      banner,
      handle: auth.user.handle,
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

  if (displaySocialInputs) {
    socialInputs = (
      <div id="social-inputs">
        <SocialLinksInput
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={e => setTwitter(e.target.value)}
          error={errors.twitter}
        />
        <SocialLinksInput
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={e => setFacebook(e.target.value)}
          error={errors.facebook}
        />
        <SocialLinksInput
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          onChange={e => setLinkedin(e.target.value)}
          error={errors.linkedin}
        />
        <SocialLinksInput
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
          error={errors.instagram}
        />
        <SocialLinksInput
          placeholder="SoundCloud Profile URL"
          name="soundcloud"
          icon="fab fa-soundcloud"
          value={soundcloud}
          onChange={e => setSoundcloud(e.target.value)}
          error={errors.soundcloud}
        />
        <SocialLinksInput
          placeholder="Spotify Profile URL"
          name="spotify"
          icon="fab fa-spotify"
          value={spotify}
          onChange={e => setSpotify(e.target.value)}
          error={errors.spotify}
        />
        <SocialLinksInput
          placeholder="Mixcloud Profile URL"
          name="mixcloud"
          icon="fab fa-mixcloud"
          value={mixcloud}
          onChange={e => setMixcloud(e.target.value)}
          error={errors.mixcloud}
        />
        <SocialLinksInput
          placeholder="YouTube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={e => setYoutube(e.target.value)}
          error={errors.youtube}
        />
      </div>
    )
  }

  return (
    <div className="create-profile">
      <h2>Create Your Profile</h2>
      <div className="createprofilecontainer">
        <form onSubmit={onSubmit}>
          <Input
            placeholder="A man has no name"
            name="stageName"
            value={stageName}
            onChange={e => setStageName(e.target.value)}
            error={errors.stageName}
            info="DJ name?"
          />
          <Input
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => setCompany(e.target.value)}
            error={errors.company}
            info="Company you're with."
          />
          <Input
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            error={errors.website}
            info="Website domain"
          />
          <Input
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            error={errors.location}
            info="Where are you from?"
          />
          <TextArea
            placeholder="Short Bio"
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            error={errors.bio}
            info="Say a little bit about yourself"
          />
          <SelectList
            name="style"
            value={style}
            onChange={e => setStyle(e.target.value)}
            error={errors.style}
            options={options}
            info="What style best defines you?"
          />
          <div className="add-social-links-button">
            <button
              type="button"
              onClick={() => {
                setDisplaySocialInputs(prev => !prev)
              }}
              id="create-profile-social-btn"
            >
              Add Social Network Links
            </button>
          </div>
          {socialInputs}
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile))
