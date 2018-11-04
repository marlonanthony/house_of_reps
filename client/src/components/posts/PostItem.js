import React, { Component } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { Link } from 'react-router-dom'
import classnames from 'classnames' 
import Moment from 'react-moment' 
import { deletePost, addLike, removeLike, getPost } from '../../actions/postActions'

// For comments 
import Spinner from '../common/Spinner'
import CommentFeed from '../post/CommentFeed'
import CommentForm from '../post/CommentForm'

import './PostItem.css'
 
class PostItem extends Component {

  // For comments 
  state = { 
    showComments: false, 
    text: '',
    postComments: []
  }

  componentDidUpdate() {
    console.log(this.state.text)
    console.log(this.state.postComments)
    console.log(this.state.showComments)
  }

  onDeleteClick = id => {
    this.props.deletePost(id) 
  }

  onLikeClick = id => {
    this.props.addLike(id)
  }

  onUnlikeClick = id => {
    this.props.removeLike(id)
  }

  findUserLike = likes => {
    const { auth } = this.props 
    return likes.filter(like => like.user === auth.user.id).length > 0
  }

  render() {
    const { post, auth, showActions } = this.props 
    const { showComments, text, postComments } = this.state 

    return (
     <div className='posts_container'>
      <div className='post_avatar_and_name'>
        <Link to={'#'}><img className='post_avatar_img' src={post.avatar} alt={post.name} /></Link>
        <div style={{ display: 'block' }}>
          <p className='post_name'>{post.name}</p>
          <p style={{ color: '#7e8889', fontSize: '13px' }}><Moment format='MM/DD/YYYY'>{post.date}</Moment></p>
        </div>
      </div>

      <div>
        <p className='post_content'>{post.text}</p>
        { showActions ? (<span>
          <button 
            title='like'
            className='postfeed_buttons'
            onClick={this.onLikeClick.bind(this, post._id)}>
            <i className={classnames('fas fa-thumbs-up icons like', {
              'liked' : this.findUserLike(post.likes) 
            })}></i>
            <span>{post.likes.length}</span>
          </button>
          <button 
            title='unlike'
            className='postfeed_buttons'
            onClick={this.onUnlikeClick.bind(this, post._id)}>
            <i className="fas fa-thumbs-down icons" id='unlike'></i>
          </button>
          <button 
            title='comment'
            onClick={() => this.setState({ text: post._id, postComments: post.comments, showComments: !showComments })} 
            className='postfeed_buttons'>  
            <i className='fas fa-comment icons' id='comment'/>
          </button>
          { post.user === auth.user.id ? (
            <button 
              title='delete'
              className='postfeed_buttons delete'
              onClick={this.onDeleteClick.bind(this, post._id)}>
              <i className="fas fa-times icons" />
            </button> 
            ) : null }
        </span>) : null }
        { showComments ? (
          <div>
            <CommentForm postId={text} /> 
            <CommentFeed postId={text} comments={postComments} />
          </div> 
        ) : null }
      </div>
     </div>
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
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike, getPost })(PostItem)