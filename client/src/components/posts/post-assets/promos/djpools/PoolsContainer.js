import React from 'react'
import DjPools from './DjPools'

export default function PoolsContainer({ profiles }) {
  if (!profiles) return null
  // eslint-disable-next-line array-callback-return
  return profiles.map(profile => {
    if (profile.djpools && profile.djpools.length)
      return <DjPools key={profile._id} djpools={profile.djpools} />
  })
}
