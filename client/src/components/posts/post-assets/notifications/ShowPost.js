import React from 'react'
import ReactDOM from 'react-dom'
import HighlightsModal from '../../../UI/modal/highlights-modal/HighlightsModal';
import PostText from '../text/PostText'
import Backdrop from '../../../UI/backdrop/Backdrop'

class ShowPost extends React.Component {
  
  componentDidMount() {
    document.addEventListener('click', this.onOutsideClick, true)
  }

  onOutsideClick = (e) => {
    const { modalToggle } = this.props
    const domNode = ReactDOM.findDOMNode(this) 
    if(!domNode || !domNode.contains(e.target)) modalToggle()
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, true)
  }

  render () {
    const { post, modalToggle, showPost, youtubeUrl } = this.props

    return (
      <div className='notifications_modal_wrapper'>
        <Backdrop clicked={modalToggle} show={showPost} />
        <HighlightsModal>
          { !post.description && !post.image && !post.title && !post.url && !post.media
            ? <div style={{ margin: '0 auto', marginTop: '20vh', background: 'white', width: '90%' }}>
                <PostText color='black' fontSize='13px' postText={post.text && post.text} />
              </div>
            : post.media
            ? <div>
                <PostText postText={post.text && post.text} />
                <img className='postfeed-media-pic' onClick={modalToggle} src={post.media && post.media} alt="uploaded" />
              </div>
            : <div className='post_content'>
                <PostText postText={post.text && post.text} />
                <div style={{ borderRadius: '5px' }}>
                  { youtubeUrl && youtubeUrl
                    ? <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                        <iframe
                          title='youtube'
                          width="100%"
                          height="300"
                          src={youtubeUrl && youtubeUrl}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen={true}>
                        </iframe> 
                      </div>
                    : <a href={post.url && post.url} target='_blank' rel='noopener noreferrer'>
                        <img src={post.image && post.image} alt='thumbnail' style={{ width: '100%' }} id='post-link-img' />
                      </a>
                  }
                  <p style={{textAlign: 'center', fontSize: '12px'}}>{post.title && post.title}</p>
                  <p style={{textAlign: 'center', fontSize: '12px', padding: '0 5px 20px 5px'}}>{post.description && post.description}</p>
                </div>
              </div>
          }
        </HighlightsModal>
      </div>
    )
  }
}

export default ShowPost