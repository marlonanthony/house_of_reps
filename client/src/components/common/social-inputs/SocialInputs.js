import React from 'react'
import SocialLinksInput from '../inputs/SocialLinksInput'

export default function SocialInputs({
  displaySocialInputs,
  twitter,
  facebook,
  linkedin,
  instagram,
  soundcloud,
  spotify,
  mixcloud,
  youtube,
  setTwitter,
  setFacebook,
  setLinkedin,
  setInstagram,
  setSoundcloud,
  setSpotify,
  setMixcloud,
  setYoutube,
  errors
}) {
  return (
    displaySocialInputs && (
      <div>
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
  )
}
