import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import JSEMOJI from 'emoji-js'

import { editPostAction } from '../../../../../actions/postActions'
import EditPostBody from './EditPostBody'
import DefaultPostBody from './DefaultPostBody'

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

    return !editPost
      ? <DefaultPostBody
          post={post}
          modalToggle={modalToggle}
          youtubeUrl={youtubeUrl}
        />
      : <EditPostBody 
          showEmojis={showEmojis}
          toggleEmoji={this.toggleEmoji}
          addEmoji={this.addEmoji}
          onSubmit={this.onSubmit}
          post={post}
          onChange={this.onChange}
          text={text}
          modalToggle={modalToggle}
          youtubeUrl={youtubeUrl}
        />
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