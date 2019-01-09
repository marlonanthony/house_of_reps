import React, { Component, Fragment } from 'react'
// import PostAssetsModal from '../../UI/modal/PostAssetsModal'
// import Backdrop from '../../UI/backdrop/Backdrop'
import Arrow from '../../UI/arrow_glyph/Arrow'
import './Perks.css'

export default class Perks extends Component {

  state = { 
    currentImageIndex: 0,
    // showModal: false 
  }

  previousSlide = () => {
    const { perks } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = perks.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ 
      currentImageIndex: index, 
      // showModal: true 
    })
  }

  nextSlide = () => {
    const { perks } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = perks.length - 1
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
    const { perk, perks } = this.props 
    
    // const perksModal = this.state.showModal ? (
    //   <Fragment>
    //     <PostAssetsModal>
    //       <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
    //           <div>
    //             <h2>Reps Perks & Hookups</h2>
    //             <a href={perks[this.state.currentImageIndex].url} target='_blank' className='perks_modal_img'>
    //               <img src={perks[this.state.currentImageIndex].image} 
    //                    alt={perk.url} 
    //                    style={{width: '200px', height: '200px'}} />
    //             </a>
    //             <p style={{padding: '0 10%'}}>{perks[this.state.currentImageIndex].description}</p>
    //             <a href={perks[this.state.currentImageIndex].url}><small>{perks[this.state.currentImageIndex].url}</small></a>
    //           </div>
    //       <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
    //     </PostAssetsModal>
    //   </Fragment>
    // ) : null 


    return (
      <div>
      {/* //   <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
      //   {perksModal} */}
        <div className='perkss'
        style={{ 
          position: 'absolute',
          // transform: `translateX(-${this.state.currentImageIndex*100}%)`, 
          // transition: 'transform 300ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
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
