import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Input from '../common/inputs/Input'
import TextArea from '../common/textarea/TextArea'
import SelectList from '../common/SelectList'
import { createProfile } from '../../actions/profileActions'
import SubmitButton from '../UI/buttons/submit-btn/SubmitButton'
import SocialInputs from '../common/social-inputs/SocialInputs'
import { options } from './options'
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

  return (
    <div>
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
          <SubmitButton
            onClick={() => {
              setDisplaySocialInputs(prev => !prev)
            }}
            type="button"
            text="Add Social Network Links"
          />
          <SocialInputs
            displaySocialInputs={displaySocialInputs}
            twitter={twitter}
            facebook={facebook}
            linkedin={linkedin}
            instagram={instagram}
            soundcloud={soundcloud}
            spotify={spotify}
            mixcloud={mixcloud}
            youtube={youtube}
            setTwitter={setTwitter}
            setFacebook={setFacebook}
            setLinkedin={setLinkedin}
            setInstagram={setInstagram}
            setSoundcloud={setSoundcloud}
            setSpotify={setSpotify}
            setMixcloud={setMixcloud}
            setYoutube={setYoutube}
            errors={errors}
          />
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
