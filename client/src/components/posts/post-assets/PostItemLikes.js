import React from 'react'

const PostItemLikes = ({
  likes,
  likesPopupHandler,
  showLikesPopup,
  userNameOrAvatarClickedLikesPopup
}) => (
  <div className='popup' >  
    { likes.length < 1 ? null : likes.length === 2 
      ? <div  onClick={likesPopupHandler} className='popup_likes'>Liked by {likes[0].name} and {likes[1].name}</div>
      : likes.length > 2 
      ? <div  onClick={likesPopupHandler} className='popup_likes'>Like by {likes[likes.length - 1].name} and {likes.length -1} others.</div>
      : <div  onClick={likesPopupHandler} className='popup_likes'> Liked by {likes.map(like => <span key={like.user}>{ like.name }</span>)}</div>
    }
    <div onMouseLeave={likesPopupHandler} className={ showLikesPopup ? 'show likespopupcontent' : 'likespopupcontent'}>
      <div style={{ position: 'absolute', top: 5, left: 5 }}>
        <i className='fas fa-thumbs-up icons likespopupicon'></i>
        <small>{likes.length}</small>
      </div>
      <div>
        {likes.length < 1 ? null : likes.map(like => (
          <div className='likespopupavatarandname' key={like.user}>
            <img onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)} className='popup_likes_avatar' alt='avatar' src={like.avatar} />
            <p onClick={() => userNameOrAvatarClickedLikesPopup(like.handle)} style={{padding: 10 }}>{like.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default PostItemLikes