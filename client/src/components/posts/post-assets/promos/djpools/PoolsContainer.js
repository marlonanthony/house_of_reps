import React from 'react'
import DjPools from './DjPools'

export default function PoolsContainer({ promo }) {
  const arr = []
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'djpools') arr.push(p)
    })
  return <DjPools djpools={arr} />
}
