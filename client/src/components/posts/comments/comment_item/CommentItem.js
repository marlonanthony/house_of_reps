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
import CommentBody from '../comment_assets/CommentBody'
import CommentLikes from '../comment_assets/CommentLikes'
import NameAvatarDate from '../comment_assets/NameAvatarDate'
import CommentButtons from '../comment_assets/CommentButtons'
import NestedCommentForm from '../../nested_comments/nested_comment_form/NestedCommentForm'
import NestedCommentNameAvatarDate from '../../nested_comments/nested_comment_assets/name_avatar_date/NestedCommentNameAvatarDate'
import NestedCommentBody from '../../nested_comments/nested_comment_assets/nested_comment_body/NestedCommentBody'
import NestedCommentButtons from '../../nested_comments/nested_comment_assets/nested_comment_btns/NestedCommentButtons'
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
    nestedcommentid: ''
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
      avatar: user.avatar
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

  render() {
    const { postId, auth } = this.props 
    const { 
      comment, 
      showCommentLikesPopup, 
      showModal, 
      liked, 
      showForm,
      text,
      showNestedSubmitBtn
    } = this.state

    let youtubeUrl = comment.url
    
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = comment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v=/gi, 'embed/')
                             .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null 

    const commentsModal = showModal && (
      <CommentsModal>
        <img src={comment.media} alt="uploaded" style={{ maxHeight: '70vh', maxWidth: '100%'}} />
      </CommentsModal>
    )

    if(!comment) return <div />

    return (
      <>
        <Backdrop clicked={this.modalToggle} show={showModal} />
        {commentsModal}
        <div id='comment-feed-container'>
          <NameAvatarDate
            comment={comment}
            userNameOrAvatarClicked={this.userNameOrAvatarClicked}
          />
          <div id='comment_content_container'>
            <CommentBody comment={comment} modalShow={this.modalShow} youtubeUrl={youtubeUrl} />
            <CommentLikes
              comment={comment}
              commentLikesPopupHandler={this.commentLikesPopupHandler}
              showCommentLikesPopup={showCommentLikesPopup}
              userNameOrAvatarClickedLikesPopup={this.userNameOrAvatarClickedLikesPopup}
            />
          </div>
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
          { comment.comments && this.state.showNestedComments && (
            <section className='nested_comments'>
              <NestedCommentForm
                showForm={showForm}
                showNestedSubmitBtnHandler={this.showNestedSubmitBtnHandler}
                onChange={this.onChange}
                text={text}
                postId={postId}
                comment={comment}
                addNewNestedComment={this.addNewNestedComment}
                showNestedSubmitBtn={showNestedSubmitBtn}
              />
              <div>
                { comment.comments.map(nestedComment => (
                <div key={nestedComment._id}>
                  <div className='nested_comments_container'>
                    <NestedCommentNameAvatarDate nestedComment={nestedComment} />
                    <NestedCommentBody nestedComment={nestedComment} />
                    <div className='popup' >
                      { nestedComment && nestedComment.likes.length < 1 ? null : nestedComment.likes.length === 2 
                        ? <div  onClick={this.nestedCommentLikesPopupHandler.bind(this, nestedComment._id)} style={{ fontSize: '11px', color: 'rgb(29, 138, 255)', marginLeft: 35 }}>Liked by {nestedComment.likes[0].name} and {nestedComment.likes[1].name}</div>
                        : nestedComment.likes.length > 2 
                        ? <div  onClick={this.nestedCommentLikesPopupHandler.bind(this, nestedComment._id)} style={{ fontSize: '11px', color: 'rgb(29, 138, 255)', marginLeft: 35 }}>Like by {nestedComment.likes[nestedComment.likes.length - 1].name} and {nestedComment.likes.length -1} others.</div>
                        : <div  onClick={this.nestedCommentLikesPopupHandler.bind(this, nestedComment._id)} style={{ fontSize: '11px', color: 'rgb(29, 138, 255)', marginLeft: 35 }}> Liked by {nestedComment.likes.map(like => <span key={like.user} style={{color: 'rgb(29, 138, 255)'}}>{like.name} </span>)}</div>
                      }
                      <div onMouseLeave={this.nestedCommentLikesPopupHandler} className={this.state.showNestedCommentsLikesPopup ? 'show likespopupcontent' : 'likespopupcontent'}>
                        <div style={{ position: 'absolute', top: 5, left: 5 }}>
                          <i className='fas fa-thumbs-up icons likespopupicon'></i>
                          <small>{nestedComment.likes.length}</small>
                        </div>
                        <div>
                          {nestedComment.likes.length < 1 ? null : nestedComment.likes.map(like => (
                            <div className='likespopupavatarandname' key={like.user}>
                              <img style={{width: '30px', height: '30px', marginRight: 10, borderRadius: '50%'}} alt='avatar' src={like.avatar} />
                              <p style={{padding: 10 }}>{like.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>             
                    {/* <div>
                      { nestedComment.text && <p id='nested_comments_text'>{nestedComment.text}</p> }
                      { nestedComment && nestedComment.likes.length < 1 ? null : nestedComment.likes.length === 2 
                        ? <div style={{ marginLeft: 35, fontSize: '10px', color: 'rgb(29, 138, 255)'}}>Liked by {nestedComment.likes[0].name} and {nestedComment.likes[1].name}</div>
                        : nestedComment.likes.length > 2 
                        ? <div style={{ marginLeft: 35, fontSize: '10px', color: 'rgb(29, 138, 255)'}}>Like by {nestedComment.likes[nestedComment.likes.length - 1].name} and {nestedComment.likes.length -1} others.</div>
                        : <div style={{ marginLeft: 35, fontSize: '10px', color: 'rgb(29, 138, 255)'}}> Liked by {nestedComment.likes.map(like => <span key={like.user} style={{color: 'rgb(29, 138, 255)'}}>{like.name} </span>)}</div>
                      }
                    </div> */}
                    <NestedCommentButtons
                      auth={auth}
                      postId={postId}
                      comment={comment}
                      nestedComment={nestedComment}
                      liked={liked}
                      findUserLike={this.findUserLike}
                      onLikeNestedCommentClick={this.onLikeNestedCommentClick}
                      onUnlikeNestedCommentClick={this.onUnlikeNestedCommentClick}
                      onDeleteNestedComment={this.onDeleteNestedComment}
                    />
                  </div>
                </div>
                ))}
              </div>
            </section>
          )}
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
