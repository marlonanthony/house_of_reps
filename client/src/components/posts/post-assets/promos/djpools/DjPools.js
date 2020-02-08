import React, { useState } from 'react'
import Arrow from '../../../../UI/arrow_glyph/Arrow'
import './DjPools.css'
import '../Promos.css'

export default function DjPools({ djpools }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1
    setCurrentImageIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    setCurrentImageIndex(index)
  }

  return (
    <div className="djpools">
      <div className="djpool">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        <a
          href={djpools[currentImageIndex].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={djpools[currentImageIndex].image}
            alt={djpools[currentImageIndex].url}
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
