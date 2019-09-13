import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmojiPicker from 'emoji-picker-react' 
import JSEMOJI from 'emoji-js'

import PostText from '../../../post-assets/text/PostText'
import LightBackdrop from '../../../../UI/backdrop/LightBackdrop'
import Icon from '../../../../UI/icons/Icon'
import EmojiModal from '../../../../UI/modal/EmojiModal'
import TextAreaForm from '../../../../common/textarea/TextAreaForm'
import { editNestedCommentAction } from '../../../../../actions/postActions'
import './NestedCommentBody.css'

class NestedCommentBody extends Component {
  state = {
    text: '',
    showEmojis: false,
    errors: {}
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

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

  editNestedComment = (e) => {
    const { text } = this.state
    const { comment: { _id }, nestedComment, postId, toggleEditPost } = this.props
    const editedNestedComment = { text }
    this.props.editNestedCommentAction(postId, _id, nestedComment._id, editedNestedComment)
    toggleEditPost()
    this.setState({ text: '' })
    e.target.reset()
  }

  render() {
    const {
      auth,
      nestedComment, 
      comment, 
      postId, 
      modalShow, 
      editPost, 
      toggleEditPost
    } = this.props

    const { text, showEmojis, errors } = this.state

    let youtubeUrl = nestedComment.url
    youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be') 
      ? youtubeUrl = nestedComment.url.replace(/youtu\.be/gi, 'www.youtube.com')
                                .replace(/watch\?v=/gi, 'embed/')
                                .replace(/&feature=www\.youtube\.com/gi, '')
      : youtubeUrl = null

    return !editPost ? (
    !nestedComment.description && !nestedComment.image && !nestedComment.title && !nestedComment.url && !nestedComment.media
      ? <PostText fontSize='13px' postText={nestedComment.text} />
      : nestedComment.media
        ? <div onClick={modalShow}>
            <PostText fontSize='13px' postText={nestedComment.text} />
            <img src={nestedComment.media} alt="uploaded" className='comments_image' />
          </div>
        : <div className='comment-wrapper'>
            <PostText fontSize='13px' postText={nestedComment.text} />
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
                      <p>{nestedComment.title}</p>
                      <p>{nestedComment.description}</p>
                    </div>
                  </>
                : <a 
                    href={nestedComment.url} target='_blank' 
                    rel='noopener noreferrer' 
                    className='comment-anchor-container'>
                    <div id='comment-link-container'>
                      <img src={nestedComment.image} alt='thumbnail' id='comment-link-img' />
                      <div id='comment-link-title-desc'>
                        <p id='comments-title'>{nestedComment.title}</p>
                        <p id='comments-description'>{nestedComment.description}</p>
                      </div>
                    </div>
                  </a>
              }
            </div>
      </div>
    ) : (
      <>
        <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
        { showEmojis &&
          <EmojiModal>
            <EmojiPicker onEmojiClick={this.addEmoji} />
          </EmojiModal>
        }
        { !nestedComment.description && !nestedComment.image && !nestedComment.title && !nestedComment.url && !nestedComment.media
          ? <div style={{ position: 'relative' }}>
              <form onSubmit={this.editNestedComment}>
                <TextAreaForm
                  placeholder="Edit comment"
                  name='text'
                  value={text}
                  onChange={this.onChange}
                  autoFocus
                  fontSize='14px'
                  error={errors.text}
                />
                <div className='edit_icon_container'>
                  <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                  <button type='submit' className='comment_form_btns'>
                    <Icon icon='far fa-paper-plane' title='submit'/>
                  </button>
                </div>
              </form>
            </div>
          : nestedComment.media
            ? <div>
                <div style={{ position: 'relative' }}>
                  <form onSubmit={this.editNestedComment}>
                    <TextAreaForm
                      placeholder="Edit comment"
                      name='text'
                      value={text}
                      onChange={this.onChange}
                      autoFocus
                      fontSize='14px'
                      error={errors.text}
                    />
                    <div className='edit_icon_container'>
                      <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                      <button type='submit' className='comment_form_btns'>
                        <Icon icon='far fa-paper-plane' title='submit'/>
                      </button>
                    </div>
                  </form>
                </div>
                <img onClick={modalShow} src={nestedComment.media} alt="uploaded" className='comments_image' />
              </div>
            : <div className='comment-wrapper'>
                <div style={{ position: 'relative' }}>
                  <form onSubmit={this.editNestedComment}>
                    <TextAreaForm
                      placeholder="Edit comment"
                      name='text'
                      value={text}
                      onChange={this.onChange}
                      autoFocus
                      fontSize='14px'
                      error={errors.text}
                    />
                    <div className='edit_icon_container'>
                      <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
                      <button type='submit' className='comment_form_btns'>
                      <Icon icon='far fa-paper-plane' title='submit' />
                      </button>
                    </div>
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
                          <p>{nestedComment.title}</p>
                          <p>{nestedComment.description}</p>
                        </div>
                      </>
                    : <a 
                        href={nestedComment.url} target='_blank' 
                        rel='noopener noreferrer' 
                        className='comment-anchor-container'>
                        <div id='comment-link-container'>
                          <img src={nestedComment.image} alt='thumbnail' id='comment-link-img' />
                          <div id='comment-link-title-desc'>
                            <p id='comments-title'>{nestedComment.title}</p>
                            <p id='comments-description'>{nestedComment.description}</p>
                          </div>
                        </div>
                      </a>
                  }
                </div>
            </div>
          }
        </>

    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { editNestedCommentAction })(NestedCommentBody)