import React, { Component } from 'react'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './Perks.css'

export default class Perks extends Component {

  state = { currentImageIndex: 0 }

  previousSlide = () => {
    const { perks } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = perks.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index })
  }

  nextSlide = () => {
    const { perks } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = perks.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index })
  }

  render() {
    const { perks } = this.props 

    return (
      <div>
        <div className='perkss'
        style={{ 
          position: 'absolute',
          overflowY: 'hidden',
        }}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={this.previousSlide} glyph='&#9664;' />
          <img src={perks[this.state.currentImageIndex].image} alt={perks[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={this.nextSlide} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}
