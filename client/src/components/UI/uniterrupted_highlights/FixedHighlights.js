import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProfiles } from '../../../actions/profileActions'
import Arrow from '../arrow_glyph/Arrow'
import './FixedHighlights.css'

const FixedHighlights = ({
  getProfiles,
  profile,
  toggleHighlight,
  showHighlight
}) => {
  const [currentIndex, setCurrentIndex] = useState(0),
    [recentHighlights, setRecentHighlights] = useState([])

  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  useEffect(() => {
    const profiles =
      profile.profiles &&
      profile.profiles
        .map(
          person => person.venues && person.venues.length && person.venues[0]
        )
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    setRecentHighlights(profiles)
  }, [profile.profiles, setRecentHighlights])

  const previousSlide = () => {
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }

  if (!showHighlight) return null
  if (!profile && !profile.profiles && !recentHighlights.length) return null

  return (
    recentHighlights[currentIndex] &&
    recentHighlights[currentIndex].video && (
      <div className="fixed_highlights_container">
        <div className="fixed_highlights">
          <Arrow
            direction="left"
            styleClass="slide-arrow"
            clickFunction={previousSlide}
            glyph="&#9664;"
          />
          <iframe
            title={recentHighlights[currentIndex].video}
            src={recentHighlights[currentIndex].video}
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
          <img
            onClick={toggleHighlight}
            src={require('../../../img/hor-icon.jpg')}
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
  )
}

FixedHighlights.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  toggleHighlight: PropTypes.func.isRequired,
  showHighlight: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getProfiles }
)(FixedHighlights)
