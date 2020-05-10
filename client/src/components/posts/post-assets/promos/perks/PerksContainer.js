import React from 'react'
import Perks from './Perks'

export default function PerksContainer({ promo }) {
  const arr = [
    {
      image:
        'https://res.cloudinary.com/dbwifrjvy/image/upload/v1550479258/stj3a6geky2kab86argx.jpg',
      url: '#'
    }
  ]
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'perks') arr.push(p)
    })
  return <Perks perks={arr} />
}
