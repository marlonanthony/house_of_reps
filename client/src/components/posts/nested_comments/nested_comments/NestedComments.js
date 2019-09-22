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
  postId,
  userNameOrAvatarClickedLikesPopup,
  liked,
  auth,
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
        postId={postId}
        comment={comment}
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
  postId: PropTypes.string.isRequired,
  userNameOrAvatarClickedLikesPopup: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  findUserLike: PropTypes.func.isRequired
}

export default NestedComments