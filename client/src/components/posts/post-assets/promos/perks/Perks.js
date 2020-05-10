import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../../UI/arrow_glyph/Arrow'
import '../Promos.css'

export default function Perks({ perks }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = perks.length - 1
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = perks.length - 1
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }

  return (
    <div className="perks_and_hookups">
      <div className="promo">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        <a
          href={
            perks[currentIndex] &&
            perks[currentIndex].url &&
            perks[currentIndex].url
          }
        >
          <img
            src={
              perks[currentIndex] &&
              perks[currentIndex].image &&
              perks[currentIndex].image
            }
            alt={
              perks[currentIndex] &&
              perks[currentIndex].url &&
              perks[currentIndex].url
            }
            className="promos-thumbnail"
          />
        </a>
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

Perks.propTypes = {
  perks: PropTypes.array.isRequired
}
