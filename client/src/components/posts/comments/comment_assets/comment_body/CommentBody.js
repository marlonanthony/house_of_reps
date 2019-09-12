import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostText from '../../../post-assets/text/PostText'
import TextAreaForm from '../../../../common/textarea/TextAreaForm'
import Icon from '../../../../UI/icons/Icon'
import { editedCommentAction } from '../../../../../actions/postActions'
import './CommentBody.css'

class CommentBody extends Component {
  state = { text: '' }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    const { text } = this.state
    const { _id } = this.props.comment
    const { toggleEditPost, postId } = this.props
    const editedComment = { text }
    this.props.editedCommentAction(postId, _id, editedComment)
    toggleEditPost()
    this.setState({ text: '' })
    e.target.reset()
  }

  render() {
    const { text } = this.state
    const { comment, modalShow, editPost } = this.props

    let youtubeUrl = comment.url
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = comment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                                .replace(/watch\?v=/gi, 'embed/')
                                .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null

    if(!editPost) {
      return !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
        ? <PostText fontSize='13px' postText={comment.text} />
        : comment.media
          ? <div onClick={modalShow}>
              <PostText fontSize='13px' postText={comment.text} />
              <img src={comment.media} alt="uploaded" className='comments_image' />
            </div>
          : <div className='comment-wrapper'>
              <PostText fontSize='13px' postText={comment.text} />
              <div>
                { youtubeUrl 
                  ? <>
                      <iframe
                        title='youtube' 
                        width="100%" height="300" 
                        src={youtubeUrl} frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen={true}>
                      </iframe>
                      <div className='youtube_link_title_desc_wrapper'>
                        <p>{comment.title}</p>
                        <p>{comment.description}</p>
                      </div>
                    </>
                  : <a 
                      href={comment.url} target='_blank' 
                      rel='noopener noreferrer' 
                      className='comment-anchor-container'>
                      <div id='comment-link-container'>
                        <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                        <div id='comment-link-title-desc'>
                          <p id='comments-title'>{comment.title}</p>
                          <p id='comments-description'>{comment.description}</p>
                        </div>
                      </div>
                    </a>
                }
              </div>
          </div>
    } else {
      return !comment.description && !comment.image && !comment.title && !comment.url && !comment.media
        ? <div style={{ position: 'relative' }}>
            <form onSubmit={this.onSubmit}>
              <TextAreaForm
                placeholder="Edit comment"
                name='text'
                value={text}
                onChange={this.onChange}
                autoFocus
              />
              <button type='submit' className='comment_form_btns edit_post_submit_btn'>
                <Icon icon='far fa-paper-plane' title='submit' />
              </button>
            </form>
          </div>
        : comment.media
          ? <div>
              <div style={{ position: 'relative' }}>
                <form onSubmit={this.onSubmit}>
                  <TextAreaForm
                    placeholder="Edit comment"
                    name='text'
                    value={text}
                    onChange={this.onChange}
                    autoFocus
                  />
                  <button type='submit' className='comment_form_btns edit_post_submit_btn'>
                    <Icon icon='far fa-paper-plane' title='submit' />
                  </button>
                </form>
              </div>
              <img onClick={modalShow} src={comment.media} alt="uploaded" className='comments_image' />
            </div>
          : <div className='comment-wrapper'>
              <div style={{ position: 'relative' }}>
                <form onSubmit={this.onSubmit}>
                  <TextAreaForm
                    placeholder="Edit comment"
                    name='text'
                    value={text}
                    onChange={this.onChange}
                    autoFocus
                  />
                  <button type='submit' className='comment_form_btns edit_post_submit_btn'>
                    <Icon icon='far fa-paper-plane' title='submit' />
                  </button>
                </form>
              </div>
              <div>
                { youtubeUrl 
                  ? <>
                      <iframe
                        title='youtube' 
                        width="100%" height="300" 
                        src={youtubeUrl} frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen={true}>
                      </iframe>
                      <div className='youtube_link_title_desc_wrapper'>
                        <p>{comment.title}</p>
                        <p>{comment.description}</p>
                      </div>
                    </>
                  : <a 
                      href={comment.url} target='_blank' 
                      rel='noopener noreferrer' 
                      className='comment-anchor-container'>
                      <div id='comment-link-container'>
                        <img src={comment.image} alt='thumbnail' id='comment-link-img' />
                        <div id='comment-link-title-desc'>
                          <p id='comments-title'>{comment.title}</p>
                          <p id='comments-description'>{comment.description}</p>
                        </div>
                      </div>
                    </a>
                }
              </div>
          </div>
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { editedCommentAction })(CommentBody)