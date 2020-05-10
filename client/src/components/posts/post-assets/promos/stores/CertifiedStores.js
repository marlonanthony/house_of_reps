import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../../UI/arrow_glyph/Arrow'
import '../Promos.css'

export default function CertifiedStores({ stores }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = stores.length - 1
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = stores.length - 1
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }
  return (
    <div className="stores_container">
      <div className="promo">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        <a
          href={
            stores[currentIndex] &&
            stores[currentIndex].url &&
            stores[currentIndex].url
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              stores[currentIndex] &&
              stores[currentIndex].image &&
              stores[currentIndex].image
            }
            alt={
              stores[currentIndex] &&
              stores[currentIndex].url &&
              stores[currentIndex].url
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

CertifiedStores.propTypes = {
  stores: PropTypes.array.isRequired
}
