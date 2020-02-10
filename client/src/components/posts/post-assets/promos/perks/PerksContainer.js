import React from 'react'
import Perks from './Perks'

export default function PerksContainer({ profiles }) {
  if (!profiles) return null
  // eslint-disable-next-line array-callback-return
  return profiles.map(profile => {
    if (profile.perks && profile.perks.length) {
      return <Perks key={profile._id} perks={profile.perks} />
    }
  })
}
