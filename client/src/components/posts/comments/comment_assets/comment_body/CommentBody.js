import React, { Component } from 'react'
import { connect } from 'react-redux'
import JSEMOJI from 'emoji-js'

import { editedCommentAction } from '../../../../../actions/postActions'
import { youTubeURL } from '../../../../../utils/youTubeUrl'
import DefaultCommentBody from './comment_body_assets/default_comment_body/DefaultCommentBody'
import EditComment from './comment_body_assets/edit_comment/EditComment'
import './CommentBody.css'

class CommentBody extends Component {
  state = { text: this.props.comment.text || '', showEmojis: false }

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

  toggleEmoji = () => {
    this.setState(prevState => ({ showEmojis: !prevState.showEmojis }))
  }

  addEmoji = emojiName => {
    const jsemoji = new JSEMOJI()
    jsemoji.img_set = 'emojione'
    jsemoji.img_sets.emojione.path =
      'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/'
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
    const { comment, modalShow, editPost } = this.props

    let youtubeUrl = comment.url
    youtubeUrl = youTubeURL(youtubeUrl)

    if (!editPost) {
      return (
        <DefaultCommentBody
          comment={comment}
          modalShow={modalShow}
          youtubeUrl={youtubeUrl}
        />
      )
    } else {
      return (
        <EditComment
          showEmojis={showEmojis}
          comment={comment}
          text={text}
          modalShow={modalShow}
          youtubeUrl={youtubeUrl}
          toggleEmoji={this.toggleEmoji}
          addEmoji={this.addEmoji}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      )
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editedCommentAction }
)(CommentBody)
