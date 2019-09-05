import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProfiles } from '../../../actions/profileActions'
import Arrow from '../arrow_glyph/Arrow'

class FixedHighlights extends Component {
  state = { 
    currentImageIndex: 0,
    recentHighlights: []
  }

  componentDidMount() {
    this.props.getProfiles()
    .then(() => {
      const hls = this.props.profile.profiles.map(profile => profile.venues).map(val => val.length ? val[0] : null).filter(val => val !== null),
          highlights = [].concat.apply([], hls),
          recentHighlights = highlights && highlights.sort((a,b) => new Date(b.dateCreated) - new Date(a.dateCreated))
      this.setState({ recentHighlights })
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.currentIndex !== prevProps.currentIndex) {
      this.setState({ currentImageIndex: this.props.currentIndex })
    }
  }

  previousSlide = () => {
    const { recentHighlights } = this.state 
    const { currentImageIndex } = this.state 
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1
    this.setState({ currentImageIndex: index })
  }

  nextSlide = () => {
    const { recentHighlights } = this.state 
    const { currentImageIndex } = this.state 
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    this.setState({ currentImageIndex: index })
  }

  render() {
    const { profiles, loading } = this.props.profile
    if(!this.props.showHighlight) return null
    if(!profiles || loading || !this.state.recentHighlights) return null

    return (
      <div style={{  margin: '0 auto', maxWidth: 550 }}>
        <div style={{position: 'fixed', maxWidth: 550, width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
          {this.state.recentHighlights[this.state.currentImageIndex] && this.state.recentHighlights[this.state.currentImageIndex].video ?
          <iframe 
            title={this.state.recentHighlights[this.state.currentImageIndex].video} 
            style={{
              height: '75px',
              width: '100%',
              maxWidth: '500px',
              top: 0
            }}
            src={this.state.recentHighlights[this.state.currentImageIndex].video} 
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen={true}>
          </iframe>
            : this.state.recentHighlights[this.state.currentImageIndex] && this.state.recentHighlights[this.state.currentImageIndex].image 
            ? <img src={this.state.recentHighlights[this.state.currentImageIndex].image} alt="highlights"/>
            : null }
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}

FixedHighlights.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.loading
})

export default connect(mapStateToProps, { getProfiles })(FixedHighlights) 