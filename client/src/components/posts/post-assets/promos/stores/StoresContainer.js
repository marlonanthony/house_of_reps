import React from 'react'
import CertifiedStores from './CertifiedStores'

export default function StoresContainer({ promo }) {
  const arr = [
    {
      type: 'stores',
      image:
        'https://res.cloudinary.com/dbwifrjvy/image/upload/v1550479000/ba7desr6olho3i2b4lsl.jpg',
      url: '#'
    }
  ]
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'stores') arr.push(p)
    })
  return <CertifiedStores stores={arr} />
}
