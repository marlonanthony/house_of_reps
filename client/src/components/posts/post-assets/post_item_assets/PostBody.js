import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmojiPicker from 'emoji-picker-react' 
import JSEMOJI from 'emoji-js'

import PostText from '../text/PostText'
import TextAreaForm from '../../../common/textarea/TextAreaForm'
import Icon from '../../../UI/icons/Icon'
import { editPostAction } from '../../../../actions/postActions'
import LightBackdrop from '../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../UI/modal/EmojiModal'

class PostBody extends Component {
  state = {
    text: '',
    showEmojis: false
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

  toggleEmoji = () => {
    this.setState(prevState => ({ showEmojis: !prevState.showEmojis }))
  }

  addEmoji = emojiName => {
    const jsemoji = new JSEMOJI() 
    jsemoji.img_set = 'emojione' 
    jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/'
    jsemoji.supports_css = false 
    jsemoji.allow_native = false  
    jsemoji.replace_mode = 'unified' 
    jsemoji.text_mode = true 
    jsemoji.include_title = true 
    jsemoji.replace_unified(`:${emojiName}:`)
    jsemoji.replace_colons(`:${emojiName}:`)
    
    let emoji = String.fromCodePoint(parseInt(emojiName, 16))
    this.setState({ text: this.state.text + emoji })
  }

  render() {
    const { text, showEmojis } = this.state
    const {   
      post,
      modalToggle,
      editPost
    } = this.props
    let youtubeUrl = post.url
    
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = post.url.replace(/youtu\.be/gi, 'www.youtube.com')
                             .replace(/watch\?v=/gi, 'embed/')
                             .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null 

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
      return (
        <>
          <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
          { showEmojis &&
            <EmojiModal>
              <EmojiPicker onEmojiClick={this.addEmoji} />
            </EmojiModal>
          }
          {!post.description && !post.image && !post.title && !post.url && !post.media
          ? <div style={{ position: 'relative' }}>
            <form onSubmit={this.onSubmit}>
                <TextAreaForm
                  placeholder="Edit post"
                  name='text'
                  value={text}
                  onChange={this.onChange}
                  autoFocus
                />
                <div className='edit_icon_container'>
                  <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                  <button type='submit' className='comment_form_btns'>
                    <Icon icon='far fa-paper-plane' title='submit'/>
                  </button>
                </div>
              </form>
            </div>
          : post.media 
            ? <div>
                <div style={{ position: 'relative' }}>
                  <form onSubmit={this.onSubmit}>
                    <TextAreaForm
                      placeholder="Edit post"
                      name='text'
                      value={text}
                      onChange={this.onChange}
                      autoFocus
                    />
                    <div className='edit_icon_container'>
                      <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                      <button type='submit' className='comment_form_btns'>
                        <Icon icon='far fa-paper-plane' title='submit'/>
                      </button>
                    </div>
                  </form>
                </div>
                <img className='postfeed-media-pic' onClick={modalToggle} src={post.media} alt="uploaded" />
              </div>
            : <div className='post_content'>
                <div style={{ position: 'relative' }}>
                  <form onSubmit={this.onSubmit}>
                    <TextAreaForm
                      placeholder="Edit post"
                      name='text'
                      value={text}
                      onChange={this.onChange}
                      autoFocus
                    />
                    <div className='edit_icon_container'>
                      <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                      <button type='submit' className='comment_form_btns'>
                        <Icon icon='far fa-paper-plane' title='submit'/>
                      </button>
                    </div>
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
        </>
      )
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