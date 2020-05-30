function getProfileFields(req){
  const profileFields = {}
  profileFields.user = req.user.id
  req.body.avatar ? profileFields.avatar = req.body.avatar : profileFields.avatar = req.user.avatar
  if (req.body.banner) profileFields.banner = req.body.banner
  req.body.handle 
    ? profileFields.handle = req.body.handle.replace(/\s/g, '') 
    : profileFields.handle = req.user.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website && req.body.website.search(/^http[s]?\:\/\//) === -1) {
    let url = (`http://${req.body.website}`).trim()
    profileFields.website = url
  }
  if (!req.body.website) profileFields.website = ''
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.venues) profileFields.venues = req.body.venues
  if (req.body.stageName) profileFields.stageName = req.body.stageName.trim()
  if (req.body.style) profileFields.style = req.body.style
  if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber

  // Social
  profileFields.social = {}
  if (req.body.twitter) {
    if(req.body.twitter.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.twitter}`).trim()
      profileFields.social.twitter = url
    } else profileFields.social.twitter = req.body.twitter.trim()
  }
  if (req.body.instagram) {
    if(req.body.instagram.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.instagram}`).trim()
      profileFields.social.instagram = url
    } else profileFields.social.instagram = req.body.instagram.trim()
  }
  if (req.body.facebook) {
    if(req.body.facebook.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.facebook}`).trim()
      profileFields.social.facebook = url
    } else profileFields.social.facebook = req.body.facebook.trim()
  }
  if (req.body.linkedin) {
    if(req.body.linkedin.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.linkedin}`).trim()
      profileFields.social.linkedin = url
    } else profileFields.social.linkedin = req.body.linkedin.trim()
  }
  if (req.body.soundcloud) {
    if(req.body.soundcloud.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.soundcloud}`).trim()
      profileFields.social.soundcloud = url
    } else profileFields.social.soundcloud = req.body.soundcloud.trim()
  }
  if (req.body.spotify) {
    if(req.body.spotify.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.spotify}`).trim()
      profileFields.social.spotify = url
    } else profileFields.social.spotify = req.body.spotify.trim()
  }
  if (req.body.mixcloud) {
    if(req.body.mixcloud.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.mixcloud}`).trim()
      profileFields.social.mixcloud = url
    } else profileFields.social.mixcloud = req.body.mixcloud.trim()
  }
  if (req.body.youtube) {
    if(req.body.youtube.search(/^http[s]?\:\/\//) === -1) {
      let url = (`https://${req.body.youtube}`).trim()
      profileFields.social.youtube = url
    } else profileFields.social.youtube = req.body.youtube.trim()
  }

  return profileFields
}

module.exports = getProfileFields