import React from 'react'
import Perks from './Perks'

export default function PerksContainer({ profiles }) {
  if (!profiles) return null
  return profiles.map(
    profile =>
      profile.perks && profile.perks.length && <Perks perks={profile.perks} />
  )
}
