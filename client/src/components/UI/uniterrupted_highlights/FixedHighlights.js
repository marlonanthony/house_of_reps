import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProfiles } from '../../../actions/profileActions'
import Arrow from '../arrow_glyph/Arrow'
import './FixedHighlights.css'

class FixedHighlights extends Component {
  state = {
    currentImageIndex: 0,
    recentHighlights: []
  }

  componentDidUpdate(prevProps) {
    const { profiles } = this.props.profile
    if (profiles !== prevProps.profile.profiles) {
      const recentHighlights =
        this.props.profile &&
        profiles &&
        profiles
          .map(
            profile =>
              profile.venues && profile.venues.length && profile.venues[0]
          )
          .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
      this.setState({ recentHighlights })
    }
  }

  previousSlide = () => {
    const { recentHighlights, currentImageIndex } = this.state
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1
    this.setState({ currentImageIndex: index })
  }

  nextSlide = () => {
    const { recentHighlights, currentImageIndex } = this.state
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    this.setState({ currentImageIndex: index })
  }

  render() {
    const { recentHighlights, currentImageIndex } = this.state
    const { profiles } = this.props.profile
    const { toggleHighlight, showHighlight } = this.props
    if (!showHighlight) return null
    if (!profiles || !recentHighlights.length) return null

    return (
      recentHighlights[currentImageIndex] &&
      recentHighlights[currentImageIndex].video && (
        <div className="fixed_highlights_container">
          <div className="fixed_highlights">
            <Arrow
              direction="left"
              styleClass="slide-arrow"
              clickFunction={this.previousSlide}
              glyph="&#9664;"
            />
            <iframe
              title={recentHighlights[currentImageIndex].video}
              src={recentHighlights[currentImageIndex].video}
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
              clickFunction={this.nextSlide}
              glyph="&#9654;"
            />
          </div>
        </div>
      )
    )
  }
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
