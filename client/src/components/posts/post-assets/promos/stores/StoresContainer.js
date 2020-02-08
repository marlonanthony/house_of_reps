import React from 'react'
import CertifiedStores from './CertifiedStores'

export default function StoresContainer({ profiles }) {
  if (!profiles) return null
  return profiles.map(
    val =>
      val.stores && val.stores.length && <CertifiedStores stores={val.stores} />
  )
}
