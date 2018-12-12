import React, { Component } from 'react'
import './DjPools.css'

export default class DjPools extends Component {

  state = { currentImageIndex: 0 }

  previousSlide = () => {
    const { djpools } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index })
  }

  nextSlide = () => {
    const { djpools } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index })
  }

  render() {
    const { djpool, djpools } = this.props 
    console.log(djpools)
    return (
      <div> {/* style={{ maxWidth: '170px', maxHeight: '150px'}}> */}
        <div className='djpool'
        style={{ 
          position: 'absolute',
          // transform: `translateX(-${this.state.currentImageIndex*100}%)`, 
          // transition: 'transform 300ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
          overflowY: 'hidden',
        }}>
          <Arrow direction='left' clickFunction={this.previousSlide} glyph='&#9664;' />
          <a href={djpools[this.state.currentImageIndex].url} target='_blank'>
            <img src={djpools[this.state.currentImageIndex].image} alt={djpools[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          </a>
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

