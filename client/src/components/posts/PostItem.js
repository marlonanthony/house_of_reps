import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom' 
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import classnames from 'classnames' 
import Moment from 'react-moment' 

import { deletePost, addLike, removeLike } from '../../actions/postActions'
import { getProfileByHandle } from '../../actions/profileActions'
import CommentsModal from '../UI/modal/CommentsModal'
import Backdrop from '../UI/backdrop/Backdrop'
import PostText from './post-assets/post_comment_text/PostText'
import PostFeedPopup from '../UI/popup_menu/PostFeedPopup'
import './PostItem.css'
// For comments 
import CommentFeed from '../post/CommentFeed'
import CommentForm from '../post/CommentForm'
 
class PostItem extends Component {

  // For comments 
  state = { 
    showComments: false, 
    text: '',
    postComments: [],
    likes: [...this.props.post.likes],
    liked: false,
    showModal: false,
    showPopup: false,
    showLikesPopup: false
  }

  componentDidMount() {
    document.addEventListener('click', this.onOutsideClick, true) 
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.post.comments !== prevState.postComments) {
      this.setState({ postComments: this.props.post.comments })
    }
    if(this.props.post.likes !== prevState.likes) {
      this.setState({ likes: this.props.post.likes })
    }
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClick, true) 
  }

  onOutsideClick = (e) => {
    const domNode = ReactDOM.findDOMNode(this) 
    if(!domNode || !domNode.contains(e.target)) {
      this.setState({ showLikesPopup: false })
    }
  }

  onDeleteClick = id => {
    this.props.deletePost(id) 
  }

  onLikeClick = id => {
    this.props.addLike(id)
    this.setState(prevState => ({ likes: prevState.likes, liked: true }))
  }

  onUnlikeClick = id => {
    this.props.removeLike(id)
    this.setState(prevState => ({ likes: prevState.likes, liked: false }))
  }

  findUserLike = likes => likes.filter(like => like.user === this.props.auth.user.id).length > 0
  

  modalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }))
  }

  modalShow = () => {
    this.setState({ showModal: true })
  }

  userNameOrAvatarClicked = postId => {
    this.props.profile.profiles.map(profile =>  {
      if(profile.user._id === postId) {
        this.props.history.push(`/profile/${profile.handle}`)
      }
    })
  }

  userNameOrAvatarClickedLikesPopup = handle => {
    if(this.props.location.pathname.includes('/profile')) {
      this.props.getProfileByHandle(handle)
    }
    this.props.history.push(`/profile/${handle}`)
  }

  popupHandler = () => {
    this.setState(prevState => ({ showPopup: !prevState.showPopup }))
  }

  likesPopupHandler = () => this.setState(prevState => ({ showLikesPopup: !prevState.showLikesPopup })) 

  removePopup = (e) => {
    if(!e.target.closest('.popup')) {
      this.setState(prevState => ({ showLikesPopup: false }))
    }
  }
  

  render() {
    const { post, auth, showActions, profile } = this.props 
    const { showComments, text, postComments, likes } = this.state 

    let youtubeUrl = post.url
    
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = post.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v=/gi, 'embed/')
                             .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null 

    const postModal = this.state.showModal ? (
      <CommentsModal>
        <img src={post.media} alt="uploaded" style={{ maxHeight: '70vh', maxWidth: '100vw'}} />
      </CommentsModal>
    ) : null 

    return (
     <Fragment>
      <Backdrop clicked={this.modalToggle} show={this.state.showModal} />
      {postModal}
      <div  onClick={this.removePopup} className='posts_container'>
        <div style={{padding: '10px'}}>
          <div className='post_avatar_and_name'>
            <img className='post_avatar_img' onClick={()=> this.userNameOrAvatarClicked(post.user)} src={post.avatar} alt={post.name} />
            <div style={{ display: 'flex', flexDirection: 'column'  }}>
              <PostFeedPopup 
                  popupHandler={this.popupHandler}
                  profile={profile} 
                  post={post}
                  showPopup={this.state.showPopup}
                  userNameOrAvatarClicked={this.userNameOrAvatarClicked}
              />
              <p className='post_feed_date'><Moment format='ddd, ll LT'>{post.date}</Moment></p>
            </div>
          </div>

          <div>
            { !post.description && !post.image && !post.title && !post.url && !post.media
              ? <PostText postText={post.text} />
              : post.media 
              ? ( <div>
                    <PostText postText={post.text} />
                    <img className='postfeed-media-pic' onClick={this.modalShow} src={post.media} alt="uploaded" />
                  </div>
                )
              : ( <div className='post_content'>
                    <PostText postText={post.text} />
                    <div style={{ borderRadius: '5px', border: '0.5px solid rgba(55, 131, 194, 0.3)' }}>
                      { youtubeUrl 
                      ? <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                          <iframe title='youtube' width="100%" height="300" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe> 
                        </div>
                      : <a href={post.url} target='_blank' rel='noopener noreferrer'>
                          <img src={post.image} alt='thumbnail' style={{ width: '100%' }} id='post-link-img' />
                        </a> 
                      }
                      <p style={{textAlign: 'center', fontSize: '12px'}}>{post.title}</p>
                      <p style={{textAlign: 'center', fontSize: '12px', padding: '0 5px 20px 5px'}}>{post.description}</p>
                    </div>
                  </div>
                )
            }

            {/*   All popup css is in Posts.css   */}
            <div className='popup' >  
              { likes.length < 1 ? null : likes.length === 2 
                ? <div  onClick={this.likesPopupHandler} className='popup_likes'>Liked by {likes[0].name} and {likes[1].name}</div>
                : likes.length > 2 
                ? <div  onClick={this.likesPopupHandler} className='popup_likes'>Like by {likes[likes.length - 1].name} and {likes.length -1} others.</div>
                : <div  onClick={this.likesPopupHandler} className='popup_likes'> Liked by {likes.map(like => <span key={like.user}>{ like.name }</span>)}</div>
              }
              <div onMouseLeave={this.likesPopupHandler} className={ this.state.showLikesPopup ? 'show likespopupcontent' : 'likespopupcontent'}>
                <div style={{ position: 'absolute', top: 5, left: 5 }}>
                  <i className='fas fa-thumbs-up icons likespopupicon'></i>
                  <small>{likes.length}</small>
                </div>
                <div>
                  {likes.length < 1 ? null : likes.map(like => (
                    <div className='likespopupavatarandname' key={like.user}>
                      <img onClick={() => this.userNameOrAvatarClickedLikesPopup(like.handle)} className='popup_likes_avatar' alt='avatar' src={like.avatar} />
                      <p onClick={() => this.userNameOrAvatarClickedLikesPopup(like.handle)} style={{padding: 10 }}>{like.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />

            { showActions && ( 
              <span>
                <button 
                  title='like'
                  className={this.state.liked ? 'postfeed_buttons liked' : classnames('postfeed_buttons', {
                    'liked' : this.findUserLike(post.likes) 
                  })}
                  onClick={this.onLikeClick.bind(this, post._id)}
                  >
                  <i className='fas fa-thumbs-up icons like'></i>
                  <span>{likes.length}</span>
                </button>
                <button 
                  title='unlike'
                  className='postfeed_buttons'
                  onClick={this.onUnlikeClick.bind(this, post._id)}>
                  <i className="fas fa-thumbs-down icons" id='unlike'></i>
                </button>
                <button 
                  title='comment'
                  onClick={() => this.setState((prevState, props) => ({ 
                    text: props.post._id, 
                    postComments: props.post.comments, 
                    showComments: !prevState.showComments }))} 
                  className='postfeed_buttons'>  
                  <i className='fas fa-comment icons' id='comment'/>
                  <span>{post.comments.length}</span>
                </button>
                { post.user === auth.user.id ? (
                  <button 
                    title='double click to delete'
                    className='postfeed_buttons delete'
                    onDoubleClick={this.onDeleteClick.bind(this, post._id)}>
                    <i className="fas fa-times icons" />
                  </button> 
                ) : null }
              </span>) 
            }
            { showComments ? (
              <div>
                <CommentForm postId={text} /> 
                <CommentFeed postId={text} comments={postComments} profiles={this.props.profiles}/>
              </div> 
              ) : null 
            }
          </div>
        </div>
      </div>
     </Fragment>
    )
  }
}

PostItem.defaultProps = {
  showActions: true 
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})


export default connect(mapStateToProps, { deletePost, addLike, removeLike, getProfileByHandle })(withRouter(PostItem))