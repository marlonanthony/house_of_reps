import React from 'react'
import CertifiedStores from './CertifiedStores'

export default function StoresContainer({ profiles }) {
  if (!profiles) return null
  return profiles.map(
    profile =>
      profile.stores &&
      profile.stores.length && (
        <CertifiedStores key={profile._id} stores={profile.stores} />
      )
  )
}
