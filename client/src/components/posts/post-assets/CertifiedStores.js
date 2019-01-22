import React, { Component } from 'react'
// import PostAssetsModal from '../../UI/modal/PostAssetsModal'
// import Backdrop from '../../UI/backdrop/Backdrop'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './CertifiedStores.css'

export default class CertifiedStores extends Component {

  state = { 
    currentImageIndex: 0,
    // showModal: false 
  }

  previousSlide = () => {
    const { stores } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = stores.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ 
      currentImageIndex: index, 
      // showModal: true 
    })
  }

  nextSlide = () => {
    const { stores } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = stores.length - 1
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
    const { store, stores } = this.props 

    // const storesModal = this.state.showModal ? (
    //   <Fragment>
    //     <PostAssetsModal>
    //       <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
    //           <div>
    //             <h2 style={{color: '#444'}}>Certified Stores</h2>
    //             <a className='stores_modal_img' href={stores[this.state.currentImageIndex].url}>
    //               <img src={stores[this.state.currentImageIndex].image} alt={store.url} 
    //                 style={{width: '200px', height: '200px'}} />
    //             </a>
    //             <br />
    //             <a href={stores[this.state.currentImageIndex].url}><small>{stores[this.state.currentImageIndex].url}</small></a>
    //           </div>
    //       <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
    //     </PostAssetsModal>
    //   </Fragment>
    // ) : null 



    return (
      <div>
        {/* <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {storesModal} */}
        <div className='store'
        style={{ 
          position: 'absolute',
          // transform: `translateX(-${this.state.currentImageIndex*100}%)`, 
          // transition: 'transform 300ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
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
