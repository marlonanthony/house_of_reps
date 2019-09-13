import React, { Component } from 'react'

import NestedCommentForm from '../nested_comment_form/NestedCommentForm'
import NestedCommentNameAvatarDate from '../nested_comment_assets/name_avatar_date/NestedCommentNameAvatarDate'
import NestedCommentBody from '../nested_comment_assets/nested_comment_body/NestedCommentBody'
import NestedCommentButtons from '../nested_comment_assets/nested_comment_btns/NestedCommentButtons'
import NestedLikes from '../nested_comment_assets/nested_likes/NestedLikes'
import './NestedComments.css'

export default class NestedComments extends Component {
  state = {
    editPost: false,
    showModal: false
  }

  moreVertClicked = () => {
    let res = window.confirm('Edit post?')
    if(res) this.setState({ editPost: true })
    else this.setState({ editPost: false }) 
  }
  
  toggleEditPost = () => this.setState(prevState => ({ editPost: !prevState.editPost }))

  modalShow = () => this.setState({ showModal: true })

  render() {
    const {
      comment,
      showNestedComments,
      showForm,
      showNestedSubmitBtnHandler,
      postId,
      showNestedSubmitBtn,
      nestedCommentLikesPopupHandler,
      userNameOrAvatarClickedLikesPopup,
      showNestedCommentsLikes,
      // showNestedCommentsLikesPopup,
      liked,
      auth,
      onLikeNestedCommentClick,
      onUnlikeNestedCommentClick,
      onDeleteNestedComment,
      findUserLike
    } = this.props

    const { editPost, showModal } = this.state

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
                moreVertClicked={this.moreVertClicked}
                nestedComment={nestedComment}
                userNameOrAvatarClickedLikesPopup={userNameOrAvatarClickedLikesPopup}
              />
              <NestedCommentBody
                nestedComment={nestedComment} 
                postId={postId}
                comment={comment}
                editPost={editPost}
                modalShow={this.modalShow}
                toggleEditPost={this.toggleEditPost}
              />
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
}
