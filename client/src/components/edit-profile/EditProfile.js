import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import { handleImageUpload } from '../../utils/handle_image_upload/handleImageUpload'
import Input from '../common/inputs/Input'
import TextArea from '../common/textarea/TextArea'
import SelectList from '../common/select_list/SelectList'
import SocialInputs from '../common/social-inputs/SocialInputs'
import DropZoneContainer from '../UI/dropzone/DropZoneContainer'
import isEmpty from '../../utils/is_empty/is-empty'
import BackButton from '../UI/buttons/back-btn/BackButton'
import SubmitButton from '../UI/buttons/submit-btn/SubmitButton'
import { options } from '../create-profile/options'
import './EditProfile.css'

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
    [youtube, setYoutube] = useState(''),
    [displaySocialInputs, setDisplaySocialInputs] = useState(false),
    [uploadedFileCloudinaryUrl, setUploadedFileCloudinaryUrl] = useState(''),
    [uploadedFile, setUploadedFile] = useState({})

  useEffect(() => {
    if (isEmpty(profile.profile)) getCurrentProfile()
    setErrors(props.errors)
  }, [props.errors])

  useEffect(() => {
    if (!isEmpty(profile.profile)) {
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
    handleImageUpload(files[0], setUploadedFileCloudinaryUrl, setAvatar)
  }

  return (
    <div className="edit-profile">
      <BackButton />
      <h2>Edit Profile</h2>
      <div className="promos_input_wrapper">
        <DropZoneContainer
          onImageDrop={onImageDrop}
          uploadedFileCloudinaryUrl={uploadedFileCloudinaryUrl}
          uploadedFile={uploadedFile}
        />
        <form onSubmit={onSubmit}>
          <Input
            placeholder="A man has no name"
            name="stageName"
            value={stageName}
            onChange={e => setStageName(e.target.value)}
            error={errors.stageName}
            info="What's your stage name?"
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

export default connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(EditProfile)
