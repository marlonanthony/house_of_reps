import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../UI/arrow_glyph/Arrow'
import './Highlights.css'

function Highlights({ highlights, toggleHighlight }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousSlide = () => {
    const lastIndex = highlights.length - 1
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = highlights.length - 1
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }

  if (!highlights) return null

  return (
    <div className="post-feed-highlights">
      <div className="highlightss">
        <Arrow
          direction="left"
          styleClass="slide-arrow"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
        {highlights[currentIndex] && highlights[currentIndex].video && (
          <iframe
            className="postfeed-highlight-iframe"
            title={highlights[currentIndex].video}
            src={highlights[currentIndex].video}
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        )}
        <img
          onClick={toggleHighlight}
          className="highlights_logo"
          src={require('../../../../img/hor-icon.jpg')}
          alt="HORs logo"
          title="toggle modal"
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

Highlights.propTypes = {
  highlights: PropTypes.array.isRequired,
  toggleHighlight: PropTypes.func.isRequired
}

export default Highlights
