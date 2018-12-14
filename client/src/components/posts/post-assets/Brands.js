import React, { Component, Fragment } from 'react'
import PostModal from '../../UI/modal/PostModal'
import Backdrop from '../../UI/backdrop/Backdrop'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './Brands.css'

export default class Brands extends Component {

  state = { 
    currentImageIndex: 0,
    showModal: false 
  }

  previousSlide = () => {
    const { brands } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = brands.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index, showModal: true })
  }

  nextSlide = () => {
    const { brands } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = brands.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index, showModal: true })
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  render() {
    const { brand, brands } = this.props 

    const brandsModal = this.state.showModal ? (
      <Fragment>
        <PostModal>
          <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
              <div>
                <h2 style={{color: '#444'}}>Certified Brands</h2>
                <img src={brands[this.state.currentImageIndex].image} alt={brand.url} 
                  style={{width: '200px', height: '200px'}}
                />
                <p style={{padding: '0 10%'}}>{brands[this.state.currentImageIndex].description}</p>
                <a href={brands[this.state.currentImageIndex].url}><small>{brands[this.state.currentImageIndex].url}</small></a>
              </div>
              
          <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
        </PostModal>
      </Fragment>
    ) : null 

    return (
      <div>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {brandsModal}
        <div className='brandss'
        style={{ 
          position: 'absolute',
          // transform: `translateX(-${this.state.currentImageIndex*100}%)`, 
          // transition: 'transform 300ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
          overflowY: 'hidden',
        }}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
          <img src={brands[this.state.currentImageIndex].image} alt={brands[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}


