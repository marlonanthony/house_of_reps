import React, { Component, Fragment } from 'react'
import PostModal from '../../UI/modal/PostModal'
import Backdrop from '../../UI/backdrop/Backdrop'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './DjPoolsSmall.css'

export default class DjPools extends Component {

  state = { 
    currentImageIndex: 0,
    showModal: false 
  }

  previousSlide = () => {
    const { djpools } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index, showModal: true })
  }

  nextSlide = () => {
    const { djpools } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index, showModal: true })
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  render() {
    const { djpool, djpools } = this.props 
    
    const djpoolsModal = this.state.showModal ? (
      <Fragment>
        <PostModal>
          <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
              <div>
                <h2 style={{color: '#444'}}>DJ Pools & Music Stores</h2>
                <a className='djpools_modal_img' href={djpools[this.state.currentImageIndex].url} target='_blank'>
                  <img src={djpools[this.state.currentImageIndex].image} alt={djpool.url} 
                    style={{width: '200px', height: '200px'}} />
                </a>
                <br />
                <a href={djpools[this.state.currentImageIndex].url}><small>{djpools[this.state.currentImageIndex].url}</small></a>
              </div>
          <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
        </PostModal>
      </Fragment>
    ) : null 


    return (
      <div style={{margin: '0 5px'}}>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {djpoolsModal}
        <img onClick={this.modalToggle} src={djpool.image} alt={djpool.url} className='djpoolsscroll-img' />
      </div>
    )
  }
}
