import React, { Component } from 'react'
import Backdrop from '../../UI/backdrop/Backdrop'
import Arrow from '../../UI/arrow_glyph/Arrow'
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
    const { djpools } = this.props 

    return (
      <div style={{position: 'absolute'}}>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        <div className='djpool'
        style={{ 
          overflowY: 'hidden',
          overflowX: 'hidden',
        }}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={this.previousSlide} glyph='&#9664;' />
          <a href={djpools[this.state.currentImageIndex].url} target='_blank' rel='noopener noreferrer'>
            <img src={djpools[this.state.currentImageIndex].image} alt={djpools[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          </a>
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={this.nextSlide} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}
