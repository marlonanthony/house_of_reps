import React, { useState } from 'react'
import PropTypes from 'prop-types'

import NestedCommentForm from '../nested_comment_form/NestedCommentForm'
import NestedCommentNameAvatarDate from '../nested_comment_assets/name_avatar_date/NestedCommentNameAvatarDate'
import NestedCommentBody from '../nested_comment_assets/nested_comment_body/NestedCommentBody'
import NestedCommentButtons from '../nested_comment_assets/nested_comment_btns/NestedCommentButtons'
import NestedLikes from '../nested_comment_assets/nested_likes/NestedLikes'
import './NestedComments.css'

const NestedComments = ({
  comment,
  showNestedComments,
  showForm,
  showNestedSubmitBtnHandler,
  postId,
  showNestedSubmitBtn,
  userNameOrAvatarClickedLikesPopup,
  liked,
  auth,
  onLikeNestedCommentClick,
  onUnlikeNestedCommentClick,
  onDeleteNestedComment,
  findUserLike
}) => {
  const [editPost, setEditPost] = useState(false)

  const moreVertClicked = () => {
    let res = window.confirm('Edit post?')
    if(res) setEditPost(true)
    else setEditPost(false)
  }
  
  const toggleEditPost = () => setEditPost(!editPost)

  return comment.comments && showNestedComments && (
    <section className='nested_comments'>
      <NestedCommentForm
        auth={auth}
        showForm={showForm}
        showNestedSubmitBtnHandler={showNestedSubmitBtnHandler}
        postId={postId}
        comment={comment}
        showNestedSubmitBtn={showNestedSubmitBtn}
      />
      <div>
        { comment.comments.map(nestedComment => (
        <div key={nestedComment._id}>
          <div className='nested_comments_container'>
            <NestedCommentNameAvatarDate
              moreVertClicked={moreVertClicked}
              nestedComment={nestedComment}
              userNameOrAvatarClickedLikesPopup={userNameOrAvatarClickedLikesPopup}
            />
            <NestedCommentBody
              nestedComment={nestedComment} 
              postId={postId}
              comment={comment}
              editPost={editPost}
              toggleEditPost={toggleEditPost}
            />
            <NestedLikes
              nestedComment={nestedComment}
              userNameOrAvatarClickedLikesPopup={userNameOrAvatarClickedLikesPopup}
            />
            <NestedCommentButtons
              auth={auth}
              postId={postId}
              comment={comment}
              nestedComment={nestedComment}
              liked={liked}
              findUserLike={findUserLike}
              onLikeNestedCommentClick={onLikeNestedCommentClick}
              onUnlikeNestedCommentClick={onUnlikeNestedCommentClick}
              onDeleteNestedComment={onDeleteNestedComment}
            />
          </div>
        </div>
        ))}
      </div>
    </section>
  )
}

NestedComments.propTypes = {
  comment: PropTypes.object.isRequired,
  showNestedComments: PropTypes.bool.isRequired,
  showForm: PropTypes.bool.isRequired,
  showNestedSubmitBtnHandler: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  showNestedSubmitBtn: PropTypes.bool.isRequired,
  userNameOrAvatarClickedLikesPopup: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  onLikeNestedCommentClick: PropTypes.func.isRequired,
  onUnlikeNestedCommentClick: PropTypes.func.isRequired,
  onDeleteNestedComment: PropTypes.func.isRequired,
  findUserLike: PropTypes.func.isRequired
}

export default NestedComments