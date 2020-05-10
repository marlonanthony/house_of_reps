import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Arrow from '../../../../UI/arrow_glyph/Arrow'
import '../Promos.css'

export default function DjPools({ djpools }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }

  return (
    <div className="djpools">
      <div className="promo">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        <a
          href={
            djpools[currentIndex] &&
            djpools[currentIndex].url &&
            djpools[currentIndex].url
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              djpools[currentIndex] &&
              djpools[currentIndex].image &&
              djpools[currentIndex].image
            }
            alt={
              djpools[currentIndex] &&
              djpools[currentIndex].url &&
              djpools[currentIndex].url
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

DjPools.propTypes = {
  djpools: PropTypes.array.isRequired
}
