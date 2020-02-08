import React, { useState } from 'react'
import Arrow from '../../../../UI/arrow_glyph/Arrow'
import './Brands.css'

export default function Brands({ brands }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = brands.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1
    setCurrentImageIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = brands.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    setCurrentImageIndex(index)
  }

  return (
    <div className="certified_brands">
      <div className="brandss">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        <img
          src={brands[currentImageIndex].image}
          alt={brands[currentImageIndex].url}
          className="promos-thumbnail"
        />
        <Arrow
          direction="right"
          styleClass="slide-arrow"
          clickFunction={nextSlide}
          glyph="&#9654;"
        />
      </div>
    </div>
  )
}
