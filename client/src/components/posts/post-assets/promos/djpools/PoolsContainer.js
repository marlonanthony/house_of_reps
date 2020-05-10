import React from 'react'
import DjPools from './DjPools'

export default function PoolsContainer({ promo }) {
  const arr = [
    {
      type: 'djpools',
      url: '#',
      image:
        'https://res.cloudinary.com/dbwifrjvy/image/upload/v1567302432/z3vseskynycpkeorrnna.jpg'
    }
  ]
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'djpools') arr.push(p)
    })
  return <DjPools djpools={arr} />
}
