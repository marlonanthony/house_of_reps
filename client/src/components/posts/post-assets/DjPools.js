import React, { Component, Fragment } from 'react'
import PostAssetsModal from '../../UI/modal/PostAssetsModal'
import Backdrop from '../../UI/backdrop/Backdrop'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './DjPools.css'

export default class DjPools extends Component {

  state = { 
    currentImageIndex: 0,
    // showModal: false 
  }

  previousSlide = () => {
    const { djpools } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ 
      currentImageIndex: index, 
      // showModal: true
    })
  }

  nextSlide = () => {
    const { djpools } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = djpools.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ 
      currentImageIndex: index, 
      // showModal: true
    })
  }

  // modalToggle = () => {
  //   this.setState(prevState => ({ showModal: !prevState.showModal }))
  // }

  render() {
    const { djpool, djpools } = this.props 
    
    // const djpoolsModal = this.state.showModal ? (
    //   <Fragment>
    //     <PostAssetsModal>
    //       <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
    //           <div>
    //             <h2 style={{color: '#444'}}>DJ Pools & Music Stores</h2>
    //             <a className='djpools_modal_img' href={djpools[this.state.currentImageIndex].url}>
    //               <img src={djpools[this.state.currentImageIndex].image} alt={djpool.url} 
    //                 style={{width: '200px', height: '200px'}} />
    //             </a>
    //             <br />
    //             <a href={djpools[this.state.currentImageIndex].url}><small>{djpools[this.state.currentImageIndex].url}</small></a>
    //           </div>
    //       <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
    //     </PostAssetsModal>
    //   </Fragment>
    // ) : null 


    return (
      <div style={{position: 'absolute'}}>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {/* {djpoolsModal} */}
        <div className='djpool'
        style={{ 
          // display: 'flex',
          // flex: 1,
          // transform: `translateX(-${this.state.currentImageIndex+1})`, 
          // transition: 'transform 400ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
          overflowY: 'hidden',
          overflowX: 'hidden',
        }}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={this.previousSlide} glyph='&#9664;' />
          <a href={djpools[this.state.currentImageIndex].url} target='_blank'>
            <img src={djpools[this.state.currentImageIndex].image} alt={djpools[this.state.currentImageIndex].url} style={{height: '100%', width: '100%' }} />
          </a>
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={this.nextSlide} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}
