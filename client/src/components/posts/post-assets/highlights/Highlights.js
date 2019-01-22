import React, { Component, Fragment } from 'react'
import Moment from 'react-moment'
import Backdrop from '../../../UI/backdrop/Backdrop'
import Arrow from '../../../UI/arrow_glyph/Arrow'
import './Highlights.css'
// import Spinner from '../../../common/Spinner';
import HighlightsModal from '../../../UI/modal/highlights-modal/HighlightsModal';

export default class Highlights extends Component {

  state = { 
    currentImageIndex: 0,
    showModal: false 
  }

  previousSlide = () => {
    const { recentHighlights } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1

    this.setState({ currentImageIndex: index, 
      //showModal: true 
    })
  }

  nextSlide = () => {
    const { recentHighlights } = this.props 
    const { currentImageIndex } = this.state 
    const lastIndex = recentHighlights.length - 1
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1

    this.setState({ currentImageIndex: index, 
      //showModal: true 
    })
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  render() {
    const { recentHighlights } = this.props 

    const highlightsModal = this.state.showModal ? (
      <Fragment>
        <HighlightsModal>
          <div style={{ color: '#ccc' }}>
            <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
            { recentHighlights[this.state.currentImageIndex].date ?
              <p style={{color: 'rgb(55, 131, 194)'}}>
                <Moment format='MM/DD/YYYY'>{recentHighlights[this.state.currentImageIndex].date}</Moment>
              </p> : null 
            }
            { recentHighlights[this.state.currentImageIndex].title ? <p>{recentHighlights[this.state.currentImageIndex].title}</p> : null }
            { recentHighlights[this.state.currentImageIndex].video ?
              <iframe 
                title={recentHighlights[this.state.currentImageIndex].video} 
                style={{width: '95%', height: '50vh'}} 
                src={recentHighlights[this.state.currentImageIndex].video} 
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen={true}>
              </iframe>
              : recentHighlights[this.state.currentImageIndex].image 
              ? <img src={recentHighlights[this.state.currentImageIndex].image} style={{maxWidth: '100%', maxHeight: '50vh'}} alt="highlights"/>
              : null
            }
            { recentHighlights[this.state.currentImageIndex].description ? 
              <p>{recentHighlights[this.state.currentImageIndex].description}</p> : null 
            }
            
            <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
            {/* <Arrow direction='left' styleClass='modal-slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
              { recentHighlights[this.state.currentImageIndex].date ? 
              <p style={{color: 'rgb(55, 131, 194)'}}>
                <Moment format='MM/DD/YYYY'>{recentHighlights[this.state.currentImageIndex].date}</Moment>
              </p> : null  }
              { recentHighlights[this.state.currentImageIndex].title ? <p>{recentHighlights[this.state.currentImageIndex].title}</p> : null }
              { recentHighlights[this.state.currentImageIndex] && recentHighlights[this.state.currentImageIndex].video ?
              <iframe 
                title={recentHighlights[this.state.currentImageIndex].video} 
                style={{width: '95%', height: '50vh'}} 
                src={recentHighlights[this.state.currentImageIndex].video} 
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen={true}>
              </iframe>
              : recentHighlights[this.state.currentImageIndex] && recentHighlights[this.state.currentImageIndex].image 
              ? <img src={recentHighlights[this.state.currentImageIndex].image} style={{maxWidth: '100%', maxHeight: '100%'}} alt="highlights"/>
              : null }
              { recentHighlights[this.state.currentImageIndex].description ? 
                <p>{recentHighlights[this.state.currentImageIndex].description}</p> : null }
            <Arrow direction='right' styleClass='modal-slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' /> */}
          </div>
        </HighlightsModal>
      </Fragment>
    ) : null 

    return (
      <div className='highlightss'>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {highlightsModal}
        <div 
        style={{ 
          position: 'absolute',
          // transform: `translateX(-${this.state.currentImageIndex*100}%)`, 
          // transition: 'transform 300ms cubic-bezier(0.1, 0.7, 1.0, 0.1)',
          // overflowY: 'hidden',
        }}>
          <Arrow direction='left' styleClass='slide-arrow' clickFunction={() => this.previousSlide()} glyph='&#9664;' />
          {recentHighlights[this.state.currentImageIndex] && recentHighlights[this.state.currentImageIndex].video ?
            (<iframe 
              title={recentHighlights[this.state.currentImageIndex].video} 
              style={{width: '250px', height: '250px'}} 
              src={recentHighlights[this.state.currentImageIndex].video} 
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen={true}>
            </iframe>) 
            : recentHighlights[this.state.currentImageIndex] && recentHighlights[this.state.currentImageIndex].image 
            ? <img src={recentHighlights[this.state.currentImageIndex].image} height={250} width={250} alt="highlights"/>
            : null }
          <br />
          {/* <img onClick={this.modalToggle} className='highlightss_icon' src={require('../../../../img/mc.svg')} alt='instagram avatar' /> */}
          <img onClick={this.modalToggle} className='highlightss_icon' src={require('../../../../img/hor-icon.jpg')} alt='instagram avatar' title={'🔥'}/>
          <Arrow direction='right' styleClass='slide-arrow' clickFunction={() => this.nextSlide()} glyph='&#9654;' />
        </div>
      </div>
    )
  }
}


