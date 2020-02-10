import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import JSEMOJI from 'emoji-js'

import { editNestedCommentAction } from '../../../../../actions/postActions'
import { youTubeURL } from '../../../../../utils/youTubeUrl'
import DefaultNestedCommentBody from './default_nested_comment_body/DefaultNestedCommentBody'
import EditNestedComment from './edit_nested_comment/EditNestedComment'
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

  editNestedComment = e => {
    e.preventDefault()
    const { text } = this.state
    const {
      comment: { _id },
      nestedComment,
      postId,
      toggleEditPost
    } = this.props
    const editedNestedComment = { text }
    this.props.editNestedCommentAction(
      postId,
      _id,
      nestedComment._id,
      editedNestedComment
    )
    toggleEditPost()
    this.setState({ text: '' })
    e.target.reset()
  }

  render() {
    const { nestedComment, editPost } = this.props,
      { text, showEmojis, errors } = this.state

    let youtubeUrl = nestedComment.url
    youtubeUrl = youTubeURL(youtubeUrl)

    return !editPost ? (
      <DefaultNestedCommentBody
        nestedComment={nestedComment}
        youtubeUrl={youtubeUrl}
      />
    ) : (
      <EditNestedComment
        showEmojis={showEmojis}
        nestedComment={nestedComment}
        editNestedComment={this.editNestedComment}
        text={text}
        errors={errors}
        addEmoji={this.addEmoji}
        onChange={this.onChange}
        toggleEmoji={this.toggleEmoji}
        youtubeUrl={youtubeUrl}
      />
    )
  }
}

NestedCommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
  nestedComment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  editPost: PropTypes.bool.isRequired,
  toggleEditPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editNestedCommentAction }
)(NestedCommentBody)
