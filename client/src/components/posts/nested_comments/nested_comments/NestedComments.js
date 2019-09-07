import React from 'react'

import NestedCommentForm from '../nested_comment_form/NestedCommentForm'
import NestedCommentNameAvatarDate from '../nested_comment_assets/name_avatar_date/NestedCommentNameAvatarDate'
import NestedCommentBody from '../nested_comment_assets/nested_comment_body/NestedCommentBody'
import NestedCommentButtons from '../nested_comment_assets/nested_comment_btns/NestedCommentButtons'
import NestedLikes from '../nested_comment_assets/nested_likes/NestedLikes'

export default function NestedComments({
  comment,
  showNestedComments,
  showForm,
  showNestedSubmitBtnHandler,
  onChange,
  text,
  postId,
  addNewNestedComment,
  showNestedSubmitBtn,
  userNameOrAvatarClicked,
  nestedCommentLikesPopupHandler,
  userNameOrAvatarClickedLikesPopup,
  showNestedCommentsLikes,
  showNestedCommentsLikesPopup,
  liked,
  auth,
  onLikeNestedCommentClick,
  onUnlikeNestedCommentClick,
  onDeleteNestedComment,
  findUserLike
}) {
  return comment.comments && showNestedComments && (
    <section className='nested_comments'>
      <NestedCommentForm
        showForm={showForm}
        showNestedSubmitBtnHandler={showNestedSubmitBtnHandler}
        onChange={onChange}
        text={text}
        postId={postId}
        comment={comment}
        addNewNestedComment={addNewNestedComment}
        showNestedSubmitBtn={showNestedSubmitBtn}
      />
      <div>
        { comment.comments.map(nestedComment => (
        <div key={nestedComment._id}>
          <div className='nested_comments_container'>
            <NestedCommentNameAvatarDate nestedComment={nestedComment} userNameOrAvatarClicked={userNameOrAvatarClicked} />
            <NestedCommentBody nestedComment={nestedComment} />
            <NestedLikes
              nestedComment={nestedComment}
              nestedCommentLikesPopupHandler={nestedCommentLikesPopupHandler}
              showNestedCommentsLikesPopup={showNestedCommentsLikes}
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
