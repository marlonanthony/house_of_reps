import React, { Component } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { Link } from 'react-router-dom'
import classnames from 'classnames' 
import { deletePost, addLike, removeLike } from '../../actions/postActions'

import './PostItem.css'
 
class PostItem extends Component {

  onDeleteClick = id => {
    this.props.deletePost(id) 
  }

  onLikeClick = id => {
    this.props.addLike(id)
  }

  onUnlikeClick = id => {
    this.props.removeLike(id)
  }

  findUserLike(likes) {
    const { auth } = this.props 

    if(likes.filter(like => like.user === auth.user.id).length > 0) {
      return true 
    } else {
      return false 
    }
  }

  render() {
    const { post, auth, showActions } = this.props 

    return (
     <div className='posts_container'>
      <div className='post_avatar_and_name'>
        <Link to={'#'}><img className='post_avatar_img' src={post.avatar} alt={post.name} /></Link>
        <p className='post_name'>{post.name}</p>
      </div>

      <div>
        <p className='post_content'>{post.text}</p>
        { showActions ? (<span>
          <button 
            className='postfeed_icons postfeed_buttons'
            onClick={this.onLikeClick.bind(this, post._id)}>
            <i className={classnames('fas fa-thumbs-up icons like', {
              'liked' : this.findUserLike(post.likes) 
            })}></i>
            <span>{post.likes.length}</span>
          </button>
          <button 
            className='postfeed_icons postfeed_buttons'
            onClick={this.onUnlikeClick.bind(this, post._id)}>
            <i className="fas fa-thumbs-down icons" id='unlike'></i>
          </button>
          <button className='postfeed_icons postfeed_buttons'>
            <i className='far fa-comment icons' id='comment'/>
          </button>
          {/* <Link className='postfeed_icons postfeed_buttons' to={`/post/${post._id}`}>
            <i className='far fa-comment icons' id='comment'/>
          </Link> */}
          { post.user === auth.user.id ? (
            <button 
              className='postfeed_icons postfeed_buttons delete'
              onClick={this.onDeleteClick.bind(this, post._id)}>
              <i className="fas fa-times icons" />
            </button> 
            ) : null }
        </span>) : null }
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

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)