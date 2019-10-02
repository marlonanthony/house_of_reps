import React from 'react'

const PostItemLikes = ({
  likes,
  likesPopupHandler,
  showLikesPopup,
  userNameOrAvatarClickedLikesPopup
}) => (
  <div className="popup">
    {likes.length < 1 ? null : likes.length === 2 ? (
      <div className="popup_likes" onClick={likesPopupHandler}>
        Liked by {likes[0].name} and {likes[1].name}
      </div>
    ) : likes.length > 2 ? (
      <div className="popup_likes" onClick={likesPopupHandler}>
        Like by {likes[likes.length - 1].name} and {likes.length - 1} others.
      </div>
    ) : (
      <div className="popup_likes" onClick={likesPopupHandler}>
        Liked by {likes[0].name}
      </div>
    )}
    <div
      onMouseLeave={likesPopupHandler}
      className={
        showLikesPopup ? 'show likespopupcontent' : 'likespopupcontent'
      }
    >
      <div>
        <i className="fas fa-thumbs-up icons likespopupicon" />
        <small>{likes.length}</small>
      </div>
      <div>
        {likes.length >= 1 &&
          likes.map(like => (
            <div className="likespopupavatarandname" key={like.user}>
              <img
                onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)}
                className="popup_likes_avatar"
                alt="avatar"
                src={like.avatar}
              />
              <p onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)}>
                {like.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>
)

export default PostItemLikes
