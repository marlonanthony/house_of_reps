import React from 'react'
import Brands from './Brands'

const BrandContainer = ({ profiles }) => {
  if (!profiles) return null
  // eslint-disable-next-line array-callback-return
  return profiles.map(profile => {
    if (profile.brands && profile.brands.length)
      return <Brands key={profile._id} brands={profile.brands} />
  })
}

export default BrandContainer
