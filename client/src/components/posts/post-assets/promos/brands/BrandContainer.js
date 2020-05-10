import React from 'react'
import Brands from './Brands'

const BrandContainer = ({ promo }) => {
  const arr = []
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'brands') arr.push(p)
    })
  return <Brands brands={arr} />
}

export default BrandContainer
