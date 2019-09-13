import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EmojiPicker from 'emoji-picker-react' 
import JSEMOJI from 'emoji-js'

import Icon from '../../../UI/icons/Icon'
import './NestedCommentForm.css'
import TextAreaForm from '../../../common/textarea/TextAreaForm'
import LightBackdrop from '../../../UI/backdrop/LightBackdrop'
import EmojiModal from '../../../UI/modal/EmojiModal'
import { addNestedComment } from '../../../../actions/postActions'

class NestedCommentForm extends Component {
  state = {
    errors: {},
    showEmojis: false,
    text: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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

  addNewNestedComment = (postId, commentId) => {
    const { user } = this.props.auth 

    const newNestedComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      handle: user.handle
    }

    this.props.addNestedComment(postId, commentId, newNestedComment)
    this.setState({ text: '' })
  }

  render() {
    const {
      showForm,
      showNestedSubmitBtnHandler,
      postId,
      comment,
      showNestedSubmitBtn
    } = this.props

    const { errors, showEmojis, text } = this.state

    return showForm && (
      <>
        <LightBackdrop clicked={this.toggleEmoji} show={showEmojis} />
        { showEmojis &&
          <EmojiModal>
            <EmojiPicker onEmojiClick={this.addEmoji} />
          </EmojiModal>
        }
        <div className='nested_comment_form' onClick={showNestedSubmitBtnHandler}>
          <TextAreaForm 
            placeholder="Reply to comment" 
            name='text'
            value={text} 
            onChange={this.onChange}
            autoFocus
            error={errors.text}
          />
          { showNestedSubmitBtn && 
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            >
              <Icon icon='far fa-smile-wink' title='emojis' toggleIcon={this.toggleEmoji} />
              <Icon 
                icon='far fa-paper-plane' 
                title='submit' 
                toggleIcon={() => this.addNewNestedComment(postId, comment._id)} />
            </div>
          }
        </div>
      </>
    )
  }
}

NestedCommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  showForm: PropTypes.bool.isRequired,
  showNestedSubmitBtnHandler: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  showNestedSubmitBtn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { addNestedComment })(NestedCommentForm)