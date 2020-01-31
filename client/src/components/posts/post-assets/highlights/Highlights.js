import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { likeVenue } from '../../../../actions/profileActions'
import Backdrop from '../../../UI/backdrop/Backdrop'
import Arrow from '../../../UI/arrow_glyph/Arrow'
import HighlightsModal from '../../../UI/modal/highlights-modal/HighlightsModal'
import './Highlights.css'

class Highlights extends Component {
  state = {
    currentImageIndex: 0,
    showModal: false
  }

  previousSlide = () => {
    const { recentHighlights } = this.props
    const { currentImageIndex } = this.state
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index })
  }

  nextSlide = () => {
    const { recentHighlights } = this.props
    const { currentImageIndex } = this.state
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index })
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  likeHighlight = (venueId, venueUserId) => {
    this.props.likeVenue(venueId, venueUserId)
  }

  render() {
    if (!this.props.recentHighlights) return null
    const { recentHighlights, toggleHighlight } = this.props

    const highlightsModal = this.state.showModal && (
      <>
        <HighlightsModal>
          <div style={{ color: '#ccc' }}>
            <Arrow
              direction="left"
              styleClass="modal-slide-arrow"
              clickFunction={() => this.previousSlide()}
              glyph="&#9664;"
            />
            {recentHighlights[this.state.currentImageIndex].title && (
              <p style={{ color: 'rgb(29, 138, 255)' }}>
                {recentHighlights[this.state.currentImageIndex].title}
              </p>
            )}
            {recentHighlights[this.state.currentImageIndex].video && (
              <iframe
                title={recentHighlights[this.state.currentImageIndex].video}
                style={{ width: '95%', height: '50vh' }}
                src={recentHighlights[this.state.currentImageIndex].video}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            )}
            {
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 10
                }}
              >
                <i
                  onClick={() =>
                    this.likeHighlight(
                      recentHighlights[this.state.currentImageIndex]._id,
                      recentHighlights[this.state.currentImageIndex].user
                    )
                  }
                  className="fas fa-thumbs-up icons"
                  style={{ color: 'cyan', cursor: 'pointer' }}
                ></i>
                <p style={{ color: 'cyan' }}>
                  {recentHighlights[this.state.currentImageIndex].likes &&
                    recentHighlights[this.state.currentImageIndex].likes.length}
                </p>
              </div>
            }
            <Arrow
              direction="right"
              styleClass="modal-slide-arrow"
              clickFunction={() => this.nextSlide()}
              glyph="&#9654;"
            />
          </div>
        </HighlightsModal>
      </>
    )

    return (
      <>
        <div className="post-feed-highlights">
          <div className="highlightss">
            <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
            {highlightsModal}
            <div style={{ position: 'absolute' }}>
              <Arrow
                direction="left"
                styleClass="slide-arrow"
                clickFunction={() => this.previousSlide()}
                glyph="&#9664;"
              />
              {recentHighlights[this.state.currentImageIndex] &&
                recentHighlights[this.state.currentImageIndex].video && (
                  <iframe
                    title={recentHighlights[this.state.currentImageIndex].video}
                    style={{ width: '250px', height: '250px' }}
                    src={recentHighlights[this.state.currentImageIndex].video}
                    frameBorder={0}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                  ></iframe>
                )}
              <img
                onClick={toggleHighlight}
                className="highlightss_icon"
                src={require('../../../../img/hor-icon.jpg')}
                alt="hors"
                title="toggle modal"
              />
              <Arrow
                direction="right"
                styleClass="slide-arrow"
                clickFunction={() => this.nextSlide()}
                glyph="&#9654;"
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

Highlights.propTypes = {
  likeVenue: PropTypes.func.isRequired,
  recentHighlights: PropTypes.array.isRequired,
  toggleHighlight: PropTypes.func.isRequired
}

export default connect(
  null,
  { likeVenue }
)(Highlights)
