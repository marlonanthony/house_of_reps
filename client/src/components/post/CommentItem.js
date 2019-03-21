import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types' 
import Moment from 'react-moment' 
import classnames from 'classnames' 
import { deleteComment, getPosts, addCommentLike, removeCommentLike, addNestedComment, deleteNestedComment, likeNestedComment, unlikeNestedComment } from '../../actions/postActions' 
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
    liked: false,
    showNestedComments: false,
    text: '',
    errors: {},
    data: {},
    showNestedSubmitBtn: false,
    showForm: false,
    comments: this.props.comments,
    showLikesPopup: false
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addNewNestedComment = (postId, commentId) => {
    const { user } = this.props.auth 
    // const { postId } = this.props 

    const newNestedComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addNestedComment(postId, commentId, newNestedComment)
    this.setState({ text: '' })
  }

  showNestedSubmitBtnHandler = () => {
    this.setState(prevState => ({ showNestedSubmitBtn: !prevState.showNestedSubmitBtn }))
  }

  onDeleteNestedComment = (postId, commentId, nestedCommentId) => {
    this.props.deleteNestedComment(postId, commentId, nestedCommentId)
    // this.setState({ comment: false })
  }

  onLikeNestedCommentClick = (postId, commentId, nestedCommentId) => {
    this.props.likeNestedComment(postId, commentId, nestedCommentId)
    this.setState(prevState => ({ nestedCommentLiked: true, comment: this.props.comment }))
  }

  onUnlikeNestedCommentClick = (postId, commentId, nestedCommentId) => {
    this.props.unlikeNestedComment(postId, commentId, nestedCommentId)
    this.setState( prevState => ({ nestedCommentLiked: false, comment: this.props.comment }))
  }

  likesPopupHandler = () => { this.setState(prevState => ({ showLikesPopup: !prevState.showLikesPopup })) }

  render() {
    const { postId, auth } = this.props 
    const { comment } = this.state

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
            <p id='comment-feed-date'><Moment format='ddd, ll LT'>{comment.date}</Moment></p>
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
                          <iframe title='youtube' width="100%" height="300" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
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

            <div className='popup' >
              { comment && comment.likes.length < 1 ? null : comment.likes.length === 2 
                ? <div  onClick={this.likesPopupHandler} style={{ fontSize: '11px', color: 'rgb(29, 138, 255)', marginLeft: 5 }}>Liked by {comment.likes[0].name} and {comment.likes[1].name}</div>
                : comment.likes.length > 2 
                ? <div  onClick={this.likesPopupHandler} style={{ fontSize: '11px', color: 'rgb(29, 138, 255)', marginLeft: 5 }}>Like by {comment.likes[comment.likes.length - 1].name} and {comment.likes.length -1} others.</div>
                : <div  onClick={this.likesPopupHandler} style={{ fontSize: '11px', color: 'rgb(29, 138, 255)', marginLeft: 5 }}> Liked by {comment.likes.map(like => <span key={like.user} style={{color: 'rgb(29, 138, 255)'}}>{like.name} </span>)}</div>
              }
              <div onMouseLeave={this.likesPopupHandler} className={this.state.showLikesPopup ? 'show likespopupcontent' : 'likespopupcontent'}>
                <i className='fas fa-thumbs-up icons likespopupicon'></i>
                <div>
                  {comment.likes.length < 1 ? null : comment.likes.map(like => (
                    <div className='likespopupavatarandname' key={like.user}>
                      <img style={{width: '30px', height: '30px', marginRight: 10, borderRadius: '50%'}} src={like.avatar} />
                      <p style={{padding: 10 }}>{like.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
          <div>
            <button 
              title='like comment'
              onClick={this.onLikeClick.bind(this, postId, comment._id, comment)}
              className={this.state.liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
                'liked' : this.findUserLike(comment.likes)
              })}
              >
              <i className='fas fa-thumbs-up icons like'></i>
              {<span>{this.props.comment.likes.length}</span>}
            </button>
            <button 
              title='unlike'
              className='postfeed_buttons'
              onClick={this.onUnlikeClick.bind(this, postId, comment._id)}>
              <i className="fas fa-thumbs-down icons" id='unlike'></i>
            </button>
            <button 
              title='show comments'
              onClick={() => this.setState(prevState => ({ showNestedComments: !prevState.showNestedComments }))} 
              className='postfeed_buttons'>  
              <i className='fas fa-comment icons' id='comment'/>
              <span>{comment.comments.length}</span>
            </button>
            <button 
              title='reply'
              onClick={() => this.setState(prevState => ({ showForm: !prevState.showForm }))} 
              className='postfeed_buttons'>  
              <i className='fas fa-user-edit icons' id='comment'/>
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
          { comment.comments && this.state.showNestedComments ? 
            (
              <section className='nested_comments'>

                { this.state.showForm &&
                <div onClick={this.showNestedSubmitBtnHandler} style={{marginLeft: 50, display: 'flex', flexDirection: 'column', background: 'none'}}>
                  <textarea 
                    placeholder="Reply to comment" 
                    name='text'
                    value={this.state.text} 
                    onChange={this.onChange} 
                    className='nested_comment_textarea'
                    // error={this.state.errors.text} 'rgb(173, 187, 199)'
                  />
                  { this.state.showNestedSubmitBtn &&
                    <div style={{padding: '10px 0px', display: 'flex', justifyContent: 'center'}}>
                     <i onClick={this.addNewNestedComment.bind(this, postId, comment._id)} id='post-submit-icon' className="far fa-paper-plane " />
                    </div>
                  }
                </div>
                }
                <div>
                  { comment.comments.map(nestedComment => (
                  <div  key={nestedComment._id}>
                    <div className='nested_comments_container'>
                      <div style={{display: 'flex', alignItems: 'center' }}>
                        { nestedComment.avatar && <img className='nested_comment_avatar' src={nestedComment.avatar} alt="user avatar"/> }
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          { nestedComment.name && <p style={{color: 'rgb(55, 131, 194)', fontSize: 12 }}>{nestedComment.name}</p> }
                          <p style={{color: 'gray', fontSize: '11px', marginTop: '-5px'}}><Moment format='ddd, ll LT'>{nestedComment.date}</Moment></p>
                        </div>
                      </div>
                      <div>
                        { nestedComment.text && <p id='nested_comments_text'>{nestedComment.text}</p> }
                        { nestedComment && nestedComment.likes.length < 1 ? null : nestedComment.likes.length === 2 
                          ? <div style={{ marginLeft: 35, fontSize: '10px', color: 'rgb(29, 138, 255)'}}>Liked by {nestedComment.likes[0].name} and {nestedComment.likes[1].name}</div>
                          : nestedComment.likes.length > 2 
                          ? <div style={{ marginLeft: 35, fontSize: '10px', color: 'rgb(29, 138, 255)'}}>Like by {nestedComment.likes[nestedComment.likes.length - 1].name} and {nestedComment.likes.length -1} others.</div>
                          : <div style={{ marginLeft: 35, fontSize: '10px', color: 'rgb(29, 138, 255)'}}> Liked by {nestedComment.likes.map(like => <span key={like.user} style={{color: 'rgb(29, 138, 255)'}}>{like.name} </span>)}</div>
                        }
                      </div>

                      <div style={{ marginLeft: 30 }}>
                        <button 
                          title='like nested comment'
                          onClick={this.onLikeNestedCommentClick.bind(this, postId, comment._id, nestedComment._id)}
                          className={this.state.liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
                            'liked' : this.findUserLike(nestedComment.likes)
                          })}>
                          <i className='fas fa-thumbs-up icons like'></i>
                          <span>{nestedComment.likes.length}</span>
                        </button>
                        <button 
                          title='unlike'
                          className='postfeed_buttons'
                          onClick={this.onUnlikeNestedCommentClick.bind(this, postId, comment._id, nestedComment._id)}>
                          <i className="fas fa-thumbs-down icons" id='unlike'></i>
                        </button>
                        { nestedComment.user === auth.user.id && (
                        <button 
                          title='double click to delete'
                          className='postfeed_buttons delete'
                          onDoubleClick={this.onDeleteNestedComment.bind(this, postId, comment._id, nestedComment._id)}>
                          <i className="fas fa-times icons" />
                        </button> 
                        )}
                      </div>

                    </div>
                  </div>
                  ))}
                </div>
              </section>
            ) : null 
          }
        </div>
      </Fragment>
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
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment, getPosts, getProfiles, addCommentLike, removeCommentLike, addNestedComment, deleteNestedComment, likeNestedComment, unlikeNestedComment })(withRouter(CommentItem))
