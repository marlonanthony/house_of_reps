import React from 'react'
import PropTypes from 'prop-types'

import PostText from '../../../../post-assets/text/PostText'

export default function NestedCommentWithLink({ nestedComment, youtubeUrl }) {
  return (
    <div className="comment-wrapper">
      <PostText fontSize="13px" postText={nestedComment.text} />
      <div>
        {youtubeUrl ? (
          <>
            <iframe
              title="youtube"
              width="100%"
              height="300"
              src={youtubeUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
            <div className="youtube_link_title_desc_wrapper">
              <p>{nestedComment.title}</p>
              <p>{nestedComment.description}</p>
            </div>
          </>
        ) : (
          <a
            href={nestedComment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="comment-anchor-container"
          >
            <div id="comment-link-container">
              <img
                src={nestedComment.image}
                alt="thumbnail"
                id="comment-link-img"
              />
              <div id="comment-link-title-desc">
                <p id="comments-title">{nestedComment.title}</p>
                <p id="comments-description">{nestedComment.description}</p>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  )
}

NestedCommentWithLink.propTypes = {
  nestedComment: PropTypes.object.isRequired,
  youtubeUrl: PropTypes.string
}
