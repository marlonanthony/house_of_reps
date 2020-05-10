import React from 'react'
import Brands from './Brands'

const BrandContainer = ({ promo }) => {
  const arr = [
    {
      image:
        'https://res.cloudinary.com/dbwifrjvy/image/upload/v1550478819/zwy1fjhmbglilbppksf5.jpg',
      url: '#'
    }
  ]
  promo &&
    promo.promos &&
    promo.promos.forEach(p => {
      if (p.type === 'brands') arr.push(p)
    })
  return <Brands brands={arr} />
}

export default BrandContainer
