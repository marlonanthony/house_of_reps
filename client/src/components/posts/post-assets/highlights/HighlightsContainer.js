import React from 'react'
import PropTypes from 'prop-types'

import Highlights from './Highlights'

export default function HighlightsContainer({ profiles, toggleHighlight }) {
  if (!profiles) return null
  const highlights = profiles
    .map(
      profile => profile.venues && profile.venues.length && profile.venues[0]
    )
    .filter(val => val)
    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))

  return (
    <Highlights highlights={highlights} toggleHighlight={toggleHighlight} />
  )
}

HighlightsContainer.propTypes = {
  profiles: PropTypes.array,
  toggleHighlight: PropTypes.func.isRequired
}
