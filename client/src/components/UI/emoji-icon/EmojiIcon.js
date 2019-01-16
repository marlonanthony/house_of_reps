import React from 'react'
import './EmojiIcon.css'

const EmojiIcon = ({ toggleEmoji }) => (
  <div>
    <i className="far fa-smile-wink emoji-icon" onClick={ toggleEmoji } title='emojis' />
  </div>
)

export default EmojiIcon
