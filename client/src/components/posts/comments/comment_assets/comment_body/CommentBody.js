import React, { useState } from 'react'
import { connect } from 'react-redux'
import JSEMOJI from 'emoji-js'

import { editedCommentAction } from '../../../../../actions/postActions'
import { youTubeURL } from '../../../../../utils/youTubeUrl'
import DefaultCommentBody from './comment_body_assets/default_comment_body/DefaultCommentBody'
import EditComment from './comment_body_assets/edit_comment/EditComment'
import './CommentBody.css'

function CommentBody({
  comment,
  modalShow,
  editPost,
  toggleEditPost,
  postId,
  editedCommentAction
}) {
  const [text, setText] = useState(comment.text || ''),
    [showEmojis, setShowEmojis] = useState(false)

  const onChange = e => setText(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    const { _id } = comment
    const editedComment = { text }
    editedCommentAction(postId, _id, editedComment)
    toggleEditPost()
    setText('')
    e.target.reset()
  }

  const toggleEmoji = () => {
    setShowEmojis(prev => !prev)
  }

  const addEmoji = emojiName => {
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
    setText(prevText => prevText + emoji)
  }

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
        toggleEmoji={toggleEmoji}
        addEmoji={addEmoji}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { editedCommentAction }
)(CommentBody)
