import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NestedLikes.css'

export default function NestedLikes({
  nestedComment,
  userNameOrAvatarClickedLikesPopup
}) {
  const [show, setShow] = useState(false)

  return (
    <div className="popup">
      {nestedComment && !nestedComment.likes.length ? null : nestedComment.likes
          .length === 2 ? (
        <div
          className="popup_likes"
          style={{ fontSize: 11 }}
          onClick={() => setShow(!show)}
        >
          Liked by {nestedComment.likes[0].name} and{' '}
          {nestedComment.likes[1].name}
        </div>
      ) : nestedComment.likes.length > 2 ? (
        <div
          className="popup_likes"
          style={{ fontSize: 11 }}
          onClick={() => setShow(!show)}
        >
          Liked by {nestedComment.likes[nestedComment.likes.length - 1].name} and{' '}
          {nestedComment.likes.length - 1} others.
        </div>
      ) : (
        <div
          className="popup_likes"
          style={{ fontSize: 11 }}
          onClick={() => setShow(!show)}
        >
          Liked by {nestedComment.likes[0].name}
        </div>
      )}
      <div
        onMouseLeave={() => setShow(!show)}
        className={show ? 'show likespopupcontent' : 'likespopupcontent'}
      >
        <div>
          <i className="fas fa-thumbs-up icons likespopupicon"></i>
          <small>{nestedComment.likes.length}</small>
        </div>
        <div>
          {nestedComment.likes.length &&
            nestedComment.likes.map(like => (
              <div className="likespopupavatarandname" key={like.user}>
                <img
                  style={{
                    width: '30px',
                    height: '30px',
                    marginRight: 10,
                    borderRadius: '50%'
                  }}
                  onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)}
                  alt="avatar"
                  src={like.avatar}
                />
                <p
                  style={{ padding: 10 }}
                  onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)}
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

NestedLikes.propTypes = {
  nestedComment: PropTypes.object.isRequired,
  userNameOrAvatarClickedLikesPopup: PropTypes.func.isRequired
}
