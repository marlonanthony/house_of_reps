import React from 'react'
import Perks from './Perks'

export default function PerksContainer({ promo }) {
  const arr = []
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'perks') arr.push(p)
    })
  return <Perks perks={arr} />
}
