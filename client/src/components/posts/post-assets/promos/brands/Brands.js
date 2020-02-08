import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../../UI/arrow_glyph/Arrow'
import '../Promos.css'

export default function Brands({ brands }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = brands.length - 1
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = brands.length - 1
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }

  return (
    <div className="certified_brands">
      <div className="promo">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        <img
          src={brands[currentIndex].image}
          alt={brands[currentIndex].url}
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

Brands.propTypes = {
  brands: PropTypes.array.isRequired
}
