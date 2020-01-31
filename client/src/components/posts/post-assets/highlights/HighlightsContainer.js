import React from 'react'
import PropTypes from 'prop-types'

import Highlights from './Highlights'

export default function HighlightsContainer({
  profiles,
  loading,
  toggleHighlight
}) {
  let highlights, orderedHighlights

  if (!profiles || loading) highlights = null
  else {
    let hls = profiles
      .map(profile => profile.venues)
      .map(val => (val.length ? val[0] : null))
      .filter(val => val !== null)
    highlights = [].concat.apply([], hls)
    orderedHighlights =
      highlights &&
      highlights.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      )
  }
  return (
    <Highlights
      recentHighlights={orderedHighlights}
      toggleHighlight={toggleHighlight}
    />
  )
}

HighlightsContainer.propTypes = {
  profiles: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  toggleHighlight: PropTypes.func.isRequired
}
