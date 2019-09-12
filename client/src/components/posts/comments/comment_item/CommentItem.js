import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { 
  deleteComment, 
  getPosts, 
  addCommentLike, 
  removeCommentLike, 
  addNestedComment, 
  deleteNestedComment, 
  likeNestedComment, 
  unlikeNestedComment 
} from '../../../../actions/postActions' 
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
    showModal: false,
    liked: false,
    showNestedComments: false,
    text: '',
    errors: {},
    data: {},
    showNestedSubmitBtn: false,
    showForm: false,
    comments: this.props.comments,
    showCommentLikesPopup: false,
    showNestedCommentsLikesPopup: false,
    nestedcommentid: '',
    editPost: false
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

  onLikeClick = (postId, commentId, comment) => {
    this.props.addCommentLike(postId, commentId, comment)
    this.setState(prevState => ({ liked: true, comment: this.props.comment }))
  }

  onUnlikeClick = (postId, commentId) => {
    this.props.removeCommentLike(postId, commentId)
    this.setState( prevState => ({ liked: false, comment: this.props.comment }))
  }

  findUserLike = likes => {
    const { auth } = this.props
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
    this.setState({ comment: false })
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addNewNestedComment = (postId, commentId) => {
    const { user } = this.props.auth 

    const newNestedComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      handle: user.handle
    }

    this.props.addNestedComment(postId, commentId, newNestedComment)
    this.setState({ text: '' })
  }

  toggleShowNestedComment = () => {
    this.setState(prevState => ({ showNestedComments: !prevState.showNestedComments }))
  }

  showNestedSubmitBtnHandler = () => {
    this.setState(prevState => ({ showNestedSubmitBtn: !prevState.showNestedSubmitBtn }))
  }

  onDeleteNestedComment = (postId, commentId, nestedCommentId) => {
    this.props.deleteNestedComment(postId, commentId, nestedCommentId)
  }

  onLikeNestedCommentClick = (postId, commentId, nestedCommentId) => {
    this.props.likeNestedComment(postId, commentId, nestedCommentId)
    this.setState(prevState => ({ nestedCommentLiked: true, comment: this.props.comment }))
  }

  onUnlikeNestedCommentClick = (postId, commentId, nestedCommentId) => {
    this.props.unlikeNestedComment(postId, commentId, nestedCommentId)
    this.setState( prevState => ({ nestedCommentLiked: false, comment: this.props.comment }))
  }

  commentLikesPopupHandler = () => { this.setState(prevState => ({ showCommentLikesPopup: !prevState.showCommentLikesPopup })) }

  userNameOrAvatarClickedLikesPopup = handle => {
    if(this.props.location.pathname.includes('/profile')) {
      this.props.getProfileByHandle(handle)
    }
    this.props.history.push(`/profile/${handle}`)
  }

  nestedCommentLikesPopupHandler = (nestedId) => {
    this.setState(prevState => ({ nestedcommentid: nestedId }, () => {
      this.setState(prevState => ({ showNestedCommentsLikesPopup: !prevState.showNestedCommentsLikesPopup })) 
    }))
  }

  moreVertClicked = () => {
    let res = window.confirm('Edit post?')
    if(res) this.setState({ editPost: true })
    else this.setState({ editPost: false }) 
  }
  
  toggleEditPost = () => this.setState(prevState => ({ editPost: !prevState.editPost }))

  render() {
    const { postId, auth } = this.props 
    const {
      errors,
      comment, 
      showCommentLikesPopup, 
      showModal, 
      liked, 
      showForm,
      text,
      showNestedComments,
      showNestedSubmitBtn,
      showNestedCommentsLikes,
      showNestedCommentsLikesPopup,
      editPost
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
            commentLikesPopupHandler={this.commentLikesPopupHandler}
            showCommentLikesPopup={showCommentLikesPopup}
            userNameOrAvatarClickedLikesPopup={this.userNameOrAvatarClickedLikesPopup}
          />
          <CommentButtons
            auth={auth}
            postId={postId}
            comment={comment}
            liked={liked}
            findUserLike={this.findUserLike}
            onUnlikeClick={this.onUnlikeClick}
            onLikeClick={this.onLikeClick}
            onDeleteClick={this.onDeleteClick}
            toggleForm={this.toggleForm}
            toggleShowNestedComment={this.toggleShowNestedComment}
          />
          <NestedComments
            errors={errors}
            comment={comment}
            showNestedComments={showNestedComments}
            showForm={showForm}
            showNestedSubmitBtnHandler={this.showNestedSubmitBtnHandler}
            onChange={this.onChange}
            text={text}
            postId={postId}
            addNewNestedComment={this.addNewNestedComment}
            showNestedSubmitBtn={showNestedSubmitBtn}
            userNameOrAvatarClicked={this.userNameOrAvatarClicked}
            nestedCommentLikesPopupHandler={this.nestedCommentLikesPopupHandler}
            userNameOrAvatarClickedLikesPopup={this.userNameOrAvatarClickedLikesPopup}
            showNestedCommentsLikes={showNestedCommentsLikes}
            showNestedCommentsLikesPopup={showNestedCommentsLikesPopup}
            liked={liked}
            auth={auth}
            onLikeNestedCommentClick={this.onLikeNestedCommentClick}
            onUnlikeNestedCommentClick={this.onUnlikeNestedCommentClick}
            onDeleteNestedComment={this.onDeleteNestedComment}
            findUserLike={this.findUserLike}
          />
        </div>
      </>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  addNestedComment: PropTypes.func.isRequired,
  deleteNestedComment: PropTypes.func.isRequired,
  likeNestedComment: PropTypes.func.isRequired,
  unlikeNestedComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { 
  deleteComment, 
  getPosts, 
  getProfiles, 
  getProfileByHandle,
  addCommentLike, 
  removeCommentLike, 
  addNestedComment, 
  deleteNestedComment, 
  likeNestedComment, 
  unlikeNestedComment 
})(withRouter(CommentItem))