import React from 'react'
import DjPools from './DjPools'

export default function PoolsContainer({ profiles }) {
  if (!profiles) return null

  return profiles.map(
    profile =>
      profile.djpools &&
      profile.djpools.length && <DjPools djpools={profile.djpools} />
  )
}
