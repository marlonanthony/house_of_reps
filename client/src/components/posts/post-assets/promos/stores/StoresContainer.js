import React from 'react'
import CertifiedStores from './CertifiedStores'

export default function StoresContainer({ promo }) {
  const arr = []
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'stores') arr.push(p)
    })
  return <CertifiedStores stores={arr} />
}
