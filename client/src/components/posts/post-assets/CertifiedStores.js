import React, { Component } from 'react'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './CertifiedStores.css'

export default class CertifiedStores extends Component {

  state = { currentImageIndex: 0 }

  previousSlide = () => {
    const { stores } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = stores.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index })
  }

  nextSlide = () => {
    const { stores } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = stores.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index })
  }

  render() {
    const { stores } = this.props 

    return (
      <div>
        <div className='store'
        style={{ 
          position: 'absolute',
          overflowY: 'hidden',
        }}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={this.previousSlide} glyph='&#9664;' />
          <a href={stores[this.state.currentImageIndex].url} target='_blank'rel='noopener noreferrer'>
            <img src={stores[this.state.currentImageIndex].image} alt={stores[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          </a>
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={this.nextSlide} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}
