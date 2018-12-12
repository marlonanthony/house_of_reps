import React, { Component } from 'react'
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
    const { perk, perks } = this.props 
    console.log(perks)
    return (
      <div> {/* style={{ maxWidth: '170px', maxHeight: '150px'}}> */}
        <div className='perkss'
        style={{ 
          position: 'absolute',
          // transform: `translateX(-${this.state.currentImageIndex*100}%)`, 
          // transition: 'transform 300ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
          overflowY: 'hidden',
        }}>
          <Arrow direction='left' clickFunction={this.previousSlide} glyph='&#9664;' />
          <img src={perks[this.state.currentImageIndex].image} alt={perks[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          <Arrow direction='right' clickFunction={this.nextSlide} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div className={`slide-arrow ${direction}`} onClick={ clickFunction }>
    { glyph }
  </div>
)

