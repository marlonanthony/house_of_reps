import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 

import PostText from '../text/PostText'
import TextAreaForm from '../../../common/textarea/TextAreaForm'
import Icon from '../../../UI/icons/Icon'
import { editPostAction } from '../../../../actions/postActions'

class PostBody extends Component {
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const { text } = this.state
    const { _id } = this.props.post
    const { toggleEditPost } = this.props
    const editedPost = { text }

    this.props.editPostAction(_id, editedPost) 
    this.setState({ text: '' })
    toggleEditPost()
    e.target.reset() 
  }

  render() {
    const { text } = this.state
    const {   
      post,
      youtubeUrl,
      modalToggle,
      editPost
    } = this.props
    if(!editPost) {
      return !post.description && !post.image && !post.title && !post.url && !post.media
        ? <PostText postText={post.text} />
        : post.media 
          ? <div>
              <PostText postText={post.text} />
              <img className='postfeed-media-pic' onClick={modalToggle} src={post.media} alt="uploaded" />
            </div>
          : <div className='post_content'>
              <PostText postText={post.text} />
              <div>
                { youtubeUrl 
                  ? <iframe 
                      title='youtube' 
                      width="100%" 
                      height="300" 
                      src={youtubeUrl} 
                      frameBorder={0} 
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen={true}>
                    </iframe>
                  : <a href={post.url} target='_blank' rel='noopener noreferrer'>
                      <img src={post.image} alt='thumbnail' style={{ width: '100%' }} id='post-link-img' />
                    </a> 
                }
                <p style={{textAlign: 'center', fontSize: '12px'}}>{post.title}</p>
                <p style={{textAlign: 'center', fontSize: '12px', padding: '0 5px 20px 5px'}}>{post.description}</p>
              </div>
            </div>
    } else {
      return !post.description && !post.image && !post.title && !post.url && !post.media
        ? <div style={{position: 'relative'}}>
           <form onSubmit={this.onSubmit}>
              <TextAreaForm
                placeholder="Edit post"
                name='text'
                value={text}
                onChange={this.onChange}
              />
              <button type='submit' className='comment_form_btns' style={{position: 'absolute', top: 0, right: 0}}>
                <Icon icon='far fa-paper-plane' title='submit' />
              </button>
            </form>
          </div>
        : post.media 
          ? <div>
              <div style={{position: 'relative'}}>
                <form onSubmit={this.onSubmit}>
                  <TextAreaForm
                    placeholder="Edit post"
                    name='text'
                    value={text}
                    onChange={this.onChange}
                  />
                  <button type='submit' className='comment_form_btns' style={{position: 'absolute', top: 0, right: 0}}>
                    <Icon icon='far fa-paper-plane' title='submit' />
                  </button>
                </form>
              </div>
              <img className='postfeed-media-pic' onClick={modalToggle} src={post.media} alt="uploaded" />
            </div>
          : <div className='post_content'>
              <div style={{position: 'relative'}}>
                <form onSubmit={this.onSubmit}>
                  <TextAreaForm
                    placeholder="Edit post"
                    name='text'
                    value={text}
                    onChange={this.onChange}
                  />
                  <button type='submit' className='comment_form_btns' style={{position: 'absolute', right: 0, top: 0}}>
                    <Icon icon='far fa-paper-plane' title='submit' />
                  </button>
                </form>
              </div>
            <div>
              { youtubeUrl 
                ? <iframe 
                    title='youtube' 
                    width="100%" 
                    height="300" 
                    src={youtubeUrl} 
                    frameBorder={0} 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen={true}>
                  </iframe>
                : <a href={post.url} target='_blank' rel='noopener noreferrer'>
                    <img src={post.image} alt='thumbnail' style={{ width: '100%' }} id='post-link-img' />
                  </a> 
              }
              <p style={{textAlign: 'center', fontSize: '12px'}}>{post.title}</p>
              <p style={{textAlign: 'center', fontSize: '12px', padding: '0 5px 20px 5px'}}>{post.description}</p>
            </div>
          </div>
    }
  }
}

PostBody.propTypes = {
  post: PropTypes.object.isRequired,
  modalToggle: PropTypes.func.isRequired,
  youtubeUrl: PropTypes.string,
  editPostAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { editPostAction })(PostBody)