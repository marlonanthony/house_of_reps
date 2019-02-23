import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 
import classnames from 'classnames' 
import { deleteComment, getPosts, addCommentLike, removeCommentLike } from '../../actions/postActions' 
import { getProfiles } from '../../actions/profileActions'
import CommentsModal from '../UI/modal/CommentsModal'
import Backdrop from '../UI/backdrop/Backdrop'
import CommentText from '../posts/post-assets/post_comment_text/CommentText'
import PostModalText from '../posts/post-assets/post_comment_text/PostModalText'
import './CommentItem.css'

class CommentItem extends Component {

  state = {
    comment: this.props.comment,
    showModal: false,
    // comment likes
    commentLikes: this.props.comment.likes,
    liked: false
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.comment !== prevState.comment) {
      this.setState({ comment: this.props.comment })
    }
    if(this.props.profiles !== prevProps.profiles){
      this.props.getProfiles() 
    }
  }

  onLikeClick = (postId, commentId) => {
    const { auth } = this.props 
    this.props.addCommentLike(postId, commentId)
    this.setState(prevState => ({ commentLikes: prevState.commentLikes.concat({ user: auth.user.id }), liked: true }))
  }

  onUnlikeClick = (postId, commentId) => {
    const { auth } = this.props 
    this.props.removeCommentLike(postId, commentId)
    // const index = this.state.commentLikes.map(like => like.user).indexOf(auth.user.id)
    // console.log(index)
    if(this.state.commentLikes.map(like => like.user === auth.user.id).length > 0) {
      // this.setState(prevState => ({ commentLikes: prevState.commentLikes.splice(index, 1), liked: false }))
      this.setState(prevState => ({ commentLikes: prevState.commentLikes.slice(1), liked: false }))
    }
  }

  findUserLike = likes => {
    const { auth } = this.props 
  
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
    this.setState({ comment: false })
  }

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  modalShow = () => {
    this.setState({ showModal: true })
  }

  userNameOrAvatarClicked = commentId => {
    this.props.profiles.map(profile =>  {
      if(profile.user._id === commentId) {
        this.props.history.push(`/profile/${profile.handle}`)
      }
    })
  }

  render() {
    const { postId, auth } = this.props 
    const { comment } = this.state
    // let userHandle

    // if(!this.props.profiles){
    //   userHandle = null 
    // } else {
    //   this.props.profiles.map(profile => {
    //     // if(profile.user._id === comment.user) {
    //       userHandle = <p className='comment-feed-name'>{comment.name}</p>
    //       // userHandle = <p className='comment-feed-name'>{profile.user.name}</p>
    //     // }
    //   })
    // }

    let youtubeUrl = comment.url
    
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = comment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v=/gi, 'embed/')
                             .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null 

    const commentsModal = this.state.showModal ? (
      <Fragment> 
        <CommentsModal>
          <PostModalText postText={comment.text} />
          <img src={comment.media} alt="uploaded" style={{maxWidth: '100%', maxHeight: '600px'}} />
        </CommentsModal>
      </Fragment>
    ) : null 

    if(!this.state.comment) return <div />

    return (
      <Fragment>
        <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
        {commentsModal}
        <div id='comment-feed-container'>
          <img id='comment-feed-avatar' onClick={()=> this.userNameOrAvatarClicked(comment.user)} src={comment.avatar} alt={comment.avatar} />
          <div id='comment_name_and_date_container' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '7px' }}>
            <p className='comment-feed-name'>{comment.name}</p>
            <p id='comment-feed-date'><Moment format='MM/DD/YYYY'>{comment.date}</Moment></p>
          </div>
          <div id='comment_content_container'>
            { !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
              ? <CommentText commentText={comment.text} />
              : comment.media
              ? ( <div onClick={this.modalShow}>
                    <CommentText commentText={comment.text} />
                    <img src={comment.media} alt="uploaded" className='comments_image' />
                  </div>
                )
              : ( 
                  <div className='comment-wrapper'>
                    <CommentText commentText={comment.text} />
                    <div style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
                      { youtubeUrl 
                      ? 
                        // <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                          <iframe width="100%" height="300" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
                        // </div>
                      : <a href={comment.url} target='_blank' rel='noopener noreferrer' id='comment-anchor-container'>
                          <div id='comment-link-container'>
                            <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                            <div id='comments-grandson'>
                              <p id='comments-title'>{comment.title}</p>
                              <p id='comments-description'>{comment.description}</p>
                            </div>
                          </div>
                        </a>
                      }
                    </div>
                  </div>
                )
            }
          </div>
          <div>
            <button 
              title='like comment'
              // className='postfeed_buttons'
              onClick={this.onLikeClick.bind(this, postId, comment._id)}
              className={this.state.liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
                'liked' : this.findUserLike(comment.likes)
              })}
              // onClick={this.onLikeClick.bind(this, post._id)}
              >
              <i className='fas fa-thumbs-up icons like'></i>
              <span>{this.state.commentLikes.length}</span>
            </button>
            <button 
              title='unlike'
              className='postfeed_buttons'
              onClick={this.onUnlikeClick.bind(this, postId, comment._id)}>
              <i className="fas fa-thumbs-down icons" id='unlike'></i>
            </button>
            { comment.user === auth.user.id ? (
            <button 
              title='double click to delete'
              className='postfeed_buttons delete'
              onDoubleClick={this.onDeleteClick.bind(this, postId, comment._id)}>
              <i className="fas fa-times icons" />
            </button> 
            ) : null }
          </div>
        </div>
      </Fragment>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment, getPosts, getProfiles, addCommentLike, removeCommentLike })(withRouter(CommentItem))
