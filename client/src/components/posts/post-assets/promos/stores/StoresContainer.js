import React from 'react'
import CertifiedStores from './CertifiedStores'

export default function StoresContainer({ profiles }) {
  if (!profiles) return null
  // eslint-disable-next-line array-callback-return
  return profiles.map(profile => {
    if (profile.stores && profile.stores.length) {
      return <CertifiedStores key={profile._id} stores={profile.stores} />
    }
  })
}
