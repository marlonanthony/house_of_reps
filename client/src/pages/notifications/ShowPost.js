import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import HighlightsModal from '../../components/UI/modal/highlights-modal/HighlightsModal'
import PostText from '../../components/posts/post-assets/text/PostText'
import Backdrop from '../../components/UI/backdrop/Backdrop'

const ShowPost = ({ post, showPost, setShowPost, youtubeUrl }) => {
  const ref = useRef()

  useEffect(() => {
    document.addEventListener('click', onOutsideClick, true)
    return () => {
      document.removeEventListener('click', onOutsideClick, true)
    }
  }, [])

  const onOutsideClick = e => {
    const domNode = ReactDOM.findDOMNode(ref.current)
    if (!domNode || !domNode.contains(e.target)) setShowPost(p => !p)
  }

  return (
    <div ref={ref} className="notifications_modal_wrapper">
      <Backdrop clicked={() => setShowPost(p => !p)} show={showPost} />
      <HighlightsModal>
        {!post.description &&
        !post.image &&
        !post.title &&
        !post.url &&
        !post.media ? (
          <div
            style={{
              margin: '0 auto',
              marginTop: '20vh',
              background: 'white',
              width: '90%'
            }}
          >
            <PostText
              color="black"
              fontSize="13px"
              postText={post.text && post.text}
            />
          </div>
        ) : post.media ? (
          <div>
            <PostText postText={post.text && post.text} />
            <img
              className="postfeed-media-pic"
              onClick={() => setShowPost(p => !p)}
              src={post.media && post.media}
              alt="uploaded"
            />
          </div>
        ) : (
          <div className="post_content">
            <PostText postText={post.text && post.text} />
            <div style={{ borderRadius: '5px' }}>
              {youtubeUrl && youtubeUrl ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}
                >
                  <iframe
                    title="youtube"
                    width="100%"
                    height="300"
                    src={youtubeUrl && youtubeUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              ) : (
                <a
                  href={post.url && post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={post.image && post.image}
                    alt="thumbnail"
                    style={{ width: '100%' }}
                    id="post-link-img"
                  />
                </a>
              )}
              <p style={{ textAlign: 'center', fontSize: '12px' }}>
                {post.title && post.title}
              </p>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  padding: '0 5px 20px 5px'
                }}
              >
                {post.description && post.description}
              </p>
            </div>
          </div>
        )}
      </HighlightsModal>
    </div>
  )
}

ShowPost.propTypes = {
  setShowPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  showPost: PropTypes.bool.isRequired,
  youtubeUrl: PropTypes.string
}

export default ShowPost
