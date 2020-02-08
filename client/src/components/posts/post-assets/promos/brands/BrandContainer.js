import React from 'react'
import Brands from './Brands'

const BrandContainer = ({ profiles }) => {
  if (!profiles) return null
  return profiles.map(
    profile =>
      profile.brands &&
      profile.brands.length && (
        <Brands key={profile._id} brands={profile.brands} />
      )
  )
}

export default BrandContainer
