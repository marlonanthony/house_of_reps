import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getProfiles, getProfileByHandle } from '../../../../actions/profileActions'
import CommentsModal from '../../../UI/modal/CommentsModal'
import Backdrop from '../../../UI/backdrop/Backdrop'
import CommentBody from '../comment_assets/comment_body/CommentBody'
import CommentLikes from '../comment_assets/CommentLikes'
import NameAvatarDate from '../comment_assets/name_avatar_date/NameAvatarDate'
import CommentButtons from '../comment_assets/CommentButtons'
import NestedComments from '../../nested_comments/nested_comments/NestedComments'
import './CommentItem.css'

class CommentItem extends Component {
  state = {
    comment: this.props.comment,
    comments: this.props.comments,
    nestedcommentid: '',
    showModal: false,
    liked: false,
    showNestedComments: false,
    showForm: false,
    editPost: false,
    showPopup: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.comment !== prevState.comment) {
      this.setState({ comment: this.props.comment })
    }
    if(this.props.comment.comments !== prevState.comment.comments) {
      this.setState({ comment: this.props.comment })
    }
    if(this.props.profiles !== prevProps.profiles){
      this.props.getProfiles() 
    }
  }

  findUserLike = likes => {
    const { auth } = this.props
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  modalToggle = () => this.setState(prevState => ({ showModal: !prevState.showModal }))

  modalShow = () => this.setState({ showModal: true })

  toggleForm = () => this.setState(prevState => ({ showForm: !prevState.showForm }))

  userNameOrAvatarClicked = commentId => (
    this.props.profiles.map(profile =>  (
      profile.user._id === commentId &&
        this.props.history.push(`/profile/${profile.handle}`)
    ))
  )

  toggleShowNestedComment = () => {
    this.setState(prevState => ({ showNestedComments: !prevState.showNestedComments }))
  }

  userNameOrAvatarClickedLikesPopup = handle => {
    if(this.props.location.pathname.includes('/profile')) {
      this.props.getProfileByHandle(handle)
    }
    this.props.history.push(`/profile/${handle}`)
  }

  moreVertClicked = () => {
    let res = window.confirm('Edit post?')
    if(res) this.setState({ editPost: true })
    else this.setState({ editPost: false }) 
  }
  
  toggleEditPost = () => this.setState(prevState => ({ editPost: !prevState.editPost }))

  popupHandler = () => {
    this.setState(prevState => ({ showPopup: !prevState.showPopup }))
  }

  render() {
    const { postId, auth, profiles } = this.props 
    const {
      comment, 
      showModal,
      liked, 
      showForm,
      showNestedComments,
      editPost,
      showPopup
    } = this.state

    if(!comment) return null

    return (
      <>
        <Backdrop clicked={this.modalToggle} show={showModal} />
        <CommentsModal showModal={showModal}>
          <img src={comment.media} alt="comment pic" />
        </CommentsModal>
        <div className='comment-feed-container'>
          <NameAvatarDate
            showPopup={showPopup}
            popupHandler={this.popupHandler}
            profiles={profiles}
            comment={comment}
            userNameOrAvatarClicked={this.userNameOrAvatarClicked}
            userNameOrAvatarClickedLikesPopup={this.userNameOrAvatarClickedLikesPopup}
            moreVertClicked={this.moreVertClicked}
          />
          <CommentBody 
            comment={comment} 
            modalShow={this.modalShow}
            editPost={editPost}
            toggleEditPost={this.toggleEditPost}
            postId={postId}
          />
          <CommentLikes
            comment={comment}
            userNameOrAvatarClickedLikesPopup={this.userNameOrAvatarClickedLikesPopup}
          />
          <CommentButtons
            auth={auth}
            postId={postId}
            comment={comment}
            liked={liked}
            findUserLike={this.findUserLike}
            toggleForm={this.toggleForm}
            toggleShowNestedComment={this.toggleShowNestedComment}
          />
          <NestedComments
            comment={comment}
            showNestedComments={showNestedComments}
            showForm={showForm}
            postId={postId}
            userNameOrAvatarClickedLikesPopup={this.userNameOrAvatarClickedLikesPopup}
            liked={liked}
            auth={auth}
            findUserLike={this.findUserLike}
          />
        </div>
      </>
    )
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getProfiles, 
  getProfileByHandle,
})(withRouter(CommentItem))