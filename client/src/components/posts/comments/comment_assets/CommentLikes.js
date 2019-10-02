import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CommentLikes = ({ comment, userNameOrAvatarClickedLikesPopup }) => {
  const [showLikesPopup, setShowLikesPopup] = useState(false)

  return (
    <div className="popup">
      {comment && comment.likes.length < 1 ? null : comment.likes.length ===
        2 ? (
        <div
          className="popup_likes"
          onClick={() => setShowLikesPopup(!showLikesPopup)}
          style={{ fontSize: '11px' }}
        >
          Liked by {comment.likes[0].name} and {comment.likes[1].name}
        </div>
      ) : comment.likes.length > 2 ? (
        <div
          className="popup_likes"
          onClick={() => setShowLikesPopup(!showLikesPopup)}
          style={{ fontSize: '11px' }}
        >
          Like by {comment.likes[comment.likes.length - 1].name} and{' '}
          {comment.likes.length - 1} others.
        </div>
      ) : (
        <div
          className="popup_likes"
          style={{ fontSize: '11px' }}
          onClick={() => setShowLikesPopup(!showLikesPopup)}
        >
          Liked by {comment.likes[0].name}
        </div>
      )}
      <div
        className={
          showLikesPopup ? 'show likespopupcontent' : 'likespopupcontent'
        }
        onMouseLeave={() => setShowLikesPopup(!showLikesPopup)}
      >
        <div>
          <i className="fas fa-thumbs-up icons likespopupicon"></i>
          <small>{comment.likes.length}</small>
        </div>
        <div>
          {comment.likes.length >= 1 &&
            comment.likes.map(like => (
              <div className="likespopupavatarandname" key={like.user}>
                <img
                  className="popup_likes_avatar"
                  onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)}
                  alt="avatar"
                  src={like.avatar}
                />
                <p
                  onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)}
                  style={{ padding: 10 }}
                >
                  {like.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

CommentLikes.propTypes = {
  comment: PropTypes.object.isRequired,
  userNameOrAvatarClickedLikesPopup: PropTypes.func.isRequired
}

export default CommentLikes
